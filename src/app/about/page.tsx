import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage, InfoSection } from "@/components/layout/info-page";
import { ResearchCta } from "@/components/research/research-cta";
import { siteConfig } from "@/config/site";

const title = "About Two5";
const description =
  "Two5 is a competitive brain-challenge game in development. This page says who it is for now, what the longer direction is, and what we will not claim about health.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "/about",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <InfoPage
      path="/about"
      title={title}
      description={description}
      eyebrow={[{ label: "About" }]}
      lede="Two5 is a game people will play, score, and come back to. It is not a course, and it is not a medical treatment. The first job is a sharp challenge. A longer research direction sits behind that, and it stays labelled as a direction."
    >
      <InfoSection title="What Two5 is">
        <p>
          Two5 is being built as a place for short, structured challenges in mathematics, logic, computer science,
          and reasoning. Numbers and Logic are the first categories. Computer Science and Memory & Visual are the
          next expansion. You cannot play a round on this website today. Friend challenges and leaderboards have
          been described. They are not switched on.
        </p>
        <p>
          The feeling we want is participation: a clear problem, a result you can compare with your last one, and a
          reason to try again. That is different from reading a lesson or scrolling a pile of static puzzles with no
          return path.
        </p>
      </InfoSection>
      <InfoSection title="Why we are building it">
        <p>
          A lot of time online is spent watching or skimming. A challenge asks you to commit an answer. We think that
          difference matters to people who already like problems — college students and working professionals first —
          whether or not a lab later finds a wider benefit. We are not claiming the product is clinically better than
          anything else.
        </p>
      </InfoSection>
      <InfoSection title="What we are trying to build">
        <p>
          Near term: challenges that are understandable, repeatable, and honest about the score. Medium term: tighter
          challenge design, clearer difficulty, and interfaces that more people can use without a manual. Long term:
          a research-informed practice, including accessible play for older adults, only with the evidence and the
          partnerships that kind of work actually requires.
        </p>
        <p>
          Older adults are not a single audience and they are not assumed to be impaired. Accessibility is a design
          requirement for everyone. Suitability for people living with dementia is not something this site claims.
        </p>
      </InfoSection>
      <InfoSection title="Who it is for today">
        <p>
          Today’s public site is for people who enjoy numbers, logic, and hard problems, and for anyone who wants a
          straight account of the research. Students and working professionals are the first players we are designing
          for. Caregivers and clinicians will find the evidence pages written for them too. Those pages are
          information, not a funnel into a study.
        </p>
      </InfoSection>
      <InfoSection title="How research fits">
        <p>
          Design choices should follow credible evidence, say what was measured, and say what was not. Product
          analytics — a waitlist signup, a future score — are not scientific results. Proposed questions, including
          questions about cognitive ageing, are not completed studies. Two5 has not run a clinical trial.
        </p>
        <p>
          The standard we use before a health sentence goes on the site is written on the{" "}
          <Link href="/research/methodology" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
            methodology page
          </Link>
          . Category notes on{" "}
          <Link href="/research" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
            what a round is meant to train
          </Link>{" "}
          stay separate from that.
        </p>
      </InfoSection>
      <InfoSection title="What Two5 does not claim">
        <p>
          Playing Two5 does not prevent dementia, reverse cognitive decline, treat disease, or replace a clinician.
          A score is not a diagnosis and not a risk number. Entertainment and improvement on a task are not clinical
          outcomes. If a future study finds something narrower, we will describe that study, its population, and its
          limits — we will not upgrade it into a slogan.
        </p>
      </InfoSection>
      <InfoSection title="Principles">
        <ul className="list-disc space-y-2 pl-5">
          <li>Evidence over hype.</li>
          <li>Accessible design, without pretending every need is the same.</li>
          <li>Plain explanations of what a number means.</li>
          <li>Respect for different abilities and levels of experience.</li>
          <li>Privacy-conscious measurement. The waitlist does not ask about health.</li>
          <li>Limitations stated next to the claim.</li>
          <li>No invented partners, awards, user counts, or trial results.</li>
        </ul>
      </InfoSection>
      <InfoSection title="Join the journey">
        <p>
          Joining the waitlist registers interest in the game and asks for launch news. It does not enroll you in
          research, start a round, or promise a date. Researchers who want to talk about a future collaboration can
          write from the{" "}
          <Link href="/research/collaborate" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
            collaboration page
          </Link>
          . That mailbox is not a study hotline.
        </p>
        <div className="pt-2">
          <ResearchCta href="/#waitlist" label="Join the waitlist" source="about" />
        </div>
      </InfoSection>
    </InfoPage>
  );
}
