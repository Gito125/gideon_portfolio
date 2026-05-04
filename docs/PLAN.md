# Gideon Portfolio — Comprehensive Build Plan
**Status:** Phase 1 Foundation Complete — Phase 2 Static Complete — Phase 3 Mostly Implemented — Phase 4 Polish In Progress — Phase 5 Deployment Pending

**Last Reviewed:** 2026-05-04

Below is the structured, checkable plan covering all core features from start to finish. Mark items as `[x]` as they are completed.

**Current study notes (2026-05-04):**
- `pnpm type-check` passes.
- `pnpm build` passes when network access is available for `next/font/google`.
- `pnpm lint` currently fails on `react-hooks/set-state-in-effect` in `Preloader.tsx`, `CustomCursor.tsx`, and `Navbar.tsx`.
- Background grid/ghost text, route metadata, OG image, favicons, and public project/portrait assets are now implemented.
- Remaining SRS gaps: hero Acadex mockup/green trace + exact stats, contact backend/success-error states, strict full-screen mobile nav if required, final CV PDF verification.

---

# PROJECT: Gideon Portfolio

## PHASE 1: Foundation
- [x] Setup Next.js 16.2 with App Router only.
- [x] Verify TypeScript strict mode in `tsconfig.json` and forbid `any`.
- [x] Install dependencies via PNPM: `gsap`, `@gsap/react`, `lenis`, `framer-motion`, `lucide-react`.
- [x] Configure Tailwind v4 and ensure CSS custom properties are used for tokens.
- [x] Implement global layout structure (grid, spacing, typography constraints).
- [x] Create design tokens in `app/globals.css` aligned to `DESIGN.md`.
- [x] Create `lib/gsap.ts` and register GSAP plugins once.
- [x] Create `lib/lenis.ts` and sync Lenis with GSAP ticker.

**GUIDELINES ---**
No Pages Router. No npm/yarn. All spacing/typography/colors must reference CSS custom properties.
**EXAMPLE**
`pnpm add gsap @gsap/react framer-motion lenis lucide-react`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** app packages installed; App Router active; tokens defined in `app/globals.css`.
- **FAILURE:** Any direct hex color in component code or any `any` usage.

---

## PHASE 2: Core Sections (No animations yet)
- [x] Build Home hero layout (static) with headline, role line, CTA buttons.
- [x] Build About section layout (max 3 sentences, no teaching mention).
- [x] Build Projects grid layout (Acadex first, card structure only).
- [x] Build Contact form layout (Name, Email, Message, Submit) with minimal input styling.
- [x] Create data files `data/projects.ts` and `data/stack.ts`.

**GUIDELINES ---**
Establish the full content layout and hierarchy before any motion. Use semantic HTML.
**EXAMPLE**
Hero section uses `section`, `h1`, `p`, and CTA `button`/`Link` elements.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** All sections render with correct hierarchy and spacing without animations.
- **FAILURE:** Content hardcoded in JSX when a data file is required.

---

## PHASE 3: Animation Layer
- [x] Add Preloader sequence (FR-PL-01 → FR-PL-15) with scroll lock.
- [x] Add Custom Cursor interactions (FR-CUR-01 → FR-CUR-07).
- [x] Add base Hero scroll-pinned timeline with desktop pin, portrait, text, stats, CTAs, and mobile fallback.
- [ ] Align Hero sequence with full FR-HERO-01 → FR-HERO-06 SRS: Acadex mockup/green trace segment and exact FR-HERO-04 stat copy.
- [x] Add Project card hover trace (DrawSVG) and image grayscale transitions.
- [x] Add SectionReveal patterns for section headers and cards.
- [x] Add Framer Motion page transitions (FR-TRANS-01 → FR-TRANS-04).

**GUIDELINES ---**
Use `useGSAP` for GSAP. Respect `prefers-reduced-motion` in every animation.
**EXAMPLE**
`useGSAP(() => gsap.timeline({ scrollTrigger: { pin: true, scrub: 1 } }))`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Smooth animation flow without layout shifts; reduced-motion works.
- **FAILURE:** Using `useEffect` for GSAP or missing cleanup on unmount.

---

## PHASE 4: Polish
- [x] Add config-driven background polish: global grid lines and per-page ghost text.
- [x] Add SEO polish: route metadata, canonical URLs, OG/Twitter image config, favicons.
- [x] Code-level performance pass: `next/image`, transform-based GSAP motion, `will-change` on animated elements.
- [x] Baseline accessibility pass: skip link, visible focus styles, reduced-motion paths.
- [ ] Mobile responsiveness pass for all breakpoints (360, 768, 1024, 1440).
- [x] Verify in code that cursor is hidden on mobile and hero pin is disabled on mobile.
- [x] Verify in code that no box-shadows are used and global border-radius is forced to 0 except cursor ring.
- [ ] Resolve semantic main-landmark nesting between `AppShell` and page components.
- [ ] Replace remaining hard-coded numeric z-index utilities with semantic z-index tokens.
- [ ] Replace/verify final CV PDF.
- [ ] Run Lighthouse performance/accessibility/mobile checks.

