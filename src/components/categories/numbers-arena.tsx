import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import SiteFooter from "@/components/landing/site-footer";
import { WaitlistButton } from "@/components/landing/waitlist-button";
import { DockNav } from "@/components/layout/dock-nav";
import { games, papers } from "@/content/numbers-arena";
import { numbersArenaLinks } from "@/lib/seo/validate";

const pillars = [
  {
    kicker: "Construct",
    body: "Work with numbers and operations to reach a target.",
  },
  {
    kicker: "Discover",
    body: "Recognise relationships and uncover patterns.",
  },
  {
    kicker: "Estimate",
    body: "Judge numerical values and see how close your intuition gets.",
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

export function NumbersArena() {
  return (
    <>
      <DockNav />
      <main className="bg-paper pb-28 text-ink">
        <div className="arena-band">
          <p>Numbers</p>
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
              Two5 Category 01
              <span className="ml-3 text-mist">[01]</span>
            </p>
            <h1 className="section-heading mt-6 max-w-3xl">Numbers</h1>
            <p className="mt-5 max-w-xl font-display text-3xl leading-none font-normal tracking-[0.02em]">
              Think beyond the answer.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
              Numbers is the first arena of Two5. Explore numerical challenges built around calculation, pattern
              recognition and estimation.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">
              Three games. Three ways to think. One arena.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {games.map((game) => (
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
              <WaitlistButton source="numbers-hero" className="h-12 rounded-[4px] bg-transparent px-5 text-base font-medium text-ink ring-1 ring-ink">
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
        <li className="text-ink">Numbers</li>
      </ol>
    </nav>
  );
}

function ArenaPreview() {
  return (
    <figure className="relative mx-auto flex w-full max-w-[17.5rem] flex-col items-center">
      <figcaption className="sr-only">
        The Numbers launch mark on a phone: a green geometric 25, labelled as the first Two5 arena.
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
              src="/art/numbers-25-green.jpg"
              alt=""
              fill
              sizes="280px"
              className="object-contain object-center"
            />
          </div>
          <div className="relative z-10 px-5 pb-8 text-center">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">01 · The first arena</p>
            <p className="mt-2 font-display text-4xl leading-none tracking-[0.06em]">Numbers</p>
          </div>
          <span className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-[5px] w-[34%] -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </div>
    </figure>
  );
}

function Why() {
  return (
    <section aria-labelledby="why-numbers" className="mt-16 border-t border-ink/10 pt-12">
      <h2 id="why-numbers" className="section-heading max-w-3xl">
        Numbers are more than calculations.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70">
        Working with numbers involves more than finding the right answer. Sometimes it means combining values to
        construct a solution. Sometimes it means recognising a hidden pattern. And sometimes it means estimating an
        answer without calculating every step.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        The Numbers arena brings these different forms of numerical thinking together through three distinct games.
      </p>
      <ul className="mt-10 grid gap-8 md:grid-cols-3">
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
        Three games. Three different challenges.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Each block below is a concept preview. Rules, number-use constraints, available operations and scoring are
        still being designed. Nothing here is a live round.
      </p>
      <div className="mt-14 space-y-16 lg:space-y-20">
        <TargetGame />
        <SequenceGame />
        <PinpointGame />
      </div>
    </section>
  );
}

function GameCopy({
  game,
  children,
}: {
  game: (typeof games)[number];
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-volt uppercase">
        Game {game.index}
      </p>
      <h3 className="mt-3 font-display text-3xl leading-none font-normal tracking-[0.02em] sm:text-4xl">{game.name}</h3>
      <p className="mt-3 text-base leading-7 text-ink/70">{game.tagline}</p>
      <p className="mt-4 text-base leading-7 text-ink/75">{game.description}</p>
      <div className="mt-6 space-y-4 text-sm leading-6 text-ink/70">{children}</div>
      <p className="mt-6 text-sm leading-6 text-ink/60">{game.modes}</p>
      <p className="mt-4">
        <Link
          href={`/numbers/games/${game.id}`}
          className="text-sm text-volt underline decoration-volt/30 underline-offset-[3px]"
        >
          Read how {game.name} works
        </Link>
      </p>
    </div>
  );
}

function TargetGame() {
  const game = games[0];
  return (
    <article id={game.id} className="grid items-start gap-10 border-t border-ink/10 pt-12 lg:grid-cols-2 lg:gap-16">
      <GameCopy game={game}>
        <p>
          <span className="font-medium text-ink">How it works. </span>
          {game.how}
        </p>
        <p>
          <span className="font-medium text-ink">Example. </span>
          Numbers 8, 3, 6 and 1. Target 25. One valid path is (8 − 3) × (6 − 1) = 25.
        </p>
        <p>
          <span className="font-medium text-ink">What makes it interesting. </span>
          Combining numbers. Choosing operations. Exploring possible solution paths. Finding valid ways to reach the
          target.
        </p>
      </GameCopy>
      <TargetBoard />
    </article>
  );
}

function TargetBoard() {
  return (
    <figure className="border border-ink/10 bg-white p-5 sm:p-7" aria-label="Target 25 concept preview">
      <figcaption className="font-mono text-[10px] tracking-[0.16em] text-volt uppercase">
        Concept preview · not the final rules
      </figcaption>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {["8", "3", "6", "1"].map((value) => (
          <span key={value} className="grid h-[4.5rem] place-items-center border border-ink/10 bg-paper font-display text-4xl">
            {value}
          </span>
        ))}
      </div>
      <div className="mt-4 border border-dashed border-ink/15 px-4 py-5 text-center">
        <p className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">Operation area</p>
        <p className="mt-2 font-display text-2xl leading-none sm:text-3xl">(8 − 3) × (6 − 1)</p>
      </div>
      <div className="mt-4 flex items-end justify-between border border-ink/10 px-4 py-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">Target</p>
          <p className="mt-1 font-display text-5xl leading-none text-volt">25</p>
        </div>
        <p className="max-w-[10rem] text-right text-xs leading-5 text-ink/55">
          Equals the target. Other paths may also exist.
        </p>
      </div>
    </figure>
  );
}

function SequenceGame() {
  const game = games[1];
  return (
    <article id={game.id} className="grid items-start gap-10 border-t border-ink/10 pt-12 lg:grid-cols-2 lg:gap-16">
      <SequenceBoard />
      <GameCopy game={game}>
        <p>
          <span className="font-medium text-ink">How it works. </span>
          {game.how}
        </p>
        <p>
          <span className="font-medium text-ink">Example. </span>
          2, 6, 12, 20, 30, and then what? The steps are +4, +6, +8, +10, +12, so the next value in this example is
          42.
        </p>
        <p>
          <span className="font-medium text-ink">Three planned challenge types. </span>
          Complete the sequence. Find the incorrect number. Identify the underlying rule.
        </p>
        <p>
          <span className="font-medium text-ink">What makes it interesting. </span>
          {game.interesting}
        </p>
      </GameCopy>
    </article>
  );
}

function SequenceBoard() {
  const steps = [
    { n: "2", d: "+4" },
    { n: "6", d: "+6" },
    { n: "12", d: "+8" },
    { n: "20", d: "+10" },
    { n: "30", d: "+12" },
  ];
  return (
    <figure className="border border-ink/10 bg-white p-5 sm:p-7" aria-label="Sequence concept preview">
      <figcaption className="font-mono text-[10px] tracking-[0.16em] text-volt uppercase">
        Concept preview · one example rule
      </figcaption>
      <ol className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {steps.map((step) => (
          <li key={step.n} className="min-w-[3.4rem] flex-1">
            <span className="grid h-14 place-items-center border border-ink/10 bg-paper font-display text-2xl">
              {step.n}
            </span>
            <span className="mt-2 block text-center font-mono text-[10px] text-mist">{step.d}</span>
          </li>
        ))}
        <li className="min-w-[3.4rem] flex-1">
          <span className="grid h-14 place-items-center border border-dashed border-volt font-display text-2xl text-volt">
            ?
          </span>
          <span className="mt-2 block text-center font-mono text-[10px] text-volt">42</span>
        </li>
      </ol>
      <p className="mt-4 text-sm leading-6 text-ink/60">
        Differences grow by two each time. That is the rule for this row, not a promise about every future round.
      </p>
    </figure>
  );
}

function PinpointGame() {
  const game = games[2];
  return (
    <article id={game.id} className="grid items-start gap-10 border-t border-ink/10 pt-12 lg:grid-cols-2 lg:gap-16">
      <GameCopy game={game}>
        <p>
          <span className="font-medium text-ink">How it works. </span>
          {game.how}
        </p>
        <p>
          <span className="font-medium text-ink">Example. </span>
          About where does 62 sit on a line from 0 to 100? In this drawing a judgement lands near 55, and the exact
          place is 62. A round can ask for a count, a distance, a duration, or another magnitude. The challenge is
          the judgement.
        </p>
        <p>
          <span className="font-medium text-ink">What makes it interesting. </span>
          Numerical estimation. Judging magnitude. Approximating values. Comparing an estimate with the actual answer.
        </p>
      </GameCopy>
      <PinpointBoard />
    </article>
  );
}

function PinpointBoard() {
  return (
    <figure className="border border-ink/10 bg-white p-5 sm:p-7" aria-label="Pinpoint concept preview">
      <figcaption className="font-mono text-[10px] tracking-[0.16em] text-volt uppercase">
        Concept preview · Pinpoint
      </figcaption>
      <p className="mt-5 font-display text-2xl leading-tight sm:text-3xl">About where does 62 sit, from 0 to 100?</p>
      <div className="mt-8" aria-hidden="true">
        <div className="relative h-2 bg-ink/10">
          <div className="absolute top-1/2 left-[55%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt" />
          <div className="absolute top-1/2 left-[62%] h-4 w-px -translate-y-1/2 bg-ink/50" />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.12em] text-mist">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="border border-ink/10 px-3 py-3">
          <p className="font-mono text-[10px] tracking-[0.14em] text-mist uppercase">A placed estimate</p>
          <p className="mt-1 font-display text-3xl leading-none">~55</p>
        </div>
        <div className="border border-ink/10 px-3 py-3">
          <p className="font-mono text-[10px] tracking-[0.14em] text-volt uppercase">Exact place</p>
          <p className="mt-1 font-display text-3xl leading-none">62</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-ink/55">
        One drawing of a magnitude judgement. A round can ask for a count, a distance, a duration, or another kind of
        number. The mark is not a control, and it does not start a round.
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
        Training, Solo and Compete are planned for Target 25, Sequence and Pinpoint. This page does not open a
        match, a ranking, or a round.
      </p>
      <ol className="mt-10 grid gap-8 lg:grid-cols-3">
        {modes.map((mode, index) => (
          <li key={mode.name}>
            <p className="font-mono text-[11px] tracking-[0.16em] text-mist">0{index + 1}</p>
            <h3 className="mt-3 font-display text-2xl leading-none font-normal tracking-[0.02em]">{mode.name}</h3>
            <p className="mt-2 text-sm text-volt">{mode.line}</p>
            <p className="mt-3 text-sm leading-6 text-ink/70">{mode.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {games.map((game) => (
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
    <section aria-labelledby="numbers-notes" className="mt-16 border-t border-ink/10 pt-12">
      <h2 id="numbers-notes" className="font-display text-3xl leading-none font-normal tracking-[0.02em]">
        Notes and puzzles
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Longer explanations and individual challenges sit on their own pages. None of them opens a round.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {numbersArenaLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-base text-ink underline decoration-volt/30 underline-offset-[3px] hover:text-volt">
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
        The thinking behind Numbers.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
        Our games take inspiration from research into how people understand, manipulate and estimate numerical
        information.
      </p>
      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {papers.map((paper, index) => (
          <details key={paper.id} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="font-mono text-[11px] tracking-[0.16em] text-mist">
                  0{index + 1} · {paper.game}
                </span>
                <span className="mt-2 block font-display text-2xl leading-tight sm:text-3xl">{paper.title}</span>
                <span className="mt-2 block text-sm text-ink/55">
                  {paper.authors ? `${paper.authors} · ` : null}
                  {paper.publication}
                </span>
              </span>
              <span className="mt-1 grid size-8 shrink-0 place-items-center border border-ink/15 text-lg text-ink/70 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="max-w-3xl pt-4 text-sm leading-6 text-ink/70">
              <p>{paper.summary}</p>
              <p className="mt-3">{paper.connection}</p>
              <p className="mt-3">
                <a
                  href={paper.doi}
                  className="text-volt underline decoration-volt/30 underline-offset-[3px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {paper.doi.replace("https://", "")}
                </a>
              </p>
            </div>
          </details>
        ))}
      </div>
      <p className="mt-8 max-w-3xl border border-ink/10 px-4 py-4 text-sm leading-6 text-ink/70">
        Research informs our game design, but it does not establish that playing Two5 improves IQ, general
        intelligence or performance outside the specific skills being practised. The effectiveness of our games must
        be evaluated independently.
      </p>
      <p className="mt-4 text-sm text-ink/60">
        More of the evidence standard is on the{" "}
        <Link href="/research" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
          research notes
        </Link>
        .
      </p>
    </section>
  );
}

function Close() {
  return (
    <section aria-labelledby="numbers-close" className="mt-16 border-t border-ink/10 pt-16 pb-8">
      <div className="max-w-3xl">
        <h2 id="numbers-close" className="section-heading">
          Your first arena awaits.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
          Numbers is where Two5 begins. Join the waitlist to follow development and get updates as we prepare the
          first games.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4">
          <WaitlistButton source="numbers-close" className="h-12 rounded-[4px] bg-ink px-5 text-base font-medium text-paper">
            Join the waitlist
          </WaitlistButton>
          <p className="text-sm text-ink/60">
            <Link href="/" className="text-volt underline decoration-volt/30 underline-offset-[3px]">
              Back to Two5
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
