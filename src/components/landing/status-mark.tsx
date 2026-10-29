import type { StageStatus } from "@/content/launch";
import { cn } from "@/lib/utils";

const tone: Record<StageStatus, string> = {
  OPEN: "border-signal/40 text-signal",
  ACTIVE: "border-signal/40 text-signal",
  COMPLETE: "border-white/15 text-white/55",
  UPCOMING: "border-white/10 text-white/40",
  PLANNED: "border-white/10 text-white/40",
};

export function StatusMark({ status }: { status: StageStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em]",
        tone[status],
      )}
    >
      {status}
    </span>
  );
}
