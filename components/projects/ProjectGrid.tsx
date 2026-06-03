import Link from "next/link";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { projects } from "@/data/projects";

import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  title: string;
  description: string;
  limit?: number;
  showAllLink?: boolean;
  sectionIndex?: number;
}

export function ProjectGrid({
  title,
  description,
  limit,
  showAllLink = false,
  sectionIndex = 1,
}: ProjectGridProps) {
  const visibleProjects =
    typeof limit === "number" ? projects.slice(0, limit) : projects;
  const featuredProject = visibleProjects[0];
  const secondaryProjects = visibleProjects.slice(1, 3);
  const remainingProjects = visibleProjects.slice(3);

  const counter = String(sectionIndex).padStart(2, "0");

  return (
    <SectionReveal as="section" className="w-full">
      <div className="mx-auto w-full max-w-(--grid-max-width) px-(--space-3) py-(--space-7) sm:px-(--space-5) lg:py-(--space-8)">

        {/* Section header */}
        <div
          data-reveal-child
          className="flex flex-col gap-(--space-5) lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-(--space-3)">

            {/* Counter + rule */}
            <div className="flex items-center gap-(--space-3)">
              <span
                className="
                  font-mono
                  text-[clamp(11px,1vw,13px)]
                  font-bold
                  text-(--color-amber)
                  tracking-[0.12em]
                  uppercase
                  leading-none
                "
                aria-hidden="true"
              >
                {counter}
              </span>
              <span
                className="block h-px w-12 bg-(--color-border)"
                aria-hidden="true"
              />
              <span
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-(--color-text-secondary)
                "
              >
                Selected Work
              </span>
            </div>

            {/* Headline */}
            <h2
              className="
                font-display
                text-[clamp(2.5rem,5vw,var(--text-headline-lg))]
                leading-[1.05]
                tracking-[-0.02em]
                text-foreground
              "
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className="
                text-[16px] sm:text-(length:--text-body-lg)
                text-(--color-text-secondary)
                leading-[1.6]
                max-w-[52ch]
              "
            >
              {description}
            </p>
          </div>

          {/* View all link */}
          {showAllLink ? (
            <Link
              href="/projects"
              data-cursor="link"
              className="
                group
                label
                inline-flex items-center gap-(--space-2) self-start
                border-b border-(--color-green)
                pb-0.5
                text-(--color-green)
                transition-colors duration-(--duration-base)
                hover:text-(--color-green-dark)
                hover:border-(--color-green-dark)
                lg:self-end
              "
            >
              View All Projects
              <span
                className="
                  inline-block
                  translate-x-0
                  transition-transform duration-(--duration-base)
                  group-hover:translate-x-1
                "
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ) : null}
        </div>

        {featuredProject ? (
          <div data-reveal-child className="mt-(--space-7)">
            <div className="grid grid-cols-1 gap-(--space-5) md:grid-cols-2 lg:grid-cols-12">
              <div className="md:col-span-2 lg:col-span-8">
                <ProjectCard
                  project={featuredProject}
                  priority
                  featured
                  variant="featured"
                />
              </div>

              {secondaryProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-(--space-5) md:col-span-2 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-2">
                  {secondaryProjects.map((project) => (
                    <div key={project.id} className="h-full">
                      <ProjectCard
                        project={project}
                        variant="secondary"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {remainingProjects.length > 0 ? (
          <div
            data-reveal-child
            className="mt-(--space-5) grid grid-cols-1 gap-(--space-5) md:grid-cols-2 xl:grid-cols-3"
          >
            {remainingProjects.map((project) => (
              <div key={project.id} className="h-full">
                <ProjectCard project={project} variant="default" />
              </div>
            ))}
          </div>
        ) : null}

      </div>
    </SectionReveal>
  );
}
