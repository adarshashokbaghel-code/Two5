
"use client";

import Link from "next/link";
import { useState } from "react";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const questions = [
  {
    index: "01",
    q: "What is Two5?",
    a: "Two5 is a game of short challenges across four categories. Numbers and Logic are MVP — play them first, get a score, and try to beat it. Computer Science and Memory & Visual are planned as the next expansion.",
  },
  {
    index: "02",
    q: "What can I do on Two5?",
    a: "Pick a challenge, solve it, see your score, then try again. Sending one to a friend is part of what we're building next.",
  },
  {
    index: "03",
    q: "What kinds of challenges will be available?",
    a: "Numbers (Number Sprint, Sequence Hunt, Target Number) and Logic (Pattern Breaker, Hidden Rule, Logic Grid) ship first. Computer Science (Binary Blitz, Code Trace, Bug Hunt) and Memory & Visual (Flash Recall, Grid Memory, Visual Sequence) are the next expansion.",
  },
  {
    index: "04",
    q: "Is Two5 only for programmers or maths enthusiasts?",
    a: "Not at all. Two5 is intended for anyone who enjoys solving a good problem, spotting patterns or testing their thinking. You don't need to be a programmer or a maths expert to get started.",
  },
  {
    index: "05",
    q: "Can I challenge my friends?",
    a: "That's the idea. You'll be able to send a problem and see who gets the better score. Friend challenges aren't open yet.",
  },
  {
    index: "06",
    q: "Will Two5 have daily challenges and leaderboards?",
    a: "Leaderboards and more social play are on the list. The first four categories — two live in MVP — are the focus right now.",
  },
  {
    index: "07",
    q: "Is Two5 available yet?",
    a: "Two5 is currently building toward its initial launch. Join the waitlist to register your interest and receive updates about launch and early access as they become available.",
  },
  {
    index: "08",
    q: "Is Two5 free to use?",
    a: "The initial focus is on building a useful, enjoyable challenge experience. Final pricing and any premium features have not been confirmed yet. Join the waitlist for updates as launch plans take shape.",
  },
  {
    index: "09",
    q: "How do I join the Two5 waitlist?",
    a: "Enter your email address in the waitlist form on this page and submit it. If your signup is successful, you'll see a confirmation. We'll share relevant launch and early-access updates as they become available.",
  },
  {
    index: "10",
    q: "How can I help shape Two5 before launch?",
    a: "Join the waitlist and share Two5 with people who enjoy puzzles, maths, coding or friendly competition. Your interest helps us understand which challenge categories and experiences people want most as we decide what to build next.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState(0);
  const current = questions[open];

  return (
    <section id="faq" className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-6 lg:px-8 lg:pt-28">
        <p className="font-mono text-[11px] tracking-[0.22em] text-white/40 uppercase">
          Before you play
        </p>
        <h2 className="section-heading mt-4 max-w-xl">
          Good questions.
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20 lg:px-8 lg:pb-28">
        <div>
          {questions.map((item, index) => {
            const selected = index === open;

            return (
              <div key={item.index} className="border-t border-white/10">
                <button
                  type="button"
                  aria-expanded={selected}
                  onClick={() => setOpen(index)}
                  className="flex w-full items-baseline gap-4 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.18em]",
                      selected ? "text-ember" : "text-white/35",
                    )}
                  >
                    {item.index}
                  </span>
                  <span
                    className={cn(
                      "font-display text-2xl leading-none font-normal tracking-[0.02em] sm:text-3xl",
                      selected ? "text-white" : "text-white/45",
                    )}
                  >
                    {item.q}
                  </span>
                </button>
                {selected ? (
                  <p className="pb-6 pl-9 text-base leading-7 text-white/65 lg:hidden">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-10">
            <p className="font-mono text-[11px] tracking-[0.18em] text-ember uppercase">
              {current.index}
            </p>
            <h3 className="mt-4 font-display text-4xl leading-none font-normal tracking-[0.02em] text-white sm:text-5xl">
              {current.q}
            </h3>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">
              {current.a}
            </p>
            <Link
              href="#waitlist"
              onClick={() => track("waitlist_cta_click", { source: "faq" })}
              className="mt-10 inline-flex h-12 items-center rounded-[4px] bg-red-600 px-5 text-white font-medium text-ink"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-28 lg:hidden">
        <Link
          href="#waitlist"
          onClick={() => track("waitlist_cta_click", { source: "faq" })}
          className="inline-flex h-12 items-center rounded-[4px] bg-signal px-5 text-base font-medium text-ink"
        >
          Join the waitlist
        </Link>
      </div>
    </section>
  );
}
