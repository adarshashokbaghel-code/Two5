"use client";

import Link from "next/link";

import { track } from "@/lib/analytics";

export function ResearchCta({
  href,
  label,
  source,
}: {
  href: string;
  label: string;
  source: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => track("waitlist_cta_click", { source })}
      className="inline-flex h-12 items-center bg-ink px-5 text-base font-medium text-paper"
    >
      {label}
    </Link>
  );
}
