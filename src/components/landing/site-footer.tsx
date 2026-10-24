import TicketStubFooter from "@/components/ui/ticket-stub-footer";
import { siteConfig } from "@/config/site";

function rootHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

const SANS =
  'var(--font-montserrat), Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif';
const MONO =
  'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export function SiteFooter() {
  return (
    <TicketStubFooter
      brand={siteConfig.name}
      company={siteConfig.name}
      year={2026}
      eyebrow={[
        "A game for sharp minds",
        "Think fast. Know more. Compete.",
        "Early access is open",
      ]}
      headline={["Play a round.", "Then play another."]}
      description={siteConfig.description}
      cta={{ label: "Join the waitlist", href: "/#waitlist" }}
      sections={siteConfig.nav.map((item) => ({
        label: item.label,
        href: rootHref(item.href),
      }))}
      linkGroups={[
        {
          title: "Explore",
          links: [
            ...siteConfig.nav.map((item) => ({
              label: item.label,
              href: rootHref(item.href),
            })),
          ],
        },
        {
          title: "Play",
          links: [
            { label: "Numbers", href: "/research/numbers" },
            { label: "Logic", href: "/research/logic" },
            { label: "Computer Science", href: "/research/computer-science" },
            { label: "Daily", href: "/research/daily" },
            { label: "Versus", href: "/research/versus" },
            { label: "Waitlist", href: "/#waitlist" },
          ],
        },
      ]}
      statusLabels={["Open", "Paused"]}
      statusCaption="First round"
      count={1280}
      countLabel="Players waiting"
      rate={0.4}
      blurb="Numbers, logic, computer science, and more as we open them. Short rounds, a score you can beat, and a challenge you can send. Two5 is the place those games live."
      legal={[
        { label: "All rights reserved" },
        { label: "Waitlist", href: "/#waitlist" },
      ]}
      background="#f6f3ea"
      ink="#141414"
      muted="#5c5c5c"
      accent="#f0c020"
      accentDeep="#c9a010"
      accentInk="#000000"
      fontSans={SANS}
      fontMono={MONO}
      className="mx-auto w-full pb-28 sm:w-[min(94%,88rem)]"
    />
  );
}
