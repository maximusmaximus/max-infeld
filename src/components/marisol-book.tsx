import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisplayTitle } from "@/components/display-title";
import { MARISOL_BOOK } from "@/lib/profile";

export function MarisolBook() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="grid md:grid-cols-[13rem_1fr]">
        <a href={MARISOL_BOOK.href} target="_blank" rel="noreferrer" className="block bg-raised">
          <img
            src={MARISOL_BOOK.cover}
            alt={`${MARISOL_BOOK.title} paperback cover`}
            className="aspect-[3/4] h-auto w-full max-w-full object-cover"
            width={384}
            height={499}
          />
        </a>
        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">
            Available book · {MARISOL_BOOK.year}
          </p>
          <DisplayTitle className="mt-2 text-3xl tracking-tight">{MARISOL_BOOK.title}</DisplayTitle>
          <p className="mt-3 max-w-xl text-sm text-muted">{MARISOL_BOOK.blurb}</p>
          <p className="mt-2 font-mono text-xs text-subtle">
            {MARISOL_BOOK.pages} pages · {MARISOL_BOOK.format} · {MARISOL_BOOK.price}
          </p>
          <div className="mt-5">
            <Button asChild>
              <a href={MARISOL_BOOK.href} target="_blank" rel="noreferrer">
                Get the book
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
