
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import { TrackOnce } from "@/components/analytics/track-once";
import { Challenges } from "@/components/landing/challenges";
import { Guides } from "@/components/landing/guides";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { HomeFaq } from "@/components/landing/home-faq";
import {
  AccessTimeline,
  Evidence,
  FinalCta,
  Founding,
} from "@/components/landing/launch-story";
import { Positioning } from "@/components/landing/positioning";
import SiteFooter from "@/components/landing/site-footer";
import { DockNav } from "@/components/layout/dock-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { launchSnapshot, previewSnapshot } from "@/content/launch";
import { jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

const homeTitle = "Two5 — Mental Training Games & Challenges";
const homeDescription =
  "Train your thinking with purposeful mental challenges. Track your progress and get ready to compete. Join the Two5 waitlist for a chance at early access.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: `${siteConfig.url}/` },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [siteConfig.ogImage],
  },
};

async function CurrentHero() {
  await connection();
  return <Hero announcement={launchSnapshot().announcement} />;
}

async function CurrentAccess() {
  await connection();
  return <AccessTimeline snapshot={launchSnapshot()} trackView />;
}

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
            description: homeDescription,
          }),
        ])}
      />

      <main>
        <Suspense fallback={<Hero announcement={previewSnapshot.announcement} />}>
          <CurrentHero />
        </Suspense>
        <Positioning />
        <HowItWorks />
        <Challenges />
        <Suspense fallback={<AccessTimeline snapshot={previewSnapshot} />}>
          <CurrentAccess />
        </Suspense>
        <Founding />
        <Evidence />
        <FinalCta />
        <HomeFaq />
        <Guides />
      </main>

      <SiteFooter />
    </>
  );
}
