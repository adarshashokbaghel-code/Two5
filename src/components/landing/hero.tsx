
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, Timer, Trophy } from "lucide-react";
import { HeroFloaters } from "@/components/landing/hero-floaters";
import { HeroPhone, SCREEN_WASH } from "@/components/landing/hero-phone";

export function Hero() {
  const [wash, setWash] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--two5-wash", SCREEN_WASH[wash]);
    root.style.setProperty("--two5-wash-ink", wash >= 2 ? "#F4F1E8" : "#050505");
  }, [wash]);

  return (
    <section className="relative bg-black lg:h-[190vh] motion-reduce:lg:h-auto">
      <div className="sticky top-0 isolate flex h-[100svh] flex-col overflow-hidden bg-black text-[#F4F1E8]">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        {SCREEN_WASH.map((color, washIndex) => (
          <div
            key={color}
            className="absolute left-1/2 top-[-18%] h-[46rem] w-[min(72rem,140vw)] -translate-x-1/2 rounded-full blur-[150px] transition-opacity duration-700 ease-out"
            style={{
              backgroundColor: color,
              opacity: washIndex === wash ? 0.28 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_58%,#000_84%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      <HeroFloaters />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-5 pt-14 sm:px-8 sm:pt-28">
        <div className="w-full min-w-0 shrink-0 text-center">
          <p className="mb-2 font-display text-[0.72rem] leading-none tracking-[0.18em] text-white/55 sm:mb-5 sm:text-[clamp(1.05rem,2vw,0.85rem)] sm:tracking-[0.14em] sm:text-white/70">
            Think fast. Play smart.
          </p>

          <h1 className="section-heading mx-auto max-w-[16.5rem] sm:max-w-none sm:whitespace-nowrap">
            TWO5 Give your brain{" "}
            <span className="transition-colors duration-700" style={{ color: SCREEN_WASH[wash] }}>
              a run.
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-[19rem] text-balance text-[0.8rem] leading-snug text-white/45 sm:mt-4 sm:max-w-none sm:text-[clamp(0.95rem,2.05vw,1.125rem)] sm:leading-relaxed sm:text-white/50">
            Short brain games and logic challenges that put your problem-solving skills to the test.
            Solve a round, build your score, and come back for more.
          </p>

          <div className="mx-auto mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
            <button
              type="button"
              data-waitlist-trigger
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[4px] px-3.5 text-[12px] font-semibold tracking-[-0.01em] transition-[background-color,color] duration-700 hover:brightness-110 sm:h-11 sm:gap-2 sm:px-5 sm:text-[13px]"
              style={{
                backgroundColor: SCREEN_WASH[wash],
                color: wash >= 2 ? "#F4F1E8" : "#050505",
              }}
            >
              Join the waitlist
              <ArrowRight size={13} />
            </button>

            <Link
              href="#how"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[4px] border border-white/15 px-3.5 text-[12px] font-medium tracking-[-0.01em] text-white/75 transition-colors hover:border-white/30 hover:text-white sm:h-11 sm:gap-2 sm:px-5 sm:text-[13px]"
            >
              How it works
              <ArrowDownRight size={13} />
            </Link>
          </div>

        </div>

        <div className="relative mt-4 w-full flex-1 overflow-hidden sm:mt-10">
          <div className="pointer-events-none absolute top-6 left-1/2 h-56 w-72 -translate-x-1/2">
            {SCREEN_WASH.map((color, washIndex) => (
              <div
                key={color}
                aria-hidden="true"
                className="absolute inset-0 rounded-full blur-[90px] transition-opacity duration-700 ease-out"
                style={{
                  backgroundColor: color,
                  opacity: washIndex === wash ? 0.34 : 0,
                }}
              />
            ))}
          </div>

          <div className="absolute top-0 left-1/2 w-[min(19.5rem,86vw)] -translate-x-1/2 sm:w-[20.5rem]">
            <HeroPhone
              size="hero"
              className="w-full shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
              onScreenChange={setWash}
            />

            <div className="absolute top-[14%] left-1 z-20 flex items-center gap-2.5 rounded-[4px] border border-white/10 bg-[#161616] px-3 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:top-[16%] sm:-left-10">
              <span
                className="grid size-8 place-items-center rounded-[4px] transition-colors duration-700"
                style={{
                  backgroundColor: SCREEN_WASH[wash],
                  color: wash >= 2 ? "#F4F1E8" : "#050505",
                }}
              >
                <Timer size={14} />
              </span>
              <span>
                <span className="block text-[11px] text-white/55">Round 01</span>
                <span className="block font-display text-xl leading-none tracking-[0.04em]">0:42</span>
              </span>
            </div>

            <div className="absolute top-[32%] right-1 z-20 flex items-center gap-2 rounded-[4px] border border-white/10 bg-[#161616] py-1.5 pr-3 pl-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:top-[34%] sm:-right-8">
              <span
                className="grid size-8 place-items-center rounded-[4px] transition-colors duration-700"
                style={{
                  backgroundColor: SCREEN_WASH[wash],
                  color: wash >= 2 ? "#F4F1E8" : "#050505",
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
