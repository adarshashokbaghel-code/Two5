"use client";

type LenisLike = {
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

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration: 1.05,
      lock: true,
    });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, "", `#${id}`);
  }

  return true;
}
