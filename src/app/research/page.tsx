import type { Metadata } from "next";
import Link from "next/link";


import { DockNav } from "@/components/layout/dock-nav";
import { researchPosts } from "@/content/research";
import { siteConfig } from "@/config/site";
import SiteFooter from "@/components/landing/site-footer";

const researchTitle = "How the Two5 categories are meant to work";
const researchDescription =
  "Notes on Two5’s four categories — Numbers, Logic, Computer Science, and Memory & Visual. What a short round is for, and what a score does not prove. Rounds are not playable here yet.";

export const metadata: Metadata = {
  title: researchTitle,
  description: researchDescription,
  alternates: { canonical: "/research" },
  openGraph: {
    title: researchTitle,
    description: researchDescription,
    url: "/research",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function ResearchIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Two5 research notes",
    url: `${siteConfig.url}/research`,
    hasPart: researchPosts.map((post) => ({
      "@type": "Article",
      headline: post.seoTitle,
      url: `${siteConfig.url}/research/${post.slug}`,
    })),
  };

  return (
    <>
      <DockNav />
      <main className="bg-paper pb-28 text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="flex flex-col gap-10">
          <div className="arena-band">
            <p>Learn</p>
          </div>
          <div className="px-5 lg:px-8 xl:px-16">
            <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
              <Link href="/" className="hover:text-ink">
                Two5
              </Link>
              <span className="px-2">/</span>
              Learn
            </p>
            <h1 className="section-heading mt-6 max-w-3xl">
              How each game works.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">
              Two5&apos;s first four categories — Numbers and Logic first, Computer Science and Memory & Visual
              next. A short note on the skill behind each one, and what a score can and cannot say. For worked
              puzzles, use the <Link href="/blog" className="text-volt underline decoration-volt/30 underline-offset-[3px]">guides</Link>.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">
              These notes are not a clinical programme. Health claims are held to a separate standard on{" "}
              <Link href="/research/methodology" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
                how we read evidence
              </Link>
              . There is no open study.{" "}
              <Link href="/research/collaborate" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
                Collaboration
              </Link>{" "}
              is a conversation, not enrollment.
            </p>
          </div>
        </header>
        <ol className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {researchPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/research/${post.slug}`}
                className="grid gap-3 px-5 py-8 transition-colors hover:bg-white/50 lg:grid-cols-[5rem_1fr_1.2fr] lg:items-baseline lg:px-8 xl:px-16"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-volt">
                  [{post.index}]
                </span>
                <span className="font-display text-3xl font-normal tracking-[0.02em]">{post.arena}</span>
                <span className="text-sm leading-6 text-ink/65">{post.description}</span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
<SiteFooter/>
    </>
  );
}
