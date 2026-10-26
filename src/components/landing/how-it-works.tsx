"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Screen = "arena" | "play" | "result" | "rank";

type Tone = "signal" | "volt" | "ember" | "green";

const TONE: Record<Tone, { text: string; hex: string }> = {
  signal: { text: "text-signal", hex: "#f0c020" },
  volt: { text: "text-volt", hex: "#1060f8" },
  ember: { text: "text-ember", hex: "#d82010" },
  green: { text: "text-green-500", hex: "#22C55E" },
};

type Stop = {
  index: string;
  game: string;
  status: string;
  tone: Tone;
  title: string;
  body: string;
  screen: Screen;
};

const STOPS: Stop[] = [
  {
    index: "01",
    game: "Choose your arena",
    status: "Find your game",
    tone: "green",
    title: "Pick a brain game arena.",
    body: "Explore four arenas: Numbers, Logic, Computer Science, and Memory & Visual. Each contains its own games, from fast calculations and number patterns to logic puzzles, code challenges, and memory tests. Pick what interests you and jump straight in.",
    screen: "arena",
  },
  {
    index: "02",
    game: "Choose your mode",
    status: "Take the challenge",
    tone: "volt",
    title: "Solo, bot, or a friend.",
    body: "Every game starts with a clear goal and simple rules. Play on your own, sharpen your skills against a bot, or send a challenge to a friend. Whether you're solving a sequence or tracing a piece of code, the aim is simple: figure it out and get the best score you can.",
    screen: "play",
  },
  {
    index: "03",
    game: "Make your move",
    status: "Choose your strategy",
    tone: "ember",
    title: "Win with strategy.",
    body: "Build a streak with Build or Break. Commit to your confidence with Lock In. In Risk & Reward, decide whether to bank your points or risk them for more. Some games bring special twists or comeback opportunities, giving you new ways to approach the same kind of challenge.",
    screen: "result",
  },
  {
    index: "04",
    game: "Track your progress",
    status: "Challenge again",
    tone: "green",
    title: "Beat your best. Share it.",
    body: "Review your answers, understand your score, and track your personal bests across games. Take on daily challenges, share a Same Battle so someone else can play under the same conditions, and compare results. As Two5 grows, ratings, leaderboards, live duels, and more competitive formats will give you even more ways to play.",
    screen: "rank",
  },
];

function StopBody({ body, flip, tone }: { body: string; flip: boolean; tone: Tone }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("mt-2 max-w-md sm:mt-4", flip && "ml-auto")}>
      <p
        className={cn(
          "text-[12px] leading-6 text-paper/75 sm:text-base sm:leading-7",
          !open && "line-clamp-2 sm:line-clamp-3",
        )}
      >
        {body}
      </p>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "mt-1.5 text-[11px] font-semibold tracking-wide uppercase transition-opacity hover:opacity-80 sm:mt-2 sm:text-xs",
          TONE[tone].text,
          flip && "ml-auto block",
        )}
      >
        {open ? "View less" : "View more"}
      </button>
    </div>
  );
}

