# DESIGN.md — Visual Design System
**Document Type:** Design Specification  
**Project:** Ogwang Gift Gideon Portfolio  
**Version:** 1.0  
**Status:** Approved — Ready for Development  

---

## 1. Design Philosophy

This portfolio operates on a single design principle: **restraint earns trust, interactions earn emotion.**

The base is minimal — off-white, clean, quiet. The personality arrives through deliberate colour injections, precise animations, and typographic confidence. A visitor should feel the craft before they read the content.

**Dual personality:**
- **Amber** = warm, human, identity, Gideon the person
- **Electric Green** = technical, precise, Gideon the builder

These two accents never compete. Each owns a domain.

---

## 2. Colour System

### 2.1 Base Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#F7F6F2` | Page background — off-white, paper-like |
| `--color-surface` | `#FFFFFF` | Cards, elevated surfaces |
| `--color-text-primary` | `#1A1A1A` | All primary text — deep charcoal, not pure black |
| `--color-text-secondary` | `#666666` | Metadata, labels, supporting copy |
| `--color-border` | `#BCBCB4` | Hairline borders — 1px only |
| `--color-preloader-bg` | `#080808` | Preloader screen background |

### 2.2 Accent Colours

| Token | Hex | Owns |
|-------|-----|------|
| `--color-amber` | `#EF9F27` | Name, CTA buttons, photo toning, cursor default, underlines |
| `--color-amber-light` | `#FAEEDA` | Amber tints, hover backgrounds |
| `--color-amber-dark` | `#854F0B` | Amber text on light backgrounds |
| `--color-green` | `#639922` | Project hover borders, tech tags, cursor on CTA, scroll indicators |
| `--color-green-light` | `#EAF3DE` | Green tints, active states |
| `--color-green-dark` | `#3B6D11` | Green text on light backgrounds |

### 2.3 Colour Domain Rules

```
AMBER domain:
  ✓ Hero name underline
  ✓ Primary CTA button fill ("See My Work")
  ✓ Cursor default state
  ✓ Preloader diagonal crack line
  ✓ Photo colour toning (CSS filter)
  ✓ Section counter numbers (01, 02, 03...)
  ✗ Never on technical elements
  ✗ Never on project stack tags

GREEN domain:
  ✓ Project card hover border trace
  ✓ Secondary CTA button ("Let's Talk")
  ✓ Cursor state on CTA hover
  ✓ Stack/tech tags
  ✓ Scroll progress indicator
  ✓ Nav active state
  ✗ Never on personal/identity elements
  ✗ Never on the preloader
```

---

## 3. Typography

### 3.1 Font Stack

| Role | Font | Source | Weights |
|------|------|--------|---------|
| Display / Hero | **Newsreader** | Google Fonts | 200, 300, 400 italic |
| Body / UI | **Inter** | Google Fonts | 400, 500, 600 |
| Monospace / Code | **JetBrains Mono** | Google Fonts | 400, 700 |

### 3.2 Type Scale

| Token | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|------|--------|-------------|----------------|-------|
| `--text-display` | Newsreader | 80px | 200 | 1.05 | -0.03em | Hero name |
| `--text-headline-lg` | Newsreader | 48px | 300 | 1.15 | -0.02em | Page headlines |
| `--text-headline-md` | Newsreader | 32px | 400 | 1.25 | -0.01em | Section headers |
| `--text-body-lg` | Inter | 18px | 400 | 1.65 | -0.01em | Long-form body |
| `--text-body-md` | Inter | 16px | 400 | 1.6 | 0 | Standard body |
| `--text-label` | Inter | 12px | 600 | 1 | 0.1em | ALL CAPS UI labels |
| `--text-mono` | JetBrains Mono | 13px | 400 | 1.5 | 0 | Stack tags, counter |

### 3.3 Typography Rules

- Headlines: left-aligned always. No centred headlines except on the Contact page CTA.
- Display text: use Newsreader italic for secondary identity line ("Full-Stack Developer")
- Stack tags: always JetBrains Mono, always uppercase
- Body text: maximum line length 65ch — never full width
- Labels: `letter-spacing: 0.1em` + `text-transform: uppercase` always paired

---

## 4. Spacing System

Based on a 4px unit with named steps:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Micro gaps |
| `--space-2` | 8px | Tight spacing |
| `--space-3` | 16px | Component padding |
| `--space-4` | 24px | Section internal spacing |
| `--space-5` | 32px | Gutter between columns |
| `--space-6` | 48px | Between components |
| `--space-7` | 80px | Between sections |
| `--space-8` | 120px | Section vertical margins |

---

## 5. Grid System

| Breakpoint | Columns | Gutter | Margin |
|-----------|---------|--------|--------|
| Mobile (< 768px) | 4 | 16px | 20px |
| Tablet (768–1024px) | 8 | 24px | 40px |
| Desktop (1024–1440px) | 12 | 32px | 64px |
| Wide (> 1440px) | 12 | 32px | Auto (max-width: 1440px) |

---

## 6. Shape Language

**0px border radius everywhere.** Sharp corners on all cards, buttons, inputs, and image containers. This is non-negotiable — rounded corners soften the technical edge.

Single exception: the custom cursor rings use `border-radius: 50%`.

---

## 7. Elevation & Depth

No drop shadows. Depth is achieved through:

