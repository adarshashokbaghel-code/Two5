import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Two5",
  tagline: "Play a sharper game.",
  headline: "Think fast. Know more. Compete.",
  description:
    "Two5 — the first four categories: Numbers and Logic (MVP), plus Computer Science and Memory & Visual next. Short scored rounds you can play and improve.",
  url: "https://two5.in",
  /** Canonical brand mark (logo 04 — slash glyph, green→yellow→blue→red) */
  logo: "/brand/logo-mark.png",
  logoIcon192: "/brand/icon-192.png",
  logoIcon512: "/brand/icon-512.png",
  ogImage: "/brand/og-default.jpg",
  themeColor: "#22C55E",
  nav: [
    { label: "Play", href: "#how", index: "01" },
    { label: "Arenas", href: "#challenges", index: "02" },
    { label: "Research", href: "/research", index: "03" },
    { label: "FAQ", href: "#faq", index: "04" },
  ] satisfies NavItem[],
};
