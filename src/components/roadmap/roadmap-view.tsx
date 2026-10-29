import Link from "next/link";

import { TrackVisible } from "@/components/analytics/track-visible";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { StatusMark } from "@/components/landing/status-mark";
import { WaitlistButton } from "@/components/landing/waitlist-button";
import {
  afterJoin,
  designPrinciples,
  faqs,
  foundingBenefits,
  researchSources,
  type LaunchSnapshot,
} from "@/content/launch";

const textLink =
  "text-sm text-signal underline decoration-signal/40 underline-offset-[3px] hover:text-white";

export function RoadmapView({
  snapshot,
  trackView = false,
}: {
  snapshot: LaunchSnapshot;
  trackView?: boolean;
}) {
  return (
    <main className="bg-black text-[#F4F1E8]">
      <header className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8 lg:pt-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white/70">
              Roadmap
            </li>
          </ol>
        </nav>

        <p className="mt-8 font-mono text-[11px] tracking-[0.22em] text-white/40 uppercase">The Two5 roadmap</p>
        <h1 className="section-heading mt-4 max-w-4xl">
          From the first 200 to a new <span className="text-[#22C55E]">training ground.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
          Two5 is a mental training and competition platform opening in stages: first a founding cohort, then an
          invite-only launch, then further access as the product improves.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WaitlistButton source="roadmap-hero">Join the waitlist</WaitlistButton>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-[13px] font-medium text-white/80 hover:border-white/30 hover:text-white"
          >
            Back to the homepage
          </Link>
        </div>
        <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-signal">
          Next milestone: {snapshot.nextMilestone}
        </p>
      </header>

      <section aria-labelledby="phase-title" className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 id="phase-title" className="font-display text-3xl leading-none tracking-[0.03em]">
            Where the launch is now
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Statuses follow the published dates in India Standard Time. They describe the schedule. They are not a
            live count of invitations sent.
          </p>
          <ol className="mt-10 grid lg:grid-cols-5">
            {snapshot.stages.map((stage, index) => (
              <li
                key={stage.id}
                className={
                  index === 0
                    ? "border-l border-white/15 py-5 pl-5 lg:border-l-0 lg:py-0 lg:pl-0"
                    : "border-l border-white/15 py-5 pl-5 lg:py-0 lg:pl-6"
                }
              >
                <p
                  className="font-display text-5xl leading-none"
                  style={{ color: ["#22C55E", "#1060f8", "#d82010", "#f0c020", "#5ec8ff"][index] }}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-none sm:text-3xl">{stage.title}</h3>
                <div className="mt-4">
                  <StatusMark status={stage.status} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="access" aria-labelledby="access-title" className="scroll-mt-8 border-t border-white/10">
        {trackView ? <TrackVisible event="launch_timeline_viewed" source="roadmap" /> : null}
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 id="access-title" className="section-heading max-w-3xl">
            How access works
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
            Access is limited because the first cohort is a closed beta, not because a crowd has already filled the
            product. Two hundred people are drawn from the waitlist. The rest stay on the list.
          </p>
          <ol className="mt-12 space-y-0">
            {snapshot.milestones.map((item) => (
              <li key={item.id} className="grid gap-4 border-t border-white/10 py-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
                <div>
                  <p className="text-base leading-6 font-medium text-white sm:text-lg">{item.date}</p>
                  <div className="mt-3">
                    <StatusMark status={item.status} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-3xl leading-none tracking-[0.03em] sm:text-4xl">{item.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">{item.description}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                    <span className="text-white/70">What to expect. </span>
                    {item.expect}
                  </p>
                  {item.cta ? (
                    <div className="mt-5">
                      <WaitlistButton source={item.cta.source}>{item.cta.label}</WaitlistButton>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="why-title" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 id="why-title" className="section-heading max-w-3xl">
            Why not open the doors to everyone?
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-base leading-7 text-white/60">
            <p>
              Two5 is starting with a limited cohort so the team can observe real play, find problems, and improve the
              experience before more people come in. The first 200 players help establish that first version.
            </p>
            <p>
              Limited access also gives early players a defined way to take part. Selection is a random draw. Joining
              the waitlist is not a promise of entry. This page does not claim a crowd size, a sold-out list, or a
              number of active players.
            </p>
          </div>
        </div>
      </section>

      <section id="after-you-join" aria-labelledby="after-title" className="scroll-mt-8 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 id="after-title" className="section-heading max-w-3xl">
            What happens after you join?
          </h2>
          <ol className="mt-12 grid gap-10 lg:grid-cols-3">
            {afterJoin.map((step, index) => (
              <li key={step.index}>
                <p
                  className="font-display text-6xl leading-none"
                  style={{ color: ["#22C55E", "#1060f8", "#d82010"][index] }}
                >
                  {step.index}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-none">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-white/50">
            If you are not selected, you can remain on the waitlist for future access waves. Joining does not
            guarantee a particular selection date.
          </p>
        </div>
      </section>

      <section id="founding" aria-labelledby="shape-title" className="scroll-mt-8 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 id="shape-title" className="section-heading max-w-3xl">
            Help shape the first version.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
            Founding players may report bugs, share usability notes, answer short product surveys, compare the live
            flow with what they expected, and suggest improvements. A suggestion is not a commitment to build it.
          </p>
          <ul className="mt-8 max-w-2xl border-t border-white/10">
            {foundingBenefits.map((item) => (
              <li key={item} className="border-b border-white/10 py-3 text-sm leading-6 text-white/70">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 max-w-2xl space-y-3 text-sm leading-6 text-white/55">
            <p>
              Selected players who want to can join a private WhatsApp group. Membership is optional. Phone numbers
              in that group can be visible to other members. Using Two5 does not depend on joining, and player results
              are not posted there without consent.
            </p>
            <p>
              If you would rather not use WhatsApp, write through the{" "}
              <Link href="/contact" className="text-white underline decoration-white/30 underline-offset-[3px]">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="research" aria-labelledby="research-title" className="scroll-mt-8 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 id="research-title" className="section-heading max-w-3xl">
            Training should have a purpose.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
            Two5 intends to build challenges around defined cognitive task demands, rather than labelling arbitrary
            games as brain training. The principles below are a design standard. They are not a clinical claim.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {designPrinciples.map((item, index) => (
              <li key={item.title} className="border-t border-white/10 pt-4">
                <p className="font-mono text-[11px] text-white/35">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl leading-none">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-sm leading-6 text-white/55">
            Research on cognitive training reports benefits for some trained or related cognitive outcomes, but
            results vary. Improvements on a particular game do not automatically demonstrate broad real-world
            transfer. Two5&apos;s own effectiveness has not been clinically established.
          </p>
          <ul className="mt-6 max-w-2xl space-y-4">
            {researchSources.map((source) => (
              <li key={source.href} className="text-sm leading-6 text-white/55">
                <a
                  href={source.href}
                  className="text-white underline decoration-white/30 underline-offset-[3px]"
                >
                  {source.label}
                </a>{" "}
                {source.note}
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/research" className={textLink}>
              Arena notes already on the site
            </Link>
          </p>
        </div>
      </section>

      <section id="faq" aria-labelledby="roadmap-faq-title" className="scroll-mt-8 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 id="roadmap-faq-title" className="section-heading max-w-xl">
            Questions about access
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} idPrefix="roadmap" />
          </div>
        </div>
      </section>

      <section aria-labelledby="roadmap-cta-title" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 id="roadmap-cta-title" className="section-heading max-w-3xl">
            The first round is getting closer.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
            Join the waitlist for a chance to be among the first 200 selected players.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WaitlistButton source="roadmap-final">Join the waitlist</WaitlistButton>
            <Link href="/" className={textLink}>
              Return to Two5
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
