# Gideon Portfolio — Comprehensive Build Plan
**Status:** Phase 1 Foundation Complete — Phase 2 Complete (Static) — Phase 3 Pending

Below is the structured, checkable plan covering all core features from start to finish. Mark items as `[x]` as they are completed.

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
- [ ] Add Preloader sequence (FR-PL-01 → FR-PL-15) with scroll lock.
- [ ] Add Custom Cursor interactions (FR-CUR-01 → FR-CUR-07).
- [ ] Add Hero scroll-pinned timeline (FR-HERO-01 → FR-HERO-06).
- [ ] Add Project card hover trace (DrawSVG) and image grayscale transitions.
- [ ] Add SectionReveal patterns for section headers and cards.
- [ ] Add Framer Motion page transitions (FR-TRANS-01 → FR-TRANS-04).

**GUIDELINES ---**
Use `useGSAP` for GSAP. Respect `prefers-reduced-motion` in every animation.
**EXAMPLE**
`useGSAP(() => gsap.timeline({ scrollTrigger: { pin: true, scrub: 1 } }))`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Smooth animation flow without layout shifts; reduced-motion works.
- **FAILURE:** Using `useEffect` for GSAP or missing cleanup on unmount.

---

## PHASE 4: Polish
- [ ] Performance optimization (lazy-load images, avoid layout thrash, use transforms).
- [ ] Accessibility pass (focus styles, semantic tags, ARIA where needed).
- [ ] Mobile responsiveness pass for all breakpoints (360, 768, 1024, 1440).
- [ ] Verify cursor hidden on mobile and hero pin disabled on mobile.
- [ ] Verify no box-shadows, no border-radius except cursor ring.

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
- [ ] Verify `pnpm build` is clean before deployment.

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
- [x] Set up `lib/gsap.ts` to register currently available plugins (`ScrollTrigger`, `@gsap/react`) and defer Club plugins.
- [x] Set up `lib/lenis.ts` for smooth scrolling and sync with GSAP ticker.

**GUIDELINES ---**
Strictly adhere to PNPM. Do not use npm or yarn. Ensure all base design tokens (colors, fonts, spacings, easing) are hard-mapped to CSS variables.
**EXAMPLE**
`pnpm add gsap @gsap/react framer-motion lenis lucide-react`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** `pnpm dev` runs. No `any` types. `--color-amber` and `--color-green` are properly defined.
- **FAILURE:** Any token uses `#EF9F27` directly instead of `var(--color-amber)` in code.

---

## CORE FEATURE: App Shell & Page Transitions
- [ ] Wrap `app/layout.tsx` with Framer Motion's `AnimatePresence`.
- [ ] Create `components/shared/PageTransition.tsx` for amber/green sweeping page exits/enters.
- [ ] Integrate Lenis smooth scroll globally inside the layout.

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
- [ ] Lock scroll during preloader execution.
- [ ] Implement scrambling counter locking to "100" at 900ms.
- [ ] Animate "Ogwang Gift Gideon" with GSAP SplitText (stagger 28ms).
- [ ] Draw diagonal amber SVG crack line from bottom-left to top-right.
- [ ] Slide panels apart and reveal the hero.
- [ ] Build repeat-visit skip mechanism via `sessionStorage`.

**GUIDELINES ---**
The preloader is the cinematic first impression. Total duration is 1.8s on desktop.
**EXAMPLE**
GSAP timeline sequencing the scrambling counter, followed by SplitText, ending with DrawSVG line.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Cinematic experience complete under 2 seconds. Fallback on mobile is a horizontal split instead of diagonal. Respects `prefers-reduced-motion`.
- **FAILURE:** Preloader flashes the hero layout prematurely or fails to load if GSAP Club plugins are missing.

---

## CORE FEATURE: Custom Cursor (FR-CUR-01 → FR-CUR-07)
- [ ] Build base state: amber filled dot (8px) + ghost ring (32px, 80ms lag).
- [ ] Implement "VIEW" text expansion state for project cards.
- [ ] Implement electric green morph/rotation state for CTA buttons.
- [ ] Implement click ripple burst.
- [ ] Hide custom cursor on mobile viewports (< 768px).

