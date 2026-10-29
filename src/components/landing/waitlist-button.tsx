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
  const customBackground = className?.includes("bg-");

  return (
    <button
      type="button"
      data-waitlist-trigger
      data-waitlist-source={source}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-[13px] font-semibold transition-[background-color,color] duration-700 hover:brightness-110",
        className,
      )}
      style={
        customBackground
          ? undefined
          : {
              backgroundColor: "var(--two5-wash, #22C55E)",
              color: "var(--two5-wash-ink, #050505)",
            }
      }
    >
      {children}
    </button>
  );
}
