import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalDoc } from "@/content/legal";
import { siteConfig } from "@/config/site";

const doc = getLegalDoc("privacy");

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: doc?.summary ?? "How Two5 collects and protects your information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · Two5",
    description: doc?.summary,
    url: "/privacy",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function PrivacyPage() {
  if (!doc) notFound();
  return <LegalDocument doc={doc} />;
}
