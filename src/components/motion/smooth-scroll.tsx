"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { scrollToHash } from "@/lib/scroll-to";

import "lenis/dist/lenis.css";

function useHashNavigation(lenis: ReturnType<typeof useLenis> | null) {
  const pathname = usePathname();

  useEffect(() => {
    const go = (hash?: string) => {
      const next = hash ?? (pathname ? window.location.hash : "");
      if (!next || next === "#waitlist") return;
      window.requestAnimationFrame(() => {
        scrollToHash(next, lenis);
      });
    };

    // After client navigations like /research → /#how
    const timer = window.setTimeout(() => go(), 40);

    const onHash = () => go();
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Same-page section links: #how, /#how
      let hash = "";
      if (href.startsWith("#")) {
        hash = href;
      } else {
        try {
          const url = new URL(href, window.location.href);
          if (url.pathname !== window.location.pathname) return;
          if (!url.hash || url.hash === "#waitlist") return;
          hash = url.hash;
        } catch {
          return;
        }
      }

      if (!hash || hash === "#waitlist") return;

      const id = hash.slice(1);
      if (!document.getElementById(id)) return;

      event.preventDefault();
      go(hash);
    };

    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, [lenis, pathname]);
}

function HashScroll() {
  const lenis = useLenis();
  useHashNavigation(lenis);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  if (!enabled) {
    return (
      <>
        <HashScrollFallback />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
      }}
    >
      <HashScroll />
      {children}
    </ReactLenis>
  );
}

function HashScrollFallback() {
  useHashNavigation(null);
  return null;
}
