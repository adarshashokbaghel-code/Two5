import type { Metadata } from "next";

import { JoinWaitlist } from "@/components/join/join-waitlist";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { joinDescription, joinFaqs, joinPath, joinTitle } from "@/content/join-waitlist";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: joinTitle },
  description: joinDescription,
  keywords: [
    "Two5 waitlist",
    "Join Two5",
    "Two5 early access",
    "Brain training waitlist",
    "Mental math games early access",
    "Brain games early access",
  ],
  alternates: { canonical: joinPath },
  openGraph: {
    title: joinTitle,
    description: joinDescription,
    url: joinPath,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Join Two5 — a free shortlist or a $299 reserved place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: joinTitle,
    description: joinDescription,
    images: [siteConfig.ogImage],
  },
};

export default function JoinWaitlistPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            path: joinPath,
            name: joinTitle,
            description: joinDescription,
          }),
          breadcrumbJsonLd([
            { name: "Two5", path: "/" },
            { name: "Join the waitlist", path: joinPath },
          ]),
          faqPageJsonLd(joinFaqs.map((item) => ({ q: item.q, a: item.a }))),
          {
            "@type": "Offer",
            "@id": `${absoluteUrl(joinPath)}#reserved`,
            name: "Two5 reserved place",
            url: absoluteUrl(joinPath),
            price: "299",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description:
              "A reserved Two5 place at 299 US dollars, or 26850 Indian rupees, separate from the free shortlist. Razorpay captures the payment. The account is marked premium after capture.",
          },
        ])}
      />
      <JoinWaitlist />
    </>
  );
}