**GUIDELINES ---**
Quality gate includes Lighthouse targets and animation performance at 60fps.
**EXAMPLE**
Verify inputs use bottom border only and focus states are visible.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Lighthouse ≥ 85 Performance, ≥ 90 Accessibility.
- **FAILURE:** CLS > 0 or missing reduced-motion fallback.

---

## PHASE 5: Deployment
- [ ] Connect project to Vercel and enable auto-deploy on `main`.
- [ ] Configure environment variables (`RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`).
- [ ] Add analytics (Vercel Analytics or equivalent).
- [x] Verify `pnpm build` is clean before deployment. PASS on 2026-05-04 with network access for Google Fonts.

**GUIDELINES ---**
Production build must be green; no missing env vars or build warnings.
**EXAMPLE**
Vercel project configured with environment variables in the dashboard.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Deployment builds cleanly and site is reachable.
- **FAILURE:** Build fails or analytics not recording.

---

## CORE FEATURE: Infrastructure & Foundation Setup
- [x] Install required packages (`gsap`, `@gsap/react`, `lenis`, `framer-motion`, `lucide-react`).
- [x] Create and populate `app/globals.css` with exact design tokens from `DESIGN.md`.
- [x] Set up `lib/gsap.ts` to register GSAP plugins (`ScrollTrigger`, `DrawSVGPlugin`, `SplitText`) once.
- [x] Set up `lib/lenis.ts` for smooth scrolling and sync with GSAP ticker.
- [x] Add shared animation types and GSAP fallback helpers in `lib/animation/`.
- [x] Add background control panel in `config/background.config.ts`.

**GUIDELINES ---**
Strictly adhere to PNPM. Do not use npm or yarn. Ensure all base design tokens (colors, fonts, spacings, easing) are hard-mapped to CSS variables.
**EXAMPLE**
`pnpm add gsap @gsap/react framer-motion lenis lucide-react`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** `pnpm dev` runs. No `any` types. `--color-amber` and `--color-green` are properly defined.
- **FAILURE:** Any token uses `#EF9F27` directly instead of `var(--color-amber)` in code.

---

## CORE FEATURE: App Shell & Page Transitions
- [x] Wrap route content with Framer Motion `AnimatePresence` through `components/shared/PageTransition.tsx`.
- [x] Create `components/shared/PageTransition.tsx` for amber/green sweeping page exits/enters.
- [x] Integrate Lenis smooth scroll globally inside `components/shared/AppShell.tsx`.
- [x] Mount global `BackgroundCanvas`, preloader, nav, cursor, and page transitions.
- [ ] Resolve duplicate `<main>` landmarks caused by `AppShell` plus page-level `<main>` elements.

**GUIDELINES ---**
Every route change needs to trigger a smooth 400ms transition. Scroll position must reset to the top on page transition.
**EXAMPLE**
```tsx
<AnimatePresence mode="wait">
  <PageTransition key={pathname}>{children}</PageTransition>
</AnimatePresence>
```
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Seamless sweeping animation between pages without layout jump.
- **FAILURE:** White flash between route changes or persistent scroll position from the previous route.

---

## CORE FEATURE: Preloader (FR-PL-01 → FR-PL-15)
- [x] Lock scroll during preloader execution.
- [x] Implement scrambling counter locking to "100" at 900ms.
- [x] Animate "Ogwang Gift Gideon" with GSAP SplitText (stagger 28ms).
- [x] Draw diagonal amber SVG crack line from bottom-left to top-right.
- [x] Replace crack with horizontal split on mobile.
- [x] Slide panels apart and reveal the hero.
- [x] Build repeat-visit skip mechanism via `sessionStorage`.
- [x] Add 3-second hard timeout and reduced-motion fade path.
- [ ] Refactor synchronous mount/media state updates to satisfy React hook lint.

**GUIDELINES ---**
The preloader is the cinematic first impression. Total duration is 1.8s on desktop.
**EXAMPLE**
GSAP timeline sequencing the scrambling counter, followed by SplitText, ending with DrawSVG line.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Cinematic experience complete under 2 seconds. Fallback on mobile is a horizontal split instead of diagonal. Respects `prefers-reduced-motion`.
- **FAILURE:** Preloader flashes the hero layout prematurely or fails to load if GSAP Club plugins are missing.

---

## CORE FEATURE: Custom Cursor (FR-CUR-01 → FR-CUR-07)
- [x] Build base state: amber filled dot (8px) + ghost ring (32px, 80ms lag).
- [x] Implement "VIEW" text expansion state for project cards.
- [x] Implement electric green morph/rotation state for CTA buttons.
- [x] Implement click ripple burst.
- [x] Hide custom cursor on mobile viewports (< 768px).
- [ ] Refactor media-query initialization to satisfy React hook lint.

**GUIDELINES ---**
Must use `pointer-events: none` and not interfere with native interactions.
**EXAMPLE**
Adding a contextual class or Zustand/Context state like `{ cursorState: "view" }` when hovering `<ProjectCard>`.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Cursor smoothly morphs to respective states without lag, fully disappearing on mobile.
- **FAILURE:** Cursor blocks underlying link clicks or stutters during scrolling.

