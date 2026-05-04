"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GhostText } from "@/components/background/GhostText";
import {
  drawLineFallback,
} from "@/lib/animation/gsap-fallbacks";
import { PreloaderPhase } from "@/lib/animation/types";
import { getGsap, useGSAP, SplitText } from "@/lib/gsap";

interface PreloaderProps {
  phase: PreloaderPhase;
  onPhaseChange: (phase: PreloaderPhase) => void;
  onComplete: () => void;
}

const SESSION_KEY = "gideon:preloaderSeen";

export function Preloader({ phase, onPhaseChange, onComplete }: PreloaderProps) {
  const rootRef        = useRef<HTMLDivElement>(null);
  const counterRef     = useRef<HTMLSpanElement>(null);
  const underlineRef   = useRef<HTMLSpanElement>(null);
  const nameRef        = useRef<HTMLHeadingElement>(null);
  const taglineRef     = useRef<HTMLParagraphElement>(null);
  const crackPathRef   = useRef<SVGPathElement>(null);
  const topPanelRef    = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const completedRef   = useRef(false);

  const [counterValue, setCounterValue] = useState("00");

  const [isMobile,      setIsMobile]      = useState(false);
  const [reduceMotion,  setReduceMotion]  = useState(false);
  const [mounted,       setMounted]       = useState(false);
  const [shouldRender,  setShouldRender]  = useState(true);
  const [startSequence, setStartSequence] = useState(false);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    sessionStorage.setItem(SESSION_KEY, "1");

    // ── Remove the data-loading attribute added by the inline <head> script.
    // This un-hides the body content that was concealed during JS boot.
    document.documentElement.removeAttribute("data-loading");

    onPhaseChange("COMPLETE");
    onComplete();
    setShouldRender(false);
  }, [onComplete, onPhaseChange]);

  useEffect(() => {
    setMounted(true);

    const mobileQuery      = window.matchMedia("(max-width: 767px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMedia = () => {
      setIsMobile(mobileQuery.matches);
      setReduceMotion(reduceMotionQuery.matches);
    };

    syncMedia();

    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    let hideTimer: number | null  = null;
    let startTimer: number | null = null;

    if (seen) {
      // Repeat visit — skip animation, immediately reveal page
      onPhaseChange("COMPLETE");
      onComplete();
      document.documentElement.removeAttribute("data-loading");
      hideTimer = window.setTimeout(() => setShouldRender(false), 0);
    } else {
      onPhaseChange("COUNTING");
      startTimer = window.setTimeout(() => setStartSequence(true), 0);
    }

    mobileQuery.addEventListener("change", syncMedia);
    reduceMotionQuery.addEventListener("change", syncMedia);

    return () => {
      if (hideTimer)  window.clearTimeout(hideTimer);
      if (startTimer) window.clearTimeout(startTimer);
      mobileQuery.removeEventListener("change", syncMedia);
      reduceMotionQuery.removeEventListener("change", syncMedia);
    };
  }, [onComplete, onPhaseChange]);

  useEffect(() => {
    if (!startSequence || !shouldRender) return;

    if (reduceMotion) {
      onPhaseChange("LOCKING");
      const timer = window.setTimeout(() => complete(), 180);
      return () => window.clearTimeout(timer);
    }

    const hardTimeout = window.setTimeout(() => complete(), 3000);

    const scrambleInterval = window.setInterval(() => {
      setCounterValue(String(Math.floor(Math.random() * 100)).padStart(2, "0"));
    }, 40);

    const lockTimeout = window.setTimeout(() => {
      window.clearInterval(scrambleInterval);
      setCounterValue("100");
      onPhaseChange("LOCKING");
    }, 900);

    return () => {
      window.clearTimeout(hardTimeout);
      window.clearTimeout(lockTimeout);
      window.clearInterval(scrambleInterval);
    };
  }, [complete, onPhaseChange, reduceMotion, shouldRender, startSequence]);

  useGSAP(
    () => {
      if (!startSequence || !shouldRender || reduceMotion) return;

      const root        = rootRef.current;
      const counter     = counterRef.current;
      const underline   = underlineRef.current;
      const name        = nameRef.current;
      const tagline     = taglineRef.current;
      const crackPath   = crackPathRef.current;
      const topPanel    = topPanelRef.current;
      const bottomPanel = bottomPanelRef.current;

      if (
        !root || !counter || !underline || !name ||
        !tagline || !crackPath || !topPanel || !bottomPanel
      ) {
        return;
      }

      const gsap        = getGsap();
      const nameSplit   = new SplitText(name,    { type: "chars" });
      const taglineSplit = new SplitText(tagline, { type: "words" });

      gsap.set([nameSplit.elements, taglineSplit.elements], { autoAlpha: 0, y: 24 });
      gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        defaults: { ease: "var(--ease-out-smooth)" },
        onComplete: () => complete(),
      });

      timeline
        .fromTo(counter, { scale: 1.2 }, { scale: 1, duration: 0.24, ease: "var(--ease-back)" }, 0.9)
        .fromTo(underline, { scaleX: 0 }, { scaleX: 1, duration: 0.24 }, 0.9)
        .from(nameSplit.elements,   { autoAlpha: 0, y: 28, stagger: 0.028, duration: 0.42 }, 0.15)
        .from(taglineSplit.elements, { autoAlpha: 0, y: 16, stagger: 0.06,  duration: 0.32 }, 0.9)
        .call(() => onPhaseChange("CRACKING"), undefined, 1.14);

      drawLineFallback({ gsap, path: crackPath, duration: 0.24, ease: "power2.out", timeline, position: 1.15 });

      timeline
        .call(() => onPhaseChange("REVEALING"), undefined, 1.32)
        .to(
          topPanel,
          isMobile
            ? { yPercent: -104, duration: 0.44, ease: "var(--ease-in-out-expo)" }
            : { xPercent: 104, yPercent: -104, duration: 0.44, ease: "var(--ease-in-out-expo)" },
          1.34,
        )
        .to(
          bottomPanel,
          isMobile
            ? { yPercent: 104, duration: 0.44, ease: "var(--ease-in-out-expo)" }
            : { xPercent: -104, yPercent: 104, duration: 0.44, ease: "var(--ease-in-out-expo)" },
          1.34,
        )
        .to(root, { autoAlpha: 0, duration: 0.15 }, 1.66);

      return () => {
        nameSplit.revert();
        taglineSplit.revert();
      };
    },
    {
      scope: rootRef,
      dependencies: [complete, isMobile, onPhaseChange, reduceMotion, shouldRender, startSequence],
    },
  );

  if (!shouldRender) return null;

  const topClip = mounted && isMobile
    ? "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
    : "polygon(0 0, 100% 0, 100% 100%, 0 30%)";

  const bottomClip = mounted && isMobile
    ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)"
    : "polygon(0 30%, 100% 100%, 0 100%)";

  const crackD = mounted && isMobile ? "M0 50 L100 50" : "M0 100 L100 0";

  const displayCounterValue = reduceMotion && startSequence ? "100" : counterValue;

  return (
    /*
      data-preloader-root — referenced by the CSS rule in globals.css:
        html[data-loading] body > *:not([data-preloader-root]) { visibility: hidden }
      This ensures only the preloader itself is visible during boot.
    */
    <div
      ref={rootRef}
      data-preloader-root
      className="fixed inset-0 z-preloader overflow-hidden bg-[var(--color-preloader-bg)] text-white"
      aria-hidden={phase === "COMPLETE"}
    >
      {/* ── Split panels ─────────────────────────────────────────── */}
      <div
        ref={topPanelRef}
        suppressHydrationWarning
        className="absolute inset-0 bg-[var(--color-preloader-bg)]"
        style={{ clipPath: topClip }}
      />
      <div
        ref={bottomPanelRef}
        suppressHydrationWarning
        className="absolute inset-0 bg-[var(--color-preloader-bg)]"
        style={{ clipPath: bottomClip }}
      />

      {/* ── Content layer ────────────────────────────────────────── */}
      <div className="relative z-overlay h-full w-full">
        <GhostText page="preloader" />

        {/* Name + tagline */}
        <div
          className="
            absolute left-[var(--space-5)] right-[var(--space-5)]
            bottom-[calc(var(--space-6)+clamp(44px,8vw,64px)+20px)]
            flex flex-col gap-[var(--space-3)]
            md:bottom-auto
            md:left-[clamp(40px,4.5vw,80px)]
            md:right-auto
            md:top-1/2
            md:-translate-y-1/2
            md:max-w-[640px]
          "
        >
          <h1
            ref={nameRef}
            className="
              font-[var(--font-display-family)]
              text-[clamp(36px,6vw,var(--text-display))]
              font-[200]
              leading-[1.05]
              tracking-[-0.02em]
              text-white
            "
          >
            Ogwang Gift Gideon
          </h1>
          <p
            ref={taglineRef}
            className="text-[length:var(--text-body-md)] text-[var(--color-preloader-muted)]"
          >
            I build things that matter.
          </p>
        </div>

        {/* Counter + underline */}
        <div
          className="
            absolute
            bottom-[var(--space-6)]
            left-[var(--space-5)]
            flex flex-col gap-[var(--space-2)]
            md:left-[clamp(40px,4.5vw,80px)]
            md:bottom-[clamp(40px,4.5vw,80px)]
          "
        >
          <span
            ref={counterRef}
            className="
              font-[var(--font-mono-family)]
              text-[clamp(40px,5.5vw,64px)]
              font-[700]
              leading-none
              tabular-nums
              text-[var(--color-amber)]
            "
          >
            {displayCounterValue}
          </span>
          <span
            ref={underlineRef}
            className="block h-[2px] w-[200px] max-w-full bg-[var(--color-amber)]"
          />
        </div>
      </div>

      {/* ── Crack line SVG ─────────────────────────────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 z-content h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={crackPathRef}
          suppressHydrationWarning
          d={crackD}
          stroke="var(--color-amber)"
          strokeWidth="0.35"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}