# Ahsan Portfolio - What Changed

A full rebuild of Syed Ahsan's portfolio website: new research-lab theme, new photo,
verified content throughout, multi-page structure, a funny Chef Ahsan page, and a
Cohere AI chatbot (same setup as Nexavo).

## New theme (research lab, updated 21 Nov 2026)
- Research-lab look: cool light background `#F5F7FA` with a subtle dot-grid pattern,
  deep navy ink `#0B1B33`, electric blue `#2563EB` primary, teal `#0D9488` accent.
  It replaces the warm ivory / burnt orange editorial theme, which did not suit an
  AI researcher / engineer. The old dark purple / cyan neon theme is also gone.
- Space Grotesk for display headings, Inter for body text, JetBrains Mono for small
  eyebrow labels and tags (e.g. `// 01 - about`).
- The Tailwind CSS-variable token system (`background`, `foreground`, `primary`,
  `secondary`, `accent`, `muted`, `border`, `card`, gradients, shadows) is kept, so
  all components compile against the same tokens in the new palette.

## Bug fix: blank sections (21 Nov 2026)
- The deployed site showed empty "Explore the portfolio" cards on Home and empty
  dish cards on the Chef page: per-page `gsap.from` opacity tweens got stuck at
  opacity 0 when ScrollTrigger positions went stale. Content visibility now runs on
  one bulletproof system: CSS `[data-reveal]` + IntersectionObserver in
  `src/components/Motion.tsx`, with a 2.5s safety timer and a window-load re-check,
  so no content can ever stay invisible. GSAP is kept only for transform-only
  effects (parallax, tilt, magnetic buttons, counters) that cannot hide content.

## New photo
- `public/Images/ahsan-profile.jpg` - his new photo (black t-shirt, white background).
  Used in the Hero and on the About page. The old `profileLogo.png` is still on disk
  but is no longer referenced anywhere.

## Multi-page structure (React Router)
- `/` - Home: hero with rotating-role typewriter, photo, stats highlights, cards linking
  to every other page.
- `/about` - Full bio, animated counters, journey timeline
  (BS AI IUB 2026 - RA ITU Mar 2026 - MS CS + TA ITU Aug 2026), photo, rotating fun facts.
- `/experience` - RA (optical lens design, FDTD + deep-learning surrogate, Mar 2026-present),
  TA Numerical Analysis (Aug 2026-present), Deep Embed Lab intern (Oct 2023-Nov 2024),
  IEEE leadership + IUB Skills & Career Development Society presidency (1000+ students).
- `/research` - AI-driven optical lens design, FIN glaucoma fairness study
  (sole-author working paper - draft, EfficientNet-B1, FIN-race AUC 85.6), anomaly-detection
  reproducibility study (in progress - draft, ~30 algorithms, 6 families, 16 ODDS datasets).
- `/projects` - Smart Bin (ICECT 2027 Paper ID 96, GitHub link), AI diabetes prediction,
  Nexavo AI, plus the research-adjacent project cards.
- `/skills` - Grouped skills (AI/ML, Research tools, Programming) with animated skill bars.
- `/contact` - Contact form (opens your mail app) + email, phone, Lahore, LinkedIn, GitHub.
- `/hidden-talent` (alias `/chef`) - Chef Ahsan joke page. It is in the main navigation
  now, and also linked from the footer and the About page hint line.

## Research identity
- The public identity leads with **Medical Imaging / AI**, not optics. The RA project is
  described factually as AI-driven inverse design of optical lenses (FDTD simulation data
  + a deep-learning surrogate model, ITU, since Mar 2026).

## Animations (CSS reveals + GSAP transform effects)
- Hero typewriter rotating roles: AI Researcher / Medical Imaging / Computer Vision /
  Web Engineer.
- Scroll progress bar in the navigation, marquee ticker strip under the hero.
- CSS + IntersectionObserver reveals on every section (never GSAP opacity tweens),
  animated counters, skill bars that fill on scroll, hover tilt/lift on project cards,
  floating soft blobs, page-transition fade on route change.
- Chef page: animated cartoon "Toon Chef Ahsan" (waves hello, blinks, stirs a bubbling
  pot, bobs gently, steam wisps), illustrated SVG food floating around the page with
  soft mouse parallax, and illustrated graphics on every dish card.
