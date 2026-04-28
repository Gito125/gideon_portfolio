# PROGRESS.md — Build Tracker
> **All agents read this before starting any task.**
> **All agents update this after a verified PASS.**
> Format: simple statements. No fluff.

---

## How to Read This File

| Symbol | Meaning |
|--------|---------|
| ✅ | Done — tested and verified. Do not rebuild. |
| 🔄 | In progress — currently being built or reviewed. |
| ❌ | Failed or blocked — see notes. |
| ⬜ | Not started. |

---

## Foundation

| Status | Item | Notes |
|--------|------|-------|
| ✅ | `PRD.md` | Approved. v1.0. |
| ✅ | `SRS.md` | Approved. v1.0. |
| ✅ | `DESIGN.md` | Approved. v1.0. |
| ✅ | `copilot-instructions.md` | Active. Workspace rules set. |
| ✅ | `design.instructions.md` | Active. Passive design ruleset. |
| ✅ | `AGENTS.md` | Active. Agent workflow defined. |
| ✅ | `PROGRESS.md` | Active. This file. |
| ✅ | `app/globals.css` | CSS tokens written and mapped to design system. |
| ✅ | `lib/gsap.ts` | GSAP bootstrap with one-time plugin registration added. |
| ✅ | `lib/lenis.ts` | Lenis singleton + GSAP ticker sync helpers added. |

---

## Components

### Global / Layout

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| 🔄 | `app/layout.tsx` | — | Foundation baseline complete (fonts + metadata). Global mounts pending. |
| ⬜ | `components/preloader/Preloader.tsx` | FR-PL-01 → FR-PL-15 | — |
| ⬜ | `components/cursor/CustomCursor.tsx` | FR-CUR-01 → FR-CUR-07 | — |
| ⬜ | `components/nav/Navbar.tsx` | FR-NAV-01 → FR-NAV-06 | — |
| ⬜ | `components/shared/PageTransition.tsx` | FR-TRANS-01 → FR-TRANS-04 | — |
| ⬜ | `components/shared/SectionReveal.tsx` | — | Reusable scroll reveal wrapper. |

### Home Page

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `components/hero/HeroSection.tsx` | FR-HERO-01 → FR-HERO-06 | Static Phase 2 hero complete (no scroll sequence yet). |
| ⬜ | `components/hero/HeroScrollSequence.tsx` | FR-HERO-01 → FR-HERO-06 | Scroll pin + scrub timeline. |
| ✅ | `app/page.tsx` | — | Home now assembles static `HeroSection` + `ProjectGrid`. |

### Projects

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `data/projects.ts` | FR-PROJ-04 | Data file implemented. Acadex listed first. |
| ✅ | `components/projects/ProjectCard.tsx` | FR-PROJ-02, FR-PROJ-03, FR-PROJ-06 | Static card structure complete. |
| ✅ | `components/projects/ProjectGrid.tsx` | FR-PROJ-01, FR-PROJ-05 | Static grid complete. |
| ✅ | `app/projects/page.tsx` | FR-PROJ-01 → FR-PROJ-06 | Projects page wired to `ProjectGrid`. |

### About

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `data/stack.ts` | — | Tech stack categories implemented. |
| ✅ | `app/about/page.tsx` | FR-ABOUT-01 → FR-ABOUT-05 | About page complete for Phase 2 (no teaching mention). |

### Contact

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `app/contact/page.tsx` | FR-CON-01 → FR-CON-05 | Static form + socials complete for Phase 2. |

---

## Infrastructure

| Status | Item | Notes |
|--------|------|-------|
| ✅ | Next.js project init | App Router + TypeScript + Tailwind scaffold in place. |
| ✅ | GSAP installed | `gsap` + `@gsap/react` installed; Club plugins deferred pending license files. |
| ✅ | Lenis installed | `pnpm add lenis` complete. |
| ✅ | Framer Motion installed | `pnpm add framer-motion` complete. |
| ✅ | Google Fonts configured | Newsreader, Inter, JetBrains Mono wired via `next/font/google`. |
| ⬜ | Vercel project connected | Auto-deploy on push to `main` |
| ⬜ | Environment variables set | `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL` |
| 🔄 | CV PDF added | Placeholder files added in `/public/cv/`; replace with final CV PDF. |
| 🔄 | Hero photo added | Placeholder image added at `/public/images/hero-placeholder.svg`; replace with final portrait. |

---

## Quality Gates

| Status | Check | Target | Last Score |
|--------|-------|--------|-----------|
| ⬜ | Lighthouse Performance | ≥ 85 | — |
| ⬜ | Lighthouse Accessibility | ≥ 90 | — |
| ⬜ | First Contentful Paint | < 1.5s | — |
| ⬜ | Cumulative Layout Shift | = 0 | — |
| ✅ | `pnpm type-check` | 0 errors | PASS (2026-04-28) |
| ✅ | `pnpm lint` | 0 errors | PASS (2026-04-28) |
| ⬜ | `pnpm build` | Clean build | — |
| ⬜ | Mobile usability (Lighthouse) | ≥ 90 | — |

---

## Known Issues & Blockers

> Add issues here as they are discovered. Remove when resolved.

| Status | Issue | Discovered | Resolution |
|--------|-------|-----------|-----------|
| — | No issues logged yet. | — | — |

---

## Decisions Log

> Record decisions made during development that future agents need to know.

| Date | Decision | Reason |
|------|----------|--------|
| Setup | GSAP DrawSVG + SplitText require Club GSAP licence | Free tier does not include these plugins |
| 2026-04-28 | Club GSAP plugins deferred in `lib/gsap.ts` with TODO hooks | Keep foundation buildable while preserving integration path |
| Setup | Preloader crack replaced with horizontal split on mobile < 768px | Stability — diagonal clip-path unreliable on some mobile browsers |
| Setup | Teaching role excluded from all copy | PRD.md identity positioning decision |
| Setup | No dark mode in v1 | Out of scope per PRD.md section 5.3 |
| Setup | No CMS in v1 | Content hardcoded in `/data/` files |

---

## Changelog

> One line per session. Most recent at top.

| Date | What Changed |
|------|-------------|
| 2026-04-28 | Added placeholder assets for missing hero/project images and CV files; updated Phase 2 tracker statuses to match implementation. |
| 2026-04-28 | Phase 1 foundation implemented: dependencies, global tokens, font baseline, GSAP/Lenis libs, lint/type-check pass. |
| 2026 | Project foundation complete. All docs approved. Agent system set up. Build not yet started. |
