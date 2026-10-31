"use client";

import { useState } from "react";

import { track } from "@/lib/analytics";
import type { SeoChallenge } from "@/content/seo/types";

export function AnswerReveal({ challenge, source }: { challenge: SeoChallenge; source: string }) {
  const [hint, setHint] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 border border-ink/10 bg-white p-5">
      <p className="font-mono text-[11px] tracking-[0.14em] text-volt uppercase">{challenge.difficulty}</p>
      <p className="mt-3 font-display text-2xl leading-tight">{challenge.prompt}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex h-10 items-center border border-ink/15 px-4 text-sm font-medium"
          onClick={() => setHint(true)}
        >
          Show a hint
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center bg-ink px-4 text-sm font-medium text-paper"
          onClick={() => {
            setOpen(true);
            track("reveal_answer", { source });
          }}
        >
          Show the solution
        </button>
      </div>
      {hint ? <p className="mt-4 text-sm leading-6 text-ink/70">{challenge.hint}</p> : null}
      {open ? (
        <div className="mt-5 border-t border-ink/10 pt-4">
          <p className="text-base leading-7 text-ink">
            <span className="font-medium">Answer. </span>
            {challenge.answer}
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink/75">
            {challenge.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {challenge.alternatives?.map((item) => (
            <p key={item} className="mt-3 text-sm leading-6 text-ink/75">
              {item}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
