// ─────────────────────────────────────────────────────────────────────────────
// background.config.ts — YOUR CONTROL PANEL
// Edit anything here. No need to touch component files.
// ─────────────────────────────────────────────────────────────────────────────

export const backgroundConfig = {
  // ── MASTER SWITCH ──────────────────────────────────────────────────────────
  enabled: true, // false = kills entire background system

  // ── GRID LINES ─────────────────────────────────────────────────────────────
  grid: {
    enabled: true,

    horizontalLines: 5, // how many horizontal lines
    verticalLines: 4, // how many vertical lines

    color: "var(--color-border)",
    strokeWidth: 1, // always 1px — enforced via vector-effect

    // Opacity per line — vary for layered depth. Index 0 = first line.
    horizontalOpacities: [0.1, 0.16, 0.08, 0.14, 0.07],
    verticalOpacities: [0.08, 0.14, 0.07, 0.11],

    // Dash pattern per line — null = solid, [dash, gap] = dashed
    // e.g. [4, 8] renders as "4 8" in SVG strokeDasharray
    horizontalDash: [
      null, // solid
      null, // solid
      [6, 10] as [number, number], // dashed — subtle
      null, // solid
      [2, 14] as [number, number], // fine dotted
    ],
    verticalDash: [
      null,
      [6, 10] as [number, number],
      null,
      [2, 14] as [number, number],
    ],

    // Parallax drift speeds — one per line. Lower = barely moves.
    horizontalSpeeds: [0.025, 0.055, 0.035, 0.07, 0.02],
    verticalSpeeds: [0.04, 0.025, 0.065, 0.035],

    driftAmount: 14, // max px drift on full scroll
  },

  // ── GHOST WORDS ────────────────────────────────────────────────────────────
  ghost: {
    enabled: true,
    fontFamily: "var(--font-display-family)", // Newsreader
    fontWeight: 200,
    color: "var(--color-text-primary)",

    // One word per page. startX → endX on scroll (left to right).
    // translateY offsets the word vertically from its top anchor.
    pages: {
      preloader: {
        text: "MATTER",
        size: "300px",
        opacity: 0.07, // slightly more visible on dark preloader bg
        top: "50%",
        startX: "-4%", // static — preloader doesn't scroll
        endX: "-4%",
        translateY: "-50%",
      },
      home: {
        text: "BUILD",
        size: "300px",
        opacity: 0.04,
        top: "52vh",
        startX: "-8%",
        endX: "9%",
        translateY: "0%",
      },
      work: {
        text: "CREATE",
        size: "260px",
        opacity: 0.035,
        top: "18vh",
        startX: "40%",
        endX: "54%",
        translateY: "0%",
      },
      about: {
        text: "GIDEON",
        size: "230px",
        opacity: 0.04,
        top: "44vh",
        startX: "-7%",
        endX: "7%",
        translateY: "0%",
      },
      contact: {
        text: "SHIP",
        size: "320px",
        opacity: 0.04,
        top: "38vh",
        startX: "46%",
        endX: "58%",
        translateY: "0%",
      },
    },
  },
} as const;

export type GhostPage = keyof typeof backgroundConfig.ghost.pages;