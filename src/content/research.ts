export type Cite = {
  id: string;
  authors: string;
  year: number;
  title: string;
  source: string;
  href: string;
};

export type ResearchPost = {
  slug: string;
  index: string;
  arena: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  headline: string;
  lede: string;
  specs: { term: string; value: string }[];
  motif: {
    method: string;
    worker: string;
    plane: string;
    stack: string;
    metric: string;
    score: string;
    bars: { label?: string; tone?: "idle" | "hot" | "dim"; width?: string }[];
  };
  pillars: { title: string; body: string }[];
  sections: { heading: string; paragraphs: { text: string; cites?: string[] }[] }[];
  references: Cite[];
  cta: { href: string; label: string; source: string };
};

const bars = [
  { width: "100%" },
  { width: "100%", label: "01" },
  { width: "100%", label: "02" },
  { width: "100%", label: "03", tone: "hot" as const },
  { width: "100%" },
  { width: "86%", tone: "hot" as const },
  { width: "100%", tone: "hot" as const },
];

const sharedLimit =
  "None of this is a claim that a puzzle app raises IQ. A review of commercial brain-training programs found little convincing evidence that practicing one task reliably lifts unrelated abilities.";

export const researchPosts: ResearchPost[] = [
  {
    slug: "numbers",
    index: "01",
    arena: "Numbers",
    seoTitle: "Numerical reasoning practice and faster mental calculation",
    description:
      "How sequence, pattern, and mental-math practice builds numerical fluency. A research note on number sense, retrieval speed, and what short challenges can and cannot train.",
    keywords: [
      "numerical reasoning",
      "mental maths practice",
      "number sense",
      "pattern sequences",
      "cognitive fluency",
      "Two5",
    ],
    image: "/art/numbers-25-green.jpg",
    imageAlt: "A green geometric 25, the Numbers arena mark",
    headline:
      "Calculation, number sense, and numerical patterns — scored in short rounds.",
    lede: "Numbers is Two5’s first MVP category: Number Sprint, Sequence Hunt, and Target Number ask you to calculate quickly, spot what comes next, and hit a target with the operations you’re given. The research case is numerical fluency, not a general faster brain.",
    specs: [
      {
        term: "Practice",
        value: "Number Sprint, Sequence Hunt, Target Number",
      },
      {
        term: "Mechanism",
        value: "Number sense, retrieval of facts, working-memory updates",
      },
      {
        term: "Evidence",
        value: "Dehaene; Park and Brannon; Simons and colleagues on limits",
      },
    ],
    motif: {
      method: "SEQUENCES",
      worker: "ARENA",
      plane: "FOCUS",
      stack: "PATTERNS / RECALL",
      metric: "FLUENCY",
      score: "SCORE",
      bars,
    },
    pillars: [
      {
        title: "Speed",
        body: "Familiar number facts and sequence rules take fewer steps once they are retrieved instead of recomputed.",
      },
      {
        title: "Control",
        body: "A short problem forces you to keep the last term, the rule, and the candidate answer in mind at once.",
      },
      {
        title: "Continuity",
        body: "Fluency is a use-it-often skill. One clean rep beats a long session you do not return to.",
      },
    ],
    sections: [
      {
        heading: "Number sense is already a fast system",
        paragraphs: [
          {
            text: "Stanislas Dehaene’s account of number sense treats magnitude as a basic representational system: people compare quantities, estimate, and notice when a sequence breaks, often before they have a verbal strategy for it. Mental calculation sits on top of that system. Some steps are recognition. Others are procedures you still have to run.",
            cites: ["dehaene2011"],
          },
          {
            text: "That split is why a sequence problem can feel instant on Tuesday and slow on Wednesday. The rule is the same. What changed is whether the next term is retrieved or rebuilt. Practice that stays on sequences, patterns, and mental maths is practice at shrinking the rebuilt part.",
          },
        ],
      },
      {
        heading: "What short numerical challenges actually train",
        paragraphs: [
          {
            text: "There is evidence that training the approximate number system can improve performance on symbolic maths in adults, which is a nearer kind of transfer than “brain games” usually promise. The training still looks like number work. It does not look like an unrelated memory drill.",
            cites: ["park2013"],
          },
          {
            text: "Two5’s Numbers arena is built in that narrower lane: find the pattern, work the sequence, trust the reasoning. The intended gain is faster, cleaner numerical reasoning on problems of that family. A personal score makes the rep comparable to the last one. It is not a clinical measure of processing speed.",
          },
        ],
      },
      {
        heading: "What a score will not prove",
        paragraphs: [
          {
            text: sharedLimit,
            cites: ["simons2016", "owen2010"],
          },
          {
            text: "Read a rising Numbers score as evidence that this kind of problem is getting easier for you. Do not read it as an IQ change, a medical outcome, or a guarantee that unrelated work will feel faster.",
          },
        ],
      },
    ],
    references: [
      {
        id: "dehaene2011",
        authors: "Dehaene, S.",
        year: 2011,
        title: "The Number Sense: How the Mind Creates Mathematics",
        source: "Oxford University Press",
        href: "https://global.oup.com/academic/product/the-number-sense-9780199753871",
      },
      {
        id: "park2013",
        authors: "Park, J., & Brannon, E. M.",
        year: 2013,
        title: "Training the approximate number system improves math proficiency",
        source: "Psychological Science, 24(10), 2013–2019",
        href: "https://doi.org/10.1177/0956797613482944",
      },
      {
        id: "simons2016",
        authors: "Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L.",
        year: 2016,
        title: "Do “brain-training” programs work?",
        source: "Psychological Science in the Public Interest, 17(3), 103–186",
        href: "https://doi.org/10.1177/1529100616661983",
      },
      {
        id: "owen2010",
        authors: "Owen, A. M., Hampshire, A., Grahn, J. A., Stenton, R., Dajani, S., Burns, A. S., Howard, R. J., & Ballard, C. G.",
        year: 2010,
        title: "Putting brain training to the test",
        source: "Nature, 465, 775–778",
        href: "https://doi.org/10.1038/nature09042",
      },
    ],
    cta: {
      href: "/#waitlist",
      label: "Explore Numbers",
      source: "research-numbers",
    },
  },
  {
    slug: "logic",
    index: "02",
    arena: "Logic",
    seoTitle: "Logic puzzles, deduction, and faster careful thinking",
    description:
      "Why short logic challenges train deduction, rule-following, and attention to the clue you skipped. A research note on reasoning, near transfer, and the limits of brain-training claims.",
    keywords: [
      "logic puzzles",
      "deductive reasoning",
      "careful thinking",
      "problem solving practice",
      "Two5 Logic",
    ],
    image: "/art/offer-logic.jpg",
    imageAlt: "A connected node, the Logic arena mark",
    headline: "Deduction across clues, missing pieces, and rules that change shape.",
    lede: "Logic is Two5’s second MVP category: Pattern Breaker, Hidden Rule, and Logic Grid are compact deduction puzzles with a definite answer. The useful research claim is about reasoning procedures, not a faster mind in the abstract.",
    specs: [
      {
        term: "Practice",
        value: "Pattern Breaker, Hidden Rule, Logic Grid",
      },
      {
        term: "Mechanism",
        value: "Rule following, belief-bias checks, working-memory updates",
      },
      {
        term: "Evidence",
        value: "Evans; Stanovich and West; Simons and colleagues on limits",
      },
    ],
    motif: {
      method: "DEDUCE",
      worker: "ARENA",
      plane: "CHECK",
      stack: "CONNECT / ADAPT",
      metric: "CARE",
      score: "SCORE",
      bars,
    },
    pillars: [
      {
        title: "Speed",
        body: "A familiar logical form is recognised sooner, so time goes to the odd clue instead of the whole puzzle.",
      },
      {
        title: "Control",
        body: "Good logic work is the habit of testing the answer you already like.",
      },
      {
        title: "Continuity",
        body: "Adaptation is the same rules on a new surface. That only sticks if the next problem arrives.",
      },
    ],
    sections: [
      {
        heading: "Reasoning has a fast path and a careful one",
        paragraphs: [
          {
            text: "Dual-process accounts of reasoning separate a quick, associative response from a slower check that applies the rule even when the quick answer feels right. Individual differences in that check show up on classic reasoning tasks: people who do well are often the ones who notice when belief and logic disagree.",
            cites: ["evans2008", "stanovich2000"],
          },
          {
            text: "A short puzzle is a place to practice the check. The problem is small enough that you can still see which premise you ignored. That is different from a vague request to “think harder.”",
          },
        ],
      },
      {
        heading: "Near transfer is the honest target",
        paragraphs: [
          {
            text: "Practicing deduction should make similar deductions more fluent: missing pieces, ordering constraints, and rules that look new but are not. That is near transfer. It is the claim Two5 is willing to make for Logic.",
          },
          {
            text: sharedLimit,
            cites: ["simons2016"],
          },
        ],
      },
      {
        heading: "How the arena is shaped",
        paragraphs: [
          {
            text: "Logic problems on Two5 stay short on purpose. Deduce, then connect, then adapt when the surface changes and the rule does not. The score is a record of that rep. It is not a diagnosis of how logical a person is.",
          },
        ],
      },
    ],
    references: [
      {
        id: "evans2008",
        authors: "Evans, J. St. B. T.",
        year: 2008,
        title: "Dual-processing accounts of reasoning, judgment, and social cognition",
        source: "Annual Review of Psychology, 59, 255–278",
        href: "https://doi.org/10.1146/annurev.psych.59.103006.093629",
      },
      {
        id: "stanovich2000",
        authors: "Stanovich, K. E., & West, R. F.",
        year: 2000,
        title: "Individual differences in reasoning: Implications for the rationality debate?",
        source: "Behavioral and Brain Sciences, 23(5), 645–665",
        href: "https://doi.org/10.1017/S0140525X00003435",
      },
      {
        id: "simons2016",
        authors: "Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L.",
        year: 2016,
        title: "Do “brain-training” programs work?",
        source: "Psychological Science in the Public Interest, 17(3), 103–186",
        href: "https://doi.org/10.1177/1529100616661983",
      },
    ],
    cta: {
      href: "/#waitlist",
      label: "Explore Logic",
      source: "research-logic",
    },
  },
  {
    slug: "computer-science",
    index: "03",
    arena: "Computer Science",
    seoTitle: "Computational thinking, algorithms, and problem speed",
    description:
      "How data structures and algorithms practice the thinking behind the code. A research note on computational thinking, worked examples, and why far-transfer claims should stay modest.",
    keywords: [
      "computational thinking",
      "DSA practice",
      "algorithms and problem solving",
      "data structures",
      "Two5 computer science",
    ],
    image: "/art/offer-cs.jpg",
    imageAlt: "A blue glass tree of nodes, the Computer Science arena",
    headline:
      "Algorithmic thinking across data structures, constraints, and the step you would otherwise skip.",
    lede: "Computer Science is a planned next expansion on Two5: Binary Blitz, Code Trace, and Bug Hunt train computational thinking and code logic without a full IDE. The research footing is deliberate problem practice, not a promise that puzzles raise general intelligence.",
    specs: [
      {
        term: "Practice",
        value: "Binary Blitz, Code Trace, Bug Hunt",
      },
      {
        term: "Mechanism",
        value: "Problem decomposition, representation, complexity tradeoffs",
      },
      {
        term: "Evidence",
        value: "Wing; Ericsson, Krampe, and Tesch-Römer; Simons and colleagues",
      },
    ],
    motif: {
      method: "DSA",
      worker: "ARENA",
      plane: "TRACE",
      stack: "TREES / GRAPHS",
      metric: "STEPS",
      score: "SCORE",
      bars,
    },
    pillars: [
      {
        title: "Speed",
        body: "Recognising a known structure, a tree, a graph, a hash, removes a search you used to do from scratch.",
      },
      {
        title: "Control",
        body: "Writing down the invariant, or the reason an approach fails, is the slow step that makes the next one faster.",
      },
      {
        title: "Continuity",
        body: "Algorithmic skill fades when the problems stop. The arena is being designed as a place they do not.",
      },
    ],
    sections: [
      {
        heading: "Computational thinking is a way of cutting a problem",
        paragraphs: [
          {
            text: "Jeannette Wing described computational thinking as the mental tools of computer science used far beyond programming: abstraction, decomposition, and choosing a representation that makes the question tractable. That is the target of a CS arena that asks you to think beyond the code.",
            cites: ["wing2006"],
          },
          {
            text: "A data-structure problem is fast when the representation is already in hand. It is slow when you are still deciding what the objects even are. Practice that compares approaches is practice at that decision.",
          },
        ],
      },
      {
        heading: "Deliberate practice, not exposure",
        paragraphs: [
          {
            text: "The deliberate-practice literature argues that skill improves when practice is designed, feedback is immediate, and the task sits at the edge of what you can already do. Reading a solution is not the same rep as choosing one and then seeing where it fails.",
            cites: ["ericsson1993"],
          },
          {
            text: "Two5’s computer-science problems are still planned, not a live course. The design intent is that loop: attempt, compare, score. Coming to Two5 means it is on the roadmap, not that a measured outcome already exists.",
          },
        ],
      },
      {
        heading: "Keep the transfer claim small",
        paragraphs: [
          {
            text: sharedLimit,
            cites: ["simons2016"],
          },
          {
            text: "Learning to spot a graph problem can make the next graph problem faster. It is not, by itself, evidence that every kind of thinking got faster.",
          },
        ],
      },
    ],
    references: [
      {
        id: "wing2006",
        authors: "Wing, J. M.",
        year: 2006,
        title: "Computational thinking",
        source: "Communications of the ACM, 49(3), 33–35",
        href: "https://doi.org/10.1145/1118178.1118215",
      },
      {
        id: "ericsson1993",
        authors: "Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C.",
        year: 1993,
        title: "The role of deliberate practice in the acquisition of expert performance",
        source: "Psychological Review, 100(3), 363–406",
        href: "https://doi.org/10.1037/0033-295X.100.3.363",
      },
      {
        id: "simons2016",
        authors: "Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L.",
        year: 2016,
        title: "Do “brain-training” programs work?",
        source: "Psychological Science in the Public Interest, 17(3), 103–186",
        href: "https://doi.org/10.1177/1529100616661983",
      },
    ],
    cta: {
      href: "/#waitlist",
      label: "Get early access",
      source: "research-cs",
    },
  },
  {
    slug: "memory-visual",
    index: "04",
    arena: "Memory & Visual",
    seoTitle: "Memory, visual recognition, and spatial recall practice",
    description:
      "How flash recall, grid memory, and visual sequence problems train working memory and spatial reasoning. A research note on Two5’s planned Memory & Visual category.",
    keywords: [
      "visual memory",
      "spatial reasoning",
      "working memory practice",
      "pattern recall",
      "Two5 Memory Visual",
    ],
    image: "/art/offer-daily-line.jpg",
    imageAlt: "A yellow line and a black line, the Memory and Visual arena mark",
    headline: "Recall, recognition, and spatial patterns — scored in short visual rounds.",
    lede: "Memory & Visual is a planned next expansion on Two5: Flash Recall, Grid Memory, and Visual Sequence broaden play beyond maths and code. The research case is about working memory and near transfer on similar tasks, not a general brain upgrade.",
    specs: [
      {
        term: "Practice",
        value: "Flash Recall, Grid Memory, Visual Sequence",
      },
      {
        term: "Mechanism",
        value: "Working memory, spatial coding, visual pattern completion",
      },
      {
        term: "Evidence",
        value: "Baddeley; Simons and colleagues on limits of far transfer",
      },
    ],
    motif: {
      method: "RECALL",
      worker: "ARENA",
      plane: "GRID",
      stack: "FLASH / POSITION",
      metric: "HOLD",
      score: "SCORE",
      bars,
    },
    pillars: [
      {
        title: "Speed",
        body: "A sequence you have held before is faster to reproduce than one you are still encoding.",
      },
      {
        title: "Control",
        body: "Grid and flash tasks force you to update what you remember when the pattern shifts.",
      },
      {
        title: "Continuity",
        body: "Visual memory fades without reps. Short rounds make another attempt easy to take.",
      },
    ],
    sections: [
      {
        heading: "Working memory is the bottleneck",
        paragraphs: [
          {
            text: "Baddeley’s working-memory model treats temporary storage and control as limited resources. Flash and grid tasks load those resources on purpose: you must encode, maintain, and reproduce under time pressure.",
            cites: ["baddeley2000"],
          },
          {
            text: "Two5’s Memory & Visual modes are designed as that load in game form. They are not shipped yet; “next expansion” means the category is on the roadmap with a clear training target.",
          },
        ],
      },
      {
        heading: "Visual and spatial reps stay close to the task",
        paragraphs: [
          {
            text: "Getting better at one grid layout can make the next grid layout easier when the rules overlap. That is near transfer. It is the honest claim for visual sequence and position recall.",
          },
          {
            text: sharedLimit,
            cites: ["simons2016"],
          },
        ],
      },
    ],
    references: [
      {
        id: "baddeley2000",
        authors: "Baddeley, A.",
        year: 2000,
        title: "The episodic buffer: A new component of working memory?",
        source: "Trends in Cognitive Sciences, 4(11), 417–423",
        href: "https://doi.org/10.1016/S1364-6613(00)01538-2",
      },
      {
        id: "simons2016",
        authors: "Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L.",
        year: 2016,
        title: "Do “brain-training” programs work?",
        source: "Psychological Science in the Public Interest, 17(3), 103–186",
        href: "https://doi.org/10.1177/1529100616661983",
      },
    ],
    cta: {
      href: "/#waitlist",
      label: "Get early access",
      source: "research-memory-visual",
    },
  },
];

export function getResearchPost(slug: string) {
  return researchPosts.find((post) => post.slug === slug);
}
