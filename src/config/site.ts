import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Two5",
  tagline: "Play a sharper game.",
  headline: "Think fast. Know more. Compete.",
  description:
    "Two5 — the first four categories: Numbers and Logic (MVP), plus Computer Science and Memory & Visual next. Short scored rounds you can play and improve.",
  url: "https://two5.in",
  nav: [
    { label: "Play", href: "#how", index: "01" },
    { label: "Arenas", href: "#challenges", index: "02" },
    { label: "Research", href: "/research", index: "03" },
    { label: "FAQ", href: "#faq", index: "04" },
  ] satisfies NavItem[],
};
