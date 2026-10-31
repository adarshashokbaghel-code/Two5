import type { SeoPage } from "@/content/seo/types";

const createdAt = "2026-10-31";
const updatedAt = "2026-10-31";

const limit =
  "Practising a puzzle makes you more fluent at that kind of puzzle. It does not establish a gain in general intelligence, or in performance outside the skill being practised.";

export const seoPages: SeoPage[] = [
  {
    id: "game-target-25",
    path: "/numbers/games/target-25",
    pageType: "game",
    category: "numbers",
    game: "target-25",
    h1: "Target 25",
    metaTitle: "Target 25: build a path to the target",
    metaDescription:
      "How Target 25 is meant to work: combine numbers and operations to reach a target. One worked path to 25, and a clear note that rounds are not open yet.",
    primaryKeyword: "target number puzzle",
    secondaryKeywords: ["reach the target number", "arithmetic operation puzzle", "make 25 using numbers"],
    searchIntent: "game-seeking",
    introduction:
      "Target 25 is a planned Numbers game. A round gives you a small set of numbers and a target. You combine those numbers with operations until the expression equals the target. You cannot play a round on this page.",
    sections: [
      {
        heading: "What a round is for",
        paragraphs: [
          "The interesting part is the path, not the moment you notice that the target is 25. Several pairings can be tried before one of them lands. The search is which numbers to pair and which operation to use.",
          "Number-use constraints, the operations that will be allowed, and the scoring are still being designed. Nothing on this page is a final rulebook.",
        ],
      },
      {
        heading: "One worked path",
        paragraphs: [
          "Take 8, 3, 6 and 1, and the target 25. One valid path is (8 − 3) × (6 − 1). That is 5 × 5, which is 25.",
          "The same four numbers can land on 25 another way: (6 × 3) + 8 − 1. Eighteen plus 8 is 26, and subtracting 1 leaves 25. Other paths may exist. Finding one does not exhaust the puzzle.",
        ],
      },
      {
        heading: "How the three modes would use it",
        paragraphs: [
          "In Training, a worked path can show why a solution holds. In Solo, you try the construction on your own. In Compete, the same kind of target can be given to more than one player. Those modes are planned. They are not open here.",
          limit,
        ],
      },
    ],
    strategies: [
      "Keep the target in view before you spend a number.",
      "Look for a pair that makes a friendly factor of the target, such as 5 when the target is 25.",
      "If the first expression misses, change one operation rather than starting from a blank page.",
    ],
    faq: [
      {
        question: "Can I play Target 25 on Two5 today?",
        answer: "No. Target 25 is planned. This page explains the idea and one worked example. It does not start a round, a score, or a match.",
      },
      {
        question: "Is there only one way to make 25?",
        answer:
          "Not in the example with 8, 3, 6 and 1. At least two expressions land on 25. Which operations a future round will allow is not settled.",
      },
    ],
    related: [
      {
        href: "/numbers/puzzles/make-25-from-8-3-6-and-1",
        label: "Solve 8, 3, 6 and 1",
        description: "The same example, with the answer hidden until you ask for it.",
      },
      {
        href: "/blog/math-puzzles-for-adults",
        label: "Math puzzles for adults",
        description: "A wider set of constraint puzzles, with answers.",
      },
      { href: "/categories/numbers", label: "The Numbers arena", description: "Target 25, Sequence and Pinpoint together." },
    ],
    parentPath: "/categories/numbers",
    references: [
      {
        label: "Nieder, The Calculating Brain, Physiological Reviews (2025)",
        href: "https://doi.org/10.1152/physrev.00014.2024",
      },
    ],
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "game-sequence",
    path: "/numbers/games/sequence",
    pageType: "game",
    category: "numbers",
    game: "sequence",
    h1: "Sequence",
    metaTitle: "Sequence: find the pattern in the row",
    metaDescription:
      "Sequence is a planned Numbers game about the rule hiding in a row of numbers. Three challenge types are planned. Rounds are not playable here.",
    primaryKeyword: "sequence number game",
    secondaryKeywords: ["complete the sequence", "find the incorrect number", "number pattern reasoning"],
    searchIntent: "game-seeking",
    introduction:
      "Sequence is a planned Numbers game. A round shows a run of numbers. The task is to read the relationship between them, then answer the question that relationship poses. The row is a rule in disguise until the steps are visible.",
    sections: [
      {
        heading: "Three planned challenge types",
        paragraphs: [
          "Complete the sequence: the row stops early and you supply the next term. Find the incorrect number: one term breaks an otherwise steady rule. Identify the underlying rule: you name the relationship, not only the next value.",
          "Those are the types we are designing. A future round will say which question it is asking. This page does not run one.",
        ],
      },
      {
        heading: "What the row is hiding",
        paragraphs: [
          "Start with the gaps between neighbours. A gap that grows by a constant is still a simple rule, one level down. If the gaps look noisy, check whether each term is a product of two changing numbers, or whether odd and even positions are separate lists.",
          "The general method, with several original rows and answers, is already written as a guide. This page is the game: what a Sequence round is for, and what it will not claim.",
        ],
      },
      {
        heading: "Training, Solo, Compete",
        paragraphs: [
          "Training can walk through the differences. Solo is the same row, answered without the walkthrough. Compete would put players on a comparable sequence. None of those rounds is playable on this page.",
          limit,
        ],
      },
    ],
    strategies: [
      "Write the differences before you name a rule.",
      "Say the rule in one sentence, then test it against every term, not only the last gap.",
      "If one term refuses the sentence, check for an incorrect number before you invent a more complicated rule.",
    ],
    faq: [
      {
        question: "Is Sequence the same page as the sequence puzzle guide?",
        answer:
          "No. The guide shows how to read a row and works several examples. This page describes the planned Two5 game and the three question types. Rounds are not open.",
      },
      {
        question: "Can I play a Sequence round here?",
        answer: "No. You can solve individual rows linked from this page. That is a puzzle on the page, not a live game.",
      },
    ],
    related: [
      { href: "/numbers/sequences", label: "Sequence challenges", description: "Rows you can solve on the site." },
      {
        href: "/blog/number-sequence-puzzles",
        label: "How to solve number sequences",
        description: "The existing guide: gaps, pattern families, and worked answers.",
      },
      { href: "/categories/numbers", label: "The Numbers arena" },
    ],
    parentPath: "/categories/numbers",
    references: [
      {
        label: "The role of patterning skill in cognitive development and learning, Developmental Review (2025)",
        href: "https://doi.org/10.1016/j.dr.2025.101202",
      },
    ],
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "game-pinpoint",
    path: "/numbers/games/pinpoint",
    pageType: "game",
    category: "numbers",
    game: "pinpoint",
    h1: "Pinpoint",
    metaTitle: "Pinpoint: judge the number, then see the gap",
    metaDescription:
      "Pinpoint is a planned Numbers game about estimating a number. A round can ask for a count, a distance, a duration, or a place on a scale. It is not open yet.",
    primaryKeyword: "number estimation game",
    secondaryKeywords: ["numerical estimation puzzle", "number line estimation", "estimate the answer"],
    searchIntent: "game-seeking",
    introduction:
      "Pinpoint is a planned Numbers game about magnitude. A round asks for an approximate value. You place a judgement. The exact figure is then shown so you can see the gap. The number might be a count, a distance, a duration, or a place on a scale.",
    sections: [
      {
        heading: "What the judgement is",
        paragraphs: [
          "Not every challenge needs the full calculation first. Pinpoint is about deciding what the answer should feel like, then comparing that feeling with the exact figure.",
          "A percentage can be one of the questions a round asks. It is not the game. Treating every Pinpoint prompt as “estimate this percent” would miss counts, distances, durations, and placements on a line.",
        ],
      },
      {
        heading: "A placement, not a percent",
        paragraphs: [
          "One illustration: where does 62 sit on a line from 0 to 100? The exact place is 62, just past the middle. A judgement near 55 is seven units low. The line is a drawing of that idea on the puzzle page. It is not a control and it does not start a round.",
        ],
      },
      {
        heading: "How practice would be organised",
        paragraphs: [
          "Training can unpack one estimate. Solo is a private judgement against the exact value. Compete would compare how close different players landed. The comparison is a plan, not a live match.",
          limit,
        ],
      },
    ],
    strategies: [
      "Find a landmark first: 0, the middle, and the far end.",
      "Place the judgement, then measure the gap. Do not edit the judgement after you see the exact figure and call it the original guess.",
      "Name the kind of number you were asked for — count, distance, time, or position — before you reach for a percentage shortcut.",
    ],
    faq: [
      {
        question: "Is Pinpoint a percentage game?",
        answer:
          "No. A round asks you to judge a number. That number can be a count, a distance, a duration, or a place on a scale. A percentage is one possible question, not the definition of the game.",
      },
      {
        question: "Can I play Pinpoint now?",
        answer: "No. The game is planned. You can read the estimation guide and try the number-line placement linked from this page.",
      },
    ],
    related: [
      {
        href: "/numbers/guides/mental-estimation-techniques",
        label: "Mental estimation techniques",
        description: "Rounding, compatible numbers, and the number line.",
      },
      {
        href: "/numbers/estimation/place-62-on-a-line-from-0-to-100",
        label: "Place 62 between 0 and 100",
        description: "One placement, with the exact point revealed on request.",
      },
      { href: "/categories/numbers", label: "The Numbers arena" },
    ],
    parentPath: "/categories/numbers",
    references: [
      {
        label: "Varieties of number-line estimation, Developmental Review (2024)",
        href: "https://doi.org/10.1016/j.dr.2024.101161",
      },
      {
        label: "Kreis, Groß and Pachur, Real-world estimation taps into basic numeric abilities (2025)",
        href: "https://doi.org/10.3758/s13423-024-02575-4",
      },
    ],
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "puzzle-make-25",
    path: "/numbers/puzzles/make-25-from-8-3-6-and-1",
    pageType: "puzzle",
    category: "numbers",
    game: "target-25",
    h1: "Make 25 from 8, 3, 6 and 1",
    metaTitle: "Make 25 from 8, 3, 6 and 1",
    metaDescription:
      "Use 8, 3, 6 and 1 once each to make 25. See a hint, then reveal two expressions that land on the target.",
    primaryKeyword: "make 25 from 8 3 6 and 1",
    secondaryKeywords: ["make 25 using numbers", "number combination challenge"],
    searchIntent: "informational",
    introduction:
      "Use 8, 3, 6 and 1 once each. You may add, subtract, multiply, divide, and use brackets. Make the expression equal 25. This is a puzzle on the page. It is the example behind Target 25, and it is not a live round.",
    sections: [
      {
        heading: "The constraint",
        paragraphs: [
          "Each of the four numbers has to appear once. You cannot bring in a 5 from outside, even though 5 × 5 is a tempting picture of 25. If a 5 appears, it has to be built from the numbers you were given.",
          "The operations allowed in a future Target 25 round are not fixed yet. For this puzzle, ordinary arithmetic and brackets are enough.",
        ],
      },
      {
        heading: "What to try first",
        paragraphs: [
          "25 is 5 × 5. That suggests looking for two ways to make 5 from what you have. It is also 18 + 7, or 26 − 1, if those pieces are easier to build from 6, 3, 8 and 1.",
        ],
      },
    ],
    challenge: {
      prompt: "Make 25. Use 8, 3, 6 and 1 once each, with ordinary arithmetic and brackets.",
      difficulty: "medium",
      hint: "25 is 5 × 5. Can you build each 5 from a pair?",
      answer: "(8 − 3) × (6 − 1) = 25",
      steps: [
        "8 − 3 is 5.",
        "6 − 1 is 5.",
        "5 × 5 is 25.",
        "Each of 8, 3, 6 and 1 is used once.",
      ],
      alternatives: ["(6 × 3) + 8 − 1 = 18 + 8 − 1 = 25. Again each number is used once."],
    },
    strategies: [
      "Factor the target before you combine at random.",
      "Check that every given number appears once before you accept an expression.",
    ],
    related: [
      { href: "/numbers/games/target-25", label: "Target 25", description: "The planned game this example belongs to." },
      { href: "/blog/math-puzzles-for-adults", label: "More target-style puzzles" },
      { href: "/categories/numbers", label: "The Numbers arena" },
    ],
    parentPath: "/numbers/games/target-25",
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "collection-sequences",
    path: "/numbers/sequences",
    pageType: "collection",
    category: "numbers",
    game: "sequence",
    h1: "Sequence challenges",
    metaTitle: "Sequence challenges with checked answers",
    metaDescription:
      "Short number rows you can solve on the page, plus the guide that explains the method. Sequence rounds in Two5 are planned, not playable yet.",
    primaryKeyword: "number sequence challenges",
    secondaryKeywords: ["sequence puzzles with answers", "find the next number"],
    searchIntent: "informational",
    introduction:
      "These are individual rows, each with its own answer. They are here so you can practise the search. They are not a Sequence round, and finishing one does not open a score or a match.",
    sections: [
      {
        heading: "What you are being asked",
        paragraphs: [
          "A complete-the-sequence question stops the row early. You supply the next term only after the same rule fits every step you can already see.",
          "Two further question types are planned for the game: find the term that breaks the rule, and name the rule itself. The rows below are the first type. The method for reading gaps, products, and interleaved lists is the guide, not this index.",
        ],
      },
    ],
    listing: [
      {
        href: "/numbers/sequences/what-comes-next-2-6-12-20-30",
        label: "2, 6, 12, 20, 30, ?",
        description: "The gaps grow by two each time. The next term is checked on the page.",
      },
      {
        href: "/numbers/sequences/what-comes-next-8-11-15-20-26",
        label: "8, 11, 15, 20, 26, ?",
        description: "A different growing gap, written for this index.",
      },
    ],
    related: [
      { href: "/numbers/games/sequence", label: "The Sequence game", description: "What a planned round is for." },
      {
        href: "/blog/number-sequence-puzzles",
        label: "How to solve number sequences",
        description: "Pattern families and a larger set of worked rows.",
      },
      { href: "/categories/numbers", label: "The Numbers arena" },
    ],
    parentPath: "/categories/numbers",
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "puzzle-2-6-12-20-30",
    path: "/numbers/sequences/what-comes-next-2-6-12-20-30",
    pageType: "puzzle",
    category: "numbers",
    game: "sequence",
    h1: "What comes next: 2, 6, 12, 20, 30?",
    metaTitle: "What comes next after 2, 6, 12, 20, 30?",
    metaDescription:
      "Find the next term in 2, 6, 12, 20, 30. The gaps and a second reading of the same rule are both checked. The answer stays hidden until you open it.",
    primaryKeyword: "what comes next 2 6 12 20 30",
    secondaryKeywords: ["2 6 12 20 30", "find the next number"],
    searchIntent: "informational",
    introduction:
      "The row is 2, 6, 12, 20, 30. What is the next term? Write the gaps before you commit. This is one sequence, solved on the page. For the families of rules that show up in other rows, use the sequence guide.",
    sections: [
      {
        heading: "Read the gaps first",
        paragraphs: [
          "The jumps are +4, +6, +8 and +10. Each jump is two more than the one before it. A rule that only explains the last jump is not finished until it also explains +4 at the start.",
        ],
      },
    ],
    challenge: {
      prompt: "2, 6, 12, 20, 30, ?",
      difficulty: "medium",
      hint: "List the gaps. They grow by the same amount each time.",
      answer: "42",
      steps: [
        "6 − 2 = 4, 12 − 6 = 6, 20 − 12 = 8, 30 − 20 = 10.",
        "The gaps themselves go 4, 6, 8, 10. The next gap is 12.",
        "30 + 12 = 42.",
      ],
      alternatives: [
        "The same row is 1×2, 2×3, 3×4, 4×5, 5×6. The next product is 6×7 = 42. That is the growing gap seen as consecutive whole numbers, not a second answer.",
      ],
    },
    related: [
      { href: "/numbers/sequences", label: "All sequence challenges" },
      { href: "/numbers/sequences/what-comes-next-8-11-15-20-26", label: "A different growing gap" },
      { href: "/blog/number-sequence-puzzles", label: "The sequence guide" },
      { href: "/numbers/games/sequence", label: "The Sequence game" },
    ],
    parentPath: "/numbers/sequences",
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "puzzle-8-11-15-20-26",
    path: "/numbers/sequences/what-comes-next-8-11-15-20-26",
    pageType: "puzzle",
    category: "numbers",
    game: "sequence",
    h1: "What comes next: 8, 11, 15, 20, 26?",
    metaTitle: "What comes next after 8, 11, 15, 20, 26?",
    metaDescription:
      "Solve 8, 11, 15, 20, 26. The gap increases by one each step. Open the answer only after you have a sentence for the rule.",
    primaryKeyword: "what comes next 8 11 15 20 26",
    secondaryKeywords: ["growing difference sequence", "find the next number"],
    searchIntent: "informational",
    introduction:
      "This row was written for Two5. It is not one of the examples in the sequence guide. The terms are 8, 11, 15, 20, 26. Find the next term by describing the gap in a sentence you can check from the first step.",
    sections: [
      {
        heading: "Why the last gap is not enough",
        paragraphs: [
          "The last step, from 20 to 26, is +6. Adding 6 again would give 32, and that rule already fails earlier: 11 to 15 is not +6. The gaps have to be read as a list of their own.",
        ],
      },
    ],
    challenge: {
      prompt: "8, 11, 15, 20, 26, ?",
      difficulty: "easy",
      hint: "Subtract neighbours in order. The gaps are consecutive whole numbers.",
      answer: "33",
      steps: [
        "11 − 8 = 3, 15 − 11 = 4, 20 − 15 = 5, 26 − 20 = 6.",
        "The gaps are 3, 4, 5, 6. The next gap is 7.",
        "26 + 7 = 33.",
      ],
    },
    related: [
      { href: "/numbers/sequences/what-comes-next-2-6-12-20-30", label: "2, 6, 12, 20, 30" },
      { href: "/numbers/sequences", label: "Sequence challenges" },
      { href: "/numbers/games/sequence", label: "The Sequence game" },
    ],
    parentPath: "/numbers/sequences",
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "guide-estimation",
    path: "/numbers/guides/mental-estimation-techniques",
    pageType: "guide",
    category: "numbers",
    game: "pinpoint",
    h1: "Mental estimation techniques",
    metaTitle: "Mental estimation techniques that stay honest",
    metaDescription:
      "Judge a number before the full calculation: landmarks, compatible numbers, and a linear number line. A percentage is one case, not the whole method.",
    primaryKeyword: "mental estimation techniques",
    secondaryKeywords: ["how to estimate quickly", "compatible numbers", "number line estimation"],
    searchIntent: "informational",
    introduction:
      "Estimation here means judging a number closely enough to be useful, then checking the gap. The techniques below are arithmetic habits. They are not evidence of a gain in general intelligence, or of transfer to unrelated work.",
    sections: [
      {
        heading: "Landmarks before arithmetic",
        paragraphs: [
          "Place the number against a landmark you already trust: 0, a halfway point, a round ten, a known total. A journey of 47 kilometres is just under 50. A wait of 47 minutes is a little under an hour. The landmark does the first cut. The adjustment does the rest.",
        ],
      },
      {
        heading: "Compatible numbers",
        paragraphs: [
          "Replace the figures with neighbours that divide cleanly, calculate, then say which way you nudged. 19% of 248 is close to 20% of 250. Twenty percent of 250 is 50. Both nudges were upward, so the true value sits a little under 50. The exact product is 47.12.",
          "That percentage is one case of compatible numbers. It is not the only kind of estimate Pinpoint is being designed around. A count, a distance, a duration, or a mark on a line can be the question instead.",
        ],
      },
      {
        heading: "A linear number line",
        paragraphs: [
          "On a line from 0 to 100, equal distances are equal values. The middle is 50. 62 sits twelve units past that middle, toward 100. People often compress or stretch one end of the line. The correction is to measure from a landmark, not to stare at the blank space.",
          "Number-line estimation is an established research task. Two5 did not invent it. The papers below review that task and everyday quantity estimation. They are not studies of Pinpoint.",
        ],
      },
      {
        heading: "What a closer guess does not prove",
        paragraphs: [limit],
      },
    ],
    faq: [
      {
        question: "Should every estimate start as a percentage?",
        answer:
          "No. Use a percentage when the question is a percentage. For a count, a distance, a time, or a position, start from a landmark in that unit.",
      },
    ],
    related: [
      { href: "/numbers/games/pinpoint", label: "Pinpoint", description: "The planned estimation game." },
      {
        href: "/numbers/estimation/place-62-on-a-line-from-0-to-100",
        label: "Place 62 on the line",
        description: "One placement you can try before reading the exact point.",
      },
      { href: "/categories/numbers", label: "The Numbers arena" },
    ],
    parentPath: "/categories/numbers",
    references: [
      {
        label: "Varieties of number-line estimation, Developmental Review (2024)",
        href: "https://doi.org/10.1016/j.dr.2024.101161",
      },
      {
        label: "Kreis, Groß and Pachur, Real-world estimation taps into basic numeric abilities (2025)",
        href: "https://doi.org/10.3758/s13423-024-02575-4",
      },
    ],
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
  {
    id: "puzzle-place-62",
    path: "/numbers/estimation/place-62-on-a-line-from-0-to-100",
    pageType: "puzzle",
    category: "numbers",
    game: "pinpoint",
    h1: "Place 62 on a line from 0 to 100",
    metaTitle: "Place 62 on a line from 0 to 100",
    metaDescription:
      "Where does 62 sit between 0 and 100? Place it against the midpoint first, then reveal the exact point and the size of a seven-unit miss.",
    primaryKeyword: "place 62 on a number line",
    secondaryKeywords: ["number line estimation", "where is 62 between 0 and 100"],
    searchIntent: "informational",
    introduction:
      "The line runs from 0 to 100 and the spacing is even. Where does 62 belong? Decide before you convert it into a percentage sentence. This placement is a puzzle on the page, not a Pinpoint round.",
    sections: [
      {
        heading: "Use the midpoint",
        paragraphs: [
          "Half of the line is 50. Anything above 50 sits on the right-hand half. The remaining question is how far past the middle 62 is, out of the 50 units that separate 50 from 100.",
        ],
      },
    ],
    challenge: {
      prompt: "On a line labelled 0, 50 and 100, where is 62?",
      difficulty: "easy",
      hint: "50 is the middle. 62 is greater than 50 by 12.",
      answer: "62, which is 12 units past the midpoint, toward 100.",
      steps: [
        "The line is linear, so 50 is halfway.",
        "62 − 50 = 12. The mark belongs 12 units to the right of the middle.",
        "A judgement near 55 is 62 − 55 = 7 units low.",
      ],
    },
    related: [
      { href: "/numbers/guides/mental-estimation-techniques", label: "Mental estimation techniques" },
      { href: "/numbers/games/pinpoint", label: "Pinpoint" },
      { href: "/categories/numbers", label: "The Numbers arena" },
    ],
    parentPath: "/numbers/games/pinpoint",
    createdAt,
    updatedAt,
    status: "published",
    indexable: true,
  },
];

export function getSeoPage(path: string) {
  return seoPages.find((page) => page.path === path);
}

export function publishedSeoPages() {
  return seoPages.filter((page) => page.status === "published" && page.indexable);
}
