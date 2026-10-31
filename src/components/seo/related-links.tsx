"use client";

import Link from "next/link";

import { track } from "@/lib/analytics";
import type { SeoLink } from "@/content/seo/types";

export function RelatedLinks({ links, source }: { links: SeoLink[]; source: string }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-base text-ink underline decoration-volt/30 underline-offset-[3px] hover:text-volt"
            onClick={() => track("click_related_page", { source, page_path: link.href })}
          >
            {link.label}
          </Link>
          {link.description ? <p className="mt-1 text-sm leading-6 text-ink/60">{link.description}</p> : null}
        </li>
      ))}
    </ul>
  );
}
