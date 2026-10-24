"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const chapters = siteConfig.nav;
const sectionIds = chapters.map((item) => item.href.replace("#", ""));
const bearings = [-36, 18, 128];

export function DockNav() {
  const [open, setOpen] = useState(false);
  const [travel, setTravel] = useState(0);
  const menuId = useId();
  const currentIndex = Math.min(chapters.length - 1, Math.round(travel));
  const current = chapters[currentIndex] ?? chapters[0];
  const heading = headingFromTravel(travel);

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
    <header className="dock-enter pointer-events-none fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-auto relative flex items-stretch border-t border-paper/25 bg-ink">
        {open ? (
          <div
            id={menuId}
            className="absolute right-16 bottom-full left-0 overflow-hidden border border-b-0 border-paper/25 bg-ink sm:right-[4.25rem] sm:left-auto sm:w-[22rem]"
            role="dialog"
            aria-modal="true"
            aria-label="Chapters"
          >
            <div className="flex items-start justify-between gap-4 px-4 py-3.5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-mist uppercase">
                  Chapters
                </p>
                <p className="mt-0.5 text-sm text-paper/60">Follow the point. Jump a section.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 border border-paper/25 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-paper/70 uppercase"
              >
                Close
              </button>
            </div>
            <nav aria-label="Chapters">
              <ol>
                {chapters.map((item, index) => {
                  const isCurrent = currentIndex === index;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-baseline justify-between gap-4 border-t border-line px-4 py-3",
                          isCurrent ? "text-signal" : "text-paper/80",
                        )}
                        aria-current={isCurrent ? "location" : undefined}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[11px] text-mist">{item.index}</span>
                          <span className="text-[15px] tracking-tight">{item.label}</span>
                        </span>
                        <span className="font-mono text-[10px] text-mist">
                          {Math.round(bearings[index] + 180)}°
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        ) : null}

        <nav aria-label="Primary" className="min-w-0 flex-1">
          <div className="flex h-16 items-center gap-3 px-4 sm:h-[4.25rem] sm:px-5">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
                {String(Math.round(heading + 180)).padStart(3, "0")}° · {current.index}
              </p>
              <p className="truncate text-[15px] tracking-tight text-paper">{current.label}</p>
            </div>

            <ol className="hidden items-center gap-1.5 sm:flex" aria-label="Chapter marks">
              {chapters.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block h-1.5 w-1.5 rounded-full",
                      index === currentIndex ? "bg-signal" : "bg-paper/20",
                    )}
                    aria-label={`${item.index} ${item.label}`}
                    aria-current={index === currentIndex ? "location" : undefined}
                  />
                </li>
              ))}
            </ol>

            <Link
              href="#waitlist"
              onClick={() => {
                setOpen(false);
                track("waitlist_cta_click", { source: "dock" });
              }}
              className="flex h-9 shrink-0 items-center bg-signal px-3.5 text-[13px] font-medium text-ink"
            >
              Join
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className="relative h-16 w-16 shrink-0 overflow-hidden border-l border-paper/25 bg-ink sm:h-[4.25rem] sm:w-[4.25rem]"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close chapters" : "Open chapters. Compass follows the page."}
          onClick={() => setOpen((value) => !value)}
        >
          <CompassRose heading={heading} currentIndex={currentIndex} open={open} />
        </button>
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

function CompassRose({
  heading,
  currentIndex,
  open,
}: {
  heading: number;
  currentIndex: number;
  open: boolean;
}) {
  const ticks = Array.from({ length: 24 }, (_, index) => index * 15);

  return (
    <span className="absolute inset-0">
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(245, 242, 234, 0.16)" strokeWidth="1.2" />
        {ticks.map((angle) => {
          const long = angle % 90 === 0;
          const outer = rose(angle, 52);
          const inner = rose(angle, long ? 43 : 47);

          return (
            <line
              key={angle}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke="rgba(245, 242, 234, 0.28)"
              strokeWidth={long ? 1.4 : 0.8}
            />
          );
        })}
        {chapters.map((item, index) => {
          const point = rose(bearings[index] + 180, 38);

          return (
            <text
              key={item.href}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={index === currentIndex ? "#f0c020" : "rgba(245, 242, 234, 0.42)"}
              fontSize="9.5"
              fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            >
              {item.index}
            </text>
          );
        })}
      </svg>

      <span
        className="compass-spin absolute inset-[7%] origin-center"
        style={{ transform: `rotate(${heading}deg)` }}
      >
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <g
            className="compass-leg"
            style={{ transform: `rotate(${open ? -30 : -15}deg)` }}
          >
            <path d="M29.2 13 L34.8 13 L33.1 41 L30.9 41 Z" fill="#d8d4cb" />
            <path d="M29.2 13 L31.4 13 L31.1 41 L30.9 41 Z" fill="#f5f2ea" />
            <rect x="29.6" y="40.2" width="4.8" height="7.2" rx="0.6" fill="#c8a018" />
            <rect x="30.2" y="41" width="3.6" height="5.4" rx="0.35" fill="#f0c020" />
            <path d="M30.4 47.2 L33.6 47.2 L32 53.2 Z" fill="#f0c020" />
          </g>
          <g
            className="compass-leg"
            style={{ transform: `rotate(${open ? 30 : 15}deg)` }}
          >
            <path d="M29.2 13 L34.8 13 L33.1 41 L30.9 41 Z" fill="#d8d4cb" />
            <path d="M29.2 13 L31.4 13 L31.1 41 L30.9 41 Z" fill="#f5f2ea" />
            <path d="M30.4 40.6 L33.6 40.6 L32 54 Z" fill="#f5f2ea" />
            <path d="M31.4 40.6 L32.6 40.6 L32 52.4 Z" fill="#bdb8ae" />
          </g>
          <rect x="30.2" y="3.2" width="3.6" height="8.2" rx="1.1" fill="#f0c020" />
          <circle cx="32" cy="12" r="5.1" fill="#f0c020" stroke="#f5f2ea" strokeWidth="1.2" />
          <circle cx="32" cy="12" r="2.6" fill="#1a1a18" />
          <circle cx="32" cy="12" r="1.1" fill="#f5f2ea" />
        </svg>
      </span>
    </span>
  );
}

function rose(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 60 + radius * Math.cos(rad),
    y: 60 + radius * Math.sin(rad),
  };
}
