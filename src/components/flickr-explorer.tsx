import { ChevronLeft, ChevronRight, Dices, ExternalLink, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getFlickrPage,
  getFlickrTags,
  mergeFlickrTags,
  type FlickrPhoto,
  type FlickrTag,
} from "@/lib/live";
import { cn, displayFontClass, formatCompact } from "@/lib/utils";

export function FlickrExplorer({
  photos,
  cover,
  items,
  tags: initialTags,
}: {
  photos: number;
  cover?: string;
  items: FlickrPhoto[];
  pages: number;
  tags: FlickrTag[];
}) {
  const [frames, setFrames] = useState(items);
  const [tags, setTags] = useState(initialTags);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tag, setTag] = useState<string | null>(null);

  const current = frames[active] ?? frames[0];
  const cloud = useMemo(() => tags.slice(0, 36), [tags]);
  const photoTags = current?.tags ?? [];
  const banner = "/media/flickr-cover.jpg";

  const load = useCallback(async (nextTag: string | null) => {
    setBusy(true);
    try {
      const res = await getFlickrPage({
        data: { tag: nextTag || undefined, random: true },
      });
      if (res.items.length) {
        setFrames(res.items);
        setActive(0);
        setTags((prev) => mergeFlickrTags(prev, res.items).slice(0, 48));
      }
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const fresh = await getFlickrTags();
        if (!alive) return;
        setTags((prev) => mergeFlickrTags(fresh.length ? fresh : prev, items).slice(0, 48));
      } catch {
        /* keep SSR tags */
      }
    })();
    return () => {
      alive = false;
    };
  }, [items]);

  useEffect(() => {
    if (items.length) return;
    void load(null);
  }, [items.length, load]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % Math.max(frames.length, 1));
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + frames.length) % Math.max(frames.length, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, frames.length]);

  const pickTag = (name: string | null) => {
    setTag(name);
    void load(name);
  };

  return (
    <section id="flickr" className="scroll-mt-16 border-y border-border">
      <div className="overflow-hidden bg-raised">
        <img
          src={banner}
          alt="Flickr photostream cover"
          className="aspect-[21/8] h-auto w-full max-w-full object-cover object-center sm:aspect-[1972/700]"
          width={2048}
          height={768}
          loading="eager"
        />
        <div className="border-t border-border bg-bg px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Flickr · maximusmaximus</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">Tag cabinet</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                {photos.toLocaleString("en-US")} photographs. A random haul each draw — follow a tag to wander the
                archive.
              </p>
            </div>
            <a
              href="https://www.flickr.com/photos/maximusmaximus/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-fg"
            >
              flickr.com/photos/maximusmaximus
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => pickTag(null)}
            className={cn(
              "h-11 rounded-md px-3 text-sm font-semibold",
              tag === null ? "bg-accent text-accent-fg" : "border border-border text-muted hover:text-fg",
            )}
          >
            Random haul
          </button>
          {cloud.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => pickTag(t.name)}
              className={cn(
                "h-11 rounded-md px-3 text-sm",
                tag === t.name
                  ? "bg-accent font-semibold text-accent-fg"
                  : "border border-border text-muted hover:text-fg",
                t.fresh && tag !== t.name ? "border-accent/50" : "",
              )}
            >
              #{t.name}
              {t.count > 1 ? (
                <span className="ml-1.5 font-mono text-[11px] opacity-70">{formatCompact(t.count)}</span>
              ) : t.fresh ? (
                <span className="ml-1.5 font-mono text-[11px] opacity-70">new</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-[1.4fr_0.8fr]">
          <button
            type="button"
            onClick={() => current && setOpen(true)}
            className="relative min-h-64 overflow-hidden bg-raised sm:min-h-96"
          >
            {current ? (
              <img
                src={current.url}
                alt={current.title}
                className="h-full w-full max-w-full object-contain"
                loading="eager"
              />
            ) : (
              <img
                src={banner}
                alt="Flickr photostream"
                className="h-full w-full max-w-full object-cover"
                loading="eager"
              />
            )}
          </button>
          <div className="flex min-w-0 flex-col justify-between border-t border-border p-5 lg:border-l lg:border-t-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
                {tag ? `#${tag}` : "Random haul"}
                {frames.length ? ` · ${active + 1}/${frames.length}` : busy ? " · drawing…" : ""}
              </p>
              <h3 className={cn("mt-2 text-xl tracking-tight", displayFontClass(current?.title ?? "Flickr"))}>
                {current?.title ?? "Flickr photostream"}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {current?.taken ? current.taken.slice(0, 10) : "flickr.com/photos/maximusmaximus"}
                {current?.views ? ` · ${formatCompact(current.views)} views` : ""}
              </p>
              {photoTags.length ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {photoTags.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => pickTag(name)}
                      className={cn(
                        "h-8 rounded-sm px-2 text-xs font-semibold",
                        tag === name ? "bg-accent text-accent-fg" : "border border-border text-muted hover:text-fg",
                      )}
                    >
                      #{name}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={!frames.length}
                onClick={() => setActive((i) => (i - 1 + frames.length) % frames.length)}
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!frames.length}
                onClick={() => setActive((i) => (i + 1) % frames.length)}
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button type="button" variant="outline" disabled={busy} onClick={() => void load(tag)}>
                <Dices className="size-4" />
                {busy ? "Drawing…" : "Shuffle"}
              </Button>
              <Button asChild variant="outline">
                <a
                  href={current?.href ?? "https://www.flickr.com/photos/maximusmaximus/"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Flickr
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <ul className="mx-auto grid max-w-6xl grid-cols-3 gap-1 p-2 sm:grid-cols-4 sm:p-3 md:grid-cols-6">
          {frames.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setOpen(true);
                }}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-xs border",
                  i === active ? "border-accent" : "border-transparent",
                )}
                aria-label={p.title}
              >
                <img src={p.thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && current ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/95" role="dialog" aria-modal="true" aria-label={current.title}>
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <p className={cn("min-w-0 truncate text-sm", displayFontClass(current.title))}>{current.title}</p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setActive((i) => (i - 1 + frames.length) % frames.length)}
                aria-label="Previous"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setActive((i) => (i + 1) % frames.length)}
                aria-label="Next"
              >
                <ChevronRight className="size-5" />
              </Button>
              <Button asChild variant="ghost">
                <a href={current.href} target="_blank" rel="noreferrer" aria-label="Open on Flickr">
                  <ExternalLink className="size-5" />
                </a>
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} aria-label="Close">
                <X className="size-5" />
              </Button>
            </div>
          </div>
          {photoTags.length ? (
            <div className="flex gap-1.5 overflow-x-auto px-4 pb-2">
              {photoTags.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    pickTag(name);
                  }}
                  className="h-8 shrink-0 rounded-sm border border-border px-2 text-xs font-semibold text-muted hover:text-fg"
                >
                  #{name}
                </button>
              ))}
            </div>
          ) : null}
          <button
            type="button"
            className="flex min-h-0 flex-1 items-center justify-center px-4 pb-6"
            onClick={() => setOpen(false)}
          >
            <img src={current.url} alt={current.title} className="max-h-full max-w-full object-contain" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
