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
    <div className="flex h-8 w-fit max-w-full items-center gap-3 border-b border-ink/25 pr-1 font-mono text-[12px] whitespace-nowrap text-ink">
      <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true" focusable="false">
        <path d="M6 1 11 6 6 11 1 6Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="sr-only">{PHRASES[0]}</span>
      <span className="min-w-0 overflow-hidden" aria-hidden="true">
        {text}
        {reduced ? null : <span className="hero-caret" />}
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
          <div className="hero-gate-left relative flex w-full flex-col justify-end bg-paper px-5 pt-8 pb-8 text-ink lg:h-full lg:justify-center lg:px-10 lg:py-12">
            <div className="hero-copy-inner w-full max-w-none">
              <Eyebrow />
              <h1 className="hero-title mt-5 max-w-full font-display text-[clamp(1.65rem,7vw,2.4rem)] leading-none font-normal tracking-[0.02em] lg:whitespace-nowrap lg:text-[clamp(1.35rem,3.1vw,3.4rem)]">
                <span className="text-ink">Two5 — Play a sharper game</span>
              </h1>
              <p className="mt-4 font-display text-2xl leading-none font-normal tracking-[0.03em] text-ink sm:mt-5 sm:text-4xl">
                Think fast. <span className="text-volt">Know more.</span>{" "}
                <span className="text-ember">Compete.</span>
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-ink/70 sm:mt-5 sm:text-lg sm:leading-8">
                Numbers, logic, and computer science, turned into short rounds
                you can play. Beat a score. Send one to a friend. Come back
                for the next one.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
                <Link
                  href="#waitlist"
                  onClick={() => track("hero_cta_click", { source: "hero-primary" })}
                  className="group relative flex h-11 items-center gap-2 overflow-hidden rounded-full bg-signal px-5 text-base font-medium text-ink sm:h-12 sm:px-6"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative transition-colors group-hover:text-paper">
                    Join the waitlist
                  </span>
                  <svg
                    viewBox="0 0 14 14"
                    className="relative h-3.5 w-3.5 -translate-x-2 text-paper opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </Link>
                <Link
                  href="#challenges"
                  onClick={() => track("hero_cta_click", { source: "hero-explore" })}
                  className="group flex h-11 items-center gap-2 rounded-full border border-ink/15 bg-white px-5 text-base text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:h-12"
                >
                  <span className="inline-block h-1.5 w-1.5 origin-center scale-0 rotate-45 bg-signal transition-transform group-hover:scale-100" />
                  See the games
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-gate-right relative flex w-full flex-col justify-end bg-[#312e2b] px-5 pt-7 pb-32 text-[#f3f0e8] lg:h-full lg:justify-center lg:overflow-y-auto lg:px-8 lg:py-12">
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
