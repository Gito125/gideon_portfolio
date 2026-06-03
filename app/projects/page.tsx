import type { Metadata } from "next";

import { GhostText } from "@/components/background/GhostText";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

const pageTitle = "Projects by Ogwang Gift Gideon";
const pageDescription =
  "A curated view of products and platforms built with intent, including Acadex and other selected work.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <GhostText page="work" />
      <ProjectGrid
        title="Projects"
        description="A full view of selected products, platforms, and experiments shipped with intent."
        sectionIndex={2}
      />
    </main>
  );
}
