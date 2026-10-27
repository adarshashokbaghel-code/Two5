import type { Metadata } from "next";
import Link from "next/link";

import { TrackedMailLink } from "@/components/analytics/tracked-mail-link";
import { InfoPage, InfoSection } from "@/components/layout/info-page";
import { siteConfig } from "@/config/site";
import { LEGAL_CONTACT } from "@/content/legal";

const title = "Contact Two5";
const description = `Write to Two5 at ${LEGAL_CONTACT} about the product, the website, or a possible research conversation. This is not a medical helpline.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title,
    description,
    url: "/contact",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <InfoPage
      path="/contact"
      title={title}
      description={description}
      eyebrow={[{ label: "Contact" }]}
      lede="One address covers the product, the site, and research questions. We do not offer diagnosis, treatment advice, or a clinical study to join."
    >
      <InfoSection title="Email">
        <p>
          <TrackedMailLink href={`mailto:${LEGAL_CONTACT}`} source="contact">
            {LEGAL_CONTACT}
          </TrackedMailLink>
        </p>
        <p>Use a subject line so the note is routed: product, press, privacy, or research.</p>
      </InfoSection>
      <InfoSection title="What this address is not">
        <p>
          It is not an emergency service and not a memory clinic. If you are worried about thinking or memory in daily
          life, contact a qualified health professional or local emergency services.
        </p>
        <p>
          Privacy requests about the waitlist can use the same address. The policy is on the{" "}
          <Link href="/privacy" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
            privacy page
          </Link>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}
