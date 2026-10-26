import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalDoc } from "@/content/legal";
import { siteConfig } from "@/config/site";

const doc = getLegalDoc("terms");

export const metadata: Metadata = {
  title: "Terms of Service",
  description: doc?.summary ?? "The rules for using Two5.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Play · Two5",
    description: doc?.summary,
    url: "/terms",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function TermsPage() {
  if (!doc) notFound();
  return <LegalDocument doc={doc} />;
}
