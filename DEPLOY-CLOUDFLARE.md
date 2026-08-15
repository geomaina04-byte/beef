# Deploying to Cloudflare (Pages + Workers)

This project has a server-side API route (`app/api/contact`), so it can't be
hosted as a plain static upload — Cloudflare needs to build it. This repo is
already set up for that with `@cloudflare/next-on-pages` and `wrangler`.

## One-time setup

```bash
npm install
```

Log in to Cloudflare (opens a browser window):

```bash
npx wrangler login
```

## Local preview against the Cloudflare runtime

```bash
npm run preview
```

This runs `next build` → `next-on-pages` → serves it locally with
`wrangler pages dev`, so you're testing against the same edge runtime
Cloudflare uses in production (not `next dev`).

## Deploy

```bash
npm run deploy
```

This builds and runs `wrangler pages deploy .vercel/output/static`. The
first time you run it, Wrangler will ask you to confirm the project name
(`beeftrace-web`, set in `wrangler.toml`) and create it if it doesn't exist.

## Environment variables (contact form)

The contact form (`app/api/contact/route.ts`) sends email via the
[Resend](https://resend.com) HTTP API rather than SMTP/nodemailer, because
Cloudflare Workers doesn't support raw TCP sockets (which SMTP needs).

Set these as secrets before your first real deploy — otherwise the form
still "succeeds" for visitors but just logs the submission instead of
emailing it:

```bash
npx wrangler pages secret put RESEND_API_KEY
npx wrangler pages secret put CONTACT_TO_EMAIL
npx wrangler pages secret put CONTACT_FROM_EMAIL
```

Or set them in the dashboard: **Workers & Pages → beeftrace-web → Settings
→ Environment Variables**.

- `RESEND_API_KEY` — from your Resend account
- `CONTACT_TO_EMAIL` — inbox that should receive submissions (e.g.
  `beeftracekenya@gmail.com`)
- `CONTACT_FROM_EMAIL` — a "from" address on a domain verified in Resend
  (Resend won't send from arbitrary/unverified domains)

## Continuous deploys (optional)

In the Cloudflare dashboard, connect the Pages project to your GitHub repo
and set:

- **Build command:** `npm run pages:build`
- **Build output directory:** `.vercel/output/static`

Every push will then build and deploy automatically.

## What changed from the original project

- `next.config.mjs` — removed `output: "standalone"` (a Node-server-specific
  mode not used by Cloudflare) and set `images.unoptimized: true` (Cloudflare
  doesn't run Next's built-in image optimizer).
- `app/api/contact/route.ts` — switched from `nodemailer`/SMTP to the Resend
  HTTP API, and `runtime` from `"nodejs"` to `"edge"`.
- Added `wrangler.toml`, and `pages:build` / `preview` / `deploy` scripts in
  `package.json`.
- Removed stray duplicate files (`beeftrace.zip`, `beeftrace/.env`) and the
  stale `tsconfig.tsbuildinfo` build cache that were bundled in the upload.
