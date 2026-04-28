# SRS — System Requirements Specification
**Document Type:** System Requirements Specification  
**Project:** Ogwang Gift Gideon Portfolio  
**Version:** 1.0  
**Status:** Approved — Ready for Development  

---

## 1. System Overview

A Next.js 16.2 portfolio website for Ogwang Gift Gideon. Statically generated where possible, deployed on Vercel. The system is a frontend-only application — no backend, no database, no authentication. All content is hardcoded or managed through local data files.

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 16.2 | App Router only. No Pages Router. |
| Language | TypeScript | Latest | Strict mode enabled |
| Package Manager | PNPM | Latest | No npm or yarn |
| Styling | Tailwind CSS | v4 | Required for shadcn/ui |
| UI Components | shadcn/ui | Latest | Used for icons via lucide-react |
| Icons | lucide-react | Latest | Via shadcn — not a full component library |
| Scroll | Lenis | Latest | Smooth scroll base layer |
| Animation (scroll) | GSAP + ScrollTrigger | Latest | All scroll-driven animations |
| Animation (text) | GSAP SplitText | Latest | Character/word splitting |
| Animation (draw) | GSAP DrawSVG | Latest | Diagonal crack line |
| Animation (transitions) | Framer Motion | Latest | Page transitions, component mounts |
| Deployment | Vercel | — | Auto-deploy on push to main |
| Font | Google Fonts | — | JetBrains Mono + display font TBD in DESIGN.md |

---

## 3. Project Structure

```
gideon-portfolio/
├── app/
│   ├── layout.tsx          # Root layout — Lenis, cursor, fonts
│   ├── page.tsx            # Home — hero + featured projects
│   ├── projects/
│   │   └── page.tsx        # All projects
│   ├── about/
│   │   └── page.tsx        # About + stack + CV
│   └── contact/
│       └── page.tsx        # Contact form + socials
├── components/
│   ├── preloader/
│   │   └── Preloader.tsx
│   ├── cursor/
│   │   └── CustomCursor.tsx
│   ├── nav/
│   │   └── Navbar.tsx
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   └── HeroScrollSequence.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectGrid.tsx
│   └── shared/
│       ├── PageTransition.tsx
│       └── SectionReveal.tsx
├── data/
│   ├── projects.ts         # All project data
│   └── stack.ts            # Tech stack data
├── lib/
│   ├── lenis.ts            # Lenis initialisation
│   └── gsap.ts             # GSAP context + plugins registration
├── public/
│   ├── images/
│   └── cv/
│       └── gideon-ddumba-cv.pdf
└── styles/
    └── globals.css
```

---

## 4. Functional Requirements

### 4.1 Preloader Component

| ID | Requirement |
|----|------------|
| FR-PL-01 | Scroll must be locked (`overflow: hidden` on body) for the entire preloader duration |
| FR-PL-02 | Counter scrambles random 2-digit numbers at 40ms intervals |
| FR-PL-03 | Counter locks to "100" at 900ms with a scale punch animation (1.2 → 1.0) |
| FR-PL-04 | Amber underline draws under counter on lock using GSAP DrawSVG or scaleX |
| FR-PL-05 | "Ogwang Gift Gideon" types in character by character with 28ms stagger starting at 150ms |
| FR-PL-06 | "I build things that matter." fades in word by word with 60ms stagger at 900ms |
| FR-PL-07 | Diagonal amber SVG line draws from bottom-left to top-right at 1150ms |
| FR-PL-08 | Two panels (top-right, bottom-left) slide off screen after line draw completes |
| FR-PL-09 | Hero section is pre-rendered under preloader — no layout flash on reveal |
| FR-PL-10 | Custom cursor fades in only after preloader COMPLETE state |
| FR-PL-11 | Lenis scroll enabled only after preloader COMPLETE state |
| FR-PL-12 | On repeat visit in same session (sessionStorage flag), preloader is skipped |
| FR-PL-13 | If assets fail to load, preloader completes after 3 second hard timeout |
| FR-PL-14 | On mobile (< 768px), diagonal crack replaced with horizontal split for stability |
| FR-PL-15 | Respects `prefers-reduced-motion` — all animations replaced with simple fade |

**Preloader States:**
```
IDLE → COUNTING → LOCKING → CRACKING → REVEALING → COMPLETE
```

**Total Duration:** 1.8 seconds (desktop)

---

### 4.2 Custom Cursor Component

| ID | Requirement |
|----|------------|
| FR-CUR-01 | Hidden on mobile (< 768px) — native cursor used |
| FR-CUR-02 | Default state: amber filled dot (8px) + ghost ring (32px) with 80ms lag |
| FR-CUR-03 | On project card hover: expands to 64px circle, displays "VIEW" text inside |
| FR-CUR-04 | On CTA button hover: morphs to electric green, slight rotation |
| FR-CUR-05 | On click: burst ripple animation, snaps back to default |
| FR-CUR-06 | Cursor fades in (opacity 0 → 1) after preloader COMPLETE state |
| FR-CUR-07 | Cursor uses `pointer-events: none` — never blocks clicks |

---

### 4.3 Navigation

| ID | Requirement |
|----|------------|
| FR-NAV-01 | Nav is hidden during preloader, fades down from top after COMPLETE |
| FR-NAV-02 | Links: Work · About · Contact |
| FR-NAV-03 | CV download button always visible in nav on every page |
| FR-NAV-04 | Active page link indicated visually |
| FR-NAV-05 | Mobile: hamburger menu with full-screen overlay |
| FR-NAV-06 | Nav does not scroll away — stays accessible |

---

