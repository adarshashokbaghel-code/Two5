import Image from "next/image";
import type { ReactNode } from "react";

const figures = {
  numbers: {
    image: "/art/numbers-25-green.jpg",
    alt: "A green geometric 25, the Numbers arena",
    play: "Sequences",
    index: "01",
    mark: "Fluency",
  },
  logic: {
    image: "/art/offer-logic.jpg",
    alt: "A connected node, the Logic arena",
    play: "Deduce",
    index: "02",
    mark: "Care",
  },
  cs: {
    image: "/art/offer-cs.jpg",
    alt: "A blue glass tree, the Computer Science arena",
    play: "Algorithms",
    index: "03",
    mark: "Steps",
  },
  memory: {
    image: "/art/offer-daily-line.jpg",
    alt: "Memory and visual recall, the Memory and Visual arena",
    play: "Recall",
    index: "04",
    mark: "Visual",
  },
} as const;

export type FigureId = keyof typeof figures;

type Figure = (typeof figures)[FigureId];

const slugToFigure: Record<string, FigureId> = {
  numbers: "numbers",
  logic: "logic",
  cs: "cs",
  "computer-science": "cs",
  "memory-visual": "memory",
  daily: "memory",
  versus: "memory",
};

export function ResearchFigure({
  arena,
  compact = false,
  piece = "all",
}: {
  arena: string;
  compact?: boolean;
  piece?: "all" | "lead" | "row";
}) {
  const figure = figures[slugToFigure[arena] ?? "numbers"];

  if (compact) return <CompactMark figure={figure} />;
  if (piece === "lead") return <LeadMark figure={figure} />;
  if (piece === "row") return <ScoreRow figure={figure} />;

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <LeadMark figure={figure} />
      <ScoreRow figure={figure} />
    </div>
  );
}

function Medallion({ figure, size }: { figure: Figure; size: "sm" | "md" }) {
  return (
    <div
      className={
        size === "sm"
          ? "relative size-12 shrink-0 overflow-hidden rounded-full bg-[#efece4]"
          : "relative mx-auto size-20 overflow-hidden rounded-full bg-[#efece4]"
      }
    >
      <Image
        src={figure.image}
        alt={size === "sm" ? "" : figure.alt}
        fill
        sizes={size === "sm" ? "48px" : "80px"}
        className="object-cover"
      />
    </div>
  );
}

function LeadMark({ figure }: { figure: Figure }) {
  return (
    <figure className="px-6 py-7">
      <figcaption className="flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
        <span>Arena {figure.index}</span>
        <span className="text-volt">{figure.mark}</span>
      </figcaption>
      <div className="mt-8">
        <Medallion figure={figure} size="md" />
      </div>
      <p className="mt-6 text-center font-display text-2xl leading-none font-normal tracking-[0.02em]">
        {figure.play}
      </p>
      <div className="mx-auto mt-4 h-px w-10 bg-volt" aria-hidden="true" />
    </figure>
  );
}

function CompactMark({ figure }: { figure: Figure }) {
  return (
    <figure className="flex items-center gap-4 px-4 py-3.5">
      <Medallion figure={figure} size="sm" />
      <figcaption className="min-w-0 flex-1">
        <p className="font-mono text-[10px] tracking-[0.14em] text-mist uppercase">
          Arena {figure.index}
        </p>
        <p className="mt-1 truncate font-display text-xl leading-none font-normal tracking-[0.02em]">
          {figure.play}
        </p>
      </figcaption>
      <p className="font-mono text-[10px] tracking-[0.14em] text-volt uppercase">{figure.mark}</p>
    </figure>
  );
}

function ScoreRow({ figure }: { figure: Figure }) {
  return (
    <div className="grid grid-cols-3 border border-ink/10" aria-hidden="true">
      <Cell label="Round" value={figure.index}>
        <Ticks />
      </Cell>
      <Cell label="Play" value={figure.play}>
        <Ring />
      </Cell>
      <Cell label="Mark" value={figure.mark}>
        <Rule />
      </Cell>
    </div>
  );
}

function Cell({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 border-ink/10 px-3 py-4 sm:px-4 [&:not(:last-child)]:border-r">
      <p className="font-mono text-[10px] tracking-[0.14em] text-mist uppercase">{label}</p>
      <div className="text-ink/80">{children}</div>
      <p className="truncate font-mono text-[11px] tracking-[0.04em] text-ink/80">{value}</p>
    </div>
  );
}

function Ticks() {
  const heights = [8, 12, 16, 20, 26];
  return (
    <svg viewBox="0 0 72 28" className="h-7 w-16" fill="none" aria-hidden="true">
      {heights.map((height, index) => (
        <line
          key={height}
          x1={4 + index * 14}
          y1="28"
          x2={4 + index * 14}
          y2={28 - height}
          stroke={index === heights.length - 1 ? "#1060f8" : "#d9d4ca"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function Ring() {
  return (
    <svg viewBox="0 0 28 28" className="size-7" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="#d9d4ca" strokeWidth="1.5" />
      <circle cx="14" cy="4" r="2" fill="#1060f8" />
    </svg>
  );
}

function Rule() {
  return (
    <svg viewBox="0 0 72 8" className="mt-2.5 h-2 w-16" fill="none" aria-hidden="true">
      <line x1="0" y1="4" x2="72" y2="4" stroke="#e6e2d8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="4" x2="28" y2="4" stroke="#1060f8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
