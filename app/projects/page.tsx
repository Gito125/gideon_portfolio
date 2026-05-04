import { GhostText } from "@/components/background/GhostText";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-[var(--space-7)] px-[var(--space-3)] py-[var(--space-5)]">
      <GhostText page="work" />
      <ProjectGrid
        title="Projects"
        description="A full view of selected products, platforms, and experiments shipped with intent."
      />
    </main>
  );
}
