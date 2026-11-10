import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Collapses a long list behind a tappable summary on small screens; desktop is unchanged. */
export function MobileCollapse({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="hidden sm:block">{children}</div>
      <details className="group sm:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-md border border-border bg-bg px-3 font-mono text-xs uppercase tracking-wider text-subtle [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 truncate">{label}</span>
          <span className="shrink-0 text-fg group-open:hidden">Show</span>
          <span className="hidden shrink-0 text-fg group-open:inline">Hide</span>
        </summary>
        <div className="pt-3">{children}</div>
      </details>
    </div>
  );
}
