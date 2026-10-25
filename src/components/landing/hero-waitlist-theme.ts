export type WaitlistTheme = "light" | "dark";

export function waitlistTheme(theme: WaitlistTheme) {
  if (theme === "light") {
    return {
      stepOn: "rounded-md border border-signal bg-signal/20 px-2 py-2 text-center",
      stepDone: "rounded-md border border-ink/10 bg-ink/[0.03] px-2 py-2 text-center",
      stepIdle: "rounded-md border border-ink/10 bg-transparent px-2 py-2 text-center",
      stepIndexOn: "font-mono text-[10px] tracking-[0.12em] text-ink/50 uppercase",
      stepIndexOff: "font-mono text-[10px] tracking-[0.12em] text-ink/35 uppercase",
      stepLabelOn: "mt-0.5 text-xs font-semibold text-ink",
      stepLabelDone: "mt-0.5 text-xs font-semibold text-ink/70",
      stepLabelIdle: "mt-0.5 text-xs font-semibold text-ink/35",
      heading: "text-ink",
      body: "text-ink/65",
      label: "font-mono text-[10px] tracking-[0.16em] text-ink/50 uppercase",
      input:
        "mt-1 h-11 w-full rounded-md border border-ink/12 bg-white px-3 text-[15px] text-ink outline-none placeholder:text-ink/35 focus-visible:border-volt focus-visible:ring-2 focus-visible:ring-volt/20",
      codeInput:
        "h-11 w-full min-w-0 rounded-md border border-ink/15 bg-white px-0 text-center font-mono text-base text-ink outline-none focus-visible:border-volt focus-visible:ring-2 focus-visible:ring-volt/25",
      link: "font-medium text-ink/55 underline-offset-4 hover:text-ink hover:underline",
      notice: "text-ink/65",
    } as const;
  }

  return {
    stepOn: "rounded-md border border-signal/40 bg-signal/10 px-2 py-2 text-center",
    stepDone: "rounded-md border border-white/10 bg-white/[0.04] px-2 py-2 text-center",
    stepIdle: "rounded-md border border-white/10 bg-transparent px-2 py-2 text-center",
    stepIndexOn: "font-mono text-[10px] tracking-[0.12em] text-signal uppercase",
    stepIndexOff: "font-mono text-[10px] tracking-[0.12em] text-paper/35 uppercase",
    stepLabelOn: "mt-0.5 text-xs font-semibold text-paper",
    stepLabelDone: "mt-0.5 text-xs font-semibold text-paper/80",
    stepLabelIdle: "mt-0.5 text-xs font-semibold text-paper/35",
    heading: "text-paper",
    body: "text-paper/70",
    label: "font-mono text-[10px] tracking-[0.16em] text-paper/50 uppercase",
    input:
      "mt-1.5 h-12 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-base text-paper outline-none placeholder:text-paper/35 focus-visible:border-signal",
    codeInput:
      "h-11 w-full min-w-0 rounded-lg border border-white/15 bg-white/5 px-0 text-center font-mono text-base text-paper outline-none focus-visible:border-signal",
    link: "font-medium text-paper/60 underline-offset-4 hover:text-paper hover:underline",
    notice: "text-paper/70",
  } as const;
}
