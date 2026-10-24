"use client";

import {
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

export type TextRevealProps = ComponentPropsWithoutRef<"div"> & {
  children: string;
  lead?: ReactNode;
  trail?: ReactNode;
};

export function TextReveal({
  children,
  className,
  lead,
  trail,
  ...props
}: TextRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.trim().split(/\s+/);

  const readable = (
    <>
      {lead}
      <p className="w-full font-display text-2xl leading-none font-normal tracking-[0.02em] text-ember sm:text-3xl">
        {children}
      </p>
      {trail}
    </>
  );

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "flex min-h-svh w-full flex-col justify-center px-5 py-16 pb-28 sm:px-8 lg:px-12",
          className,
        )}
        {...props}
      >
        {readable}
      </div>
    );
  }

  return (
    <div className={cn("relative z-0", className)} {...props}>
      <div className="flex w-full flex-col justify-center px-5 py-16 pb-28 sm:px-8 lg:hidden">
        {readable}
      </div>
      <div ref={sectionRef} className="relative hidden h-[200vh] lg:block">
      <div className="sticky top-0 flex h-svh w-full flex-col justify-center overflow-hidden px-5 pt-8 pb-28 sm:px-8 lg:px-12 lg:pt-12">
        {lead}
        <p className="flex w-full flex-wrap font-display text-[clamp(1.6rem,3.2vw,3.75rem)] leading-none font-normal tracking-[0.02em] text-ember/30">
          {words.map((word, index) => {
            const start = index / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={index} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
        {trail}
      </div>
      </div>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [8, 0]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <span className="relative mr-[0.28em] mt-[0.12em]">
      <span className="absolute">{children}</span>
      <motion.span style={{ opacity, filter }} className="text-ember">
        {children}
      </motion.span>
    </span>
  );
}
