import Link from "next/link";

import SiteFooter from "@/components/landing/site-footer";
import { DockNav } from "@/components/layout/dock-nav";
import { legalDocs, type LegalDoc } from "@/content/legal";
import { cn } from "@/lib/utils";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <DockNav />
      <main className="bg-paper pb-28 text-ink">
        <header className="flex flex-col gap-10">
          <div className="arena-band">
            <p>{doc.band}</p>
          </div>
          <div className="px-5 lg:px-8 xl:px-16">
            <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
              <Link href="/" className="hover:text-ink">
                Two5
              </Link>
              <span className="px-2">/</span>
              Legal
              <span className="px-2">/</span>
              {doc.navLabel}
            </p>
            <h1 className="section-heading mt-6 max-w-3xl">
              {doc.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">{doc.summary}</p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/10 pt-5 font-mono text-[11px] tracking-[0.12em] text-mist uppercase">
              <div>
                <dt className="inline text-ink/35">Updated</dt>
                <dd className="ml-2 inline text-ink/70 normal-case tracking-normal">{doc.updated}</dd>
              </div>
              <div>
                <dt className="inline text-ink/35">Contact</dt>
                <dd className="ml-2 inline normal-case tracking-normal">
                  <a href={`mailto:${doc.contact}`} className="text-ink/70 hover:text-ink">
                    {doc.contact}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mt-12 grid gap-12 px-5 lg:grid-cols-[14rem_minmax(0,42rem)] lg:gap-16 lg:px-8 xl:px-16">
          <nav aria-label="Legal documents" className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">Also in legal</p>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {legalDocs.map((item) => {
                const on = item.slug === doc.slug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className={cn(
                        "block rounded-lg px-3 py-2 font-mono text-[12px] tracking-[0.08em] uppercase transition-colors",
                        on ? "bg-ink text-paper" : "text-ink/55 hover:bg-ink/5 hover:text-ink",
                      )}
                      aria-current={on ? "page" : undefined}
                    >
                      {item.navLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <article className="min-w-0">
            {doc.sections.map((section) => (
              <section
                key={section.index}
                id={`section-${section.index}`}
                className="border-t border-ink/10 py-8 first:border-t-0 first:pt-0"
              >
                <p className="font-mono text-[11px] tracking-[0.16em] text-ember">{section.index}</p>
                <h2 className="mt-2 font-display text-3xl leading-none font-normal tracking-[0.02em] sm:text-4xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-ink/75">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.index}-p-${index}`}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-2 border-l border-ink/15 pl-4">
                      {section.bullets.map((bullet, index) => (
                        <li key={`${section.index}-b-${index}`} className="relative pl-1">
                          <span className="absolute -left-4 top-[0.7em] size-1 rounded-full bg-signal" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}

            <p className="mt-4 border-t border-ink/10 pt-8 font-mono text-[11px] tracking-[0.12em] text-mist uppercase">
              End of {doc.navLabel.toLowerCase()}
              <span className="text-signal">.</span>
            </p>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
