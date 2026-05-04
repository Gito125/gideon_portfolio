import { GhostText } from "@/components/background/GhostText";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <GhostText page="home" />
      <HeroSection />
      <ProjectGrid
        title="Selected Work"
        description="A focused set of product builds led by Acadex, built to ship fast and scale cleanly."
        limit={3}
        showAllLink
      />
    </main>
  );
}
