---
name: Swiss Engineering Portfolio
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-xl:
    fontFamily: Newsreader
    fontSize: 80px
    fontWeight: '200'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '300'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
  mono-small:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
spacing:
  unit: 4px
  gutter: 32px
  margin: 64px
  container-max: 1440px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 120px
---

## Brand & Style

This design system is anchored in the principles of the International Typographic Style (Swiss Design). It targets a high-end technical audience, conveying seniority through restraint, mathematical precision, and an "expensive" editorial feel. The personality is intellectual, meticulous, and quietly confident.

The visual style leans heavily into **Minimalism** with a focus on:
*   **Asymmetric Balance:** Utilizing expansive white space to create focal points without clutter.
*   **Grid Orthodoxy:** Every element aligns to a rigid underlying structure, reflecting the developer's methodical approach to code.
*   **Tactile Restraint:** Subtle interactions and hairline borders replace heavy shadows or decorative flourishes.

## Colors

The palette is monochromatic and archival, designed to keep the focus on content and typography.

*   **Background (#F9F9F7):** An off-white, paper-like "Bone" finish that reduces eye strain and feels more premium than pure hex white.
*   **Primary Text (#1A1A1A):** A deep charcoal. It provides high contrast against the background while appearing softer and more sophisticated than pure black.
*   **Secondary Text (#666666):** Used for metadata, labels, and supporting copy to establish a clear visual hierarchy.
*   **Accent/Border (#BCBCB4):** A muted stone-grey used for hairline dividers and inactive states, maintaining a low-profile presence.

## Typography

The typographic system relies on the tension between the intellectual, literary feel of **Newsreader** (standing in for Playfair/high-end serifs) and the functional, industrial clarity of **Inter**.

*   **Headlines:** Must remain thin and elegant. Large display sizes should use lower font weights (200-300) to emphasize the serif's delicate details.
*   **Body:** Inter is used for its exceptional legibility at small sizes. Maintain generous line-heights (1.6) to ensure the text blocks feel airy and readable.
*   **Labels:** Use all-caps with increased letter-spacing for UI labels and category tags to differentiate them clearly from narrative content.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy. On desktop, content is contained within a 12-column grid with a maximum width of 1440px. 

*   **Vertical Rhythm:** Use large vertical steps (`stack-xl`) between major sections to emphasize the expansive whitespace.
*   **Alignment:** Text should be predominantly left-aligned. Avoid centering headlines; the "Swiss" look relies on the strength of the left-hand axis.
*   **Grid Precision:** Project cards and image assets must snap strictly to the 12-column grid. Gutters remain consistent at 32px to provide breathing room between dense technical information.

## Elevation & Depth

This design system avoids traditional shadows to maintain a flat, modernist aesthetic. Depth is achieved through **low-contrast outlines** and **tonal layering**.

*   **Hairline Borders:** Use 1px borders in the accent color (#BCBCB4) to define sections and card boundaries.
*   **Layering:** Elements "lift" on hover not through shadows, but through subtle background color shifts (e.g., from #F9F9F7 to a slightly darker #F2F2F0) or by revealing additional information.
*   **Interactions:** Hover states on interactive elements should be understated—perhaps a slight opacity change or a smooth transition of the border color to the primary text color.

## Shapes

The shape language is strictly **Sharp (0px)**. 

In keeping with the Swiss influence, any rounding is viewed as a departure from the grid's structural integrity. Squares and rectangles provide a modular, architectural feel. This applies to buttons, project cards, input fields, and image containers. No exceptions.

## Components

### Project Cards
The centerpiece of the portfolio. Cards are defined by a top hairline border. They contain a large, high-contrast image (grayscale preferred), followed by a `label-caps` category, a `headline-md` title, and a brief `body-md` description. The entire card acts as a trigger for a subtle background tint change on hover.

### Buttons
Primary buttons are solid #1A1A1A with white text. Secondary buttons use a 1px border with no background. All buttons are rectangular (0px radius) and use `label-caps` for the label text to ensure they look like functional UI rather than prose.

### Input Fields
Minimalist under-styled lines. Only the bottom border is visible by default. Upon focus, the border color transitions from #BCBCB4 to #1A1A1A.

### Chips / Tags
Small, rectangular containers with 1px borders. Use `mono-small` typography for technical stack tags (e.g., React, TypeScript) to give them a "developer-first" technical aesthetic.

### Lists
Unordered lists should use custom square bullets or simple dashes rather than standard circles, maintaining the geometric consistency of the design system.