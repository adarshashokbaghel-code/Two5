import Link from "next/link";

import SiteFooter from "@/components/landing/site-footer";
import { JoinHero } from "@/components/join/join-hero";
import { WaitlistButton } from "@/components/landing/waitlist-button";
import { DockNav } from "@/components/layout/dock-nav";
import { joinFaqs } from "@/content/join-waitlist";

const freeSteps = [
  "Join with your name, email, and age. You need to be at least 13.",
  "The list for this draw closes on 30 November 2026.",
  "On 1 December 2026, 200 people are shortlisted at random.",
  "They get a WhatsApp invite. The product opens for them on 12 December 2026.",
  "From 1 January 2027, each of those people can invite one player.",
] as const;

const reservedPoints = [
  "A reserved place, separate from the 200-person draw.",
  "$299 on a card, or ₹26,850 for UPI, netbanking, and Indian wallets.",
  "Razorpay shows the methods available for the currency you pick.",
  "The place is reserved only after the payment is captured.",
] as const;

export function JoinWaitlist() {
  return (
    <>
      <DockNav />
      <main className="bg-paper text-ink">
        <JoinHero />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Paths />
          <Dates />
          <Product />
          <Faq />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Paths() {
  return (
    <section aria-labelledby="ways-title" className="py-16">
      <h2 id="ways-title" className="section-heading max-w-3xl">
        Pick a way in.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Dates are India Standard Time, UTC+5:30. The price on the reserved place is US dollars.
      </p>
      <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
        <article className="flex flex-col border border-ink/10 bg-white p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-volt uppercase">01 · Free</p>
          <h3 className="mt-4 font-display text-4xl leading-none">The shortlist</h3>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Join, get shortlisted, then an invite. A place is not guaranteed.
          </p>
          <ol className="mt-6 space-y-3 text-sm leading-6 text-ink/75">
            {freeSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="font-mono text-[11px] tracking-[0.14em] text-volt">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <WaitlistButton source="join-free" className="h-12 rounded-[4px] bg-ink px-5 text-base font-medium text-paper">
              Join the free list
            </WaitlistButton>
          </div>
        </article>

        <article id="reserved" className="flex scroll-mt-24 flex-col bg-signal p-6 text-ink sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase">02 · Reserved</p>
          <h3 className="mt-4 font-display text-4xl leading-none">A sure place</h3>
          <p className="mt-6 font-display text-7xl leading-none tracking-[0.02em]">$299</p>
          <p className="mt-2 text-sm">USD · one time · or ₹26,850 in India</p>
          <ul className="mt-6 space-y-3 text-sm leading-6">
            {reservedPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-8 border border-ink/20 px-4 py-4 text-sm leading-6">
            Pay from the form above. Nothing is charged until you confirm in Razorpay, and the account is marked
            premium only after the payment is captured.
          </p>
        </article>
      </div>
    </section>
  );
}

function Dates() {
  const marks = [
    ["30 Nov 2026", "Free list closes"],
    ["1 Dec 2026", "200 shortlisted"],
    ["12 Dec 2026", "Product opens for them"],
    ["1 Jan 2027", "One invite each"],
  ] as const;

  return (
    <section aria-labelledby="dates-title" className="border-t border-ink/10 py-14">
      <h2 id="dates-title" className="font-display text-3xl leading-none">
        The free path, in order.
      </h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {marks.map(([when, what], index) => (
          <li key={when}>
            <p className="font-mono text-[11px] tracking-[0.16em] text-mist">0{index + 1}</p>
            <p className="mt-2 font-display text-2xl leading-none">{when}</p>
            <p className="mt-2 text-sm leading-6 text-ink/70">{what}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Product() {
  return (
    <section aria-labelledby="product-title" className="border-t border-ink/10 py-14">
      <h2 id="product-title" className="font-display text-3xl leading-none">
        What you are joining.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Short scored challenges for people who like problems. Numbers and Logic come first. Memory & Visual follows.
        The play screens are not open. Two5 does not claim to raise IQ or prevent dementia.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li>
          <Link href="/categories/numbers" className="text-base underline decoration-volt/30 underline-offset-[3px] hover:text-volt">
            Numbers — mental math games
          </Link>
        </li>
        <li>
          <Link href="/categories/logic" className="text-base underline decoration-volt/30 underline-offset-[3px] hover:text-volt">
            Logic & Patterns
          </Link>
        </li>
        <li>
          <Link href="/categories/memory-visual" className="text-base underline decoration-volt/30 underline-offset-[3px] hover:text-volt">
            Memory & Visual
          </Link>
        </li>
      </ul>
    </section>
  );
}

function Faq() {
  return (
    <section aria-labelledby="join-faq" className="border-t border-ink/10 py-14 pb-24">
      <h2 id="join-faq" className="font-display text-3xl leading-none">
        Before you join.
      </h2>
      <dl className="mt-8 max-w-3xl divide-y divide-ink/10">
        {joinFaqs.map((item) => (
          <div key={item.q} className="py-5">
            <dt className="font-display text-2xl leading-none">{item.q}</dt>
            <dd className="mt-3 text-base leading-7 text-ink/70">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
