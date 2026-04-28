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
}

export function SectionReveal({
  as = "section",
  className,
  children,
  stagger = 0.08,
  delay = 0,
  once = true,
}: SectionRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const setRootRef = (node: HTMLElement | null) => {
    rootRef.current = node;
  };

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const gsap = getGsap();
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
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

          if (targets.length === 0) {
            return;
          }

          if (reduceMotion) {
            gsap.set(targets, {
              autoAlpha: 1,
              y: 0,
              clearProps: "transform,opacity,will-change",
            });
            return;
          }

          gsap.set(targets, {
            autoAlpha: 0,
            y: 40,
            willChange: "transform,opacity",
          });

          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "var(--ease-out-smooth)",
            stagger,
            delay,
            clearProps: "will-change",
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              once,
              toggleActions: once ? "play none none none" : "play none none reverse",
            },
          });
        },
      );

      return () => {
        matchMedia.revert();
      };
    },
    {
      scope: rootRef,
      dependencies: [delay, once, stagger],
    },
  );

  const Component = as;

  return (
    <Component ref={setRootRef} className={className}>
      {children}
    </Component>
  );
}
