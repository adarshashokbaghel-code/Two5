const words = [
  { word: "Train.", color: "#d82010", ink: "#F4F1E8" },
  { word: "Compete.", color: "#22C55E", ink: "#050505" },
  { word: "Grow.", color: "#f0c020", ink: "#050505" },
] as const;

export function SlantLine() {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 px-4 py-10 sm:gap-x-5 sm:py-14">
      {words.map((item) => (
        <span key={item.word} className="relative inline-block px-3 py-1 sm:px-4 sm:py-1.5">
          <span
            aria-hidden="true"
            className="absolute inset-0 -skew-x-12 rounded-[0.15em]"
            style={{ backgroundColor: item.color }}
          />
          <span
            className="relative font-display text-[1.65rem] leading-none tracking-[0.02em] sm:text-4xl"
            style={{ color: item.ink }}
          >
            {item.word}
          </span>
        </span>
      ))}
    </p>
  );
}
