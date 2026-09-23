import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import type { LiveItem, SourceId } from "@/lib/live";
import { cn } from "@/lib/utils";

const LABELS: Record<SourceId, string> = {
  x: "X",
  github: "GitHub",
  dafont: "DaFont",
  blog: "Blog",
  youtube: "YouTube",
  flickr: "Flickr",
};

export function FeedList({ items, className }: { items: LiveItem[]; className?: string }) {
  if (!items.length) {
    return (
      <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">
        Live sources are warming up. Open the original profiles in the directory while this refreshes.
      </p>
    );
  }

  return (
    <ul className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group flex gap-4 rounded-lg border border-border bg-surface p-4 transition-colors duration-150 hover:border-line"
          >
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="hidden h-16 w-24 shrink-0 rounded-sm object-cover sm:block"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider text-subtle">
                <span>{LABELS[item.source]}</span>
                {item.date ? (
                  <span>
                    {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                  </span>
                ) : null}
                {item.meta ? <span className="normal-case tracking-normal">{item.meta}</span> : null}
              </p>
              <p className="mt-1 text-pretty text-fg">{item.title}</p>
              {item.body ? <p className="mt-1 line-clamp-2 text-sm text-muted">{item.body}</p> : null}
            </div>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-subtle" />
          </a>
        </li>
      ))}
    </ul>
  );
}
