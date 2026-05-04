"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navbar } from "@/components/nav/Navbar";
import { Preloader } from "@/components/preloader/Preloader";
import { PreloaderPhase } from "@/lib/animation/types";
import {
  destroyLenis,
  initLenis,
  startLenis,
  stopLenis,
  syncLenisWithGsapTicker,
} from "@/lib/lenis";

import { PageTransition } from "./PageTransition";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [preloaderPhase,    setPreloaderPhase]    = useState<PreloaderPhase>("IDLE");
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Lenis init — runs once on mount
  useEffect(() => {
    initLenis();
    syncLenisWithGsapTicker();
    stopLenis(); // held until preloader finishes

    return () => {
      document.body.style.overflow = "";
      destroyLenis();
    };
  }, []);

  // Gate scroll behind preloader
  useEffect(() => {
    if (preloaderComplete) {
      document.body.style.overflow = "";
      startLenis();
    } else {
      document.body.style.overflow = "hidden";
      stopLenis();
    }
  }, [preloaderComplete]);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderPhase("COMPLETE");
    setPreloaderComplete(true);
  }, []);

  return (
    <>
      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          fixed top-[var(--space-3)] left-[var(--space-3)]
          z-[9999]
          label
          bg-[var(--color-amber)]
          text-[var(--color-text-primary)]
          px-[var(--space-3)] py-[var(--space-2)]
          focus:outline-none
          focus:ring-2 focus:ring-[var(--color-amber-dark)]
        "
      >
        Skip to content
      </a>

      {/* Preloader — sits above everything */}
      <Preloader
        phase={preloaderPhase}
        onPhaseChange={setPreloaderPhase}
        onComplete={handlePreloaderComplete}
      />

      {/* Global chrome — nav + cursor, outside <main> intentionally */}
      <Navbar ready={preloaderComplete} />
      <CustomCursor ready={preloaderComplete} />

      {/* Page content */}
      <main id="main-content" className="w-full">
        <PageTransition ready={preloaderComplete}>
          {children}
        </PageTransition>
      </main>
    </>
  );
}