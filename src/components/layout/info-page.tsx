import Link from "next/link";
import type { ReactNode } from "react";

import SiteFooter from "@/components/landing/site-footer";
import { DockNav } from "@/components/layout/dock-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

export function InfoPage({
  path,
  title,
  description,
  eyebrow,
  lede,
  children,
}: {
  path: string;
  title: string;
  description: string;
  eyebrow: { href?: string; label: string }[];
  lede: string;
  children: ReactNode;
}) {
  return (
    <>
      <DockNav />
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({ path, name: title, description }),
          breadcrumbJsonLd([
            { name: "Two5", path: "/" },
            ...eyebrow.filter((item) => item.href).map((item) => ({ name: item.label, path: item.href as string })),
            { name: title, path },
          ]),
        ])}
      />
      <main className="bg-paper pb-28 text-ink">
        <header className="px-5 pt-28 lg:px-8 xl:px-16">
          <p className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
            <Link href="/" className="hover:text-ink">
              Two5
            </Link>
            {eyebrow.map((item) => (
              <span key={item.label}>
                <span className="px-2">/</span>
                {item.href ? (
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </span>
            ))}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[2rem] leading-[1.05] font-normal tracking-[0.01em] sm:text-[clamp(2.2rem,4vw,3.25rem)]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">{lede}</p>
        </header>
        <div className="mx-auto mt-12 max-w-3xl px-5 lg:px-8">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-3xl leading-none font-normal tracking-[0.02em]">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-ink/75">{children}</div>
    </section>
  );
}
