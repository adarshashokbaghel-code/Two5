"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ArrowBigRight, ArrowRight } from "lucide-react";

const chapters = siteConfig.nav;
const sectionIds = chapters.map((item) => item.href.split("#").pop() ?? item.href);

function siteHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}
const bearings = [-36, 18, 128, 214];

export function DockNav() {
  const [open, setOpen] = useState(false);
  const [travel, setTravel] = useState(0);
  const pathname = usePathname();
  const menuId = useId();
  const onResearch = pathname.startsWith("/research");
  const pageChapters = chapters
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.href.startsWith("#"));
  const currentIndex = onResearch
    ? chapters.findIndex((item) => item.href === "/research")
    : (pageChapters[Math.min(pageChapters.length - 1, Math.round(travel))]?.index ?? 0);
  const heading = onResearch ? bearings[bearings.length - 1] : headingFromTravel(travel);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    let frame = 0;

    const readTravel = () => {
      const mark = window.scrollY + window.innerHeight * 0.38;
      const tops = nodes.map((node) => node.offsetTop);
      let next = 0;

      if (mark <= tops[0]) {
        next = 0;
      } else if (mark >= tops[tops.length - 1]) {
        next = tops.length - 1;
      } else {
        for (let index = 0; index < tops.length - 1; index += 1) {
          if (mark >= tops[index] && mark < tops[index + 1]) {
            const span = Math.max(1, tops[index + 1] - tops[index]);
            next = index + (mark - tops[index]) / span;
            break;
          }
        }
      }

      setTravel(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(readTravel);
    };

    readTravel();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="dock-enter pointer-events-none fixed inset-x-0 xl:inset-x-300 xl:right-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div
        className={cn(
          "pointer-events-auto w-fit max-w-[calc(100vw-2rem)] overflow-hidden border border-white/10 bg-ink/80 text-paper shadow-[0_12px_32px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl",
          open ? "rounded-2xl" : "rounded-full",
        )}
      >
        {open ? (
          <div
            id={menuId}
            className="border-b border-white/10 px-5 py-2"
            role="dialog"
            aria-modal="true"
            aria-label="Chapters"
          >
            <nav aria-label="Chapters">
              <ol>
                {chapters.map((item, index) => {
                  const isCurrent = currentIndex === index;

                  return (
                    <li key={item.href}>
                      <Link
                        href={siteHref(item.href, pathname)}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-baseline justify-center gap-2.5 rounded-lg px-3 py-2 text-[0.95rem] tracking-tight",
                          isCurrent ? "bg-white/10" : "hover:bg-white/6",
                        )}
                        aria-current={isCurrent ? "location" : undefined}
                      >
                        <span
                          className={cn(
                            "font-mono text-[13px]",
                            isCurrent ? "text-signal" : "text-paper/40",
                          )}
                        >
                          {item.index}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        ) : null}

        <nav aria-label="Primary" className="flex items-center gap-2 px-5 py-3">
          <Link
            href={siteHref("#waitlist", pathname)}
            onClick={() => {
              setOpen(false);
              track("waitlist_cta_click", { source: "dock" });
            }}
            className="flex h-10 items-center text-display justify-center rounded-full bg-green-500 px-4 text-md font-medium tracking-[-0.01em] text-ink transition-transform active:translate-y-px sm:h-11 sm:px-5"
          >
            <span className="sm:hidden">Join Now</span> 
            <span className="hidden sm:inline font-display">Join the waitlist</span>
          </Link>

          <button
            type="button"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/8 text-paper sm:size-11"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close chapters" : "Open chapters. Compass follows the page."}
            onClick={() => setOpen((value) => !value)}
          >
            <CompassMark heading={heading} />
          </button>
        </nav>
      </div>
    </header>
  );
}

function headingFromTravel(travel: number) {
  const index = Math.min(bearings.length - 1, Math.max(0, travel));
  const start = Math.floor(index);
  const end = Math.min(bearings.length - 1, start + 1);
  const mix = index - start;
  return bearings[start] + (bearings[end] - bearings[start]) * mix;
}

function CompassMark({ heading }: { heading: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="compass-spin h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]"
      style={{ transform: `rotate(${heading}deg)` }}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M16 3.2v2.2M16 26.6v2.2M3.2 16h2.2M26.6 16h2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M16 5.2 18.2 17.4 16 15.2 13.8 17.4Z" fill="#f0c020" />
      <circle cx="16" cy="16" r="1.45" fill="currentColor" />
    </svg>
  );
}
