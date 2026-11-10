import { ArrowUpRight } from "lucide-react";
import { DisplayTitle } from "@/components/display-title";
import { MARISOL_WORKS } from "@/lib/profile";

export function MarisolShelf() {
  return (
    <section>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">Marisol Vengas</p>
          <DisplayTitle className="mt-2 text-2xl tracking-tight sm:text-3xl">Blue · Pink · Yellow</DisplayTitle>
        </div>
        <a
          href="https://marisolvengas.com/collections/blue-27-pink-28-yellow-29"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-fg"
        >
          marisolvengas.com
          <ArrowUpRight className="size-4" />
        </a>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {MARISOL_WORKS.map((w) => (
          <li key={w.id}>
            <a
              href={w.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-150 hover:border-line"
            >
              <span className="relative block aspect-[4/5] overflow-hidden bg-raised">
                <img
                  src={w.image}
                  alt={`${w.title}, one of one original artwork`}
                  className="h-full w-full max-w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </span>
              <span className="flex flex-1 flex-col p-4">
                <span className="font-mono text-xs uppercase tracking-wider text-subtle">
                  Card {w.id} · one of one
                </span>
                <span className="mt-2 font-display text-2xl tracking-tight">{w.color}</span>
                <span className="mt-2 flex-1 text-sm text-muted">{w.blurb}</span>
                <span className="mt-4 flex items-center justify-between font-mono text-sm">
                  <span>{w.price}</span>
                  <ArrowUpRight className="size-4 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
