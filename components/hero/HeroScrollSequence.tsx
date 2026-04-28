"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { drawLineFallback, splitTextFallback } from "@/lib/animation/gsap-fallbacks";
import { getGsap, useGSAP } from "@/lib/gsap";

const heroStats = ["1 Live Product", "2 Universities", "Uganda -> World"] as const;

export function HeroScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const mockupTraceRef = useRef<SVGPathElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const photo = photoRef.current;
      const name = nameRef.current;
      const role = roleRef.current;
      const underline = underlineRef.current;
      const mockup = mockupRef.current;
      const mockupTrace = mockupTraceRef.current;
      const ctaWrap = ctaWrapRef.current;

      if (!section || !photo || !name || !role || !underline || !mockup || !mockupTrace || !ctaWrap) {
        return;
      }

      const stats = Array.from(
        section.querySelectorAll<HTMLElement>("[data-hero-stat]"),
      );
      const gsap = getGsap();
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        {
          desktopMotion: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktopMotion, reduced } = context.conditions as {
            desktopMotion: boolean;
            reduced: boolean;
          };

          if (reduced || !desktopMotion) {
            gsap.set([photo, role, mockup, ctaWrap, ...stats], {
              autoAlpha: 1,
              y: 0,
              x: 0,
              scale: 1,
              clearProps: "transform,opacity,will-change",
            });
            gsap.set(underline, { scaleX: 1, clearProps: "transform" });
            return;
          }

          const splitName = splitTextFallback(name, "words");

          gsap.set(photo, {
            scale: 0.8,
            transformOrigin: "center center",
            willChange: "transform",
          });
          gsap.set(splitName.elements, {
            autoAlpha: 0,
            y: 40,
            willChange: "transform,opacity",
          });
          gsap.set(role, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });
          gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(mockup, { autoAlpha: 0, x: 120, willChange: "transform,opacity" });
          gsap.set(stats, { autoAlpha: 0, y: 20, willChange: "transform,opacity" });
          gsap.set(ctaWrap, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=2000",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          timeline.to(photo, { scale: 1, duration: 2, ease: "none" }, 0);
          timeline.to(splitName.elements, {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "none",
            stagger: 0.2,
          }, 2);
          timeline.to(role, { autoAlpha: 1, y: 0, duration: 0.8, ease: "none" }, 2.45);
          timeline.to(underline, { scaleX: 1, duration: 0.8, ease: "none" }, 2.45);
          timeline.to(mockup, { autoAlpha: 1, x: 0, duration: 1.4, ease: "none" }, 3.2);
          drawLineFallback({
            gsap,
            path: mockupTrace,
            duration: 0.8,
            ease: "none",
            timeline,
            position: 3.4,
          });
          timeline.to(
            stats,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.2,
              ease: "none",
            },
            4.1,
          );
          timeline.to(
            ctaWrap,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "none",
            },
            4.8,
          );

          return () => {
            splitName.revert();
          };
        },
      );

      return () => {
        matchMedia.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-bg)] pt-[96px]">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-[var(--space-7)] px-[var(--space-5)] py-[var(--space-8)]">
        <div className="grid w-full gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div className="flex flex-col gap-[var(--space-4)]">
            <h1
              ref={nameRef}
              className="max-w-[12ch] text-[clamp(52px,7.2vw,var(--text-display))] leading-[1.05] tracking-[-0.03em]"
            >
              Ogwang Gift Gideon
            </h1>
            <span
              ref={underlineRef}
              className="block h-[2px] w-[220px] max-w-full bg-[var(--color-amber)]"
              aria-hidden="true"
            />
            <p
              ref={roleRef}
              className="font-[var(--font-display-family)] text-[length:var(--text-headline-md)] italic text-[var(--color-text-secondary)]"
            >
              Full-Stack Developer &amp; Product Builder
            </p>

            <ul className="flex flex-wrap gap-[var(--space-2)]">
              {heroStats.map((stat) => (
                <li
                  key={stat}
                  data-hero-stat
                  className="label border border-[var(--color-border)] px-[var(--space-2)] py-[var(--space-1)] text-[var(--color-text-secondary)]"
                >
                  {stat}
                </li>
              ))}
            </ul>

            <div ref={ctaWrapRef} className="flex flex-wrap gap-[var(--space-3)]">
              <Link
                href="/projects"
                data-cursor="cta"
                className="label inline-flex items-center justify-center border border-transparent bg-[var(--color-amber)] px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-amber-dark)] hover:text-[var(--color-bg)]"
              >
                See My Work
              </Link>
              <Link
                href="/contact"
                data-cursor="cta"
                className="label inline-flex items-center justify-center border border-[var(--color-green)] px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-green)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-green-light)]"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          <div className="grid gap-[var(--space-4)]">
            <div
              ref={photoRef}
              className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/hero-placeholder.svg"
                  alt="Portrait of Ogwang Gift Gideon"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover [filter:sepia(0.2)_saturate(1.3)]"
                />
              </div>
            </div>

            <div ref={mockupRef} className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/projects/acadex-placeholder.svg"
                  alt="Acadex product mockup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  ref={mockupTraceRef}
                  d="M1 1 H99 V99 H1 Z"
                  stroke="var(--color-green)"
                  strokeWidth="0.6"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
