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
  statusLabel: "Launch" | "Coming soon";
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
    summary: "Calculation, numerical fluency and number patterns.",
    modes: ["Number Sprint", "Sequence Hunt", "Target Number"],
    why: "A launch category. Short rounds you can score, then try to beat your own best.",
    status: "mvp",
    statusLabel: "Launch",
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
    summary: "Deduction, hidden rules and problem-solving.",
    modes: ["Pattern Breaker", "Hidden Rule", "Logic Grid"],
    why: "A launch category for people who prefer reasoning over fast arithmetic.",
    status: "mvp",
    statusLabel: "Launch",
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
    summary: "Code tracing, algorithms and computational thinking.",
    modes: ["Binary Blitz", "Code Trace", "Bug Hunt"],
    why: "Planned for later. Not playable at launch, and it will not require a full coding environment.",
    status: "expansion",
    statusLabel: "Coming soon",
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
    why: "Planned for later. A more visual way to play, not available in the first release.",
    status: "expansion",
    statusLabel: "Coming soon",
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
