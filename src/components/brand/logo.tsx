import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority }: BrandLogoProps) {
  return (
    <Image
      src="/brand/logo-full.png"
      alt="Two5"
      width={1920}
      height={1040}
      priority={priority}
      className={cn("h-8 w-auto max-w-[5.5rem] object-contain object-left", className)}
    />
  );
}
