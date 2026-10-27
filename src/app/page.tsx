
import type { Metadata } from "next";

import { TrackOnce } from "@/components/analytics/track-once";
import { Challenges } from "@/components/landing/challenges";
import { Faq } from "@/components/landing/faq";
import { Guides } from "@/components/landing/guides";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import SiteFooter from "@/components/landing/site-footer";
import { DockNav } from "@/components/layout/dock-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

const homeTitle = "Two5 — Give your brain a run";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <a
        href="#how"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <DockNav />
      <TrackOnce event="landing_page_view" source="home" />
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            path: "/",
            name: homeTitle,
            description: siteConfig.description,
          }),
        ])}
      />

      <main>
        <Hero />
        <HowItWorks />
        <Challenges />
        <Faq />
        <Guides />
      </main>

      <SiteFooter />
    </>
  );
}
