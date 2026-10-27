import Link from "next/link";

import { ResearchCta } from "@/components/research/research-cta";
import { getBlogPost, type BlogPost } from "@/content/blog";

export function BlogArticle({ post }: { post: BlogPost }) {
  const related = post.related
    .map((slug) => getBlogPost(slug))
    .filter((item): item is BlogPost => Boolean(item));

  return (
    <article className="bg-paper pb-28 text-ink">
      <header className="px-5 pt-28 lg:px-8 xl:px-16">
        <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
          <Link href="/" className="hover:text-ink">
            Two5
          </Link>
          <span className="px-2">/</span>
          <Link href="/blog" className="hover:text-ink">
            Guides
          </Link>
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-[2rem] leading-[1.05] font-normal tracking-[0.01em] sm:text-[clamp(2.2rem,4vw,3.25rem)]">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">{post.answer}</p>
        <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-mist uppercase">
          Published {post.published}
          {post.updated !== post.published ? ` · Updated ${post.updated}` : ""}
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-3xl px-5 lg:px-8">
        {post.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-7 text-ink/75">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-ink/75">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.puzzles ? (
              <ol className="mt-6 flex flex-col gap-4">
                {section.puzzles.map((puzzle) => (
                  <li key={puzzle.prompt} className="border border-ink/10 bg-white/60 p-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-volt uppercase">{puzzle.level}</p>
                    <p className="mt-2 text-base leading-7 text-ink">{puzzle.prompt}</p>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-medium text-ink/70">Answer and reasoning</summary>
                      <p className="mt-3 text-sm leading-6 text-ink">
                        <span className="font-semibold">Answer. </span>
                        {puzzle.answer}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink/75">{puzzle.reasoning}</p>
                    </details>
                  </li>
                ))}
              </ol>
            ) : null}
          </section>
        ))}

        {post.sources.length > 0 ? (
          <section className="mt-12 border-t border-ink/10 pt-8">
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-mist uppercase">Sources</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {post.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    className="text-sm text-volt underline decoration-volt/30 underline-offset-[3px]"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12 border-t border-ink/10 pt-8">
          <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">On Two5</h2>
          <p className="mt-4 text-base leading-7 text-ink/75">{post.cta}</p>
          <div className="mt-6 flex flex-col items-start gap-4">
            {post.ctaHref ? (
              <Link
                href={post.ctaHref}
                className="inline-flex h-12 items-center rounded-[4px] bg-ink px-5 text-base font-medium text-paper"
              >
                {post.ctaLabel}
              </Link>
            ) : (
              <ResearchCta href="/#waitlist" label="Join the waitlist" source={`blog-${post.slug}`} />
            )}
            {post.ctaHref ? (
              <ResearchCta href="/#waitlist" label="Join the game waitlist" source={`blog-${post.slug}-waitlist`} />
            ) : null}
          </div>
          {post.productLinks.length > 0 ? (
            <ul className="mt-6 flex flex-col gap-2">
              {post.productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink/70 underline decoration-ink/20 underline-offset-[3px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {related.length > 0 ? (
          <section className="mt-12 border-t border-ink/10 pt-8">
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-mist uppercase">Keep going</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="text-base text-ink hover:text-volt">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
