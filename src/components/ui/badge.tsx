import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-raised px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-muted",
        className,
      )}
      {...props}
    />
  );
}
