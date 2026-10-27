import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Two5",
  tagline: "Play a sharper game.",
  headline: "Think fast. Know more. Compete.",
  description:
    "Two5 is a competitive brain-challenge game in development. Numbers and Logic come first; Computer Science and Memory & Visual follow. Join the waitlist.",
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
