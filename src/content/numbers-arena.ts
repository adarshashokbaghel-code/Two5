export const numbersPath = "/categories/numbers";

export const numbersTitle = "Numbers Arena – Number Games, Puzzles & Challenges | Two5";

export const numbersDescription =
  "Explore Target 25, Sequence and Pinpoint — three numerical games built around arithmetic, pattern recognition and estimation. Discover the Numbers arena by Two5.";

export const games = [
  {
    id: "target-25",
    index: "01",
    name: "Target 25",
    tagline: "Build your way to 25.",
    accent: "#22C55E",
    ink: "#050505",
    description:
      "Use the numbers and operations available to construct a valid solution and reach the target.",
    how: "A round gives you a small set of numbers and a target. You combine those numbers with operations until the expression equals the target.",
    interesting:
      "The interesting part is the path. Several combinations can be tried before one of them lands on 25. The puzzle is in choosing which numbers to pair and which operation to use.",
    modes:
      "In Training, a worked path can show why a solution holds. In Solo, you try the construction on your own. In Compete, the same kind of target can be given to more than one player. Those modes are planned. They are not open here.",
  },
  {
    id: "sequence",
    index: "02",
    name: "Sequence",
    tagline: "Find the pattern.",
    accent: "#f0c020",
    ink: "#050505",
    description:
      "Numbers rarely appear randomly. Find the relationship, uncover the rule and work out what comes next.",
    how: "A round shows a run of numbers. The task is to read the relationship between them, then answer the question that relationship poses.",
    interesting:
      "The sequence is a rule in disguise. Once the step sizes are visible, the next value follows. Until then, the row is just a list.",
    modes:
      "Training can walk through the differences. Solo is the same row, answered without the walkthrough. Compete would put players on a comparable sequence. None of those rounds is playable on this page.",
  },
  {
    id: "pinpoint",
    index: "03",
    name: "Pinpoint",
    tagline: "How close can you get?",
    accent: "#d82010",
    ink: "#F4F1E8",
    description:
      "Not every challenge needs an exact calculation. Sometimes the real challenge is judging the answer.",
    how: "A round asks for an approximate value. You place a judgement. The exact figure is then shown so you can see the gap.",
    interesting:
      "Pinpoint is about magnitude. The skill is deciding what the answer should feel like before every step is calculated.",
    modes:
      "Training can unpack one estimate. Solo is a private judgement against the exact value. Compete would compare how close different players landed. The comparison is a plan, not a live match.",
  },
] as const;

export const papers = [
  {
    id: "calculating-brain",
    game: "Target 25",
    title: "The Calculating Brain",
    authors: "Andreas Nieder",
    publication: "Physiological Reviews, 2025",
    doi: "https://doi.org/10.1152/physrev.00014.2024",
    summary:
      "A review of how the brain represents numerical information and supports arithmetic. It is background reading on quantity and calculation, not a study of any game.",
    connection:
      "Research on numerical representation and arithmetic processes informs our interest in how players combine quantities, select operations and construct solutions.",
  },
  {
    id: "patterning",
    game: "Sequence",
    title: "The Role of Patterning Skill in Cognitive Development and Learning: A Critical Review",
    authors: null,
    publication: "Developmental Review, 2025",
    doi: "https://doi.org/10.1016/j.dr.2025.101202",
    summary:
      "A critical review of patterning skill and its place in cognitive development and learning, including mathematics. It reviews that literature. It does not test Two5.",
    connection:
      "Research on patterning and mathematical learning informs the use of challenges that require identifying relationships and discovering numerical rules.",
  },
  {
    id: "number-line",
    game: "Pinpoint",
    title: "Varieties of Number-Line Estimation: Systematic Review, Models, and Data",
    authors: null,
    publication: "Developmental Review, 2024",
    doi: "https://doi.org/10.1016/j.dr.2024.101161",
    summary:
      "A systematic review of number-line estimation: the tasks people are given, the models used to describe their placements, and the data those tasks produce. Number-line estimation is an established research method. Two5 did not invent it.",
    connection:
      "Research on number-line estimation informs our exploration of how players judge numerical magnitude and map values onto a scale.",
  },
  {
    id: "real-world",
    game: "Pinpoint",
    title: "Real-world Estimation Taps into Basic Numeric Abilities",
    authors: "Kreis, Groß and Pachur",
    publication: "Psychonomic Bulletin & Review, 2025",
    doi: "https://doi.org/10.3758/s13423-024-02575-4",
    summary:
      "A paper on how estimating quantities in everyday situations relates to basic numerical abilities. It studies estimation. It is not an evaluation of Pinpoint or of Two5.",
    connection:
      "Research into real-world estimation informs our interest in how people use numerical abilities to approximate quantities.",
  },
] as const;
