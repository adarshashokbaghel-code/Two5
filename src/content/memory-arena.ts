export const memoryPath = "/categories/memory-visual";

export const memoryTitle = "Memory & Visual Games – Flash Grid, Snapshot & Pattern Forge | Two5";

export const memoryDescription =
  "Visual memory, observation and spatial thinking on Two5: Flash Grid, Snapshot and Pattern Forge. A later arena. Nothing on this page opens a round.";

export const memoryGames = [
  {
    id: "flash-grid",
    index: "01",
    name: "Flash Grid",
    tagline: "Remember the sequence. Recreate the pattern.",
    description: "How far can your memory take you?",
    how: "A round would light tiles on a grid, one after another, then clear the board. The task is to replay that order.",
    interesting:
      "The places are easy. The order is the work. A longer run, or a shorter pause between lights, is what makes the same grid harder to hold.",
    skill: "Visual memory.",
    withheld: "A lit sequence on a grid is not drawn here.",
    modes:
      "Training, Solo and Compete are planned for Flash Grid. This page does not open a grid, and the game screen is not shown here.",
  },
  {
    id: "snapshot",
    index: "02",
    name: "Snapshot",
    tagline: "Look closer. Remember the details.",
    description: "Find what changed before time runs out.",
    how: "A round would show a scene, then a change: something missing, a new colour, or an object that has moved. The task is to name that change.",
    interesting:
      "The scene looks settled until one detail does not. Snapshot is about holding the first look long enough to notice the second.",
    skill: "Visual observation and recall.",
    withheld: "A before-and-after scene is not drawn here.",
    modes:
      "Training, Solo and Compete are planned for Snapshot. This page does not open a scene, and the game screen is not shown here.",
  },
  {
    id: "pattern-forge",
    index: "03",
    name: "Pattern Forge",
    tagline: "Rotate, reflect and complete.",
    description: "Understand the pattern and predict what comes next.",
    how: "A round would show a shape changing by a turn or a mirror, then ask for the shape that change produces.",
    interesting:
      "The rule is a transformation. Once the turn or the mirror line is clear, the next shape follows. Until then, the row is just a set of pictures.",
    skill: "Spatial thinking.",
    withheld: "A turn or a mirror is not drawn here.",
    modes:
      "Training, Solo and Compete are planned for Pattern Forge. This page does not open a puzzle, and the game screen is not shown here.",
  },
] as const;

export const memoryLinks = [
  { href: "/categories/numbers", label: "The Numbers arena" },
  { href: "/categories/logic", label: "Logic & Patterns" },
  { href: "/#challenges", label: "All arenas" },
  { href: "/research/memory-visual", label: "Research note on memory and visual recall" },
] as const;
