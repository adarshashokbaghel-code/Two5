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
      "Pattern recognition across sequences, mental calculation, and numerical reasoning.",
    lede: "Numbers is the first Two5 arena: short problems that ask you to see a sequence, hold a magnitude, and answer before the pattern slips. The research case for that loop is specific. It trains numerical fluency, not a general faster brain.",
    specs: [
      {
        term: "Practice",
        value: "Sequences, patterns, mental maths, numerical reasoning",
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
    lede: "Logic on Two5 is a short puzzle with a definite answer: spot the clue, make the connection, and check the step you want to skip. The useful research claim is about reasoning procedures, not a faster mind in the abstract.",
    specs: [
      {
        term: "Practice",
        value: "Deduce, connect, reason, adapt",
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
    lede: "Computer Science is planned on Two5 as practice in the thinking behind the code: choose a structure, compare an approach, and see why one solution is cheaper. The research footing is computational thinking and deliberate problem practice, not a promise that puzzles raise general intelligence.",
    specs: [
      {
        term: "Practice",
        value: "DSA, algorithms, data structures, CS fundamentals",
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
    slug: "daily",
    index: "04",
    arena: "Daily",
    seoTitle: "Daily challenges, spaced practice, and why you come back",
    description:
      "Why one challenge a day can beat a long cram session. A research note on spacing, retrieval practice, and habit, written for Two5’s planned daily arena.",
    keywords: [
      "daily challenge",
      "spaced practice",
      "retrieval practice",
      "learning habits",
      "Two5 daily",
    ],
    image: "/art/offer-daily-line.jpg",
    imageAlt: "A yellow line and a black line, the Daily arena",
    headline: "One problem a day, spaced on purpose, scored so you can see the return.",
    lede: "The daily arena is planned as a reason to come back: one fresh problem, one score, the same idea as Two5 grows. Spacing and retrieval are the research reasons a single daily rep can outperform a binge.",
    specs: [
      {
        term: "Practice",
        value: "Daily challenges, personal scores, new problems",
      },
      {
        term: "Mechanism",
        value: "Spacing, retrieval, a cue that brings you back",
      },
      {
        term: "Evidence",
        value: "Cepeda and colleagues; Roediger and Karpicke; Dunlosky and colleagues",
      },
    ],
    motif: {
      method: "RETURN",
      worker: "ARENA",
      plane: "CUE",
      stack: "SPACE / RECALL",
      metric: "RETURN",
      score: "SCORE",
      bars,
    },
    pillars: [
      {
        title: "Speed",
        body: "Retrieval gets faster when you have to produce the answer again after a gap, not when you reread it.",
      },
      {
        title: "Control",
        body: "A daily limit keeps the session inside the problem instead of inside a streak of fatigue.",
      },
      {
        title: "Continuity",
        body: "The point of one challenge is the next one. Spacing only works if you actually return.",
      },
    ],
    sections: [
      {
        heading: "Spacing beats cramming for later recall",
        paragraphs: [
          {
            text: "A quantitative review of distributed practice found that spreading study across time improves later recall relative to massing the same work, across a wide range of verbal tasks. The best gap depends on how long you need to remember, but the direction of the effect is consistent: a little forgetting between reps helps the next rep stick.",
            cites: ["cepeda2006"],
          },
          {
            text: "A daily challenge is a crude, practical version of that schedule. It refuses the five-hour session you will not repeat. One problem is small enough to finish and far enough from yesterday’s that you have to retrieve, not recognise.",
          },
        ],
      },
      {
        heading: "Testing is practice, not just a score",
        paragraphs: [
          {
            text: "Roediger and Karpicke showed that taking a test improves long-term retention more than an extra study pass, even when the test feels harder in the moment. Dunlosky and colleagues later ranked practice testing and distributed practice among the most effective techniques in a review of study methods used by students.",
            cites: ["roediger2006", "dunlosky2013"],
          },
          {
            text: "A scored daily problem is a test in that sense. The score is feedback. The attempt is the mechanism. Two5 has not shipped the daily arena yet; “planned for launch” means the schedule is part of the product intent, not a completed trial.",
          },
        ],
      },
      {
        heading: "Coming back is the hard part",
        paragraphs: [
          {
            text: "Habit research suggests a repeated behaviour in a stable context becomes more automatic, and that the time this takes varies widely across people. A daily slot is an attempt to build that context. It is not a promise that a streak forms in 21 days, a number the evidence does not support.",
            cites: ["lally2010"],
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
        id: "cepeda2006",
        authors: "Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D.",
        year: 2006,
        title: "Distributed practice in verbal recall tasks: A review and quantitative synthesis",
        source: "Psychological Bulletin, 132(3), 354–380",
        href: "https://doi.org/10.1037/0033-2909.132.3.354",
      },
      {
        id: "roediger2006",
        authors: "Roediger, H. L., & Karpicke, J. D.",
        year: 2006,
        title: "Test-enhanced learning: Taking memory tests improves long-term retention",
        source: "Psychological Science, 17(3), 249–255",
        href: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      },
      {
        id: "dunlosky2013",
        authors: "Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T.",
        year: 2013,
        title: "Improving students’ learning with effective learning techniques",
        source: "Psychological Science in the Public Interest, 14(1), 4–58",
        href: "https://doi.org/10.1177/1529100612453266",
      },
      {
        id: "lally2010",
        authors: "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J.",
        year: 2010,
        title: "How are habits formed: Modelling habit formation in the real world",
        source: "European Journal of Social Psychology, 40(6), 998–1009",
        href: "https://doi.org/10.1002/ejsp.674",
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
      source: "research-daily",
    },
  },
  {
    slug: "versus",
    index: "05",
    arena: "Versus",
    seoTitle: "Friendly competition, challenge a friend, and performance",
    description:
      "What research says about rivalry, social facilitation, and sending a friend the same problem. A note on Two5 Versus: why a rematch can sharpen a rep, and where competition backfires.",
    keywords: [
      "challenge a friend",
      "friendly competition",
      "social facilitation",
      "score comparison",
      "Two5 Versus",
    ],
    image: "/art/versus-challenge.png",
    imageAlt: "Yellow and red marks facing off, the Versus arena",
    headline: "You solved it. Sending the same problem is a different kind of rep.",
    lede: "Versus is on the Two5 roadmap: solve a problem, send it, compare the result. Competition research is old, and it is mixed. A rival can speed a well-learned response. The same pressure can hurt when the task is new or the stake feels like a judgment of you.",
    specs: [
      {
        term: "Practice",
        value: "Solve, share, compare, rematch",
      },
      {
        term: "Mechanism",
        value: "Social facilitation, approach motivation, a shared problem",
      },
      {
        term: "Evidence",
        value: "Zajonc; Murayama and Elliot; a clear limit when the task is unfamiliar",
      },
    ],
    motif: {
      method: "SEND",
      worker: "ARENA",
      plane: "RIVAL",
      stack: "SOLVE / COMPARE",
      metric: "REMATCH",
      score: "SCORE",
      bars,
    },
    pillars: [
      {
        title: "Speed",
        body: "On a problem you already know how to start, another person’s attempt is a reason to answer cleanly and soon.",
      },
      {
        title: "Control",
        body: "The comparison is the same problem, not a vague ranking. You can see the step, not only the winner.",
      },
      {
        title: "Continuity",
        body: "A rematch is another rep. Rivalry that ends the session is just noise.",
      },
    ],
    sections: [
      {
        heading: "An audience changes the response you already have",
        paragraphs: [
          {
            text: "Zajonc’s social-facilitation account argued that the presence of others increases drive, which helps the dominant response. If the dominant response is the correct one, people get faster and more accurate. If the task is unlearned, the dominant response is often the wrong one, and the same presence makes performance worse.",
            cites: ["zajonc1965"],
          },
          {
            text: "That is the design constraint for a friendly challenge. Versus should send a problem you have already solved, or one close to it, so the dominant response is the skill rather than the panic. Two5 does not offer live multiplayer today. Social challenges are part of the vision.",
          },
        ],
      },
      {
        heading: "Competition helps some motives and harms others",
        paragraphs: [
          {
            text: "A meta-analysis of the competition–performance relationship found that the effect is not uniformly positive. Performance-approach goals, wanting to do well relative to others, often line up with better performance. Performance-avoidance, wanting not to look bad, does not. Trait competitiveness and the way a contest is framed both matter.",
            cites: ["murayama2012"],
          },
          {
            text: "A rematch against a friend on a shared puzzle is closer to an approach frame when the tone stays on the problem. It slips into avoidance when the score is treated as a verdict. The product intent is the first of those: solve, share, compare, rematch.",
          },
        ],
      },
      {
        heading: "Still not a faster brain in general",
        paragraphs: [
          {
            text: sharedLimit,
            cites: ["simons2016"],
          },
          {
            text: "Beating a friend’s score is evidence about that problem. It is a good reason to take another rep. It is not a physiological claim about processing speed, and it is not a live feature yet.",
          },
        ],
      },
    ],
    references: [
      {
        id: "zajonc1965",
        authors: "Zajonc, R. B.",
        year: 1965,
        title: "Social facilitation",
        source: "Science, 149(3681), 269–274",
        href: "https://doi.org/10.1126/science.149.3681.269",
      },
      {
        id: "murayama2012",
        authors: "Murayama, K., & Elliot, A. J.",
        year: 2012,
        title: "The competition–performance relation: A meta-analytic review and test of the opposing processes model of competition and performance",
        source: "Psychological Bulletin, 138(6), 1035–1070",
        href: "https://doi.org/10.1037/a0028324",
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
      label: "Want in on the first rounds?",
      source: "research-versus",
    },
  },
];

export function getResearchPost(slug: string) {
  return researchPosts.find((post) => post.slug === slug);
}
