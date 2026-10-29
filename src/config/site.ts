import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Two5",
  tagline: "Train. Track. Outplay.",
  headline: "Give your brain a run.",
  description:
    "Train your thinking with purposeful mental challenges. Track your progress and get ready to compete. Join the Two5 waitlist for a chance at early access.",
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
    { label: "Roadmap", href: "/roadmap", index: "03" },
    { label: "Research", href: "/research", index: "04" },
    { label: "FAQ", href: "#faq", index: "05" },
  ] satisfies NavItem[],
};
