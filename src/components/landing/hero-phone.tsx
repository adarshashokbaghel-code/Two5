"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type TransitionEvent,
} from "react";

import { cn } from "@/lib/utils";

const COUNT = 4;
const SLIDE_MS = 700;
const DEFAULT_HOLD_MS = 2600;

const SEQUENCE = ["2", "6", "12", "20"] as const;

const BOARD = [
  { place: "01", name: "You", score: "128", you: true },
  { place: "02", name: "Maya K.", score: "121", you: false },
  { place: "03", name: "Ravi S.", score: "114", you: false },
  { place: "04", name: "Elena V.", score: "109", you: false },
] as const;

const ORDERS = [
  { label: "Inorder", on: true },
  { label: "Preorder", on: false },
  { label: "Postorder", on: false },
] as const;

const COMMONS = [
  {
    src: "/art/numbers-25-green.jpg",
    alt: "Numbers arena",
    index: "01",
    play: "Numbers",
    mark: "Live",
    markTone: "live" as const,
  },
  {
    src: "/art/offer-logic.jpg",
    alt: "Logic arena",
    index: "02",
    play: "Logic",
    mark: "Live",
    markTone: "live" as const,
  },
  {
    src: "/art/offer-cs.jpg",
    alt: "Computer Science arena",
    index: "03",
    play: "CS",
    mark: "Soon",
    markTone: "soon" as const,
  },
  {
    src: "/art/offer-daily-line.jpg",
    alt: "Memory and Visual arena",
    index: "04",
    play: "Memory",
    mark: "Soon",
    markTone: "soon" as const,
  },
] as const;

export type PhoneLineupItem = {
  title: string;
  tag: string;
  accent: string;
  live: boolean;
  thumb: string;
};

type HeroPhoneProps = {
  className?: string;
  size?: "default" | "hero" | "arena" | "stage";
  background?: string;
  initialScreen?: 0 | 1 | 2 | 3;
  intervalMs?: number;
  lineup?: PhoneLineupItem[];
  lineupActive?: number;
  onLineupPick?: (index: number) => void;
};

