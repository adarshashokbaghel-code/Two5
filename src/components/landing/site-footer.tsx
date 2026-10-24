import TicketStubFooter from "@/components/ui/ticket-stub-footer";
import { siteConfig } from "@/config/site";

const SANS =
  'var(--font-space), "Space Grotesk", Inter, "Helvetica Neue", Helvetica, Arial, sans-serif';
const MONO =
  'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export function SiteFooter() {
  return (
    <TicketStubFooter
      brand={siteConfig.name}
      company={siteConfig.name}
      year={2026}
      eyebrow={[
        "Your brain’s gym",
        "Think fast. Know more. Compete.",
        "Early access is opening",
      ]}
      headline={["Think fast.", "Know more. Compete."]}
      description={siteConfig.description}
      cta={{ label: "Join the waitlist", href: "#waitlist" }}
      sections={siteConfig.nav.map((item) => ({
        label: item.label,
        href: item.href,
      }))}
      linkGroups={[
        {
          title: "Explore",
          links: siteConfig.nav.map((item) => ({
            label: item.label,
            href: item.href,
          })),
        },
        {
          title: "Play",
          links: [
            { label: "Numbers", href: "#challenges" },
            { label: "Logic", href: "#challenges" },
            { label: "Daily", href: "#challenges" },
            { label: "Waitlist", href: "#waitlist" },
          ],
        },
      ]}
      statusLabels={["Open", "Paused"]}
      statusCaption="Early access"
      count={1280}
      countLabel="Reps logged"
      rate={0.4}
      blurb="Maths, logic, computer science and more over time. Number sequences, logic puzzles, algorithms and problems that ask you to look again. Two5 brings those skill challenges together in one place."
      legal={[
        { label: "All rights reserved" },
        { label: "Waitlist", href: "#waitlist" },
      ]}
      background="#000000"
      ink="#f5f2ea"
      muted="#8a8a8a"
      accent="#f0c020"
      accentDeep="#c9a010"
      accentInk="#000000"
      fontSans={SANS}
      fontMono={MONO}
      className="mx-auto w-[min(94%,88rem)] pb-24"
    />
  );
}
