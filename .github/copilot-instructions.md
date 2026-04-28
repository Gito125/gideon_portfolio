# Copilot Workspace Instructions — Ogwang Gift Gideon Portfolio
> **Applies to:** Every Copilot interaction in this workspace, at all times.
> **Do not override** these rules unless explicitly told to by Gideon.

---

## 1. Project Identity

This is a personal portfolio website for **Ogwang Gift Gideon — Full-Stack Developer & Product Builder**.

It is not a CV site. It is a **live brand statement**. Every component, every animation, every line of copy must make the visitor feel *"this guy is the real deal"* before they read a single word.

- **Flagship product:** Acadex — a school management application
- **Tone:** Sharp, confident, creative, human
- **Teaching role:** Never mentioned. Not in bio, not in projects, not anywhere.
- **Positioning:** Uganda-based, globally ambitious

> One-sentence north star: *A portfolio that makes the visitor feel Gideon before they know Gideon.*

---

## 2. Agents

Three agents live in `.github/agents/`. Invoke with `@agent-name` in Copilot Chat.

| Agent | File | Purpose |
|-------|------|---------|
| `@builder` | `builder.md` | Builds features from SRS spec. Auto-calls `@reviewer` when done. |
| `@reviewer` | `reviewer.md` | Flags violations AND rewrites them. Never report-only. |
| `@tester` | `tester.md` | Tests animation correctness, functional behaviour, and code quality. |

**Default workflow:**
```
You give a task → @builder builds → auto-calls @reviewer → @reviewer fixes → @tester validates
```

---

## 3. Tech Stack — Non-Negotiable

| Layer | Technology | Constraint |
|-------|-----------|-----------|
| Framework | Next.js 16.2 | App Router ONLY. Pages Router is forbidden. |
| Language | TypeScript | Strict mode. Zero `any` types. Zero missing return types. |
| Package Manager | PNPM | Never suggest `npm` or `yarn` commands. Ever. |
| Styling | Tailwind CSS v4 + CSS custom properties | All design tokens from `styles/globals.css` |
| Smooth Scroll | Lenis | Initialised in `lib/lenis.ts`. Synced with GSAP ticker. |
| Scroll Animations | GSAP + ScrollTrigger | All scroll-driven, pinned, and scrubbed animations |
| Text Animation | GSAP SplitText | Hero name, section headlines |
| SVG Drawing | GSAP DrawSVG | Preloader crack line, amber underlines |
| Page Transitions | Framer Motion `AnimatePresence` | Route changes only |
| Component Animation | Framer Motion | Mount/unmount, CTA hover states |
| Deployment | Vercel | Static generation preferred. Auto-deploy on `main`. |

---

## 4. Project Structure — Enforce Always

```
gideon-portfolio/
├── .github/
│   ├── copilot-instructions.md       ← This file
│   ├── instructions/
│   │   └── design.instructions.md   ← Passive design ruleset
│   └── agents/
│       ├── builder.md
│       ├── reviewer.md
│       └── tester.md
|   └── skills/
├── app/
│   ├── layout.tsx                    ← Root: Lenis init, cursor, fonts, AnimatePresence
│   ├── page.tsx                      ← Home: hero + featured projects
│   ├── projects/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── preloader/Preloader.tsx
│   ├── cursor/CustomCursor.tsx
│   ├── nav/Navbar.tsx
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
│   ├── projects.ts                   ← Never hardcode project data in JSX
│   └── stack.ts
├── lib/
│   ├── lenis.ts                      ← Lenis instance + GSAP sync
│   └── gsap.ts                       ← GSAP context + plugin registration
├── public/
│   ├── images/
│   └── cv/ogwang-gift-gideon-cv.pdf
└── styles/
    └── globals.css                   ← All CSS custom properties live here
```

---

## 5. Coding Standards

### TypeScript
- Strict mode enabled in `tsconfig.json`. Never disable.
- No `any` type. If you're tempted to use `any`, create a proper interface.
- All component props typed with explicit interfaces.
- All async functions return typed promises.
- Data interfaces live in the same file unless shared — then `types/` folder.

### React / Next.js
- `next/image` for ALL images. No raw `<img>` tags.
- `next/link` for ALL internal navigation. No raw `<a>` tags for routes.
- Server components by default. Add `'use client'` only when needed (interactions, hooks, GSAP).
- Data in `/data/*.ts` files. Never hardcode content in JSX.

### GSAP in React
- Always use the `useGSAP` hook. Never `useEffect` for GSAP animations.
- Always call `context.revert()` on cleanup.
- Register all plugins in `lib/gsap.ts` once. Never register per-component.

### CSS / Styling
- All colour values must use CSS custom properties: `var(--color-amber)`, never `#EF9F27`
- All spacing must use spacing tokens: `var(--space-4)`, never arbitrary pixel values
- All typography must use type tokens: `var(--text-display)`, never raw font-size
- No `border-radius` on any element except `.cursor-ring` (which uses `border-radius: 50%`)
- No `box-shadow` or `drop-shadow` — depth through tonal shift and hairline borders only

### Accessibility
- `prefers-reduced-motion` respected in every animation. Provide a simple `opacity` fallback.
- Semantic HTML. No `<div>` where a `<section>`, `<nav>`, `<article>`, `<button>` is correct.
- All images have meaningful `alt` text.
- Focus styles visible on all interactive elements.

---

## 6. Skills — When to Invoke

These skills are available in this workspace. Copilot should invoke them where appropriate.

| Skill | Invoke When |
|-------|------------|
| `gpt-taste` | Making any UI/UX decision — layout, spacing, hierarchy, interaction pattern |
| `distill` | Removing unnecessary elements, simplifying a component, cutting visual noise |
| `full-output-enforcement` | Writing any complete component or file — never truncate |
| `gsap-react` | Any GSAP animation inside a React/Next.js component |
| `gsap-scrolltrigger` | Hero pin, section reveals, scroll-scrubbed timelines |
| `gsap-timeline` | Preloader sequence, hero entrance, multi-step animations |
| `gsap-performance` | Optimising any animation for 60fps |
| `animate` | Micro-interactions, hover states, feedback animations |
| `adapt` | Responsive behaviour, mobile fallbacks (esp. preloader + hero pin) |
| `bolder` | If any UI element feels generic or weak |
| `delight` | Adding personality moments without blocking usability |
| `audit` | Code review, accessibility, performance scoring |
| `colorize` | Applying amber/green accent logic to new elements |

---

## 7. Document References

| File | What It Governs |
|------|----------------|
| `docs/PRD.md` | Product vision, user types, success metrics, scope |
| `docs/SRS.md` | All functional requirements — reference by FR-ID (e.g. FR-PL-01) |
| `docs/DESIGN.md` | Full visual spec — colours, typography, animation tokens, components |
| `docs/PROGRESS.md` | Tracking progress and completion status |
| `.github/instructions/design.instructions.md` | Compressed design ruleset — applied passively |

---

## 8. What Copilot Must Never Do

- Suggest `npm install` or `yarn add` — PNPM only
- Use `useEffect` for GSAP — use `useGSAP`
- Use hardcoded hex colours in components
- Use `border-radius` on anything except cursor rings
- Add `box-shadow` or `drop-shadow` to any element
- Mention or imply Gideon is a teacher
- Truncate code output — if asked to build, output the full component
- Use the Pages Router
- Use `any` in TypeScript
- Use raw `<img>` tags
- Ignore `prefers-reduced-motion`
