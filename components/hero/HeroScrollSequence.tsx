"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { getGsap, useGSAP } from "@/lib/gsap";

const heroStats = ["1 Live Product", "2 Universities", "Uganda → World"] as const;

export function HeroScrollSequence() {
  const sectionRef    = useRef<HTMLElement>(null);
  const photoRef      = useRef<HTMLDivElement>(null);
  // Name parts — three independent refs
  const gideonWrapRef = useRef<HTMLDivElement>(null);   // scales 0.6 → 1 from start
  const ogwangRef     = useRef<HTMLSpanElement>(null);  // drops from above at ~20%
  const giftRef       = useRef<HTMLSpanElement>(null);  // slides from right at ~25%
  const roleRef       = useRef<HTMLParagraphElement>(null);
  const underlineRef  = useRef<HTMLSpanElement>(null);
  const ctaWrapRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section   = sectionRef.current;
      const photo     = photoRef.current;
      const gideonWrap = gideonWrapRef.current;
      const ogwang    = ogwangRef.current;
      const gift      = giftRef.current;
      const role      = roleRef.current;
      const underline = underlineRef.current;
      const ctaWrap   = ctaWrapRef.current;

      if (!section || !photo || !gideonWrap || !ogwang || !gift || !role || !underline || !ctaWrap) {
        return;
      }

      const stats   = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-stat]"));
      const gsap    = getGsap();
      const mm      = gsap.matchMedia();

      mm.add(
        {
          desktopMotion: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktopMotion, reduced } = ctx.conditions as {
            desktopMotion: boolean;
            reduced: boolean;
          };

          // ── Reduced-motion / mobile fallback ─────────────────────
          if (reduced || !desktopMotion) {
            gsap.set(
              [photo, ogwang, gift, role, underline, ctaWrap, ...stats],
              { autoAlpha: 1, y: 0, x: 0, clearProps: "all" },
            );
            gsap.set(gideonWrap, { scale: 1, clearProps: "all" });
            return;
          }

          // ── Initial states ────────────────────────────────────────
          //
          // Gideon: always visible, starts at scale(0.6) ≈ 48px
          // Using transform scale on wrapper keeps GPU-only, no reflow.
          gsap.set(gideonWrap, {
            scale: 0.6,
            transformOrigin: "left bottom",
            willChange: "transform",
          });

          // Photo: starts slightly zoomed out
          gsap.set(photo, {
            scale: 0.82,
            transformOrigin: "center center",
            willChange: "transform",
          });

          // Name siblings: hidden, waiting to enter
          gsap.set(ogwang, { autoAlpha: 0, y: -52, willChange: "transform,opacity" });
          gsap.set(gift,   { autoAlpha: 0, x: 36,  willChange: "transform,opacity" });

          // Supporting content
          gsap.set(role,    { autoAlpha: 0, y: 24, willChange: "transform,opacity" });
          gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(stats,   { autoAlpha: 0, y: 20, willChange: "transform,opacity" });
          gsap.set(ctaWrap, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });

          // ── Scroll-scrubbed timeline ──────────────────────────────
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=2400",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          // 0–20%  Photo grows in + Gideon scales to full size
          tl.to(photo,      { scale: 1, duration: 2, ease: "none" }, 0);
          tl.to(gideonWrap, { scale: 1, duration: 2, ease: "none" }, 0);

          // 20–50% Ogwang drops from above, Gift slides from right
          tl.to(ogwang, { autoAlpha: 1, y: 0, duration: 1.4, ease: "none" }, 2.0);
          tl.to(gift,   { autoAlpha: 1, x: 0, duration: 1.4, ease: "none" }, 2.2);

          // 40–60% Role + amber underline
          tl.to(role,     { autoAlpha: 1, y: 0,   duration: 0.8, ease: "none" }, 2.8);
          tl.to(underline, { scaleX: 1,           duration: 0.8, ease: "none" }, 2.8);

          // 55–80% Stat chips stagger in
          tl.to(stats, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "none",
          }, 3.6);

          // 80–100% CTAs
          tl.to(ctaWrap, { autoAlpha: 1, y: 0, duration: 0.8, ease: "none" }, 4.6);
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--color-bg)] pt-[96px]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,4.5vw,80px)] py-[var(--space-7)]">
        <div className="grid w-full items-start gap-[var(--space-6)] lg:grid-cols-2">

          {/* ── Left: Name composition + supporting content ─────────── */}
          <div className="flex flex-col gap-[var(--space-4)]">

            {/* Name block */}
            <div className="flex flex-col gap-0 leading-none">

              {/* Ogwang — secondary, drops from above */}
              <span
                ref={ogwangRef}
                aria-hidden="true"
                className="
                  block
                  font-[var(--font-display-family)]
                  text-[clamp(22px,2.8vw,34px)]
                  font-[300]
                  leading-[1.3]
                  tracking-[-0.01em]
                  text-[var(--color-text-secondary)]
                "
              >
                Ogwang
              </span>

              {/* Gideon (scales up) + Gift (slides in beside) */}
              <div className="flex items-baseline gap-[var(--space-3)]">
                {/*
                  Wrapper is the element GSAP scales.
                  The inner span carries only visual styles.
                  transform-origin: left bottom keeps it anchored to the baseline.
                */}
                <div
                  ref={gideonWrapRef}
                  className="origin-bottom-left"
                  style={{ display: "inline-block" }}
                >
                  <span
                    className="
                      block
                      font-[var(--font-display-family)]
                      text-[clamp(64px,7.2vw,var(--text-display))]
                      font-[200]
                      leading-[1.05]
                      tracking-[-0.03em]
                      text-[var(--color-amber)]
                    "
                  >
                    Gideon
                  </span>
                </div>

                {/* Gift — slides in from the right */}
                <span
                  ref={giftRef}
                  aria-hidden="true"
                  className="
                    font-[var(--font-display-family)]
                    text-[clamp(18px,2.2vw,26px)]
                    font-[300]
                    leading-[1.3]
                    tracking-[-0.01em]
                    text-[var(--color-text-secondary)]
                    pb-[0.15em]
                  "
                >
                  Gift
                </span>
              </div>
            </div>

            {/* Screen-reader-only full name for accessibility */}
            <h1 className="sr-only">Ogwang Gift Gideon</h1>

            {/* Amber underline */}
            <span
              ref={underlineRef}
              className="block h-[2px] w-[220px] max-w-full bg-[var(--color-amber)]"
              aria-hidden="true"
            />

            {/* Role */}
            <p
              ref={roleRef}
              className="
                font-[var(--font-display-family)]
                text-[length:var(--text-headline-md)]
                italic
                text-[var(--color-text-secondary)]
              "
            >
              Full-Stack Developer &amp; Product Builder
            </p>

            {/* Stat chips */}
            <ul className="flex flex-wrap gap-[var(--space-2)]">
              {heroStats.map((stat) => (
                <li
                  key={stat}
                  data-hero-stat
                  className="
                    label
                    border border-[var(--color-border)]
                    px-[var(--space-2)] py-[var(--space-1)]
                    text-[var(--color-text-secondary)]
                  "
                >
                  {stat}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div ref={ctaWrapRef} className="flex flex-wrap gap-[var(--space-3)]">
              <Link
                href="/projects"
                data-cursor="cta"
                className="
                  label
                  inline-flex items-center justify-center
                  border border-transparent
                  bg-[var(--color-amber)]
                  px-[var(--space-5)] py-[var(--space-3)]
                  text-[var(--color-text-primary)]
                  transition-colors duration-[var(--duration-base)]
                  hover:bg-[var(--color-amber-dark)] hover:text-[var(--color-bg)]
                "
              >
                See My Work
              </Link>
              <Link
                href="/contact"
                data-cursor="cta"
                className="
                  label
                  inline-flex items-center justify-center
                  border border-[var(--color-green)]
                  px-[var(--space-5)] py-[var(--space-3)]
                  text-[var(--color-green)]
                  transition-colors duration-[var(--duration-base)]
                  hover:bg-[var(--color-green-light)]
                "
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          {/* ── Right: Portrait photo ────────────────────────────────── */}
          <div
            ref={photoRef}
            className="overflow-hidden border border-[var(--color-border)]"
          >
            {/*
              aspect-[4/3] fills the column height better than 16/9
              and removes the dead space below the image on desktop.
              object-position: top keeps the face visible.
            */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/IMG_20251116_153816_548.jpg"
                alt="Portrait of Ogwang Gift Gideon"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top [filter:sepia(0.2)_saturate(1.3)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}