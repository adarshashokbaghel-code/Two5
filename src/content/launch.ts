import { LEGAL_CONTACT } from "@/content/legal";

/** Calendar milestones are India Standard Time (UTC+5:30, no daylight saving). */
const IST = "+05:30";

export const launchDates = {
  waitlistOpens: "2026-10-29",
  waitlistCloses: "2026-11-30",
  selection: "2026-12-01",
  productLive: "2026-12-12",
  betaEnds: "2027-01-01",
  inviteUnlock: "2027-01-01",
} as const;

export type StageStatus = "OPEN" | "UPCOMING" | "ACTIVE" | "COMPLETE" | "PLANNED";

export type LaunchPhase = "waitlist" | "selection" | "founding" | "invites" | "launch";

export type FaqLink = { href: string; label: string };

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  links?: FaqLink[];
};

export type TimelineStage = {
  id: string;
  title: string;
  status: StageStatus;
};

export type Milestone = {
  id: string;
  date: string;
  title: string;
  description: string;
  expect: string;
  status: StageStatus;
  cta?: { href: string; label: string; source: string };
};

export type HomeAccessStep = {
  index: string;
  title: string;
  when: string;
  body: string;
};

export type LaunchSnapshot = {
  phase: LaunchPhase;
  announcement: string;
  nextMilestone: string;
  stages: TimelineStage[];
  milestones: Milestone[];
  homeSteps: HomeAccessStep[];
};

export function istMidnight(isoDate: string) {
  return new Date(`${isoDate}T00:00:00${IST}`).getTime();
}

function statusBetween(
  now: number,
  start: string,
  end: string | null,
): StageStatus {
  if (now < istMidnight(start)) return "UPCOMING";
  if (end && now >= istMidnight(end)) return "COMPLETE";
  return "ACTIVE";
}

export function launchSnapshot(now = new Date()): LaunchSnapshot {
  const t = now.getTime();
  const dec1 = istMidnight(launchDates.selection);
  const dec12 = istMidnight(launchDates.productLive);
  const jan1 = istMidnight(launchDates.inviteUnlock);

  let phase: LaunchPhase = "waitlist";
  if (t >= jan1) phase = "invites";
  else if (t >= dec12) phase = "founding";
  else if (t >= dec1) phase = "selection";

  const announcement =
    phase === "waitlist"
      ? "Waitlist open through Nov 30. 200 selected on Dec 1."
      : phase === "selection"
        ? "The first 200 are selected. A WhatsApp invite is sent. The product launches for them on December 12."
        : phase === "founding"
          ? "The product is live for the 200. From January 1, one invite per person."
          : "One invite per person. Each of the 200 can invite one player.";

  const nextMilestone =
    t < dec1
      ? "DECEMBER 1, 2026"
      : t < dec12
        ? "DECEMBER 12, 2026"
        : t < jan1
          ? "JANUARY 1, 2027"
          : "LATER ACCESS WAVES";

  const stages: TimelineStage[] = [
    {
      id: "waitlist",
      title: "Waitlist",
      status: t < dec1 ? "OPEN" : "COMPLETE",
    },
    {
      id: "selection",
      title: "First 200 selected",
      status: statusBetween(t, launchDates.selection, "2026-12-02"),
    },
    {
      id: "live",
      title: "Product launch",
      status: t < dec12 ? "UPCOMING" : "ACTIVE",
    },
    {
      id: "invites",
      title: "One invite each",
      status: t < jan1 ? "UPCOMING" : "ACTIVE",
    },
  ];

  const milestones: Milestone[] = [
    {
      id: "waitlist-open",
      date: "October 29–November 30, 2026",
      title: "Waitlist opens",
      status: t < dec1 ? "OPEN" : "COMPLETE",
      description:
        "The waitlist stays open through November 30. Registering records your interest. It is not access to the game.",
      expect:
        "You can register your interest, read how Two5 is being built, and follow launch announcements. Joining does not reserve a place. The list closes for this draw on November 30.",
      cta: { href: "/#waitlist", label: "Join the waitlist", source: "roadmap-milestone-waitlist" },
    },
    {
      id: "selection",
      date: "December 1, 2026",
      title: "200 selected",
      status: statusBetween(t, launchDates.selection, "2026-12-02"),
      description:
        "Two hundred people are selected from the waitlist, and a WhatsApp invite is sent to them. The product is not live yet. Selection is a random draw, not a test of skill.",
      expect:
        "Selected people get the WhatsApp invite on December 1. Everyone else stays on the waitlist. Selection does not open the product that day.",
    },
    {
      id: "live",
      date: "December 12, 2026",
      title: "Product launch for the 200",
      status: t < dec12 ? "UPCOMING" : "ACTIVE",
      description:
        "The product launches only for these 200. Nobody else can play that day.",
      expect:
        "The selected players can use the live product. Other people stay on the waitlist until January 1, when each person can send one invite.",
    },
    {
      id: "invites",
      date: "January 1, 2027",
      title: "One invite per person",
      status: t < jan1 ? "UPCOMING" : "ACTIVE",
      description:
        "From January 1, each of the 200 can invite one person to play. One invite per person.",
      expect:
        "That invite is for one new player. One person cannot send more than one. This is the first time someone outside the 200 can be invited in. An invite can fail if it expires, is withdrawn, or breaks the published rules.",
    },
    {
      id: "waves",
      date: "After January 1 — date to be announced",
      title: "Progressive access waves",
      status: "PLANNED",
      description:
        "Later waves depend on reliability, player feedback, product readiness, whether rounds are worth replaying, and whether the team can support more players.",
      expect:
        "There is no date for open registration. The waitlist remains the way to be considered for a later wave.",
    },
    {
      id: "evolution",
      date: "Future development",
      title: "Training and competition evolution",
      status: "PLANNED",
      description:
        "These are directions under consideration. They are not delivery commitments, and they are not features you can use today.",
      expect:
        "Possible later work includes more training arenas, more challenge types, a clearer performance history, adaptive difficulty where it helps, daily challenges, friend challenges, and fuller progress summaries.",
    },
  ];

  const homeSteps: HomeAccessStep[] = [
    {
      index: "01",
      title: "Join the waitlist",
      when: t < dec1 ? "Now through November 30" : "October 29–November 30, 2026",
      body: "Register your interest and receive launch updates. Joining the waitlist does not guarantee selection.",
    },
    {
      index: "02",
      title: "200 selected",
      when: "December 1",
      body: "Two hundred people are selected and sent a WhatsApp invite. The product is not live yet.",
    },
    {
      index: "03",
      title: "Product launch",
      when: "December 12",
      body: "The product launches only for these 200. Nobody else can play yet.",
    },
    {
      index: "04",
      title: "One invite each",
      when: "January 1",
      body: "Each person can invite one player. One invite per person. That is the first time someone outside the group can join.",
    },
  ];

  return { phase, announcement, nextMilestone, stages, milestones, homeSteps };
}

