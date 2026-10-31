import Link from "next/link";

import { AnswerReveal } from "@/components/seo/answer-reveal";
import { RelatedLinks } from "@/components/seo/related-links";
import { WaitlistButton } from "@/components/landing/waitlist-button";
import type { SeoPage } from "@/content/seo/types";

const crumbs: Record<string, string> = {
  "/": "Two5",
  "/categories/numbers": "Numbers",
  "/blog": "Guides",
  "/blog/number-sequence-puzzles": "Sequence guide",
  "/blog/math-puzzles-for-adults": "Math puzzles",
};

function labelFor(path: string, pages: { path: string; h1: string }[]) {
  return crumbs[path] ?? pages.find((page) => page.path === path)?.h1 ?? path;
}

export function breadcrumbItems(page: SeoPage, pages: SeoPage[]) {
  const trail = [page.parentPath];
  const parent = pages.find((item) => item.path === page.parentPath);
  if (parent) trail.unshift(parent.parentPath);
  if (!trail.includes("/categories/numbers")) trail.unshift("/categories/numbers");
  if (!trail.includes("/")) trail.unshift("/");
  const unique = trail.filter((path, index) => trail.indexOf(path) === index);
  return [...unique.map((path) => ({ name: labelFor(path, pages), path })), { name: page.h1, path: page.path }];
}

export function SeoDocument({ page, pages }: { page: SeoPage; pages: SeoPage[] }) {
  const crumbs = breadcrumbItems(page, pages);

  return (
    <article className="bg-paper pb-28 text-ink">
      <header className="px-5 pt-28 lg:px-8 xl:px-16">
        <nav aria-label="Breadcrumb" className="max-w-full font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
          <ol className="flex max-w-full flex-wrap items-center gap-x-2 gap-y-1">
            {crumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex min-w-0 items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {index < crumbs.length - 1 ? (
                  <Link href={crumb.path} className="break-words hover:text-ink">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="break-words text-ink">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-volt uppercase">
          {page.pageType}
          {page.game ? <span className="ml-3 text-mist">{page.game}</span> : null}
        </p>
        <h1 className="mt-4 max-w-full text-balance font-display text-[2rem] leading-[1.08] font-normal tracking-[0.01em] sm:max-w-3xl sm:text-[clamp(2.2rem,4vw,3.25rem)]">
          {page.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">{page.introduction}</p>
      </header>

      <div className="mx-auto mt-12 max-w-3xl px-5 lg:px-8">
        {page.sections.map((section) => (
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
          </section>
        ))}

        {page.challenge ? (
          <section className="mt-12">
            <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">Try it</h2>
            <AnswerReveal challenge={page.challenge} source={page.path} />
          </section>
        ) : null}

        {page.listing ? (
          <section className="mt-12">
            <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">On this page</h2>
            <RelatedLinks links={page.listing} source={page.path} />
          </section>
        ) : null}

        {page.strategies ? (
          <section className="mt-12">
            <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">A way through</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-ink/75">
              {page.strategies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {page.faq ? (
          <section className="mt-12">
            <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">Questions</h2>
            <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {page.faq.map((item) => (
                <div key={item.question} className="py-4">
                  <h3 className="text-base font-medium">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/75">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {page.references ? (
          <section className="mt-12 border-t border-ink/10 pt-8">
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-mist uppercase">References</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {page.references.map((reference) => (
                <li key={reference.href}>
                  <a
                    href={reference.href}
                    className="text-sm text-volt underline decoration-volt/30 underline-offset-[3px]"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {reference.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12 border-t border-ink/10 pt-8">
          <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">Related</h2>
          <RelatedLinks links={page.related} source={page.path} />
          <div className="mt-8">
            <WaitlistButton source={`seo-${page.id}`} className="h-12 rounded-[4px] bg-ink px-5 text-base font-medium text-paper">
              Join the waitlist
            </WaitlistButton>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink/60">
              Numbers rounds are in development. Joining the list does not open a game.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}

