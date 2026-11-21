# Syed Ahsan - Portfolio Website

Personal portfolio of Muhammad Ahsan Shah (Syed Ahsan), MS Computer Science student and
Research Assistant at ITU Lahore, working on medical imaging and AI.

Live pages: Home, About, Experience, Research, Projects, Skills, Services,
Contact, and a funny Hidden Talent page (Chef Ahsan) at `/hidden-talent`.
The admin dashboard lives at `/admin` (linked discreetly in the footer).

## Pages

- `/` - Home: hero with a rotating-role typewriter, photo, stats highlights, cards
  linking to every other page, and a Services call-to-action band.
- `/about` - Full bio, animated counters, journey timeline, and a rotating fun fact.
- `/experience` - Research Assistant (ITU, since Mar 2026), Teaching Assistant for
  Numerical Analysis, Deep Embed Lab intern, and society / IEEE leadership.
- `/research` - AI-driven optical lens design, the FIN glaucoma fairness study
  (sole-author working paper, draft), and the anomaly-detection reproducibility study
  (in progress, draft).
- `/projects` - Smart Bin (ICECT 2027 Paper ID 96), AI diabetes prediction, Nexavo AI,
  and the research-adjacent project cards.
- `/skills` - Grouped skills (AI/ML, Research tools, Programming) with animated bars.
- `/services` - 12 services in 4 groups (Web & Digital, AI & Machine Learning,
  Social Media & Marketing, Research), a 4-step process section, a stats strip and
  a contact call-to-action. No prices listed.
- `/contact` - Contact form (saves the message to the Turso database, falls back
  to your mail app when the database is not configured) plus email, phone,
  Lahore, LinkedIn, GitHub.
- `/admin` - Admin dashboard (not in the main nav, linked in the footer). Sign in
  with the admin password to see contact messages and chatbot queries, with stats,
  search, read/unread marking and delete. See "Database & Admin" below.
- `/hidden-talent` (alias `/chef`) - Chef Ahsan joke page: an animated toon chef,
  a fake menu with joke reviews, kitchen rules, chef stats, and a photo in a chef hat.
  It is in the main navigation now, not hidden.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS (research-lab theme: cool light `#F5F7FA` background, deep navy ink `#0B1B33`, electric blue `#2563EB` + teal `#0D9488`, dot-grid pattern, Space Grotesk + Inter + JetBrains Mono)
- Content reveals use CSS + IntersectionObserver (never GSAP opacity tweens - content can never get stuck invisible); GSAP only for transform-only effects: parallax, tilt, magnetic buttons, counters
- React Router for the multi-page structure
- Vercel serverless function (`api/chat.js`) for the chatbot

## Visuals

- Premium visual layer (pure CSS/SVG/canvas, no external images): layered
  aurora mesh-gradient hero with a lightweight canvas particle field (~40
  particles, desktop only, pauses when the tab is hidden), conic gradient
  ring and glow behind the photo, floating glass stat chips, a fixed
  ultra-subtle film-grain overlay (~0.03 opacity), ambient gradient orbs
  behind every page, gradient hairline dividers, and glass cards with
  gradient top borders and gradient frames.
- Page transitions: the new page fades and rises slightly on route change, plus a
  thin gradient sweep bar under the nav. No full-screen overlays, so the transition
  works the same on mobile and desktop.
- Custom mouse cursor (desktop, fine pointer only): a solid dot that follows
  instantly plus a trailing ring with smooth lerp. It expands over links,
  buttons and cards. `cursor: none` is only applied by JS, so if JS fails
  the native cursor stays; touch devices are untouched. Reduced-motion users
  get instant follow with no lag.

## Run locally

```bash
npm install
npm run dev      # local development server
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build
```

## Deploy on Vercel

Import the repository as a **Vite standalone project** (not a multi-service project):
Root Directory `./`, Framework Preset `Vite`. The `vercel.json` at the repo root
rewrites every route except `/api/*` to `index.html`, so `/about`, `/research` and
the other pages work on refresh and direct visits.

No environment variables are needed for the site itself. The chatbot needs one
(`COHERE_API_KEY`, see below) and the database + admin dashboard need three
(see "Database & Admin" below).

## Chatbot (Cohere AI, like Nexavo)

The chatbot answers with **Cohere AI** through the Vercel serverless function
`api/chat.js`, model `command-a-03-2025` (command-r-plus is deprecated, do not use it).
The key is never in the code: add `COHERE_API_KEY` in Vercel under Project Settings -
Environment Variables (all environments), then redeploy. The same Cohere key used for
Nexavo works here too.

