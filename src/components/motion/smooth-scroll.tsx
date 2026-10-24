"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  if (!enabled) return children;

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.072, wheelMultiplier: 0.86 }}>
      {children}
    </ReactLenis>
  );
}
