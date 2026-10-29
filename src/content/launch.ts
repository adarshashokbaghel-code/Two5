import { LEGAL_CONTACT } from "@/content/legal";

/** Calendar milestones are India Standard Time (UTC+5:30, no daylight saving). */
const IST = "+05:30";

export const launchDates = {
  waitlistOpens: "2026-10-29",
  waitlistCloses: "2026-11-30",
  selection: "2026-12-01",
  inviteUnlock: "2026-12-05",
  betaEnds: "2026-12-11",
  launch: "2026-12-12",
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
  const dec2 = istMidnight("2026-12-02");
  const dec5 = istMidnight(launchDates.inviteUnlock);
  const dec12 = istMidnight(launchDates.launch);
  const dec13 = istMidnight("2026-12-13");

  let phase: LaunchPhase = "waitlist";
  if (t >= dec12) phase = "launch";
  else if (t >= dec5) phase = "invites";
  else if (t >= dec2) phase = "founding";
  else if (t >= dec1) phase = "selection";

  const announcement =
    phase === "waitlist"
      ? "First 200 players will be announced on Dec 1, 2026."
      : phase === "selection"
        ? "Selection is in progress."
        : phase === "founding" || phase === "invites"
          ? "The founding cohort is active."
          : t < dec13
            ? "Official launch is December 12. Access stays invite-only."
            : "Two5 is in its invite-only launch. The waitlist stays open for later waves.";

  const nextMilestone =
    t < dec1
      ? "DECEMBER 1, 2026"
      : t < dec5
        ? "DECEMBER 5, 2026"
        : t < dec12
          ? "DECEMBER 12, 2026"
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
      id: "founding",
      title: "Founding cohort",
      status: t < dec1 ? "UPCOMING" : t < dec12 ? "ACTIVE" : "COMPLETE",
    },
    {
      id: "invites",
      title: "Invite unlock",
      status: t < dec5 ? "UPCOMING" : t < dec12 ? "ACTIVE" : "COMPLETE",
    },
    {
      id: "launch",
      title: "Official launch",
      status: t < dec12 ? "UPCOMING" : "ACTIVE",
    },
  ];

  const milestones: Milestone[] = [
    {
      id: "waitlist-open",
      date: "October 29–November 30, 2026",
      title: "Waitlist opens",
      status: t < dec1 ? "OPEN" : "COMPLETE",
      description:
        "The waitlist is open to people interested in early access. Registering records your interest. It is not access to the game.",
      expect:
        "You can register your interest, read how Two5 is being built, and follow launch announcements. Joining does not reserve a place.",
      cta: { href: "/#waitlist", label: "Join the waitlist", source: "roadmap-milestone-waitlist" },
    },
    {
      id: "selection",
      date: "December 1, 2026",
      title: "First 200 selected",
      status: statusBetween(t, launchDates.selection, "2026-12-02"),
      description:
        "A random draw selects 200 waitlisted applicants. Selection is not based on game skill, because applicants have not played the product yet.",
      expect:
        "Selected people receive an invitation and instructions to claim access. Everyone else stays on the waitlist. Joining does not mean you will be chosen on December 1.",
    },
    {
      id: "beta",
      date: "December 1–11, 2026",
      title: "Live closed beta begins",
      status: t < dec1 ? "UPCOMING" : t < dec12 ? "ACTIVE" : "COMPLETE",
      description:
        "Selected players can use the live product. This is the founding-player period: a closed beta of the product that exists, not a test that happens before the app does.",
      expect:
        "The team watches onboarding, completed rounds, score recording, errors, replays, return visits, and usability notes. A private WhatsApp group is offered to selected players who want it. Joining that group is optional and is not required to use Two5.",
    },
    {
      id: "invites",
      date: "December 5, 2026",
      title: "Three invitations unlock",
      status: t < dec5 ? "UPCOMING" : t < dec12 ? "ACTIVE" : "COMPLETE",
      description:
        "Each claimed founding account is scheduled to receive three unique invitation codes. Three is a maximum, not a quota. Founding players do not have to use them.",
      expect:
        "Each code is meant for one new account and can be redeemed once. Invitees become eligible to register for access on December 12. A code does not guarantee access if it expires, is withdrawn, or breaks the published rules. If a code can be entered before December 12, registration is queued until launch.",
    },
    {
      id: "launch-day",
      date: "December 12, 2026",
      title: "Official product launch",
      status: t < dec12 ? "UPCOMING" : "ACTIVE",
      description:
        "Two5 is officially announced and opens in an invite-only launch. A public launch does not mean anyone can register.",
      expect:
        "Founding players with claimed accounts can continue. People with a valid invitation can register and enter. Everyone else can join the waitlist, follow announcements, and wait for a later wave.",
    },
    {
      id: "waves",
      date: "After December 12 — date to be announced",
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
      title: "First 200 selected",
      when: "December 1",
      body: "Two hundred waitlisted applicants are selected through a random draw. Selected applicants receive an invitation and instructions for the live closed beta.",
    },
    {
      index: "03",
      title: "Founding-player period",
      when: "December 1–11",
      body: "The initial cohort uses the product, sends feedback, and helps surface usability and technical issues. Three invitation codes per claimed founding account become available on December 5.",
    },
    {
      index: "04",
      title: "Official launch",
      when: "December 12",
      body: "Two5 launches with invite-only registration. Founding players and people with a valid invitation code can access the product.",
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
    a: "The website and waitlist are live. The founding-player period is scheduled to begin on December 1, 2026, when selected players get access to the live closed beta. You cannot play a round on this website.",
  },
  {
    id: "selection-date",
    q: "When will the first 200 players be selected?",
    a: "December 1, 2026.",
  },
  {
    id: "selection-how",
    q: "How are the first 200 players selected?",
    a: "The plan is a random draw of 200 people from the waitlist. It is not a test of skill. Joining the waitlist does not guarantee selection.",
  },
  {
    id: "guarantee",
    q: "Does joining the waitlist guarantee access?",
    a: "No. The waitlist is how you ask to be considered. Two hundred applicants are drawn on December 1. Everyone else can stay on the list for a later wave.",
  },
  {
    id: "not-selected",
    q: "What happens if I am not selected?",
    a: "You can remain on the waitlist for future access waves. There is no date by which every applicant will be invited.",
  },
  {
    id: "launch",
    q: "When does Two5 launch?",
    a: "The official product launch is planned for December 12, 2026. Registration stays invite-only at launch.",
  },
  {
    id: "invites",
    q: "How do invitations work?",
    a: "Each claimed founding account is scheduled to receive three unique invitation codes on December 5. Each code is for one new account. Invited players can register and access Two5 from December 12. A code can fail if it expires, is withdrawn, or breaks the published rules.",
  },
  {
    id: "whatsapp",
    q: "Do I need to join WhatsApp?",
    a: "No. The founding-player WhatsApp group is optional. Selected players can use Two5 without joining it. Phone numbers in that group can be visible to other members. Feedback can also go to the contact address, and app access does not depend on the group.",
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
    a: "Friend challenges are part of the later plan, not part of the first playable release. Founding invitations on December 5 are access codes, not an in-game challenge mode.",
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
    body: "The first 200 applicants are selected on December 1. Watch your inbox. Most people on the list will not be selected that day.",
  },
  {
    index: "3",
    title: "Claim access",
    body: "If you are selected, follow the invitation instructions. Access begins during the founding-player period.",
  },
] as const;

export const foundingBenefits = [
  "First access to the live product.",
  "A direct feedback channel during the founding-player period.",
  "Three invitation codes per claimed founding account from December 5.",
  "Early access to future features when they are offered.",
  "A chance to help improve the experience before more people get in.",
] as const;