- **Hairline borders:** 1px `--color-border` defines card edges
- **Tonal shift on hover:** background shifts from `#F7F6F2` to `#EEEDE8`
- **Border colour change on hover:** `--color-border` → `--color-text-primary`
- **Electric green border trace on project hover:** the green border draws around the card

---

## 8. Component Specifications

### 8.1 Project Card

```
┌─────────────────────────────┐  ← 1px top border (amber on hover)
│                             │
│   [Project Image]           │  ← grayscale by default, colour on hover
│   aspect-ratio: 4/3         │
│                             │
├─────────────────────────────┤
│  CATEGORY LABEL             │  ← --text-label, --color-text-secondary
│                             │
│  Project Title              │  ← --text-headline-md
│                             │
│  Short description max 2    │  ← --text-body-md, --color-text-secondary
│  lines of text here         │
│                             │
│  [React] [TypeScript]       │  ← --text-mono, 1px border
└─────────────────────────────┘

Hover state:
  - Electric green border traces around entire card (GSAP DrawSVG)
  - Image returns to colour
  - Cursor morphs to "VIEW" state (64px green ring)
  - Card background tonal shift
```

### 8.2 Buttons

**Primary (Amber Fill):**
```css
background: var(--color-amber);
color: #1A1A1A;
font: var(--text-label);
padding: 16px 40px;
border-radius: 0;
border: none;
```

**Secondary (Green Outline):**
```css
background: transparent;
color: var(--color-green);
font: var(--text-label);
padding: 16px 40px;
border-radius: 0;
border: 1px solid var(--color-green);
```

Hover on both: background fills, 200ms ease, cursor morphs.

### 8.3 Input Fields

- Bottom border only by default: `border-bottom: 1px solid var(--color-border)`
- On focus: border colour transitions to `--color-text-primary`
- No background, no border-radius, no box shadow
- Label floats above on focus/fill

### 8.4 Stack Tags (Tech Chips)

```css
font-family: JetBrains Mono;
font-size: 13px;
text-transform: uppercase;
padding: 4px 10px;
border: 1px solid var(--color-border);
border-radius: 0;
color: var(--color-green);
background: var(--color-green-light);
```

### 8.5 Navigation

```
[GIDEON.DEV]     Work  About  Contact     [CV ↓]
```

- Brand mark: Newsreader italic, 20px
- Links: Inter, 12px, uppercase, letter-spacing 0.1em
- CV button: secondary style (green outline)
- Active link: bottom border in green, 1px
- Nav background: `#F7F6F2` with `backdrop-filter: blur(8px)` on scroll

---

## 9. Animation Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | Most transitions |
| `--ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)` | Preloader crack panels |
| `--ease-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Counter snap punch |
| `--duration-fast` | `150ms` | Hover state changes |
| `--duration-base` | `300ms` | Component transitions |
| `--duration-slow` | `600ms` | Section reveals |
| `--duration-cinematic` | `1000ms+` | Hero, preloader sequences |
| `--stagger-char` | `28ms` | GSAP SplitText character stagger |
| `--stagger-word` | `60ms` | GSAP SplitText word stagger |

---

## 10. Preloader Visual Spec

```
Background:   #080808 (near black)
Counter:      JetBrains Mono, 64px, weight 700, colour --color-amber
              Position: bottom-left, 64px from edges
Name:         Newsreader, 80px, weight 200, colour #FFFFFF
              Position: centre-left, vertically centred
Tagline:      Inter, 16px, weight 400, colour rgba(255,255,255,0.6)
              Position: below name, 16px gap
Crack line:   SVG path, 2px stroke, colour --color-amber
              Draws from (0, 100%) to (100%, 0%) — bottom-left to top-right
Panels:       Two divs using clip-path along the diagonal
              Top-right panel: slides to top-right
              Bottom-left panel: slides to bottom-left
```

---

## 11. Custom Cursor Visual Spec

| State | Inner dot | Outer ring | Label |
|-------|-----------|-----------|-------|
| Default | 8px, amber fill | 32px, amber stroke 1px, 80ms lag | — |
| Project hover | 4px, amber fill | 64px, green stroke 1.5px | "VIEW" in centre, 10px Inter caps |
| CTA hover | 8px, green fill | 40px, green stroke 1.5px, rotates 45° | — |
| Click | Burst ripple (scale 1→2, opacity 1→0) | Snaps back | — |
| Link hover | 6px, amber fill | 24px, amber stroke 1px | — |

---

## 12. Scroll Reveal Pattern

Every section that reveals on scroll follows this base pattern:

```
Initial state:  opacity: 0, y: 40px
Final state:    opacity: 1, y: 0
Duration:       600ms
Easing:         --ease-out-smooth
Trigger:        When element top hits 80% of viewport height
Stagger:        80ms between child elements
```

Headlines use GSAP SplitText — each word rises independently with the same easing.

---

## 13. Image Treatment

- **Hero photo:** High contrast, slight amber colour grade via CSS `filter: sepia(0.2) saturate(1.3)`
- **Project images:** Grayscale by default (`filter: grayscale(100%)`), full colour on hover (transition: 400ms)
- **All images:** Next.js `<Image>` component with proper `sizes` attribute
- **Image containers:** Sharp corners, overflow hidden, no border-radius

---

## 14. Document References

| Document | Purpose |
|----------|---------|
| `PRD.md` | Product vision, goals, user types, success metrics |
| `SRS.md` | Technical requirements, functional specifications, data models |
