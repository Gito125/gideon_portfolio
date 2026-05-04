"use client";

import { useRef } from "react";

import { backgroundConfig, type GhostPage } from "@/config/background.config";
import { getGsap, useGSAP } from "@/lib/gsap";

// ─────────────────────────────────────────────────────────────────────────────
// GhostText
// One oversized ghost word per page. Slides left → right on scroll.
//
// KEY FIXES vs previous version:
// 1. Uses gsap.fromTo(el, { x: startX }, { x: endX }) — correct approach.
//    Previous version computed calc(endX - startX) manually which broke
//    when mixing percentage values.
// 2. translateY always has a fallback ('0%') — no more 'undefined' in DOM.
// 3. Wrapper div handles translateY (static CSS), inner div handles x (GSAP).
//    Separating these prevents GSAP from clobbering the translateY.
// ─────────────────────────────────────────────────────────────────────────────

interface GhostTextProps {
  page: GhostPage;
}

export function GhostText({ page }: GhostTextProps) {
  const { ghost } = backgroundConfig;

  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  const config = ghost.pages[page];

  useGSAP(
    () => {
      if (!ghost.enabled || !config) return;

      const gsap = getGsap();
      const media = gsap.matchMedia();

      const ctx = gsap.context(() => {
        // Animated state — slides on scroll
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const el = wordRef.current;
          if (!el) return;

          gsap.set(el, { willChange: "transform" });

          // fromTo is correct here — startX and endX are absolute positions
          // GSAP interprets percentage strings relative to the element width
          // when used as x values, which gives the viewport-relative feel we want
          gsap.fromTo(
            el,
            { x: config.startX },
            {
              x: config.endX,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            },
          );

          return () => {
            gsap.set(el, { willChange: "auto" });
          };
        });

        // Reduced motion — render at final position, no movement
        media.add("(prefers-reduced-motion: reduce)", () => {
          const el = wordRef.current;
          if (el) gsap.set(el, { x: config.endX });
        });
      }, containerRef);

      return () => {
        media.revert();
        ctx.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [ghost.enabled, page],
    },
  );

  if (!ghost.enabled || !config) return null;

  // Safe translateY — always a string, never undefined
  const translateY = config.translateY ?? "0%";

  return (
    // Fixed overlay — sits behind all page content
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/*
        Outer wrapper: handles top + translateY (static CSS positioning)
        Inner div:     GSAP animates x transform only
        Keeping these separate prevents GSAP from overwriting translateY
      */}
      <div
        style={{
          position: "absolute",
          top: config.top,
          left: 0,
          width: "100%",
          transform: `translateY(${translateY})`,
        }}
      >
        <div
          ref={wordRef}
          style={{
            display: "inline-block",
            fontFamily: ghost.fontFamily,
            fontSize: config.size,
            fontWeight: ghost.fontWeight,
            color: ghost.color,
            opacity: config.opacity,
            lineHeight: 1,
            userSelect: "none",
            whiteSpace: "nowrap",
            // Initial x position set by GSAP fromTo — no left offset here
          }}
        >
          {config.text}
        </div>
      </div>
    </div>
  );
}