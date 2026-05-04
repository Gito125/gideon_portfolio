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
  featured?: boolean;
}

export function ProjectCard({ project, priority = false, featured = false }: ProjectCardProps) {
  const cardRef      = useRef<HTMLElement>(null);
  const tracePathRef = useRef<SVGPathElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);

  const href       = project.link ?? project.github ?? "/projects";
  const isExternal = href.startsWith("http");

  useGSAP(
    () => {
      const card      = cardRef.current;
      const tracePath = tracePathRef.current;
      const imageWrap = imageRef.current;

      if (!card || !tracePath) return;

      const gsap       = getGsap();
      const pathLength = primeStrokePath(tracePath);

      const onEnter = () => {
        gsap.to(tracePath, {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        if (imageWrap) {
          gsap.to(imageWrap, {
            scale: 1.025,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      };

      const onLeave = () => {
        gsap.to(tracePath, {
          strokeDashoffset: pathLength,
          duration: 0.3,
          ease: "power2.out",
        });
        if (imageWrap) {
          gsap.to(imageWrap, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);

      return () => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <article
      ref={cardRef}
      className="
        group relative flex h-full flex-col
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        transition-colors duration-[400ms]
        hover:bg-[var(--color-surface-hover)]
      "
    >
      {/* Featured amber top-border accent */}
      {featured && (
        <span
          className="absolute top-0 left-0 right-0 z-10 block h-[3px] bg-[var(--color-amber)]"
          aria-hidden="true"
        />
      )}

      {/* Green border trace SVG */}
      <svg
        className="pointer-events-none absolute inset-0 z-overlay h-full w-full"
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
        className="relative z-content flex h-full flex-col"
        {...(isExternal ? { rel: "noreferrer", target: "_blank" } : {})}
      >
        {/* Image container — clips the scale animation */}
        <div className="relative aspect-[25/13] w-full border-b border-[var(--color-border)] overflow-hidden">
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale transition-[filter] duration-[400ms] group-hover:grayscale-0"
            />
          </div>

          {/* Year badge — top-right overlay */}
          <span
            className="
              absolute top-[var(--space-3)] right-[var(--space-3)]
              font-[var(--font-mono-family)]
              text-[10px]
              uppercase
              tracking-[0.12em]
              text-white
              bg-[var(--color-preloader-bg)]/70
              px-[var(--space-2)] py-[var(--space-1)]
              backdrop-blur-sm
            "
          >
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-[var(--space-3)] p-[var(--space-4)]">

          {/* Category row */}
          <p className="label text-[var(--color-text-secondary)] flex items-center gap-[var(--space-2)]">
            <span
              className="inline-block w-[16px] h-[1px] bg-[var(--color-text-secondary)]"
              aria-hidden="true"
            />
            {project.category}
          </p>

          {/* Title — the visual anchor */}
          <h3
            className="
              font-[var(--font-display-family)]
              text-[length:var(--text-headline-md)]
              leading-[1.2]
              tracking-[-0.01em]
              text-[var(--color-text-primary)]
              transition-colors duration-[var(--duration-base)]
              group-hover:text-[var(--color-text-primary)]
            "
          >
            {project.title}
          </h3>

          {/* Description — clearly subordinate weight */}
          <p
            className="
              text-[length:var(--text-body-md)]
              text-[var(--color-text-secondary)]
              leading-[1.6]
              max-w-[56ch]
            "
          >
            {project.description}
          </p>

          {/* Stack tags + arrow */}
          <div className="mt-auto flex items-center justify-between gap-[var(--space-2)] pt-[var(--space-2)] border-t border-[var(--color-border)]">
            <div className="flex flex-wrap gap-[var(--space-2)]">
              {project.stack.map((stackItem) => (
                <span key={stackItem} className="stack-tag">
                  {stackItem}
                </span>
              ))}
            </div>

            {/* Arrow — appears on hover */}
            <span
              className="
                shrink-0
                font-[var(--font-mono-family)]
                text-[18px]
                text-[var(--color-green)]
                opacity-0
                translate-x-[-8px]
                transition-[opacity,transform] duration-[var(--duration-base)]
                group-hover:opacity-100
                group-hover:translate-x-0
              "
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}