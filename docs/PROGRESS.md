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
| ⚠️ | Partial — implemented, but has an SRS, quality, or verification gap. |
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
| ✅ | `PLAN.md` | Active. Build plan updated to match current implementation state. |
| ✅ | `app/globals.css` | CSS tokens written and mapped to design system. |
| ✅ | `lib/gsap.ts` | GSAP bootstrap with one-time plugin registration added. |
| ✅ | `lib/lenis.ts` | Lenis singleton + GSAP ticker sync helpers added. |
| ✅ | `lib/animation/types.ts` | Shared animation state types added. |
| ✅ | `lib/animation/gsap-fallbacks.ts` | SplitText/DrawSVG fallback helpers added. |
| ✅ | `config/background.config.ts` | Centralized background grid + ghost text controls added. |

---

## Components

### Global / Layout

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `app/layout.tsx` | — | Fonts, metadata, OG/Twitter image config, AppShell, and global background mounted. |
| ✅ | `components/background/BackgroundCanvas.tsx` | — | Complete. Global background mount controlled by config. |
| ✅ | `components/background/GridLines.tsx` | NFR-09 | Complete. Scroll-drifting SVG hairline grid with reduced-motion handling. |
| ✅ | `components/background/GhostText.tsx` | NFR-09 | Complete. Per-page oversized ghost words with scroll motion and reduced-motion fallback. |
| ⚠️ | `components/preloader/Preloader.tsx` | FR-PL-01 → FR-PL-15 | Functional sequence complete; lint cleanup pending for `react-hooks/set-state-in-effect`. |
| ⚠️ | `components/cursor/CustomCursor.tsx` | FR-CUR-01 → FR-CUR-07 | Functional cursor states complete; lint cleanup pending for `react-hooks/set-state-in-effect`. |
| ⚠️ | `components/nav/Navbar.tsx` | FR-NAV-01 → FR-NAV-06 | Functional sticky nav, CV, blur, active links, mobile menu; lint cleanup pending and mobile menu is bottom-sheet style rather than strict full-screen panel. |
| ✅ | `components/shared/PageTransition.tsx` | FR-TRANS-01 → FR-TRANS-04 | Complete. Framer Motion transitions working. |
| ✅ | `components/shared/SectionReveal.tsx` | — | Complete. Reusable scroll reveal wrapper. |
| ✅ | `components/shared/AppShell.tsx` | — | Complete. Preloader, Navbar, Cursor, PageTransition wired. Lenis initialized. |

### Home Page

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `components/hero/HeroSection.tsx` | FR-HERO-01 → FR-HERO-06 | Complete wrapper around `HeroScrollSequence`. |
| ⚠️ | `components/hero/HeroScrollSequence.tsx` | FR-HERO-01, FR-HERO-02, FR-HERO-03, FR-HERO-05, FR-HERO-06 | Desktop pin, portrait, identity text, stats, CTAs, mobile/reduced-motion fallback implemented. FR-HERO-04 exact stats and Acadex mockup/green trace segment still need SRS alignment. |
| ✅ | `app/page.tsx` | — | Complete. Home assembles HeroSection + ProjectGrid. |

### Projects

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `data/projects.ts` | FR-PROJ-04 | Data file implemented. Acadex listed first; two projects currently populated. |
| ✅ | `components/projects/ProjectCard.tsx` | FR-PROJ-02, FR-PROJ-03, FR-PROJ-06 | Card structure, grayscale transition, cursor state, and green hover trace implemented. |
| ✅ | `components/projects/ProjectGrid.tsx` | FR-PROJ-01, FR-PROJ-05 | Grid complete with Acadex featured first and SectionReveal wrapper. |
| ✅ | `app/projects/page.tsx` | FR-PROJ-01 → FR-PROJ-06 | Projects page wired to `ProjectGrid`. |

### About

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `data/stack.ts` | — | Tech stack categories implemented. |
| ✅ | `app/about/page.tsx` | FR-ABOUT-01 → FR-ABOUT-05 | About page complete: three-sentence bio, no teaching mention, stack grid, CV link, photo. |

### Contact

| Status | Component | SRS IDs | Notes |
|--------|-----------|---------|-------|
| ✅ | `app/contact/page.tsx` | FR-CON-01 → FR-CON-05 | Complete. Form posts to `/api/contact`, shows success/error states, and supports Resend/MailerSend/Brevo/none providers. |

---

## Infrastructure

| Status | Item | Notes |
|--------|------|-------|
| ✅ | Next.js project init | App Router + TypeScript + Tailwind scaffold in place. |
| ✅ | GSAP installed | `gsap` + `@gsap/react` + Club plugins (SplitText, DrawSVG) all registered and active in `lib/gsap.ts`. |
| ✅ | Lenis installed | `pnpm add lenis` complete. |
| ✅ | Framer Motion installed | `pnpm add framer-motion` complete. |
| ✅ | Google Fonts configured | Newsreader, Inter, JetBrains Mono wired via `next/font/google`. |
| ⚠️ | Z-index design tokens | CSS custom properties + Tailwind utilities added to `app/globals.css`. Some hard-coded z utilities remain and need cleanup. |
| ✅ | Background system | Config-driven grid lines and per-page ghost text added; mounted globally/per page. |
| ✅ | SEO metadata | Route metadata, canonical URLs, OpenGraph, Twitter card, OG image, and favicons present. |
| ✅ | Hero photo added | Optimized portrait image at `/public/images/hero-portrait-optimized.jpg`; integrated into HeroScrollSequence. |
| ✅ | Skip-to-content link | Added to `components/shared/AppShell.tsx` for keyboard navigation accessibility. |
| ✅ | Form input focus styles | Enhanced in contact page with green border on focus + accessibility CSS in globals.css. |
| ⚠️ | Lighthouse audit | Pending. To be run on deployed Vercel instance or local build. |
| ⬜ | Vercel project connected | Auto-deploy on push to `main` |
| ⚠️ | Environment variables set | Contact mailer now supports `EMAIL_PROVIDER`, `RESEND_TOKEN`, `SENDER_EMAIL`, `CONTACT_FORM_RECIPIENT_EMAIL`, and `EMAIL_RATE_LIMIT_PER_HOUR`; deployment values still need verification. |
| ✅ | Contact form backend | `/api/contact` sends owner + sender emails through configured provider and enforces hourly rate limit. |
| ⚠️ | CV PDF final | `/public/cv/Ogwang_Gift_Gideon_CV.pdf` exists, but file size indicates placeholder content. Verify final PDF. |