**GUIDELINES ---**
Must use `pointer-events: none` and not interfere with native interactions.
**EXAMPLE**
Adding a contextual class or Zustand/Context state like `{ cursorState: "view" }` when hovering `<ProjectCard>`.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Cursor smoothly morphs to respective states without lag, fully disappearing on mobile.
- **FAILURE:** Cursor blocks underlying link clicks or stutters during scrolling.

---

## CORE FEATURE: Global Navigation (FR-NAV-01 → FR-NAV-06)
- [ ] Build global Navbar component.
- [ ] Delay Navbar entrance until Preloader reaches COMPLETE state.
- [ ] Implement backdrop blur on scroll.
- [ ] Create CV download button as a secondary action (Green outline).
- [ ] Build mobile full-screen hamburger menu overlay.

**GUIDELINES ---**
Links are Work, About, Contact. Visual bottom border for active links. Nav must remain visible/sticky.
**EXAMPLE**
CV Button: `<a href="/cv/gideon-ddumba-cv.pdf" download className="border border-green text-green uppercase text-[12px] tracking-widest px-10 py-4...">...</a>`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** CV downloads the correct file. Blur works.
- **FAILURE:** Nav scrolls out of view or covers content awkwardly.

---

## CORE FEATURE: Hero Scroll Sequence (FR-HERO-01 → FR-HERO-06)
- [ ] Pin the hero section using ScrollTrigger.
- [ ] Scale up the hero photo (amber-toned) from 0-20% scrub.
- [ ] Rise text word-by-word with SplitText from 20-45% scrub.
- [ ] Slide in Acadex mockup with green trace from 45-70% scrub.
- [ ] Animate stat chips and CTAs from 70-100% scrub.

**GUIDELINES ---**
Linear scrub tied to scroll progress. Disable the scroll pin on mobile.
**EXAMPLE**
`ScrollTrigger.create({ trigger: sectionRef.current, pin: true, start: "top top", end: "+=2000", scrub: 1 })`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Sequence runs fluidly on desktop as the user scrolls, unlocking exactly when all animations finish.
- **FAILURE:** Using `useEffect` instead of `useGSAP`, leading to memory leaks or stuttering.

---

## CORE FEATURE: Projects Display (FR-PROJ-01 → FR-PROJ-06)
- [ ] Define `data/projects.ts` data layer (Acadex is #1).
- [ ] Implement `ProjectCard` with grayscale-to-color transition.
- [ ] Build GSAP DrawSVG hover trace (Green border) on the card.
- [ ] Build `ProjectGrid` with `SectionReveal` wrapper hook.
- [ ] Create `/projects/page.tsx`.

**GUIDELINES ---**
Card corners must be absolute zero (0px border-radius). Stack tags use JetBrains Mono, uppercase, letter-spacing 0.1em.
**EXAMPLE**
Acadex Mockup with `filter: grayscale(100%)` transitioning to `grayscale(0%)` on hover matching 400ms duration.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Green border traces the card edge completely via DrawSVG on hover.
- **FAILURE:** Rounded corners are implemented anywhere. Using `any` type for Project data interface.

---

## CORE FEATURE: About & Contact Pages (FR-ABOUT & FR-CON)
- [ ] Populate `data/stack.ts`.
- [ ] Build `/about/page.tsx` (Bio max 3 sentences, no mention of teaching).
- [ ] Build `/contact/page.tsx` with Form layout (Name, Email, Message, Submit).
- [ ] Style inputs with bottom border only, expanding color on focus.

**GUIDELINES ---**
About copy must exclude the teaching role completely. Forms have NO background fills.
**EXAMPLE**
`<input className="border-b border-border focus:border-text-primary bg-transparent rounded-none outline-none..." />`
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Forms match industrial design specification (hairline borders, sharp).
- **FAILURE:** Inputs have `border-radius`, background shadows, or default focus rings.

---

## CORE FEATURE: Quality Gates & Verification
- [x] Verify `pnpm type-check` reports 0 errors.
- [x] Verify `pnpm lint` reports 0 errors.
- [ ] Perform Lighthouse performance/accessibility checks.

**GUIDELINES ---**
Before sign-off, all code must pass strict checks. All GSAP must be properly reverted using `useGSAP` cleanup.
**EXAMPLE**
Run the `@tester` agent or `pnpm run build` locally.
**SUCCESS/FAILURE RULES**
- **SUCCESS:** Build passes. Performance >= 85, Accessibility >= 90.
- **FAILURE:** `any` types found, memory leaks on unmount, or reduced motion isn't respected.
