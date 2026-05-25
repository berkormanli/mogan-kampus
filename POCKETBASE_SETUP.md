# PocketBase Setup

This app expects PocketBase to provide auth, CMS content, form submissions, and uploaded media.

## Environment

Set this before running or building the frontend:

```sh
VITE_POCKETBASE_URL=https://cms.example.com
```

For local development:

```sh
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

## Collections

Create these collections in the PocketBase admin UI.

### `users`

Type: auth collection.

Add field:

- `isAdmin`: bool, default `false`.

Recommended API rules:

```text
List/Search: isAdmin = true && @request.auth.isAdmin = true
View:       id = @request.auth.id || @request.auth.isAdmin = true
Create:     leave empty only if you want public signup; otherwise keep superuser-only
Update:     id = @request.auth.id || @request.auth.isAdmin = true
Delete:     @request.auth.isAdmin = true
```

Create editor accounts manually and set `isAdmin = true` for trusted admins.

### `site_content`

Type: base collection.

Fields:

- `key`: text, required, unique.
- `data`: json, required.
- `updatedBy`: relation to `users`, optional.

Recommended API rules:

```text
List/Search: leave empty for public reads
View:        leave empty for public reads
Create:      @request.auth.isAdmin = true
Update:      @request.auth.isAdmin = true
Delete:      @request.auth.isAdmin = true
```

The frontend falls back to bundled defaults when a key is missing. CMS edits create records lazily.

After creating the collections, you can seed starter text content from the repo:

```sh
cd frontend
POCKETBASE_URL="https://pocketbase.berkormanli.com" \
POCKETBASE_SUPERUSER_EMAIL="admin@example.com" \
POCKETBASE_SUPERUSER_PASSWORD="your-password" \
bun run seed:pocketbase
```

The seed script intentionally leaves image URLs empty so you can upload final images through the admin UI.

You can validate the collection names, fields, and API rules with:

```sh
cd frontend
POCKETBASE_URL="https://pocketbase.berkormanli.com" \
POCKETBASE_SUPERUSER_EMAIL="admin@example.com" \
POCKETBASE_SUPERUSER_PASSWORD="your-password" \
bun run validate:pocketbase
```

If validation reports `got null` for rules, the collection is still locked to superusers only. Apply the expected rules with:

```sh
cd frontend
POCKETBASE_URL="https://pocketbase.berkormanli.com" \
POCKETBASE_SUPERUSER_EMAIL="admin@example.com" \
POCKETBASE_SUPERUSER_PASSWORD="your-password" \
bun run apply:pocketbase-rules
```

Then run `bun run validate:pocketbase` again.

### `media`

Type: base collection.

Fields:

- `title`: text.
- `file`: file, required, max size appropriate for your server.

Recommended API rules:

```text
List/Search: leave empty for public media reads
View:        leave empty for public media reads
Create:      @request.auth.isAdmin = true
Update:      @request.auth.isAdmin = true
Delete:      @request.auth.isAdmin = true
```

Uploaded files are stored by PocketBase and their public file URLs are saved into `site_content`.

### `preregistrations`

Type: base collection.

Fields:

- `firstName`: text, required.
- `lastName`: text, required.
- `email`: email, required.
- `phone`: text, required.
- `message`: text.

Recommended API rules:

```text
List/Search: @request.auth.isAdmin = true
View:        @request.auth.isAdmin = true
Create:      leave empty for public submissions
Update:      @request.auth.isAdmin = true
Delete:      @request.auth.isAdmin = true
```

Because `Create` is public, add a CAPTCHA/reverse-proxy rate limit before production if the form starts receiving abuse.

## Production Notes

- Serve PocketBase over HTTPS.
- Back up the full `pb_data` directory regularly.
- If uploaded media grows large, configure PocketBase S3 storage or add a backup job that handles files separately.
- Keep the PocketBase admin UI behind a strong password and preferably a private admin URL or IP allowlist.
