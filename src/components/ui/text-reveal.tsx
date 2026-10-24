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

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "flex min-h-svh w-full flex-col justify-center px-5 py-16 pb-28 sm:px-8 lg:px-12",
          className,
        )}
        {...props}
      >
        {lead}
        <p className="w-full text-[clamp(1.2rem,2.6vw,3.15rem)] leading-[1.08] font-semibold tracking-tight text-ember">
          {children}
        </p>
        {trail}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={cn("relative z-0 h-[200vh]", className)}
      {...props}
    >
      <div className="sticky top-0 flex h-svh w-full flex-col justify-center overflow-hidden px-5 pt-8 pb-28 sm:px-8 lg:px-12 lg:pt-12">
        {lead}
        <p className="flex w-full flex-wrap text-[clamp(1.2rem,2.6vw,3.15rem)] leading-[1.08] font-semibold tracking-tight text-ember/30">
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
