# Auto-Rebuild Infrastructure Setup

## Architecture

```
PocketBase (site_content update)
  │
  ├─ onRecordAfterCreateSuccess ─┐
  ├─ onRecordAfterUpdateSuccess ─┤  pb_hooks/main.pb.js
  ├─ onRecordAfterDeleteSuccess ─┘  (debounce 5s)
  │
  └─ POST https://xxx.lambda-url.eu-central-1.on.aws/?token=SECRET
           │
           ▼
     AWS Lambda (webhook.mjs)
       ├─ validates token via SSM
       └─ triggers CodeBuild
           │
           ▼
     AWS CodeBuild (buildspec.yml)
       ├─ git clone (GitLab)
       ├─ bun install
       ├─ node scripts/fetch-content-bundle.mjs
       ├─ vite build (27 SSG pages)
       ├─ aws s3 sync
       └─ aws cloudfront invalidate

  EventBridge Scheduler (every 30 min) ──→ CodeBuild (fallback cron)
```

---

## Step 1: SSM Parameter (Shared Secret)

```sh
aws ssm put-parameter \
  --name "/mogan-kampus/webhook-secret" \
  --value "$(openssl rand -base64 32)" \
  --type SecureString \
  --region eu-central-1
```

Save the generated secret — you'll need it for the PocketBase hook and for testing.

---

## Step 2: IAM Roles

### CodeBuild Role (`mogan-kampus-codebuild-role`)

Trust policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "codebuild.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Attach these managed policies:
- `AmazonS3FullAccess` (or scoped to your bucket)
- `CloudFrontFullAccess` (or scoped to your distribution)
- `AWSCodeBuildAdminAccess` (or user-managed policy)

Inline policy for SSM read:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter"],
      "Resource": "arn:aws:ssm:eu-central-1:*:parameter/mogan-kampus/*"
    }
  ]
}
```

### Lambda Role (`mogan-kampus-webhook-role`)

Trust policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Inline policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["codebuild:StartBuild"],
      "Resource": "arn:aws:codebuild:eu-central-1:*:project/mogan-kampus-build"
    },
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter"],
      "Resource": "arn:aws:ssm:eu-central-1:*:parameter/mogan-kampus/webhook-secret"
    },
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "arn:aws:logs:eu-central-1:*:*"
    }
  ]
}
```

Create roles via console or CLI:
```sh
aws iam create-role \
  --role-name mogan-kampus-codebuild-role \
  --assume-role-policy-document file://codebuild-trust.json

aws iam create-role \
  --role-name mogan-kampus-webhook-role \
  --assume-role-policy-document file://lambda-trust.json
```

---

## Step 3: CodeBuild Project

### GitLab Connection

1. In CodeBuild console → Settings → Connections → Create Connection → GitLab
2. Authenticate and select your repo

### Create Project

```sh
aws codebuild create-project \
  --name mogan-kampus-build \
  --source "{
    \"type\": \"GITLAB\",
    \"location\": \"https://gitlab.com/your-org/mogan-kampus\",
    \"buildspec\": \"buildspec.yml\",
    \"gitCloneDepth\": 1
  }" \
  --environment "{
    \"type\": \"LINUX_CONTAINER\",
    \"image\": \"aws/codebuild/amazonlinux2-x86_64-standard:5.0\",
    \"computeType\": \"BUILD_GENERAL1_SMALL\",
    \"environmentVariables\": [
      {\"name\": \"AWS_S3_BUCKET\", \"value\": \"mogan-kampus-site\"},
      {\"name\": \"AWS_CLOUDFRONT_DISTRIBUTION_ID\", \"value\": \"E123...\"},
      {\"name\": \"POCKETBASE_URL\", \"value\": \"https://pocketbase.berkormanli.com\"},
      {\"name\": \"POCKETBASE_ADMIN_EMAIL\", \"value\": \"berkormanl@gmail.com\", \"type\": \"SECRETS_MANAGER\"},
      {\"name\": \"POCKETBASE_ADMIN_PASSWORD\", \"value\": \"/mogan-kampus/pocketbase-password\", \"type\": \"SECRETS_MANAGER\"},
      {\"name\": \"VITE_POCKETBASE_URL\", \"value\": \"https://pocketbase.berkormanli.com\"}
    ]
  }" \
  --service-role arn:aws:iam::ACCOUNT_ID:role/mogan-kampus-codebuild-role \
  --timeout-in-minutes 15 \
  --region eu-central-1
```

