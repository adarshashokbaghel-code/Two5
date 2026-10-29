import Image from "next/image";

import { TrackVisible } from "@/components/analytics/track-visible";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { AccessCurve } from "@/components/landing/access-curve";
import { EvidenceReveal } from "@/components/landing/evidence-reveal";
import { WaitlistButton } from "@/components/landing/waitlist-button";
import { type LaunchSnapshot } from "@/content/launch";

const pill =
  "inline-flex h-11 items-center justify-center rounded-full bg-[#22C55E] px-5 text-[13px] font-semibold text-black transition hover:brightness-110";

export function AccessTimeline({
  snapshot,
  trackView = false,
}: {
  snapshot: LaunchSnapshot;
  trackView?: boolean;
}) {
  return (
    <section id="launch" aria-labelledby="launch-title" className="bg-black text-[#F4F1E8]">
      {trackView ? <TrackVisible event="launch_timeline_viewed" source="home" /> : null}
      <AccessCurve steps={snapshot.homeSteps} />
      <div className="mx-auto w-full max-w-[1500px] px-4 pt-4 pb-16 text-center sm:px-8 lg:px-14 lg:pb-28">
        <TrackedLink href="/roadmap" source="home-timeline" className={pill}>
          See the full roadmap
        </TrackedLink>
      </div>
    </section>
  );
}

const loadout = [
  { n: "01", title: "Train", line: "WhatsApp invite · December 1", color: "#d82010" },
  { n: "02", title: "Compete", line: "Live for the 200 · December 12", color: "#15803d" },
  { n: "03", title: "Grow", line: "3 invites each · January 1", color: "#9a7209" },
  { n: "04", title: "Early access", line: "Future features", color: "#1060f8" },
  { n: "05", title: "Shape Two5", line: "Before the next wave", color: "#6b6258" },
] as const;

function LoadoutCard({
  item,
  hidden = false,
}: {
  item: (typeof loadout)[number];
  hidden?: boolean;
}) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className={`w-[15.5rem] shrink-0 rounded-2xl border border-ink/10 bg-white px-4 py-4 text-ink sm:w-auto${hidden ? " motion-reduce:hidden" : ""}`}
    >
      <p className="font-display text-sm leading-none" style={{ color: item.color }}>
        {item.n}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-none tracking-[0.01em]">{item.title}</h3>
      <p className="mt-1.5 text-sm leading-5 text-ink/55">{item.line}</p>
    </li>
  );
}

export function Founding() {
  return (
    <section id="founding-players" aria-labelledby="founding-title" className="bg-paper text-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-16">
          <div>
            <p className="font-display text-sm tracking-[0.14em] text-[#15803d] uppercase">Founding players</p>
            <h2 id="founding-title" className="section-heading mt-3">
              Be first to test Two5.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-ink/70">
              The waitlist stays open through November 30. On December 1, 200 people are selected and sent a WhatsApp
              invite. The product launches for them on December 12.
            </p>
            <div className="mt-6">
              <WaitlistButton source="founding" className="bg-[#22C55E] text-black">
                Join the waitlist
              </WaitlistButton>
              <p className="mt-3 text-sm leading-6 text-ink/55">Not selected? Stay on the waitlist.</p>
            </div>
          </div>

          <article className="mx-auto w-full max-w-[17.5rem] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white text-ink">
            <div className="relative grid h-44 place-items-center bg-paper">
              <Image
                src="/hero/sticker-die.png"
                alt=""
                width={320}
                height={320}
                className="size-28"
              />
              <span className="absolute top-3 right-3 rounded-full bg-[#22C55E] px-2.5 py-1 font-display text-[11px] tracking-[0.08em] text-black uppercase">
                200
              </span>
            </div>
            <div className="px-5 py-4">
              <h3 className="font-display text-3xl leading-none tracking-[0.02em]">Player slots</h3>
            </div>
          </article>
        </div>

        <div className="relative mt-12 overflow-hidden motion-reduce:overflow-x-auto md:hidden">
          <ul
            className="flex w-max gap-3 py-2 motion-safe:animate-[loadout-marquee_28s_linear_infinite]"
            aria-label="What founding players get"
          >
            {loadout.map((item) => (
              <LoadoutCard key={item.n} item={item} />
            ))}
            {loadout.map((item) => (
              <LoadoutCard key={`${item.n}-loop`} item={item} hidden />
            ))}
          </ul>
        </div>
        <ul className="mt-12 hidden gap-3 md:grid md:grid-cols-2 lg:grid-cols-5">
          {loadout.map((item) => (
            <LoadoutCard key={item.n} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Evidence() {
  return <EvidenceReveal />;
}

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-black text-[#F4F1E8]">
      <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-8 lg:py-28">
        <h2 id="final-cta-title" className="section-heading">
          Your place in the first round <span className="text-[#22C55E]">starts here.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/60">
          Join the Two5 waitlist for a chance to be among the first 200 players selected on December 1.
        </p>
        <div className="mt-8">
          <WaitlistButton source="final-cta">Join the waitlist</WaitlistButton>
          <p className="mt-3 text-sm text-white/40">No payment required. Selection is not guaranteed.</p>
        </div>
      </div>
    </section>
  );
}
