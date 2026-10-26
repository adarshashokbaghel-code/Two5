import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalDoc } from "@/content/legal";
import { siteConfig } from "@/config/site";

const doc = getLegalDoc("cookies");

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: doc?.summary ?? "Cookies and similar technologies used by Two5.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Cookie Policy · Two5",
    description: doc?.summary,
    url: "/cookies",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function CookiesPage() {
  if (!doc) notFound();
  return <LegalDocument doc={doc} />;
}
