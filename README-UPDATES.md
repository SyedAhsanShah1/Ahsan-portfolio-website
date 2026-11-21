# Ahsan Portfolio v2 — What Changed

A full rebuild of Syed Ahsan's portfolio website: new warm editorial theme, new photo,
verified content throughout, multi-page structure, and a hidden funny Chef Ahsan page.

## New theme
- Warm editorial paper: ivory background `#FAF6EF`, ink `#191817`, burnt orange `#E4572E`,
  amber `#F2A007`, deep green `#1E4D3B` (footer). The old dark navy / purple / cyan neon
  theme is gone — no neon glows, no dark sections except the deep-green footer.
- Fraunces (serif) display font for headings + Inter for body text.
- The Tailwind CSS-variable token system (`background`, `foreground`, `primary`,
  `secondary`, `accent`, `muted`, `border`, `card`, gradients, shadows) is kept, so
  all components compile against the same tokens in the new palette.

## New photo
- `public/Images/ahsan-profile.jpg` — his new photo (black t-shirt, white background).
  Used in the Hero and on the About page. The old `profileLogo.png` is still on disk
  but is no longer referenced anywhere.

## Multi-page structure (React Router)
- `/` — Home: hero with rotating-role typewriter, photo, stats highlights, cards linking
  to every other page.
- `/about` — Full bio, animated counters, journey timeline
  (BS AI IUB 2026 → RA ITU Mar 2026 → MS CS + TA ITU Aug 2026), photo.
- `/experience` — RA (meta-optics, FDTD + deep-learning surrogate, Mar 2026–present),
  TA Numerical Analysis (Aug 2026–present), Deep Embed Lab intern (Oct 2023–Nov 2024),
  IEEE leadership + IUB Skills & Career Development Society presidency (1000+ students).
- `/research` — Meta-lens inverse design, FIN glaucoma fairness study
  (sole-author working paper — draft, EfficientNet-B1, FIN-race AUC 85.6), anomaly-detection
  reproducibility study (in progress — draft, ~30 algorithms, 6 families, 16 ODDS datasets).
- `/projects` — Smart Bin (ICECT 2027 Paper ID 96, GitHub link), AI diabetes prediction,
  Nexavo AI, plus the research-adjacent project cards.
- `/skills` — Grouped skills (AI/ML, Research tools, Programming) with animated skill bars.
- `/contact` — Contact form (opens your mail app) + email, phone, Lahore, LinkedIn, GitHub.
- `/hidden-talent` (alias `/chef`) — Chef Ahsan joke page. NOT in the main navigation;
  find it via the "Psst — hidden talent" link in the footer, or the hint line on the
  About page.

## Animations (GSAP)
- Hero typewriter rotating roles: AI Researcher / Meta-Optics RA / Computer Vision /
  Web Engineer.
- Scroll progress bar in the navigation, marquee ticker strip under the hero.
- GSAP scroll reveals on every section, animated counters, skill bars that fill on scroll,
  hover tilt/lift on project cards, floating soft blobs, page-transition fade on route change.
- Chef page: animated cartoon "Toon Chef Ahsan" (waves hello, blinks, stirs a bubbling
  pot, bobs gently, steam wisps), illustrated SVG food floating around the page with
  soft mouse parallax, and illustrated graphics on every dish card.

## Content rules followed
- Only verified facts are used. Nothing is labelled "published" — the FIN study is a
  "Working paper — draft" and the anomaly study is "In progress — draft".
- No "100% client satisfaction" claim, no scholarship applications, deadlines, or
  professor outreach anywhere on the site. Location is Lahore, Pakistan.

## Chef Ahsan page (hidden talent)
- Photo with a chef-hat graphic, plus the animated Toon Chef Ahsan cartoon.
- Fake menu: Biryani.exe, Chai.js, Maggi (2 minutes*), Anda Burger, Daal Chawal,
  Fries.exe — tap a dish to reveal joke reviews.
- "Michelin stars: 0 (but the neighbours can smell it)", "Reservations: just show up,
  bring your own plate", and an Order button that answers "Kitchen closed — the chef
  is debugging." Clearly a joke; no fake restaurant is presented as real.

## Security
- All `.env` files were removed from the project (they are not in this zip).
  `.env.example` lists only the key NAME (`GEMINI_API_KEY`) with no value — copy it to
  `.env` and add your own key if you run the optional local chatbot server.

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
- The chatbot's "server fallback" calls `http://localhost:5000/chat` — that only works
  when the optional local assistant server in `servers/` is running. The built-in
  canned answers cover research, projects, experience and contact without it.
