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
  const [preloaderPhase, setPreloaderPhase] = useState<PreloaderPhase>("IDLE");
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useEffect(() => {
    initLenis();
    syncLenisWithGsapTicker();
    stopLenis();

    return () => {
      document.body.style.overflow = "";
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    if (preloaderComplete) {
      document.body.style.overflow = "";
      startLenis();
      return;
    }

    document.body.style.overflow = "hidden";
    stopLenis();
  }, [preloaderComplete]);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderPhase("COMPLETE");
    setPreloaderComplete(true);
  }, []);

  return (
    <>
      <Preloader
        phase={preloaderPhase}
        onPhaseChange={setPreloaderPhase}
        onComplete={handlePreloaderComplete}
      />
      <main id="main-content" className="w-full">
        <Navbar ready={preloaderComplete} />
        <CustomCursor ready={preloaderComplete} />
        <PageTransition ready={preloaderComplete}>{children}</PageTransition>
      </main>
    </>
  );
}
