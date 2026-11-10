"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DisplayTitle } from "@/components/display-title";
import { FOUND_FLYERS } from "@/lib/profile";
import { cn } from "@/lib/utils";

const PAPER: Record<string, string> = {
  green: "bg-[#b7c48a] text-[#16140e]",
  cream: "bg-[#efe6cc] text-[#16140e]",
  white: "bg-[#f4efe3] text-[#16140e]",
};

export function FoundFlyers() {
  const [i, setI] = useState(0);
  const page = FOUND_FLYERS.read[i];
  const last = FOUND_FLYERS.read.length - 1;
  const prev = () => setI((n) => (n === 0 ? last : n - 1));
  const next = () => setI((n) => (n === last ? 0 : n + 1));

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="grid md:grid-cols-[13rem_1fr]">
        <a href={FOUND_FLYERS.href} target="_blank" rel="noreferrer" className="block bg-raised">
          <img
            src={FOUND_FLYERS.cover}
            alt={`${FOUND_FLYERS.title} paperback cover`}
            className="aspect-[3/4] h-auto w-full max-w-full object-cover"
            width={384}
            height={497}
          />
        </a>
        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">
            Available book · {FOUND_FLYERS.year}
          </p>
          <DisplayTitle className="mt-2 text-2xl tracking-tight sm:text-3xl">{FOUND_FLYERS.title}</DisplayTitle>
          <p className="mt-3 max-w-xl text-sm text-muted">{FOUND_FLYERS.blurb}</p>
          <p className="mt-2 font-mono text-xs text-subtle">
            {FOUND_FLYERS.pages} pages · {FOUND_FLYERS.format} · {FOUND_FLYERS.price}
          </p>
          <div className="mt-5">
            <Button asChild>
              <a href={FOUND_FLYERS.href} target="_blank" rel="noreferrer">
                Get the book
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">
            Read a page · {i + 1} / {FOUND_FLYERS.read.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="grid size-11 place-items-center rounded-sm border border-border hover:bg-raised"
              aria-label="Previous flyer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="grid size-11 place-items-center rounded-sm border border-border hover:bg-raised"
              aria-label="Next flyer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="bg-raised px-4 pb-6 sm:px-6">
          <article
            className={cn(
              "grain relative mx-auto flex min-h-[22rem] max-w-xl flex-col justify-center px-6 py-8 text-center sm:min-h-[34rem] sm:px-12 sm:py-10",
              PAPER[page.paper],
            )}
          >
            {page.blocks.map((b, n) => (
              <p
                key={`${page.id}-${n}`}
                className={cn(
                  "text-[#16140e]",
                  b.style === "lead" && "font-poster text-xl uppercase tracking-wide sm:text-2xl",
                  b.style === "hero" && "font-poster text-5xl uppercase leading-[0.9] sm:text-6xl",
                  b.style === "body" && "mt-3 font-sans text-lg font-semibold sm:text-xl",
                  b.style === "phone" && "mt-6 font-sans text-2xl font-bold tabular-nums sm:text-3xl",
                  b.style === "place" && "mt-8 font-sans text-sm font-bold uppercase tracking-[0.2em]",
                )}
              >
                {b.text}
              </p>
            ))}
          </article>
          <p className="mx-auto mt-3 max-w-xl font-mono text-xs text-subtle">{page.caption}</p>
        </div>

        <ul className="grid grid-cols-3 gap-px border-t border-border bg-border">
          {FOUND_FLYERS.read.map((p, n) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setI(n)}
                className={cn(
                  "flex min-h-16 w-full flex-col items-center justify-center px-2 py-3 text-center hover:bg-raised",
                  n === i ? "bg-raised" : "bg-surface",
                )}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 text-xs font-semibold">
                  {p.blocks.find((b) => b.style === "hero")?.text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
