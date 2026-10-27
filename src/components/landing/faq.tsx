
"use client";

import Link from "next/link";
import { useState } from "react";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const questions = [
  {
    index: "01",
    q: "What is Two5?",
    a: "Two5 is a competitive mental game for short rounds. You train on a challenge, see a score, and try to beat your personal best. Competition sits around that, not instead of it. The product is still in development.",
  },
  {
    index: "02",
    q: "Is Two5 a brain-training app or a game?",
    a: "It is a game you can train with. Rounds are short. There are no courses and no claim that Two5 raises IQ or guarantees a cognitive improvement.",
  },
  {
    index: "03",
    q: "What is Daily 5?",
    a: "Daily 5 is a planned short mix of challenges for a quick daily workout. It is not available yet. Focus Session and Quick Play are the other planned ways to play: one to chase a personal score, one to jump straight into a game.",
  },
  {
    index: "04",
    q: "Which categories are available at launch?",
    a: "Numbers and Logic are the launch categories. Computer Science and Memory & Visual are coming later and are not playable yet.",
  },
  {
    index: "05",
    q: "Can I challenge my friends?",
    a: "Friend challenges are part of the plan. You will be able to compare a result on the same game. That mode is not open yet.",
  },
  {
    index: "06",
    q: "Is Two5 free?",
    a: "Pricing is not set. Nothing is for sale on this site. Join the waitlist and we will say what is free, and what is not, before launch.",
  },
  {
    index: "07",
    q: "When will Two5 launch?",
    a: "There is no public launch date. Join the waitlist to hear when early access opens. You cannot play a round on this website yet.",
  },
  {
    index: "08",
    q: "How do I join the waitlist?",
    a: "Use Join the waitlist on this page, enter your email, and submit. A confirmation means the signup went through. We will write when there is something to say about early access.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState(0);
  const current = questions[open];

  return (
    <section id="faq" className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-6 lg:px-8 lg:pt-28">
        <p className="font-mono text-[11px] tracking-[0.22em] text-white/40 uppercase">
          Before you train
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
