import Image from "next/image";

const modes = [
  {
    title: "Train",
    chip: "Play",
    chipClass: "bg-[#22C55E] text-black",
    image: "/hero/sticker-maths.png",
    alt: "Green pi sticker",
    line: "Jump into a short challenge.",
    tilt: "-rotate-2",
  },
  {
    title: "Track",
    chip: "Score",
    chipClass: "bg-[#f0c020] text-black",
    image: "/hero/sticker-memory.png",
    alt: "Yellow tile sticker",
    line: "Keep the score. Beat your best.",
    tilt: "rotate-1",
  },
  {
    title: "Compete",
    chip: "Later",
    chipClass: "bg-[#d82010] text-[#F4F1E8]",
    image: "/hero/sticker-die.png",
    alt: "Red die sticker",
    line: "Take on someone else, when duels open.",
    tilt: "rotate-2",
  },
] as const;

export function Positioning() {
  return (
    <section aria-labelledby="position-title" className="bg-black text-[#F4F1E8]">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 lg:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm tracking-[0.14em] text-[#22C55E] uppercase">Your move</p>
          <h2 id="position-title" className="section-heading mt-3">
            Don&apos;t just play. <span className="text-[#f0c020]">Train with purpose.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-white/55">A round. A score. Another shot at your best.</p>
        </header>

        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-6 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-2">
          {modes.map((mode) => (
            <li
              key={mode.title}
              className={`w-[78%] shrink-0 snap-center overflow-hidden rounded-[1.75rem] bg-[#f4f1e8] text-black shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] motion-safe:transition-transform motion-safe:duration-300 hover:rotate-0 sm:w-auto ${mode.tilt}`}
            >
              <div className="relative grid h-52 place-items-center bg-[#111] sm:h-56">
                <Image
                  src={mode.image}
                  alt={mode.alt}
                  width={320}
                  height={320}
                  className="size-36 sm:size-40"
                />
                <span
                  className={`absolute top-3 right-3 rounded-full px-2.5 py-1 font-display text-[11px] tracking-[0.08em] uppercase ${mode.chipClass}`}
                >
                  {mode.chip}
                </span>
              </div>
              <div className="px-5 py-5">
                <h3 className="font-display text-4xl leading-none tracking-[0.02em]">{mode.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/60">{mode.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
