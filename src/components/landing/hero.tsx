"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { HeroPhone } from "@/components/landing/hero-phone";
import { HeroReel } from "@/components/landing/hero-reel";
import { HeroWaitlist } from "@/components/landing/hero-waitlist";
import { track } from "@/lib/analytics";

const PLAY = [
  { k: "Round", v: "60s" },
  { k: "Score", v: "Beat" },
  { k: "Send", v: "Friend" },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    track("landing_page_view");
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative isolate h-[760vh] bg-paper lg:h-[900vh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
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
          <div className="hero-gate-left relative flex w-full flex-col justify-center bg-signal px-5 pt-5 pb-[4.75rem] text-ink lg:h-full lg:px-10 lg:py-10">
            <div className="hero-copy-inner mx-auto flex w-full max-w-5xl flex-col items-center gap-2 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
              <div className="w-full max-w-sm text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-paper uppercase">
                  <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
                  Early access is open
                </p>
                <p className="mt-3 font-display text-[4.25rem] leading-[0.8] tracking-[0.04em] text-ink lg:text-7xl">
                  TWO5
                </p>
                <h1 className="hero-title mt-1 font-display text-[clamp(1.7rem,7.2vw,2.35rem)] leading-none font-normal tracking-[0.02em] whitespace-nowrap lg:text-[clamp(1.85rem,2vw,2.45rem)]">
                  Your brain&apos;s <span className="text-ember">gym</span>
                </h1>
                <ul className="mx-auto mt-4 grid max-w-sm grid-cols-3 overflow-hidden rounded-lg bg-ink text-paper lg:mx-0">
                  {PLAY.map((item, index) => (
                    <li key={item.k} className="border-l border-white/10 px-2 py-2.5 first:border-l-0">
                      <p className="font-mono text-[10px] tracking-[0.14em] text-paper/45 uppercase">{item.k}</p>
                      <p className={index === 1 ? "mt-1 text-sm leading-none font-bold text-signal" : "mt-1 text-sm leading-none font-bold"}>
                        {item.v}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 hidden flex-col gap-2 lg:flex">
                  <Link
                    href="#waitlist"
                    onClick={() => track("hero_cta_click", { source: "hero-primary" })}
                    className="flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-semibold text-paper"
                  >
                    <span className="size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-paper" aria-hidden="true" />
                    Join the waitlist
                  </Link>
                  <Link
                    href="#challenges"
                    onClick={() => track("hero_cta_click", { source: "hero-explore" })}
                    className="flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[15px] font-semibold text-ink"
                  >
                    See the games
                  </Link>
                </div>
              </div>

              <div className="relative w-[15.5rem] shrink-0 translate-x-4 sm:w-[17rem] lg:w-[18.5rem] lg:translate-x-10">
                <span className="absolute -top-3 left-1 z-10 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-signal uppercase">
                  Live
                </span>
                <span className="absolute top-16 -right-1 z-10 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-ink shadow-[0_8px_18px_rgba(0,0,0,0.12)] lg:top-20">
                  Beat a score
                </span>
                <div className="[perspective:1100px]">
                  <div className="origin-center [transform:rotateY(-14deg)_rotateX(7deg)] motion-reduce:[transform:none]">
                    <HeroPhone />
                  </div>
                </div>
              </div>

              <div className="flex w-full max-w-sm flex-col gap-2 lg:hidden">
                <Link
                  href="#waitlist"
                  onClick={() => track("hero_cta_click", { source: "hero-primary" })}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-semibold text-paper"
                >
                  <span className="size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-paper" aria-hidden="true" />
                  Join the waitlist
                </Link>
                <Link
                  href="#challenges"
                  onClick={() => track("hero_cta_click", { source: "hero-explore" })}
                  className="flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[15px] font-semibold text-ink"
                >
                  See the games
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-gate-right relative flex w-full flex-col justify-center bg-ink px-5 py-6 text-paper lg:h-full lg:overflow-y-auto lg:px-8 lg:py-12">
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
