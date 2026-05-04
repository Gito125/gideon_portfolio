"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

import { getGsap, useGSAP } from "@/lib/gsap";

type SectionRevealElement = "section" | "div" | "article" | "main";

interface SectionRevealProps {
  as?: SectionRevealElement;
  className?: string;
  children: ReactNode;
  stagger?: number;
  delay?: number;
  once?: boolean;
  /**
   * "slide"    — default. opacity + y: 40px → 0.
   * "rise"     — opacity + y: 60px + subtle scale (0.97 → 1). Headlines.
   * "fade"     — opacity only. For background elements or dense grids.
   */
  variant?: "slide" | "rise" | "fade";
}

export function SectionReveal({
  as        = "section",
  className,
  children,
  stagger   = 0.08,
  delay     = 0,
  once      = true,
  variant   = "slide",
}: SectionRevealProps) {
  const rootRef = useRef<HTMLElement>(null);

  const setRootRef = (node: HTMLElement | null) => {
    rootRef.current = node;
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const gsap       = getGsap();
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };

          const childTargets = Array.from(
            root.querySelectorAll<HTMLElement>("[data-reveal-child]"),
          );
          const targets =
            childTargets.length > 0
              ? childTargets
              : Array.from(root.children).filter(
                  (child): child is HTMLElement => child instanceof HTMLElement,
                );

          if (targets.length === 0) return;

          if (reduceMotion) {
            gsap.set(targets, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              clearProps: "transform,opacity,will-change",
            });
            return;
          }

          // ── Initial state per variant ──────────────────────────
          const initialProps = (() => {
            switch (variant) {
              case "rise":
                return { autoAlpha: 0, y: 60, scale: 0.97, willChange: "transform,opacity" };
              case "fade":
                return { autoAlpha: 0, willChange: "opacity" };
              case "slide":
              default:
                return { autoAlpha: 0, y: 40, willChange: "transform,opacity" };
            }
          })();

          // ── Final state per variant ────────────────────────────
          const finalProps = (() => {
            switch (variant) {
              case "rise":
                return {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: "var(--ease-out-smooth)",
                  clearProps: "will-change",
                };
              case "fade":
                return {
                  autoAlpha: 1,
                  duration: 0.5,
                  ease: "power2.out",
                  clearProps: "will-change",
                };
              case "slide":
              default:
                return {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "var(--ease-out-smooth)",
                  clearProps: "will-change",
                };
            }
          })();

          gsap.set(targets, initialProps);

          gsap.to(targets, {
            ...finalProps,
            stagger,
            delay,
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              once,
              toggleActions: once
                ? "play none none none"
                : "play none none reverse",
            },
          });
        },
      );

      return () => matchMedia.revert();
    },
    {
      scope: rootRef,
      dependencies: [delay, once, stagger, variant],
    },
  );

  const Component = as;

  return (
    <Component ref={setRootRef} className={className}>
      {children}
    </Component>
  );
}