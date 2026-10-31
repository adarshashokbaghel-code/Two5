
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, Timer, Trophy } from "lucide-react";

import { HeroFloaters } from "@/components/landing/hero-floaters";
import { HeroPhone } from "@/components/landing/hero-phone";

const HERO_LINES = [
  { text: "a run.", color: "#f0c020", ink: "#050505", paper: "#9a7209" },
  { text: "a challenge.", color: "#22C55E", ink: "#050505", paper: "#22C55E" },
  { text: "a match.", color: "#1060f8", ink: "#F4F1E8", paper: "#1060f8" },
  { text: "a battlefield.", color: "#d82010", ink: "#F4F1E8", paper: "#d82010" },
  { text: "a sprint.", color: "#5ec8ff", ink: "#050505", paper: "#1060f8" },
] as const;

const HERO_LINE_MS = 2800;
const HERO_LINE_SLIDE_MS = 700;

export function Hero({ announcement }: { announcement?: string }) {
  const [line, setLine] = useState(0);
  const [slide, setSlide] = useState(true);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const active = HERO_LINES[line % HERO_LINES.length];
  const track = [...HERO_LINES, HERO_LINES[0]];
  const phoneIndex = line >= HERO_LINES.length - 1 ? HERO_LINES.length - 1 : line;

  useEffect(() => {
    const measure = () => {
      setWidths(measureRefs.current.map((node) => node?.getBoundingClientRect().width ?? 0));
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--two5-wash", active.color);
    root.style.setProperty("--two5-wash-ink", active.ink);
    root.style.setProperty("--two5-wash-paper", active.paper);
  }, [active]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      setLine((current) => (reduced ? (current + 1) % HERO_LINES.length : current + 1));
    }, HERO_LINE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (line !== HERO_LINES.length) return;
    const timeout = window.setTimeout(() => {
      setSlide(false);
      setLine(0);
    }, HERO_LINE_SLIDE_MS);
    return () => window.clearTimeout(timeout);
  }, [line]);

  useEffect(() => {
    if (slide) return;
    const frame = window.requestAnimationFrame(() => setSlide(true));
    return () => window.cancelAnimationFrame(frame);
  }, [slide]);

  return (
    <section className="relative bg-black lg:h-[190vh] motion-reduce:lg:h-auto">
      {announcement ? (
        <div
          role="region"
          aria-label="Launch announcement"
          className="fixed inset-x-0 top-0 z-40 border-b border-white/25 bg-[#050505]/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md"
        >
          <p className="px-3 py-2 text-center text-[clamp(10px,2.75vw,13px)] leading-snug whitespace-nowrap text-white/80 sm:px-5 sm:py-2.5">
            {announcement}{" "}
            <button
              type="button"
              data-waitlist-trigger
              data-waitlist-source="announcement"
              className="font-semibold underline decoration-current underline-offset-[3px] transition-colors duration-700"
              style={{ color: "var(--two5-wash, #f0c020)" }}
            >
              Join waitlist
            </button>
          </p>
        </div>
      ) : null}

      <div className="sticky top-0 isolate flex h-[100svh] flex-col overflow-hidden bg-black text-[#F4F1E8]">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div
          className="absolute left-1/2 top-[-18%] h-[46rem] w-[min(72rem,140vw)] -translate-x-1/2 rounded-full blur-[150px] opacity-[0.28] transition-colors duration-700 ease-out"
          style={{ backgroundColor: active.color }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_58%,#000_84%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      <HeroFloaters />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-5 pt-[calc(4.25rem+env(safe-area-inset-top,0px))] sm:px-8 sm:pt-[calc(7.5rem+env(safe-area-inset-top,0px))]">
        <div className="grid w-full min-w-0 shrink-0 grid-cols-[minmax(0,1fr)] justify-items-center">
          <p className="mb-2 font-display text-[0.72rem] leading-none tracking-[0.18em] text-white/55 sm:mb-5 sm:text-[clamp(1.05rem,2vw,0.85rem)] sm:tracking-[0.14em] sm:text-white/70">
            Train. Track. Outplay.
          </p>

          <h1 className="section-heading relative w-full min-w-0 max-w-full justify-self-center text-center whitespace-normal max-sm:text-[clamp(1.65rem,7.4vw,1.85rem)] max-sm:leading-[1.05] sm:w-max sm:max-w-none sm:min-w-max sm:whitespace-nowrap">
            TWO5 — Give your brain{" "}
            <br className="sm:hidden" />
            <span className="sr-only">{active.text}</span>
            <span className="pointer-events-none absolute h-0 overflow-hidden whitespace-nowrap" aria-hidden="true">
              {HERO_LINES.map((item, itemIndex) => (
                <span
                  key={item.text}
                  ref={(node) => {
                    measureRefs.current[itemIndex] = node;
                  }}
                  className="inline-block"
                >
                  {item.text}
                </span>
              ))}
            </span>
            <span
              aria-hidden="true"
              className="relative inline-block h-[1.05em] overflow-hidden align-bottom text-center whitespace-nowrap"
              style={{
                width: widths[line % HERO_LINES.length] || undefined,
                transition: slide ? `width ${HERO_LINE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
              }}
            >
              {widths[line % HERO_LINES.length] ? null : (
                <span className="invisible block">{active.text}</span>
              )}
              <span
                className="absolute top-0 left-1/2 flex flex-col"
                style={{
                  transform: `translate(-50%, calc(${line} * -1.05em))`,
                  transition: slide ? `transform ${HERO_LINE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
                }}
              >
                {track.map((item, itemIndex) => (
                  <span
                    key={`${item.text}-${itemIndex}`}
                    className="block h-[1.05em] text-center leading-none whitespace-nowrap"
                    style={{ color: item.color }}
                  >
                    {item.text}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-[19rem] text-balance text-[0.8rem] leading-snug text-white/45 sm:mt-4 sm:max-w-none sm:text-[clamp(0.95rem,2.05vw,1.125rem)] sm:leading-relaxed sm:text-white/50">
            Short mental games across numbers, logic, memory and visual reasoning. Build your score, track your
            personal bests, and challenge yourself to go further.
          </p>

          <div className="mx-auto mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
            <button
              type="button"
              data-waitlist-trigger
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-[12px] font-semibold tracking-[-0.01em] transition-[background-color,color] duration-700 hover:brightness-110 sm:h-11 sm:gap-2 sm:px-5 sm:text-[13px]"
              style={{
                backgroundColor: active.color,
                color: active.ink,
              }}
            >
              Join the waitlist
              <ArrowRight size={13} />
            </button>

            <Link
              href="#how"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/15 px-4 text-[12px] font-medium tracking-[-0.01em] text-white/75 transition-colors hover:border-white/30 hover:text-white sm:h-11 sm:gap-2 sm:px-5 sm:text-[13px]"
            >
              See how it works
              <ArrowDownRight size={13} />
            </Link>
          </div>

        </div>

        <div className="relative mt-4 w-full flex-1 sm:mt-10">
          <div className="pointer-events-none absolute top-6 left-1/2 h-56 w-72 -translate-x-1/2">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full opacity-[0.34] blur-[90px] transition-colors duration-700 ease-out"
              style={{ backgroundColor: active.color }}
            />
          </div>

          <div className="absolute top-0 left-1/2 w-[min(18.25rem,80vw)] -translate-x-1/2 sm:w-[20.5rem]">
            <HeroPhone
              size="hero"
              className="w-full"
              screenIndex={phoneIndex}
              accent={active.color}
              animate={slide}
            />

            <div className="absolute top-[14%] left-1 z-20 flex items-center gap-2.5 rounded-full border border-white/10 bg-[#161616] py-1.5 pr-3.5 pl-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:top-[16%] sm:-left-10">
              <span
                className="grid size-8 place-items-center rounded-full transition-colors duration-700"
                style={{
                  backgroundColor: active.color,
                  color: active.ink,
                }}
              >
                <Timer size={14} />
              </span>
              <span>
                <span className="block text-[11px] text-white/55">Round 01</span>
                <span className="block font-display text-xl leading-none tracking-[0.04em]">0:42</span>
              </span>
            </div>

            <div className="absolute top-[32%] right-1 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#161616] py-1.5 pr-3.5 pl-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:top-[34%] sm:-right-8">
              <span
                className="grid size-8 place-items-center rounded-full transition-colors duration-700"
                style={{
                  backgroundColor: active.color,
                  color: active.ink,
                }}
              >
                <Trophy size={14} />
              </span>
              <span>
                <span className="block text-[10px] tracking-[0.12em] text-white/45 uppercase">Streak</span>
                <span className="block text-sm font-semibold leading-none">04</span>
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[40%] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.28)_34%,rgba(0,0,0,0.82)_70%,#000_88%)] sm:h-[42%] sm:bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.5)_68%,#000_90%,#000_100%)]" />
        </div>
      </div>
      </div>
    </section>
  );
}

export default Hero;
