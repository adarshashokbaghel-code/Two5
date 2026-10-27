"use client";

import type { ReactNode } from "react";

import { track } from "@/lib/analytics";

export function TrackedMailLink({
  href,
  source,
  children,
}: {
  href: string;
  source: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={() => track("contact_click", { source })}
      className="text-volt underline decoration-volt/30 underline-offset-[3px]"
    >
      {children}
    </a>
  );
}
