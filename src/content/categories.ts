export type CategoryStatus = "mvp" | "expansion";

export type Two5Category = {
  id: string;
  slug: string;
  index: string;
  title: string;
  lineupTag: string;
  summary: string;
  modes: [string, string, string];
  why: string;
  status: CategoryStatus;
  statusLabel: "MVP" | "Next expansion";
  live: boolean;
  accent: string;
  ink: string;
  backdrop: string;
  heroArt: string;
  thumb: string;
  phoneScreen: 0 | 1 | 2 | 3;
  phoneBg: string;
};

export const two5Categories: Two5Category[] = [
  {
    id: "numbers",
    slug: "numbers",
    index: "01",
    title: "Numbers",
    lineupTag: "Number sense",
    summary: "Calculation, number sense and numerical patterns.",
    modes: ["Number Sprint", "Sequence Hunt", "Target Number"],
    why: "The easiest category to understand, score and compete in. It provides a strong foundation for Risk & Reward and Lock In.",
    status: "mvp",
    statusLabel: "MVP",
    live: true,
    accent: "#3dce55",
    ink: "#000000",
    backdrop: "/brand/arena-bg-numbers.jpg",
    heroArt: "/art/numbers-25-green.jpg",
    thumb: "/art/numbers-object.jpg",
    phoneScreen: 0,
    phoneBg: "#0f1410",
  },
  {
    id: "logic",
    slug: "logic",
    index: "02",
    title: "Logic",
    lineupTag: "Deduce",
    summary: "Deduction, patterns and problem-solving.",
    modes: ["Pattern Breaker", "Hidden Rule", "Logic Grid"],
    why: "Adds a different kind of challenge for people who prefer reasoning over fast arithmetic.",
    status: "mvp",
    statusLabel: "MVP",
    live: true,
    accent: "#1060f8",
    ink: "#f5f2ea",
    backdrop: "/brand/arena-bg-logic.jpg",
    heroArt: "/art/offer-logic.jpg",
    thumb: "/art/offer-logic.jpg",
    phoneScreen: 0,
    phoneBg: "#0a0f18",
  },
  {
    id: "cs",
    slug: "computer-science",
    index: "03",
    title: "Computer Science",
    lineupTag: "Algorithms",
    summary: "Computational thinking and code logic.",
    modes: ["Binary Blitz", "Code Trace", "Bug Hunt"],
    why: "Differentiates Two5 for technical students and professionals without requiring a full programming environment.",
    status: "expansion",
    statusLabel: "Next expansion",
    live: false,
    accent: "#5ec8ff",
    ink: "#000000",
    backdrop: "/brand/arena-bg-cs.jpg",
    heroArt: "/art/offer-cs.jpg",
    thumb: "/art/offer-cs.jpg",
    phoneScreen: 2,
    phoneBg: "#0a1014",
  },
  {
    id: "memory-visual",
    slug: "memory-visual",
    index: "04",
    title: "Memory & Visual",
    lineupTag: "Recall",
    summary: "Recall, visual recognition and spatial reasoning.",
    modes: ["Flash Recall", "Grid Memory", "Visual Sequence"],
    why: "Broadens the audience beyond maths and coding, and introduces a more visual style of play.",
    status: "expansion",
    statusLabel: "Next expansion",
    live: false,
    accent: "#f0c020",
    ink: "#000000",
    backdrop: "/brand/arena-bg-daily.jpg",
    heroArt: "/art/offer-daily-line.jpg",
    thumb: "/art/offer-daily-line.jpg",
    phoneScreen: 3,
    phoneBg: "#14120a",
  },
];

export const mvpCategoryCount = two5Categories.filter((c) => c.status === "mvp").length;
