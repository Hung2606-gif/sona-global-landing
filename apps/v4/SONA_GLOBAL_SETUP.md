# SONA-GLOBAL landing page

## Architecture

```text
Browser
  │
  ├── /media/* ──> Nginx alias ──> /var/www/sona-global/media/*
  │
  └── all other requests ──> Nginx reverse proxy ──> Next.js :4000
                                                      └── optional /api/chat
```

SONA-GLOBAL is a landing page. It uses no database, stores no CVs, and has no
public upload endpoint. The careers page directs applicants to send their CV by
email. Images and public assets live on the VPS disk and are served directly by
Nginx from `/var/www/sona-global/media`.

## Local development

```bash
pnpm install --frozen-lockfile
pnpm --filter v4 dev
```

The app runs at `http://localhost:4000`. The optional AI assistant needs
`OPENAI_API_KEY`; without it, the rest of the landing page still works.

## VPS deployment

1. Deploy the repository to `/var/www/sona-global` and put public images in
   `/var/www/sona-global/media`.

2. Create `/etc/sona-global/sona-global.env` from `.env.example`. Only set an
   OpenAI API key if the AI assistant is required.

3. Install dependencies and build:

   ```bash
   cd /var/www/sona-global
   pnpm install --frozen-lockfile
   pnpm --filter v4 build
   ```

4. Copy `deploy/systemd/sona-global.service` to `/etc/systemd/system/`, then
   run `sudo systemctl daemon-reload && sudo systemctl enable --now sona-global`.

5. Copy `deploy/nginx/sona-global.conf` to
   `/etc/nginx/sites-available/sona-global`, update `server_name`, enable it,
   validate with `sudo nginx -t`, then reload Nginx. Add TLS with Certbot before
   exposing the site publicly.

## AI assistant

Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in
`/etc/sona-global/sona-global.env`. ChatGPT Plus does not include OpenAI API
quota, so this needs a separately billed OpenAI API account.
