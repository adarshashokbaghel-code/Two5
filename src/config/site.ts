import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Two5",
  tagline: "Play a sharper game.",
  headline: "Think fast. Know more. Compete.",
  description:
    "Numbers, logic, and computer science, turned into short rounds you can play. Beat a score. Send one to a friend.",
  url: "https://two5.in",
  nav: [
    { label: "Play", href: "#experience", index: "01" },
    { label: "What", href: "#challenges", index: "02" },
    { label: "Learn", href: "/research", index: "03" },
    { label: "FAQ", href: "#faq", index: "04" },
  ] satisfies NavItem[],
};
