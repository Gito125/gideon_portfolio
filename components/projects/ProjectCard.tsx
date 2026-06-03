"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { primeStrokePath } from "@/lib/animation/gsap-fallbacks";
import { getGsap, useGSAP } from "@/lib/gsap";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  featured?: boolean;
  variant?: "default" | "featured" | "secondary";
}

export function ProjectCard({
  project,
  priority = false,
  featured = false,
  variant,
}: ProjectCardProps) {
  const cardRef      = useRef<HTMLElement>(null);
  const tracePathRef = useRef<SVGPathElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);
  const [cacheBuster, setCacheBuster] = useState("");

  const href            = project.link ?? project.github ?? "/projects";
  const isExternal      = href.startsWith("http");
  const resolvedVariant = variant ?? (featured ? "featured" : "default");
  const isFeaturedCard  = resolvedVariant === "featured";
  const isSecondaryCard = resolvedVariant === "secondary";
  const imageSrc        = `${project.image}${cacheBuster}`;

  const imageAspectClass =
    resolvedVariant === "featured"
      ? "aspect-[16/10] sm:aspect-[2/1]"
      : resolvedVariant === "secondary"
        ? "aspect-[16/10] sm:aspect-[2/1]"
        : "aspect-[16/10] sm:aspect-[2/1]";

  const imageSizes =
    resolvedVariant === "featured"
      ? "(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 66vw"
      : resolvedVariant === "secondary"
        ? "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 34vw"
        : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw";

  const contentClass =
    resolvedVariant === "featured"
      ? "flex flex-1 flex-col gap-[18px] p-(--space-4) sm:gap-[20px] sm:p-[28px] xl:p-(--space-5)"
      : resolvedVariant === "secondary"
        ? "flex flex-1 flex-col gap-[12px] p-[18px] sm:gap-[14px] sm:p-[20px] xl:p-[22px]"
        : "flex flex-1 flex-col gap-(--space-3) p-(--space-4)";

  const categoryClass =
    resolvedVariant === "featured"
      ? "label flex flex-wrap items-center gap-(--space-2) text-[11px] text-(--color-text-secondary) sm:text-[12px]"
      : resolvedVariant === "secondary"
        ? "label flex flex-wrap items-center gap-[6px] text-[10px] text-(--color-text-secondary) sm:text-[11px]"
        : "label flex flex-wrap items-center gap-(--space-2) text-[10px] text-(--color-text-secondary) sm:text-[12px]";

  const titleClass =
    resolvedVariant === "featured"
      ? "font-display text-[clamp(2rem,3.8vw,3rem)] leading-[0.98] tracking-[-0.03em] text-foreground transition-colors duration-(--duration-base)"
      : resolvedVariant === "secondary"
        ? "font-display text-[clamp(1.75rem,2.4vw,2.3rem)] leading-[1.02] tracking-[-0.025em] text-foreground transition-colors duration-(--duration-base)"
        : "font-display text-(length:--text-headline-md) leading-[1.2] tracking-[-0.01em] text-foreground transition-colors duration-(--duration-base)";

  const descriptionClass =
    resolvedVariant === "featured"
      ? "max-w-[56ch] text-[15px] leading-[1.65] text-(--color-text-secondary) sm:text-[16px] xl:text-[17px]"
      : resolvedVariant === "secondary"
        ? "max-w-[34ch] text-[14px] leading-[1.58] text-(--color-text-secondary) sm:text-[15px]"
        : "max-w-[56ch] text-(length:--text-body-md) leading-[1.6] text-(--color-text-secondary)";

  const stackRowClass =
    resolvedVariant === "featured"
      ? "mt-auto flex flex-col gap-[14px] border-t border-(--color-border) pt-[14px] sm:flex-row sm:items-end sm:justify-between"
      : resolvedVariant === "secondary"
        ? "mt-auto flex flex-col gap-[12px] border-t border-(--color-border) pt-[12px]"
        : "mt-auto flex flex-col gap-(--space-3) border-t border-(--color-border) pt-(--space-3) sm:flex-row sm:items-end sm:justify-between";

  const arrowClass =
    resolvedVariant === "featured"
      ? "shrink-0 self-start font-mono text-[22px] text-(--color-green) opacity-0 -translate-x-2 transition-[opacity,transform] duration-(--duration-base) sm:self-auto group-hover:opacity-100 group-hover:translate-x-0"
      : "shrink-0 self-start font-mono text-[18px] text-(--color-green) opacity-0 -translate-x-2 transition-[opacity,transform] duration-(--duration-base) sm:self-auto group-hover:opacity-100 group-hover:translate-x-0";

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const frameId = window.requestAnimationFrame(() => {
      setCacheBuster(`?v=${Date.now()}`);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [project.image]);

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
        border border-(--color-border)
        bg-(--color-surface)
        transition-colors duration-400
        hover:bg-(--color-surface-hover)
      "
    >
      {/* Featured amber top-border accent */}
      {isFeaturedCard && (
        <span
          className="absolute top-0 left-0 right-0 z-10 block h-0.75 bg-(--color-amber)"
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
        {/* Image container — frames the full screenshot without fake cropping. */}
        <div className={`relative w-full overflow-hidden border-b border-(--color-border) bg-(--color-surface-hover) ${imageAspectClass}`}>
          <div ref={imageRef} className="absolute inset-2 will-change-transform sm:inset-3">
            <Image
              src={imageSrc}
              alt={`${project.title} preview`}
              fill
              priority={priority}
              sizes={imageSizes}
              className="object-contain grayscale transition-[filter] duration-400 group-hover:grayscale-0"
            />
          </div>

          {/* Year badge — top-right overlay */}
          <span
            className={`absolute right-(--space-3) top-(--space-3)
              font-mono
              text-[10px]
              uppercase
              tracking-[0.12em]
              text-white
              bg-(--color-preloader-bg)/70
              px-(--space-2) py-(--space-1)
              backdrop-blur-sm
              ${isSecondaryCard ? "sm:right-3 sm:top-3" : ""}`}
          >
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className={contentClass}>

          {/* Category row */}
          <p className={categoryClass}>
            <span
              className="inline-block w-4 h-px bg-(--color-text-secondary)"
              aria-hidden="true"
            />
            {project.category}
          </p>

          {/* Title — the visual anchor */}
          <h3
            className={titleClass}
          >
            {project.title}
          </h3>

          {/* Description — clearly subordinate weight */}
          <p className={descriptionClass}>
            {project.description}
          </p>

          {/* Stack tags + arrow */}
          <div className={stackRowClass}>
            <div className={`flex flex-wrap ${isSecondaryCard ? "gap-[6px]" : "gap-(--space-2)"}`}>
              {project.stack.map((stackItem) => (
                <span key={stackItem} className="stack-tag">
                  {stackItem}
                </span>
              ))}
            </div>

            {/* Arrow — appears on hover */}
            <span
              className={arrowClass}
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
