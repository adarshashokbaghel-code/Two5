import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { ResearchArticle } from "@/components/research/research-article";
import { DockNav } from "@/components/layout/dock-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { getResearchPost, researchPosts } from "@/content/research";
import { siteConfig } from "@/config/site";
import { articleJsonLd, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

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

  const path = `/research/${post.slug}`;

  return (
    <>
      <DockNav />
      <main>
        <JsonLd
          data={jsonLdGraph([
            webPageJsonLd({ path, name: post.headline, description: post.description }),
            breadcrumbJsonLd([
              { name: "Two5", path: "/" },
              { name: "Research", path: "/research" },
              { name: post.arena, path },
            ]),
            {
              ...articleJsonLd({
                path,
                headline: post.headline,
                description: post.description,
                datePublished: "2026-10-24",
                dateModified: "2026-10-27",
                image: post.image,
                keywords: post.keywords,
              }),
              citation: post.references.map((cite) => cite.href),
            },
          ])}
        />
        <ResearchArticle post={post} />
      </main>
    </>
  );
}
