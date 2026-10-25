"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { useMotionValue } from "motion/react";

import { LogoOpen } from "@/components/landing/logo-open";

type HeroReelProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

const VIDEO_W = 1920;
const VIDEO_H = 1080;
const CLOUD_RATE = 2.15;
// The note lying on the path, measured in the hero frame.
const PAPER = { x: 1006, y: 671, w: 177, h: 85 };
const PAPER_ANGLE = 13;

const RIVALS = [
  {
    id: "chess",
    name: "chess.com",
    word: "",
    stats: [
      { label: "Clock", value: "41:08" },
      { label: "Rating", value: "+3", accent: true },
      { label: "Moves", value: "62" },
      { label: "Acc", value: "71" },
    ],
  },
  {
    id: "matiks",
    name: "Matiks",
    word: "Matiks",
    stats: [
      { label: "Timer", value: "0:45" },
      { label: "Score", value: "120", accent: true },
      { label: "Streak", value: "4" },
      { label: "Rank", value: "84" },
    ],
  },
  {
    id: "brilliant",
    name: "Brilliant",
    word: "Brilliant",
    stats: [
      { label: "Lesson", value: "14:02" },
      { label: "Streak", value: "2", accent: true },
      { label: "Level", value: "6" },
      { label: "Done", value: "1/5" },
    ],
  },
  {
    id: "elevate",
    name: "Elevate",
    word: "Elevate",
    stats: [
      { label: "Session", value: "5:00" },
      { label: "Score", value: "890", accent: true },
      { label: "Games", value: "6" },
      { label: "Best", value: "1.2k" },
    ],
  },
] as const;

const LINES = [
  { text: "Things are going to change.", tone: "paper" },
  { text: "The hour you gave that site is over.", tone: "signal" },
  { text: "Forty minutes. Three rating points.", tone: "paper" },
  { text: "A clock, and not much else.", tone: "ember" },
  { text: "Numbers. Logic. A score you can send.", tone: "paper" },
  { text: "What comes next is faster.", tone: "volt" },
  { text: "And a little less polite about it.", tone: "paper" },
] as const;

const INTRO = "Introducing";

