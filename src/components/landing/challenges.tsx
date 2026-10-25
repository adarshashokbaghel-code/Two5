"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { getResearchPost, type ResearchPost } from "@/content/research";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const CELL = 248;
const GAP = 60;
const STRIDE = CELL + GAP;
const COLS = 9;
const BOARD = COLS * CELL + (COLS - 1) * GAP;
const MIN_SCALE = 0.7;
const MAX_SCALE = 1.35;

type Shot = { src: string; alt: string };

type Arena = {
  id: string;
  topic: string;
  title: string;
  subtitle: string;
  col: number;
  row: number;
  circle: string;
  images: Shot[];
  status: string;
  stage: string;
  practice: string;
  lede: string;
  body: string;
  notes: { heading: string; body: string }[];
  cta: { href: string; label: string; onClick: () => void };
};

const researchSlug: Record<string, string> = {
  numbers: "numbers",
  logic: "logic",
  cs: "computer-science",
  daily: "daily",
  versus: "versus",
};

const arenas: Arena[] = [
  {
    id: "numbers",
    topic: "Open",
    title: "Numbers",
    subtitle: "Sequences · Patterns",
    col: 4,
    row: 4,
    circle: "/art/numbers-object.jpg",
    images: [
      { src: "/art/numbers-25-green.jpg", alt: "A stylish shiny green 25" },
      { src: "/art/numbers-object.jpg", alt: "A rising sequence of yellow blocks" },
    ],
    status: "Open now",
    stage: "First arena · Numerical reasoning",
    practice: "Sequences, Patterns, Mental Maths, Numerical Reasoning",
    lede: "Find the pattern. Work out the sequence. Trust your reasoning.",
    body: "From number sequences and mental calculations to mathematical thinking and problems that reward a different way of looking at numbers.",
    notes: [
      {
        heading: "Sequences",
        body: "Short problems in patterns, mental maths, and numerical reasoning.",
      },
      {
        heading: "Look again",
        body: "The same numbers, seen from another angle, until the sequence gives.",
      },
    ],
    cta: {
      href: "/research/numbers",
      label: "Explore Numbers",
      onClick: () =>
        track("category_selected", { category: "numbers", source: "challenges" }),
    },
  },
  {
    id: "logic",
    topic: "Open",
    title: "Logic",
    subtitle: "Deduce · Connect",
    col: 5,
    row: 4,
    circle: "/art/offer-logic.jpg",
    images: [
      {
        src: "/art/offer-logic.jpg",
        alt: "A floating three-dimensional node with four connected forms",
      },
    ],
    status: "Open now",
    stage: "First arena · Careful thinking",
    practice: "Deduce, Connect, Reason, Adapt",
    lede: "Spot the clue. Make the connection. Find the answer.",
    body: "Short puzzles that reward careful thinking, then a new problem that asks you to use the same rules a different way.",
    notes: [
      {
        heading: "Deduce",
        body: "Patterns, missing pieces, and relationships that are not immediately obvious.",
      },
      {
        heading: "Adapt",
        body: "Familiar rules. Different problems. A new way to think each time.",
      },
    ],
    cta: {
      href: "/research/logic",
      label: "Explore Logic",
      onClick: () =>
        track("category_selected", { category: "logic", source: "challenges" }),
    },
  },
  {
    id: "cs",
    topic: "Planned",
    title: "Computer Science",
    subtitle: "DSA · Algorithms",
    col: 6,
    row: 4,
    circle: "/art/offer-cs.jpg",
    images: [
      {
        src: "/art/offer-cs.jpg",
        alt: "A blue glass tree of nodes standing in an empty dark field",
      },
      { src: "/art/arena-cs.jpg", alt: "A node diagram on a black field" },
    ],
    status: "Coming to Two5",
    stage: "Also planned · Beyond the code",
    practice: "DSA, Algorithms, Data Structures, CS Fundamentals",
    lede: "Think beyond the code.",
    body: "From data structures and algorithms to the computer science concepts you use to solve real problems.",
    notes: [
      {
        heading: "Practice",
        body: "Work through problems, compare approaches, and challenge yourself beyond the usual coding routine.",
      },
      {
        heading: "Fundamentals",
        body: "The thinking behind the code — data structures, algorithms, and the ideas that hold them together.",
      },
    ],
    cta: {
      href: "/research/computer-science",
      label: "Explore Computer Science",
      onClick: () =>
        track("category_selected", { category: "cs", source: "challenges" }),
    },
  },
  {
    id: "daily",
    topic: "Planned",
    title: "Daily",
    subtitle: "One challenge",
    col: 5,
    row: 5,
    circle: "/art/offer-daily.jpg",
    images: [
      {
        src: "/art/offer-daily-line.jpg",
        alt: "A tall yellow line and a tall black line on white",
      },
    ],
    status: "Planned for launch",
    stage: "A reason to return",
    practice: "Daily Challenges, Personal Scores, New Problems",
    lede: "One challenge. Every day.",
    body: "A fresh problem to take on. A new score to chase. One more reason to see what you can solve.",
    notes: [
      {
        heading: "Return",
        body: "From numbers and logic to new categories as Two5 grows, the idea stays the same: a challenge worth coming back for.",
      },
      {
        heading: "Score",
        body: "Personal scores and new problems, so yesterday’s result is the one you try to beat.",
      },
    ],
    cta: {
      href: "/research/daily",
      label: "Explore Daily",
      onClick: () =>
        track("category_selected", { category: "daily", source: "challenges" }),
    },
  },
  {
    id: "versus",
    topic: "Roadmap",
    title: "Versus",
    subtitle: "Solve · Send",
    col: 6,
    row: 5,
    circle: "/art/versus-object.jpg",
    images: [
      {
        src: "/art/versus-challenge.png",
        alt: "A solved yellow mark beside the red challenge you send",
      },
    ],
    status: "On the roadmap",
    stage: "Your score is just the beginning",
    practice: "Solve, Share, Compare, Rematch",
    lede: "You solved it. Now send the challenge.",
    body: "Challenge a friend to solve the same problem. Compare results. See who comes out ahead.",
    notes: [
      {
        heading: "Compare",
        body: "A number sequence, a logic puzzle, or a future DSA challenge. Solving it is one thing. Beating a friend’s score is another.",
      },
      {
        heading: "Friendly",
        body: "Built around friendly competition. Social challenges are part of the Two5 vision, not a live multiplayer feature yet.",
      },
    ],
    cta: {
      href: "/research/versus",
      label: "Explore Versus",
      onClick: () =>
        track("category_selected", { category: "versus", source: "challenges" }),
    },
  },
];