/** Static shell used before the request-time snapshot streams in. Matches the pre-selection phase. */
export const previewSnapshot = launchSnapshot(new Date("2026-10-29T08:00:00+05:30"));

export const researchSources = [
  {
    href: "https://pubmed.ncbi.nlm.nih.gov/39235660/",
    label:
      "Zhu et al. (2025). Cognitive training during midlife: a systematic review and meta-analysis. Neuropsychology Review.",
    note: "The review looked at cognitive training in healthy middle-aged adults, including game-based training, and reported gains on some measured domains in that group. Near-transfer and far-transfer were treated separately. It is not a study of Two5.",
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13199227/",
    label:
      "Systematic review of serious games for training attention and executive functions.",
    note: "Cited as background on that research area. It does not evaluate Two5, and its findings should not be read as proof that this product works.",
  },
  {
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    label: "Google Search Central. SEO Starter Guide.",
    note: "A reference for keeping these pages crawlable. It is not evidence about mental training.",
  },
] as const;

export const designPrinciples = [
  {
    title: "Specific task demands",
    body: "Identify what a challenge actually asks the player to do, instead of labelling any short game as brain training.",
  },
  {
    title: "Useful feedback",
    body: "Show the result, and make the relevant miss or the shape of the performance readable.",
  },
  {
    title: "Progressive challenge",
    body: "Where it fits the task, difficulty can rise as performance improves. That is a design aim, not a claim that every launch game already adapts.",
  },
  {
    title: "Variety",
    body: "Use different challenge structures so one narrow skill is not treated as the whole of cognitive ability.",
  },
  {
    title: "Honest measurement",
    body: "A better score on a game is a better score on that game. It is not, by itself, a measure of general intelligence or real-world ability.",
  },
] as const;

