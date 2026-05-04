import type { Metadata } from "next";

import { GhostText } from "@/components/background/GhostText";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

const pageTitle = "Ogwang Gift Gideon | Full-Stack Developer & Product Builder";
const pageDescription =
  "Ogwang Gift Gideon builds sharp, scalable digital products from Uganda, led by flagship work like Acadex.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
  },
};

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <GhostText page="home" />
      <HeroSection />

      {/* ── Section transition marker ─────────────────────────────────
          Provides visual breathing room and rhythm between hero and work.
          The amber pip + full-width hairline signal a deliberate section break.
      ─────────────────────────────────────────────────────────────── */}
      <div
        className="
          relative mx-auto w-full max-w-[var(--grid-max-width)]
          px-[var(--space-5)]
        "
        aria-hidden="true"
      >
        <div className="relative flex items-center gap-[var(--space-3)]">
          {/* Amber pip */}
          <span className="block shrink-0 w-[6px] h-[6px] bg-[var(--color-amber)]" />
          {/* Hairline rule */}
          <span className="block flex-1 h-[1px] bg-[var(--color-border)]" />
        </div>
      </div>

      <ProjectGrid
        title="Selected Work"
        description="A focused set of product builds led by Acadex, built to ship fast and scale cleanly."
        limit={3}
        showAllLink
        sectionIndex={1}
      />
    </main>
  );
}