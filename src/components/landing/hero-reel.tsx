"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";

type HeroReelProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

function formatTimecode(seconds: number) {
  const clamped = Math.max(0, seconds);
  const mins = Math.floor(clamped / 60);
  const secs = Math.floor(clamped % 60);
  const frames = Math.floor((clamped % 1) * 24);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

export function HeroReel({ sectionRef }: HeroReelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forceLock =
      new URLSearchParams(window.location.search).get("reel") === "lock";
    let raf = 0;

    const durationLabel = document.querySelector<HTMLElement>(
      "[data-reel-duration]",
    );

    const writeHud = (progress: number) => {
      const next = forceLock ? 1 : progress;
      const value = next.toFixed(4);
      section.style.setProperty("--reel-p", value);
      document.documentElement.style.setProperty("--reel-p", value);
      document.documentElement.dataset.reel =
        next > 0.78 ? "lock" : next > 0.46 ? "form" : next > 0.16 ? "copy" : "out";
      if (barRef.current) barRef.current.style.transform = `scaleX(${next})`;
    };

    const writeTime = () => {
      if (timeRef.current) {
        timeRef.current.textContent = formatTimecode(video.currentTime);
      }
      if (durationLabel && video.duration) {
        durationLabel.textContent = formatTimecode(video.duration);
      }
    };

    const playLoop = async () => {
      if (reduceMotion.matches) {
        video.pause();
        return;
      }
      try {
        await video.play();
      } catch {
        /* Autoplay can fail before a gesture; the still frame stays. */
      }
    };

    const scrub = () => {
      const total = section.offsetHeight - window.innerHeight;
      const progress =
        reduceMotion.matches || total <= 0
          ? 1
          : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total));
      writeHud(progress);
    };

    const onFrame = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scrub);
    };

    video.addEventListener("loadedmetadata", playLoop);
    video.addEventListener("timeupdate", writeTime);
    window.addEventListener("scroll", onFrame, { passive: true });
    window.addEventListener("resize", onFrame);
    reduceMotion.addEventListener("change", () => {
      void playLoop();
      onFrame();
    });

    if (video.readyState >= 1) void playLoop();
    if (forceLock) writeHud(1);
    else writeHud(0);
    writeTime();

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", playLoop);
      video.removeEventListener("timeupdate", writeTime);
      window.removeEventListener("scroll", onFrame);
      window.removeEventListener("resize", onFrame);
      document.documentElement.style.removeProperty("--reel-p");
      delete document.documentElement.dataset.reel;
    };
  }, [sectionRef]);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] bg-ink"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="reel-plane absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/brand/hero-bg-poster.jpg"
        width={1920}
        height={1080}
      >
        <source src="/brand/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[url('/brand/grain.png')] bg-[length:420px] opacity-[0.7] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <div className="hero-veil absolute inset-0 bg-paper" />

      <div className="hero-chrome absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 font-mono text-[10px] tracking-[0.28em] text-paper/55 uppercase md:px-8">
        <p className="flex items-center gap-2">
          <span className="live-dot" />
          Two5 reel
        </p>
        <p>
          <span ref={timeRef}>00:00:00</span>
          <span className="text-paper/25">
            {" / "}
            <span data-reel-duration>00:05:00</span>
          </span>
        </p>
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-px bg-paper/15">
        <div
          ref={barRef}
          className="h-full origin-left bg-signal"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