---

## CORE FEATURE: Global Navigation (FR-NAV-01 → FR-NAV-06)
- [x] Build global Navbar component.
- [x] Delay Navbar entrance until Preloader reaches COMPLETE state.
- [x] Implement backdrop blur on scroll.
- [x] Create CV download button as a secondary action (Green outline).
- [x] Build mobile hamburger overlay/bottom-sheet menu.
- [ ] Decide whether to accept bottom-sheet mobile menu or revise to strict full-screen overlay for FR-NAV-05.
- [ ] Refactor route-change menu close to satisfy React hook lint.

**GUIDELINES ---**
Links are Work, About, Contact. Visual bottom border for active links. Nav must remain visible/sticky.
**EXAMPLE**
CV Button: `<a href="/cv/gideon-ddumba-cv.pdf" download className="border border-green text-green uppercase text-[12px] tracking-widest px-10 py-4...">...</a>`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** CV downloads the correct file. Blur works.
- **FAILURE:** Nav scrolls out of view or covers content awkwardly.

---

## CORE FEATURE: Hero Scroll Sequence (FR-HERO-01 → FR-HERO-06)
- [x] Pin the hero section using ScrollTrigger on desktop.
- [x] Scale up the hero photo (amber-toned) from 0-20% scrub.
- [x] Animate identity text, role, underline, stat chips, and CTAs in a scrubbed sequence.
- [x] Disable the scroll pin on mobile and reduced-motion contexts.
- [ ] Rise text word-by-word with SplitText from 20-45% scrub, if strict SRS fidelity is required.
- [ ] Slide in Acadex mockup with green trace from 45-70% scrub.
- [ ] Match exact FR-HERO-04 stat content: "1 Live Product · 2 Universities · Uganda → World".

**GUIDELINES ---**
Linear scrub tied to scroll progress. Disable the scroll pin on mobile.
**EXAMPLE**
`ScrollTrigger.create({ trigger: sectionRef.current, pin: true, start: "top top", end: "+=2000", scrub: 1 })`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Sequence runs fluidly on desktop as the user scrolls, unlocking exactly when all animations finish.
- **FAILURE:** Using `useEffect` instead of `useGSAP`, leading to memory leaks or stuttering.

---

## CORE FEATURE: Projects Display (FR-PROJ-01 → FR-PROJ-06)
- [x] Define `data/projects.ts` data layer (Acadex is #1).
- [x] Implement `ProjectCard` with grayscale-to-color transition.
- [x] Build GSAP-powered SVG hover trace (Green border) on the card.
- [x] Build `ProjectGrid` with `SectionReveal` wrapper hook.
- [x] Create `/projects/page.tsx`.

**GUIDELINES ---**
Card corners must be absolute zero (0px border-radius). Stack tags use JetBrains Mono, uppercase, letter-spacing 0.1em.
**EXAMPLE**
Acadex Mockup with `filter: grayscale(100%)` transitioning to `grayscale(0%)` on hover matching 400ms duration.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Green border traces the card edge completely via DrawSVG on hover.
- **FAILURE:** Rounded corners are implemented anywhere. Using `any` type for Project data interface.

---

## CORE FEATURE: About & Contact Pages (FR-ABOUT & FR-CON)
- [x] Populate `data/stack.ts`.
- [x] Build `/about/page.tsx` (Bio max 3 sentences, no mention of teaching).
- [x] Build `/contact/page.tsx` with Form layout (Name, Email, Message, Submit).
- [x] Add social links: GitHub, LinkedIn, X, and email.
- [x] Style inputs with bottom border only, expanding color on focus.
- [ ] Implement contact form backend via Vercel function or Resend API.
- [ ] Add contact form success/error states after submission.

**GUIDELINES ---**
About copy must exclude the teaching role completely. Forms have NO background fills.
**EXAMPLE**
`<input className="border-b border-border focus:border-text-primary bg-transparent rounded-none outline-none..." />`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Forms match industrial design specification (hairline borders, sharp).
- **FAILURE:** Inputs have `border-radius`, background shadows, or default focus rings.

---

## CORE FEATURE: Quality Gates & Verification
- [x] Verify `pnpm type-check` reports 0 errors. PASS on 2026-05-04.
- [ ] Verify `pnpm lint` reports 0 errors. FAIL on 2026-05-04 due React hook lint issues.
- [x] Verify `pnpm build` is clean. PASS on 2026-05-04 with network access for Google Fonts.
- [ ] Perform Lighthouse performance/accessibility checks.

**GUIDELINES ---**
Before sign-off, all code must pass strict checks. All GSAP must be properly reverted using `useGSAP` cleanup.
**EXAMPLE**
Run the `@tester` agent or `pnpm run build` locally.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Build passes. Performance >= 85, Accessibility >= 90.
- **FAILURE:** `any` types found, memory leaks on unmount, or reduced motion isn't respected.
