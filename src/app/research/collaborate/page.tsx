import type { Metadata } from "next";

import { TrackedMailLink } from "@/components/analytics/tracked-mail-link";
import { InfoPage, InfoSection } from "@/components/layout/info-page";
import { siteConfig } from "@/config/site";
import { LEGAL_CONTACT } from "@/content/legal";

const title = "Research collaboration";
const description =
  "Researchers and accessibility specialists can write to Two5 about a possible future collaboration. There is no open trial and no enrollment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/research/collaborate" },
  openGraph: {
    title,
    description,
    url: "/research/collaborate",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function CollaboratePage() {
  return (
    <InfoPage
      path="/research/collaborate"
      title={title}
      description={description}
      eyebrow={[{ href: "/research", label: "Research" }]}
      lede="If you work on cognition, ageing, accessible design, or trial methods, you can tell us what a responsible collaboration would need. Writing to us does not join a study. We are not recruiting participants."
    >
      <InfoSection title="Questions we are interested in, later">
        <ul className="list-disc space-y-2 pl-5">
          <li>Which challenge formats are understandable and acceptable to different ages and ability levels.</li>
          <li>How to separate a game score from any claim about everyday function.</li>
          <li>What accessible interface choices actually help, tested with the people who would use them.</li>
          <li>Whether a future study is even feasible, and what ethics review it would require.</li>
        </ul>
        <p>None of these is an active protocol, a funded programme, or a promise of partnership.</p>
      </InfoSection>
      <InfoSection title="How to write">
        <p>
          Email{" "}
          <TrackedMailLink
            href={`mailto:${LEGAL_CONTACT}?subject=Research%20collaboration`}
            source="research-collaborate"
          >
            {LEGAL_CONTACT}
          </TrackedMailLink>{" "}
          with the subject “Research collaboration”. Say who you are, your institution if you have one, and the
          question you think is worth asking. Do not send identifiable health information about a patient or a
          student.
        </p>
        <p>
          We will not list your organisation as a partner because you wrote. Endorsements, if they ever exist, will
          be agreements both sides can point to.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
