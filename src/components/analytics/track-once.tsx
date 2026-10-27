"use client";

import { useEffect } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics";

export function TrackOnce({
  event,
  source,
}: {
  event: AnalyticsEvent;
  source?: string;
}) {
  useEffect(() => {
    track(event, source ? { source } : undefined);
  }, [event, source]);

  return null;
}
