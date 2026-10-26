export type LegalSection = {
  index: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDoc = {
  slug: "privacy" | "terms" | "cookies";
  navLabel: string;
  band: string;
  title: string;
  summary: string;
  updated: string;
  contact: string;
  sections: LegalSection[];
};

export const LEGAL_CONTACT = "hello@two5.in";
export const LEGAL_UPDATED = "27 October 2026";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    navLabel: "Privacy",
    band: "Privacy",
    title: "Privacy Policy.",
    summary:
      "How Two5 collects, uses, and protects information when you join the waitlist, create an account, or play a round. Short version: we take what we need to run the game, and we do not sell your data.",
    updated: LEGAL_UPDATED,
    contact: LEGAL_CONTACT,
    sections: [
      {
        index: "01",
        heading: "Who we are",
        paragraphs: [
          "Two5 (“Two5”, “we”, “us”) is a short-round challenge product for numbers, logic, and related thinking games. This Privacy Policy covers two5.in and related early-access surfaces we operate.",
          `Questions about privacy go to ${LEGAL_CONTACT}.`,
        ],
      },
      {
        index: "02",
        heading: "What this covers",
        paragraphs: [
          "This policy applies when you visit the site, join the waitlist, verify an account with a one-time code, play challenges, or contact us. If we launch new arenas (daily problems, friend challenges, or paid features), we will update this page and the effective date above.",
        ],
      },
      {
        index: "03",
        heading: "Information we collect",
        paragraphs: [
          "We collect only what we need to run early access and the game loop.",
        ],
        bullets: [
          "Account and waitlist details: name, email address, and age you provide.",
          "Authentication data: one-time passcodes (stored as a secure hash), send and attempt limits, and account ID.",
          "Session data: a signed session cookie so you stay signed in after verification.",
          "Gameplay data: challenge choices, scores, completion status, and similar progress signals as features open.",
          "Technical data: device/browser type, approximate location from IP, pages viewed, and diagnostic logs needed to keep the service reliable.",
          "Communications: messages you send us, and product updates you opt into by joining the waitlist.",
        ],
      },
      {
        index: "04",
        heading: "How we use information",
        paragraphs: ["We use your information to:"],
        bullets: [
          "Create and secure your Two5 account, including email OTP verification.",
          "Send waitlist, launch, and early-access updates you asked for.",
          "Run challenges, save scores, and show progress as those features ship.",
          "Prevent abuse (rate limits, failed-code locks, fraud and spam checks).",
          "Understand product performance with first-party analytics events (for example page views and waitlist funnel steps).",
          "Comply with law and enforce our Terms.",
        ],
      },
      {
        index: "05",
        heading: "Legal bases",
        paragraphs: [
          "Where a privacy law requires a legal basis (including GDPR-style rules), we rely on: performance of a contract (running your account and the game); legitimate interests (security, product improvement, non-intrusive analytics); consent (optional marketing emails where required); and legal obligation when the law asks us to retain or disclose information.",
        ],
      },
      {
        index: "06",
        heading: "Sharing",
        paragraphs: [
          "We do not sell personal information. We may share data with:",
        ],
        bullets: [
          "Infrastructure providers that host our database, email delivery, and website (acting on our instructions).",
          "Analytics or error tools we enable later, only as needed to operate Two5.",
          "Authorities when required by law, or to protect players, Two5, or others from harm or abuse.",
          "A successor entity if Two5 is involved in a merger, acquisition, or asset transfer, with notice where required.",
        ],
      },
      {
        index: "07",
        heading: "Cookies and similar tech",
        paragraphs: [
          "We use a session cookie to keep you signed in after OTP verification, plus essential cookies needed for security and basic site function. See our Cookie Policy for the full list and choices.",
        ],
      },
      {
        index: "08",
        heading: "Retention",
        paragraphs: [
          "Waitlist and account records are kept while your account is active and for a reasonable period afterward so we can provide support, prevent abuse, and meet legal duties. OTP codes expire quickly (minutes). Session cookies last up to about 30 days unless you sign out or clear them. You can ask us to delete your account data as described below.",
        ],
      },
      {
        index: "09",
        heading: "Security",
        paragraphs: [
          "We use industry-standard measures such as hashed one-time codes, signed session tokens, transport encryption (HTTPS), and access controls on production systems. No online service is perfectly secure; protect your email inbox, since that is how we verify you today.",
        ],
      },
      {
        index: "10",
        heading: "Children",
        paragraphs: [
          "Two5 is not directed at children under 13. You must meet the minimum age in our Terms to create an account. We do not knowingly collect personal information from children under 13. If you believe a child provided data, contact us and we will delete it.",
        ],
      },
      {
        index: "11",
        heading: "Your rights",
        paragraphs: [
          "Depending on where you live, you may have rights to access, correct, delete, or export your personal information, object to or restrict certain processing, and withdraw consent where processing is based on consent. To exercise these rights, email us from the address on your account. We may need to verify it is you.",
          "If you are in the EEA/UK, you may also lodge a complaint with your local supervisory authority. If you are in India, you may have rights under applicable Indian data protection law as it comes into force.",
        ],
      },
      {
        index: "12",
        heading: "International transfers",
        paragraphs: [
          "Two5 may be hosted or supported using providers in India and other countries. When we transfer personal information internationally, we use appropriate safeguards required by applicable law.",
        ],
      },
      {
        index: "13",
        heading: "Changes",
        paragraphs: [
          "We may update this Privacy Policy as Two5 grows (new arenas, payments, or social features). We will change the “Last updated” date and, for material changes, provide additional notice on the site or by email when appropriate.",
        ],
      },
      {
        index: "14",
        heading: "Contact",
        paragraphs: [
          `Privacy requests: ${LEGAL_CONTACT}. Website: https://two5.in.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    navLabel: "Terms",
    band: "Terms",
    title: "Terms of Play.",
    summary:
      "The rules of the arena. By using Two5 you agree to these Terms. Play fair, keep your account secure, and treat other players the way you want to be challenged.",
    updated: LEGAL_UPDATED,
    contact: LEGAL_CONTACT,
    sections: [
      {
        index: "01",
        heading: "Agreement",
        paragraphs: [
          "These Terms of Service (“Terms”) are a contract between you and Two5 for use of two5.in, the waitlist, accounts, challenges, and related services (the “Service”). If you do not agree, do not use Two5.",
        ],
      },
      {
        index: "02",
        heading: "What Two5 is",
        paragraphs: [
          "Two5 turns numbers, logic, computer science, and memory/visual challenges into short scored rounds. Some categories (such as Computer Science and Memory & Visual) may be listed as planned or coming soon. Features described on the marketing site are not a guarantee of availability, timing, or final design.",
          "Two5 is a game and practice product. Scores measure performance on our problems. They are not clinical assessments, academic credentials, IQ scores, or professional certifications.",
        ],
      },
      {
        index: "03",
        heading: "Eligibility",
        paragraphs: [
          "You must be at least 13 years old to create an account or join the waitlist. If you are under 18 (or the age of majority where you live), you may use Two5 only with a parent or guardian’s permission, and they agree to these Terms on your behalf.",
          "We may ask for your age to confirm eligibility. Providing false age information is a breach of these Terms.",
        ],
      },
      {
        index: "04",
        heading: "Accounts and waitlist",
        paragraphs: [
          "Early access may require joining a waitlist and verifying your email with a one-time code. You agree to provide accurate name, email, and age information, and to keep your email secure.",
          "You are responsible for activity under your account. Notify us promptly if you suspect unauthorized access. We may refuse, suspend, or reclaim accounts that look abusive, automated, or fraudulent.",
        ],
      },
      {
        index: "05",
        heading: "Fair play",
        paragraphs: [
          "Two5 is meant to be a sharp, honest game. You agree not to:",
        ],
        bullets: [
          "Cheat, exploit bugs, use bots, scripts, or unauthorized automation.",
          "Manipulate scores, leaderboards, streaks, or friend challenges.",
          "Share answers in a way that ruins a live round for others, when competitive modes exist.",
          "Harass, threaten, or abuse other players or our team.",
          "Scrape, reverse engineer, or attack the Service.",
          "Use Two5 for any illegal purpose.",
        ],
      },
      {
        index: "06",
        heading: "User content and feedback",
        paragraphs: [
          "If you send feedback, ideas, or other content to Two5, you grant us a worldwide, royalty-free license to use it to operate and improve the Service. You keep ownership of your feedback; we keep ownership of Two5.",
          "Do not submit content that is unlawful, infringing, or that you do not have the right to share.",
        ],
      },
      {
        index: "07",
        heading: "Our intellectual property",
        paragraphs: [
          "Two5, including the brand, site design, challenge content, software, and artwork, is owned by Two5 or its licensors. You get a limited, personal, non-exclusive, non-transferable license to use the Service for its intended purpose. You may not copy, resell, or redistribute our problems or branding without permission.",
        ],
      },
      {
        index: "08",
        heading: "Beta and early access",
        paragraphs: [
          "During waitlist and early access, features may change, break, reset, or disappear. Scores and progress from beta periods may not carry forward. We are not liable for lost progress during pre-launch phases.",
        ],
      },
      {
        index: "09",
        heading: "Pricing",
        paragraphs: [
          "Two5 may offer free play, premium features, or other paid options later. Prices, trials, and renewals will be shown before you buy. Unless a purchase flow says otherwise, fees are non-refundable to the extent allowed by law. App-store purchases follow that store’s refund rules.",
        ],
      },
      {
        index: "10",
        heading: "Third-party services",
        paragraphs: [
          "The Service may link to third-party sites or rely on providers (email, hosting, analytics). We are not responsible for third-party terms or practices. Your use of those services is between you and them.",
        ],
      },
      {
        index: "11",
        heading: "Disclaimers",
        paragraphs: [
          "THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, TWO5 DISCLAIMS WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Service will be uninterrupted, error-free, or that scores will meet any personal, academic, or professional goal.",
        ],
      },
      {
        index: "12",
        heading: "Limitation of liability",
        paragraphs: [
          "TO THE MAXIMUM EXTENT PERMITTED BY LAW, TWO5 AND ITS TEAM WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM OR (B) USD $50.",
          "Some places do not allow certain limitations; in those places, our liability is limited to the fullest extent allowed.",
        ],
      },
      {
        index: "13",
        heading: "Indemnity",
        paragraphs: [
          "You agree to defend and indemnify Two5 against claims arising from your misuse of the Service, your content, or your breach of these Terms, to the extent permitted by law.",
        ],
      },
      {
        index: "14",
        heading: "Suspension and termination",
        paragraphs: [
          "You may stop using Two5 at any time. We may suspend or end access if you break these Terms, create risk or legal exposure, or if we discontinue the Service. Provisions that should survive (including IP, disclaimers, and liability limits) will survive termination.",
        ],
      },
      {
        index: "15",
        heading: "Governing law",
        paragraphs: [
          "These Terms are governed by the laws of India, without regard to conflict-of-law rules, unless mandatory consumer protections in your country say otherwise. Courts in India will have exclusive jurisdiction for disputes that are not resolved informally, subject to those mandatory protections.",
        ],
      },
      {
        index: "16",
        heading: "Changes",
        paragraphs: [
          "We may update these Terms as the product evolves. Continued use after the updated Terms are posted means you accept them. If you do not agree, stop using Two5.",
        ],
      },
      {
        index: "17",
        heading: "Contact",
        paragraphs: [
          `Questions about these Terms: ${LEGAL_CONTACT}.`,
        ],
      },
    ],
  },
  {
    slug: "cookies",
    navLabel: "Cookies",
    band: "Cookies",
    title: "Cookie Policy.",
    summary:
      "What cookies and similar technologies Two5 uses, why we use them, and how you can control them. Built for a sharp game — not a tracking maze.",
    updated: LEGAL_UPDATED,
    contact: LEGAL_CONTACT,
    sections: [
      {
        index: "01",
        heading: "What cookies are",
        paragraphs: [
          "Cookies are small text files stored on your device. We also use similar technologies such as local storage and signed session tokens. Together we call them “cookies” in this policy.",
        ],
      },
      {
        index: "02",
        heading: "How Two5 uses cookies",
        paragraphs: ["Today, Two5 primarily uses cookies to:"],
        bullets: [
          "Keep you signed in after email OTP verification (session cookie).",
          "Protect the Service against abuse and keep essential features working.",
          "Remember basic preferences needed for the site to function.",
          "Measure first-party product events (for example landing and waitlist funnel steps) so we can improve Two5.",
        ],
      },
      {
        index: "03",
        heading: "Types we use",
        paragraphs: [],
        bullets: [
          "Essential: required for login, security, and core navigation. The Service may not work correctly without them.",
          "Functional: remember simple choices that improve the experience.",
          "Analytics: help us understand how people move through the waitlist and site. We aim to keep this first-party and minimal.",
          "Marketing: not used by default on the current waitlist site. If we add them later, we will update this page and ask for consent where required.",
        ],
      },
      {
        index: "04",
        heading: "Key cookie details",
        paragraphs: [
          "Session cookie name: two5_session. Purpose: authenticated session after OTP verify. Typical life: up to about 30 days. Type: essential / first-party.",
          "We may also set short-lived technical cookies from our hosting or security layer. Those are limited to operating and protecting the site.",
        ],
      },
      {
        index: "05",
        heading: "Your choices",
        paragraphs: [
          "You can block or delete cookies in your browser settings. If you block essential cookies, you may not be able to stay signed in or complete verification.",
          "Where the law requires consent for non-essential cookies, we will present a choice before setting them. You can also email us to ask what is currently active on your account.",
        ],
      },
      {
        index: "06",
        heading: "Updates",
        paragraphs: [
          "As Two5 adds features (leaderboards, friend challenges, payments), cookie use may expand. We will revise this Cookie Policy and the “Last updated” date when that happens.",
        ],
      },
      {
        index: "07",
        heading: "Contact",
        paragraphs: [
          `Cookie questions: ${LEGAL_CONTACT}. Also see our Privacy Policy for the wider picture.`,
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: LegalDoc["slug"]) {
  return legalDocs.find((doc) => doc.slug === slug);
}
