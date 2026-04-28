"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useGSAP(
    () => {
      const nav = navRef.current;

      if (!nav) {
        return;
      }

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

      gsap.set(nav, {
        autoAlpha: 0,
        y: -24,
        pointerEvents: "none",
      });
    },
    {
      scope: navRef,
      dependencies: [ready],
    },
  );

  const shellClasses = useMemo(() => {
    if (!scrolled) {
      return "bg-[var(--color-bg)]/92";
    }

    return "bg-[var(--color-bg)]/86 backdrop-blur-[8px]";
  }, [scrolled]);

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-[80]">
      <nav className={`border-b border-[var(--color-border)] ${shellClasses}`}>
        <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] items-center justify-between gap-[var(--space-4)] px-[var(--space-5)] py-[var(--space-3)]">
          <Link
            href="/"
            data-cursor="link"
            className="font-[var(--font-display-family)] text-[20px] italic tracking-[0.02em]"
          >
            gideon.dev
          </Link>

          <div className="hidden items-center gap-[var(--space-5)] md:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  onClick={() => setMobileOpen(false)}
                  className={`label border-b pb-[var(--space-1)] transition-colors duration-[var(--duration-base)] ${
                    isActive
                      ? "border-[var(--color-green)] text-[var(--color-green)]"
                      : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link
              href="/cv/gideon-ddumba-cv.pdf"
              download
              data-cursor="cta"
              className="label inline-flex items-center border border-[var(--color-green)] px-[var(--space-4)] py-[var(--space-2)] text-[var(--color-green)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-green-light)]"
            >
              CV
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-cursor="cta"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="label inline-flex items-center border border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--color-text-primary)] md:hidden"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[79] bg-[var(--color-bg)] pt-[96px] md:hidden">
          <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-[var(--space-4)] px-[var(--space-5)]">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  onClick={() => setMobileOpen(false)}
                  className={`label border-b py-[var(--space-2)] ${
                    isActive
                      ? "border-[var(--color-green)] text-[var(--color-green)]"
                      : "border-[var(--color-border)] text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/cv/gideon-ddumba-cv.pdf"
              download
              data-cursor="cta"
              onClick={() => setMobileOpen(false)}
              className="label inline-flex w-fit items-center border border-[var(--color-green)] px-[var(--space-4)] py-[var(--space-2)] text-[var(--color-green)]"
            >
              Download CV
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
