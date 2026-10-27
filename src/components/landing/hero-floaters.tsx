import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const PIECES = [
  { id: "undo", src: "/hero/sticker-undo.png", top: "6%", left: "7%", width: 108, height: 70, rotate: -12, hop: "12px", drift: "3.6s", delay: "0s" },
  { id: "memory", src: "/hero/sticker-memory.png", top: "34%", left: "1.5%", width: 84, height: 72, rotate: 8, hop: "-10px", drift: "4.2s", delay: "-1.1s" },
  { id: "maths", src: "/hero/sticker-maths.png", top: "68%", left: "11%", width: 78, height: 77, rotate: -16, hop: "8px", drift: "3.9s", delay: "-2.4s" },
  { id: "coding", src: "/hero/sticker-coding.png", top: "16%", right: "2%", width: 104, height: 73, rotate: 11, hop: "-14px", drift: "4.5s", delay: "-0.6s" },
  { id: "die", src: "/hero/sticker-die.png", top: "40%", right: "13%", width: 82, height: 72, rotate: -9, hop: "11px", drift: "3.4s", delay: "-1.8s" },
  { id: "logic", src: "/hero/sticker-logic.png", top: "71%", right: "4%", width: 74, height: 80, rotate: 15, hop: "-9px", drift: "4.8s", delay: "-3.2s" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function ease(value: number) {
  return 1 - (1 - value) ** 3;
}

export function HeroFloaters() {
  const layerRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<Array<HTMLDivElement | null>>([]);

  const apply = () => {
    const layer = layerRef.current;
    const track = layer?.closest("section");
    if (!layer || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const distance = track.offsetHeight - window.innerHeight;
    if (distance <= 8) return;

    const progress = clamp(-track.getBoundingClientRect().top / distance, 0, 1);
    const phone = track.querySelector("[data-phone-shell]");
    if (!(phone instanceof HTMLElement)) return;

    const phoneRect = phone.getBoundingClientRect();
    const targetX = phoneRect.left + phoneRect.width / 2;
    const targetY = phoneRect.top + phoneRect.height * 0.34;
    const sink = clamp((progress - 0.72) / 0.28, 0, 1);

    pieceRefs.current.forEach((node, index) => {
      if (!node) return;
      const move = node.firstElementChild;
      if (!(move instanceof HTMLElement)) return;

      const start = index * 0.04;
      const gather = ease(clamp((progress - start) / (0.74 - start), 0, 1));
      const box = node.getBoundingClientRect();
      const dx = (targetX - (box.left + box.width / 2)) * gather;
      const dy = (targetY - (box.top + box.height / 2)) * gather;
      const scale = 1 - gather * 0.82;

      if (progress <= 0.001) {
        move.style.transform = "";
        move.style.opacity = "";
        node.style.animationPlayState = "running";
        return;
      }

      node.style.animationPlayState = "paused";
      move.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
      move.style.opacity = String(1 - sink);
    });
  };

  useLenis(apply);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden lg:block" aria-hidden="true">
      <style>{`
        @keyframes hero-bob {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          42% { transform: translate3d(var(--hop-x), -18px, 0) rotate(2.4deg); }
          58% { transform: translate3d(calc(var(--hop-x) * 1.15), -20px, 0) rotate(2.8deg); }
          78% { transform: translate3d(calc(var(--hop-x) * 0.4), -3px, 0) rotate(0.6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-bob { animation: none !important; }
        }
      `}</style>
      <div className="absolute inset-0">
        {PIECES.map((piece, index) => (
          <div
            key={piece.id}
            ref={(node) => {
              pieceRefs.current[index] = node;
            }}
            className="hero-bob absolute"
            style={{
              top: piece.top,
              left: "left" in piece ? piece.left : undefined,
              right: "right" in piece ? piece.right : undefined,
              width: piece.width,
              height: piece.height,
              ["--hop-x" as string]: piece.hop,
              animation: `hero-bob ${piece.drift} cubic-bezier(0.45, 0.05, 0.55, 0.95) ${piece.delay} infinite`,
            }}
          >
            <div className="h-full w-full will-change-transform">
              <img
                src={piece.src}
                alt=""
                className="h-full w-full object-contain"
                style={{ transform: `rotate(${piece.rotate}deg)` }}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
