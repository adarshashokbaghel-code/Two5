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
  { place: "02", name: "Seat 2", score: "121", you: false },
  { place: "03", name: "Seat 3", score: "114", you: false },
  { place: "04", name: "Seat 4", score: "109", you: false },
] as const;

const ORDERS = [
  { label: "Inorder", on: true },
  { label: "Preorder", on: false },
  { label: "Postorder", on: false },
] as const;

const COMMONS = [
  {
    src: "/art/numbers-25-green.jpg",
    alt: "A green geometric 25, the Numbers arena",
    index: "01",
    play: "Sequences",
    mark: "Fluency",
  },
  {
    src: "/art/offer-logic.jpg",
    alt: "A connected node, the Logic arena",
    index: "02",
    play: "Deduce",
    mark: "Care",
  },
  {
    src: "/art/offer-cs.jpg",
    alt: "A blue glass tree, the Computer Science arena",
    index: "03",
    play: "Algorithms",
    mark: "Steps",
  },
  {
    src: "/art/offer-daily-line.jpg",
    alt: "A yellow line and a black line, the Daily arena",
    index: "04",
    play: "Daily",
    mark: "Return",
  },
] as const;

type HeroPhoneProps = {
  className?: string;
  size?: "default" | "hero";
  background?: string;
  initialScreen?: 0 | 1 | 2 | 3;
  intervalMs?: number;
};