type View = { x: number; y: number; scale: number };

function boardScale(width: number, height: number) {
  if (width >= 768) return 1;
  return Math.min(width * 0.9, height * 0.7) / CELL;
}

function focusView(width: number, height: number, arena: Arena, scale = boardScale(width, height)): View {
  const cx = (arena.col - 1) * STRIDE + CELL / 2;
  const cy = (arena.row - 1) * STRIDE + CELL / 2;
  return {
    x: width / 2 - cx * scale,
    y: height / 2 - cy * scale,
    scale,
  };
}

const arenaWash: Record<string, string> = {
  numbers: "#3dce55",
  logic: "#2f6fed",
  cs: "#5ec8ff",
  daily: "#f0c020",
  versus: "#ef3b2e",
};

const arenaInk: Record<string, string> = {
  numbers: "#000000",
  logic: "#f5f2ea",
  cs: "#000000",
  daily: "#000000",
  versus: "#ffffff",
};

function scrollStepsEnabled() {
  return window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Challenges() {
  const boardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const home = useRef<View>({ x: 0, y: 0, scale: 1 });
  const activeRef = useRef(0);
  const lockRef = useRef<number | null>(null);
  const moved = useRef(false);
  const suppressClick = useRef(false);
  const drag = useRef<{
    id: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    moved: boolean;
    axis: "x" | "y" | null;
  } | null>(null);

  const [active, setActive] = useState(0);
  const [view, setView] = useState<View>({ x: 0, y: 0, scale: 1 });
  const [ready, setReady] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [settling, setSettling] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [caseOpen, setCaseOpen] = useState(false);
  const caseRef = useRef<HTMLDivElement>(null);

  const arena = arenas[active];
  const wash = arenaWash[arena.id] ?? arenaWash.numbers;
  const ink = arenaInk[arena.id] ?? "#000000";
  const research = getResearchPost(researchSlug[arena.id] ?? arena.id);
  const offCenter =
    Math.hypot(view.x - home.current.x, view.y - home.current.y) > 18 ||
    Math.abs(view.scale - home.current.scale) > 0.02;

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const apply = () => {
      const next = focusView(
        board.clientWidth,
        board.clientHeight,
        arenas[activeRef.current],
      );
      home.current = next;
      if (!moved.current) {
        setView(next);
        setReady(true);
      }
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  function settleTo(next: View) {
    moved.current = true;
    setSettling(true);
    setView(next);
  }

  function select(index: number) {
    const next = (index + arenas.length) % arenas.length;
    setActive(next);
    activeRef.current = next;
    const track = trackRef.current;
    if (!track || !scrollStepsEnabled()) return;
    lockRef.current = next;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    const slice = scrollable / arenas.length;
    window.scrollTo({ top: top + slice * next + 4, behavior: "smooth" });
    window.setTimeout(() => {
      if (lockRef.current === next) lockRef.current = null;
    }, 900);
  }

  function stepArena(dir: number) {
    select(activeRef.current + dir);
  }

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const next = focusView(board.clientWidth, board.clientHeight, arenas[active]);
    home.current = next;
    setCaseOpen(arenas[active]?.id === "versus");
    if (drag.current) return;
    settleTo(next);
    if (active > 0) setShowHint(false);
  }, [active]);

  useEffect(() => {
    if (!caseOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCaseOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const node = caseRef.current;
      if (!node || node.contains(event.target as Node)) return;
      setCaseOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [caseOpen]);

  useEffect(() => {
    let frameId = 0;

    const read = () => {
      const track = trackRef.current;
      if (!track || !scrollStepsEnabled()) return;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (rect.top > window.innerHeight * 0.45) return;
      if (rect.bottom < window.innerHeight * 0.4) return;
      const passed = Math.min(scrollable, Math.max(0, -rect.top));
      const index = Math.min(
        arenas.length - 1,
        Math.floor((passed / scrollable) * arenas.length),
      );
      if (lockRef.current !== null) {
        if (index === lockRef.current) lockRef.current = null;
        return;
      }
      if (index === activeRef.current) return;
      activeRef.current = index;
      setActive(index);
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(read);
    };

    const release = () => {
      lockRef.current = null;
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
    };
  }, []);

  function zoomBy(delta: number) {
    const board = boardRef.current;
    if (!board) return;
    const width = board.clientWidth;
    const height = board.clientHeight;
    setView((current) => {
      const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, current.scale + delta));
      const wx = (width / 2 - current.x) / current.scale;
      const wy = (height / 2 - current.y) / current.scale;
      return { scale, x: width / 2 - wx * scale, y: height / 2 - wy * scale };
    });
    moved.current = true;
    setShowHint(false);
    setSettling(true);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("[data-arena-control]")) return;
    const board = boardRef.current;
    if (!board) return;
    drag.current = {
      id: event.pointerId,
      sx: event.clientX,
      sy: event.clientY,
      ox: view.x,
      oy: view.y,
      moved: false,
      axis: null,
    };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const current = drag.current;
    const board = boardRef.current;
    if (!current || !board || current.id !== event.pointerId) return;
    const dx = event.clientX - current.sx;
    const dy = event.clientY - current.sy;
    if (!current.axis) {
      if (Math.hypot(dx, dy) < 6) return;
      current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (current.axis === "y") {
        drag.current = null;
        return;
      }
      board.setPointerCapture(event.pointerId);
      setGrabbing(true);
      setSettling(false);
    }
    current.moved = true;
    moved.current = true;
    suppressClick.current = true;
    setShowHint(false);
    setView({ x: current.ox + dx, y: current.oy + dy, scale: view.scale });
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (drag.current?.id === event.pointerId) drag.current = null;
    setGrabbing(false);
  }

  return (
    <section id="challenges" className="bg-ink text-paper">
      <header className="pt-16 lg:pt-24">
        <div className="relative px-5 pb-2 text-center lg:px-8">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none font-display tracking-[0.02em]">
            Pick a <span className="text-blue-500">game.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md font-mono text-base leading-snug text-paper/60">
            Numbers and Logic are open.
            <br className="sm:hidden" /> Computer science, a daily problem,
            and a challenge you can send are on the way.
          </p>
        </div>
      </header>

      <div
        ref={trackRef}
        className="arena-track relative mt-10 pb-16 md:mt-12 md:pb-0 lg:mt-14"
        style={{ ["--arena-steps" as string]: arenas.length + 0.35 }}
      >
      <div className="arena-stage relative">
      <div className="arena-wash" />
      <div className="relative grid w-full items-center gap-8 px-5 md:grid-cols-2 md:gap-8 lg:px-8 xl:px-16">
        <div
          ref={boardRef}
          className={cn(
            "arena-board relative h-[min(52svh,460px)] min-h-[380px] overflow-hidden rounded-lg border border-white/10 md:h-[min(440px,48vh)] md:min-h-0 lg:h-[min(500px,52vh)]",
            grabbing && "is-grabbing",
            ready ? "opacity-100" : "opacity-0",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={(event) => {
            if ((event.target as HTMLElement).closest("[data-arena-control]")) return;
            settleTo(home.current);
          }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src="/art/arena-numbers.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="pointer-events-none object-cover opacity-80"
            style={{ transform: "translate(-6%, -12%) scale(1.65)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/15" />

          <div
            className={cn("arena-plane absolute top-0 left-0", settling && "is-settling")}
            style={{
              width: BOARD,
              height: BOARD,
              ["--x" as string]: `${view.x}px`,
              ["--y" as string]: `${view.y}px`,
              ["--s" as string]: view.scale,
            }}
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget) setSettling(false);
            }}
          >
            {Array.from({ length: COLS + 1 }, (_, index) => {
              const pos = index === COLS ? BOARD - 1 : index * STRIDE;
              return (
                <span key={`line-${index}`}>
                  <span
                    className="absolute top-0 w-px bg-white/35"
                    style={{ left: pos, height: BOARD }}
                  />
                  <span
                    className="absolute left-0 h-px bg-white/35"
                    style={{ top: pos, width: BOARD }}
                  />
                </span>
              );
            })}

            {arenas.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-tile={item.id}
                  aria-pressed={selected}
                  onClick={() => {
                    if (suppressClick.current) {
                      suppressClick.current = false;
                      return;
                    }
                    select(index);
                  }}
                  className={cn(
                    "group absolute flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-black/10 bg-white px-6 text-center text-ink transition-colors",
                    selected ? "bg-white" : "bg-white/75 hover:bg-white/90",
                  )}
                  style={{
                    left: (item.col - 1) * STRIDE,
                    top: (item.row - 1) * STRIDE,
                    width: CELL,
                    height: CELL,
                    boxShadow: selected ? `0 0 0 3px ${arenaWash[item.id]}` : undefined,
                  }}
                >
                  <span className="font-mono text-sm tracking-[0.08em] text-mist uppercase md:text-[11px]">
                    <span className={selected ? "text-volt" : undefined}>{item.topic}</span>
                  </span>
                  <span className="relative block size-16 shrink-0 overflow-hidden rounded-full bg-[#d8c89e] md:size-20">
                    <Image
                      src={item.circle}
                      alt=""
                      fill
                      sizes="80px"
                      className={cn(
                        "object-cover transition duration-300",
                        selected ? "scale-100 grayscale-0" : "grayscale group-hover:scale-105",
                      )}
                    />
                  </span>
                  <span className="flex w-full flex-col items-center gap-1">
                    <span className="line-clamp-2 w-full text-3xl leading-none font-semibold md:line-clamp-none md:truncate md:text-xl md:font-normal">
                      {item.title}
                    </span>
                    <span className="line-clamp-2 w-full text-base leading-tight text-ink/60 md:truncate md:text-sm">
                      {item.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-2 left-2 z-10 flex gap-1">
            <ZoomButton
              label="Zoom out"
              disabled={view.scale <= MIN_SCALE + 0.001}
              onClick={() => zoomBy(-0.15)}
            >
              <path d="M2 7h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </ZoomButton>
            <ZoomButton
              label="Zoom in"
              disabled={view.scale >= MAX_SCALE - 0.001}
              onClick={() => zoomBy(0.15)}
            >
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </ZoomButton>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute right-2 bottom-2 z-10 rounded-full border border-black/10 bg-paper/80 px-3 py-1.5 font-mono text-[10px] tracking-[0.02em] transition duration-200",
              offCenter ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            Double-click to reset
          </div>

          <div
            className={cn(
              "pointer-events-none absolute top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-ink px-3.5 py-2 font-mono text-[11px] tracking-[0.02em] text-paper transition-opacity duration-300",
              showHint ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="arena-drag-cursor inline-flex" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 7h7M3.5 7l2-2M3.5 7l2 2M10.5 7l-2-2M10.5 7l-2 2"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="md:hidden">Drag to explore</span>
            <span className="hidden md:inline">Scroll to the next</span>
          </div>
        </div>

        <div key={arena.id} className="arena-swap flex min-w-0 flex-col lg:py-6">
          <div className="flex items-end justify-between gap-4">
            <div>
            
              <h3 className="mt-2 font-display text-6xl leading-none font-normal tracking-[0.03em] md:text-7xl">
                {arena.title}
              </h3>
            </div>
          </div>

          <p className="mt-4 max-w-md text-lg leading-snug text-paper/80">{arena.lede}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-paper/55">{arena.body}</p>

          <div
            ref={caseRef}
            className={cn("relative mt-6", caseOpen && "z-20")}
            onPointerEnter={(event) => {
              if (event.pointerType === "touch") return;
              setCaseOpen(true);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "touch") return;
              setCaseOpen(false);
            }}
          >
            <div className="grid grid-cols-3 gap-2">
              <HudStat label="Status" value={arena.topic} accent={wash} />
              <HudStat label="Play" value={arena.subtitle.split("·")[0].trim()} />
              <HudStat label="Round" value={pad(active + 1)} />
            </div>
            {research ? (
              <CasePopup post={research} open={caseOpen} href={arena.cta.href} onOpen={arena.cta.onClick} />
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            
            <button
              type="button"
              className="font-mono text-[11px] tracking-[0.14em] text-paper/55 uppercase sm:ml-1"
              aria-expanded={caseOpen}
              aria-controls="arena-case"
              onClick={() => setCaseOpen((open) => !open)}
            >
              Why it works
            </button>
          </div>

          <nav
            aria-label="Arenas"
            className="mt-8 flex items-center  gap-1 rounded-full  bg-black/45 p-1.5 backdrop-blur-md"
          >
            <NavButton label="Previous arena" onClick={() => stepArena(-1)} />
            <div className="flex min-w-0  flex-1 items-center justify-center gap-2 px-2" role="tablist">
              {arenas.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-label={item.title}
                  aria-selected={index === active}
                  onClick={() => select(index)}
                  className={cn(
                    "h-1.5 rounded-full bg-paper/25 transition-all duration-300",
                    index === active ? "w-6" : "w-1.5",
                  )}
                  style={index === active ? { backgroundColor: wash } : undefined}
                />
              ))}
            </div>
            <p className="pr-2 font-mono text-[11px] tracking-[0.12em] tabular-nums">
              <span style={{ color: wash }}>{pad(active + 1)}</span>
              <span className="text-paper/35"> / {pad(arenas.length)}</span>
            </p>
            <NavButton label="Next arena" direction="next" onClick={() => stepArena(1)} />
          </nav>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}

const caseHints: Record<string, string> = {
  numbers: "Seen it before? It comes back faster.",
  logic: "Slow down on the clue you want to skip.",
  "computer-science": "Same problem. Cheaper path.",
  daily: "One tomorrow beats ten tonight.",
  versus: "Rematch a puzzle you know. That’s when it helps.",
};

const caseThemes: Record<string, { bg: string; fg: string }> = {
  numbers: { bg: "#3dce55", fg: "#000000" },
  logic: { bg: "#2f6fed", fg: "#f5f2ea" },
  "computer-science": { bg: "#5ec8ff", fg: "#000000" },
  daily: { bg: "#f0c020", fg: "#000000" },
  versus: { bg: "#ef3b2e", fg: "#ffffff" },
};

function CasePopup({
  post,
  open,
  href,
  onOpen,
}: {
  post: ResearchPost;
  open: boolean;
  href: string;
  onOpen: () => void;
}) {
  const mark = post.motif.metric.charAt(0) + post.motif.metric.slice(1).toLowerCase();
  const hint = caseHints[post.slug] ?? post.lede;
  const theme = caseThemes[post.slug] ?? caseThemes.daily;

  return (
    <div
      id="arena-case"
      role="region"
      aria-label={`${post.arena} research case`}
      aria-hidden={!open}
      inert={open ? undefined : true}
      className={cn(
        "absolute top-full left-0 z-20 w-[min(16rem,100%)] origin-top-left sm:left-auto sm:right-0 sm:w-[14.5rem] sm:origin-top-right",
        "motion-safe:transition motion-safe:duration-150",
        open
          ? "visible translate-y-0 scale-100 opacity-100"
          : "pointer-events-none invisible -translate-y-1 scale-95 opacity-0",
      )}
    >
      <span
        aria-hidden="true"
        className="ml-8 block size-2.5 translate-y-1 rotate-45 sm:mr-8 sm:ml-auto"
        style={{ backgroundColor: theme.bg }}
      />
      <div className="rounded-2xl px-4 pt-3 pb-3.5" style={{ backgroundColor: theme.bg, color: theme.fg }}>
        <p className="font-display text-[2.4rem] leading-none tracking-[0.02em]">{mark}</p>
        <p className="mt-1.5 text-[13px] leading-snug">{hint}</p>
        <Link
          href={href}
          onClick={onOpen}
          className="mt-2 inline-block text-[13px] underline decoration-current/35 underline-offset-[3px] hover:decoration-current"
          style={{ color: theme.fg }}
        >
          Why it works
        </Link>
      </div>
    </div>
  );
}

function HudStat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-white/8 px-3 py-3">
      <p className="font-mono text-[10px] tracking-[0.14em] text-paper/40 uppercase">{label}</p>
      <p
        className="mt-2 truncate font-display text-2xl leading-none tracking-[0.03em]"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function NavButton({
  label,
  direction = "prev",
  onClick,
}: {
  label: string;
  direction?: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 shrink-0 place-items-center rounded-full text-paper/80 transition-colors hover:bg-white/10 hover:text-paper"
    >
      <Chevron direction={direction} />
    </button>
  );
}

function ZoomButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-arena-control
      aria-label={label}
      disabled={disabled}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-full border border-black/10 bg-paper/80 text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}

function Chevron({
  direction = "prev",
  className,
}: {
  direction?: "prev" | "next";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path d={direction === "next" ? "M6 4l4 4-4 4" : "M10 4 6 8l4 4"} />
    </svg>
  );
}
