"use client";

import { useEffect, useRef } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics";

export function TrackVisible({
  event,
  source,
}: {
  event: AnalyticsEvent;
  source: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        track(event, { source, page_path: window.location.pathname });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [event, source]);

  return <span ref={ref} className="sr-only" aria-hidden="true" />;
}
