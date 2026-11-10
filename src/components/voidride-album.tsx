"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DisplayTitle } from "@/components/display-title";
import { VOIDRIDE, VOIDRIDE_PLAYLISTS } from "@/lib/profile";
import type { VoidridePlaylist } from "@/lib/live";
import { displayFontClass, cn } from "@/lib/utils";

export function VoidrideAlbum({ playlists }: { playlists?: VoidridePlaylist[] }) {
  const albums = playlists?.length ? playlists : VOIDRIDE_PLAYLISTS;
  const [i, setI] = useState(0);
  const [hot, setHot] = useState(false);
  const album = albums[Math.min(i, albums.length - 1)]!;
  const last = albums.length - 1;

  useEffect(() => {
    setI(0);
  }, [albums[0]?.id]);

  const prev = () => setI((n) => (n === 0 ? last : n - 1));
  const next = () => setI((n) => (n === last ? 0 : n + 1));

  useEffect(() => {
    if (!hot) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hot]);

  return (
    <section
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      }}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      className="overflow-hidden rounded-xl border border-border bg-surface outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <p className="font-mono text-xs uppercase tracking-wider text-subtle">
          Xerographer Media · {Math.min(i, last) + 1} / {albums.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="grid size-11 place-items-center rounded-sm border border-border hover:bg-raised"
            aria-label="Previous playlist"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="grid size-11 place-items-center rounded-sm border border-border hover:bg-raised"
            aria-label="Next playlist"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,18rem)_1fr]">
        <a href={album.href} target="_blank" rel="noreferrer" className="block bg-raised">
          <img
            src={album.cover}
            alt={`${VOIDRIDE.artist} — ${album.title} cover`}
            className="aspect-square h-auto w-full max-w-full object-cover"
            width={500}
            height={500}
          />
        </a>
        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">{album.released}</p>
          <DisplayTitle className="mt-2 text-3xl tracking-tight">{VOIDRIDE.artist}</DisplayTitle>
          <p className={cn("mt-1 text-lg text-muted", displayFontClass(album.title))}>{album.title}</p>
          <p className="mt-3 line-clamp-3 max-w-xl text-sm text-muted">{album.blurb}</p>
          <ol className="mt-5 divide-y divide-border border-y border-border">
            {album.tracks.map((t, n) => (
              <li key={t.href}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center gap-3 py-2.5 transition-colors duration-150 hover:bg-raised"
                >
                  <img src={t.art} alt="" className="size-10 shrink-0 rounded-xs object-cover" />
                  <span className="w-6 shrink-0 font-mono text-xs text-subtle">{String(n + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 truncate text-sm">{t.title}</span>
                  <span className="font-mono text-xs text-subtle">{t.time}</span>
                </a>
              </li>
            ))}
          </ol>
          <a
            href={album.href}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm text-fg"
          >
            Listen on SoundCloud
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
