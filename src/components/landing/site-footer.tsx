import Link from "next/link";

const links = [
  { label: "Play", href: "/#how" },
  { label: "Arenas", href: "/#challenges" },
  { label: "How it works", href: "/#how" },
  { label: "FAQs", href: "/#faq" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "mailto:hello@two5.in" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#090909] font-display text-[#F4F1E8]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Brand statement */}
        <div className="flex flex-col gap-8 pb-10 pt-12 sm:flex-row sm:items-end sm:justify-between sm:pb-12 sm:pt-16">
          <div>
            <Link
              href="/"
              aria-label="TWO5 home"
              className="inline-flex items-baseline text-5xl font-black leading-none tracking-[0.09em] sm:text-7xl"
            >
              TWO5<span className=" rounded-full text-green-500">.</span>
            </Link>

            <p className="mt-4 text-sm tracking-[-0.02em] text-white/45 sm:text-base">
              Think sharp. Play smart.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-white/10 px-3 py-2 sm:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
              Made to challenge your mind
            </span>
          </div>
        </div>

        {/* Compact navigation */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] text-white/55 transition-colors duration-200 hover:text-[#E9F078] sm:text-[13px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav
            aria-label="Legal navigation"
            className="flex items-center gap-5"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] text-white/35 transition-colors duration-200 hover:text-white/75"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Minimal signature */}
        <div className="flex flex-col gap-2 border-t border-white/[0.07] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] tracking-wide text-white/30">
          TWO5. All rights reserved.
          </p>

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
            Play with purpose<span className="text-[#E9F078]">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
