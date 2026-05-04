"use client";

import { useMemo, useRef } from "react";

import { backgroundConfig } from "@/config/background.config";
import { getGsap, useGSAP } from "@/lib/gsap";

// ─────────────────────────────────────────────────────────────────────────────
// GridLines
// SVG hairline grid that drifts subtly on scroll.
// KEY FIX: vector-effect="non-scaling-stroke" keeps every line at exactly
// 1px regardless of SVG viewBox scaling — without this, lines render ~14px.
// ─────────────────────────────────────────────────────────────────────────────

export function GridLines() {
  const { grid } = backgroundConfig;

  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRefs = useRef<SVGLineElement[]>([]);
  const verticalRefs = useRef<SVGLineElement[]>([]);

  // Evenly distribute line positions as percentages of viewport
  const horizontalPositions = useMemo(
    () =>
      Array.from({ length: grid.horizontalLines }, (_, i) =>
        ((i + 1) / (grid.horizontalLines + 1)) * 100,
      ),
    [grid.horizontalLines],
  );

  const verticalPositions = useMemo(
    () =>
      Array.from({ length: grid.verticalLines }, (_, i) =>
        ((i + 1) / (grid.verticalLines + 1)) * 100,
      ),
    [grid.verticalLines],
  );

  useGSAP(
    () => {
      if (!grid.enabled) return;

      const gsap = getGsap();
      const media = gsap.matchMedia();

      const ctx = gsap.context(() => {
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const trigger = document.documentElement;

          // Animate CSS transform on each line element (not SVG coords)
          // This moves the rendered line pixels, not the SVG geometry
          horizontalRefs.current.forEach((line, i) => {
            if (!line) return;
            const speed = grid.horizontalSpeeds[i];
            if (speed === undefined) return;

            gsap.set(line, { willChange: "transform" });
            gsap.to(line, {
              y: speed * grid.driftAmount,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            });
          });

          verticalRefs.current.forEach((line, i) => {
            if (!line) return;
            const speed = grid.verticalSpeeds[i];
            if (speed === undefined) return;

            gsap.set(line, { willChange: "transform" });
            gsap.to(line, {
              x: speed * grid.driftAmount,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            });
          });

          return () => {
            // Clear will-change on cleanup
            [...horizontalRefs.current, ...verticalRefs.current].forEach(
              (line) => {
                if (line) gsap.set(line, { willChange: "auto" });
              },
            );
          };
        });
      }, containerRef);

      return () => {
        media.revert();
        ctx.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        grid.enabled,
        grid.driftAmount,
        grid.horizontalLines,
        grid.verticalLines,
      ],
    },
  );

  if (!grid.enabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        {horizontalPositions.map((pos, i) => {
          const dash = grid.horizontalDash[i];
          const opacity = grid.horizontalOpacities[i] ?? 0.1;

          return (
            <line
              key={`h-${i}`}
              ref={(el) => {
                if (el) horizontalRefs.current[i] = el;
              }}
              x1={0}
              y1={pos}
              x2={100}
              y2={pos}
              stroke={grid.color}
              strokeWidth={grid.strokeWidth}
              strokeOpacity={opacity}
              strokeDasharray={dash ? `${dash[0]} ${dash[1]}` : undefined}
              // ── THE CRITICAL FIX ──────────────────────────────────────────
              // Without this, strokeWidth is in viewBox units (~14px on screen)
              // With this, strokeWidth is always exactly 1 CSS pixel
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {verticalPositions.map((pos, i) => {
          const dash = grid.verticalDash[i];
          const opacity = grid.verticalOpacities[i] ?? 0.1;

          return (
            <line
              key={`v-${i}`}
              ref={(el) => {
                if (el) verticalRefs.current[i] = el;
              }}
              x1={pos}
              y1={0}
              x2={pos}
              y2={100}
              stroke={grid.color}
              strokeWidth={grid.strokeWidth}
              strokeOpacity={opacity}
              strokeDasharray={dash ? `${dash[0]} ${dash[1]}` : undefined}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
    </div>
  );
}