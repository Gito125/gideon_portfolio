"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { primeStrokePath } from "@/lib/animation/gsap-fallbacks";
import { getGsap, useGSAP } from "@/lib/gsap";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const tracePathRef = useRef<SVGPathElement>(null);

  const href = project.link ?? project.github ?? "/projects";
  const isExternal = href.startsWith("http");

  useGSAP(
    () => {
      const card = cardRef.current;
      const tracePath = tracePathRef.current;

      if (!card || !tracePath) {
        return;
      }

      const gsap = getGsap();
      const pathLength = primeStrokePath(tracePath);

      const onEnter = () => {
        gsap.to(tracePath, {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(tracePath, {
          strokeDashoffset: pathLength,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);

      return () => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    {
      scope: cardRef,
    },
  );

  return (
    <article
      ref={cardRef}
      className="group relative flex h-full flex-col border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-[400ms] hover:bg-[var(--color-surface-hover)]"
    >
      <svg
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={tracePathRef}
          d="M1 1 H99 V99 H1 Z"
          stroke="var(--color-green)"
          strokeWidth="0.6"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <Link
        href={href}
        data-cursor="view"
        data-cursor-label="VIEW"
        className="relative z-[3] flex h-full flex-col"
        {...(isExternal ? { rel: "noreferrer", target: "_blank" } : {})}
      >
        <div className="relative aspect-[4/3] w-full border-b border-[var(--color-border)] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale transition-[filter] duration-[400ms] group-hover:grayscale-0"
          />
        </div>
        <div className="flex flex-1 flex-col gap-[var(--space-3)] p-[var(--space-4)]">
          <div className="flex items-center justify-between gap-[var(--space-2)]">
            <p className="label text-[var(--color-text-secondary)]">{project.category}</p>
            <p className="text-[length:var(--text-label)] text-[var(--color-text-secondary)]">
              {project.year}
            </p>
          </div>
          <h3 className="text-[length:var(--text-headline-md)] leading-[1.2]">{project.title}</h3>
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
