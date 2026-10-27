"use client";

type LenisLike = {
  scroll: number;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; lock?: boolean },
  ) => void;
};

export function scrollToHash(hash: string, lenis?: LenisLike | null) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id || id === "waitlist") return false;

  const target = document.getElementById(id);
  if (!target) return false;

  const offset = -24;
  const current = lenis?.scroll ?? window.scrollY;
  const top = Math.max(0, target.getBoundingClientRect().top + current + offset);

  if (lenis) {
    lenis.scrollTo(top, {
      duration: 1.05,
      lock: true,
    });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, "", `#${id}`);
  }

  return true;
}
