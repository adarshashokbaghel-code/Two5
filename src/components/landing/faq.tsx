"use client";

import Link from "next/link";
import { useState } from "react";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const questions = [
  {
    index: "01",
    q: "What is Two5?",
    a: "Two5 is a skill-challenge platform built around solving problems, testing your thinking and competing with others. Starting with Numbers and Logic, the idea is to make short challenges more engaging through scores, friendly competition and new problems to take on.",
  },
  {
    index: "02",
    q: "What can I do on Two5?",
    a: "Two5 is being designed around a simple loop: choose a challenge, solve it, see your result and challenge yourself to do better. Social challenges and additional competitive features are part of the product vision as Two5 develops.",
  },
  {
    index: "03",
    q: "What kinds of challenges will be available?",
    a: "Numbers and Logic are the initial focus. Expect number sequences, mathematical reasoning, patterns, deduction and problem-solving challenges. Computer Science, including Data Structures and Algorithms (DSA), is planned as a future expansion.",
  },
  {
    index: "04",
    q: "Is Two5 only for programmers or maths enthusiasts?",
    a: "Not at all. Two5 is intended for anyone who enjoys solving a good problem, spotting patterns or testing their thinking. You don't need to be a programmer or a maths expert to get started.",
  },
  {
    index: "05",
    q: "Can I challenge my friends?",
    a: "Friend challenges and score comparisons are central to the Two5 vision. The goal is to let you take on a problem and give your friends a chance to beat your score. These features are still planned and aren't being presented as live multiplayer functionality.",
  },
  {
    index: "06",
    q: "Will Two5 have daily challenges and leaderboards?",
    a: "Daily challenges and competitive features are part of the planned experience. The goal is to give players fresh problems to solve, personal milestones to pursue and ways to compare their performance. Availability will be confirmed as the product develops.",
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
    <section id="faq" className="border-t border-line bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-6 lg:px-8 lg:pt-28">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink/40 uppercase">
          03 / FAQ
        </p>
        <h2 className="mt-4 max-w-xl text-4xl leading-[0.94] font-semibold tracking-tight sm:text-6xl">
          Frequently asked questions.
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20 lg:px-8 lg:pb-28">
        <div>
          {questions.map((item, index) => {
            const selected = index === open;

            return (
              <div key={item.index} className="border-t border-ink/10">
                <button
                  type="button"
                  aria-expanded={selected}
                  onClick={() => setOpen(index)}
                  className="flex w-full items-baseline gap-4 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.18em]",
                      selected ? "text-ember" : "text-ink/35",
                    )}
                  >
                    {item.index}
                  </span>
                  <span
                    className={cn(
                      "text-xl leading-snug font-semibold tracking-tight sm:text-2xl",
                      selected ? "text-ink" : "text-ink/45",
                    )}
                  >
                    {item.q}
                  </span>
                </button>
                {selected ? (
                  <p className="pb-6 pl-9 text-base leading-7 text-ink/65 lg:hidden">
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
            <h3 className="mt-4 text-4xl leading-[0.95] font-semibold tracking-tight">
              {current.q}
            </h3>
            <p className="mt-6 max-w-lg text-lg leading-8 text-ink/65">{current.a}</p>
            <Link
              href="#waitlist"
              onClick={() => track("waitlist_cta_click", { source: "faq" })}
              className="mt-10 inline-flex h-12 items-center bg-ink px-5 text-base font-medium text-paper"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 lg:hidden">
        <Link
          href="#waitlist"
          onClick={() => track("waitlist_cta_click", { source: "faq" })}
          className="inline-flex h-12 items-center bg-ink px-5 text-base font-medium text-paper"
        >
          Join the waitlist
        </Link>
      </div>
    </section>
  );
}
