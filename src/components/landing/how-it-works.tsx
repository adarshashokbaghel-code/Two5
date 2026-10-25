"use client";

import { useEffect, useId, useRef } from "react";

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
    game: "Choose an arena",
    status: "Start here",
    tone: "signal",
    title: "Pick what you want to test.",
    body: "Start with Mathematics, Computer Science, or Knowledge & Reasoning. Each arena is built around questions that test how you think—not long lessons or endless scrolling.",
    screen: "arena",
  },
  {
    index: "02",
    game: "Take the challenge",
    status: "Play",
    tone: "volt",
    title: "Think it through. Lock in your answer.",
    body: "Solve a short, carefully chosen question. Work through a number pattern, reason through a problem, or test your CS knowledge. Every challenge gives you something specific to figure out.",
    screen: "play",
  },
  {
    index: "03",
    game: "See how you did",
    status: "Review",
    tone: "ember",
    title: "Get the answer. Know your score.",
    body: "Review the correct answer and the reasoning behind it. Build your score, track personal bests, and—where ratings are available—see your progress in each subject.",
    screen: "result",
  },
  {
    index: "04",
    game: "Track your standing",
    status: "More to come",
    tone: "green",
    title: "Improve your best. Compare your skill.",
    body: "Use your results to keep improving and compare your performance on subject leaderboards as those features roll out. Daily challenges and friend-versus-friend rounds are planned next.",
    screen: "rank",
  },
];

function PhoneScreen({ screen }: { screen: Screen }) {
  if (screen === "arena") {
    return (
      <>
        <p className="font-display text-[9px] tracking-[0.16em] text-paper/45 uppercase">Choose an arena</p>
        <p className="mt-1 text-[11px] text-paper/70">What are you in the mood for?</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-signal/50 bg-signal/10 px-3 py-2.5">
            <span className="text-xs font-semibold">Mathematics</span><span className="text-signal">↗</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
            <span className="text-xs font-semibold">Computer Science</span><span className="text-paper/35">→</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
            <span className="text-xs font-semibold">Knowledge & Reasoning</span><span className="text-paper/35">→</span>
          </div>
        </div>
        <p className="mt-auto pt-3 font-mono text-[9px] tracking-[0.12em] text-paper/40 uppercase">Pick a subject. Start thinking.</p>
      </>
    );
  }

  if (screen === "play") {
    return (
      <>
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Mathematics · Challenge 04</p>
        <p className="mt-1 text-[11px] text-paper/70">Find the next number</p>
        <p className="mt-3 flex items-end justify-between font-display text-[1.35rem] leading-none lg:mt-4 lg:text-[2.75rem]">
          {["2", "6", "12", "20"].map((term) => <span key={term}>{term}</span>)}
          <span className="text-signal">?</span>
        </p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-signal" /></div>
        <div className="mt-auto grid grid-cols-2 gap-1.5 pt-4">
          <span className="flex h-8 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold">28</span>
          <span className="flex h-8 items-center justify-center rounded-lg bg-signal text-xs font-semibold text-ink">30</span>
          <span className="flex h-8 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold">32</span>
          <span className="flex h-8 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold">42</span>
        </div>
      </>
    );
  }

  if (screen === "result") {
    return (
      <>
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Challenge complete</p>
        <div className="mt-4 rounded-xl border border-ember/30 bg-ember/10 p-3">
          <p className="font-mono text-[9px] tracking-[0.14em] text-paper/45 uppercase">Your result</p>
          <p className="mt-1 font-display text-4xl leading-none text-ember">+12</p>
          <p className="mt-2 text-[11px] font-semibold">Correct answer: 30</p>
        </div>
        <p className="mt-3 text-[11px] font-semibold">Why?</p>
        <p className="mt-1 text-[10px] leading-4 text-paper/65">The differences increase by 2: +4, +6, +8, then +10.</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-[9px] tracking-[0.1em] text-paper/40 uppercase">Personal best</span>
          <span className="font-display text-xl text-signal">84</span>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Your progress</p>
      <p className="mt-1 text-[11px] text-paper/70">Mathematics · Rating</p>
      <div className="mt-4 flex items-end justify-between">
        <div><p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">Current score</p><p className="mt-1 font-display text-4xl leading-none text-signal">840</p></div>
        <span className="rounded-full bg-green-500/15 px-2 py-1 text-[9px] font-semibold text-green-400">+8%</span>
      </div>
      <div className="mt-4 space-y-3">
        <div><div className="mb-1 flex justify-between text-[10px]"><span>Mathematics</span><span className="text-paper/45">840</span></div><div className="h-1 rounded-full bg-white/10"><div className="h-full w-4/5 rounded-full bg-signal" /></div></div>
        <div><div className="mb-1 flex justify-between text-[10px]"><span>Computer Science</span><span className="text-paper/45">Coming soon</span></div><div className="h-1 rounded-full bg-white/10"><div className="h-full w-1/3 rounded-full bg-volt" /></div></div>
      </div>
      <p className="mt-auto pt-4 font-mono text-[9px] tracking-[0.1em] text-paper/40 uppercase">Keep playing. Keep improving.</p>
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
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs tracking-[0.2em] text-signal uppercase">How Two5 works</p>
          <h2 id="how-title" className="font-display text-[clamp(2.6rem,12vw,6.5rem)] leading-[0.9] font-normal tracking-[0.03em]">
            Pick a <span className="text-yellow-500">challenge.</span>  Make your <span className="text-red-500">move.</span> 
          </h2>
        
        </header>

        <ol ref={listRef} className="relative mt-10 lg:mt-24">
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden="true">
            <path ref={pathRef} fill="none" stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0c020" />
                <stop offset="38%" stopColor="#1060f8" />
                <stop offset="72%" stopColor="#d82010" />
                <stop offset="100%" stopColor="#f0c020" />
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
                  <p className={cn("mt-1.5 font-mono text-[8px] tracking-[0.16em] uppercase sm:mt-3", TONE[stop.tone].text)}>
                    {stop.game}
                    <span className="text-paper/25"> · </span>
                    {stop.status}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.6rem] leading-[0.88] font-normal tracking-[0.03em] sm:mt-3 sm:text-5xl lg:text-6xl">
                    {stop.title}
                  </h3>
                  <p className={cn("mt-2 max-w-md text-[12px] leading-6 text-paper/75 sm:mt-4 sm:text-base sm:leading-7", flip && "ml-auto")}>
                    {stop.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