---

## Quality Gates

| Status | Check | Target | Last Score |
|--------|-------|--------|-----------|
| ⬜ | Lighthouse Performance | ≥ 85 | — |
| ⬜ | Lighthouse Accessibility | ≥ 90 | — |
| ⬜ | First Contentful Paint | < 1.5s | — |
| ⬜ | Cumulative Layout Shift | = 0 | — |
| ✅ | `pnpm type-check` | 0 errors | PASS (2026-06-06) |
| ❌ | `pnpm lint` | 0 errors | FAIL (2026-05-04): `react-hooks/set-state-in-effect` in Preloader, CustomCursor, Navbar. |
| ✅ | `pnpm build` | Clean build | PASS (2026-06-06). Required network access for `next/font/google` fetch. |
| ⬜ | Mobile usability (Lighthouse) | ≥ 90 | — |

---

## Known Issues & Blockers

| Status | Issue | Discovered | Resolution |
|--------|-------|-----------|-----------|
| ❌ | `pnpm lint` fails on `react-hooks/set-state-in-effect`. | 2026-05-04 | Refactor synchronous setState in `Preloader.tsx`, `CustomCursor.tsx`, and `Navbar.tsx`. |
| ⚠️ | Hero sequence does not yet include Acadex mockup/green trace segment and exact FR-HERO-04 stat copy. | 2026-05-04 | Align `HeroScrollSequence.tsx` with FR-HERO-04 and the 45-70% SRS segment. |
| ✅ | Contact form lacked backend submission and success/error states. | 2026-05-04 | Implemented provider-based `/api/contact` email delivery and UI states for FR-CON-02/FR-CON-04. |
| ⚠️ | Pages return `<main>` while `AppShell` also wraps route content in `<main id="main-content">`. | 2026-05-04 | Keep one main landmark per page. |
| ⚠️ | Mobile nav panel is implemented as a bottom sheet, not a strict full-screen menu panel. | 2026-05-04 | Decide whether the bottom-sheet design is accepted or revise to match FR-NAV-05 exactly. |
| ⚠️ | Hard-coded z-index utilities remain in several components despite semantic z-index tokens. | 2026-05-04 | Replace remaining `z-[...]`/numeric z classes with semantic utilities or variables. |
| ⚠️ | CV PDFs appear to be placeholders. | 2026-05-04 | Replace with final CV PDF before deployment. |

---

## Decisions Log

> Record decisions made during development that future agents need to know.

| Date | Decision | Reason |
|------|----------|--------|
| 2026-05-04 | Background system added as config-driven layer | Keep global grid and per-page ghost text adjustable from `config/background.config.ts` without touching component internals. |
| 2026-05-04 | Production build verified with network access | `next/font/google` needs to fetch Google Fonts during build when not cached. |
| 2026-04-29 | GSAP Club plugins (SplitText, DrawSVG) activated | Plugins are registered in `lib/gsap.ts`; SplitText is used by Preloader, and DrawSVG remains available where strict plugin drawing is needed. |
| 2026-04-29 | Z-index tokens created as CSS custom properties | Centralize stacking context management; cleanup of remaining numeric z-index utilities is still pending. |
| 2026-04-29 | Hero portrait optimized asset added | `hero-portrait-optimized.jpg` is present and used by the hero; verify final compression target before deployment. |
| 2026-04-29 | Accessibility improvements: skip-to-content link + enhanced form focus | Added skip-to-content link visible on Tab focus; form inputs now have green bottom border on focus |
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
|------|--------------|
| 2026-06-06 | Implemented contact mailer provider switch for Resend/MailerSend/Brevo/none, added recipient env support, enforced hourly rate limit, and verified type-check/build. |
| 2026-05-04 | Studied `app`, `components`, `config`, `data`, `docs`, and `lib`; updated tracker with background system, SEO metadata, current SRS gaps, and fresh quality gate results. |
| 2026-04-29 | **Phase 4 Polish (In Progress):** Z-index tokens created + GSAP Club plugins activated + hero image replaced + accessibility improvements (skip-to-content, form focus). |
| 2026-04-28 | Added placeholder assets for missing hero/project images and CV files; updated Phase 2 tracker statuses to match implementation. |
| 2026-04-28 | Phase 1 foundation implemented: dependencies, global tokens, font baseline, GSAP/Lenis libs, lint/type-check pass. |
| 2026 | Project foundation complete. All docs approved. Agent system set up. Build not yet started. |