If the key is missing or Cohere fails, the chatbot falls back to its built-in canned
answers (research, projects, experience, contact), so the site never breaks.
Locally (`npm run dev`) there is no `/api/chat`, so the chatbot uses the canned
answers. To test Cohere locally, run `vercel dev` instead.

## Database & Admin (Turso + admin dashboard)

Contact messages and chatbot queries are stored in a Turso database
(libSQL) and viewed in the admin dashboard at `/admin`.

**Environment variables** (Vercel - Project Settings - Environment Variables,
then redeploy):

- `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` - set automatically by the Turso
  Vercel integration (Storage - Create Database - Turso). For local testing,
  create them with the Turso CLI (`turso db create`, `turso db tokens create`).
- `COHERE_API_KEY` - for the chatbot (see above).
- `ADMIN_PASSWORD` - the admin dashboard password. Pick a strong password and
  keep it private. Optional: `ADMIN_SESSION_SECRET` signs the login session
  tokens; if it is empty, `ADMIN_PASSWORD` is used for signing instead.

**How login works:** open `/admin` and sign in with the admin password.
The server returns a signed token (HMAC-SHA256, valid for 7 days) that the
browser stores and sends with every admin request. If `ADMIN_PASSWORD` is not
set, the login screen shows setup steps instead of a password field.

**Tables** (created automatically on first use, no migration step needed):

- `contact_messages` - id, name, email, message, created_at, is_read
- `chat_queries` - id, question, answer, created_at

**API endpoints** (all under `api/`, Vercel serverless functions):

- `POST /api/contact` - save a contact message. Returns 503
  `DB_NOT_CONFIGURED` when the Turso variables are missing.
- `POST /api/chat` - Cohere chatbot. Successful replies are logged to
  `chat_queries`; logging never breaks the chat reply.
- `POST /api/admin/login` - sign in with `{password}`, returns a session token.
- `GET /api/admin/messages` - list contact messages, newest first
  (`?unread_only=1` filters unread). `PATCH` marks read/unread, `DELETE`
  removes one. Bearer token required.
- `GET /api/admin/queries` - list chat queries, newest first. `DELETE`
  removes one. Bearer token required.
- `GET /api/admin/stats` - message and query counts. Bearer token required.

**Local testing:** `npm run dev` does not run `/api/*`, so the database features
need `vercel dev` or the deployed site to test. With `vercel dev`, set the
variables in `.env.local` (never commit it).

## Project structure

```
.
├── api/
│   ├── _lib/
│   │   ├── db.js                # Turso client + table setup (not an endpoint)
│   │   └── auth.js              # admin token signing + verification
│   ├── admin/
│   │   ├── login.js             # POST /api/admin/login
│   │   ├── messages.js          # GET/PATCH/DELETE /api/admin/messages
│   │   ├── queries.js           # GET/DELETE /api/admin/queries
│   │   └── stats.js             # GET /api/admin/stats
│   ├── chat.js                  # Cohere chatbot (Vercel serverless function)
│   └── contact.js               # POST /api/contact
├── public/
│   └── Images/                  # profile photo, project images
├── src/
│   ├── components/              # Hero, About, Experience, Research, Projects,
│   │                            # SkillsSection, Contact, Navigation, Footer,
│   │                            # Chatbot, ChefPage, ToonChef, FoodArt, FunBits
│   ├── pages/                   # one page per route (incl. AdminPage)
│   ├── App.tsx                  # router + layout
│   ├── index.css                # theme tokens + animations
│   └── main.tsx
├── servers/                     # old local Gemini chatbot server (reference only,
│                                # no longer used by the site)
├── index.html
├── vercel.json                  # SPA rewrites, /api/ excluded
├── .env.example                 # key NAMES only, no values
└── README-UPDATES.md            # changelog of the rebuild
```

## Notes

- The CV download link still points to the old Google Drive CV. Replace the link in
  `src/components/Hero.tsx` (`downloadCV`) when the new CV is ready.
- `.env` files are never committed. `.env.example` lists only key names.
- Content rules: only verified facts are used. The FIN study is a working paper
  draft and the anomaly study is in progress, never labelled "published".
- GitHub: https://github.com/mscsAhsan
- LinkedIn: https://www.linkedin.com/in/syedahsanai-engr/
