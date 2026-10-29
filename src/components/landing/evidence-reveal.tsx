"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { researchSources } from "@/content/launch";

const before =
  "Two5 turns brain training into a competition worth coming back to. Take on challenges in mathematics, logic, computer science, and reasoning, sharpen your skills, climb the leaderboards, and prove yourself against other players.";
const after =
  "Chase personal bests, protect your position, and come back for the next challenge. No boring repetition — just engaging games that test how you think, reward improvement, and give you something to compete for every day.";

const lines = [before, after].map((paragraph) => paragraph.split(/\s+/));

const beats = [
  { word: "Train.", color: "#d82010", ink: "#F4F1E8" },
  { word: "Compete.", color: "#22C55E", ink: "#050505" },
  { word: "Grow.", color: "#f0c020", ink: "#050505" },
] as const;

export function EvidenceReveal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<() => void>(() => {});
  const reduceMotion = useReducedMotion();

  const onLenis = useCallback(() => {
    paintRef.current();
  }, []);
  useLenis(onLenis);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const track = trackRef.current;
    if (!track) return;
    const words = [...track.querySelectorAll<HTMLElement>("[data-word]")];

    const paint = () => {
      const travel = track.offsetHeight - window.innerHeight;
      const progress =
        travel <= 0 ? 1 : Math.min(1, Math.max(0, -track.getBoundingClientRect().top / travel));
      const typed = progress * words.length;

      words.forEach((word, index) => {
        const local = typed - index;
        if (local >= 1) {
          word.style.filter = "none";
          word.style.opacity = "1";
          word.style.color = "#000";
          return;
        }
        if (local <= 0) {
          word.style.filter = "blur(10px)";
          word.style.opacity = "0.2";
          word.style.color = "#000";
          return;
        }
        word.style.filter = `blur(${((1 - local) * 8).toFixed(2)}px)`;
        word.style.opacity = (0.2 + local * 0.8).toFixed(3);
        word.style.color = "var(--two5-wash-paper, #22C55E)";
      });

      const beat = track.querySelector<HTMLElement>("[data-beat]");
      if (beat) {
        const local = typed - lines[0].length;
        const reveal = Math.min(1, Math.max(0, local / 3));
        beat.style.opacity = (0.2 + reveal * 0.8).toFixed(3);
        beat.style.filter = reveal >= 1 ? "none" : `blur(${((1 - reveal) * 8).toFixed(2)}px)`;
      }
    };

    paintRef.current = paint;
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      paintRef.current = () => {};
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, [reduceMotion]);

  return (
    <section id="evidence" aria-labelledby="evidence-title" className="bg-paper text-ink">
      <h2 id="evidence-title" className="sr-only">
        How Two5 talks about evidence
      </h2>
      {reduceMotion ? (
        <div className="flex min-h-svh flex-col justify-center px-5 py-16 pb-28 sm:px-8 lg:px-14">
          <Statement />
          <Notes />
        </div>
      ) : (
        <>
        <div className="px-5 py-16 pb-28 md:hidden">
          <Statement />
          <Notes />
        </div>
        <div ref={trackRef} className="relative hidden h-[250vh] md:block">
          <div className="sticky top-0 flex h-svh flex-col justify-center overflow-y-auto px-5 pt-16 pb-28 sm:px-8 lg:px-14">
            <Statement animated />
            <Notes />
          </div>
        </div>
        </>
      )}
    </section>
  );
}

function Statement({ animated = false }: { animated?: boolean }) {
  return (
    <Copy>
      <p>
        {lines[0].map((word, index) => (
          <Word key={index} animated={animated}>
            {word}
          </Word>
        ))}
      </p>
      <Beat dim={animated} />
      <p>
        {lines[1].map((word, index) => (
          <Word key={index} animated={animated}>
            {word}
          </Word>
        ))}
      </p>
    </Copy>
  );
}

function Word({ animated, children }: { animated: boolean; children: string }) {
  return (
    <span data-word={animated ? "" : undefined} className={animated ? "text-ink opacity-20 blur-[10px]" : "text-ink"}>
      {children}{" "}
    </span>
  );
}

function Beat({ dim = false }: { dim?: boolean }) {
  return (
    <div data-beat={dim ? "" : undefined} className={dim ? "py-1 opacity-20 blur-[8px]" : "py-1"}>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {beats.map((item) => (
          <span key={item.word} className="relative inline-block px-3 py-1 sm:px-4 sm:py-1.5">
            <span
              aria-hidden="true"
              className="absolute inset-0 -skew-x-12 rounded-[0.15em]"
              style={{ backgroundColor: item.color }}
            />
            <span
              className="relative font-display text-[1.35rem] leading-none tracking-[0.02em] sm:text-[1.85rem]"
              style={{ color: item.ink }}
            >
              {item.word}
            </span>
          </span>
        ))}
      </p>
      <p className="mt-3 max-w-xl text-[clamp(1.05rem,2vw,1.4rem)] leading-snug text-ink">
        Training is how you earn a better position.
      </p>
    </div>
  );
}

function Copy({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 font-display text-[clamp(1.55rem,3vw,2.7rem)] leading-[1.16] font-normal tracking-[0.01em] sm:gap-8">
      {children}
    </div>
  );
}

function Notes() {
  return (
    <div className="mx-auto mt-8 w-full max-w-6xl text-sm leading-6 text-ink/55 sm:mt-10">
      <p className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
        <TrackedLink href="/roadmap#research" source="home-evidence" className="two5-wash-ink font-medium">
          Explore the research behind cognitive training →
        </TrackedLink>
        <Link href="/research" className="underline decoration-ink/25 underline-offset-[3px]">
          Arena research notes
        </Link>
      </p>
      <p className="mt-3 text-xs leading-5 text-ink/45">
        Includes{" "}
        <a href={researchSources[0].href} className="underline decoration-ink/25 underline-offset-[3px]">
          Zhu et al., 2025
        </a>
        . Those papers are not studies of Two5.
      </p>
    </div>
  );
}
