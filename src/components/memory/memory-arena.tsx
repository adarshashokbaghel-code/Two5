import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import SiteFooter from "@/components/landing/site-footer";
import { WaitlistButton } from "@/components/landing/waitlist-button";
import { DockNav } from "@/components/layout/dock-nav";
import { memoryGames, memoryLinks } from "@/content/memory-arena";

const pillars = [
  {
    kicker: "Memory",
    body: "Hold a sequence, a position, or a detail after it leaves the screen.",
  },
  {
    kicker: "Observation",
    body: "Notice a change, a difference, or the one detail that moved.",
  },
  {
    kicker: "Spatial thinking",
    body: "Turn a shape, mirror it, and say what comes next.",
  },
] as const;

const modes = [
  {
    name: "Training",
    line: "Understand the thinking.",
    body: "Learn the strategies behind challenges, explore worked examples, practise approaches and understand why a solution works.",
  },
  {
    name: "Solo",
    line: "Challenge yourself.",
    body: "Play independently, improve your consistency, build records and take on progressively challenging rounds.",
  },
  {
    name: "Compete",
    line: "Put your skills to the test.",
    body: "Challenge other players through comparable challenges and see how your performance measures up.",
  },
] as const;

export function MemoryArena() {
  return (
    <>
      <DockNav />
      <main className="bg-paper pb-28 text-ink">
        <div className="arena-band">
          <p>Memory & Visual</p>
        </div>
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Hero />
          <Why />
          <Games />
          <Ways />
          <Notes />
          <Research />
          <Close />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="pt-10 lg:pt-14">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_22rem] lg:gap-12">
        <div>
          <Breadcrumb />
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-volt uppercase">
            Two5 Category 04
            <span className="ml-3 text-mist">[04]</span>
          </p>
          <h1 className="section-heading mt-6 max-w-3xl">Memory & Visual</h1>
          <p className="mt-5 max-w-xl font-display text-3xl leading-none font-normal tracking-[0.02em]">
            See it. Remember it. Transform it.
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
            Train your ability to observe, remember and understand visual information. From holding a pattern to
            spotting a change to turning a shape, each game asks for a different kind of looking.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">
            Three games. Three different ways to challenge your mind. This arena comes after Numbers and Logic. The
            play screens are not open yet.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {memoryGames.map((game) => (
              <li key={game.id}>
                <a
                  href={`#${game.id}`}
                  className="inline-flex h-9 items-center border border-ink/15 px-3 text-[13px] font-medium text-ink/80 transition-colors hover:border-ink hover:text-ink"
                >
                  <span className="mr-2 font-mono text-[10px] tracking-[0.14em] text-volt">{game.index}</span>
                  {game.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#games"
              className="inline-flex h-12 items-center justify-center rounded-[4px] bg-ink px-5 text-base font-medium text-paper"
            >
              Explore the games
            </a>
            <WaitlistButton
              source="memory-hero"
              className="h-12 rounded-[4px] bg-transparent px-5 text-base font-medium text-ink ring-1 ring-ink"
            >
              Join the waitlist
            </WaitlistButton>
          </div>
        </div>
        <ArenaPreview />
      </div>
    </section>
  );
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-ink">
            Two5
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/#challenges" className="hover:text-ink">
            Arenas
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-ink">Memory & Visual</li>
      </ol>
    </nav>
  );
}

function ArenaPreview() {
  return (
    <figure className="relative mx-auto flex w-full max-w-[17.5rem] flex-col items-center">
      <figcaption className="sr-only">
        The Memory and Visual mark on a phone: a yellow bar beside a black bar, labelled as a later Two5 arena.
      </figcaption>
      <div
        className="w-full bg-ink shadow-[0_28px_60px_rgba(0,0,0,0.12)] ring-1 ring-inset ring-ink/10"
        style={{ borderRadius: "2.6rem", padding: "0.4rem" }}
      >
        <div
          className="relative flex h-[32rem] flex-col overflow-hidden bg-black text-paper"
          style={{ borderRadius: "2.2rem" }}
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-3">
            <span className="w-10 text-[11px] font-semibold tracking-tight">9:41</span>
            <span className="text-[11px] font-semibold tracking-tight">5G</span>
          </div>
          <span className="pointer-events-none absolute top-[0.45rem] left-1/2 z-20 h-[1.35rem] w-[32%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
          <div className="relative min-h-0 flex-1">
            <Image
              src="/art/offer-daily-line.jpg"
              alt=""
              fill
              sizes="280px"
              className="object-contain object-center"
            />
          </div>
          <div className="relative z-10 px-5 pb-8 text-center">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">04 · A later arena</p>
            <p className="mt-2 font-display text-4xl leading-none tracking-[0.06em]">Memory</p>
          </div>
          <span className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-[5px] w-[34%] -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </div>
    </figure>
  );
}

function Why() {
  return (
    <section aria-labelledby="why-memory" className="mt-16 border-t border-ink/10 pt-12">
      <h2 id="why-memory" className="section-heading max-w-3xl">
        Better thinking starts with better challenges.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70">
        Memory and visual games practise a specific kind of looking: holding what you just saw, noticing what
        changed, and predicting a shape after it turns or mirrors. A round is short, so the same skills are also
        practised against a clock.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Repeated practice can improve performance on the skills being practised. These games do not raise IQ, prevent
        dementia, or produce a general gain in intelligence.
      </p>
      <ul className="mt-10 grid gap-8 sm:grid-cols-3">
        {pillars.map((item) => (
          <li key={item.kicker}>
            <p className="font-display text-2xl font-normal tracking-[0.02em]">{item.kicker}</p>
            <p className="mt-3 text-sm leading-6 text-ink/70">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Games() {
  return (
    <section id="games" aria-labelledby="games-title" className="mt-16 border-t border-ink/10 pt-12">
      <h2 id="games-title" className="section-heading max-w-3xl">
        Three games. Three ways to look.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Each block below is an introduction. The game screens are not shown, and nothing here starts a round.
      </p>
      <div className="mt-14 space-y-16 lg:space-y-20">
        {memoryGames.map((game, index) => (
          <GameBlock key={game.id} game={game} flip={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function GameBlock({
  game,
  flip,
}: {
  game: (typeof memoryGames)[number];
  flip: boolean;
}) {
  return (
    <article id={game.id} className="grid items-start gap-10 border-t border-ink/10 pt-12 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : undefined}>
        <GameCopy game={game}>
          <p>
            <span className="font-medium text-ink">How it works. </span>
            {game.how}
          </p>
          <p>
            <span className="font-medium text-ink">Skill focus. </span>
            {game.skill}
          </p>
          <p>
            <span className="font-medium text-ink">What makes it interesting. </span>
            {game.interesting}
          </p>
        </GameCopy>
      </div>
      <ConceptNote name={game.name} line={game.tagline} withheld={game.withheld} />
    </article>
  );
}

function GameCopy({
  game,
  children,
}: {
  game: (typeof memoryGames)[number];
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-volt uppercase">Game {game.index}</p>
      <h3 className="mt-3 font-display text-3xl leading-none font-normal tracking-[0.02em] sm:text-4xl">{game.name}</h3>
      <p className="mt-3 text-base leading-7 text-ink/70">{game.tagline}</p>
      <p className="mt-4 text-base leading-7 text-ink/75">{game.description}</p>
      <div className="mt-6 space-y-4 text-sm leading-6 text-ink/70">{children}</div>
      <p className="mt-6 text-sm leading-6 text-ink/60">{game.modes}</p>
    </div>
  );
}

function ConceptNote({ name, line, withheld }: { name: string; line: string; withheld: string }) {
  return (
    <figure className="border border-ink/10 bg-white p-5 sm:p-7" aria-label={`${name} concept note`}>
      <figcaption className="font-mono text-[10px] tracking-[0.16em] text-volt uppercase">
        Concept note · screen not shown
      </figcaption>
      <p className="mt-6 font-display text-4xl leading-none">{name}</p>
      <p className="mt-4 max-w-sm text-base leading-7 text-ink/70">{line}</p>
      <p className="mt-6 border border-dashed border-ink/15 px-4 py-5 text-sm leading-6 text-ink/60">
        {withheld} The play screen for {name} is not published. Rules, timing and scoring are still being designed.
      </p>
    </figure>
  );
}

function Ways() {
  return (
    <section id="ways" aria-labelledby="ways-title" className="mt-16 border-t border-ink/10 pt-12">
      <h2 id="ways-title" className="section-heading max-w-3xl">
        One arena. Three ways to play.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        The plan is simple: choose a challenge, observe or remember, then try to beat a score. Training, Solo and
        Compete are planned for Flash Grid, Snapshot and Pattern Forge. This page does not open a match, a ranking,
        or a round. Personal bests, daily challenges and leaderboards are not live.
      </p>
      <ol className="mt-10 grid gap-8 lg:grid-cols-3">
        {modes.map((mode, index) => (
          <li key={mode.name}>
            <p className="font-mono text-[11px] tracking-[0.16em] text-mist">0{index + 1}</p>
            <h3 className="mt-3 font-display text-2xl leading-none font-normal tracking-[0.02em]">{mode.name}</h3>
            <p className="mt-2 text-sm text-volt">{mode.line}</p>
            <p className="mt-3 text-sm leading-6 text-ink/70">{mode.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {memoryGames.map((game) => (
                <li key={game.id}>
                  <a
                    href={`#${game.id}`}
                    className="inline-flex border border-ink/10 px-2.5 py-1 text-[11px] text-ink/70 hover:text-ink"
                  >
                    {game.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Notes() {
  return (
    <section aria-labelledby="memory-notes" className="mt-16 border-t border-ink/10 pt-12">
      <h2 id="memory-notes" className="font-display text-3xl leading-none font-normal tracking-[0.02em]">
        Other arenas
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Numbers and Logic are the arenas already introduced. None of these links opens a Memory round.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {memoryLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-base text-ink underline decoration-volt/30 underline-offset-[3px] hover:text-volt"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="mt-16 border-t border-ink/10 pt-12">
      <h2 id="research-title" className="section-heading max-w-3xl">
        The thinking behind Memory & Visual.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        The arena takes an interest in how people hold a picture, notice a change, and predict a shape after it
        turns. That interest is written up as a research note. It is not a claim that this page trains memory in
        general.
      </p>
      <p className="mt-8 max-w-3xl border border-ink/10 px-4 py-4 text-sm leading-6 text-ink/70">
        Research informs the design, but it does not establish that playing Two5 improves IQ, general intelligence or
        performance outside the specific skills being practised. The effectiveness of the games must be evaluated
        independently.
      </p>
      <p className="mt-4 text-sm text-ink/60">
        The note is on{" "}
        <Link href="/research/memory-visual" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
          Memory & Visual
        </Link>
        .
      </p>
    </section>
  );
}

function Close() {
  return (
    <section aria-labelledby="memory-close" className="mt-16 border-t border-ink/10 pt-16 pb-8">
      <div className="max-w-3xl">
        <h2 id="memory-close" className="section-heading">
          Ready to put your mind to the test?
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
          Choose a game when the arena opens. Take the challenge. See how far you can go. Memory & Visual is not open
          to play yet. Join the waitlist to follow it.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4">
          <WaitlistButton
            source="memory-close"
            className="h-12 rounded-[4px] bg-ink px-5 text-base font-medium text-paper"
          >
            Join the waitlist
          </WaitlistButton>
          <p className="text-sm text-ink/60">
            <Link href="/categories/numbers" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
              Numbers arena
            </Link>
            <span className="px-2">·</span>
            <Link href="/categories/logic" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
              Logic & Patterns
            </Link>
            <span className="px-2">·</span>
            <Link href="/roadmap" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
              Read the roadmap
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
