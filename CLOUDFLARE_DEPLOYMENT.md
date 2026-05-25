# Cloudflare Pages Deployment + Auto-Rebuild

Replaces: S3 + CloudFront + Lambda + CodeBuild + EventBridge + SSM. One service.

## Architecture

```
CODE CHANGES:
  push to GitLab main → Cloudflare Pages auto-deploys

CONTENT CHANGES:
  PocketBase CMS edit → pb_hooks/main.pb.js (5s debounce arm) → POST Deploy Hook → Cloudflare Pages rebuilds
```

---

## Step 1: Connect Cloudflare Pages to GitLab

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select **GitLab**, authenticate, pick `mogan-kampus` repo
3. Configure build:

| Setting | Value |
|---|---|
| **Production branch** | `main` |
| **Build command** | `npm install -g bun && cd frontend && bun install && node scripts/fetch-content-bundle.mjs && npx vite build` |
| **Build output directory** | `frontend/dist/client` |
| **Root directory** | `/` |

4. Add environment variables:

| Variable | Value | Secret? |
|---|---|---|
| `VITE_POCKETBASE_URL` | `https://pocketbase.berkormanli.com` | No |
| `POCKETBASE_URL` | `https://pocketbase.berkormanli.com` | No |
| `POCKETBASE_ADMIN_EMAIL` | `berkormanl@gmail.com` | No |
| `POCKETBASE_ADMIN_PASSWORD` | `<your pocketbase admin password>` | **Yes** |

5. Click **Save and Deploy** — first build runs immediately.

After the first deploy, Cloudflare assigns a `*.pages.dev` domain (e.g. `mogan-kampus.pages.dev`).

---

## Step 2: Get Deploy Hook URL

1. In Cloudflare Pages → your project → **Settings** → **Deploy hooks**
2. Click **Add deploy hook**
3. Name: `pocketbase-cms`
4. Branch: `main`
5. Copy the generated URL:
   ```
   https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

---

## Step 3: Configure PocketBase

1. Copy `frontend/pb_hooks/main.pb.js` to the `pb_hooks/` directory on your PocketBase server (next to the PocketBase binary).

2. Set the environment variable before launching PocketBase:
   ```sh
   export CF_PAGES_DEPLOY_HOOK_URL="https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
   ./pocketbase serve
   ```

   Or add it to your systemd service / docker-compose / startup script.

3. Check logs for confirmation:
   ```
   [rebuild-hook] hooks registered for site_content + media
   ```

---

## Step 4: Manual Deploy Command (CLI)

For deploying from your local machine without pushing to Git:

```sh
cd frontend

# Build + deploy in one command
bun run build && bun run deploy:cf
```

### Setup

1. **Auth**: `npx wrangler login` (opens browser to authorize)

Or create an API token:
- Cloudflare Dashboard → **My Profile** → **API Tokens** → **Create Token** → **Workers** template
- Set `CLOUDFLARE_API_TOKEN` env var

2. **Project name**: The `deploy:cf` script uses `--project-name=mogan-kampus`. Change it to match your Pages project name.

### Usage

| Command | What |
|---|---|
| `bun run deploy:cf` | Deploy already-built `dist/client` (fast, no rebuild) |
| `bun run build && bun run deploy:cf` | Build fresh + deploy (same as Code push trigger) |

---

## Step 5: Custom Domain

1. Cloudflare Pages → your project → **Custom domains**
2. Add `mogankampus.com` (or your domain)
3. Cloudflare provides DNS records — add them at your DNS provider
4. Wait for SSL certificate provisioning (automatic)

---

## Step 6: Test

### Test code deploy:
```sh
git push origin main
```
Check Cloudflare Pages dashboard for build status.

### Test content deploy:
1. Log into PocketBase admin
2. Edit any `site_content` record (e.g., change hero headline)
3. Wait 5 seconds (debounce)
4. Check PocketBase logs: `[rebuild-hook] deploy triggered (200)`
5. Check Cloudflare Pages — a new deployment starts
6. Visit your site — content should be updated within ~2 minutes

---

## How It Works

| Trigger | What happens |
|---|---|
| `git push main` | Cloudflare Pages detects push → runs build command → deploys `frontend/dist/client` |
| PocketBase `site_content` edit | `pb_hooks/main.pb.js` fires (debounced 5s) → POSTs to Deploy Hook URL → Pages rebuilds |
| PocketBase media upload | Same hook fires (media changes may affect image URLs in content) |

### Build command breakdown

```
npm install -g bun                    # Install bun runtime
cd frontend                           # Enter frontend directory
bun install                           # Install dependencies
node scripts/fetch-content-bundle.mjs # Fetch PocketBase content → content-bundle.json
npx vite build                        # SSG prerender: 27 HTML pages + assets
```

Output (`frontend/dist/client/`) is deployed to Cloudflare's global CDN.

### Cost

Cloudflare Pages free tier:
- Unlimited sites
- 500 builds/month
- Unlimited bandwidth
- Custom domain + HTTPS
- Deploy hooks included

PocketBase: unchanged (runs on your server).

---

## Optional: Preview Deployments

Cloudflare Pages automatically creates preview deployments for non-main branches. Push to a branch like `staging` → get a unique preview URL (`staging.mogan-kampus.pages.dev`).

---

## Migration from AWS

If you already have AWS set up, switching to Cloudflare Pages means:

| Remove | Add |
|---|---|
| S3 bucket | Cloudflare Pages project |
| CloudFront distribution | Cloudflare Pages (includes CDN + HTTPS) |
| CloudFront Function (index routing) | Not needed (Pages handles clean URLs natively) |
| Lambda `mogan-kampus-webhook` | Not needed (Deploy Hooks are the webhook) |
| CodeBuild project | Not needed (Pages runs the build) |
| EventBridge cron | Not needed (hook is push-based, no polling) |
| IAM roles (×3) | Not needed |
| SSM parameter | Not needed |
