"use client";

import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

type Screen = "numbers" | "logic" | "daily" | "versus";

type Tone = "signal" | "volt" | "ember";

const TONE: Record<Tone, { text: string; hex: string }> = {
  signal: { text: "text-signal", hex: "#f0c020" },
  volt: { text: "text-volt", hex: "#1060f8" },
  ember: { text: "text-ember", hex: "#d82010" },
};

type Stop = {
  index: string;
  game: string;
  status: string;
  open: boolean;
  tone: Tone;
  title: string;
  body: string;
  screen: Screen;
};

const STOPS: Stop[] = [
  {
    index: "01",
    game: "Numbers",
    status: "Open",
    open: true,
    tone: "signal",
    title: "Name the next one.",
    body: "A minute on the clock. Four terms on the board. You enter what comes next. The round scores the answer.",
    screen: "numbers",
  },
  {
    index: "02",
    game: "Logic",
    status: "Open",
    open: true,
    tone: "volt",
    title: "Apply the rule.",
    body: "Read the clue once. Mark the piece that has to follow. The next problem keeps the rule and changes the board.",
    screen: "logic",
  },
  {
    index: "03",
    game: "Daily",
    status: "Soon",
    open: false,
    tone: "ember",
    title: "Beat your score.",
    body: "One problem when you open it. Yesterday’s mark stays on the board. Today you try to pass it.",
    screen: "daily",
  },
  {
    index: "04",
    game: "Versus",
    status: "Soon",
    open: false,
    tone: "signal",
    title: "Send the same round.",
    body: "You solved it. A friend gets the same problem. The higher score takes the match.",
    screen: "versus",
  },
];

