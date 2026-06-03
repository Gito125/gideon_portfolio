"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GhostText } from "@/components/background/GhostText";
import { drawLineFallback } from "@/lib/animation/gsap-fallbacks";
import { PreloaderPhase } from "@/lib/animation/types";
import { getGsap, useGSAP, SplitText } from "@/lib/gsap";

interface PreloaderProps {
  phase: PreloaderPhase;
  onPhaseChange: (phase: PreloaderPhase) => void;
  onComplete: () => void;
}

const SESSION_KEY = "gideon:preloaderSeen";

export function Preloader({ phase, onPhaseChange, onComplete }: PreloaderProps) {
  const rootRef         = useRef<HTMLDivElement>(null);
  const counterRef      = useRef<HTMLSpanElement>(null);
  const underlineRef    = useRef<HTMLSpanElement>(null);
  const nameRef         = useRef<HTMLHeadingElement>(null);
  const taglineRef      = useRef<HTMLParagraphElement>(null);
  const crackPathRef    = useRef<SVGPathElement>(null);
  const topPanelRef     = useRef<HTMLDivElement>(null);
  const bottomPanelRef  = useRef<HTMLDivElement>(null);
  const progressBarRef  = useRef<HTMLSpanElement>(null);
  const markerRef       = useRef<HTMLDivElement>(null);
  const completedRef    = useRef(false);

  const [counterValue,  setCounterValue]  = useState("00");
  const [isMobile,      setIsMobile]      = useState(false);
  const [reduceMotion,  setReduceMotion]  = useState(false);
  const [mounted,       setMounted]       = useState(false);
  const [shouldRender,  setShouldRender]  = useState(true);
  const [startSequence, setStartSequence] = useState(false);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    onPhaseChange("COMPLETE");
    onComplete();
    setShouldRender(false);
  }, [onComplete, onPhaseChange]);

  useEffect(() => {
    setMounted(true);

    const mobileQuery       = window.matchMedia("(max-width: 767px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMedia = () => {
      setIsMobile(mobileQuery.matches);
      setReduceMotion(reduceMotionQuery.matches);
    };

    syncMedia();

    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    let hideTimer:  number | null = null;
    let startTimer: number | null = null;

    if (seen) {
      onPhaseChange("COMPLETE");
      onComplete();
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

  // Counter scramble
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

  // Progress bar — animates from 0 → 100% over ~900ms in sync with counter
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar || !startSequence || !shouldRender || reduceMotion) return;

    bar.style.width = "0%";
    bar.style.transition = "width 0.9s linear";
    // small rAF to ensure transition applies after paint
    const raf = requestAnimationFrame(() => {
      bar.style.width = "100%";
    });

    return () => cancelAnimationFrame(raf);
  }, [startSequence, shouldRender, reduceMotion]);

  // GSAP animation sequence
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
      const marker      = markerRef.current;

      if (!root || !counter || !underline || !name || !tagline || !crackPath || !topPanel || !bottomPanel) return;

      const gsap         = getGsap();
      const nameSplit    = new SplitText(name,    { type: "chars" });
      const taglineSplit = new SplitText(tagline, { type: "words" });

      gsap.set([nameSplit.elements, taglineSplit.elements], { autoAlpha: 0, y: 24 });
      gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
      if (marker) gsap.set(marker, { autoAlpha: 0, y: -8 });

      const timeline = gsap.timeline({
        defaults: { ease: "var(--ease-out-smooth)" },
        onComplete: () => complete(),
      });

      // Marker fades in first — sets the tone
      if (marker) {
        timeline.to(marker, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.1);
      }

      timeline
        .from(nameSplit.elements,    { autoAlpha: 0, y: 28, stagger: 0.028, duration: 0.42 }, 0.15)
        .fromTo(counter,  { scale: 1.2 }, { scale: 1, duration: 0.24, ease: "var(--ease-back)" }, 0.9)
        .fromTo(underline, { scaleX: 0 }, { scaleX: 1, duration: 0.24 }, 0.9)
        .from(taglineSplit.elements, { autoAlpha: 0, y: 16, stagger: 0.06, duration: 0.32 }, 0.9)
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

  const topClip    = mounted && isMobile ? "polygon(0 0, 100% 0, 100% 50%, 0 50%)"       : "polygon(0 0, 100% 0, 100% 100%, 0 30%)";
  const bottomClip = mounted && isMobile ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" : "polygon(0 30%, 100% 100%, 0 100%)";
  const crackD     = mounted && isMobile ? "M0 50 L100 50"                                : "M0 100 L100 0";

  const displayCounterValue = reduceMotion && startSequence ? "100" : counterValue;

  return (
    <div
      ref={rootRef}
      data-preloader-root
      className="fixed inset-0 z-preloader overflow-hidden bg-[var(--color-preloader-bg)] text-white"
      aria-hidden={phase === "COMPLETE"}
    >
      {/* ── Progress bar — top edge ──────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-[100] h-[2px] bg-[rgba(255,255,255,0.08)]"
        aria-hidden="true"
      >
        <span
          ref={progressBarRef}
          className="block h-full bg-[var(--color-amber)]"
          style={{ width: "0%" }}
        />
      </div>

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

        {/* Top-right portfolio marker */}
        <div
          ref={markerRef}
          className="
            absolute
            top-[clamp(24px,3vw,40px)]
            right-[clamp(20px,4.5vw,80px)]
            flex items-center gap-[var(--space-3)]
          "
        >
          <span
            className="
              font-[var(--font-mono-family)]
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[rgba(255,255,255,0.35)]
            "
          >
            Portfolio
          </span>
          <span
            className="block w-[1px] h-[12px] bg-[rgba(255,255,255,0.2)]"
            aria-hidden="true"
          />
          <span
            className="
              font-[var(--font-mono-family)]
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[rgba(255,255,255,0.35)]
            "
          >
            2026
          </span>
        </div>

        {/* Name + tagline — vertically centred on desktop, above counter on mobile */}
        <div
          className="
            absolute left-[var(--space-5)] right-[var(--space-5)]
            bottom-[calc(var(--space-6)+clamp(44px,8vw,64px)+48px)]
            flex flex-col gap-[var(--space-3)]
            md:bottom-auto
            md:left-[clamp(40px,4.5vw,80px)]
            md:right-auto
            md:top-1/2
            md:-translate-y-1/2
            md:max-w-[680px]
          "
        >
          {/* Small label above name */}
          <span
            className="
              flex items-center gap-[var(--space-2)]
              font-[var(--font-mono-family)]
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[var(--color-amber)]
              opacity-60
            "
          >
            <span className="block w-[20px] h-[1px] bg-[var(--color-amber)]" aria-hidden="true" />
            Full-Stack Developer
          </span>

          <h1
            ref={nameRef}
            className="
              font-[var(--font-display-family)]
              text-[clamp(36px,6vw,var(--text-display))]
              font-[200]
              leading-[1.05]
              tracking-[-0.03em]
              text-white
            "
          >
            Ogwang Gift Gideon
          </h1>

          <p
            ref={taglineRef}
            className="
              font-[var(--font-display-family)]
              text-[clamp(16px,1.8vw,20px)]
              font-[300]
              italic
              leading-[1.5]
              text-[rgba(255,255,255,0.45)]
              max-w-[420px]
            "
          >
            I build things that matter.
          </p>
        </div>

        {/* Counter + underline — bottom-left */}
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
          {/* Label above counter */}
          <span
            className="
              font-[var(--font-mono-family)]
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[rgba(255,255,255,0.3)]
            "
          >
            Loading
          </span>

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
