import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Button = ({ className, ...props }: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "cursor-pointer inline-flex items-center justify-center rounded-md text-sm transition-all outline-none focus-visible:ring-[3px] [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
};
