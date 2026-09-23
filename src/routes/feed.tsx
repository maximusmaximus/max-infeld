import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { ConnectButtons } from "@/components/connect-band";
import { DisplayTitle } from "@/components/display-title";
import { FeedList } from "@/components/feed-list";
import { SocialGrid } from "@/components/social-grid";
import { Button } from "@/components/ui/button";
import { getLiveFeed, type SourceId } from "@/lib/live";
import { displayFontClass, formatCompact, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/feed")({
  loader: () => getLiveFeed(),
  component: FeedPage,
});

const FILTERS: { id: "all" | SourceId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "x", label: "X" },
  { id: "github", label: "GitHub" },
  { id: "dafont", label: "DaFont" },
  { id: "blog", label: "Blog" },
  { id: "youtube", label: "YouTube" },
];

function FeedPage() {
  const initial = Route.useLoaderData();
  const query = useQuery({
    queryKey: ["live-feed"],
    queryFn: () => getLiveFeed(),
    initialData: initial,
    refetchInterval: 120_000,
  });
  const feed = query.data ?? initial;
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const items = useMemo(
    () => (filter === "all" ? feed.posts : feed.posts.filter((p) => p.source === filter)),
    [feed.posts, filter],
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">Live sources</p>
          <h1 className="mt-2 font-display text-3xl tracking-tight">What Max is publishing right now</h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            This page pulls X, GitHub, DaFont, the Xerographer blog, and YouTube on the server when
            you open it — then refreshes in the background. No screenshots of a feed. The sources
            themselves.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => query.refetch()}
          disabled={query.isFetching}
        >
          <RefreshCw className={query.isFetching ? "size-4 animate-spin" : "size-4"} />
          Refresh
        </Button>
      </div>

      {feed.x ? (
        <section className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div
            className="h-28 bg-raised bg-cover bg-center sm:h-36"
            style={{ backgroundImage: "url(/portraits/banner.jpg)" }}
            aria-hidden
          />
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex gap-4">
              <img
                src="/portraits/max.jpg"
                alt=""
            className="-mt-12 size-20 max-w-full rounded-md border border-border object-cover sm:size-24"
              />
              <div>
                <p className={cn("text-2xl tracking-tight", displayFontClass(feed.x.name))}>{feed.x.name}</p>
                <p className="font-mono text-sm text-muted">@{feed.x.handle}</p>
                <p className="mt-2 max-w-lg whitespace-pre-line text-sm text-muted">{feed.x.bio}</p>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-4 font-mono text-xs uppercase tracking-wider text-subtle">
              <div>
                <dt>Followers</dt>
                <dd className="mt-1 text-lg tabular-nums text-fg">{formatCompact(feed.x.followers)}</dd>
              </div>
              <div>
                <dt>Posts</dt>
                <dd className="mt-1 text-lg tabular-nums text-fg">{formatCompact(feed.x.tweets)}</dd>
              </div>
              <div>
                <dt>Media</dt>
                <dd className="mt-1 text-lg tabular-nums text-fg">{formatCompact(feed.x.media)}</dd>
              </div>
            </dl>
          </div>
        </section>
      ) : null}

      <p className="mt-4 font-mono text-xs text-subtle">
        Updated {formatDistanceToNow(new Date(feed.fetchedAt), { addSuffix: true })}
        {feed.sourcesOk.length ? ` · ${feed.sourcesOk.join(" · ")}` : ""}
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter sources">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={
              filter === f.id
                ? "h-10 rounded-sm bg-accent px-3 text-sm text-accent-fg"
                : "h-10 rounded-sm border border-border px-3 text-sm text-muted hover:text-fg"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="mt-6">
        <FeedList items={items} />
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl tracking-tight">Everywhere he publishes</h2>
        <p className="mt-2 mb-6 max-w-xl text-sm text-muted">
          Direct links to every public profile we could verify. Start with LinkedIn /in/max or book
          an exploration call.
        </p>
        <ConnectButtons className="mb-8 flex flex-wrap gap-3" />
        <SocialGrid />
      </section>
    </main>
  );
}
