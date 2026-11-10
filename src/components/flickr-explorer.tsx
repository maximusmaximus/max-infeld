import { ChevronLeft, ChevronRight, Dices, ExternalLink, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getFlickrPage,
  getFlickrTagBrowse,
  isFlickrTagUseful,
  mergeFlickrTags,
  type FlickrPhoto,
  type FlickrTag,
} from "@/lib/live";
import { FitText } from "@/components/fit-text";
import { cn, displayFontClass, formatCompact } from "@/lib/utils";

const TAG_CHUNK = 400;

export function FlickrExplorer({
  items,
  pages: initialPages,
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [tag, setTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(initialPages);
  const [tagPage, setTagPage] = useState(1);
  const [tagPages, setTagPages] = useState(1);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const cabinetRef = useRef<HTMLDivElement>(null);

  const current = frames[active] ?? frames[0];
  const cabinet = useMemo(() => {
    const seen = new Set<string>();
    return tags
      .filter((t) => {
        if (!t.name || seen.has(t.name) || !isFlickrTagUseful(t.name)) return false;
        seen.add(t.name);
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tags]);
  const maxCount = cabinet.reduce((m, t) => Math.max(m, t.count), 1);
  const photoTags = current?.tags ?? [];
  const hasMore = page < pages;

  const syncStrip = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  const load = useCallback(
    async (nextTag: string | null, opts: { random?: boolean; page?: number; append?: boolean } = {}) => {
      const append = opts.append ?? false;
      if (append) setLoadingMore(true);
      else setBusy(true);
      try {
        const res = await getFlickrPage({
          data: {
            tag: nextTag || undefined,
            random: opts.random || undefined,
            page: opts.random ? undefined : (opts.page ?? 1),
          },
        });
        if (append) {
          if (res.items.length) {
            setFrames((prev) => {
              const seen = new Set(prev.map((p) => p.id));
              return [...prev, ...res.items.filter((p) => !seen.has(p.id))];
            });
            setPage(res.page);
            setPages(res.pages);
            setTags((prev) => mergeFlickrTags(prev, res.items));
          } else {
            setPages((current) => (opts.page ? Math.max(1, opts.page - 1) : current));
          }
        } else {
          setFrames(res.items);
          setActive(0);
          setPage(res.page);
          setPages(res.items.length === 0 ? 1 : res.pages);
          if (res.items.length) setTags((prev) => mergeFlickrTags(prev, res.items));
          requestAnimationFrame(() => {
            const el = stripRef.current;
            if (el) el.scrollTo({ left: 0 });
            syncStrip();
          });
        }
      } catch {
        /* keep the haul already on screen */
      } finally {
        setBusy(false);
        setLoadingMore(false);
      }
    },
    [syncStrip],
  );

  const loadTagChunk = useCallback(async (nextPage: number) => {
    setTagsLoading(true);
    try {
      const res = await getFlickrTagBrowse({ data: { page: nextPage, limit: TAG_CHUNK } });
      setTags((prev) => {
        const seen = new Set(prev.map((t) => t.name));
        const add = res.tags.filter((t) => t.name && !seen.has(t.name));
        return add.length ? [...prev, ...add] : prev;
      });
      setTagPage(res.page);
      setTagPages(res.pages);
    } catch {
      /* keep tags already on screen */
    } finally {
      setTagsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTagChunk(1);
  }, [loadTagChunk]);

  useEffect(() => {
    if (items.length) return;
    void load(null, { page: 1 });
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

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const next = el.scrollLeft + e.deltaY;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft = next;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    const ro = new ResizeObserver(syncStrip);
    ro.observe(el);
    syncStrip();
    return () => {
      el.removeEventListener("wheel", onWheel);
      ro.disconnect();
    };
  }, [syncStrip, frames.length, hasMore]);

  const pickTag = (name: string | null) => {
    setTag(name);
    void load(name, { page: 1 });
  };

  const scrollStrip = (dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 160), behavior: "smooth" });
  };

  const onCabinetScroll = () => {
    const el = cabinetRef.current;
    if (!el || tagsLoading || tagPage >= tagPages) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 16) {
      void loadTagChunk(tagPage + 1);
    }
  };

  return (
    <section id="flickr" className="scroll-mt-16 overflow-x-hidden border-y border-border">
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
              {tag ? `#${tag}` : ""}
              {frames.length ? `${tag ? " · " : ""}${active + 1}/${frames.length}` : busy ? `${tag ? " · " : ""}drawing…` : ""}
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
              <Button
                type="button"
                variant="outline"
                className="border-white/30 bg-black/30 text-white hover:bg-black/50"
                disabled={busy}
                onClick={() => void load(tag, { random: true })}
              >
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
        <div className="mx-auto max-w-6xl px-4 pt-2 sm:px-6">
          <div
            ref={cabinetRef}
            onScroll={onCabinetScroll}
            data-flickr-cabinet
            className="max-h-[4.5rem] overflow-x-hidden overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 leading-tight">
              <button
                type="button"
                onClick={() => pickTag(null)}
                className={cn(
                  "px-0 py-0.5 text-[11px] leading-tight",
                  tag === null
                    ? "font-semibold text-fg underline decoration-accent decoration-2 underline-offset-2"
                    : "text-muted hover:text-fg",
                )}
              >
                all
              </button>
              {cabinet.map((t) => {
                const weight = Math.log(t.count + 1) / Math.log(maxCount + 1);
                const size = 11 + weight * 2;
                return (
                  <button
                    key={t.name}
                    type="button"
                    data-flickr-tag={t.name}
                    onClick={() => pickTag(t.name)}
                    style={{ fontSize: `${size}px` }}
                    className={cn(
                      "px-0 py-0.5 leading-tight",
                      tag === t.name
                        ? "font-semibold text-fg underline decoration-accent decoration-2 underline-offset-2"
                        : "text-muted hover:text-fg",
                    )}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mt-2 pb-2">
          <button
            type="button"
            onClick={() => scrollStrip(-1)}
            disabled={!canLeft}
            aria-label="Scroll previews left"
            className="absolute top-1/2 left-1 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/90 text-fg shadow-sm disabled:opacity-30 md:flex"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div
            ref={stripRef}
            data-flickr-strip
            onScroll={syncStrip}
            className="flex snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain px-4 [scrollbar-width:thin] sm:px-6 md:px-12"
          >
            {frames.map((p, i) => (
              <button
                key={p.id}
                type="button"
                data-flickr-thumb
                data-taken={p.taken ?? ""}
                data-posted={p.posted ?? ""}
                onClick={() => {
                  setActive(i);
                  setOpen(true);
                }}
                className={cn(
                  "relative size-20 shrink-0 snap-start overflow-hidden rounded-xs border sm:size-24",
                  i === active ? "border-accent" : "border-transparent",
                )}
                aria-label={p.title}
              >
                <img src={p.thumb} alt="" className="h-full w-full object-cover" loading="eager" />
              </button>
            ))}
            {hasMore ? (
              <button
                type="button"
                data-flickr-load-more
                disabled={loadingMore}
                onClick={() => void load(tag, { page: page + 1, append: true })}
                className="flex size-20 shrink-0 snap-start items-center justify-center border border-border text-[11px] font-semibold text-fg sm:size-24"
              >
                {loadingMore ? "…" : "Load more"}
              </button>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => scrollStrip(1)}
            disabled={!canRight}
            aria-label="Scroll previews right"
            className="absolute top-1/2 right-1 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/90 text-fg shadow-sm disabled:opacity-30 md:flex"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
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