- Scroll and mouse motion layer (`src/components/Motion.tsx`, the `ScrollFX` component):
  blur-in reveals as sections scroll into view, staggered card entrances, scroll parallax
  on the hero photo and section background blobs, mouse-move parallax on the hero photo
  and blobs, magnetic buttons (Hire Me, Download CV, Send Message, Order now, GitHub),
  and 3D tilt on project, research, experience, explore and dish cards following the
  mouse. All motion uses transform/opacity only. Mouse effects only run on devices
  with a mouse; on touch devices they simply do nothing.
- Icons are never animated: no spinning, bouncing, pulsing or rotating icons. Only cards,
  photos, buttons and sections move.

## Home page - fully professional
- The home page (`/`) is 100% serious: clean hero, serious copy, no jokes, no doodles,
  no confetti, no easter eggs. The motion effects (scroll reveals, parallax, magnetic
  buttons, tilt) are still there, but the copy is fully professional for professors and
  recruiters.

## Fun touches (inner pages and chef page)
- Playful microcopy: witty one-liners under section headings on the inner pages
  (Projects, Research, Skills, Contact, Experience), and a rotating line of true fun
  facts on the About page.
- Sparkle burst when you click the chef hat or tap the toon chef 3 times on the Chef page.
- Floating doodles on the About page background; warm text selection colour.
- Easter eggs live on the Chef page only. The chef page stays the funniest page. The rest
  stays credible for professors and recruiters.

## Content rules followed
- Only verified facts are used. Nothing is labelled "published" - the FIN study is a
  "Working paper - draft" and the anomaly study is "In progress - draft".
- No "100% client satisfaction" claim, no scholarship applications, deadlines, or
  professor outreach anywhere on the site. Location is Lahore, Pakistan.
- No em dashes or en dashes anywhere in the site copy - short hyphens only.
- GitHub links point to https://github.com/mscsAhsan everywhere.

## Chef Ahsan page (hidden talent)
- Photo with a chef-hat graphic (click the hat for a surprise), plus the animated Toon Chef Ahsan cartoon.
- Chef's Story, Chef's Stats (joke counters: 47 biryani attempts, 12 edible, 9 smoke alarms,
  0 Michelin stars), Kitchen Rules, and What People Say (joke reviews).
- Fake menu: Biryani.exe, Chai.js, Maggi (2 minutes*), Anda Burger, Daal Chawal,
  Fries.exe - tap a dish to reveal joke reviews.
- "Michelin stars: 0 (but the neighbours can smell it)", "Reservations: just show up,
  bring your own plate", and an Order button that answers "Kitchen closed - the chef
  is debugging." Clearly a joke; no fake restaurant is presented as real.

## Chatbot - Cohere AI (like Nexavo)
- The chatbot answers with **Cohere AI** through a Vercel serverless function
  (`api/chat.js`), model `command-a-03-2025` - the same model and the same setup
  as Nexavo. The key is never in the code: add `COHERE_API_KEY` in Vercel under
  Project Settings - Environment Variables (all environments), then redeploy.
  The same Cohere key used for Nexavo works here too.
- The header shows "Answering with Cohere AI" when the live AI answers, and
  "Research - Projects - Contact" when it is running on built-in answers.
- If the key is missing or Cohere fails, the chatbot falls back to its built-in
  canned answers (research, projects, experience, contact) - the site never breaks.
- The preamble only contains verified facts about Ahsan, and the FIN study is
  described as a draft, never as published.
- Locally (`npm run dev`) there is no `/api/chat`, so the chatbot uses the canned
  answers. To test Cohere locally, run `vercel dev` instead.

## Security
- All `.env` files were removed from the project (they are not in this zip).
  `.env.example` lists only key NAMES (`COHERE_API_KEY`, `GEMINI_API_KEY`) with no
  values - copy it to `.env` and add your own keys if you run things locally.
  Never put a real key in the code or in Git.

## Mobile layout
- Every page is checked for small screens: hero stacks with a smaller photo, the
  mobile menu scrolls if needed, cards go single column, timelines and stats do not
  overflow, the chatbot window fits small screens, chef toon and food graphics scale
  down, and there is no horizontal page overflow.

## How to run
```bash
npm install
npm run dev      # local development server
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build
```

## Notes / things to do later
- The CV download link still points to his old Google Drive CV
  (`drive.usercontent.google.com/.../Ahsan-Resume.pdf`). Replace the link in
  `src/components/Hero.tsx` (`downloadCV`) when his new CV is ready.
- The old local chatbot server in `servers/` (Gemini, `localhost:5000`) is no longer
  used by the site - the chatbot now calls `/api/chat` (Cohere). The `servers/`
  folder is kept only for reference.
