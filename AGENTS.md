# AGENTS.md — Agent Reference & Workflow
> **Read this file before acting.** All agents reference this on every task.
> Location: project root. Kept in sync with `.github/agents/` definitions.

---

## The Three Agents

| Agent | Invoke | Role | Hands Off To |
|-------|--------|------|-------------|
| **Builder** | `@builder` | Builds complete components from SRS spec | `@reviewer` (automatic) |
| **Reviewer** | `@reviewer` | Flags violations AND rewrites them | `@tester` (automatic) |
| **Tester** | `@tester` | Tests visual, functional, code quality | Back to `@builder` if FAIL |

---

## Standard Workflow

```
Gideon gives task
      ↓
  @builder
  - States SRS IDs being satisfied
  - Invokes relevant skills
  - Builds full component (never truncates)
  - Runs internal checklist
      ↓  (automatic)
  @reviewer
  - Pass 1: SRS compliance
  - Pass 2: Design compliance
  - Pass 3: Animation compliance
  - Pass 4: TypeScript + code quality
  - Pass 5: Accessibility
  - Flags AND rewrites every violation
      ↓  (automatic)
  @tester
  - Domain 1: Visual/animation correctness
  - Domain 2: Functional correctness
  - Domain 3: Code quality (type-check, lint, build)
  - Domain 4: Performance + accessibility
  - Issues PASS / CONDITIONAL PASS / FAIL
      ↓
  If PASS → update PROGRESS.md → done
  If FAIL → back to @builder with exact failure details
```

---

## Agent Rules (All Agents Observe)

1. **Check PROGRESS.md first.** Before starting any task, read the current state. Do not rebuild what is already marked ✅ DONE.
2. **Update PROGRESS.md on completion.** After a PASS verdict from `@tester`, the component moves to ✅ DONE.
3. **Reference SRS IDs explicitly.** Every build, review, and test references `SRS.md` FR-IDs.
4. **Never truncate output.** `full-output-enforcement` is always active.
5. **Never switch stacks.** The stack in `copilot-instructions.md` is fixed. No deviations.
6. **Amber/green domain rules are absolute.** See `design.instructions.md`.
7. **`prefers-reduced-motion` is non-negotiable.** Every animated component handles it.

---

## Skills Quick Reference

| Skill | Used By | When |
|-------|---------|------|
| `full-output-enforcement` | Builder | Enforces complete, unabridged output—never truncate or use placeholders |
| `gpt-taste` | Builder | Elite UI/UX, AIDA structure, creative layout, strict grid, GSAP motion |
| `gsap-react` | Builder | GSAP animation in React/Next.js using useGSAP and refs |
| `gsap-scrolltrigger` | Builder | Scroll-driven animation, pinning, scrubbing, triggers |
| `gsap-timeline` | Builder | Sequenced, multi-step GSAP animations with timelines |
| `gsap-performance` | Builder | Optimize GSAP for 60fps—prefer transforms, avoid layout thrash |
| `animate` | Builder | Add purposeful animation, micro-interactions, and motion feedback |
| `adapt` | Builder | Make designs responsive and context-adaptive (mobile, tablet, etc.) |
| `distill` | Builder / Reviewer | Remove complexity, declutter, and simplify to essentials |
| `bolder` | Builder | Amplify visual impact and personality—make designs memorable |
| `delight` | Builder | Add moments of joy, polish, and unexpected delight |
| `audit` | Reviewer / Tester | Technical quality check: accessibility, performance, theming, responsive |
| `colorize` | Reviewer | Add strategic color to enhance hierarchy and visual interest |

---

## Document Map

| File | What It Is | Who Uses It |
|------|-----------|-------------|
| `copilot-instructions.md` | Master workspace rules | All agents, always |
| `design.instructions.md` | Passive design ruleset | All agents, always |
| `AGENTS.md` | This file — agent overview | All agents, always |
| `docs/PROGRESS.md` | Live build tracker | All agents — read before, update after |
| `docs/PRD.md` | Product vision + goals | Builder (context), Tester (scope) |
| `docs/SRS.md` | All FR-IDs + specs | Builder (requirements), Reviewer (verification), Tester (test cases) |
| `docs/DESIGN.md` | Full visual spec | Builder (implement), Reviewer (verify) |

---

## Component Build Order (Recommended)

Build in this sequence to avoid dependency issues:

```
1.  styles/globals.css          ← All CSS tokens first
2.  lib/gsap.ts                 ← Plugin registration
3.  lib/lenis.ts                ← Smooth scroll init
4.  components/preloader/       ← First thing visitor sees
5.  components/cursor/          ← Global, mounted in layout
6.  components/nav/             ← Global, mounted in layout
7.  app/layout.tsx              ← Wires preloader, cursor, nav, Lenis, AnimatePresence
8.  components/shared/          ← SectionReveal, PageTransition (used everywhere)
9.  components/hero/            ← Home page hero + scroll sequence
10. data/projects.ts            ← Data before components that use it
11. components/projects/        ← ProjectCard, ProjectGrid
12. app/page.tsx                ← Home page assembly
13. app/projects/page.tsx
14. app/about/page.tsx
15. app/contact/page.tsx
```
