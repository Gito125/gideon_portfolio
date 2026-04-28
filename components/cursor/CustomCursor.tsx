"use client";

import { useEffect, useRef, useState } from "react";

import { CursorVariant } from "@/lib/animation/types";
import { getGsap, useGSAP } from "@/lib/gsap";

interface CustomCursorProps {
  ready: boolean;
}

interface CursorVisualState {
  variant: CursorVariant;
  label?: string;
}

interface VariantStyle {
  ringSize: number;
  dotSize: number;
  ringColor: string;
  dotColor: string;
  ringWidth: number;
  rotation: number;
}

const variantStyles: Record<CursorVariant, VariantStyle> = {
  default: {
    ringSize: 32,
    dotSize: 8,
    ringColor: "var(--color-amber)",
    dotColor: "var(--color-amber)",
    ringWidth: 1,
    rotation: 0,
  },
  view: {
    ringSize: 64,
    dotSize: 4,
    ringColor: "var(--color-green)",
    dotColor: "var(--color-amber)",
    ringWidth: 1.5,
    rotation: 0,
  },
  cta: {
    ringSize: 40,
    dotSize: 8,
    ringColor: "var(--color-green)",
    dotColor: "var(--color-green)",
    ringWidth: 1.5,
    rotation: 45,
  },
  link: {
    ringSize: 24,
    dotSize: 6,
    ringColor: "var(--color-amber)",
    dotColor: "var(--color-amber)",
    ringWidth: 1,
    rotation: 0,
  },
  click: {
    ringSize: 72,
    dotSize: 4,
    ringColor: "var(--color-amber)",
    dotColor: "var(--color-amber)",
    ringWidth: 1.5,
    rotation: 0,
  },
};

function isCursorVariant(value: string | undefined): value is CursorVariant {
  return value === "default" || value === "view" || value === "cta" || value === "link";
}

export function CustomCursor({ ready }: CustomCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const currentHoverRef = useRef<CursorVisualState>({ variant: "default" });
  const clickTimeoutRef = useRef<number | null>(null);

  const [{ variant, label }, setVisualState] = useState<CursorVisualState>({
    variant: "default",
  });

  useGSAP(
    () => {
      const root = rootRef.current;
      const ring = ringRef.current;
      const dot = dotRef.current;

      if (!root || !ring || !dot) {
        return;
      }

      const gsap = getGsap();
      const ringX = gsap.quickTo(ring, "x", {
        duration: 0.08,
        ease: "power3.out",
      });
      const ringY = gsap.quickTo(ring, "y", {
        duration: 0.08,
        ease: "power3.out",
      });
      const dotX = gsap.quickTo(dot, "x", {
        duration: 0.04,
        ease: "power3.out",
      });
      const dotY = gsap.quickTo(dot, "y", {
        duration: 0.04,
        ease: "power3.out",
      });

      const onMove = (event: PointerEvent) => {
        ringX(event.clientX);
        ringY(event.clientY);
        dotX(event.clientX);
        dotY(event.clientY);
      };

      window.addEventListener("pointermove", onMove, { passive: true });

      return () => {
        window.removeEventListener("pointermove", onMove);
      };
    },
    {
      scope: rootRef,
    },
  );

  useEffect(() => {
    if (!ready) {
      return;
    }

    const gsap = getGsap();

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const interactive = target.closest<HTMLElement>("[data-cursor]");

      if (!interactive) {
        currentHoverRef.current = { variant: "default" };
        setVisualState({ variant: "default" });
        return;
      }

      const dataVariant = interactive.dataset.cursor;
      const nextVariant = isCursorVariant(dataVariant) ? dataVariant : "default";
      const nextLabel =
        interactive.dataset.cursorLabel ?? (nextVariant === "view" ? "VIEW" : undefined);

      currentHoverRef.current = { variant: nextVariant, label: nextLabel };
      setVisualState(currentHoverRef.current);
    };

    const onPointerDown = (event: PointerEvent) => {
      setVisualState({ variant: "click" });

      const burst = burstRef.current;

      if (burst) {
        const activeVariant = currentHoverRef.current.variant;
        const style = variantStyles[activeVariant];

        gsap.killTweensOf(burst);
        gsap.set(burst, {
          x: event.clientX,
          y: event.clientY,
          width: style.ringSize,
          height: style.ringSize,
          borderColor: style.ringColor,
          opacity: 0.6,
          scale: 0.6,
        });
        gsap.to(burst, {
          opacity: 0,
          scale: 2.4,
          duration: 0.32,
          ease: "power2.out",
        });
      }

      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }

      clickTimeoutRef.current = window.setTimeout(() => {
        setVisualState(currentHoverRef.current);
      }, 160);
    };

    const onPointerLeaveWindow = () => {
      currentHoverRef.current = { variant: "default" };
      setVisualState({ variant: "default" });
    };

    window.addEventListener("pointerover", onPointerOver);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("blur", onPointerLeaveWindow);

    return () => {
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("blur", onPointerLeaveWindow);

      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [ready]);

  useGSAP(
    () => {
      const gsap = getGsap();
      const root = rootRef.current;
      const ring = ringRef.current;
      const dot = dotRef.current;
      const text = labelRef.current;

      if (!root || !ring || !dot || !text) {
        return;
      }

      gsap.to(root, {
        autoAlpha: ready ? 1 : 0,
        duration: 0.2,
        ease: "power2.out",
      });

      const style = variantStyles[variant];

      gsap.to(ring, {
        width: style.ringSize,
        height: style.ringSize,
        borderColor: style.ringColor,
        borderWidth: style.ringWidth,
        rotation: style.rotation,
        duration: 0.18,
        ease: "power3.out",
      });

      gsap.to(dot, {
        width: style.dotSize,
        height: style.dotSize,
        backgroundColor: style.dotColor,
        duration: 0.16,
        ease: "power3.out",
      });

      gsap.to(text, {
        autoAlpha: label ? 1 : 0,
        duration: 0.14,
      });
    },
    {
      scope: rootRef,
      dependencies: [label, ready, variant],
    },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95] hidden opacity-0 md:block"
    >
      <div
        ref={ringRef}
        className="cursor-ring absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 border border-[var(--color-amber)]"
      >
        <span
          ref={labelRef}
          className="label absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[var(--color-green)] opacity-0"
        >
          {label ?? ""}
        </span>
      </div>
      <div
        ref={dotRef}
        className="cursor-ring absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-amber)]"
      />
      <div
        ref={burstRef}
        className="cursor-ring absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 border border-[var(--color-amber)] opacity-0"
      />
    </div>
  );
}
