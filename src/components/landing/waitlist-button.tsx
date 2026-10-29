import { cn } from "@/lib/utils";

export function WaitlistButton({
  source,
  children,
  className,
}: {
  source: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-waitlist-trigger
      data-waitlist-source={source}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full bg-[#22C55E] px-5 text-[13px] font-semibold text-black transition hover:brightness-110",
        className,
      )}
    >
      {children}
    </button>
  );
}
