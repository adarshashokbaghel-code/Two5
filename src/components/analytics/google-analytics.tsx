"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const GA_MEASUREMENT_ID = "G-XD4SPJJ1ZE";

export function GoogleAnalyticsRoute() {
  const pathname = usePathname();
  const skipFirst = useRef(true);

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") return;

    gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
