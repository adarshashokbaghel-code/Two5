"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

const VIEW = { w: 480, h: 270 } as const;

const PIECES = [
  {
    id: "gray",
    fill: "#3a3f46",
    transform: "translate(61.52 28.50) scale(0.4099 0.4081)",
    from: 0.04,
    to: 0.5,
    x: -58,
    y: -40,
    rotate: -8,
    d: "M232.8 326.1C230.0 322.7 206.8 295.7 206.0 295.0C205.7 294.7 195.6 283.0 183.5 269.0C171.5 255.0 157.5 238.8 152.5 233.0C147.5 227.2 133.3 210.8 121.0 196.5C89.1 159.5 79.9 148.8 77.4 146.0C76.2 144.6 70.3 137.8 64.3 130.9C34.5 96.1 19.5 79.0 8.8 67.3L3.0 61.1 L3.0 30.5L3.0 0.0 L228.0 0.0L453.0 0.0 L453.0 18.8L453.0 37.5 L426.7 63.8L400.3 90.2 L286.2 90.1C223.4 90.1 172.0 90.4 172.0 90.7C172.0 91.2 183.5 103.9 199.6 121.0C215.6 138.1 265.3 192.0 282.6 211.0C289.5 218.6 309.3 240.3 311.9 243.2L314.3 246.0 L309.0 251.7C306.0 254.9 299.1 262.2 293.6 268.0C288.0 273.8 273.0 289.9 260.1 303.8C247.2 317.6 236.4 329.0 235.9 329.0C235.5 329.0 234.1 327.7 232.8 326.1Z",
  },
  {
    id: "yellow",
    fill: "#f6c024",
    from: 0,
    to: 0.42,
    x: -18,
    y: 28,
    rotate: -6,
    d: "M49.2 235.8C78.0 198.8 126.1 139.0 126.8 139.1C127.6 139.1 153.4 167.5 153.7 168.7C153.9 169.2 148.1 177.0 141.0 186.2C133.8 195.4 128.0 203.1 128.0 203.4C128.0 203.7 144.2 204.0 164.0 204.0L200.1 204.0 L202.3 201.6C247.0 152.2 263.8 133.2 265.3 130.5C268.8 124.0 264.3 115.9 256.4 114.4C249.3 113.1 247.2 114.3 233.1 128.0L219.6 141.0 L210.1 131.7C198.7 120.8 198.3 119.2 204.4 106.7C210.9 93.2 225.4 81.5 240.6 77.5C276.5 68.2 312.3 97.4 307.8 132.5C306.3 143.7 302.0 150.2 277.9 178.0C265.7 192.0 248.8 211.7 240.2 221.8L224.7 240.0 L135.3 240.0L45.8 240.0 L49.2 235.8Z",
  },
  {
    id: "red",
    fill: "#d92114",
    from: 0.1,
    to: 0.58,
    x: 54,
    y: 24,
    rotate: 6,
    d: "M245.6 228.8C251.0 222.6 258.1 214.5 261.4 210.8L267.3 204.0 L320.4 204.0C379.7 204.0 377.8 204.2 384.7 196.9C394.9 186.1 391.9 168.8 378.7 161.7C374.7 159.6 373.2 159.5 347.9 159.2L321.3 158.9 L320.6 151.3C319.8 141.7 319.8 128.2 320.6 125.2L321.3 122.9 L353.4 123.2C389.5 123.6 391.8 124.0 404.9 131.7C423.1 142.5 432.9 158.7 433.8 179.1C434.7 202.9 422.7 222.6 400.3 233.9C387.9 240.1 389.8 240.0 309.2 240.0L235.8 240.0 L245.6 228.8Z",
  },
  {
    id: "blue",
    fill: "#1561fe",
    from: 0.36,
    to: 0.8,
    x: 24,
    y: -32,
    rotate: 9,
    d: "M320.6 95.8C321.0 85.7 321.4 77.4 321.5 77.2C321.6 77.1 344.3 77.1 371.9 77.2L422.0 77.5 L406.3 95.7L390.5 113.9 L355.2 113.9L319.9 114.0 L320.6 95.8Z",
  },
] as const;

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

function LogoPiece({
  progress,
  piece,
}: {
  progress: MotionValue<number>;
  piece: (typeof PIECES)[number];
}) {
  const reveal = useTransform(progress, (value) => smooth((value - piece.from) / (piece.to - piece.from)));
  const x = useTransform(reveal, (value) => (1 - value) * piece.x);
  const y = useTransform(reveal, (value) => (1 - value) * piece.y);
  const rotate = useTransform(reveal, (value) => (1 - value) * piece.rotate);
  const opacity = useTransform(reveal, (value) => (piece.id === "yellow" ? 0.2 + 0.8 * value : value));
  const shape = (
    <motion.g className="logo-piece" style={{ x, y, rotate, opacity }}>
      <path d={piece.d} fill={piece.fill} />
    </motion.g>
  );
  if ("transform" in piece) {
    return <g transform={piece.transform}>{shape}</g>;
  }
  return shape;
}

export function LogoOpen({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg
      className="hero-mark-logo"
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      role="img"
      aria-label="Two5"
      shapeRendering="geometricPrecision"
    >
      {PIECES.map((piece) => (
        <LogoPiece key={piece.id} progress={progress} piece={piece} />
      ))}
    </svg>
  );
}
