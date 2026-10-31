export type Puzzle = {
  level: "Easy" | "Medium" | "Harder";
  prompt: string;
  answer: string;
  reasoning: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  puzzles?: Puzzle[];
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  published: string;
  updated: string;
  summary: string;
  answer: string;
  sections: BlogSection[];
  sources: { label: string; href: string }[];
  related: string[];
  productLinks: { href: string; label: string }[];
  cta: string;
  /** Defaults to the waitlist. Evidence pages can point somewhere else first. */
  ctaHref?: string;
  ctaLabel?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "number-sequence-puzzles",
    title: "Number sequence puzzles: patterns, examples, and how to solve them",
    seoTitle: "Number sequence puzzles: patterns and worked answers",
    description:
      "How to read a number sequence, with original examples from easy differences to factorials. Answers and the reasoning sit under each puzzle.",
    primaryKeyword: "number sequence puzzles",
    keywords: [
      "number sequence puzzles",
      "number pattern puzzles",
      "missing number puzzles",
      "number sequence reasoning",
      "number puzzles with answers",
    ],
    published: "2026-10-27",
    updated: "2026-10-27",
    summary: "A practical way to spot the rule in a number sequence, with original examples and full answers.",
    answer:
      "A number sequence puzzle gives you ordered terms and asks for the missing one. You find the rule that produces each term from the ones before it — a constant gap, a growing gap, multiplication, two interleaved lists, or a known family such as squares — then apply that rule one step further.",
    sections: [
      {
        heading: "Start with the gaps, not a guess",
        paragraphs: [
          "Write the difference between neighbours before you invent a clever rule. A steady difference is an arithmetic sequence. A difference that itself grows by a constant is still a simple rule, just one level down. If the differences look random, check multiplication, then check whether odd and even positions are separate sequences.",
          "Say the rule in one sentence before you commit to an answer. “Add 3 each time” is a rule. “It feels like it doubles” is a hunch. Hunches are useful, but the sentence is what you can test against every term, not only the last one.",
        ],
      },
      {
        heading: "Pattern types worth recognising",
        paragraphs: [
          "These families cover most short sequence puzzles. They are not a ranking of intelligence. They are a checklist so you do not stare at the last term and hope.",
        ],
        bullets: [
          "Constant difference: 4, 7, 10, 13 adds 3.",
          "Second difference: the gaps themselves make a simple sequence, often the powers of two or the odd numbers.",
          "Squares and factorials: 1, 4, 9, 16, 25 or 1, 2, 6, 24, 120.",
          "Product of neighbours: 2, 6, 12, 20, 30 is n × (n + 1) if you start n at 2.",
          "Two sequences woven together: odd positions follow one rule, even positions another.",
        ],
      },
      {
        heading: "Worked examples",
        paragraphs: [
          "Try each one before you open the answer. Every sequence below was written for this page.",
        ],
        puzzles: [
          {
            level: "Easy",
            prompt: "4, 7, 10, 13, 16, ?",
            answer: "19",
            reasoning: "The gap is +3 every time. 16 + 3 = 19.",
          },
          {
            level: "Easy",
            prompt: "1, 4, 9, 16, 25, ?",
            answer: "36",
            reasoning: "These are the squares 1², 2², 3², 4², 5². The next square is 6² = 36.",
          },
          {
            level: "Medium",
            prompt: "2, 6, 12, 20, 30, ?",
            answer: "42",
            reasoning:
              "Each term is a product of two consecutive whole numbers: 1×2, 2×3, 3×4, 4×5, 5×6. The next product is 6×7 = 42.",
          },
          {
            level: "Medium",
            prompt: "5, 6, 8, 12, 20, ?",
            answer: "36",
            reasoning: "The gaps are +1, +2, +4, +8. The next gap is +16. 20 + 16 = 36.",
          },
          {
            level: "Medium",
            prompt: "3, 8, 6, 11, 9, 14, 12, ?",
            answer: "17",
            reasoning:
              "Odd positions: 3, 6, 9, 12 (+3). Even positions: 8, 11, 14, and the next even position is 17 (+3).",
          },
          {
            level: "Harder",
            prompt: "1, 2, 6, 24, 120, ?",
            answer: "720",
            reasoning: "Multiply by 2, then 3, then 4, then 5, then 6. 120 × 6 = 720. These are the factorials 1!, 2!, 3!, 4!, 5!, 6!.",
          },
          {
            level: "Harder",
            prompt: "7, 8, 11, 16, 23, 32, ?",
            answer: "43",
            reasoning: "The gaps are the odd numbers +1, +3, +5, +7, +9. The next gap is +11. 32 + 11 = 43.",
          },
        ],
      },
      {
        heading: "Mistakes that throw the next term off",
        paragraphs: [
          "The usual miss is fitting a rule to the last two terms and never checking the first. Doubling explains 8, 16 but not 5, 6, 8, 12, 20. Another miss is mixing two interleaved lists into one difference row, which looks noisy until you split odd and even positions.",
          "A third miss is treating a puzzle score as a measure of general ability. Practising sequences makes you faster at sequences. A review of commercial brain-training programs found little convincing evidence that practice on one task lifts unrelated abilities.",
        ],
      },
    ],
    sources: [
      {
        label: "Simons and colleagues, Do “brain-training” programs work? (2016)",
        href: "https://doi.org/10.1177/1529100616661983",
      },
    ],
    related: ["math-puzzles-for-adults", "logic-puzzles-with-answers"],
    productLinks: [
      { href: "/numbers/games/sequence", label: "The planned Sequence game" },
      { href: "/numbers/sequences", label: "Sequence challenges on Two5" },
      { href: "/research/numbers", label: "How Two5 thinks about number rounds" },
    ],
    cta: "Enjoy number sequences? Two5’s Numbers category — Number Sprint, Sequence Hunt, and Target Number — is part of what we are building first. Rounds are not playable on this site yet. Join the waitlist and we will tell you when early access opens.",
  },
  {
    slug: "logic-puzzles-with-answers",
    title: "Logic puzzles with answers: a practical way to solve them",
    seoTitle: "Logic puzzles with answers and worked solutions",
    description:
      "Four original deduction puzzles with full solutions. Learn how to turn a clue into a case you can eliminate, without a copied puzzle grid.",
    primaryKeyword: "logic puzzles with answers",
    keywords: [
      "logic puzzles with answers",
      "logical reasoning puzzles",
      "deduction puzzles",
      "logic problems with solutions",
      "reasoning challenges",
    ],
    published: "2026-10-27",
    updated: "2026-10-27",
    summary: "Original deduction puzzles, each with the answer and the elimination that gets you there.",
    answer:
      "A logic puzzle gives you a small world and a few true statements. You solve it by writing what each statement rules out, then checking the remaining case against every clue. The answer is the assignment that makes all of the clues true at once.",
    sections: [
      {
        heading: "Write the cases before you narrate a story",
        paragraphs: [
          "Deduction fails when you hold the whole scene in your head. Put the people, the tasks, or the numbers in a short list and cross off combinations a clue forbids. One clue rarely names the answer. It removes a possibility so the next clue has less room.",
          "When a puzzle says exactly one statement is true, do not look for the cleverest sentence. Test each candidate world. The right world makes exactly one of those sentences true.",
        ],
      },
      {
        heading: "Four original puzzles",
        paragraphs: ["Open the answer only after you have a full assignment, not a hunch about one name."],
        puzzles: [
          {
            level: "Easy",
            prompt:
              "Meera, Arun, and Dev each took one challenge: Sequence, Grid, or Pattern. Meera did not take Sequence. Dev took Grid. The person who took Pattern finished last, and Arun finished before Dev. Who took Sequence?",
            answer: "Arun took Sequence. Meera took Pattern. Dev took Grid.",
            reasoning:
              "Dev is Grid, so Meera is not Sequence and not Grid, which leaves Pattern. Arun is the one left, so Arun took Sequence. Pattern finished last, so Meera is last. Arun before Dev fits the order Arun, Dev, Meera.",
          },
          {
            level: "Medium",
            prompt:
              "A box holds either 17 or 18. Asha says it is even. Bina says it is greater than 17. Chetan says Asha is wrong. Exactly one of the three statements is true. What is the number?",
            answer: "17",
            reasoning:
              "If the number is 18, Asha is true and Bina is true, which is two truths. If the number is 17, Asha is false, Bina is false, and Chetan is true. That is exactly one truth.",
          },
          {
            level: "Medium",
            prompt:
              "Nia, Omar, Priya, and Rohan finish one timed round. Exactly one person finishes between Rohan and Nia. Priya finishes immediately after Rohan. Omar finishes last. What is the order, first to last?",
            answer: "Rohan, Priya, Nia, Omar.",
            reasoning:
              "Omar is last. Priya is immediately after Rohan, so the block is Rohan then Priya. Exactly one person between Rohan and Nia means Nia comes right after Priya. The only order left is Rohan, Priya, Nia, Omar.",
          },
          {
            level: "Harder",
            prompt:
              "Exactly one of these three statements is true. The code is 13, 14, or 15. (1) The code is 14. (2) The code is even. (3) The code is greater than 14. What is the code?",
            answer: "15",
            reasoning:
              "13 makes all three statements false. 14 makes both (1) and (2) true. 15 makes only (3) true. The only code with exactly one true statement is 15.",
          },
        ],
      },
      {
        heading: "What to do when two cases still fit",
        paragraphs: [
          "If two assignments survive, you missed a clue or you softened one. “Finished before” is an order. “Immediately after” is a neighbour. “Exactly one is true” is a count. Put the words back to their strict meaning and retest.",
          "Logic grids on contest sites often add a points layer and a clock. Puzzle Baron, for example, runs a monthly high-score challenge where difficulty and speed both affect the total. That is a different task from the pencil deduction above: same kind of reasoning, plus a race. Two5’s Logic category is planned around deduction puzzles such as Pattern Breaker, Hidden Rule, and Logic Grid. Those rounds are not open on this website yet.",
        ],
      },
    ],
    sources: [
      {
        label: "Puzzle Baron — monthly logic high-score challenge",
        href: "https://logic.puzzlebaron.com/contest1.php",
      },
    ],
    related: ["competitive-brain-games", "number-sequence-puzzles"],
    productLinks: [
      { href: "/research/logic", label: "How Two5 thinks about logic rounds" },
      { href: "/#challenges", label: "Logic on the Two5 homepage" },
    ],
    cta: "Prefer a deduction you can score? Logic is one of the two categories Two5 is building first. Friend challenges are not open yet. Join the waitlist if you want a note when early access starts.",
  },
  {
    slug: "math-puzzles-for-adults",
    title: "Math puzzles for adults: number challenges that make you think",
    seoTitle: "Math puzzles for adults, with worked number challenges",
    description:
      "Short mathematical reasoning puzzles for adults — targets, constraints, and one worked path through each. No claim that puzzles raise IQ.",
    primaryKeyword: "math puzzles for adults",
    keywords: [
      "math puzzles for adults",
      "mathematical reasoning puzzles",
      "number challenge games",
      "maths problem solving",
      "math brain games",
    ],
    published: "2026-10-27",
    updated: "2026-10-27",
    summary: "Adult number challenges that reward a plan, with answers and a clear limit on what practice transfers.",
    answer:
      "A math puzzle for adults is a small constraint problem: you have a few numbers, a legal set of moves, and a target. You are not being asked to recall a chapter. You are being asked to search a short space of combinations until the constraints all hold.",
    sections: [
      {
        heading: "Reasoning, not a worksheet",
        paragraphs: [
          "School exercises usually tell you the operation. A puzzle hides which operation is worth trying. The skill is keeping the target in view while you spend the numbers you are allowed to use, each once if the puzzle says so.",
          "There is evidence that training the approximate number system can improve symbolic maths in adults, which is a near kind of transfer: number practice helping number work. It is not evidence that a puzzle app raises IQ or speeds up unrelated parts of your job.",
        ],
      },
      {
        heading: "Original challenges",
        paragraphs: ["Each puzzle uses only the numbers printed in it."],
        puzzles: [
          {
            level: "Easy",
            prompt: "Using 2, 3, 4, and 5 exactly once, make 20 with ordinary arithmetic.",
            answer: "(5 × 4) × (3 − 2) = 20",
            reasoning: "5 × 4 is 20, and 3 − 2 is 1. Multiplying by 1 spends the remaining numbers without changing the total.",
          },
          {
            level: "Easy",
            prompt: "The product of two whole numbers is 36 and their sum is 13. What are they?",
            answer: "4 and 9",
            reasoning: "Factor pairs of 36: 1 and 36, 2 and 18, 3 and 12, 4 and 9, 6 and 6. Only 4 + 9 = 13.",
          },
          {
            level: "Medium",
            prompt:
              "Three scores are whole numbers from 1 to 12. They add to 27. One score is double another. In order, the middle score is odd. What are the three scores?",
            answer: "6, 9, and 12",
            reasoning:
              "Doubles that leave a third score inside the cap: 5 and 10 (third is 12) or 6 and 12 (third is 9). Ordered, 5, 10, 12 has an even middle. Ordered, 6, 9, 12 has an odd middle.",
          },
          {
            level: "Medium",
            prompt: "Replace the box: 8 × box + 6 = 4 × box + 22.",
            answer: "4",
            reasoning: "8b + 6 = 4b + 22, so 4b = 16, so b = 4. Check: 32 + 6 = 38 and 16 + 22 = 38.",
          },
          {
            level: "Harder",
            prompt:
              "You may press +5 or ×2, starting from 1. Reach exactly 23. What is one shortest sequence of presses?",
            answer: "×2, ×2, +5, ×2, +5. Five presses.",
            reasoning:
              "Work backwards from 23. The last press was +5, from 18. 18 is ×2 from 9. 9 is +5 from 4. 4 is ×2 from 2. 2 is ×2 from 1. Forwards, the totals are 2, 4, 9, 18, 23.",
          },
        ],
      },
      {
        heading: "How this relates to a scored round",
        paragraphs: [
          "Two5’s Numbers ideas include a target-number round: you are given operations and asked to hit a target. That is the same family as the puzzles above. It is not available to play on this site today. The point of publishing the method here is so you can practise the search, not so we can pretend a round is live.",
        ],
      },
    ],
    sources: [
      {
        label: "Park and Brannon, Training the approximate number system improves math proficiency (2013)",
        href: "https://doi.org/10.1177/0956797613482944",
      },
      {
        label: "Simons and colleagues, Do “brain-training” programs work? (2016)",
        href: "https://doi.org/10.1177/1529100616661983",
      },
    ],
    related: ["number-sequence-puzzles", "algorithm-puzzles"],
    productLinks: [
      { href: "/numbers/games/target-25", label: "The planned Target 25 game" },
      { href: "/numbers/puzzles/make-25-from-8-3-6-and-1", label: "Make 25 from 8, 3, 6 and 1" },
      { href: "/research/numbers", label: "The research note on Two5 Numbers" },
    ],
    cta: "If you want target-number and sequence rounds with a score you can compare to your last attempt, join the Two5 waitlist. We will not pretend those rounds are open before they are.",
  },
  {
    slug: "algorithm-puzzles",
    title: "Algorithm puzzles: computational thinking without writing code",
    seoTitle: "Algorithm puzzles you can solve without writing code",
    description:
      "Binary search, a stack, and a short procedure you can trace on paper. Computer science puzzles for students and anyone who likes rules.",
    primaryKeyword: "algorithm puzzles",
    keywords: [
      "algorithm puzzles",
      "computer science puzzles",
      "computational thinking problems",
      "programming logic puzzles",
      "algorithmic reasoning",
    ],
    published: "2026-10-27",
    updated: "2026-10-27",
    summary: "Algorithm ideas as puzzles: halve a sorted shelf, match brackets with a stack, and trace a procedure by hand.",
    answer:
      "An algorithm puzzle asks you to follow or invent a reliable procedure. You do not need a compiler. You need a rule you can apply the same way every time, a way to tell when you are done, and a trace that shows the state after each step.",
    sections: [
      {
        heading: "A procedure is the whole puzzle",
        paragraphs: [
          "Computational thinking here means three habits: break the job into steps, notice what has to stay true after each step, and stop when a condition is met. College students see this in data-structures courses. You can practise the same habits on paper before anyone asks you to write a program.",
          "Two5’s Computer Science category — Binary Blitz, Code Trace, and Bug Hunt — is planned as a later expansion, not part of the first playable set. The puzzles below stand on their own.",
        ],
      },
      {
        heading: "Puzzles",
        paragraphs: ["Trace every step. The answer is the final state, not a function name."],
        puzzles: [
          {
            level: "Easy",
            prompt:
              "A shelf holds 16 books, sorted A to Z, one title per slot. You may open the middle of the remaining range. How many openings do you need, at worst, to find one title or learn it is absent?",
            answer: "4 openings.",
            reasoning:
              "Each opening cuts the range in half: 16 → 8 → 4 → 2 → 1. After four openings a single slot remains. That is binary search on 16 items. log2(16) = 4.",
          },
          {
            level: "Medium",
            prompt:
              "Start at 1. If the current number is odd, double it. If it is even, add 3. Stop when the number is greater than 20. What values do you visit, and where do you stop?",
            answer: "1, 2, 5, 10, 13, 26. You stop at 26.",
            reasoning:
              "1 is odd, so double to 2. 2 is even, so add 3 to get 5. 5 doubles to 10. 10 adds 3 to get 13. 13 doubles to 26. 26 is greater than 20, so stop. The trap is swapping the odd and even rules.",
          },
          {
            level: "Medium",
            prompt:
              "A stack starts empty. You may only put a mark on top or remove the top mark. Process ( [ ] ) { }. After each closer, the top mark must be its pair. Does the line match, and what is left on the stack at the end?",
            answer: "It matches. The stack is empty.",
            reasoning:
              "Push (, push [, pop ] matches [, pop ) matches (, push {, pop } matches {. Nothing remains. The line ( [ ) ] fails when ) tries to close [.",
          },
          {
            level: "Harder",
            prompt:
              "You have eight coins. One is heavier. A balance scale tells you which side is heavier, or that they match. What is the fewest weighings that always finds the heavy coin?",
            answer: "Two weighings.",
            reasoning:
              "Split into three groups as evenly as you can: 3, 3, and 2. Weigh 3 against 3. If one side is heavier, the heavy coin is in that trio and one more weighing of two of them finds it (the third is heavy if those two match). If the trios match, the heavy coin is one of the two left out, and one weighing separates them.",
          },
        ],
      },
      {
        heading: "Why this is not a coding test",
        paragraphs: [
          "Naming an algorithm is optional. The puzzle is finished when the trace is consistent. That is also why these pages are not a course: there is no syllabus, no grader, and no claim that finishing four puzzles prepares you for an interview. If you want the same kind of trace inside a scored round later, that is the Computer Science expansion on the Two5 waitlist, not a feature you can open today.",
        ],
      },
    ],
    sources: [],
    related: ["logic-puzzles-with-answers", "math-puzzles-for-adults"],
    productLinks: [{ href: "/research/computer-science", label: "The research note on Two5 Computer Science" }],
    cta: "Want code-trace puzzles in a short scored round? That category is not in the first release. Join the waitlist and you will hear when the Computer Science expansion is actually ready.",
  },
  {
    slug: "competitive-brain-games",
    title: "Brain games and puzzle challenges: a more competitive way to play",
    seoTitle: "Competitive brain games versus casual puzzle challenges",
    description:
      "What changes when a puzzle becomes a scored challenge. A clear split between casual play, practice, and competition — and what Two5 has not shipped yet.",
    primaryKeyword: "competitive brain games",
    keywords: [
      "competitive brain games",
      "brain challenge games",
      "online puzzle challenges",
      "logic challenge games",
      "challenge friends puzzle game",
    ],
    published: "2026-10-27",
    updated: "2026-10-27",
    summary: "Casual puzzles, practice, and scored challenges are different jobs. Here is the split, without a fake ranking of apps.",
    answer:
      "A casual puzzle asks whether you can solve it. A competitive brain challenge asks whether you can solve it under shared conditions and compare the result — a time, a score, or another player on the same problem. The puzzle can be identical. The extra piece is the comparison.",
    sections: [
      {
        heading: "Three formats that get blurred together",
        paragraphs: [
          "Casual play is a grid or a riddle you finish when you finish. Practice is repetition on one skill, such as sequences or deductions, so the next item of the same kind gets cleaner. A challenge adds a rule for comparison: same puzzle, a visible score, sometimes a clock, sometimes another person.",
          "Those formats answer different searches. “Logic puzzles with answers” is a practice intent. “Challenge your friends” is a social intent. A page that pretends they are the same product is not helping either reader.",
        ],
        bullets: [
          "Casual: solve it once. No ranking required.",
          "Practice: solve several of one type and watch your own mistakes.",
          "Competitive: the result is meant to be compared. Speed and difficulty often both count.",
        ],
      },
      {
        heading: "What already exists, without a winner’s podium",
        paragraphs: [
          "Scored logic play is not hypothetical. Puzzle Baron runs a monthly high-score challenge: points depend on difficulty and solve speed, and the top of that month’s table is public. Other sites publish daily puzzle ranks or memory-span leaderboards. Those products are live. Two5 is not one of them yet.",
          "Brain-training marketing often jumps from “you got faster at this game” to “you got smarter.” A 2016 review in Psychological Science in the Public Interest looked at commercial brain-training programs and found little convincing evidence that practice on one task reliably improves unrelated abilities. Two5 will not make that jump. A Numbers score, when rounds exist, will mean you handled that kind of number problem. It will not mean your IQ moved.",
        ],
      },
      {
        heading: "What Two5 is actually offering today",
        paragraphs: [
          "Two5 is a competitive brain-challenge game in development for people who like problem-solving: college students and working professionals included, not a class roster. The first categories we are building are Numbers and Logic. Computer Science and Memory & Visual are the next expansion. Sending a challenge to a friend, and public leaderboards, are ideas we have described. They are not features you can use on this website.",
          "The useful thing you can do here now is read a research note or work a guide, then leave an email if you want launch news. That is the waitlist. It is not early access by itself, and it does not start a round.",
        ],
      },
    ],
    sources: [
      {
        label: "Puzzle Baron — monthly logic high-score challenge",
        href: "https://logic.puzzlebaron.com/contest1.php",
      },
      {
        label: "Simons and colleagues, Do “brain-training” programs work? (2016)",
        href: "https://doi.org/10.1177/1529100616661983",
      },
    ],
    related: ["logic-puzzles-with-answers", "number-sequence-puzzles"],
    productLinks: [
      { href: "/#how", label: "How Two5 is meant to play" },
      { href: "/research", label: "Notes on the four categories" },
    ],
    cta: "If you want a scored challenge rather than another lesson, join the Two5 waitlist. We will use that list for launch and early-access news, not as a fake leaderboard.",
  },
  {
    slug: "what-research-says-about-brain-games",
    title: "What research says about brain games and cognitive training",
    seoTitle: "Brain games and cognitive training: what the research supports",
    description:
      "Cognitive training, commercial brain games, and everyday mental activity are not the same thing. What WHO, NIA, and a major review actually support — and what they do not.",
    primaryKeyword: "brain games cognitive training research",
    keywords: [
      "brain games and cognitive training",
      "cognitive training evidence",
      "do brain games work",
      "near transfer far transfer",
      "commercial brain training claims",
    ],
    published: "2026-10-27",
    updated: "2026-10-27",
    summary:
      "A plain account of cognitive training evidence: task practice, commercial apps, and the limits of transfer.",
    answer:
      "Practising a specific mental task can make you better at that task. Structured cognitive training in studies of older adults has sometimes improved the skill that was trained. That is not the same as proving that a commercial brain-game app prevents dementia, raises intelligence, or helps with unrelated daily tasks. Two5 is a game in development. It is not a completed clinical study.",
    sections: [
      {
        heading: "Three things that get called the same thing",
        paragraphs: [
          "A puzzle you do for fun is general mental activity. Cognitive training, in the research sense, is guided practice on set tasks aimed at a named skill such as reasoning or speed of processing. A commercial brain-training app is a product. It may borrow the look of training without matching the dose, the tasks, or the people in a trial.",
          "Getting better at the game you practised is near transfer. Getting better at something you did not practise — another test, your job, or living independently — is far transfer. Reviews of commercial programs have not found convincing evidence that practice on one task reliably lifts unrelated abilities.",
        ],
      },
      {
        heading: "What official sources say",
        paragraphs: [
          "The World Health Organization’s 2019 guideline says cognitive training may be offered to older adults with normal cognition and to people with mild cognitive impairment to reduce the risk of cognitive decline and/or dementia. The recommendation is conditional. The WHO rated the evidence very low to low. “May be offered” is not “has been shown to prevent dementia,” and it does not name any app.",
          "The U.S. National Institute on Aging describes the ACTIVE trial: healthy adults over 65 who trained in memory, reasoning, or speed of processing improved in the area they trained, with reasoning and speed gains still seen up to 10 years later. NIA also says it is still unknown whether those long-term benefits help people live independently longer. On commercial computer games, NIA’s position is direct: there is not enough evidence that they have the same effect as the training used in trials.",
          "A separate 2016 review in Psychological Science in the Public Interest reached a similar limit for brain-training programs sold to the public. A 2010 Nature paper that put a commercial program to the test found improvement on the trained tasks and little evidence of generalisation.",
        ],
      },
      {
        heading: "A newer finding, and why it is not a product claim",
        paragraphs: [
          "In February 2026, NIH described a 20-year follow-up of the ACTIVE trial. Among adults who had been 65 or older, the group that received speed-of-processing training and later booster sessions had fewer subsequent dementia diagnoses in Medicare claims. Speed training without those boosters, and the memory and reasoning training arms, did not show that association in the same analysis. Claims data are not a full clinical exam. The training was a defined protocol from a trial that began in the late 1990s, not an off-the-shelf puzzle app, and it was not Two5.",
          "One encouraging follow-up does not license a sentence like “brain games prevent dementia.” It is a reason to keep the question open and to describe the exact training, the population, and the outcome.",
        ],
      },
      {
        heading: "What this means for Two5",
        paragraphs: [
          "Two5 is building short scored challenges in numbers, logic, and later computer science and memory. A future score will measure that round. It will not diagnose anyone, estimate dementia risk, or stand in for medical care. We have not run a trial. The waitlist is for the game, not enrollment in a study.",
          "If you are worried about your own memory or someone else’s, talk to a qualified clinician. An article and a puzzle score are not an assessment.",
        ],
      },
    ],
    sources: [
      {
        label: "WHO, Risk reduction of cognitive decline and dementia (2019 guideline)",
        href: "https://www.who.int/publications/i/item/9789241550543",
      },
      {
        label: "NIA, Preventing Alzheimer’s Disease: What Do We Know?",
        href: "https://www.nia.nih.gov/health/alzheimers-and-dementia/preventing-alzheimers-disease-what-do-we-know",
      },
      {
        label: "Simons and colleagues, Do “brain-training” programs work? (2016)",
        href: "https://doi.org/10.1177/1529100616661983",
      },
      {
        label: "Owen and colleagues, Putting brain training to the test (2010)",
        href: "https://doi.org/10.1038/nature09042",
      },
      {
        label: "NIH news, cognitive speed training follow-up (10 February 2026)",
        href: "https://www.nih.gov/news-events/news-releases/cognitive-speed-training-over-weeks-may-delay-diagnosis-dementia-over-decades",
      },
    ],
    related: ["can-brain-games-prevent-dementia", "competitive-brain-games"],
    productLinks: [
      { href: "/research/methodology", label: "How Two5 reads a study" },
      { href: "/about", label: "What Two5 will not claim" },
    ],
    cta: "The useful next step on this page is the evidence standard, not a signup. Two5 has no open study. The waitlist, linked below the sources, is only for news about the game.",
    ctaHref: "/research/methodology",
    ctaLabel: "Read the evidence standard",
  },
  {
    slug: "can-brain-games-prevent-dementia",
    title: "Can brain games prevent dementia? What the evidence allows us to say",
    seoTitle: "Can brain games prevent dementia? The evidence, without the hype",
    description:
      "No. Ordinary brain games have not been shown to prevent dementia. Here is the difference between that claim, cognitive training research, and when to see a doctor.",
    primaryKeyword: "can brain games prevent dementia",
    keywords: [
      "can brain games prevent dementia",
      "brain games and dementia evidence",
      "memory games dementia claims",
      "cognitive training dementia",
      "do puzzles prevent Alzheimer's",
    ],
    published: "2026-10-27",
    updated: "2026-10-27",
    summary:
      "A direct answer: commercial brain games are not a proven way to prevent dementia, and Two5 does not offer that.",
    answer:
      "No app, including Two5, has been shown to prevent or treat dementia. Health authorities do not treat commercial brain games as protection against Alzheimer’s disease. Some structured cognitive-training trials in older adults have improved the specific skills people practised, and guidelines allow that training may be offered because the evidence of risk reduction is low and uncertain. That is a research finding about defined training, not a reason to buy or play a game as medicine.",
    sections: [
      {
        heading: "The claim, and the answer",
        paragraphs: [
          "“Brain games prevent dementia” treats a hobby, a product, and a disease outcome as one thing. They are not. Dementia is a clinical syndrome with many causes. Alzheimer’s disease is the most common cause of dementia in older adults. Preventing it would mean fewer people develop the disease, shown in proper studies — not a higher score on a puzzle.",
          "The National Institute on Aging tells readers to be wary of claims that computer or online games improve memory and thinking, because commercial programs have not been shown to match the effects seen in cognitive-training trials. The World Health Organization’s 2019 recommendation on cognitive training is conditional and based on very low to low quality evidence. It is about offering training to older adults with normal cognition or mild cognitive impairment. It is not a consumer-app endorsement, and it sits next to stronger advice on things like physical activity, tobacco, and blood pressure.",
        ],
      },
      {
        heading: "What a study would have to show",
        paragraphs: [
          "A prevention claim needs a defined group of people, a defined activity, a comparison group, enough time, and an outcome that is the disease or a validated clinical measure — not only “got better at the game.” Observational studies that find puzzle players have lower risk can be useful signals. People who do puzzles may also differ in education, health, and social life. Those studies do not prove the puzzles caused the difference.",
          "Near transfer (better at the trained task) can be real and still say nothing about dementia. Far transfer to daily function is a higher bar. A clinical outcome, years later, is a higher bar again. The February 2026 NIH note is about one ACTIVE protocol: speed-of-processing training plus later booster sessions, and later diagnosis codes in Medicare data. Speed training without boosters, and the memory and reasoning arms, did not show the same association. It does not show that puzzles, memory apps, or Two5 prevent dementia.",
        ],
      },
      {
        heading: "What to do with worry about memory",
        paragraphs: [
          "Forgetting a name occasionally is common. A change that interferes with daily life is a reason to talk to a doctor, not a reason to download a game and wait. Two5 will not label anyone as impaired from a score, and this website does not collect health information on the waitlist.",
          "Enjoying hard problems is a good enough reason to want Two5. Protection from dementia is not a reason we can honestly offer.",
        ],
      },
    ],
    sources: [
      {
        label: "NIA, Preventing Alzheimer’s Disease: What Do We Know?",
        href: "https://www.nia.nih.gov/health/alzheimers-and-dementia/preventing-alzheimers-disease-what-do-we-know",
      },
      {
        label: "NIA, Cognitive health and older adults",
        href: "https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults",
      },
      {
        label: "WHO, Risk reduction of cognitive decline and dementia (2019)",
        href: "https://www.who.int/publications/i/item/9789241550543",
      },
      {
        label: "NIH news, cognitive speed training follow-up (10 February 2026)",
        href: "https://www.nih.gov/news-events/news-releases/cognitive-speed-training-over-weeks-may-delay-diagnosis-dementia-over-decades",
      },
    ],
    related: ["what-research-says-about-brain-games", "competitive-brain-games"],
    productLinks: [
      { href: "/about", label: "What Two5 is, and what it refuses to claim" },
      { href: "/research/methodology", label: "How a claim gets onto this site" },
    ],
    cta: "If you came here for a medical answer: brain games are not a prevention program, and Two5 is not enrolling patients. The pages below explain the product and the evidence rule. A waitlist link is on this page only so it is not confused with a study.",
    ctaHref: "/about",
    ctaLabel: "Read what Two5 is",
  },
];

const researchGuides: Record<string, string[]> = {
  numbers: ["number-sequence-puzzles", "math-puzzles-for-adults"],
  logic: ["logic-puzzles-with-answers", "competitive-brain-games"],
  "computer-science": ["algorithm-puzzles"],
  "memory-visual": ["competitive-brain-games"],
};

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function guidesForResearch(arenaSlug: string) {
  const slugs = researchGuides[arenaSlug] ?? [];
  return slugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => Boolean(post));
}