function formatTimecode(seconds: number) {
  const clamped = Math.max(0, seconds);
  const mins = Math.floor(clamped / 60);
  const secs = Math.floor(clamped % 60);
  const frames = Math.floor((clamped % 1) * 24);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function HeroReel({ sectionRef }: HeroReelProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const film = useMotionValue(0);
  const filmMv = useRef(film);
  filmMv.current = film;
  const timeRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const ghostDoneRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const ghostRestRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const caretRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const introRef = useRef<HTMLSpanElement>(null);
  const introDoneRef = useRef<HTMLSpanElement>(null);
  const introRestRef = useRef<HTMLSpanElement>(null);
  const introCaretRef = useRef<HTMLSpanElement>(null);
  const rivalRefs = useRef<Array<HTMLDivElement | null>>([]);
  const screenRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const media = mediaRef.current;
    const card = cardRef.current;
    const video = videoRef.current;
    const mark = markRef.current;
    if (!section || !frame || !media || !card || !video || !mark) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reelMode = new URLSearchParams(window.location.search).get("reel");
    const forceLock = reelMode === "lock";
    const forceCard = reelMode === "card";
    const forceType = reelMode === "type";
    const forceMark = reelMode === "mark";
    const forceRivals = reelMode === "rivals";
    const forceChess = reelMode === "chess";
    const forceRise = reelMode === "rise";
    const forceIntro = reelMode === "intro";
    let raf = 0;

    const durationLabel = document.querySelector<HTMLElement>(
      "[data-reel-duration]",
    );

    let cardEase = 0;
    let typeP = 0;
    let introP = 0;
    let frameAmt = 0;
    let markAmt = 0;
    let filmP = 0;
    let plateAmt = 0;

    const gateBox = () => {
      const cw = frame.clientWidth;
      const ch = frame.clientHeight;
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const pad = wide ? 1.75 * root : 0;
      const foot = wide ? 6 * root : 0;
      return {
        cw,
        ch,
        left: pad,
        top: pad,
        width: Math.max(0, cw - pad * 2),
        height: Math.max(0, ch - pad - foot),
        radius: (wide ? 0.5 : 0) * root,
      };
    };

    const placeCard = () => {
      const cw = frame.clientWidth;
      const ch = frame.clientHeight;
      if (!cw || !ch) return;
      const scale = Math.max(cw / VIDEO_W, ch / VIDEO_H);
      const ox = (cw - VIDEO_W * scale) / 2;
      const oy = (ch - VIDEO_H * scale) / 2;
      const width = PAPER.w * scale;
      const height = PAPER.h * scale;
      const cx = ox + (PAPER.x + PAPER.w / 2) * scale;
      const cy = oy + (PAPER.y + PAPER.h / 2) * scale;
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const wide = cw >= 1024;
      const pad = (wide ? 1.75 : 0.75) * root;
      const foot = (wide ? 4.25 + 1.75 : 0.75) * root;
      const gw = Math.max(width, cw - pad * 2);
      const gh = Math.max(height, ch - pad - foot);
      const gx = pad + gw / 2;
      const gy = pad + gh / 2;
      const w = width + (gw - width) * cardEase;
      const h = height + (gh - height) * cardEase;
      const x = cx + (gx - cx) * cardEase;
      const y = cy + (gy - cy) * cardEase;
      const angle = PAPER_ANGLE * (1 - cardEase);
      const font = wide
        ? Math.min(w * 0.064, h * 0.2)
        : Math.min(w * 0.145, h * 0.105, 54);
      const radius = 6 + (0.5 * root - 6) * cardEase;
      card.style.left = "0px";
      card.style.top = "0px";
      card.style.width = `${w}px`;
      card.style.height = `${h}px`;
      card.style.fontSize = `${font}px`;
      card.style.borderRadius = `${radius}px`;
      card.style.transformOrigin = "0 0";
      card.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) translate(-50%, -50%)`;
    };

    const placeStage = () => {
      const box = gateBox();
      if (!box.cw || !box.ch) return;
      const s = frameAmt;
      media.style.right = "auto";
      media.style.bottom = "auto";
      media.style.left = `${box.left * s}px`;
      media.style.top = `${box.top * s}px`;
      media.style.width = `${box.cw + (box.width - box.cw) * s}px`;
      media.style.height = `${box.ch + (box.height - box.ch) * s}px`;
      media.style.borderRadius = `${box.radius * s}px`;
      media.style.boxShadow =
        s > 0.02 ? `0 ${Math.round(22 * s)}px ${Math.round(64 * s)}px rgba(0,0,0,${(0.34 * s).toFixed(3)})` : "none";
      mark.style.left = `${box.left}px`;
      mark.style.top = `${box.top}px`;
      mark.style.width = `${box.width}px`;
      mark.style.height = `${box.height}px`;
      mark.style.borderRadius = `${box.radius}px`;
      const slide = (1 - plateAmt) * Math.min(180, box.width * 0.22);
      mark.style.transform = `translate3d(${slide.toFixed(1)}px, 0, 0)`;
      mark.style.filter = `blur(${((1 - plateAmt) * 18).toFixed(2)}px)`;
    };

    const writeHud = (scrolled: number, total: number) => {
      const vh = window.innerHeight;
      // Note, then the typed lines, then "Introducing" types the same way.
      // The next scroll is the logo film itself: down runs it forward, up runs it back.
      const growEnd = vh * 0.72;
      const fullEnd = growEnd + vh * 0.16;
      const rivalStart = fullEnd;
      const rivalEnd = rivalStart + vh * 0.38 * RIVALS.length;
      const typeInEnd = rivalEnd + vh * 0.14;
      const typeEnd = typeInEnd + vh * 0.62;
      const textOutEnd = typeEnd + vh * 0.16;
      const introTypeEnd = textOutEnd + vh * 0.34;
      const introHoldEnd = introTypeEnd + vh * 0.16;
      const introOutEnd = introHoldEnd + vh * 0.16;
      const filmEnd = introOutEnd + vh * 1.05;
      const holdEnd = filmEnd + vh * 0.14;
      let cardT = 1;
      let intoBlack = 0;
      let opened = 0;
      let film = 0;
      let reelT = 1;
      let rival = 0;
      let typeReveal = 0;
      let textOut = 0;
      let logoOn = 0;
      let introShow = 0;
      let markShow = 0;
      typeP = 0;
      introP = 0;
      plateAmt = 0;
      let ink = 0;
      if (!reduceMotion.matches && !forceLock && total > 0) {
        cardT = Math.min(1, Math.max(0, scrolled / Math.max(1, growEnd)));
        ink = 1 - smoothstep(Math.min(1, Math.max(0, (cardT - 0.08) / 0.4)));
        rival = Math.min(
          RIVALS.length,
          Math.max(0, ((scrolled - rivalStart) / Math.max(1, rivalEnd - rivalStart)) * RIVALS.length),
        );
        typeReveal = smoothstep(
          Math.min(1, Math.max(0, (scrolled - rivalEnd) / Math.max(1, typeInEnd - rivalEnd))),
        );
        typeP = Math.min(1, Math.max(0, (scrolled - typeInEnd) / Math.max(1, typeEnd - typeInEnd)));
        textOut = smoothstep(
          Math.min(1, Math.max(0, (scrolled - typeEnd) / Math.max(1, textOutEnd - typeEnd))),
        );
        introP = Math.min(
          1,
          Math.max(0, (scrolled - textOutEnd) / Math.max(1, introTypeEnd - textOutEnd)),
        );
        logoOn = textOut;
        const introOut = smoothstep(
          Math.min(1, Math.max(0, (scrolled - introHoldEnd) / Math.max(1, introOutEnd - introHoldEnd))),
        );
        introShow = textOut * (1 - introOut);
        markShow = introOut;
        plateAmt = 1;
        film = Math.min(1, Math.max(0, (scrolled - introOutEnd) / Math.max(1, filmEnd - introOutEnd)));
        reelT = Math.min(1, Math.max(0, (scrolled - holdEnd) / Math.max(1, total - holdEnd)));
      }
      if (forceCard && !forceLock) {
        cardT = 1;
        intoBlack = 0;
        typeP = 0;
        opened = 0;
        film = 0;
        reelT = 0;
      }
      if (forceLock) {
        cardT = 1;
        intoBlack = 0;
        typeP = 0;
        opened = 0;
        film = 0;
        reelT = 1;
      }
      if (forceType) {
        cardT = 1;
        intoBlack = 0;
        typeP = 1;
        typeReveal = 1;
        textOut = 0;
        logoOn = 0;
        opened = 0;
        film = 0;
        reelT = 0;
      }
      if (forceMark) {
        cardT = 1;
        intoBlack = 0;
        typeP = 1;
        typeReveal = 1;
        textOut = 1;
        logoOn = 1;
        introShow = 0;
        markShow = 1;
        opened = 0;
        film = 1;
        reelT = 0;
        plateAmt = 1;
      }
      if (forceRivals) {
        cardT = 1;
        intoBlack = 0;
        typeP = 0;
        opened = 0;
        film = 0;
        reelT = 0;
        rival = 1.48;
      }
      if (forceChess) {
        cardT = 1;
        intoBlack = 0;
        typeP = 0;
        opened = 0;
        film = 0;
        reelT = 0;
        rival = 0.48;
      }
      if (forceCard || forceLock || forceType || forceMark || forceRivals || forceChess) {
        ink = 0;
      }
      if (forceIntro) {
        cardT = 1;
        ink = 0;
        typeP = 1;
        introP = 1;
        typeReveal = 1;
        textOut = 1;
        logoOn = 1;
        introShow = 1;
        markShow = 0;
        film = 0;
        reelT = 0;
      }
      if (forceRise) {
        cardT = 0.28;
        ink = 1 - smoothstep(Math.min(1, Math.max(0, (cardT - 0.08) / 0.4)));
        typeP = 0;
        typeReveal = 0;
        textOut = 0;
        logoOn = 0;
        film = 0;
        reelT = 0;
        rival = 0;
      }
      const reel = reelT;
      frameAmt = 0;
      markAmt = 0;
      filmP = film;
      const black = 0;
      const leave = 0;
      const typeOn = typeReveal * (1 - textOut);
      const appear = Math.min(1, cardT / 0.04);
      cardEase = smoothstep(Math.min(1, Math.max(0, (cardT - 0.08) / 0.92)));
      const cutout = 1 - cardEase;
      const rootStyle = document.documentElement.style;
      section.style.setProperty("--reel-p", reel.toFixed(4));
      rootStyle.setProperty("--reel-p", reel.toFixed(4));
      rootStyle.setProperty("--card-in", appear.toFixed(4));
      rootStyle.setProperty("--card", cardEase.toFixed(4));
      rootStyle.setProperty("--sheet", cardEase.toFixed(4));
      rootStyle.setProperty("--leave", leave.toFixed(4));
      rootStyle.setProperty("--black", black.toFixed(4));
      rootStyle.setProperty("--type-on", typeOn.toFixed(4));
      rootStyle.setProperty("--mark", markAmt.toFixed(4));
      rootStyle.setProperty("--wash", opened.toFixed(4));
      rootStyle.setProperty("--cutout", cutout.toFixed(4));
      rootStyle.setProperty("--rival", rival.toFixed(4));
      rootStyle.setProperty("--ink", ink.toFixed(4));
      rootStyle.setProperty("--logo-on", logoOn.toFixed(4));
      rootStyle.setProperty("--intro", introShow.toFixed(4));
      rootStyle.setProperty("--mark-show", markShow.toFixed(4));
      rootStyle.setProperty("--copy-on", ((1 - typeReveal) * (1 - logoOn)).toFixed(4));
      const crisp = window.matchMedia("(max-width: 1023px)").matches;
      const paintRival = (node: HTMLElement | null, index: number) => {
        if (!node) return;
        const local = rival - index;
        let opacity = 0;
        let blur = 20;
        if (local > 0 && local < 1) {
          if (local < 0.34) {
            const t = local / 0.34;
            opacity = t;
            blur = crisp ? 8 * (1 - t) : 2 + 8 * (1 - t);
          } else if (local > 0.66) {
            const t = (local - 0.66) / 0.34;
            opacity = 1 - t;
            blur = crisp ? 8 * t : 2 + 8 * t;
          } else {
            opacity = 1;
            blur = crisp ? 0 : 2;
          }
        }
        node.style.opacity = opacity.toFixed(3);
        node.style.filter = `blur(${blur.toFixed(2)}px)`;
      };
      RIVALS.forEach((_, index) => {
        paintRival(rivalRefs.current[index], index);
        paintRival(screenRefs.current[index], index);
      });
      document.documentElement.dataset.reel =
        reel > 0.78 ? "lock" : reel > 0.46 ? "form" : reel > 0.16 ? "copy" : "out";
      if (barRef.current) barRef.current.style.transform = `scaleX(${reel})`;
    };

    const writeSay = () => {
      const total = LINES.reduce((sum, line) => sum + line.text.length, 0);
      const count =
        typeP <= 0.001 ? 0 : typeP >= 1 ? total : Math.ceil(typeP * total);
      let used = 0;
      LINES.forEach((line, index) => {
        const start = used;
        used += line.text.length;
        const node = lineRefs.current[index];
        const caret = caretRefs.current[index];
        const done = ghostDoneRefs.current[index];
        const rest = ghostRestRefs.current[index];
        const take = Math.max(0, Math.min(line.text.length, count - start));
        const shown = line.text.slice(0, take);
        const ahead = line.text.slice(take);
        if (node && node.textContent !== shown) node.textContent = shown;
        if (done && done.textContent !== shown) done.textContent = shown;
        if (rest && rest.textContent !== ahead) rest.textContent = ahead;
        const active = typeP < 1 && count > start && count <= used;
        if (caret) caret.dataset.on = active ? "1" : "0";
      });
      const introCount =
        introP <= 0.001 ? 0 : introP >= 1 ? INTRO.length : Math.ceil(introP * INTRO.length);
      const introShown = INTRO.slice(0, introCount);
      const introAhead = INTRO.slice(introCount);
      const introNode = introRef.current;
      const introDone = introDoneRef.current;
      const introRest = introRestRef.current;
      const introCaret = introCaretRef.current;
      if (introNode && introNode.textContent !== introShown) introNode.textContent = introShown;
      if (introDone && introDone.textContent !== introShown) introDone.textContent = introShown;
      if (introRest && introRest.textContent !== introAhead) introRest.textContent = introAhead;
      if (introCaret) introCaret.dataset.on = introP > 0.001 && introP < 1 ? "1" : "0";
    };

    const writeTime = () => {
      if (timeRef.current) {
        timeRef.current.textContent = formatTimecode(video.currentTime);
      }
      if (durationLabel && video.duration) {
        durationLabel.textContent = formatTimecode(video.duration);
      }
    };

    const playClouds = () => {
      video.defaultPlaybackRate = CLOUD_RATE;
      video.playbackRate = CLOUD_RATE;
      if (reduceMotion.matches) {
        video.pause();
        return;
      }
      if (video.paused) void video.play().catch(() => {});
    };

    const scrub = () => {
      const total = section.offsetHeight - window.innerHeight;
      const scrolled =
        reduceMotion.matches || total <= 0
          ? total
          : Math.min(total, Math.max(0, -section.getBoundingClientRect().top));
      writeHud(scrolled, total);
      writeSay();
      placeCard();
      placeStage();
      filmMv.current.set(filmP);
    };

    const onFrame = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scrub);
    };

    const onMotion = () => {
      playClouds();
      onFrame();
    };

    video.addEventListener("loadedmetadata", playClouds);
    video.addEventListener("canplay", playClouds);
    video.addEventListener("timeupdate", writeTime);
    window.addEventListener("scroll", onFrame, { passive: true });
    window.addEventListener("resize", onFrame);
    reduceMotion.addEventListener("change", onMotion);

    if (video.readyState >= 1) playClouds();
    writeTime();
    scrub();

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", playClouds);
      video.removeEventListener("canplay", playClouds);
      video.removeEventListener("timeupdate", writeTime);
      window.removeEventListener("scroll", onFrame);
      window.removeEventListener("resize", onFrame);
      reduceMotion.removeEventListener("change", onMotion);
      document.documentElement.style.removeProperty("--reel-p");
      document.documentElement.style.removeProperty("--card");
      document.documentElement.style.removeProperty("--sheet");
      document.documentElement.style.removeProperty("--leave");
      document.documentElement.style.removeProperty("--card-in");
      document.documentElement.style.removeProperty("--black");
      document.documentElement.style.removeProperty("--type-on");
      document.documentElement.style.removeProperty("--mark");
      document.documentElement.style.removeProperty("--wash");
      document.documentElement.style.removeProperty("--cutout");
      document.documentElement.style.removeProperty("--rival");
      document.documentElement.style.removeProperty("--ink");
      document.documentElement.style.removeProperty("--logo-on");
      document.documentElement.style.removeProperty("--intro");
      document.documentElement.style.removeProperty("--mark-show");
      document.documentElement.style.removeProperty("--copy-on");
      delete document.documentElement.dataset.reel;
    };
  }, [sectionRef]);

  return (
    <div
      ref={frameRef}
      className="hero-reel pointer-events-none absolute inset-x-0 top-0 h-[100svh] w-full bg-ink motion-reduce:relative"
      aria-hidden="true"
    >
      <div ref={mediaRef} className="hero-media">
        <video
          ref={videoRef}
          className="reel-plane absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/brand/hero-bg-poster.jpg?v=4"
          width={VIDEO_W}
          height={VIDEO_H}
        >
          <source src="/brand/hero-bg.mp4?v=4" type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <img
          src="/brand/hero-grind-cutout.png?v=2"
          alt=""
          width={1280}
          height={720}
          className="hero-cutout reel-plane absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-[url('/brand/grain.png')] bg-[length:420px] opacity-[0.7] mix-blend-overlay" />
      </div>

      <div className="hero-wash" />

      <div ref={cardRef} className="hero-card absolute top-0 left-0" data-beat="sorry">
        <div className="hero-card-board">
          <div className="hero-card-copy">
            <p className="hero-card-kicker">Previous game</p>
            <p className="hero-card-say">
              Sorry you had to <span className="hero-card-hot">grind</span>
            </p>
            <div className="hero-card-logos">
              {RIVALS.map((item, index) => (
                <div
                  key={item.id}
                  ref={(node) => {
                    rivalRefs.current[index] = node;
                  }}
                  className={`hero-card-logo is-${item.id}`}
                >
                  {item.id === "chess" ? (
                    <img
                      src="/brand/chesscom-logo.svg"
                      alt=""
                      width={1266}
                      height={400}
                      draggable={false}
                    />
                  ) : (
                    <span className="hero-card-lock">
                      <span className="hero-card-badge">{item.word.slice(0, 1)}</span>
                      <span className="hero-card-logo-name">{item.word}</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="hero-card-screens">
              {RIVALS.map((item, index) => (
                <div
                  key={item.id}
                  ref={(node) => {
                    screenRefs.current[index] = node;
                  }}
                  className={`hero-card-screen is-${item.id}`}
                >
                  {item.stats.map((stat) => (
                    <div className="hero-card-pane" key={stat.label}>
                      <span>{stat.label}</span>
                      <strong className={"accent" in stat && stat.accent ? "is-accent" : undefined}>{stat.value}</strong>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="hero-card-type">
            <div className="hero-type-sheet">
              {LINES.map((line, index) => (
                <p key={line.text} className={`hero-type-line is-${line.tone}`}>
                  <span className="hero-type-ghost">
                    <span
                      ref={(node) => {
                        ghostDoneRefs.current[index] = node;
                      }}
                      className="hero-type-ghost-done"
                    />
                    <span
                      ref={(node) => {
                        ghostRestRefs.current[index] = node;
                      }}
                    />
                  </span>
                  <span className="hero-type-live">
                    <span
                      ref={(node) => {
                        lineRefs.current[index] = node;
                      }}
                    />
                    <span
                      ref={(node) => {
                        caretRefs.current[index] = node;
                      }}
                      className="hero-type-caret"
                      data-on="0"
                    />
                  </span>
                </p>
              ))}
            </div>
          </div>
          <div className="hero-card-draw">
            <p className="hero-card-intro">
              <span className="hero-type-line is-paper">
                <span className="hero-type-ghost">
                  <span ref={introDoneRef} className="hero-type-ghost-done" />
                  <span ref={introRestRef} />
                </span>
                <span className="hero-type-live">
                  <span ref={introRef} />
                  <span ref={introCaretRef} className="hero-type-caret" data-on="0" />
                </span>
              </span>
            </p>
            <div className="hero-card-markline">
              <LogoOpen progress={film} />
              <p className="hero-card-gym">
                <span className="hero-card-gym-your">your</span>
                <span className="hero-card-gym-name">
                  Brain&apos;s <em>gym</em>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-card-frame" />

      <div ref={markRef} className="hero-mark">
        <div className="hero-mark-frost" />
        <LogoOpen progress={film} />
      </div>

      <div className="hero-veil absolute inset-0 bg-paper" />

      <div className="hero-chrome absolute inset-x-0 top-0 z-10 hidden items-center justify-between px-5 py-5 font-mono text-[10px] tracking-[0.28em] text-paper/55 uppercase md:px-8">
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

      <div className="hero-progress absolute inset-x-0 top-0 z-10 hidden h-px bg-paper/15">
        <div
          ref={barRef}
          className="h-full origin-left bg-signal"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
