"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { HeroReel } from "@/components/landing/hero-reel";
import { HeroWaitlist } from "@/components/landing/hero-waitlist";
import { typeFrame } from "@/components/ui/ticket-stub-footer";
import { track } from "@/lib/analytics";

const PHRASES = [
  "A game for sharp minds",
  "Numbers, logic, friends",
  "Early access is open",
];

function Eyebrow() {
  const [ms, setMs] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    if (mq.matches) return () => mq.removeEventListener("change", sync);
    const t0 = performance.now();
    const id = window.setInterval(() => setMs(performance.now() - t0), 40);
    return () => {
      window.clearInterval(id);
      mq.removeEventListener("change", sync);
    };
  }, []);

  const text = reduced ? (PHRASES[0] ?? "") : typeFrame(PHRASES, ms).text;

  return (
    <div className="inline-flex h-8 w-fit max-w-full items-center gap-2 text-sm font-semibold whitespace-nowrap text-ink">
      <span className="size-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
      <span className="sr-only">{PHRASES[0]}</span>
      <span className="min-w-0 overflow-hidden" aria-hidden="true">
        {text}
        {reduced ? null : <span className="hero-caret !bg-ink" />}
      </span>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    track("landing_page_view");
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative isolate h-[860vh] bg-paper lg:h-[900vh] motion-reduce:h-auto"
    >
      <div className="relative sticky top-0 h-[100svh] overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
        <HeroReel sectionRef={sectionRef} />

        <div className="reel-hint pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-signal px-3 py-1.5 text-ink shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <span className="scroll-chip-mark" aria-hidden="true">
              <svg viewBox="0 0 28 16" className="h-3.5 w-6">
                <path
                  d="M3 13 A11 11 0 0 1 25 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  className="scroll-chip-needle"
                  d="M14 13 V5"
                  fill="none"
                  stroke="#f0c020"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="14" cy="13" r="1.4" fill="#f0c020" />
              </svg>
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
              Scroll
            </span>
          </div>
        </div>

        <div className="hero-stage absolute inset-x-0 bottom-0 z-10 h-[86svh] overflow-hidden motion-reduce:relative motion-reduce:inset-auto motion-reduce:h-auto motion-reduce:overflow-visible lg:bg-transparent">
          <div className="hero-sheet-track flex min-h-full flex-col lg:contents">
          <div className="hero-gate-left relative flex w-full flex-col justify-center bg-signal px-5 py-8 text-ink lg:h-full lg:px-10 lg:py-12">
            <div className="hero-copy-inner w-full max-w-none">
              <Eyebrow />
              <h1 className="hero-title mt-4 max-w-[16ch] font-sans text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.08] font-bold tracking-tight text-ink sm:mt-5 lg:mt-5 lg:max-w-none lg:text-[clamp(1.85rem,2.5vw,2.7rem)] lg:whitespace-nowrap">
                Two5 — Play a <span className="underline decoration-ink decoration-[3px] underline-offset-[5px]">sharper</span> game
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-semibold text-ink/80">
                <span>Think fast</span>
                <span className="text-ink/25" aria-hidden="true">·</span>
                Know more
                <span className="text-ink/25" aria-hidden="true">·</span>
                <span>Compete</span>
              </p>
              <p className="mt-4 max-w-md text-base leading-7 text-ink/70 sm:mt-5">
                Numbers, logic, and computer science, turned into short rounds
                you can play. Beat a score. Send one to a friend. Come back
                for the next one.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="#waitlist"
                  onClick={() => track("hero_cta_click", { source: "hero-primary" })}
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-ink px-5 text-[15px] font-semibold text-paper sm:w-auto"
                >
                  Join the waitlist
                </Link>
                <Link
                  href="#challenges"
                  onClick={() => track("hero_cta_click", { source: "hero-explore" })}
                  className="flex h-11 w-full items-center justify-center rounded-lg border border-ink/20 bg-white px-5 text-[15px] font-semibold text-ink sm:w-auto"
                >
                  See the games
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-gate-right relative flex w-full flex-col justify-center bg-white px-5 py-6 text-ink lg:h-full lg:overflow-y-auto lg:px-8 lg:py-12">
            <div className="hero-form-inner w-full max-w-md">
              <HeroWaitlist />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
