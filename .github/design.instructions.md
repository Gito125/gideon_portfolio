---
applyTo: "**"
---

# Design Instructions — Ogwang Gift Gideon Portfolio
> **Passive ruleset. Applied automatically to every response.**
> Full specification lives in `docs/DESIGN.md`. This file is the enforced compressed extract.

---

## Colour — Enforce Always

```css
/* Base */
--color-bg: #F7F6F2;           /* Page background — paper-like off-white */
--color-surface: #FFFFFF;       /* Cards, elevated surfaces */
--color-text-primary: #1A1A1A;  /* All primary text — deep charcoal */
--color-text-secondary: #666666;/* Metadata, labels, supporting copy */
--color-border: #BCBCB4;        /* Hairline borders — 1px ONLY */

/* Amber (identity / human / personal) */
--color-amber: #EF9F27;
--color-amber-light: #FAEEDA;
--color-amber-dark: #854F0B;

/* Electric Green (technical / builder / precise) */
--color-green: #639922;
--color-green-light: #EAF3DE;
--color-green-dark: #3B6D11;
```

**Amber owns:** name underline · primary CTA fill · cursor default · preloader crack line · photo toning · section counter numbers
**Green owns:** project card hover borders · secondary CTA · cursor on CTA hover · stack tags · scroll progress · nav active state
**These two accents never appear on the same element. Never swap domains.**

---

## Typography — Enforce Always

| Token | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| `--text-display` | Newsreader | 80px | 200 | Hero name only |
| `--text-headline-lg` | Newsreader | 48px | 300 | Page headlines |
| `--text-headline-md` | Newsreader | 32px | 400 | Section headers |
| `--text-body-lg` | Inter | 18px | 400 | Long-form body |
| `--text-body-md` | Inter | 16px | 400 | Standard body |
| `--text-label` | Inter | 12px | 600 | ALL CAPS UI labels |
| `--text-mono` | JetBrains Mono | 13px | 400 | Stack tags, counters |

**Rules:**
- Headlines: left-aligned always. The ONLY exception is Contact page CTA — centred.
- Body text: max line-length `65ch`. Never full width.
- Stack tags: JetBrains Mono + uppercase + `letter-spacing: 0.08em`. Always.
- Labels: `text-transform: uppercase` + `letter-spacing: 0.1em`. Always paired.
- Never use Newsreader for body copy. Never use Inter for display.

---

## Shape — Enforce Always

**`border-radius: 0` on everything.**
Cards, buttons, inputs, images, tags, modals — all sharp corners.
The single exception: `.cursor-ring` uses `border-radius: 50%`.

This is non-negotiable. Rounded corners kill the technical edge.

---

## Depth & Elevation — Enforce Always

No `box-shadow`. No `filter: drop-shadow`. Depth comes from:
- Hairline borders: `1px solid var(--color-border)`
- Tonal hover shift: `#F7F6F2` → `#EEEDE8`
- Border colour shift on hover: `var(--color-border)` → `var(--color-text-primary)`
- Electric green border trace on project card hover (GSAP DrawSVG)

---

## Spacing — Use Tokens

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 16px |
| `--space-4` | 24px |
| `--space-5` | 32px |
| `--space-6` | 48px |
| `--space-7` | 80px |
| `--space-8` | 120px |

Never use arbitrary pixel values for spacing. Always use tokens.

---

## Animation Tokens — Use in GSAP + Framer

```css
--ease-out-smooth: cubic-bezier(0.16, 1, 0.3, 1);       /* Most transitions */
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);     /* Preloader panels */
--ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);         /* Counter snap */
--duration-fast: 150ms;       /* Hover state changes */
--duration-base: 300ms;       /* Component transitions */
--duration-slow: 600ms;       /* Section reveals */
--duration-cinematic: 1000ms; /* Hero, preloader sequences */
--stagger-char: 28ms;         /* GSAP SplitText character stagger */
--stagger-word: 60ms;         /* GSAP SplitText word stagger */
```

---

## Section Reveal — Standard Pattern

Every section that enters on scroll uses this exact pattern:
```
Initial:  opacity: 0, y: 40px
Final:    opacity: 1, y: 0
Duration: 600ms
Ease:     --ease-out-smooth
Trigger:  element top hits 80% of viewport
Stagger:  80ms between children
```
Headlines use GSAP SplitText — each word rises independently with the same easing.

---

## Components — Quick Rules

**Project Card:**
- Grayscale image by default → full colour on hover (400ms transition)
- Green border traces around card on hover (GSAP DrawSVG)
- Cursor morphs to 64px "VIEW" ring on hover
- Sharp corners, no shadow, 1px hairline border

**Buttons:**
- Primary (Amber): `background: var(--color-amber)` · `color: #1A1A1A` · no border-radius · no shadow
- Secondary (Green): `border: 1px solid var(--color-green)` · `color: var(--color-green)` · transparent bg
- Both use `--text-label` (12px Inter, uppercase, 0.1em spacing)

**Stack Tags:**
- JetBrains Mono · uppercase · `color: var(--color-green)` · `background: var(--color-green-light)` · 1px border · sharp

**Nav:**
- Brand: Newsreader italic 20px
- Links: Inter 12px uppercase 0.1em spacing
- Active: 1px green bottom border
- On scroll: `backdrop-filter: blur(8px)` on `#F7F6F2` base

**Inputs:**
- Bottom border only by default: `border-bottom: 1px solid var(--color-border)`
- Focus: border transitions to `var(--color-text-primary)`
- No background fill, no border-radius, no box-shadow

---

## Image Treatment

- Hero photo: `filter: sepia(0.2) saturate(1.3)` — slight amber toning
- Project images: `filter: grayscale(100%)` default → full colour on hover
- All images: `next/image` with `sizes` attribute. No raw `<img>` tags.
- Containers: `overflow: hidden` · `border-radius: 0` always
