import { ChevronLeft, ChevronRight, Dices, ExternalLink, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getFlickrPage,
  getFlickrTagBrowse,
  getFlickrTags,
  mergeFlickrTags,
  spreadFlickrTags,
  type FlickrPhoto,
  type FlickrTag,
} from "@/lib/live";
import { DisplayTitle } from "@/components/display-title";
import { FitText } from "@/components/fit-text";
import { cn, displayFontClass, formatCompact } from "@/lib/utils";

export function FlickrExplorer({
  photos,
  items,
  tags: initialTags,
}: {
  photos: number;
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
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);
  const [browsePage, setBrowsePage] = useState(1);
  const [browsing, setBrowsing] = useState(false);
  const [browse, setBrowse] = useState<{ tags: FlickrTag[]; total: number; page: number; pages: number } | null>(
    null,
  );

  const current = frames[active] ?? frames[0];
  const cloud = useMemo(() => spreadFlickrTags(tags, 72), [tags]);
  const maxCount = cloud.reduce((m, t) => Math.max(m, t.count), 1);
  const photoTags = current?.tags ?? [];

  const load = useCallback(async (nextTag: string | null) => {
    setBusy(true);
    try {
      const res = await getFlickrPage({
        data: { tag: nextTag || undefined, random: true },
      });
      if (res.items.length || nextTag) {
        setFrames(res.items);
        setActive(0);
        if (res.items.length) setTags((prev) => mergeFlickrTags(prev, res.items));
      }
    } catch {
      /* keep the haul already on screen */
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
        setTags((prev) => mergeFlickrTags(fresh.length ? fresh : prev, items));
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

  const browseOn = letter !== null || query.trim().length >= 2;

  useEffect(() => {
    if (!browseOn) return;
    let alive = true;
    const handle = window.setTimeout(() => {
      void (async () => {
        setBrowsing(true);
        try {
          const res = await getFlickrTagBrowse({
            data: {
              q: query.trim().length >= 2 ? query.trim() : undefined,
              letter: letter ?? undefined,
              page: browsePage,
            },
          });
          if (alive) setBrowse(res);
        } catch {
          if (alive) setBrowse({ tags: [], total: 0, page: 1, pages: 1 });
        } finally {
          if (alive) setBrowsing(false);
        }
      })();
    }, 180);
    return () => {
      alive = false;
      window.clearTimeout(handle);
    };
  }, [browseOn, query, letter, browsePage]);

  return (
    <section id="flickr" className="scroll-mt-16 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Flickr · maximusmaximus</p>
            <DisplayTitle className="mt-1 text-2xl sm:text-3xl">Tag cabinet</DisplayTitle>
            <p className="mt-2 max-w-xl text-sm text-muted">
              {photos.toLocaleString("en-US")} photographs. Pick a letter or search the full tag list, then open a
              haul.
            </p>
          </div>
          <a
            href="https://www.flickr.com/photos/maximusmaximus/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-fg"
          >
            <span className="sm:hidden">View on Flickr</span>
            <span className="hidden sm:inline">flickr.com/photos/maximusmaximus</span>
          </a>
        </div>

        <div className="mt-4 hidden flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-6 sm:flex sm:gap-x-4">
          <button
            type="button"
            onClick={() => pickTag(null)}
            className={cn(
              "min-h-11 px-1 text-sm font-semibold",
              tag === null ? "text-fg underline decoration-accent decoration-2 underline-offset-4" : "text-muted hover:text-fg",
            )}
          >
            Random
          </button>
          {cloud.map((t) => {
            const weight = Math.log(t.count + 1) / Math.log(maxCount + 1);
            const size = 0.8 + weight * 1.35;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => pickTag(t.name)}
                style={{ fontSize: `${size}rem` }}
                className={cn(
                  "px-0.5 py-1 leading-none tracking-tight",
                  tag === t.name
                    ? "font-bold text-fg underline decoration-accent decoration-2 underline-offset-4"
                    : t.fresh
                      ? "font-semibold text-fg/80 hover:text-fg"
                      : "text-muted hover:text-fg",
                )}
              >
                {t.name}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => pickTag(null)}
            className={cn(
              "min-h-11 rounded-sm px-2.5 text-sm font-semibold",
              tag === null ? "bg-accent text-accent-fg" : "border border-border text-muted",
            )}
          >
            Random
          </button>
          {cloud.slice(0, 8).map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => pickTag(t.name)}
              className={cn(
                "min-h-11 max-w-[9.5rem] truncate rounded-sm border px-2.5 text-sm",
                tag === t.name ? "border-accent bg-accent font-semibold text-accent-fg" : "border-border text-muted",
              )}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setBrowsePage(1);
            }}
            placeholder="Search tags"
            aria-label="Search Flickr tags"
            className="h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-accent sm:max-w-xs"
          />
          <div className="flex min-w-0 max-w-full gap-1 overflow-x-auto overscroll-x-contain pb-1">
            <button
              type="button"
              onClick={() => {
                setLetter(null);
                setBrowsePage(1);
              }}
              className={cn(
                "h-11 shrink-0 rounded-sm px-2.5 text-xs font-semibold",
                letter === null ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              Cloud
            </button>
            {["#", ..."abcdefghijklmnopqrstuvwxyz"].map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => {
                  setLetter(ch);
                  setBrowsePage(1);
                }}
                className={cn(
                  "h-11 w-9 shrink-0 rounded-sm text-xs font-semibold uppercase",
                  letter === ch ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {browseOn ? (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
              {browsing && !browse
                ? "Loading tags…"
                : `${(browse?.total ?? 0).toLocaleString("en-US")} tags${letter ? ` · ${letter}` : ""}${query.trim().length >= 2 ? ` · “${query.trim()}”` : ""}`}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(browse?.tags ?? []).map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => pickTag(t.name)}
                  className={cn(
                    "min-h-11 rounded-sm px-2.5 text-sm",
                    tag === t.name ? "bg-accent font-semibold text-accent-fg" : "border border-border text-muted hover:text-fg",
                  )}
                >
                  {t.name}
                  {t.count > 1 ? (
                    <span className="ml-1.5 font-mono text-[11px] opacity-70">{formatCompact(t.count)}</span>
                  ) : null}
                </button>
              ))}
              {!browsing && browse && browse.tags.length === 0 ? (
                <p className="text-sm text-muted">No tags in this slice.</p>
              ) : null}
            </div>
            {browse && browse.pages > 1 ? (
              <div className="mt-3 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={browse.page <= 1 || browsing}
                  onClick={() => setBrowsePage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="size-4" />
                  Tags
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={browse.page >= browse.pages || browsing}
                  onClick={() => setBrowsePage((p) => p + 1)}
                >
                  More tags
                  <ChevronRight className="size-4" />
                </Button>
                <span className="font-mono text-xs text-subtle">
                  {browse.page}/{browse.pages}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative w-full overflow-hidden bg-black">
        <button
          type="button"
          onClick={() => current && setOpen(true)}
          className="relative block w-full"
          aria-label={current ? `Open ${current.title}` : "Flickr haul"}
        >
          {current ? (
            <img
              src={current.url}
              alt={current.title}
              className="aspect-[16/10] h-auto w-full max-w-full object-cover sm:aspect-[21/9] lg:aspect-[21/8]"
              width={1600}
              height={900}
              loading="eager"
            />
          ) : (
            <span className="grid aspect-[16/10] w-full place-items-center bg-raised text-sm text-muted sm:aspect-[21/9] lg:aspect-[21/8]">
              {busy ? "Drawing a haul…" : "No photographs in this draw."}
            </span>
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        </button>
        <div className="@container pointer-events-none absolute inset-0 flex flex-col justify-end">
          <div className="pointer-events-auto w-full min-w-0 px-4 pb-4 sm:px-6 sm:pb-8">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">
              {tag ? `#${tag}` : "Random haul"}
              {frames.length ? ` · ${active + 1}/${frames.length}` : busy ? " · drawing…" : ""}
            </p>
            <FitText
              as="h3"
              className={cn(
                "mt-1 max-w-4xl text-[clamp(1.25rem,5cqi,var(--text-3xl))] tracking-tight text-white",
                displayFontClass(current?.title ?? "Flickr"),
              )}
            >
              {current?.title ?? "Flickr photostream"}
            </FitText>
            <p className="mt-1 text-sm font-semibold text-white/85">
              {current?.taken ? current.taken.slice(0, 10) : "flickr.com/photos/maximusmaximus"}
              {current?.views ? ` · ${formatCompact(current.views)} views` : ""}
            </p>
            {photoTags.length ? (
              <div className="mt-3 flex max-h-16 flex-wrap gap-1.5 overflow-hidden sm:max-h-20">
                {photoTags.slice(0, 10).map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => pickTag(name)}
                    className={cn(
                      "h-8 rounded-sm px-2 text-xs font-semibold",
                      tag === name ? "bg-white text-black" : "border border-white/30 bg-black/30 text-white/85 hover:bg-black/50",
                    )}
                  >
                    #{name}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-white/30 bg-black/30 text-white hover:bg-black/50"
                disabled={!frames.length}
                onClick={() => setActive((i) => (i - 1 + frames.length) % frames.length)}
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-white/30 bg-black/30 text-white hover:bg-black/50"
                disabled={!frames.length}
                onClick={() => setActive((i) => (i + 1) % frames.length)}
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button type="button" variant="outline" className="border-white/30 bg-black/30 text-white hover:bg-black/50" disabled={busy} onClick={() => void load(tag)}>
                <Dices className="size-4" />
                {busy ? "Drawing…" : "Shuffle"}
              </Button>
              <Button asChild variant="outline" className="border-white/30 bg-black/30 text-white hover:bg-black/50">
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
        <ul className="mx-auto grid max-w-6xl grid-cols-3 gap-1 p-2 sm:grid-cols-4 sm:p-3 md:grid-cols-6 lg:grid-cols-8">
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
                <img src={p.thumb} alt="" className="h-full w-full object-cover" loading="eager" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && current ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/95" role="dialog" aria-modal="true" aria-label={current.title}>
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-4">
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