export function HeroPhone({
  className,
  size = "default",
  background = "#101710",
  initialScreen = 0,
  intervalMs = DEFAULT_HOLD_MS,
}: HeroPhoneProps) {
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
  }, [intervalMs]);

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
        "w-full rounded-[2.5rem] bg-gradient-to-br from-[#343633] via-[#151614] to-[#070807] p-[3px] shadow-[16px_28px_40px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="w-full rounded-[2.05rem]  bg-[#080908] p-2">
        <div
          data-phone-slide={activeScreen}
          data-phone-shell
          className={cn(
            "relative flex w-full flex-col overflow-hidden rounded-[1.9rem]",
            size === "hero"
              ? "h-[21.5rem] sm:h-[25rem] lg:h-[29.5rem]"
              : "h-[29rem] sm:h-[33rem] lg:h-[34rem]",
          )}
          style={phoneStyle}
          aria-hidden="true"
        >
          <span className="absolute top-2.5 left-1/2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/15" />

          <div className="relative bg-gradient-to-r from-green-500 to-red-500 min-h-0 flex-1 overflow-hidden">
            <div
              className="absolute  inset-0 will-change-transform"
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
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 flex justify-center">
            <div className="flex items-center gap-1 rounded-full bg-[#080908]/80 px-2 py-1.5">
              {Array.from({ length: COUNT }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 rounded-full bg-white/35 transition-[width,background-color] duration-300",
                    i === activeScreen && "w-3.5 bg-[#E9F078]",
                    i !== activeScreen && "w-1",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex  blur-[5px] h-full flex-col overflow-hidden px-4 pt-8 pb-9 text-paper"
      style={{ backgroundColor: "var(--phone-screen-bg, #101710)" }}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}

function Bar({
  time,
  timeClass,
}: {
  time: string;
  timeClass: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-display text-2xl leading-none tracking-[0.06em]">
        TWO5
      </span>
      <span className={cn("font-mono text-sm tracking-[0.08em]", timeClass)}>
        {time}
      </span>
    </div>
  );
}

function NumbersScreen() {
  return (
    <Screen>
      <Bar time="0:42" timeClass="text-signal" />

      <div className="mt-6 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-paper/45 uppercase">
            Numbers · Round 04
          </p>
          <p className="mt-2 text-sm font-medium text-paper/70">
            What comes next
          </p>
        </div>

        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-black">
          <Image
            src="/art/numbers-25-green.jpg"
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      </div>

      <p className="mt-5 flex items-end gap-3 font-display text-[2.75rem] leading-none tracking-[0.04em] whitespace-nowrap sm:text-6xl">
        {SEQUENCE.map((term) => (
          <span key={term}>{term}</span>
        ))}
        <span className="text-signal">?</span>
      </p>

      <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-2/3 rounded-full bg-signal" />
      </div>

      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-paper/40 uppercase">
            Score
          </p>
          <p className="mt-1 font-display text-4xl leading-none text-ember">
            +3
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.16em] text-paper/40 uppercase">
            Streak
          </p>
          <p className="mt-1 text-lg leading-none font-bold">4</p>
        </div>
      </div>
    </Screen>
  );
}

function BoardScreen() {
  return (
    <Screen>
      <Bar time="Week" timeClass="text-signal" />

      <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-paper/45 uppercase">
        Leaderboard
      </p>
      <p className="mt-2 text-sm font-medium text-paper/70">This week</p>

      <div className="relative mt-3 h-14 overflow-hidden rounded-xl bg-[#efece4]">
        <Image
          src="/art/versus-challenge.png"
          alt=""
          fill
          sizes="240px"
          className="object-contain p-1.5"
        />
      </div>

      <ol className="mt-2.5 flex flex-col gap-1">
        {BOARD.map((row) => (
          <li
            key={row.place}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-1",
              row.you ? "bg-signal text-ink" : "bg-white/5 text-paper",
            )}
          >
            <span
              className={cn(
                "w-5 font-mono text-[10px] tracking-[0.08em]",
                row.you ? "text-ink/60" : "text-paper/40",
              )}
            >
              {row.place}
            </span>

            <span className="min-w-0 flex-1 truncate text-sm font-semibold">
              {row.name}
            </span>

            <span className="font-display text-2xl leading-none tracking-[0.04em]">
              {row.score}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-paper/40 uppercase">
            Place
          </p>
          <p className="mt-1 font-display text-4xl leading-none text-signal">
            01
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.16em] text-paper/40 uppercase">
            Gain
          </p>
          <p className="mt-1 text-lg leading-none font-bold text-ember">
            +7
          </p>
        </div>
      </div>
    </Screen>
  );
}

function DsaScreen() {
  return (
    <Screen>
      <Bar time="1:05" timeClass="text-volt" />

      <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-paper/45 uppercase">
        DSA · Round 02
      </p>
      <p className="mt-2 text-sm font-medium text-paper/70">
        Left, node, right
      </p>

      <div className="relative mt-3 h-28 overflow-hidden rounded-xl bg-black">
        <Image
          src="/art/offer-cs.jpg"
          alt=""
          fill
          sizes="240px"
          className="object-contain"
        />
      </div>

      <div className="mt-3 grid gap-1.5">
        {ORDERS.map((order) => (
          <div
            key={order.label}
            className={cn(
              "flex h-8 items-center rounded-lg px-3 text-sm font-semibold",
              order.on ? "bg-volt text-paper" : "bg-white/5 text-paper/75",
            )}
          >
            {order.label}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-paper/40 uppercase">
            Score
          </p>
          <p className="mt-1 font-display text-4xl leading-none text-volt">
            +5
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.16em] text-paper/40 uppercase">
            Streak
          </p>
          <p className="mt-1 text-lg leading-none font-bold">2</p>
        </div>
      </div>
    </Screen>
  );
}

function PaperScreen() {
  return (
    <Screen>
      <Bar time="Learn" timeClass="text-volt" />

      <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-paper/45 uppercase">
        Research
      </p>
      <p className="mt-1 font-display text-3xl leading-none tracking-[0.04em]">
        Commons
      </p>

      <div className="mt-3 h-px w-10 bg-volt" />

      <ul className="mt-3 flex min-h-0 flex-col border-t border-white/10">
        {COMMONS.map((row) => (
          <li
            key={row.index}
            className="flex items-center gap-3 border-b border-white/10 py-2"
          >
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-black">
              <Image
                src={row.src}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] tracking-[0.14em] text-paper/40 uppercase">
                Arena {row.index}
              </p>
              <p className="truncate font-display text-lg leading-none tracking-[0.02em]">
                {row.play}
              </p>
            </div>

            <p className="font-mono text-[10px] tracking-[0.14em] text-volt uppercase">
              {row.mark}
            </p>
          </li>
        ))}
      </ul>
    </Screen>
  );
}