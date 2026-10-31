import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TrackOnce } from "@/components/analytics/track-once";
import SiteFooter from "@/components/landing/site-footer";
import { DockNav } from "@/components/layout/dock-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoDocument, breadcrumbItems } from "@/components/seo/seo-document";
import { siteConfig } from "@/config/site";
import { getSeoPage, publishedSeoPages, seoPages } from "@/content/seo/pages";
import type { SeoPage } from "@/content/seo/types";
import type { AnalyticsEvent } from "@/lib/analytics";
import { articleJsonLd, breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";
import { assertSeoCatalog } from "@/lib/seo/validate";

assertSeoCatalog();

function pathFromSlug(slug?: string[]) {
  if (!slug || slug.length === 0) return null;
  return `/numbers/${slug.join("/")}`;
}

export function generateStaticParams() {
  return publishedSeoPages().map((page) => ({
    slug: page.path.replace(/^\/numbers\//, "").split("/"),
  }));
}

type Route = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Route): Promise<Metadata> {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  const page = path ? getSeoPage(path) : undefined;
  if (!page) return { robots: { index: false, follow: false } };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: page.path,
      siteName: siteConfig.name,
      type: page.pageType === "guide" || page.pageType === "game" ? "article" : "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

function viewEvent(page: SeoPage): AnalyticsEvent {
  if (page.pageType === "game") return "view_game";
  if (page.pageType === "puzzle") return "view_puzzle";
  if (page.pageType === "guide") return "view_guide";
  return "view_collection";
}

function faqJsonLd(page: SeoPage) {
  if (!page.faq?.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}${page.path}#faq`,
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function NumbersSeoPage({ params }: Route) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <NumbersSeo params={params} />
    </Suspense>
  );
}

async function NumbersSeo({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  const page = path ? getSeoPage(path) : undefined;
  if (!page) notFound();

  const faq = faqJsonLd(page);
  const graph = [
    page.pageType === "collection" && page.listing
      ? collectionPageJsonLd({
          path: page.path,
          name: page.h1,
          description: page.metaDescription,
          items: page.listing.map((item) => ({ name: item.label, description: item.description ?? item.label })),
        })
      : webPageJsonLd({ path: page.path, name: page.h1, description: page.metaDescription }),
    breadcrumbJsonLd(breadcrumbItems(page, seoPages)),
    ...(page.pageType === "guide" || page.pageType === "game"
      ? [
          articleJsonLd({
            path: page.path,
            headline: page.h1,
            description: page.metaDescription,
            datePublished: page.createdAt,
            dateModified: page.updatedAt,
          }),
        ]
      : []),
    ...(faq ? [faq] : []),
  ];

  return (
    <>
      <DockNav />
      <TrackOnce event={viewEvent(page)} source={page.path} />
      <JsonLd data={jsonLdGraph(graph)} />
      <SeoDocument page={page} pages={seoPages} />
      <SiteFooter />
    </>
  );
}
