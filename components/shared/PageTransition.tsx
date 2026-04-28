"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

import { getLenis } from "@/lib/lenis";

interface PageTransitionProps {
  children: ReactNode;
  ready: boolean;
}

function getTransitionColor(pathname: string): string {
  if (pathname.startsWith("/projects") || pathname.startsWith("/contact")) {
    return "var(--color-green)";
  }

  return "var(--color-amber)";
}

export function PageTransition({ children, ready }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname, ready]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="relative"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
        transition={{
          duration: reduceMotion ? 0.2 : 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {ready && !reduceMotion ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90]"
            style={{ backgroundColor: getTransitionColor(pathname) }}
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.87, 0, 0.13, 1] }}
          />
        ) : null}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
