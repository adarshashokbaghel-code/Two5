import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Two5",
  tagline: "Your Brain’s Gym.",
  headline: "Think fast. Know more. Compete.",
  description:
    "From Mathematics and Logical Reasoning to Computer Science and DSA, Two5 turns the subjects you enjoy into challenges worth solving — and scores worth beating.",
  url: "https://two5.in",
  nav: [
    { label: "The experience", href: "#experience", index: "01" },
    { label: "Challenges", href: "#challenges", index: "02" },
    { label: "FAQ", href: "#faq", index: "03" },
  ] satisfies NavItem[],
};
