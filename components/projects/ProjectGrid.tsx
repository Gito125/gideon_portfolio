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
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--space-5)] py-[var(--space-8)]">

        {/* Section header */}
        <div
          data-reveal-child
          className="flex flex-wrap items-end justify-between gap-[var(--space-5)]"
        >
          <div className="flex flex-col gap-[var(--space-3)]">

            {/* Counter + rule */}
            <div className="flex items-center gap-[var(--space-3)]">
              <span
                className="
                  font-[var(--font-mono-family)]
                  text-[clamp(11px,1vw,13px)]
                  font-[700]
                  text-[var(--color-amber)]
                  tracking-[0.12em]
                  uppercase
                  leading-none
                "
                aria-hidden="true"
              >
                {counter}
              </span>
              <span
                className="block h-[1px] w-[48px] bg-[var(--color-border)]"
                aria-hidden="true"
              />
              <span
                className="
                  font-[var(--font-mono-family)]
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--color-text-secondary)]
                "
              >
                Selected Work
              </span>
            </div>

            {/* Headline */}
            <h2
              className="
                font-[var(--font-display-family)]
                text-[length:var(--text-headline-lg)]
                leading-[1.12]
                tracking-[-0.02em]
                text-[var(--color-text-primary)]
              "
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className="
                text-[length:var(--text-body-lg)]
                text-[var(--color-text-secondary)]
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
                flex items-center gap-[var(--space-2)]
                border-b border-[var(--color-green)]
                pb-[2px]
                text-[var(--color-green)]
                transition-colors duration-[var(--duration-base)]
                hover:text-[var(--color-green-dark)]
                hover:border-[var(--color-green-dark)]
              "
            >
              View All Projects
              <span
                className="
                  inline-block
                  translate-x-0
                  transition-transform duration-[var(--duration-base)]
                  group-hover:translate-x-[4px]
                "
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ) : null}
        </div>

        {/* Grid */}
        <div
          data-reveal-child
          className="mt-[var(--space-7)] grid grid-flow-dense grid-cols-1 gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard
                project={project}
                priority={index === 0}
                featured={index === 0}
              />
            </div>
          ))}
        </div>

      </div>
    </SectionReveal>
  );
}