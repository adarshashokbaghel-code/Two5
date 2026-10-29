import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import { TrackOnce } from "@/components/analytics/track-once";
import SiteFooter from "@/components/landing/site-footer";
import { DockNav } from "@/components/layout/dock-nav";
import { RoadmapView } from "@/components/roadmap/roadmap-view";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { launchSnapshot, previewSnapshot } from "@/content/launch";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

const title = "Two5 Roadmap — Early Access & Launch Timeline";
const description =
  "See the Two5 launch roadmap: waitlist through November 30, 200 selected on December 1, product launch for them on December 12, and three invites each from January 1.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/roadmap" },
  openGraph: {
    title,
    description,
    url: "/roadmap",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.ogImage],
  },
};

async function CurrentRoadmap() {
  await connection();
  return <RoadmapView snapshot={launchSnapshot()} trackView />;
}

export default function RoadmapPage() {
  return (
    <>
      <a
        href="#access"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to access
      </a>
      <DockNav />
      <TrackOnce event="roadmap_view" source="roadmap" />
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({ path: "/roadmap", name: title, description }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Roadmap", path: "/roadmap" },
          ]),
        ])}
      />
      <Suspense fallback={<RoadmapView snapshot={previewSnapshot} />}>
        <CurrentRoadmap />
      </Suspense>
      <SiteFooter />
    </>
  );
}
