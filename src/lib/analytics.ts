export type AnalyticsEvent =
  | "landing_page_view"
  | "hero_cta_click"
  | "challenge_started"
  | "challenge_completed"
  | "category_selected"
  | "waitlist_cta_click"
  | "waitlist_signup_started"
  | "waitlist_signup_success"
  | "waitlist_signup_error"
  | "waitlist_form_started"
  | "waitlist_joined"
  | "waitlist_form_error"
  | "roadmap_view"
  | "roadmap_cta_clicked"
  | "launch_timeline_viewed"
  | "blog_index_view"
  | "blog_article_view"
  | "contact_click";

export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("two5:analytics", { detail: { event, props } }));

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", event, props ?? {});
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[two5]", event, props ?? {});
  }
}
