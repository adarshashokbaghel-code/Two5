import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Two5",
  tagline: "Train. Track. Outplay.",
  headline: "Give your brain a run.",
  description:
    "Two5 is a training-first mental game in development. Short challenges in Numbers and Logic come first, with personal bests to chase. Computer Science and Memory & Visual follow. Join the waitlist.",
  url: "https://www.two5.in",
  /** Geometric 25 mark. Flat colours from the original maths logo, without the grain. */
  logo: "/brand/logo-mark.png",
  logoIcon192: "/brand/icon-192.png",
  logoIcon512: "/brand/icon-512.png",
  ogImage: "/brand/og-default.jpg",
  themeColor: "#ffffff",
  nav: [
    { label: "Play", href: "#how", index: "01" },
    { label: "Arenas", href: "#challenges", index: "02" },
    { label: "Research", href: "/research", index: "03" },
    { label: "FAQ", href: "#faq", index: "04" },
  ] satisfies NavItem[],
};
