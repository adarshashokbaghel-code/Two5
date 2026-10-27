import type { Metadata } from "next";
import Link from "next/link";

import { TrackOnce } from "@/components/analytics/track-once";
import { DockNav } from "@/components/layout/dock-nav";
import SiteFooter from "@/components/landing/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

const title = "Guides to number, logic, and algorithm puzzles";
const description =
  "Worked puzzles for number sequences, logic, adult maths, and algorithms, plus a plain account of competitive brain challenges. Two5 rounds are not playable here yet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title,
    description,
    url: "/blog",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <DockNav />
      <TrackOnce event="blog_index_view" />
      <main className="bg-paper pb-28 text-ink">
        <JsonLd
          data={jsonLdGraph([
            webPageJsonLd({ path: "/blog", name: title, description }),
            breadcrumbJsonLd([
              { name: "Two5", path: "/" },
              { name: "Guides", path: "/blog" },
            ]),
            {
              "@type": "CollectionPage",
              "@id": `${siteConfig.url}/blog#collection`,
              url: `${siteConfig.url}/blog`,
              name: title,
              hasPart: blogPosts.map((post) => ({
                "@type": "Article",
                headline: post.title,
                url: `${siteConfig.url}/blog/${post.slug}`,
              })),
            },
          ])}
        />
        <header className="px-5 pt-28 lg:px-8 xl:px-16">
          <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
            <Link href="/" className="hover:text-ink">
              Two5
            </Link>
            <span className="px-2">/</span>
            Guides
          </p>
          <h1 className="section-heading mt-6 max-w-3xl">Puzzle guides you can finish.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70">
            These are practice notes: original examples, answers, and the limit of what a puzzle score can mean.
            Two5 itself is a competitive challenge game in development. Numbers and Logic are the first categories.
            You cannot start a round from these pages. You can join the waitlist.
          </p>
        </header>
        <ol className="mx-auto mt-12 flex max-w-3xl flex-col gap-8 px-5 lg:px-8">
          {blogPosts.map((post) => (
            <li key={post.slug} className="border-t border-ink/10 pt-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">{post.published}</p>
              <h2 className="mt-2 font-display text-3xl leading-none font-normal tracking-[0.02em]">
                <Link href={`/blog/${post.slug}`} className="hover:text-volt">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-ink/70">{post.summary}</p>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
