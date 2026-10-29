"use client";

import Link from "next/link";

import { track } from "@/lib/analytics";

export function TrackedLink({
  href,
  source,
  className,
  style,
  children,
}: {
  href: string;
  source: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      onClick={() => track("roadmap_cta_clicked", { source, page_path: href })}
    >
      {children}
    </Link>
  );
}
