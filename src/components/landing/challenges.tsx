"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { mvpCategoryCount, two5Categories, type Two5Category } from "@/content/categories";
import { HeroPhone, type PhoneLineupItem } from "@/components/landing/hero-phone";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const phoneLineup: PhoneLineupItem[] = two5Categories.map((item) => ({
  title: item.title,
  tag: item.lineupTag,
  accent: item.accent,
  live: item.live,
  thumb: item.thumb,
}));

function CategoryCopy({ category }: { category: Two5Category }) {
  return (
    <div className="relative flex flex-col justify-center text-left">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-0 opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${category.accent}33 1px, transparent 1px),
            linear-gradient(to bottom, ${category.accent}33 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px, 28px 28px, 7px 7px, 7px 7px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 35% 40%, black 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 35% 40%, black 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
        }}
      />

      <div className="relative z-[1]">
        <p className="font-display text-sm tracking-[0.12em] uppercase" style={{ color: category.accent }}>
          {category.statusLabel} · {category.index}
        </p>
        <h3 className="mt-2 font-display text-5xl leading-[0.92] tracking-[0.02em] sm:text-6xl xl:text-[4.25rem]">
          {category.title}
        </h3>
        <p className="mt-4 max-w-md text-lg leading-snug text-white/65">{category.summary}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">{category.why}</p>

        <div className="mt-8">
          <Link
            href="#waitlist"
            onClick={() => track("waitlist_cta_click", { source: "challenges" })}
            className="inline-flex h-11 items-center justify-center rounded-[4px] px-6 text-sm font-semibold"
            style={{ backgroundColor: category.accent, color: category.ink }}
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}

function ShowcasePanel({
  category,
  activeIndex,
  direction,
  onPick,
}: {
  category: Two5Category;
  activeIndex: number;
  direction: 1 | -1;
  onPick: (index: number) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
      {/* Theme smoke / fog — shifts with active category */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {two5Categories.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              className="absolute top-[18%] left-[52%] h-[28rem] w-[36rem] -translate-x-1/2 rounded-full blur-[130px]"
              style={{ backgroundColor: `${item.accent}24` }}
            />
            <div
              className="absolute right-[8%] bottom-[12%] h-[22rem] w-[28rem] rounded-full blur-[110px]"
              style={{ backgroundColor: `${item.accent}18` }}
            />
            <div
              className="absolute top-1/2 left-[38%] h-[18rem] w-[20rem] -translate-y-1/2 rounded-full blur-[90px]"
              style={{ backgroundColor: `${item.accent}12` }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-[4] mx-auto flex w-full max-w-[920px] items-center justify-center gap-10 px-5 sm:px-8 lg:gap-16 xl:gap-20">
        <div className="shrink-0 [perspective:900px]">
          <div className="w-[13.5rem] origin-center sm:w-[14.5rem] lg:w-[15.5rem] [transform:rotateY(-8deg)_rotateX(3deg)_rotateZ(-1.5deg)] motion-reduce:[transform:none]">
            <HeroPhone
              size="arena"
              className="w-full shadow-[0_28px_56px_-24px_rgba(0,0,0,0.85)]"
              intervalMs={0}
              background="#0a0a0a"
              lineup={phoneLineup}
              lineupActive={activeIndex}
              onLineupPick={onPick}
            />
          </div>
        </div>

        <div className="relative min-h-[22rem] w-full max-w-md overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={category.id}
              custom={direction}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: direction > 0 ? 56 : -56, filter: "blur(6px)" }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: direction > 0 ? -40 : 40, filter: "blur(6px)" }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <CategoryCopy category={category} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MobileModeCarousel() {
  return (
    <div className="mt-8 lg:hidden">
      <p className="mb-3 font-display text-sm tracking-[0.12em] text-white/40 uppercase">Swipe categories →</p>
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {two5Categories.map((item, index) => (
            <article
              key={item.id}
              className="relative flex w-[min(92vw,22rem)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background: `radial-gradient(ellipse 90% 70% at 50% 100%, ${item.accent}22, transparent 70%)`,
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, ${item.accent}28 1px, transparent 1px),
                    linear-gradient(to bottom, ${item.accent}28 1px, transparent 1px),
                    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px, 24px 24px, 6px 6px, 6px 6px",
                  maskImage:
                    "radial-gradient(ellipse 85% 75% at 50% 70%, black 0%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 85% 75% at 50% 70%, black 0%, transparent 80%)",
                }}
              />
              <div className="relative px-3 pt-3 pb-1">
                <div className="mx-auto w-[13.5rem]">
                  <HeroPhone
                    size="stage"
                    className="w-full"
                    intervalMs={0}
                    background="#0a0a0a"
                    lineup={phoneLineup}
                    lineupActive={index}
                  />
                </div>
              </div>

              <div className="relative flex flex-1 flex-col border-t border-white/10 px-4 pt-3 pb-4">
                <p className="font-display text-sm uppercase tracking-wider" style={{ color: item.accent }}>
                  {item.statusLabel} · {item.index}
                </p>
                <h3 className="mt-1 font-display text-4xl leading-none">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/55">{item.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/35">{item.why}</p>

                <div className="mt-5">
                  <Link
                    href="#waitlist"
                    onClick={() => track("waitlist_cta_click", { source: "challenges-mobile" })}
                    className="inline-flex h-10 w-full items-center justify-center rounded-[4px] text-sm font-semibold"
                    style={{ backgroundColor: item.accent, color: item.ink }}
                  >
                    Join the waitlist
                  </Link>
                </div>
              </div>
            </article>
        ))}
      </div>
    </div>
  );
}

