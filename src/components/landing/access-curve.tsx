"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLenis } from "lenis/react";

import type { HomeAccessStep } from "@/content/launch";

const colors = ["#22C55E", "#1060f8", "#d82010", "#f0c020"] as const;

function wave(width: number, height: number, mobile: boolean) {
  if (mobile) {
    const spacing = Math.min(height * 0.3, 92);
    const amp = Math.min(28, width * 0.24);
    const reach = height / 2 / spacing + 0.85;
    return { spacing, amp, reach };
  }

  const spacing = Math.min(Math.max(width * 0.3, 220), 440);
  const amp = Math.min(46, height * 0.28);
  const reach = width / 2 / spacing + 0.85;
  return { spacing, amp, reach };
}

function pointAt(slot: number, width: number, height: number, mobile: boolean) {
  const { spacing, amp } = wave(width, height, mobile);
  if (mobile) {
    return {
      x: width / 2 + Math.sin(slot * (Math.PI / 2)) * amp,
      y: height / 2 + slot * spacing,
    };
  }

  return {
    x: width / 2 + slot * spacing,
    y: height / 2 + Math.sin(slot * (Math.PI / 2)) * amp,
  };
}

function curvePath(width: number, height: number, mobile: boolean) {
  const { reach } = wave(width, height, mobile);
  const steps = 96;
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const slot = -reach + (reach * 2 * i) / steps;
    const { x, y } = pointAt(slot, width, height, mobile);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function LaunchHeader() {
  return (
    <header className="mx-auto w-full max-w-4xl shrink-0 px-4 text-center sm:px-8">
      <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-blue-500 uppercase sm:mb-4 sm:text-xs">
        Limited access
      </p>
      <h2
        id="launch-title"
        className="section-heading whitespace-nowrap text-[clamp(0.95rem,4.35vw,3.75rem)] leading-none"
      >
        The first round starts with <span className="text-green-500">200.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-5 text-white/70 sm:mt-5 sm:text-base sm:leading-7">
        Two5 is opening in stages. Join the waitlist, watch for selection results, and follow the journey from the
        first founding players to the official launch.
      </p>
    </header>
  );
}

function StaticSteps({ steps }: { steps: HomeAccessStep[] }) {
  const gradId = useId().replace(/:/g, "");
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-8 lg:px-14 lg:py-28">
      <LaunchHeader />
      <ol className="relative mx-auto mt-14 max-w-xl">
        <svg className="pointer-events-none absolute top-6 bottom-6 left-0 h-[calc(100%-3rem)] w-12 overflow-visible" aria-hidden="true">
          <line x1="24" y1="0" x2="24" y2="100%" stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="38%" stopColor="#1060f8" />
              <stop offset="70%" stopColor="#d82010" />
              <stop offset="100%" stopColor="#f0c020" />
            </linearGradient>
          </defs>
        </svg>
        {steps.map((step, index) => (
          <li key={step.index} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-5">
            <span
              className="relative z-10 grid size-12 place-items-center rounded-full font-display text-xl text-black ring-4 ring-black"
              style={{ backgroundColor: colors[index] ?? "#f0c020" }}
            >
              {step.index}
            </span>
            <div>
              <h3 className="font-display text-3xl leading-none tracking-[0.02em] sm:text-4xl">{step.title}</h3>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase">{step.when}</p>
              <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AccessCurve({ steps }: { steps: HomeAccessStep[] }) {
  const gradId = useId().replace(/:/g, "");
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const underlayRef = useRef<SVGPathElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tickRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const placeRef = useRef<() => void>(() => {});
  const [reduced, setReduced] = useState(false);
  const onLenis = useCallback(() => {
    placeRef.current();
  }, []);

  useLenis(onLenis, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const underlay = underlayRef.current;
    const grad = gradRef.current;
    if (!track || !stage || !svg || !path || !underlay || !grad || steps.length === 0) return;

    let frame = 0;

    const trace = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width < 2 || height < 2) return;
      const mobile = width < 520;
      const d = curvePath(width, height, mobile);
      path.setAttribute("d", d);
      underlay.setAttribute("d", d);
      grad.setAttribute("x1", "0");
      grad.setAttribute("y1", "0");
      grad.setAttribute("x2", mobile ? "0" : String(width));
      grad.setAttribute("y2", mobile ? String(height) : "0");
    };

    const place = () => {
      trace();
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width < 2 || height < 2) return;
      const mobile = width < 520;
      const span = Math.max(1, steps.length - 1);
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
      const indexFloat = progress * span;
      const active = Math.round(indexFloat);

      steps.forEach((_, index) => {
        const slot = index - indexFloat;
        const dist = Math.abs(slot);
        const focus = 1 - Math.min(1, dist);
        const node = nodeRefs.current[index];
        const copy = copyRefs.current[index];
        const tick = tickRefs.current[index];
        const spot = pointAt(slot, width, height, mobile);

        if (node) {
          const opacity = dist <= 1.15 ? 1 : Math.max(0, 1 - (dist - 1.15) * 2.2);
          node.style.left = `${spot.x}px`;
          node.style.top = `${spot.y}px`;
          node.style.opacity = String(opacity);
          node.style.zIndex = String(10 + Math.round(focus * 5));
          node.style.transform = `translate(-50%, -50%) scale(${0.8 + focus * 0.2})`;
        }

        if (copy) {
          const fade = dist >= 0.38 ? 0 : 1 - dist / 0.38;
          const shift = mobile ? slot * 12 : slot * 18;
          copy.style.opacity = String(fade);
          copy.style.transform = mobile
            ? `translate3d(0, ${shift}px, 0)`
            : `translate3d(${shift}px, 0, 0)`;
          if (index === active) copy.parentElement?.setAttribute("aria-current", "step");
          else copy.parentElement?.removeAttribute("aria-current");
        }

        if (tick) {
          const on = index === active;
          tick.style.width = on ? "2.25rem" : "0.5rem";
          tick.style.backgroundColor = on ? (colors[index] ?? "#f0c020") : "rgba(255,255,255,0.28)";
        }
      });

      if (hintRef.current) {
        hintRef.current.style.opacity = indexFloat > span - 0.08 ? "0" : "1";
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };

    placeRef.current = () => {
      place();
    };
    trace();
    place();
    const observer = new ResizeObserver(() => {
      trace();
      place();
    });
    observer.observe(stage);
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      placeRef.current = () => {};
      observer.disconnect();
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, steps]);

  if (reduced) return <StaticSteps steps={steps} />;

  const hold = Math.max(0, steps.length - 1);

  return (
    <div ref={trackRef} className="relative" style={{ height: `calc(100svh + ${hold * 72}vh)` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-black px-0 pt-[4.75rem] pb-16 sm:pt-16 sm:pb-24">
        <LaunchHeader />

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <div className="mt-2 flex items-center gap-3 px-4 sm:mt-6 sm:block sm:px-0">
            <div ref={stageRef} className="relative h-[17.5rem] w-[7.25rem] shrink-0 overflow-hidden sm:h-48 sm:w-full">
              <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <path
                  ref={underlayRef}
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.16"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  ref={pathRef}
                  fill="none"
                  stroke={`url(#${gradId})`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient ref={gradRef} id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22C55E" />
                    <stop offset="38%" stopColor="#1060f8" />
                    <stop offset="70%" stopColor="#d82010" />
                    <stop offset="100%" stopColor="#f0c020" />
                  </linearGradient>
                </defs>
              </svg>
              {steps.map((step, index) => (
                <span
                  key={step.index}
                  ref={(node) => {
                    nodeRefs.current[index] = node;
                  }}
                  className="absolute top-1/2 left-1/2 z-10 grid size-11 place-items-center rounded-full font-display text-base text-black sm:size-14 sm:text-xl"
                  style={{
                    backgroundColor: colors[index] ?? "#f0c020",
                    opacity: index === 0 ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${index === 0 ? 1 : 0.8})`,
                  }}
                >
                  {step.index}
                </span>
              ))}
            </div>

            <div className="relative h-[17.5rem] min-w-0 flex-1 sm:mx-auto sm:mt-8 sm:h-[16.75rem] sm:w-[min(34rem,calc(100%-2.5rem))] sm:flex-none">
              <ol className="relative m-0 h-full list-none p-0">
                {steps.map((step, index) => (
                  <li
                    key={step.index}
                    className="absolute inset-0 flex items-center sm:items-start"
                    aria-current={index === 0 ? "step" : undefined}
                  >
                    <div
                      ref={(node) => {
                        copyRefs.current[index] = node;
                      }}
                      className="w-full text-left will-change-transform sm:text-center"
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    >
                      <h3 className="font-display text-[1.65rem] leading-none tracking-[0.02em] sm:text-5xl">
                        <span className="sr-only">{step.index}. </span>
                        {step.title}
                      </h3>
                      <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase sm:mt-3">
                        {step.when}
                      </p>
                      <p className="mt-2 text-[13px] leading-5 text-white/75 sm:mx-auto sm:mt-3 sm:max-w-md sm:text-base sm:leading-7">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center gap-3 sm:mt-6">
            <div className="flex items-center gap-2" aria-hidden="true">
              {steps.map((step, index) => (
                <span
                  key={step.index}
                  ref={(node) => {
                    tickRefs.current[index] = node;
                  }}
                  className="h-1.5 rounded-full"
                  style={{
                    width: index === 0 ? "2.25rem" : "0.5rem",
                    backgroundColor: index === 0 ? colors[0] : "rgba(255,255,255,0.28)",
                  }}
                />
              ))}
            </div>
            <p
              ref={hintRef}
              className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase transition-opacity"
            >
              Scroll
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
