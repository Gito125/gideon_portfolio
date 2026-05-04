"use client";

import { backgroundConfig } from "@/config/background.config";

import { GridLines } from "./GridLines";

// ─────────────────────────────────────────────────────────────────────────────
// BackgroundCanvas
// Mounts in app/layout.tsx — only handles GridLines globally.
// GhostText is NOT here — each page mounts its own <GhostText page="x" />
// ─────────────────────────────────────────────────────────────────────────────

export default function BackgroundCanvas() {
  if (!backgroundConfig.enabled) return null;

  return <>{backgroundConfig.grid.enabled && <GridLines />}</>;
}