Or create via AWS Console (recommended — easier to set GitLab connection).

Environment variables needed:
| Variable | Value |
|---|---|
| `AWS_S3_BUCKET` | Your S3 bucket name |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |
| `POCKETBASE_URL` | `https://pocketbase.berkormanli.com` |
| `POCKETBASE_ADMIN_EMAIL` | `berkormanl@gmail.com` |
| `POCKETBASE_ADMIN_PASSWORD` | PocketBase admin password |
| `VITE_POCKETBASE_URL` | `https://pocketbase.berkormanli.com` |

---

## Step 4: Lambda Function

### Create Deployment Package

```sh
cd lambda
npm install
zip -r ../lambda-deploy.zip .
cd ..
```

### Create Function

```sh
aws lambda create-function \
  --function-name mogan-kampus-webhook \
  --runtime nodejs20.x \
  --handler webhook.handler \
  --role arn:aws:iam::ACCOUNT_ID:role/mogan-kampus-webhook-role \
  --zip-file fileb://lambda-deploy.zip \
  --timeout 10 \
  --environment "Variables={
    CODEBUILD_PROJECT_NAME=mogan-kampus-build,
    SSM_SECRET_PATH=/mogan-kampus/webhook-secret
  }" \
  --region eu-central-1
```

### Create Function URL

```sh
aws lambda create-function-url-config \
  --function-name mogan-kampus-webhook \
  --auth-type NONE \
  --region eu-central-1

# Get the URL
aws lambda get-function-url-config \
  --function-name mogan-kampus-webhook \
  --region eu-central-1
```

Save the Function URL (e.g., `https://abc123.lambda-url.eu-central-1.on.aws/`).

---

## Step 5: EventBridge Scheduler (Fallback Cron)

```sh
aws scheduler create-schedule \
  --name mogan-kampus-cron-rebuild \
  --schedule-expression "rate(30 minutes)" \
  --target "{
    \"Arn\": \"arn:aws:codebuild:eu-central-1:ACCOUNT_ID:project/mogan-kampus-build\",
    \"RoleArn\": \"arn:aws:iam::ACCOUNT_ID:role/mogan-kampus-scheduler-role\",
    \"Input\": \"{}\"
  }" \
  --region eu-central-1
```

The scheduler role needs `codebuild:StartBuild` on the project ARN.

---

## Step 6: PocketBase Hook Setup

1. Copy `frontend/pb_hooks/main.pb.js` to the `pb_hooks/` directory next to your PocketBase binary on your server.

2. Set environment variables before launching PocketBase:
```sh
export REBUILD_WEBHOOK_URL="https://abc123.lambda-url.eu-central-1.on.aws/"
export REBUILD_WEBHOOK_SECRET="<the-secret-from-step-1>"
./pocketbase serve
```

3. Verify hooks load — check PocketBase logs:
```
[rebuild-hook] hooks registered for site_content + media
```

---

## Step 7: Test

```sh
# Test the webhook directly (bypasses PocketBase)
curl -X POST "https://abc123.lambda-url.eu-central-1.on.aws/?token=<secret>"

# Should return: {"status":"build_triggered"}

# Test with wrong token (should reject)
curl -X POST "https://abc123.lambda-url.eu-central-1.on.aws/?token=wrong"

# Should return: {"error":"forbidden"}
```

Then update any `site_content` record in the PocketBase admin UI. Within 5 seconds, trigger the webhook. Check CodeBuild for a new build run.

---

## Summary

| File | Location | Purpose |
|---|---|---|
| `pb_hooks/main.pb.js` | PocketBase server `pb_hooks/` | Detects CMS edits, POSTs to Lambda |
| `buildspec.yml` | Repo root | CodeBuild instructions |
| `lambda/webhook.mjs` | AWS Lambda | Validates token, triggers CodeBuild |
| SSM Parameter | AWS SSM | Stores shared secret |

| AWS Resource | Purpose |
|---|---|
| CodeBuild `mogan-kampus-build` | Runs `bun run deploy:aws` |
| Lambda `mogan-kampus-webhook` | Webhook endpoint |
| EventBridge Scheduler | Cron fallback (30 min) |
| IAM roles (2) | CodeBuild + Lambda permissions |
| SSM `/mogan-kampus/webhook-secret` | Shared auth token |
