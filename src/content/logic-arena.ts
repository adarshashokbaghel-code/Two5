export const logicPath = "/categories/logic";

export const logicTitle = "Logic & Patterns – OddOne, Missing & Switch | Two5";

export const logicDescription =
  "Logic games and pattern games on Two5: OddOne, Missing and Switch. A brain-game arena for reasoning, still in design. Nothing on this page opens a round.";

export const logicGames = [
  {
    id: "odd-one",
    index: "01",
    name: "OddOne",
    tagline: "Spot what doesn't fit.",
    description: "Find the item that breaks the pattern. Look closer, identify the rule, and make your move.",
    how: "A round would show a small set of items. One of them breaks a single rule. The task is to find that one.",
    interesting:
      "The set looks even until the rule is visible. The work is naming what the others share, then finding the item that does not.",
    skill: "Classification, relational reasoning, and pattern recognition.",
    modes:
      "Training, Solo and Compete are planned for OddOne. This page does not open a round, and the game screen is not shown here.",
  },
  {
    id: "missing",
    index: "02",
    name: "Missing",
    tagline: "Complete the pattern.",
    description: "One tile is missing. Study the grid, discover the relationship, and choose the piece that completes it.",
    how: "A round would show a small grid with one empty place, and a few possible tiles. One relationship decides the missing piece.",
    interesting:
      "The grid is a rule in space. A row, a column, or a turn can be enough. The empty place is where that rule has to hold.",
    skill: "Visual pattern recognition and relational reasoning.",
    modes:
      "Training, Solo and Compete are planned for Missing. This page does not open a grid, and the game screen is not shown here.",
  },
  {
    id: "switch",
    index: "03",
    name: "Switch",
    tagline: "The rules just changed.",
    description: "Follow a rule, then adapt when it changes. Stay sharp, ignore the old rule, and react correctly.",
    how: "A round would name a rule, then change it. The change would be signalled. After that, the old rule would no longer count.",
    interesting:
      "The hard part is stopping. The previous rule still feels active. Switch is about following the rule that is actually on screen.",
    skill: "Rule switching, cognitive flexibility, and response inhibition.",
    modes:
      "Training, Solo and Compete are planned for Switch. This page does not open a round, and the game screen is not shown here.",
  },
] as const;

export const logicLinks = [
  { href: "/categories/numbers", label: "The Numbers arena" },
  { href: "/categories/memory-visual", label: "Memory & Visual" },
  { href: "/#challenges", label: "All arenas" },
  { href: "/research/logic", label: "Research note on logic" },
  { href: "/blog/logic-puzzles-with-answers", label: "Logic puzzles, with answers" },
] as const;
