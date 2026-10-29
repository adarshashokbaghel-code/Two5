"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ArrowRight, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const chapters = [
  { ...siteConfig.nav[0], hint: "How a round works", accent: "#22c55e" },
  { ...siteConfig.nav[1], hint: "The first four", accent: "#f0c020" },
  { ...siteConfig.nav[2], hint: "Access and launch", accent: "#e9f078" },
  { ...siteConfig.nav[3], hint: "Research notes", accent: "#1060f8" },
  { ...siteConfig.nav[4], hint: "Quick answers", accent: "#d82010" },
] as const;

const sectionIds = chapters
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.slice(1));

function siteHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;
  // Waitlist opens a modal on every page — keep it as a local hash.
  if (href === "#waitlist") return href;
  return pathname === "/" ? href : `/${href}`;
}

const bearings = [-36, 18, 90, 168, 230];

export function DockNav() {
  const [open, setOpen] = useState(false);
  const [travel, setTravel] = useState(0);
  const pathname = usePathname();
  const menuId = useId();
  const pageChapters = chapters
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.href.startsWith("#"));
  const routeIndex = chapters.findIndex(
    (item) => !item.href.startsWith("#") && (pathname === item.href || pathname.startsWith(`${item.href}/`)),
  );
  const currentIndex =
    routeIndex >= 0
      ? routeIndex
      : (pageChapters[Math.min(pageChapters.length - 1, Math.round(travel))]?.index ?? 0);
  const heading = routeIndex >= 0 ? bearings[routeIndex] : headingFromTravel(travel);

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
    <header className="dock-enter pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:px-4">
      <div
        className={cn(
          "pointer-events-auto relative w-fit max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl bg-ink text-paper shadow-[0_16px_40px_-12px_rgba(0,0,0,0.75)] ring-1 ring-white/10 transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "w-full max-w-[20rem] bg-[#0c0c0b]",
        )}
      >
        {/* Smooth height expand — no circle morph */}
        <div
          id={menuId}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-label={open ? "Jump around" : undefined}
          aria-hidden={!open}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "px-3 pt-3 pb-1 transition-opacity duration-200",
                open ? "opacity-100 delay-75" : "opacity-0",
              )}
            >
              <div className="mb-2 flex items-center justify-between gap-3 px-1">
                <Image
                  src="/brand/logo-mark.png"
                  alt="Two5"
                  width={1600}
                  height={867}
                  className="h-8 w-auto shrink-0"
                  priority
                />
                <p className="font-sans text-[10px] tracking-[0.08em] text-paper/45 uppercase">
                  Menu
                </p>
              </div>

              <nav aria-label="Chapters">
                <ul className="grid gap-0.5">
                  {chapters.map((item, index) => {
                    const isCurrent = currentIndex === index;

                    return (
                      <li key={item.href}>
                        <Link
                          href={siteHref(item.href, pathname)}
                          tabIndex={open ? undefined : -1}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "group relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 transition-colors",
                            isCurrent ? "bg-white/10" : "hover:bg-white/[0.06]",
                          )}
                          aria-current={isCurrent ? "location" : undefined}
                        >
                          <span
                            className={cn(
                              "w-6 shrink-0 font-display text-xl leading-none tracking-[0.04em]",
                              isCurrent ? "text-signal" : "text-paper/35",
                            )}
                          >
                            {item.index}
                          </span>

                          <span className="min-w-0 flex-1 text-left">
                            <span
                              className={cn(
                                "block font-display text-[1.45rem] leading-none tracking-[0.03em]",
                                isCurrent ? "text-paper" : "text-paper/65",
                              )}
                            >
                              {item.label}
                            </span>
                            <span
                              className={cn(
                                "mt-0.5 block font-sans text-[10px]",
                                isCurrent ? "text-paper/50" : "text-paper/30",
                              )}
                            >
                              {item.hint}
                            </span>
                          </span>

                          <ArrowRight
                            size={14}
                            className={cn(
                              "shrink-0 transition-opacity",
                              isCurrent ? "text-signal opacity-70" : "opacity-0",
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mx-1 mt-2 h-px bg-white/10" />
            </div>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className={cn(
            "relative flex items-center gap-2 px-2 py-2",
            open && "w-full",
          )}
        >
          <Link
            href={siteHref("#waitlist", pathname)}
            data-waitlist-source="dock"
            onClick={() => setOpen(false)}
            className={cn(
              "group inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-4 font-display text-[1.05rem] leading-none tracking-[0.04em] transition-[transform,background-color,color] duration-700 hover:brightness-110 active:translate-y-px sm:h-11 sm:px-5 sm:text-[1.15rem]",
              open && "flex-1",
            )}
            style={{
              backgroundColor: "var(--two5-wash, #f0c020)",
              color: "var(--two5-wash-ink, #050505)",
            }}
          >
            Join the waitlist
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <button
            type="button"
            className={cn(
              "relative grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/15 sm:size-11",
              open && "bg-white/15",
            )}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X size={17} strokeWidth={2.25} />
            ) : (
              <CompassMark heading={heading} />
            )}
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
      className="compass-spin h-[1.15rem] w-[1.15rem]"
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
