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
          width={40}
          height={40}
          priority={priority}
          className="size-8 rounded-lg object-cover"
        />
        <span className="font-display text-2xl leading-none tracking-[0.06em]">TWO5</span>
      </span>
    );
  }

  return (
    <Image
      src="/brand/logo-mark.png"
      alt="Two5"
      width={512}
      height={512}
      priority={priority}
      className={cn("size-8 rounded-lg object-cover", className)}
    />
  );
}
