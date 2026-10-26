
import { Challenges } from "@/components/landing/challenges";
import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import SiteFooter from "@/components/landing/site-footer";
import { DockNav } from "@/components/layout/dock-nav";

export default function HomePage() {
  return (
    <>
      <a
        href="#how"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <DockNav />

      <main>
        <Hero />
        <HowItWorks />
        <Challenges />
        <Faq />
      </main>

      <SiteFooter />
    </>
  );
}
