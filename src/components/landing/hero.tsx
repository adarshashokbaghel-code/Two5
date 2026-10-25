
"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { WaitlistModal } from "@/components/landing/waitlist-modal";
import { HeroPhone } from "@/components/landing/hero-phone";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-[#F4F1E8]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255, 255, 255, 0.065) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.065) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "48px 48px",
            backgroundPosition: "center top",
            maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 38%, black 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 38%, black 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
          }}
        />

        {/* Soft yellow ambient glow */}
        <div
          className="absolute left-1/2 top-[36rem] h-[30rem] w-[42rem]
            -translate-x-1/2 -translate-y-1/2 rounded-full
            bg-[#E9F078]/[0.08] blur-[140px]"
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #000000)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12 lg:pt-16">
        {/* Hero copy */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/65 uppercase sm:text-xs">
              Think fast. Play smart.
            </span>
          </div>

          <h1 className="font-display text-5xl leading-[0.98] tracking-[0.0em] sm:text-7xl lg:text-8xl">
            Two5 - Give your brain {" "}
            <br />
            <span className="text-green-500">a run.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            Short brain games and logic challenges that put your problem-solving skills to the test. Solve a round, build your score, and come back for more.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <button
              type="button"
              data-waitlist-trigger
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-green-500 px-7 text-sm font-semibold text-black transition-colors hover:bg-green-400"
            >
              Join the Waitlist
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>


            <Link
              href="#how-it-works"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-7 text-sm font-medium text-white/75 transition-colors hover:border-white/30 hover:text-white"
            >
              Explore TWO5
              <ArrowDownRight size={16} />
            </Link>
          </div>
        </div>

        {/* Phone showcase */}

        {/* Phone showcase */}
        <div className="relative mx-auto mt-16 h-[370px] w-full max-w-6xl sm:mt-20 sm:h-[470px] lg:mt-24 lg:h-[540px]">
         {/* Ambient glow behind the phones */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[90%]
    -translate-x-1/2 -translate-y-1/2 rounded-full
    bg-red-400/12 blur-[120px]"
/>

          {/* Left phone — behind */}
          <div
            className="absolute left-1/2 top-8 z-0 w-[55%] max-w-[260px]
      -translate-x-[112%] translate-y-5
      scale-[0.88] opacity-80
      sm:top-10 sm:-translate-x-[115%] sm:scale-95"
          >
            <HeroPhone size="hero" className="w-full" />
          </div>

          {/* Right phone — behind */}
          <div
            className="absolute left-1/2 top-8 z-0 w-[55%] max-w-[260px]
      translate-x-[12%] translate-y-5
      scale-[0.88] opacity-80
      sm:top-10 sm:translate-x-[15%] sm:scale-95"
          >
            <HeroPhone size="hero" className="w-full" />
          </div>

          {/* Center phone — foreground */}
          <div
            className="absolute left-1/2 top-[-30px] z-10 w-[55%] max-w-[280px]
      -translate-x-1/2 drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
          >
            <HeroPhone size="hero" className="w-full" />
          </div>
        </div>


        {/* Footer line */}
        <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:mt-20 sm:flex-row">
          <p className="font-mono text-[10px] tracking-[0.16em] text-white/35 uppercase">
            Made for curious minds
          </p>

          <p className="font-mono text-[10px] tracking-[0.16em] text-white/35 uppercase">
            Numbers · Logic · Computer Science
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
