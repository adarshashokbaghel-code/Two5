import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage, InfoSection } from "@/components/layout/info-page";
import { siteConfig } from "@/config/site";

const title = "How Two5 reads evidence";
const description =
  "The rules Two5 uses before a health or training claim goes on the site: study type, population, transfer, and the line between a game score and a clinical result.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/research/methodology" },
  openGraph: {
    title,
    description,
    url: "/research/methodology",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function MethodologyPage() {
  return (
    <InfoPage
      path="/research/methodology"
      title={title}
      description={description}
      eyebrow={[{ href: "/research", label: "Research" }]}
      lede="A sentence about brains can be careful or it can be advertising. This page is the filter. It describes a standard. It does not describe a laboratory Two5 already runs."
    >
      <InfoSection title="What we look for first">
        <p>
          For a question about groups of people and an outcome, we start with guidelines and systematic reviews, then
          the trials those reviews depend on. A single encouraging paper does not outrank a review that includes it
          and still calls the evidence weak. Official public-health guidance outranks a company blog, including ours.
        </p>
        <p>
          That order is not universal. A question about how a puzzle works is answered with a worked example, not a
          meta-analysis. A question about dementia risk is not answered with a worked example.
        </p>
      </InfoSection>
      <InfoSection title="What we record about a study">
        <ul className="list-disc space-y-2 pl-5">
          <li>Who was in it: age, cognitive status, and whether they match the people we are talking to.</li>
          <li>What they actually did, for how long, compared with what.</li>
          <li>What was measured: the trained task, another test, daily function, or a diagnosis.</li>
          <li>How large and how consistent the result was, and whether anyone has repeated it.</li>
          <li>What the authors say they cannot conclude.</li>
        </ul>
      </InfoSection>
      <InfoSection title="Transfer, cause, and scores">
        <p>
          Correlation is not causation. People who choose mentally active hobbies can differ in education, health, and
          social life. Near transfer means better performance on a task like the one you practised. Far transfer means
          a gain on something you did not practise. A clinical outcome means a health result a clinician would
          recognise. A Two5 score, when rounds exist, will be the first of these at most.
        </p>
        <p>
          Self-reported “I feel sharper” is not a validated endpoint. Product metrics — signups, sessions, points —
          are not evidence of cognitive benefit. We will not publish a dementia-risk score from gameplay.
        </p>
      </InfoSection>
      <InfoSection title="Vulnerable groups and future studies">
        <p>
          Research with older adults, or with people who have impaired decision-making, needs qualified partners,
          ethics review, informed consent, accessible procedures, and data rules that match the sensitivity of the
          data. None of that apparatus is in place at Two5 today. Interest in talking about it is not a protocol.
        </p>
        <p>
          The public write-up of that boundary is the{" "}
          <Link href="/about" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
            About page
          </Link>
          . The internal version, including how claims are logged, is in the editorial policy in the repository.
        </p>
      </InfoSection>
      <InfoSection title="Sources used on the evidence guides">
        <ul className="list-disc space-y-2 pl-5">
          <li>World Health Organization, 2019 guideline on risk reduction of cognitive decline and dementia.</li>
          <li>U.S. National Institute on Aging pages on prevention and cognitive health.</li>
          <li>Simons and colleagues, 2016, on brain-training programs.</li>
          <li>Owen and colleagues, 2010, a direct test of a commercial program.</li>
        </ul>
        <p>
          Read the guides:{" "}
          <Link
            href="/blog/what-research-says-about-brain-games"
            className="text-volt underline decoration-volt/30 underline-offset-[3px]"
          >
            what the research supports
          </Link>{" "}
          and{" "}
          <Link
            href="/blog/can-brain-games-prevent-dementia"
            className="text-volt underline decoration-volt/30 underline-offset-[3px]"
          >
            whether brain games prevent dementia
          </Link>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}
