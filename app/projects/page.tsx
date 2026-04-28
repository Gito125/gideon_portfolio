import { ProjectGrid } from "@/components/projects/ProjectGrid";

export default function ProjectsPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden pt-[96px]">
      <ProjectGrid
        title="Projects"
        description="A full view of selected products, platforms, and experiments shipped with intent."
      />
    </main>
  );
}
