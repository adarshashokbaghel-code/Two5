import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** mark = square icon; word = full lockup using the mark */
  variant?: "mark" | "word";
};

export function BrandLogo({ className, priority, variant = "mark" }: BrandLogoProps) {
  if (variant === "word") {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        <Image
          src="/brand/logo-mark.png"
          alt=""
          width={1600}
          height={867}
          priority={priority}
          className="h-8 w-auto"
        />
        <span className="font-display text-2xl leading-none tracking-[0.06em]">TWO5</span>
      </span>
    );
  }

  return (
    <Image
      src="/brand/logo-mark.png"
      alt="Two5"
      width={1600}
      height={867}
      priority={priority}
      className={cn("h-8 w-auto", className)}
    />
  );
}
