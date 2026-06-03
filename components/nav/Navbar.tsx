"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getGsap, useGSAP } from "@/lib/gsap";

interface NavbarProps {
  ready: boolean;
}

const navLinks = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar({ ready }: NavbarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<HTMLAnchorElement[]>([]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Click outside to close ────────────────────────────────────────────────
  const handleOverlayClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // ── Close on route change ─────────────────────────────────────────────────
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ── Nav entrance after preloader ──────────────────────────────────────────
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;
      const gsap = getGsap();

      if (ready) {
        gsap.to(nav, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "var(--ease-out-smooth)",
          pointerEvents: "auto",
        });
        return;
      }

      gsap.set(nav, { autoAlpha: 0, y: -24, pointerEvents: "none" });
    },
    { scope: navRef, dependencies: [ready] },
  );

  // ── Mobile menu open/close animation ─────────────────────────────────────
  useGSAP(
    () => {
      const gsap = getGsap();
      const overlay = overlayRef.current;
      const menu = menuRef.current;
      const items = menuItemRefs.current.filter(Boolean);

      if (!overlay || !menu) return;

      if (mobileOpen) {
        // Overlay fades in
        gsap.to(overlay, {
          autoAlpha: 1,
          duration: 0.3,
          ease: "var(--ease-out-smooth)",
        });

        // Menu panel slides up from bottom
        gsap.fromTo(
          menu,
          { y: "100%", autoAlpha: 0 },
          {
            y: "0%",
            autoAlpha: 1,
            duration: 0.45,
            ease: "var(--ease-out-smooth)",
          },
        );

        // Links stagger in
        gsap.fromTo(
          items,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: "var(--ease-out-smooth)",
            stagger: 0.06,
            delay: 0.15,
          },
        );
      } else {
        // Menu slides back down
        gsap.to(menu, {
          y: "100%",
          autoAlpha: 0,
          duration: 0.35,
          ease: "var(--ease-in-out-expo)",
        });

        // Overlay fades out
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "var(--ease-out-smooth)",
          delay: 0.1,
        });
      }
    },
    { dependencies: [mobileOpen] },
  );

  const shellClasses = useMemo(() => {
    if (!scrolled) return "bg-[var(--color-bg)]/92";
    return "bg-[var(--color-bg)]/86 backdrop-blur-[8px]";
  }, [scrolled]);

  return (
    <>
      {/* ── Main nav bar ──────────────────────────────────────────────────── */}
      <header ref={navRef} className="fixed inset-x-0 top-0 z-nav">
        <nav
          className={`border-b border-[var(--color-border)] transition-colors duration-300 ${shellClasses}`}
        >
          <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] items-center justify-between gap-[var(--space-4)] px-[var(--space-5)] py-[var(--space-3)]">
            {/* Brand */}
            <Link
              href="/"
              data-cursor="link"
              className="font-display text-[20px] italic tracking-[0.02em] text-foreground transition-colors duration-(--duration-base) hover:text-(--color-amber)"
            >
              gideon.dev
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-(--space-5) md:flex">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="link"
                    className={`label relative pb-(--space-1) transition-colors duration-(--duration-base) after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:transition-transform after:duration-300 ${
                      isActive
                        ? "text-(--color-green) after:scale-x-100 after:bg-(--color-green)"
                        : "text-(--color-text-secondary) after:scale-x-0 after:bg-foreground hover:text-foreground hover:after:scale-x-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CV */}
            <div className="hidden md:block">
              <Link
                href="/cv/Ogwang_Gift_Gideon_CV.pdf"
                download
                data-cursor="cta"
                className="label inline-flex items-center border border-(--color-green) px-(--space-4) py-(--space-2) text-(--color-green) transition-all duration-(--duration-base) hover:bg-(--color-green-light) hover:tracking-widest"
              >
                CV
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-cursor="cta"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="label relative z-[9999] inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-(--color-border) md:hidden"
            >
              {/* Animated hamburger bars */}
              <span
                className="block h-px w-5 bg-foreground transition-all duration-300 origin-center"
                style={{
                  transform: mobileOpen
                    ? "translateY(6px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block h-px w-5 bg-foreground transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="block h-px w-5 bg-foreground transition-all duration-300 origin-center"
                style={{
                  transform: mobileOpen
                    ? "translateY(-6px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile overlay backdrop ────────────────────────────────────────── */}
      {/* Click outside = close */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        aria-hidden="true"
        className="pointer-events-auto fixed inset-0 z-[998] md:hidden"
        style={{
          backgroundColor: "rgba(26, 26, 26, 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      />

      {/* ── Mobile menu panel ─────────────────────────────────────────────── */}
      {/* Slides up from bottom — stops at ~60% of screen height */}
      <div
        ref={menuRef}
        className="fixed inset-x-0 bottom-0 z-[999] md:hidden"
        style={{
          backgroundColor: "var(--color-bg)",
          borderTop: "1px solid var(--color-border)",
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(100%)",
        }}
      >
        {/* Top handle — visual cue */}
        <div className="flex justify-center pt-[var(--space-3)]">
          <div
            style={{
              width: 40,
              height: 3,
              backgroundColor: "var(--color-border)",
            }}
          />
        </div>

        <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col px-[var(--space-5)] pb-[var(--space-7)] pt-[var(--space-5)]">
          {/* Section label */}
          <span
            className="label mb-[var(--space-4)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Navigation
          </span>

          {/* Nav links */}
          <div className="flex flex-col">
            {navLinks.map((link, i) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  ref={(el) => {
                    if (el) menuItemRefs.current[i] = el;
                  }}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between border-b border-[var(--color-border)] py-[var(--space-4)]"
                  style={{
                    color: isActive
                      ? "var(--color-green)"
                      : "var(--color-text-primary)",
                  }}
                >
                  {/* Link number + label */}
                  <div className="flex items-baseline gap-[var(--space-3)]">
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: "var(--color-amber)" }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="font-display font-light leading-[1.1] tracking-[-0.02em] text-[32px]"
                    >
                      {link.label}
                    </span>
                  </div>

                  {/* Arrow — moves right on hover */}
                  <span
                    className="label transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CV button */}
          <Link
            href="/cv/Ogwang_Gift_Gideon_CV.pdf"
            download
            data-cursor="cta"
            ref={(el) => {
              if (el) menuItemRefs.current[navLinks.length] = el;
            }}
            onClick={() => setMobileOpen(false)}
            className="label mt-(--space-5) inline-flex w-fit items-center gap-(--space-2) border border-(--color-green) px-(--space-4) py-(--space-3) text-(--color-green)"
          >
            Download CV
            <span>↓</span>
          </Link>
        </div>
      </div>
    </>
  );
}