function readActiveFromSteps(steps: HTMLDivElement[]) {
  if (steps.length === 0) return 0;
  const anchor = window.innerHeight * 0.42;
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  steps.forEach((step, index) => {
    const rect = step.getBoundingClientRect();
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - anchor);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });

  return best;
}

export function Challenges() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollLockUntil = useRef(0);
  const activeRef = useRef(0);
  const lenis = useLenis();

  const setActiveWithDirection = useCallback((next: number) => {
    setActive((current) => {
      if (current === next) return current;
      setDirection(next > current ? 1 : -1);
      activeRef.current = next;
      return next;
    });
  }, []);

  const jumpTo = useCallback(
    (index: number) => {
      const target = stepRefs.current[index];
      if (!target) return;

      scrollLockUntil.current = Date.now() + 1400;
      setActiveWithDirection(index);

      if (lenis) {
        const centerOffset = -Math.round(window.innerHeight * 0.42);
        lenis.scrollTo(target, {
          offset: centerOffset,
          duration: 1.05,
          easing: (t) => 1 - (1 - t) ** 3,
          lock: true,
          onComplete: () => {
            scrollLockUntil.current = Date.now() + 120;
          },
        });
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [lenis, setActiveWithDirection],
  );

  const syncActiveFromScroll = useCallback(() => {
    if (Date.now() < scrollLockUntil.current) return;
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (steps.length === 0) return;

    const track = trackRef.current;
    if (track) {
      const trackTop = track.getBoundingClientRect().top;
      const trackBottom = track.getBoundingClientRect().bottom;
      if (trackBottom < window.innerHeight * 0.2 || trackTop > window.innerHeight) return;
    }

    const next = readActiveFromSteps(steps);
    if (next !== activeRef.current) setActiveWithDirection(next);
  }, [setActiveWithDirection]);

  useLenis(() => {
    syncActiveFromScroll();
  }, [syncActiveFromScroll]);

  useEffect(() => {
    syncActiveFromScroll();
    window.addEventListener("resize", syncActiveFromScroll);
    return () => window.removeEventListener("resize", syncActiveFromScroll);
  }, [syncActiveFromScroll]);

  const category = two5Categories[active];

  return (
    <section id="challenges" className="border-t border-white/10 bg-black text-[#F4F1E8]">
      <div className="mx-auto max-w-6xl px-5 pt-16 text-center sm:px-8 lg:pt-24">
        <p className="font-display text-sm tracking-[0.22em] text-white/40 uppercase">02 · Categories</p>
        <h2 className="section-heading mt-4">
          The first <span className="text-green-500">four</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
          Two5 — Numbers and Logic ship first ({mvpCategoryCount} MVP). Computer Science and Memory & Visual follow as
          the next expansion. Scroll to browse.
        </p>
        <MobileModeCarousel />
      </div>

      <div ref={trackRef} className="relative hidden lg:block">
        <div className="sticky top-0 z-10 h-svh">
          <ShowcasePanel
            category={category}
            activeIndex={active}
            direction={direction}
            onPick={jumpTo}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-[3] flex flex-col items-center gap-2">
            <p className="font-display text-sm tracking-[0.16em] text-white/35 uppercase">Scroll categories</p>
            <div className="pointer-events-auto flex items-center gap-2">
              {two5Categories.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  onClick={() => jumpTo(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === active ? "w-10 bg-green-500" : "w-2 bg-white/25 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {two5Categories.map((item, index) => (
          <div
            key={item.id}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
            className="h-[100vh]"
            aria-hidden="true"
          />
        ))}
        <div className="h-[30vh]" aria-hidden="true" />
      </div>
    </section>
  );
}
