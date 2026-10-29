"use client";

import Link from "next/link";
import { useId, useState } from "react";

import type { FaqItem } from "@/content/launch";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  idPrefix,
}: {
  items: FaqItem[];
  idPrefix: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-${idPrefix}-button-${item.id}`;
        const panelId = `${baseId}-${idPrefix}-panel-${item.id}`;

        return (
          <div key={item.id} className="border-t border-white/10">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
                className="flex w-full items-baseline gap-4 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-mono text-[11px] tracking-[0.18em]",
                    expanded ? "text-signal" : "text-white/35",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-2xl leading-none font-normal tracking-[0.02em] sm:text-3xl",
                    expanded ? "text-white" : "text-white/55",
                  )}
                >
                  {item.q}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
              <p className="max-w-3xl pb-6 pl-9 text-base leading-7 text-white/65">{item.a}</p>
              {item.links?.length ? (
                <p className="pb-6 pl-9">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-signal underline decoration-signal/40 underline-offset-[3px]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
