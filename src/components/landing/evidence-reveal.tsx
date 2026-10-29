"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { researchSources } from "@/content/launch";

const paragraphs = [
  "Two5 aims to make mental practice more structured, measurable, and engaging. Its challenges will be designed around specific task demands, with feedback that helps players read their results.",
  "Research on cognitive training suggests improvements can occur in trained skills and some related domains, but effects vary. A better score on a game does not automatically mean a broader change in everyday ability.",
];

const lines = paragraphs.map((paragraph) => paragraph.split(/\s+/));

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
        word.style.color = "#d82010";
      });
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
          <Copy>
            {lines.map((line, lineIndex) => (
              <p key={lineIndex}>
                {line.map((word, index) => (
                  <span key={`${lineIndex}-${index}`}>{word} </span>
                ))}
              </p>
            ))}
          </Copy>
          <Notes />
        </div>
      ) : (
        <div ref={trackRef} className="relative h-[210vh] sm:h-[250vh]">
          <div className="sticky top-0 flex h-svh flex-col justify-center px-5 pt-10 pb-28 sm:px-8 lg:px-14">
            <Copy>
              {lines.map((line, lineIndex) => (
                <p key={lineIndex}>
                  {line.map((word, index) => (
                    <span key={`${lineIndex}-${index}`} data-word className="opacity-20 blur-[10px]">
                      {word}{" "}
                    </span>
                  ))}
                </p>
              ))}
            </Copy>
            <Notes />
          </div>
        </div>
      )}
    </section>
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
        <TrackedLink href="/roadmap#research" source="home-evidence" className="font-medium text-ember">
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
