"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { track } from "@/lib/analytics";
import { homepageFaqs } from "@/content/launch";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const baseId = useId();
  const [open, setOpen] = useState(0);
  const current = homepageFaqs[open] ?? homepageFaqs[0];

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-black text-white">
      <div className="mx-auto max-w-[1500px] px-4 pt-16 sm:px-8 lg:px-14 lg:pt-28">
        <p className="font-mono text-xs tracking-[0.2em] text-red-500 uppercase">Before you train</p>
        <h2 id="faq-title" className="section-heading mt-4 max-w-xl">
          Good <span className="text-green-500">questions.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:gap-20 lg:px-14 lg:py-16">
        <div>
          {homepageFaqs.map((item, index) => {
            const selected = index === open;
            const buttonId = `${baseId}-button-${item.id}`;
            const panelId = `${baseId}-panel-${item.id}`;

            return (
              <div key={item.id} className="border-t border-white/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={selected}
                    aria-controls={panelId}
                    onClick={() => setOpen(index)}
                    className="flex w-full items-baseline gap-4 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] tracking-[0.18em]",
                        selected ? "text-red-500" : "text-white/35",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-2xl leading-none tracking-[0.02em] sm:text-3xl",
                        selected ? "text-white" : "text-white/45",
                      )}
                    >
                      {item.q}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!selected}>
                  <p className="pb-6 pl-9 text-base leading-7 text-white/65 lg:hidden">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-10">
            <p className="font-mono text-[11px] tracking-[0.18em] text-red-500 uppercase">
              {String(homepageFaqs.indexOf(current) + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-display text-4xl leading-none tracking-[0.02em] sm:text-5xl">{current.q}</h3>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">{current.a}</p>
            <button
              type="button"
              data-waitlist-trigger
              data-waitlist-source="faq"
              className="mt-10 inline-flex h-12 items-center rounded-full px-5 text-sm font-semibold transition-[background-color,color] duration-700"
              style={{
                backgroundColor: "var(--two5-wash, #22C55E)",
                color: "var(--two5-wash-ink, #050505)",
              }}
            >
              Join the waitlist
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 pb-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:pb-28">
        <button
          type="button"
          data-waitlist-trigger
          data-waitlist-source="faq"
          className="inline-flex h-12 w-fit items-center rounded-full px-5 text-sm font-semibold transition-[background-color,color] duration-700 lg:hidden"
          style={{
            backgroundColor: "var(--two5-wash, #22C55E)",
            color: "var(--two5-wash-ink, #050505)",
          }}
        >
          Join the waitlist
        </button>
        <Link
          href="/roadmap#faq"
          onClick={() => track("roadmap_cta_clicked", { source: "home-faq", page_path: "/roadmap#faq" })}
          className="text-sm text-white/70 underline decoration-white/20 underline-offset-[3px] hover:text-white"
        >
          Read the full FAQ on the roadmap →
        </Link>
      </div>
    </section>
  );
}
