"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { HeroReel } from "@/components/landing/hero-reel";
import { HeroWaitlist } from "@/components/landing/hero-waitlist";
import { chamfer, typeFrame } from "@/components/ui/ticket-stub-footer";
import { track } from "@/lib/analytics";

const PHRASES = [
  "Your brain’s gym",
  "Think fast. Know more.",
  "Early access is opening",
];

const CTA_CUT = chamfer(0, 0, 12, 0);

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
      className="relative isolate h-[220vh] bg-paper lg:h-[280vh] motion-reduce:h-auto"
    >
      <div className="relative sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:overflow-visible">
        <HeroReel sectionRef={sectionRef} />

        <div className="reel-hint pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <div className="flex items-center gap-2 border border-ink/10 bg-ink px-3 py-1.5 text-paper shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
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

        <div className="hero-stage absolute inset-x-0 bottom-0 z-10 flex max-h-[84svh] flex-col overflow-y-auto bg-paper lg:inset-0 lg:max-h-none lg:flex-row lg:overflow-visible lg:bg-transparent">
          <div className="hero-gate-left relative flex w-full flex-col justify-end bg-paper px-5 pt-8 pb-8 text-ink lg:h-full lg:justify-center lg:px-10 lg:pt-0 lg:pb-28">
            <div className="hero-copy-inner w-full max-w-none">
              <Eyebrow />
              <h1 className="hero-title mt-5 whitespace-nowrap text-[clamp(1.05rem,2.55vw,2.85rem)] leading-none font-semibold tracking-tight">
                <span className="text-ink">Two5 — Your brain&apos;s gym</span>
              </h1>
              <p className="mt-4 text-xl leading-tight font-semibold tracking-tight text-ink sm:mt-5 sm:text-3xl">
                Think fast. <span className="text-volt">Know more.</span>{" "}
                <span className="text-ember">Compete.</span>
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-ink/70 sm:mt-5 sm:text-lg sm:leading-8">
                From Mathematics and Logical Reasoning to Computer Science and
                DSA, Two5 turns the subjects you enjoy into challenges worth
                solving — and scores worth beating.
              </p>
              <p className="mt-3 max-w-lg text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">
                Play a quick challenge. Test what you know. Challenge your
                friends. Come back for the next round.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
                <Link
                  href="#waitlist"
                  onClick={() => track("hero_cta_click", { source: "hero-primary" })}
                  className="group relative flex h-11 items-center gap-2 overflow-hidden bg-signal px-5 text-base font-medium text-ink sm:h-12 sm:px-6"
                  style={{ clipPath: CTA_CUT }}
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
                  className="group flex h-11 items-center gap-2 border border-ink/20 px-5 text-base text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:h-12"
                >
                  <span className="inline-block h-1.5 w-1.5 origin-center scale-0 rotate-45 bg-signal transition-transform group-hover:scale-100" />
                  Explore the experience
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-gate-right relative flex w-full flex-col justify-end overflow-y-auto bg-ink px-5 pt-7 pb-32 lg:h-full lg:justify-center lg:px-8 lg:pt-10 lg:pb-28">
            <div className="hero-form-inner w-full max-w-md">
              <HeroWaitlist />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