export function HeroPhone({
  className,
  size = "default",
  background = "#0a0a0a",
  initialScreen = 0,
  intervalMs = DEFAULT_HOLD_MS,
  lineup,
  lineupActive = 0,
  onLineupPick,
}: HeroPhoneProps) {
  const showLineup = lineup != null && lineup.length > 0;
  const [index, setIndex] = useState(0);
  const [motion, setMotion] = useState(true);
  const indexRef = useRef(0);

  const activeScreen = (index + initialScreen) % COUNT;

  const panels = [
    ...Array.from({ length: COUNT }, (_, offset) => {
      return (initialScreen + offset) % COUNT;
    }),
    initialScreen,
  ].map((screen) => {
    const screens = [
      NumbersScreen,
      BoardScreen,
      DsaScreen,
      PaperScreen,
    ];
    return screens[screen];
  });

  const phoneStyle = {
    "--phone-screen-bg": background,
  } as CSSProperties;

  useEffect(() => {
    if (showLineup) {
      setMotion(false);
      return;
    }
    if (intervalMs <= 0) {
      setMotion(false);
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      setMotion(false);
      return;
    }

    let first = 0;
    let second = 0;

    const timer = window.setInterval(() => {
      setMotion(true);

      first = window.requestAnimationFrame(() => {
        second = window.requestAnimationFrame(() => {
          setIndex((current) => {
            const next = current + 1;
            indexRef.current = next;
            return next;
          });
        });
      });
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    };
  }, [intervalMs, showLineup]);

  useEffect(() => {
    if (index < COUNT) return;

    const timeout = window.setTimeout(() => {
      setMotion(false);
      indexRef.current = 0;
      setIndex(0);
    }, SLIDE_MS + 180);

    return () => window.clearTimeout(timeout);
  }, [index]);

  const onEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform") return;
    if (event.target !== event.currentTarget) return;
    if (indexRef.current !== COUNT) return;

    setMotion(false);
    indexRef.current = 0;
    setIndex(0);
  };

  return (
    <div
      className={cn(
        "w-full rounded-[2.5rem] bg-gradient-to-br from-[#3a3936] via-[#161513] to-[#050505] p-[3px] shadow-[16px_28px_40px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="w-full rounded-[2.05rem] bg-[#060606] p-2">
        <div
          data-phone-slide={activeScreen}
          data-phone-shell
          className={cn(
            "relative flex w-full flex-col overflow-hidden rounded-[1.9rem]",
            size === "stage"
              ? "h-[23rem] sm:h-[25rem] lg:h-[26rem]"
              : size === "arena"
                ? "h-[23rem] sm:h-[27rem] lg:h-[31rem]"
                : size === "hero"
                ? "h-[21.5rem] sm:h-[25rem] lg:h-[29.5rem]"
                : "h-[29rem] sm:h-[33rem] lg:h-[34rem]",
          )}
          style={phoneStyle}
          aria-hidden="true"
        >
          <span className="absolute top-2.5 left-1/2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/80" />

          <div className="relative min-h-0 flex-1 overflow-hidden bg-[var(--phone-screen-bg,#0a0a0a)]">
            {showLineup ? (
              <LineupScreen
                items={lineup}
                active={lineupActive}
                onPick={onLineupPick}
              />
            ) : (
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `translate3d(0, -${index * 100}%, 0)`,
                  transition: motion
                    ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                    : "none",
                }}
                onTransitionEnd={onEnd}
              >
                {panels.map((Panel, panelIndex) => (
                  <div
                    key={panelIndex}
                    className="absolute inset-x-0 top-0 h-full"
                    style={{
                      transform: `translate3d(0, ${panelIndex * 100}%, 0)`,
                    }}
                  >
                    <Panel />
                  </div>
                ))}
              </div>
            )}
          </div>

          {!showLineup ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 flex justify-center">
              <div className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1.5 backdrop-blur-sm">
                {Array.from({ length: COUNT }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 rounded-full bg-white/30 transition-[width,background-color] duration-300",
                      i === activeScreen && "w-3.5 bg-[#E9F078]",
                      i !== activeScreen && "w-1",
                    )}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden px-3.5 pt-8 pb-8 text-paper"
      style={{ backgroundColor: "var(--phone-screen-bg, #0a0a0a)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="relative flex min-h-0 flex-1 flex-col blur-[4px]">{children}</div>
    </div>
  );
}

function StatusRow({
  right,
  rightClass,
}: {
  right: string;
  rightClass: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-display text-lg leading-none tracking-[0.08em]">TWO5</span>
      <span className={cn("rounded-full px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] uppercase", rightClass)}>
        {right}
      </span>
    </div>
  );
}

function NumbersScreen() {
  return (
    <Screen>
      <StatusRow right="0:42" rightClass="bg-signal/15 text-signal" />

      <div className="mt-5">
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/40 uppercase">
          Numbers · Round 04
        </p>
        <p className="mt-1.5 text-[13px] font-medium text-paper/80">What comes next?</p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-1.5 font-display text-[2.1rem] leading-none tracking-[0.04em]">
        {SEQUENCE.map((term) => (
          <span key={term} className="min-w-[1.6rem] text-center text-paper/90">
            {term}
          </span>
        ))}
        <span className="flex min-w-[1.6rem] items-center justify-center rounded-md bg-signal/15 text-signal">
          ?
        </span>
      </div>

      <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/8">
        <div className="h-full w-2/3 rounded-full bg-signal" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-1.5">
        {["28", "30", "32", "42"].map((n, i) => (
          <span
            key={n}
            className={cn(
              "flex h-9 items-center justify-center rounded-lg text-sm font-semibold",
              i === 1 ? "bg-signal text-ink" : "bg-white/[0.06] text-paper/80",
            )}
          >
            {n}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-white/8 pt-3">
        <div>
          <p className="font-mono text-[8px] tracking-[0.14em] text-paper/35 uppercase">Score</p>
          <p className="mt-0.5 font-display text-2xl leading-none text-ember">+3</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[8px] tracking-[0.14em] text-paper/35 uppercase">Streak</p>
          <p className="mt-0.5 text-sm font-semibold">4</p>
        </div>
      </div>
    </Screen>
  );
}

function BoardScreen() {
  return (
    <Screen>
      <StatusRow right="Live" rightClass="bg-green-500/15 text-green-400" />

      <div className="mt-5">
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/40 uppercase">Leaderboard</p>
        <p className="mt-1.5 text-[13px] font-medium text-paper/80">This week · Numbers</p>
      </div>

      <ol className="mt-4 flex flex-1 flex-col gap-1">
        {BOARD.map((row) => (
          <li
            key={row.place}
            className={cn(
              "flex items-center gap-2 rounded-xl px-2.5 py-2",
              row.you ? "bg-signal text-ink" : "bg-white/[0.04]",
            )}
          >
            <span
              className={cn(
                "w-5 font-mono text-[10px] tabular-nums",
                row.you ? "text-ink/55" : "text-paper/35",
              )}
            >
              {row.place}
            </span>
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full text-[9px] font-bold",
                row.you ? "bg-ink/15 text-ink" : "bg-white/10 text-paper/70",
              )}
            >
              {row.name.charAt(0)}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px] font-semibold">{row.name}</span>
            <span className="font-display text-xl leading-none tracking-[0.02em]">{row.score}</span>
          </li>
        ))}
      </ol>
    </Screen>
  );
}

function DsaScreen() {
  return (
    <Screen>
      <StatusRow right="1:05" rightClass="bg-volt/15 text-volt" />

      <div className="mt-5">
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/40 uppercase">
          Computer Science · Round 02
        </p>
        <p className="mt-1.5 text-[13px] font-medium text-paper/80">Left, node, right</p>
      </div>

      <div className="relative mt-4 h-20 overflow-hidden rounded-xl border border-white/8 bg-black/40">
        <Image
          src="/art/offer-cs.jpg"
          alt=""
          fill
          sizes="240px"
          className="object-contain p-2 opacity-90"
        />
      </div>

      <div className="mt-3 grid gap-1.5">
        {ORDERS.map((order) => (
          <div
            key={order.label}
            className={cn(
              "flex h-8 items-center justify-between rounded-lg px-3 text-[12px] font-semibold",
              order.on ? "bg-volt text-paper" : "bg-white/[0.05] text-paper/60",
            )}
          >
            <span>{order.label}</span>
            {order.on ? <span className="text-[9px] opacity-80">Selected</span> : null}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-white/8 pt-3">
        <div>
          <p className="font-mono text-[8px] tracking-[0.14em] text-paper/35 uppercase">Score</p>
          <p className="mt-0.5 font-display text-2xl leading-none text-volt">+5</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[8px] tracking-[0.14em] text-paper/35 uppercase">Streak</p>
          <p className="mt-0.5 text-sm font-semibold">2</p>
        </div>
      </div>
    </Screen>
  );
}

function PaperScreen() {
  return (
    <Screen>
      <StatusRow right="Arenas" rightClass="bg-white/8 text-paper/55" />

      <div className="mt-5">
        <p className="font-mono text-[9px] tracking-[0.16em] text-paper/40 uppercase">Explore</p>
        <p className="mt-1 font-display text-2xl leading-none tracking-[0.03em]">Four ways to play</p>
      </div>

      <ul className="mt-4 flex min-h-0 flex-1 flex-col gap-1.5">
        {COMMONS.map((row) => (
          <li
            key={row.index}
            className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-2 py-2"
          >
            <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-black">
              <Image src={row.src} alt="" fill sizes="36px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold leading-tight">{row.play}</p>
              <p className="mt-0.5 font-mono text-[8px] tracking-[0.12em] text-paper/35 uppercase">
                Arena {row.index}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[8px] tracking-[0.1em] uppercase",
                row.markTone === "live"
                  ? "bg-green-500/15 text-green-400"
                  : "bg-white/8 text-paper/40",
              )}
            >
              {row.mark}
            </span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function LineupScreen({
  items,
  active,
  onPick,
}: {
  items: PhoneLineupItem[];
  active: number;
  onPick?: (index: number) => void;
}) {
  const interactive = onPick != null;
  const current = items[active] ?? items[0];

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden px-3 pt-8 pb-3.5 text-paper"
      style={{ backgroundColor: "var(--phone-screen-bg, #0a0a0a)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40 transition-[background] duration-500"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 0%, ${current?.accent ?? "#22c55e"}55, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="font-display text-lg leading-none tracking-[0.08em]">TWO5</span>
        <span className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[8px] tracking-[0.14em] text-paper/45 uppercase">
          Lineup
        </span>
      </div>

      <p className="relative mt-2.5 font-mono text-[8px] tracking-[0.16em] text-paper/35 uppercase">
        Choose your arena
      </p>

      <ul className="relative mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => {
          const on = index === active;
          const Row = interactive ? "button" : "li";
          return (
            <Row
              key={`${item.title}-${index}`}
              type={interactive ? "button" : undefined}
              onClick={interactive ? () => onPick(index) : undefined}
              className={cn(
                "relative flex w-full items-center gap-2 overflow-hidden rounded-md px-1.5 py-1.5 text-left transition-[background-color,opacity] duration-300 ease-out",
                on ? "bg-white/[0.08] opacity-100" : "bg-transparent opacity-50",
                interactive && !on && "hover:bg-white/[0.04] hover:opacity-80",
              )}
            >
              {on ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1 left-0 w-[2px] rounded-full"
                  style={{ backgroundColor: item.accent }}
                />
              ) : null}

              <span
                className={cn(
                  "w-5 shrink-0 pl-1 font-mono text-[10px] tabular-nums tracking-[0.04em]",
                  on ? "text-paper/90" : "text-paper/30",
                )}
                style={on ? { color: item.accent } : undefined}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="relative size-9 shrink-0 overflow-hidden rounded-md bg-black/60">
                <Image src={item.thumb} alt="" fill sizes="36px" className="object-cover" />
                {on ? (
                  <span
                    className="absolute inset-0 opacity-30 mix-blend-screen"
                    style={{ backgroundColor: item.accent }}
                  />
                ) : null}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "truncate text-[13px] font-semibold leading-tight",
                      on ? "text-paper" : "text-paper/55",
                    )}
                  >
                    {item.title}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-[9px] tracking-[0.08em] uppercase",
                    on ? "text-paper/45" : "text-paper/25",
                  )}
                >
                  {item.tag}
                </span>
              </span>

              <span
                className={cn(
                  "shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[8px] tracking-[0.1em] uppercase",
                  item.live
                    ? on
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/5 text-paper/35"
                    : "bg-white/5 text-paper/30",
                )}
              >
                {item.live ? "Live" : "Soon"}
              </span>
            </Row>
          );
        })}
      </ul>

      <div className="relative mt-2 flex items-center justify-between border-t border-white/8 pt-2.5">
        <span className="font-mono text-[8px] tracking-[0.12em] text-paper/30 uppercase">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="font-mono text-[8px] tracking-[0.12em] uppercase" style={{ color: current?.accent }}>
          {current?.title}
        </span>
      </div>
    </div>
  );
}
