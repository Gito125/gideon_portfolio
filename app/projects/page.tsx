import { ProjectGrid } from "@/components/projects/ProjectGrid";

export default function ProjectsPage() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <ProjectGrid
        title="Projects"
        description="A full view of selected products, platforms, and experiments shipped with intent."
      />
    </main>
  );
}
