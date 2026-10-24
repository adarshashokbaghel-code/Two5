"use client";

import Image from "next/image";
import Link from "next/link";

import { TextReveal } from "@/components/ui/text-reveal";
import { track } from "@/lib/analytics";

export function Challenges() {
  return (
    <section id="challenges">
      <div className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-10 lg:px-8 lg:pt-28">
          <p className="font-mono text-[11px] tracking-[0.22em] text-mist uppercase">
            02 / Challenges
          </p>
          <h2 className="mt-4 max-w-xl text-4xl leading-[0.94] font-semibold tracking-tight text-paper sm:text-6xl">
            Choose your arena.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-paper/60">
            Numbers and Logic first. Computer science, a daily problem, and a
            challenge you can send — as Two5 grows.
          </p>
        </div>

        <article className="mx-auto max-w-6xl px-5 pb-16 lg:px-8 lg:pb-24">
          <div className="relative min-h-[32rem] lg:min-h-[38rem]">
            <Image
              src="/art/offer-numbers.jpg"
              alt="A yellow three-dimensional numeral resting in a dark field"
              fill
              sizes="100vw"
              className="object-contain object-[center_30%] p-4 sm:p-10"
            />
            <div className="relative z-10 flex min-h-[32rem] items-end lg:min-h-[38rem]">
              <div className="max-w-md">
                <p className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">
                  01 — Numbers
                </p>
                <h3 className="mt-2 text-5xl font-semibold tracking-tight text-paper sm:text-7xl">
                  Numbers.
                </h3>
                <p className="mt-4 text-base leading-7 text-paper/80">
                  Find the pattern. Work out the sequence. Trust your reasoning.
                </p>
                <p className="mt-4 text-sm leading-6 text-paper/55">
                  From number sequences and mental calculations to mathematical
                  thinking and problems that reward a different way of looking
                  at numbers.
                </p>
                <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-paper/45 uppercase">
                  Sequences · Patterns · Mental Maths · Numerical Reasoning
                </p>
                <Link
                  href="#waitlist"
                  onClick={() =>
                    track("category_selected", {
                      category: "numbers",
                      source: "challenges",
                    })
                  }
                  className="mt-6 inline-flex h-12 items-center bg-signal px-5 text-base font-medium text-ink"
                >
                  Explore Numbers
                </Link>
              </div>
            </div>
          </div>
        </article>

        <article className="border-t border-line">
          <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-8 lg:py-24">
            <div className="lg:pb-4">
              <p className="font-mono text-[11px] tracking-[0.2em] text-volt uppercase">
                02 — Logic
              </p>
              <h3 className="mt-3 text-[4.2rem] leading-[0.84] font-semibold tracking-tight text-paper sm:text-[7rem]">
                Logic.
              </h3>
              <p className="mt-6 max-w-md text-lg leading-8 text-paper/65">
                Spot the clue. Make the connection. Find the answer.
              </p>
              <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-7">
                {[
                  [
                    "Deduce",
                    "Short puzzles that reward careful thinking.",
                  ],
                  [
                    "Connect",
                    "Patterns, missing pieces and relationships that aren't immediately obvious.",
                  ],
                  [
                    "Reason",
                    "Work through a problem, test your thinking and find the answer.",
                  ],
                  [
                    "Adapt",
                    "Familiar rules. Different problems. A new way to think each time.",
                  ],
                ].map(([term, line]) => (
                  <div key={term}>
                    <dt className="font-mono text-[11px] tracking-[0.16em] text-signal uppercase">
                      {term}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-paper/55">
                      {line}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="#waitlist"
                onClick={() =>
                  track("category_selected", {
                    category: "logic",
                    source: "challenges",
                  })
                }
                className="mt-10 inline-flex h-12 items-center border border-paper/20 px-5 text-base text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                Explore Logic
              </Link>
            </div>
            <div className="relative aspect-square lg:aspect-auto lg:h-[36rem]">
              <Image
                src="/art/offer-logic.jpg"
                alt="A floating three-dimensional node with four connected forms"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain"
              />
            </div>
          </div>
        </article>
      </div>

      <div className="bg-white text-ink">
        <article>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[minmax(0,22rem)_minmax(16rem,1fr)] lg:gap-16 lg:px-8 lg:py-20">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-volt uppercase">
                04 — Daily Challenge
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-ink/40 uppercase">
                A reason to return
              </p>
              <h3 className="mt-5 text-4xl leading-[0.94] font-semibold tracking-tight sm:text-5xl">
                One challenge.
                <br />
                Every day.
              </h3>
              <p className="mt-5 max-w-sm text-base leading-7 text-ink/65">
                A fresh problem to take on. A new score to chase. One more
                reason to see what you can solve.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-ink/50">
                From numbers and logic to new categories as Two5 grows, the idea
                stays the same: give yourself a challenge worth coming back for.
              </p>
              <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-ink/40 uppercase">
                Daily Challenges · Personal Scores · New Problems
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-ember uppercase">
                Planned for launch
              </p>
            </div>
            <div className="relative mx-auto h-[28rem] w-full max-w-sm lg:h-[36rem] lg:max-w-md">
              <Image
                src="/art/offer-daily-line.jpg"
                alt="A tall yellow line and a tall black line on white"
                fill
                sizes="(max-width: 1024px) 80vw, 28rem"
                className="object-contain"
              />
            </div>
          </div>
        </article>
      </div>

      <div className="bg-ink">
        <article>
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.2em] text-volt uppercase">
                03 — Computer Science
              </p>
              <p className="font-mono text-[11px] tracking-[0.18em] text-paper/40 uppercase">
                Also planned
              </p>
            </div>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
              <div className="relative mx-auto aspect-square w-full max-w-sm">
                <Image
                  src="/art/offer-cs.jpg"
                  alt="A blue glass tree of nodes standing in an empty dark field"
                  fill
                  sizes="(max-width: 1024px) 80vw, 28vw"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="max-w-md text-4xl leading-[0.94] font-semibold tracking-tight text-paper sm:text-6xl">
                  Think beyond the code.
                </h3>
                <p className="mt-6 max-w-md text-base leading-7 text-paper/65">
                  From data structures and algorithms to the computer science
                  concepts you use to solve real problems.
                </p>
                <p className="mt-4 max-w-md text-sm leading-6 text-paper/50">
                  Practice the thinking behind the code. Work through problems,
                  compare approaches and challenge yourself beyond the usual
                  coding routine.
                </p>
                <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-paper/40 uppercase">
                  DSA · Algorithms · Data Structures · CS Fundamentals
                </p>
                <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-signal uppercase">
                  Coming to Two5
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="bg-paper text-ink">
        <article>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8 lg:py-24">
            <div className="relative aspect-[5/4]">
              <Image
                src="/art/offer-versus.jpg"
                alt="Two opposing three-dimensional forms, yellow and red, facing across a cream field"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-ember uppercase">
                05 — Versus
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-ink/40 uppercase">
                Your score is just the beginning
              </p>
              <h3 className="mt-5 text-4xl leading-[0.94] font-semibold tracking-tight sm:text-5xl">
                You solved it.
                <br />
                Now send the challenge.
              </h3>
              <p className="mt-6 max-w-md text-base leading-7 text-ink/65">
                Challenge a friend to solve the same problem. Compare results.
                See who comes out ahead.
              </p>
              <p className="mt-4 max-w-md text-sm leading-6 text-ink/50">
                Whether it&apos;s a number sequence, a logic puzzle or a future
                DSA challenge, solving it is one thing. Beating your
                friend&apos;s score is another.
              </p>
              <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-ink/40 uppercase">
                Solve · Share · Compare · Rematch
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-ink/50">
                Built around friendly competition. Social challenges are part of
                the Two5 vision, not a live multiplayer feature yet.
              </p>
              <Link
                href="#waitlist"
                onClick={() =>
                  track("waitlist_cta_click", { source: "challenges-versus" })
                }
                className="mt-8 inline-flex h-12 items-center bg-ink px-5 text-base font-medium text-paper"
              >
                Want in on the first rounds?
              </Link>
            </div>
          </div>
        </article>
      </div>

      <TextReveal
        className="bg-paper text-ink"
        lead={
          <div className="mb-6 lg:mb-8">
            <h3 className="max-w-none text-[clamp(2.75rem,7vw,7rem)] leading-[0.9] font-semibold tracking-tight">
              One place.
              <br />
              Different ways to think.
            </h3>
          </div>
        }
        trail={
          <div className="mt-6 lg:mt-8">
            <p className="max-w-3xl text-sm leading-6 text-ink/50 sm:text-base">
              Start with the numbers. Work through the logic. Take on DSA.
              Discover what you&apos;re good at — and what you want to get
              better at.
            </p>
            <Link
              href="#waitlist"
              onClick={() =>
                track("waitlist_cta_click", { source: "challenges-more" })
              }
              className="mt-5 inline-flex h-12 items-center bg-signal px-5 text-base font-medium text-ink"
            >
              Get early access
            </Link>
          </div>
        }
      >
        {"Maths, logic, computer science and more over time. Number sequences, logic puzzles, algorithms and problems that ask you to look again. Two5 is being built to bring those skill challenges together in one place, so you can practice how you think, chase a score, and always find another kind of problem to take on."}
      </TextReveal>
    </section>
  );
}
