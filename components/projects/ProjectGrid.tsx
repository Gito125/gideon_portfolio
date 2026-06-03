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

  const counter = String(sectionIndex).padStart(2, "0");

  return (
    <SectionReveal as="section" className="w-full">
      <div className="mx-auto w-full max-w-(--grid-max-width) px-(--space-3) py-[72px] sm:px-(--space-5) lg:py-[104px]">

        {/* Section header */}
        <div
          data-reveal-child
          className="flex flex-col gap-[26px] lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-[14px]">

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
                max-w-[48ch]
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

        {visibleProjects.length > 0 ? (
          <div
            data-reveal-child
            className="mt-[64px] sm:mt-[72px] grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:gap-(--space-5)"
          >
            {visibleProjects.map((project, index) => (
              <div key={project.id} className="h-full">
                <ProjectCard
                  project={project}
                  priority={index === 0}
                  featured={index === 0}
                  variant={index === 0 ? "featured" : "default"}
                />
              </div>
            ))}
          </div>
        ) : null}

      </div>
    </SectionReveal>
  );
}