function PhoneScreen({ screen }: { screen: Screen }) {
  if (screen === "numbers") {
    return (
      <>
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Numbers · Round 04</p>
        <p className="mt-1 text-[11px] text-paper/70">What comes next</p>
        <p className="mt-3 flex items-end justify-between font-display text-[1.35rem] leading-none lg:mt-4 lg:text-[2.75rem]">
          {["2", "6", "12", "20"].map((term) => (
            <span key={term}>{term}</span>
          ))}
          <span className="text-signal">?</span>
        </p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-signal" />
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">Score</p>
            <p className="font-display text-2xl leading-none text-ember lg:text-3xl">+3</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">Time</p>
            <p className="text-sm font-bold text-signal">0:42</p>
          </div>
        </div>
      </>
    );
  }

  if (screen === "logic") {
    return (
      <>
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Logic · Round 02</p>
        <p className="mt-1 text-[11px] text-paper/70">Which follows</p>
        <p className="mt-3 text-sm leading-5 font-medium">All reds are even.</p>
        <p className="mt-2 text-sm leading-5 text-paper/70">4 is red, so 4 is even.</p>
        <p className="mt-3 font-display text-2xl leading-none lg:text-3xl">
          7 is <span className="text-ember">?</span>
        </p>
        <div className="mt-auto grid grid-cols-2 gap-1.5 pt-4">
          <span className="flex h-8 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold">Even</span>
          <span className="flex h-8 items-center justify-center rounded-lg bg-signal text-xs font-semibold text-ink">Odd</span>
        </div>
      </>
    );
  }

  if (screen === "daily") {
    return (
      <>
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Daily · Today</p>
        <p className="mt-1 text-[11px] text-paper/70">One problem</p>
        <p className="mt-3 font-display text-2xl leading-none tracking-[0.04em] lg:text-4xl">
          12 <span className="text-signal">?</span> 48
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <div className="rounded-lg bg-white/8 px-2 py-2">
            <p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">Best</p>
            <p className="mt-1 font-display text-2xl leading-none lg:text-3xl">98</p>
          </div>
          <div className="rounded-lg bg-white/8 px-2 py-2">
            <p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">Today</p>
            <p className="mt-1 font-display text-2xl leading-none text-ember lg:text-3xl">+12</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="font-mono text-[9px] tracking-[0.16em] text-paper/45 uppercase">Versus · Same problem</p>
      <p className="mt-1 text-[11px] text-paper/70">Who takes it</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div>
          <p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">You</p>
          <p className="mt-1 font-display text-2xl leading-none text-ember lg:text-4xl">+3</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[9px] tracking-[0.14em] text-paper/40 uppercase">Friend</p>
          <p className="mt-1 font-display text-2xl leading-none text-paper/35 lg:text-4xl">—</p>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <span className="flex h-9 items-center justify-center gap-2 rounded-lg bg-signal text-xs font-semibold text-ink">
          <span className="size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-ink" aria-hidden="true" />
          Send the round
        </span>
      </div>
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
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-xl leading-none tracking-[0.06em]">TWO5</span>
                <span className={cn("font-mono text-[10px] tracking-[0.08em]", TONE[tone].text)}>Live</span>
              </div>
              <PhoneScreen screen={screen} />
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
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      video.pause();
      return;
    }

    let raf = 0;
    let lastY = window.scrollY;
    let coast = 0.7;

    const inView = () => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const play = () => {
      video.muted = true;
      video.loop = true;
      if (video.paused) void video.play().catch(() => undefined);
    };

    const tick = () => {
      if (!inView()) {
        if (!video.paused) video.pause();
        return;
      }
      play();
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (dy > 1) coast = Math.min(2, 1.15 + dy / 24);
      else coast += (0.7 - coast) * 0.08;
      video.playbackRate = Math.min(2, Math.max(0.25, coast));
    };

    const onScroll = () => {
      if (inView() && video.paused) play();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    video.addEventListener("loadeddata", play);
    const observer = new IntersectionObserver(onScroll, { threshold: [0, 0.2, 0.6] });
    observer.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      video.removeEventListener("loadeddata", play);
      window.removeEventListener("scroll", onScroll);
      video.pause();
    };
  }, []);

  return (
    <section ref={sectionRef} id="how" aria-labelledby="how-title" className="relative bg-ink text-paper">
      <div className="pointer-events-none sticky top-0 z-0 h-[100svh] overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/brand/how-clouds-poster.jpg"
        >
          <source src="/brand/how-clouds.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(240,192,32,0.07),transparent_42%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/10 to-ink/45" />
      </div>
      <div className="relative z-10 -mt-[100svh] mx-auto w-full max-w-[1500px] px-4 py-12 pb-24 sm:px-8 lg:px-14 lg:py-28 lg:pb-40">
        <header className="mx-auto max-w-xl text-center">
          <h2 id="how-title" className="font-display text-[clamp(2.6rem,12vw,4.5rem)] leading-[0.85] font-normal tracking-[0.03em]">
            How a round works
          </h2>
          <p className="mx-auto mt-4 max-w-md font-mono text-base leading-snug text-paper/60">
            A minute on the clock. One problem on the board. You answer, and the round keeps the score.
          </p>
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
                    className="relative w-[9rem] max-w-[58%] opacity-45 transition-opacity duration-500 ease-out lg:w-[12.5rem] lg:max-w-none lg:blur-[6px] lg:transition-[filter,opacity] motion-reduce:blur-none motion-reduce:opacity-100 [&.is-reached]:opacity-100 lg:[&.is-reached]:blur-none"
                  >
                    <span
                      ref={(node) => {
                        dotRefs.current[index] = node;
                      }}
                      className={cn(
                        "absolute top-1/2 z-20 size-3 -translate-y-1/2 rounded-full opacity-40 ring-4 ring-ink transition-opacity duration-300 [&.is-reached]:opacity-100 lg:size-3.5",
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
                  <p className={cn("font-display text-5xl leading-none sm:text-6xl lg:text-7xl", TONE[stop.tone].text)}>
                    {stop.index}
                  </p>
                  <p className={cn("mt-1.5 font-mono text-[11px] tracking-[0.16em] uppercase sm:mt-3", TONE[stop.tone].text)}>
                    {stop.game}
                    <span className="text-paper/25"> · </span>
                    {stop.status}
                  </p>
                  <h3 className="mt-1.5 font-display text-[2.15rem] leading-[0.88] font-normal tracking-[0.03em] sm:mt-3 sm:text-5xl lg:text-6xl">
                    {stop.title}
                  </h3>
                  <p className={cn("mt-2 max-w-md text-[15px] leading-6 text-paper/75 sm:mt-4 sm:text-base sm:leading-7", flip && "ml-auto")}>
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