function PhoneScreen({ screen }: { screen: Screen }) {
  if (screen === "arena") {
    return (
      <>
        <p className="font-display text-[9px] tracking-[0.16em] text-paper/45 uppercase">Choose your arena</p>
        <p className="mt-1 text-[11px] text-paper/70">Find your game</p>
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between rounded-lg border border-green-500/50 bg-green-500/10 px-3 py-2">
            <span className="text-xs font-semibold">Numbers</span><span className="text-green-400">↗</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs font-semibold">Logic</span><span className="text-paper/35">→</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs font-semibold">Computer Science</span><span className="text-paper/35">→</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs font-semibold">Memory & Visual</span><span className="text-paper/35">→</span>
          </div>
        </div>
      </>
    );
  }

  if (screen === "play") {
    return (
      <>
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Choose your mode</p>
        <p className="mt-1 text-[11px] text-paper/70">Numbers · Number Sprint</p>
        <div className="mt-4 space-y-2">
          <div className="rounded-lg border border-volt/50 bg-volt/10 px-3 py-2.5">
            <p className="text-xs font-semibold">Solo</p>
            <p className="mt-0.5 text-[9px] text-paper/50">Play on your own</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2.5">
            <p className="text-xs font-semibold">Vs Bot</p>
            <p className="mt-0.5 text-[9px] text-paper/50">Sharpen your skills</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2.5">
            <p className="text-xs font-semibold">Challenge a friend</p>
            <p className="mt-0.5 text-[9px] text-paper/50">Send a Same Battle</p>
          </div>
        </div>
      </>
    );
  }

  if (screen === "result") {
    return (
      <>
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Make your move</p>
        <p className="mt-1 text-[11px] text-paper/70">Choose your strategy</p>
        <div className="mt-4 space-y-2">
          <div className="rounded-lg border border-ember/40 bg-ember/10 px-3 py-2">
            <p className="text-xs font-semibold text-ember">Risk & Reward</p>
            <p className="mt-0.5 text-[9px] text-paper/55">Bank points — or risk them</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-xs font-semibold">Lock In</p>
            <p className="mt-0.5 text-[9px] text-paper/50">Commit to your confidence</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-xs font-semibold">Build or Break</p>
            <p className="mt-0.5 text-[9px] text-paper/50">Keep the streak alive</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Your progress</p>
      <p className="mt-1 text-[11px] text-paper/70">Numbers · Personal best</p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">Best score</p>
          <p className="mt-1 font-display text-4xl leading-none text-signal">840</p>
        </div>
        <span className="rounded-full bg-green-500/15 px-2 py-1 text-[9px] font-semibold text-green-400">+8%</span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
          <span className="text-[10px]">Daily challenge</span>
          <span className="text-[9px] text-paper/40">Today</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
          <span className="text-[10px]">Same Battle</span>
          <span className="text-[9px] text-signal">Share</span>
        </div>
      </div>
      <p className="mt-auto pt-3 font-mono text-[9px] tracking-[0.1em] text-paper/40 uppercase">Challenge again</p>
    </>
  );
}

function Phone({
  screen,
  inward,
  tone,
}: {
  screen: Screen;
  inward: "left" | "right";
  tone: Tone;
}) {
  return (
    <div className="w-full [perspective:900px]">
      <div
        className={cn(
          "origin-center max-lg:[transform:none] motion-reduce:[transform:none]",
          inward === "left"
            ? "lg:[transform:rotateY(14deg)_rotateX(6deg)]"
            : "lg:[transform:rotateY(-14deg)_rotateX(6deg)]",
        )}
      >
        <div
          className="rounded-[1.45rem] bg-gradient-to-br from-[#4a4742] via-[#161513] to-[#0a0a09] p-[3px] lg:rounded-[2rem]"
          style={{ boxShadow: `0 16px 36px ${TONE[tone].hex}33` }}
        >
          <div className="rounded-[1.28rem] bg-[#141311] p-1 lg:rounded-[1.85rem] lg:p-1.5">
            <div className="relative flex h-[13.75rem] flex-col overflow-hidden rounded-[1.1rem] bg-[#10100e] px-2 pt-4 pb-2 text-paper lg:h-[22rem] lg:rounded-[1.55rem] lg:px-4 lg:pt-7 lg:pb-3">
              <span className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#2c2a26]" aria-hidden="true" />
              <div className="relative z-0 flex min-h-0 flex-1 flex-col blur-[10px] opacity-75 select-none pointer-events-none">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-xl leading-none tracking-[0.06em]">TWO5</span>
                  <span className={cn("font-mono text-[10px] tracking-[0.08em]", TONE[tone].text)}>{screen === "rank" ? "Planned" : "Preview"}</span>
                </div>
                <PhoneScreen screen={screen} />
              </div>
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-[1.1rem] bg-white/[0.035]"
                aria-hidden="true"
              >
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.025]" />
                <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-[inherit] bg-gradient-to-b from-white/[0.045] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function routePath(points: { x: number; y: number }[], width: number) {
  const first = points[0];
  const last = points[points.length - 1];
  const clampX = (x: number) => Math.max(16, Math.min(width - 16, x));
  let d = `M ${first.x} ${first.y - 36} L ${first.x} ${first.y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const from = points[i];
    const to = points[i + 1];
    const dir = Math.sign(to.x - from.x) || 1;
    const bulge = Math.min(96, Math.abs(to.x - from.x) * 0.22);
    const span = (to.y - from.y) * 0.48;
    const c1 = clampX(from.x - dir * bulge);
    const c2 = clampX(to.x + dir * bulge);
    d += ` C ${c1} ${from.y + span}, ${c2} ${to.y - span}, ${to.x} ${to.y}`;
  }
  d += ` L ${last.x} ${last.y + 48}`;
  return d;
}

export function HowItWorks() {
  const gradId = useId().replace(/:/g, "");
  const listRef = useRef<HTMLOListElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const phoneRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const list = listRef.current;
    const path = pathRef.current;
    if (!list || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const marks: number[] = [];
    const samples: { len: number; y: number }[] = [];
    let frame = 0;

    const draw = () => {
      const length = Number(path.dataset.length || 0);
      if (!length || samples.length === 0) return;
      const top = list.getBoundingClientRect().top;
      const target = window.innerHeight * 0.62;
      let drawn = length;
      if (!reduce) {
        const first = samples[0].y + top;
        const last = samples[samples.length - 1].y + top;
        if (first >= target) drawn = 0;
        else if (last <= target) drawn = length;
        else {
          let best = 0;
          let bestDistance = Infinity;
          for (const sample of samples) {
            const distance = Math.abs(sample.y + top - target);
            if (distance < bestDistance) {
              bestDistance = distance;
              best = sample.len;
            }
          }
          drawn = best;
        }
      }
      path.style.strokeDashoffset = `${length - drawn}`;
      const progress = drawn / length;
      dotRefs.current.forEach((dot, index) => {
        const on = progress >= (marks[index] ?? 1) - 0.012;
        dot?.classList.toggle("is-reached", on);
        copyRefs.current[index]?.classList.toggle("is-reached", on);
        phoneRefs.current[index]?.classList.toggle("is-reached", on);
      });
    };

    const layout = () => {
      const origin = list.getBoundingClientRect();
      const points = dotRefs.current.flatMap((dot) => {
        if (!dot) return [];
        const rect = dot.getBoundingClientRect();
        return [{ x: rect.left + rect.width / 2 - origin.left, y: rect.top + rect.height / 2 - origin.top }];
      });
      if (points.length < 2) return;
      path.setAttribute("d", routePath(points, list.clientWidth));
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.dataset.length = String(length);
      marks.length = 0;
      samples.length = 0;
      const steps = 220;
      for (let step = 0; step <= steps; step += 1) {
        const at = (length * step) / steps;
        samples.push({ len: at, y: path.getPointAtLength(at).y });
      }
      points.forEach((point) => {
        let best = 0;
        let bestDistance = Infinity;
        for (const sample of samples) {
          const spot = path.getPointAtLength(sample.len);
          const distance = (spot.x - point.x) ** 2 + (spot.y - point.y) ** 2;
          if (distance < bestDistance) {
            bestDistance = distance;
            best = sample.len / length;
          }
        }
        marks.push(best);
      });
      draw();
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(list);
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.fonts?.ready.then(layout).catch(() => undefined);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="how" aria-labelledby="how-title" className="relative overflow-hidden bg-black text-paper">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-12 pb-24 sm:px-8 lg:px-14 lg:py-28 lg:pb-40">
        <header className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-mono text-xs tracking-[0.2em] text-blue-500 uppercase">How Two5 works</p>
          <h2 id="how-title" className="font-display text-[clamp(2.4rem,10vw,5.5rem)] leading-[0.92] font-normal tracking-[0.03em]">
            Pick a <span className="text-green-500">game.</span> Play{" "}
            <span className="text-red-500">smarter.</span>
          </h2>
        </header>

        <ol ref={listRef} className="relative mt-10 lg:mt-24">
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden="true">
            <path ref={pathRef} fill="none" stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="38%" stopColor="#1060f8" />
                <stop offset="72%" stopColor="#d82010" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>
          {STOPS.map((stop, index) => {
            const flip = index % 2 === 1;
            return (
              <li
                key={stop.index}
                className={cn(
                  "grid items-center gap-3 py-6 lg:items-center lg:justify-center lg:gap-x-8 lg:py-28 xl:gap-x-10",
                  flip
                    ? "lg:grid-cols-[minmax(0,32rem)_12.5rem]"
                    : "lg:grid-cols-[12.5rem_minmax(0,32rem)]",
                )}
              >
                <div className={cn("relative z-10 flex", flip ? "justify-end lg:col-start-2" : "justify-start")}>
                  <div
                    ref={(node) => {
                      phoneRefs.current[index] = node;
                    }}
                    className="relative w-[9rem] max-w-[58%] opacity-80 transition-opacity duration-500 ease-out lg:w-[12.5rem] lg:max-w-none motion-reduce:opacity-100 [&.is-reached]:opacity-100"
                  >
                    <span
                      ref={(node) => {
                        dotRefs.current[index] = node;
                      }}
                      className={cn(
                        "absolute top-1/2 z-20 size-3 -translate-y-1/2 rounded-full opacity-40 ring-4 ring-black transition-opacity duration-300 [&.is-reached]:opacity-100 lg:size-3.5",
                        flip ? "-right-1" : "-left-1",
                      )}
                      style={{ backgroundColor: TONE[stop.tone].hex }}
                      aria-hidden="true"
                    />
                    <Phone screen={stop.screen} inward={flip ? "right" : "left"} tone={stop.tone} />
                  </div>
                </div>
                <div
                  ref={(node) => {
                    copyRefs.current[index] = node;
                  }}
                  className={cn(
                    "relative z-10 w-full max-w-[18rem] opacity-45 transition-opacity duration-500 ease-out lg:max-w-xl lg:blur-[6px] lg:transition-[filter,opacity] motion-reduce:blur-none motion-reduce:opacity-100 [&.is-reached]:opacity-100 lg:[&.is-reached]:blur-none",
                    flip
                      ? "ml-auto text-right lg:col-start-1 lg:row-start-1 lg:justify-self-end"
                      : "mr-auto text-left lg:justify-self-start",
                  )}
                >
                  <p className={cn("font-display text-3xl leading-none sm:text-6xl lg:text-7xl", TONE[stop.tone].text )}>
                    {stop.index}
                  </p>
                  <h3 className="mt-1.5 line-clamp-2 font-display text-[1.6rem] leading-[0.88] font-normal tracking-[0.03em] sm:mt-3 sm:line-clamp-none sm:text-5xl lg:text-6xl">
                    {stop.title}
                  </h3>
                  <StopBody body={stop.body} flip={flip} tone={stop.tone} />
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mx-auto mt-16 max-w-2xl text-center font-display text-2xl leading-snug tracking-[0.03em] text-paper/70 sm:mt-24 sm:text-4xl">
          Your game. <span className="text-red-500"> Your strategy. </span> Your next challenge.
        </p>
      </div>
    </section>
  );
}
