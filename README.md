# BeefTrace — Marketing Website

A premium, enterprise-grade marketing site for BeefTrace, a digital livestock
traceability platform. Built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, Framer Motion, and GSAP (ScrollTrigger).

## What's inside

- **Full marketing homepage** (`app/page.tsx`) — hero, problem/solution,
  bento feature grid, an interactive platform-preview with tabs, a
  GSAP horizontal-scroll "farm to plate" journey, animated stats counters,
  a showcase of your original capstone poster (with the real JHUB Africa
  and JKUAT logos extracted from it), a GreenTrack integration section,
  security, pricing, FAQ, and footer.
- **Branded page transition** (`components/TransitionOverlay.tsx`,
  `lib/transition-context.tsx`, `components/TransitionLink.tsx`) — the
  BEEF🐄TRACE logo-assembly animation that plays on real route changes.
  See it live by clicking "Transition Demo" in the nav (goes to `/demo`
  and back).
- Respects `prefers-reduced-motion` everywhere motion is used.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Run with Docker

The site is packaged as a multi-stage Docker image using Next.js's
`standalone` output (set in `next.config.mjs`), so the final image only
ships the compiled server, not the full `node_modules`/source tree.

```bash
cp .env.example .env     # fill in real SMTP values (see below)
docker compose up --build -d
```

The site will be live at http://localhost:3000. To rebuild after code
changes: `docker compose up --build -d`. To stop: `docker compose down`.

Files added for this:
- `Dockerfile` — 3-stage build (deps → build → run)
- `.dockerignore` — keeps `node_modules`, `.git`, `.env` etc. out of the image
- `docker-compose.yml` — builds the image and runs it on port 3000
- `.env.example` — template for the contact form's SMTP settings

### Contact form → email

`components/contact/ContactForm.tsx` now POSTs to `app/api/contact/route.ts`,
which sends the submission by email via SMTP (using `nodemailer`). Fill in
`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_TO_EMAIL` in `.env` (see
`.env.example`) — for Gmail, use an [App Password](https://myaccount.google.com/apppasswords),
not the normal account password. If those vars are left empty, submissions
are just logged to the container's stdout (`docker compose logs -f web`) and
the form still shows "Message received" — nothing crashes, email just won't
actually send until it's configured.

## Notes / things to swap in before shipping

- **Fonts** load from Google Fonts via a `<link>` tag in `app/layout.tsx`
  (Archivo / Inter / IBM Plex Mono) — needs normal internet access, which
  you'll have on your machine or any real host.
- **Poster & logos** live in `public/poster/` and `public/logos/` — already
  extracted from your uploaded poster image.
- **Pricing, FAQ, and "Voices from the chain" copy** are placeholder/
  illustrative content — swap in real pricing and real customer quotes
  once you have them. I deliberately avoided inventing fake named
  testimonials or fake certifications (ISO badges etc.) since those would
  misrepresent BeefTrace's actual status as a pilot/capstone project.
- **GreenTrack section** assumes the two products are companion apps —
  adjust the copy if the actual relationship between them differs.
- Swap `hello@beeftrace.app` in `FinalCTA.tsx` for a real contact address.

## Project structure

```
app/
  layout.tsx        Root layout, fonts, providers
  page.tsx           Homepage
  demo/page.tsx       Second route to demo the page transition
  globals.css
components/
  Nav, Hero, TrustedBy, Problem, Solution, Features,
  PlatformPreview, Journey, Stats, PosterShowcase,
  GreenTrackIntegration, Testimonials, Security, Pricing,
  FAQ, FinalCTA, Footer
  TransitionOverlay, TransitionLink, NetworkCanvas
  icons/CowMark.tsx   Custom minimalist cow mark used throughout
lib/
  smooth-scroll.tsx   Lenis smooth-scroll provider
  transition-context.tsx
public/
  poster/             Your original poster (full + web-optimized)
  logos/              JHUB Africa + JKUAT logos, cropped from the poster
  noise.png           Subtle grain texture
```
