import Link from "next/link";

import { ResearchCta } from "@/components/research/research-cta";
import { ResearchFigure } from "@/components/research/research-motif";
import { researchPosts, type ResearchPost } from "@/content/research";

export function ResearchArticle({ post }: { post: ResearchPost }) {
  const others = researchPosts.filter((item) => item.slug !== post.slug);

  return (
    <article className="bg-paper pb-28 text-ink">
      <header className="flex flex-col gap-10 lg:gap-14">
        <div className="arena-band">
          <p>Learn</p>
        </div>
        <div className="px-5 lg:px-8 xl:px-16">
          <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
            <Link href="/" className="hover:text-ink">
              Two5
            </Link>
            <span className="px-2">/</span>
            <Link href="/research" className="hover:text-ink">
              Learn
            </Link>
            <span className="px-2">/</span>
            {post.arena}
          </p>
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-volt uppercase">
            {post.arena}
            <span className="ml-3 text-mist">
              [{post.index}/{String(researchPosts.length).padStart(2, "0")}]
            </span>
          </p>
        </div>
      </header>

      <div className="mt-8 px-5 lg:mt-10 lg:px-8 xl:px-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_22rem] lg:gap-12">
          <div>
            <h1 className="font-display text-[clamp(2.25rem,3.6vw,3rem)] leading-none font-normal tracking-[0.02em]">
              <span className="mr-2 font-mono text-[0.7em] text-mist">[{post.index}]</span>
              {post.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">{post.lede}</p>
            <dl className="mt-8 flex max-w-xl flex-col gap-4 border-t border-ink/10 pt-6">
              {post.specs.map((spec) => (
                <div key={spec.term} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <dt className="font-mono text-[11px] tracking-[0.12em] text-mist uppercase">
                    {spec.term}
                  </dt>
                  <dd className="font-mono text-sm leading-6 text-ink/75">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ResearchFigure arena={post.slug} piece="lead" />
        </div>
        <div className="mt-8">
          <ResearchFigure arena={post.slug} piece="row" />
        </div>
      </div>

      <section className="mt-16 border-t border-ink/10 px-5 pt-12 lg:px-8 xl:px-16">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-mist uppercase">
          What changes with practice
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {post.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="font-display text-2xl font-normal tracking-[0.02em]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-5 lg:px-8">
        {post.sections.map((section) => (
          <div key={section.heading} className="mt-10">
            <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.text} className="mt-4 text-base leading-7 text-ink/75">
                {paragraph.text}
                {paragraph.cites?.map((id) => {
                  const cite = post.references.find((item) => item.id === id);
                  if (!cite) return null;
                  return (
                    <a
                      key={id}
                      href={`#ref-${id}`}
                      className="ml-1 font-mono text-[11px] text-volt"
                    >
                      [{cite.authors.split(",")[0]} {cite.year}]
                    </a>
                  );
                })}
              </p>
            ))}
          </div>
        ))}

        <div className="mt-12 border-t border-ink/10 pt-8">
          <h2 className="font-mono text-[11px] tracking-[0.16em] text-mist uppercase">
            References
          </h2>
          <ol className="mt-5 flex flex-col gap-4">
            {post.references.map((cite) => (
              <li id={`ref-${cite.id}`} key={cite.id} className="text-sm leading-6 text-ink/70">
                <span>
                  {cite.authors} ({cite.year}). {cite.title}. {cite.source}.
                </span>{" "}
                <a
                  href={cite.href}
                  className="text-volt underline decoration-volt/30 underline-offset-[3px]"
                  rel="noreferrer"
                  target="_blank"
                >
                  {cite.href.replace(/^https?:\/\//, "")}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <ResearchCta href={post.cta.href} label={post.cta.label} source={post.cta.source} />
        </div>
      </section>

      <section className="mt-16 border-t border-ink/10 px-5 pt-10 lg:px-8 xl:px-16">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-mist uppercase">
          The other arenas
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/research/${item.slug}`} className="group block">
                <span className="font-mono text-[11px] tracking-[0.12em] text-mist">
                  [{item.index}]
                </span>
                <span className="mt-2 block text-lg font-normal group-hover:text-volt">
                  {item.arena}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
