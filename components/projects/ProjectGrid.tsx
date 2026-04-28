import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ProjectGridProps {
  title: string;
  description: string;
  limit?: number;
  showAllLink?: boolean;
}

export function ProjectGrid({
  title,
  description,
  limit,
  showAllLink = false,
}: ProjectGridProps) {
  const visibleProjects =
    typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--space-5)] py-[var(--space-8)]">
        <div className="flex flex-wrap items-end justify-between gap-[var(--space-4)]">
          <div className="flex flex-col gap-[var(--space-3)]">
            <h2 className="text-[length:var(--text-headline-lg)] leading-[1.15]">
              {title}
            </h2>
            <p className="text-[length:var(--text-body-lg)] text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>
          {showAllLink ? (
            <Link
              href="/projects"
              className="label border-b border-[var(--color-green)] text-[var(--color-green)]"
            >
              View All Projects
            </Link>
          ) : null}
        </div>
        <div className="mt-[var(--space-6)] grid grid-flow-dense grid-cols-1 gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={project} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