export const faqs: FaqItem[] = [
  {
    id: "what",
    q: "What is Two5?",
    a: "Two5 is a mental training and competition platform being built around purposeful challenges, performance feedback, and ways to track progress and compete.",
  },
  {
    id: "live",
    q: "Is Two5 live yet?",
    a: "The website and waitlist are live. The waitlist stays open through November 30, 2026. On December 1, 200 people are selected and sent a WhatsApp invite. The product launches for them on December 12. You cannot play a round on this website.",
  },
  {
    id: "selection-date",
    q: "When will the first 200 players be selected?",
    a: "December 1, 2026. A WhatsApp invite is sent to the selected people that day. The product launches for them on December 12.",
  },
  {
    id: "selection-how",
    q: "How are the first 200 players selected?",
    a: "The plan is a random draw of 200 people from the waitlist. It is not a test of skill. Joining the waitlist does not guarantee selection.",
  },
  {
    id: "guarantee",
    q: "Does joining the waitlist guarantee access?",
    a: "No. The waitlist is how you ask to be considered, and it stays open through November 30. Two hundred people are selected on December 1. Everyone else can stay on the list.",
  },
  {
    id: "not-selected",
    q: "What happens if I am not selected?",
    a: "You can remain on the waitlist for future access waves. There is no date by which every applicant will be invited.",
  },
  {
    id: "launch",
    q: "When does Two5 launch?",
    a: "The product launches on December 12, 2026, only for the 200 selected on December 1. From January 1, 2027, each person can invite one player. One invite per person.",
  },
  {
    id: "invites",
    q: "How do invitations work?",
    a: "From January 1, 2027, each person can send one invite. One invite per person, for one new player. An invite can fail if it expires, is withdrawn, or breaks the published rules.",
  },
  {
    id: "whatsapp",
    q: "Do I need to join WhatsApp?",
    a: "Selected players are sent a WhatsApp invite on December 1. Phone numbers in that group can be visible to other members. Feedback can also go to the contact address.",
    links: [{ href: "/contact", label: "Contact the team" }],
  },
  {
    id: "free",
    q: "Is Two5 free?",
    a: "Joining the waitlist is free. No payment is taken on this site. Pricing for the product is not set, and this page does not promise that every future feature will stay free. Any paid feature will be explained before launch.",
  },
  {
    id: "games",
    q: "What kinds of games will Two5 have?",
    a: "Two5 is being designed around challenges that involve patterns, reasoning, memory, attention, and related kinds of mental effort. Numbers and Logic are the launch arenas. Computer Science and Memory & Visual are planned for later waves. The exact lineup will be shown as each arena is ready. Unreleased game names are not listed here.",
  },
  {
    id: "intelligence",
    q: "Will Two5 improve my intelligence or memory?",
    a: "Two5 is meant to offer structured mental challenges and feedback on how you did. Research on cognitive training shows mixed, task-dependent results. Two5 has not shown that its games improve general intelligence, school results, or everyday memory, and it does not claim to prevent cognitive decline.",
    links: [{ href: "/roadmap#research", label: "Read the evidence note" }],
  },
  {
    id: "devices",
    q: "Can I use Two5 on my phone?",
    a: "This website works in current mobile and desktop browsers. The training product is not open yet, so a supported-device list for the app will be published when selected players receive access. Do not assume every phone or browser will run the product on day one.",
  },
  {
    id: "contact",
    q: "How can I contact the team?",
    a: `Use the contact page or write to ${LEGAL_CONTACT}. That address covers the product, privacy, and launch questions. It is not a medical helpline.`,
    links: [{ href: "/contact", label: "Contact Two5" }],
  },
  {
    id: "friends",
    q: "Can I challenge my friends?",
    a: "Friend challenges are part of the later plan, not part of the first playable release. From January 1, each person can send one invite. One invite per person. That invite is access, not an in-game challenge mode.",
  },
];

const homepageFaqIds = [
  "what",
  "live",
  "selection-date",
  "guarantee",
  "launch",
  "invites",
  "free",
] as const;

export function faqsById(ids: readonly string[]) {
  return ids.map((id) => {
    const item = faqs.find((entry) => entry.id === id);
    if (!item) throw new Error(`Missing FAQ: ${id}`);
    return item;
  });
}

export const homepageFaqs = faqsById(homepageFaqIds);

export const homePillars = [
  {
    index: "01",
    title: "Train",
    headline: "Challenge the way you think.",
    body: "Explore short, structured challenges built around different forms of mental effort.",
    note: "Numbers and Logic are the launch arenas. Other arenas are planned, not playable.",
  },
  {
    index: "02",
    title: "Track",
    headline: "Make progress visible.",
    body: "Use scores, personal bests, and performance history to understand how you're doing.",
    note: "Personal scores are part of the product plan. A full history across every arena is still being built.",
  },
  {
    index: "03",
    title: "Compete",
    headline: "Put your thinking to the test.",
    body: "Prepare for head-to-head challenges, shared scores, and competitive formats as they become available.",
    note: "Live multiplayer is not part of the first release. Competition opens in later formats, not on day one.",
  },
] as const;

export const afterJoin = [
  {
    index: "1",
    title: "Register",
    body: "Submit your email through the waitlist form. The current form also asks for your name and age so the account can be created.",
  },
  {
    index: "2",
    title: "Wait for selection",
    body: "The waitlist stays open through November 30. On December 1, 200 people are selected and sent a WhatsApp invite. Most people on the list will not be selected.",
  },
  {
    index: "3",
    title: "Play, then invite",
    body: "If you are selected, the product launches for you on December 12. From January 1, you can invite one person to play. One invite per person.",
  },
] as const;

export const foundingBenefits = [
  "Selected on December 1, with a WhatsApp invite sent that day.",
  "Product launch on December 12, only for these 200.",
  "From January 1, one invite per person.",
  "Early access to future features when they are offered.",
  "A chance to help improve the experience before more people get in.",
] as const;
