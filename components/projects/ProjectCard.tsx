import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const href = project.link ?? project.github ?? "/projects";
  const isExternal = href.startsWith("http");

  return (
    <article className="surface-hairline flex h-full flex-col bg-[var(--color-surface)]">
      <Link
        href={href}
        className="flex h-full flex-col"
        {...(isExternal ? { rel: "noreferrer", target: "_blank" } : {})}
      >
        <div className="relative aspect-[4/3] w-full border-b border-[var(--color-border)]">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-[var(--space-3)] p-[var(--space-4)]">
          <div className="flex items-center justify-between gap-[var(--space-2)]">
            <p className="label text-[var(--color-text-secondary)]">
              {project.category}
            </p>
            <p className="text-[length:var(--text-label)] text-[var(--color-text-secondary)]">
              {project.year}
            </p>
          </div>
          <h3 className="text-[length:var(--text-headline-md)] leading-[1.2]">
            {project.title}
          </h3>
          <p className="text-[length:var(--text-body-md)] text-[var(--color-text-secondary)]">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-[var(--space-2)]">
            {project.stack.map((stackItem) => (
              <span key={stackItem} className="stack-tag">
                {stackItem}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
