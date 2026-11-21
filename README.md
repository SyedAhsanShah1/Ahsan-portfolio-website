# Syed Ahsan - Portfolio Website

Personal portfolio of Muhammad Ahsan Shah (Syed Ahsan), MS Computer Science student and
Research Assistant at ITU Lahore, working on medical imaging and AI.

Live pages: Home, About, Experience, Research, Projects, Skills, Contact, and a funny
Hidden Talent page (Chef Ahsan) at `/hidden-talent`.

## Pages

- `/` - Home: hero with a rotating-role typewriter, photo, stats highlights, and cards
  linking to every other page.
- `/about` - Full bio, animated counters, journey timeline, and a rotating fun fact.
- `/experience` - Research Assistant (ITU, since Mar 2026), Teaching Assistant for
  Numerical Analysis, Deep Embed Lab intern, and society / IEEE leadership.
- `/research` - AI-driven optical lens design, the FIN glaucoma fairness study
  (sole-author working paper, draft), and the anomaly-detection reproducibility study
  (in progress, draft).
- `/projects` - Smart Bin (ICECT 2027 Paper ID 96), AI diabetes prediction, Nexavo AI,
  and the research-adjacent project cards.
- `/skills` - Grouped skills (AI/ML, Research tools, Programming) with animated bars.
- `/contact` - Contact form (opens your mail app) plus email, phone, Lahore, LinkedIn,
  GitHub.
- `/hidden-talent` (alias `/chef`) - Chef Ahsan joke page: an animated toon chef,
  a fake menu with joke reviews, kitchen rules, chef stats, and a photo in a chef hat.
  It is in the main navigation now, not hidden.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS (research-lab theme: cool light `#F5F7FA` background, deep navy ink `#0B1B33`, electric blue `#2563EB` + teal `#0D9488`, dot-grid pattern, Space Grotesk + Inter + JetBrains Mono)
- Content reveals use CSS + IntersectionObserver (never GSAP opacity tweens - content can never get stuck invisible); GSAP only for transform-only effects: parallax, tilt, magnetic buttons, counters
- React Router for the multi-page structure
- Vercel serverless function (`api/chat.js`) for the chatbot

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

No environment variables are needed for the site itself. The chatbot needs one:
`COHERE_API_KEY` (see below).

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

## Project structure

```
.
├── api/
│   └── chat.js                  # Cohere chatbot (Vercel serverless function)
├── public/
│   └── Images/                  # profile photo, project images
├── src/
│   ├── components/              # Hero, About, Experience, Research, Projects,
│   │                            # SkillsSection, Contact, Navigation, Footer,
│   │                            # Chatbot, ChefPage, ToonChef, FoodArt, FunBits
│   ├── pages/                   # one page per route
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
