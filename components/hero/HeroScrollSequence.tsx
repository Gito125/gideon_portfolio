"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { getGsap, useGSAP } from "@/lib/gsap";

const heroStats = [
  { label: "Live Product", value: "01" },
  { label: "Uganda → World", value: "UG" },
  { label: "Full-Stack", value: "FS" },
] as const;

export function HeroScrollSequence() {
  const sectionRef     = useRef<HTMLElement>(null);
  const photoRef       = useRef<HTMLDivElement>(null);
  const nameBlockRef   = useRef<HTMLDivElement>(null);
  const ogwangRef      = useRef<HTMLSpanElement>(null);
  const gideonWrapRef  = useRef<HTMLDivElement>(null);
  const giftRef        = useRef<HTMLSpanElement>(null);
  const underlineRef   = useRef<HTMLSpanElement>(null);
  const roleRef        = useRef<HTMLParagraphElement>(null);
  const statsRef       = useRef<HTMLUListElement>(null);
  const ctaWrapRef     = useRef<HTMLDivElement>(null);
  const eyebrowRef     = useRef<HTMLSpanElement>(null);
  const [portraitLoaded, setPortraitLoaded] = useState(false);

  useGSAP(
    () => {
      const section    = sectionRef.current;
      const photo      = photoRef.current;
      const gideonWrap = gideonWrapRef.current;
      const ogwang     = ogwangRef.current;
      const gift       = giftRef.current;
      const role       = roleRef.current;
      const underline  = underlineRef.current;
      const ctaWrap    = ctaWrapRef.current;
      const eyebrow    = eyebrowRef.current;

      if (!section || !photo || !gideonWrap || !ogwang || !gift || !role || !underline || !ctaWrap || !eyebrow) return;

      const stats = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-stat]"));
      const gsap  = getGsap();
      const mm    = gsap.matchMedia();

      mm.add(
        {
          desktopMotion: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          reduced:       "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktopMotion, reduced } = ctx.conditions as {
            desktopMotion: boolean;
            reduced:       boolean;
          };

          if (reduced || !desktopMotion) {
            gsap.set([photo, ogwang, gift, role, underline, ctaWrap, eyebrow, ...stats], {
              autoAlpha: 1, y: 0, x: 0, clearProps: "all",
            });
            gsap.set(gideonWrap, { scale: 1, clearProps: "all" });
            return;
          }

          // ── Initial states ───────────────────────────────────────
          gsap.set(gideonWrap, {
            scale: 0.6,
            transformOrigin: "left bottom",
            willChange: "transform",
          });
          gsap.set(photo, {
            scale: 0.84,
            transformOrigin: "center center",
            willChange: "transform",
          });
          gsap.set(eyebrow, { autoAlpha: 0, y: -12, willChange: "transform,opacity" });
          gsap.set(ogwang,  { autoAlpha: 0, y: -52, willChange: "transform,opacity" });
          gsap.set(gift,    { autoAlpha: 0, x:  36, willChange: "transform,opacity" });
          gsap.set(role,    { autoAlpha: 0, y:  24, willChange: "transform,opacity" });
          gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(stats,   { autoAlpha: 0, y: 20, willChange: "transform,opacity" });
          gsap.set(ctaWrap, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });

          // ── Scroll-scrubbed timeline ─────────────────────────────
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

          // 0–20%  Photo + Gideon scale into place
          tl.to(photo,      { scale: 1, duration: 2, ease: "none" }, 0);
          tl.to(gideonWrap, { scale: 1, duration: 2, ease: "none" }, 0);

          // 15–30% Eyebrow fades in
          tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 1, ease: "none" }, 1.5);

          // 20–50% Ogwang + Gift enter
          tl.to(ogwang, { autoAlpha: 1, y: 0, duration: 1.4, ease: "none" }, 2.0);
          tl.to(gift,   { autoAlpha: 1, x: 0, duration: 1.4, ease: "none" }, 2.2);

          // 40–60% Role + underline
          tl.to(role,     { autoAlpha: 1, y: 0, duration: 0.8, ease: "none" }, 2.8);
          tl.to(underline, { scaleX: 1,         duration: 0.8, ease: "none" }, 2.8);

          // 55–80% Stats stagger
          tl.to(stats, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "none" }, 3.6);

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
      className="relative w-full bg-[var(--color-bg)] pt-[96px]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,4.5vw,80px)] sm:pt-(--space-7)">
        <div className="grid w-full items-start gap-[var(--space-6)] lg:grid-cols-[1fr_auto]">

          {/* ── Left: Identity ──────────────────────────────────────── */}
          <div className="flex flex-col gap-[var(--space-4)]">

            {/* Eyebrow — portfolio marker */}
            <span
              ref={eyebrowRef}
              className="
                flex items-center gap-(--space-2)
                font-mono
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-(--color-text-secondary)
              "
            >
              <span
                className="inline-block h-px w-8 bg-(--color-amber)"
                aria-hidden="true"
              />
              Portfolio · 2026
            </span>

            {/* Name block */}
            <div ref={nameBlockRef} className="flex flex-col gap-0 leading-none">

              {/* Ogwang */}
              <span
                ref={ogwangRef}
                aria-hidden="true"
                className="
                  block
                  font-display
                  text-[clamp(20px,2.6vw,32px)]
                  font-light
                  italic
                  leading-[1.4]
                  tracking-[-0.01em]
                  text-(--color-text-secondary)
                "
              >
                Ogwang
              </span>

              {/* Gideon + Gift */}
              <div className="flex items-baseline gap-(--space-2)">
                <div
                  ref={gideonWrapRef}
                  className="origin-bottom-left"
                  style={{ display: "inline-block" }}
                >
                  <h1
                    className="
                      block
                      font-display
                      text-[clamp(72px,8.5vw,var(--text-display))]
                      leading-none
                      tracking-[-0.03em]
                      text-(--color-amber)
                    "
                  >
                    Gideon
                  </h1>
                </div>
                <span
                  ref={giftRef}
                  aria-hidden="true"
                  className="
                    font-display
                    text-[clamp(16px,2vw,24px)]
                    font-light
                    italic
                    leading-[1.4]
                    tracking-[-0.01em]
                    text-(--color-text-secondary)
                    pb-[0.12em]
                  "
                >
                  Gift
                </span>
              </div>
            </div>

            {/* Screen-reader full name */}
            <h1 className="sr-only">Ogwang Gift Gideon</h1>

            {/* Amber underline — wider, bolder presence */}
            <span
              ref={underlineRef}
              className="block h-0.75 w-[180px] max-w-full bg-(--color-amber)"
              aria-hidden="true"
            />

            {/* Role */}
            <p
              ref={roleRef}
              className="
                font-display
                text-(length:--text-headline-md)
                italic
                leading-[1.3]
                text-(--color-text-secondary)
                max-w-[420px]
              "
            >
              Full-Stack Developer &amp; Product Builder
            </p>

            {/* Stat chips — redesigned with value + label stacking */}
            <ul
              ref={statsRef}
              className="flex flex-wrap gap-(--space-2) pt-(--space-1)"
            >
              {heroStats.map((stat) => (
                <li
                  key={stat.label}
                  data-hero-stat
                  className="
                    flex flex-col
                    border-l-2 border-l-(--color-amber)
                    border border-(--color-border)
                    px-(--space-3) py-(--space-2)
                    bg-(--color-surface)
                    gap-[2px]
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[15px]
                      font-bold
                      leading-none
                      text-foreground
                    "
                  >
                    {stat.value}
                  </span>
                  <span
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.12em]
                      text-(--color-text-secondary)
                    "
                  >
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div ref={ctaWrapRef} className="flex flex-wrap gap-(--space-3) pt-(--space-2)">
              <Link
                href="/projects"
                data-cursor="cta"
                className="
                  label
                  inline-flex items-center justify-center gap-(--space-2)
                  border border-transparent
                  bg-(--color-amber)
                  px-(--space-5) py-(--space-3)
                  text-foreground
                  transition-colors duration-(--duration-base)
                  hover:bg-(--color-amber-dark) hover:text-background
                "
              >
                See My Work
                <span aria-hidden="true" className="text-[16px] leading-none">→</span>
              </Link>
              <Link
                href="/contact"
                data-cursor="cta"
                className="
                  label
                  inline-flex items-center justify-center gap-(--space-2)
                  border border-(--color-green)
                  px-(--space-5) py-(--space-3)
                  text-(--color-green)
                  transition-colors duration-(--duration-base)
                  hover:bg-(--color-green-light)
                "
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          {/* ── Right: Portrait ─────────────────────────────────────── */}
          <div
            ref={photoRef}
            className="
              relative overflow-hidden
              border border-(--color-border)
              w-full lg:w-[clamp(320px,32vw,520px)]
            "
          >
            {/* Corner accent — top-right amber marker */}
            <span
              className="
                absolute top-0 right-0 z-10
                block w-10 h-0.75
                bg-(--color-amber)
              "
              aria-hidden="true"
            />

            <div className="relative aspect-[3/4] w-full">
              <div
                aria-hidden="true"
                className={
                  `absolute inset-0 bg-(--color-preloader-bg) transition-opacity duration-(--duration-base) ` +
                  (portraitLoaded ? "opacity-0" : "opacity-100")
                }
              >
                <div className="absolute inset-0 flex flex-col justify-between p-(--space-4) motion-safe:animate-pulse motion-reduce:animate-none">
                  <div className="flex items-start justify-between gap-(--space-3)">
                    <span className="block h-0.75 w-[42px] bg-(--color-amber)" />
                    <span className="block h-px w-[24%] bg-(--color-border)/30" />
                  </div>
                  <div className="flex flex-col gap-(--space-3)">
                    <span className="block h-[38%] w-[72%] border border-(--color-border)/20 bg-(--color-surface)/5" />
                    <span className="block h-px w-[52%] bg-(--color-border)/25" />
                    <span className="block h-px w-[36%] bg-(--color-border)/20" />
                  </div>
                </div>
              </div>
              <Image
                src="/images/hero-portrait-optimized.jpg"
                alt="Portrait of Ogwang Gift Gideon"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 32vw"
                onLoad={() => setPortraitLoaded(true)}
                className={
                  "object-cover object-top [filter:sepia(0.2)_saturate(1.3)] transition-opacity duration-(--duration-base) " +
                  (portraitLoaded ? "opacity-100" : "opacity-0")
                }
              />
            </div>

            {/* Photo caption — bottom-left overlay tag */}
            <div
              className="
                absolute bottom-0 left-0
                bg-(--color-preloader-bg)/80
                px-(--space-3) py-(--space-2)
                backdrop-blur-sm
              "
            >
              <span
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-[rgba(255,255,255,0.7)]
                "
              >
                Kampala, Uganda
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}