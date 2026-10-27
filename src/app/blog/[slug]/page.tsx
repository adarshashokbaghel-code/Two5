import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TrackOnce } from "@/components/analytics/track-once";
import { BlogArticle } from "@/components/blog/blog-article";
import { DockNav } from "@/components/layout/dock-nav";
import SiteFooter from "@/components/landing/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts, getBlogPost } from "@/content/blog";
import { siteConfig } from "@/config/site";
import { articleJsonLd, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type BlogRoute = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogRoute): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.seoTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
    },
  };
}

export default function BlogPostPage({ params }: BlogRoute) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <BlogPost params={params} />
    </Suspense>
  );
}

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;

  return (
    <>
      <DockNav />
      <TrackOnce event="blog_article_view" source={post.slug} />
      <main>
        <JsonLd
          data={jsonLdGraph([
            webPageJsonLd({ path, name: post.title, description: post.description }),
            breadcrumbJsonLd([
              { name: "Two5", path: "/" },
              { name: "Guides", path: "/blog" },
              { name: post.title, path },
            ]),
            articleJsonLd({
              path,
              headline: post.title,
              description: post.description,
              datePublished: post.published,
              dateModified: post.updated,
              keywords: post.keywords,
            }),
          ])}
        />
        <BlogArticle post={post} />
      </main>
      <SiteFooter />
    </>
  );
}