### 4.4 Hero Section (Scroll Sequence)

The hero section is a **scroll-pinned section** — GSAP ScrollTrigger pins it while the scroll position drives the animation timeline.

| Scroll % | Animation Event |
|----------|----------------|
| 0–20% | Photo scales up from 80% — full presence, no text yet |
| 20–45% | "Ogwang Gift Gideon" rises word by word (SplitText). Role fades in below. Amber underline draws under name. |
| 45–70% | Acadex mockup slides in from right with electric green border trace. Three stat chips animate in. |
| 70–100% | Two CTA buttons pulse in. Nav already visible. Pin releases. Visitor enters site. |

| ID | Requirement |
|----|------------|
| FR-HERO-01 | Section is pinned using GSAP ScrollTrigger `pin: true` |
| FR-HERO-02 | Scroll progress (0–1) drives the animation timeline via `scrub: 1` |
| FR-HERO-03 | Photo is real photo of Gideon — high contrast, amber-toned via CSS filter |
| FR-HERO-04 | Stat chips content: "1 Live Product · 2 Universities · Uganda → World" |
| FR-HERO-05 | CTAs: "See My Work" (amber filled) + "Let's Talk" (electric green outline) |
| FR-HERO-06 | On mobile, scroll pin is disabled — linear scroll used instead |

---

### 4.5 Projects Page

| ID | Requirement |
|----|------------|
| FR-PROJ-01 | Acadex is always the first and largest featured project |
| FR-PROJ-02 | Each project card shows: name, category, short description, tech stack tags, year |
| FR-PROJ-03 | On project card hover: electric green border traces around card, cursor morphs to "VIEW" |
| FR-PROJ-04 | Projects data stored in `/data/projects.ts` — not hardcoded in JSX |
| FR-PROJ-05 | Section title and cards reveal on scroll via GSAP ScrollTrigger |
| FR-PROJ-06 | Stack tags use monospace font |

---

### 4.6 About Page

| ID | Requirement |
|----|------------|
| FR-ABOUT-01 | No mention of teaching |
| FR-ABOUT-02 | Short bio — maximum 3 sentences |
| FR-ABOUT-03 | Tech stack displayed as categorised grid |
| FR-ABOUT-04 | CV download button prominent — links to `/public/cv/gideon-ddumba-cv.pdf` |
| FR-ABOUT-05 | Photo of Gideon present |

---

### 4.7 Contact Page

| ID | Requirement |
|----|------------|
| FR-CON-01 | Contact form fields: Name, Email, Message, Send button |
| FR-CON-02 | Form submission handled via Vercel serverless function or Resend API |
| FR-CON-03 | Social links: GitHub, LinkedIn, Twitter/X |
| FR-CON-04 | Success/error state shown after submission |
| FR-CON-05 | Form fields use minimal under-line styling per DESIGN.md |

---

### 4.8 Page Transitions

| ID | Requirement |
|----|------------|
| FR-TRANS-01 | All route changes wrapped in Framer Motion `AnimatePresence` |
| FR-TRANS-02 | Transition: amber or green bar sweeps across screen on exit, new page slides in on enter |
| FR-TRANS-03 | Transition duration: 400ms total |
| FR-TRANS-04 | Scroll position resets to top on every page transition |

---

## 5. Non-Functional Requirements

| ID | Requirement | Target |
|----|------------|--------|
| NFR-01 | Lighthouse Performance Score | ≥ 85 |
| NFR-02 | Lighthouse Accessibility Score | ≥ 90 |
| NFR-03 | First Contentful Paint | < 1.5s |
| NFR-04 | Mobile responsive | All breakpoints: 360px, 768px, 1024px, 1440px |
| NFR-05 | No layout shift during preloader reveal | CLS = 0 |
| NFR-06 | GSAP animations use `will-change: transform` where needed | Perf optimised |
| NFR-07 | All images use `next/image` with proper sizing | No raw `<img>` tags |
| NFR-08 | TypeScript strict mode — no `any` types | Code quality |
| NFR-09 | `prefers-reduced-motion` respected across all animations | Accessibility |
| NFR-10 | Site functions without JavaScript (basic layout visible) | Progressive enhancement |

---

## 6. Animation System Architecture

```
Lenis (smooth scroll)
    ↕ synced via GSAP ticker
GSAP ScrollTrigger (scroll-driven animations)
    — Hero pin + scrub
    — Section reveals (opacity + y transform)
    — Project card interactions
GSAP SplitText (text animations)
    — Hero name entrance
    — Section headlines
GSAP DrawSVG (line drawing)
    — Preloader diagonal crack line
    — Amber underlines
Framer Motion (component lifecycle)
    — Page transitions (AnimatePresence)
    — Component mount/unmount
    — CTA button hover states
```

---

## 7. Data Structures

### Project Data (`/data/projects.ts`)
```typescript
interface Project {
  id: string
  title: string
  category: string
  description: string
  year: number
  stack: string[]
  featured: boolean
  image: string
  link?: string
  github?: string
}
```

### Stack Data (`/data/stack.ts`)
```typescript
interface StackItem {
  name: string
  category: 'Frontend' | 'Backend' | 'Tools' | 'Currently Learning'
}
```

---

## 8. Environment Variables

```env
# Contact form (if using Resend)
RESEND_API_KEY=

# Site URL
NEXT_PUBLIC_SITE_URL=
```

---

## 9. Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

---

## 10. Document References

| Document | Purpose |
|----------|---------|
| `PRD.md` | Product vision, goals, user types, success metrics |
| `DESIGN.md` | Visual design system, colours, typography, animation tokens |
