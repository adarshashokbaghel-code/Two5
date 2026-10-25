import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { ResearchArticle } from "@/components/research/research-article";
import { DockNav } from "@/components/layout/dock-nav";
import { getResearchPost, researchPosts } from "@/content/research";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return researchPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) return {};

  const url = `/research/${post.slug}`;
  const title = post.seoTitle;

  return {
    title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      type: "article",
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default function ResearchPostPage({
  params,
}: PageProps<"/research/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <ResearchPost params={params} />
    </Suspense>
  );
}

async function ResearchPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle,
    description: post.description,
    image: `${siteConfig.url}${post.image}`,
    mainEntityOfPage: `${siteConfig.url}/research/${post.slug}`,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    datePublished: "2026-10-24",
    dateModified: "2026-10-24",
    keywords: post.keywords.join(", "),
    citation: post.references.map((cite) => cite.href),
  };

  return (
    <>
      <DockNav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ResearchArticle post={post} />
      </main>
    </>
  );
}
