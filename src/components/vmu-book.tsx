import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisplayTitle } from "@/components/display-title";
import { VMU_BOOK } from "@/lib/profile";

export function VmuBook() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface">
      <a href={VMU_BOOK.archive} target="_blank" rel="noreferrer" className="block bg-black">
        <img
          src={VMU_BOOK.siteBanner}
          alt="I.B.G.E. — the original viralmonetaryunit.com banner"
          className="h-auto w-full max-w-full object-contain"
          width={600}
          height={200}
        />
      </a>
      <img
        src={VMU_BOOK.banner}
        alt="MOOLA — Viral Monetary Units production"
        className="aspect-[21/9] h-auto w-full max-w-full object-cover sm:aspect-[21/8]"
        width={1400}
        height={1050}
      />
      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[9.5rem_1fr] md:items-start">
        <div className="flex flex-col gap-3">
          <a href={VMU_BOOK.href} target="_blank" rel="noreferrer" className="block justify-self-start">
            <img
              src={VMU_BOOK.cover}
              alt={`${VMU_BOOK.title} book cover`}
              className="h-auto w-36 max-w-full rounded-sm border border-border object-cover shadow-sm md:w-[9.5rem]"
              width={384}
              height={499}
            />
          </a>
          <a href={VMU_BOOK.archive} target="_blank" rel="noreferrer" className="block">
            <img
              src={VMU_BOOK.logo}
              alt="I.B.G.E. caduceus"
              className="h-auto w-36 max-w-full rounded-sm border border-border object-cover md:w-[9.5rem]"
              width={210}
              height={200}
            />
          </a>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
            Viral Monetary Units · {VMU_BOOK.year}
          </p>
          <DisplayTitle className="mt-2 text-2xl tracking-tight">{VMU_BOOK.title}</DisplayTitle>
          <p className="mt-1 text-sm font-semibold">{VMU_BOOK.subtitle}</p>
          <p className="mt-3 max-w-xl text-sm text-muted">{VMU_BOOK.blurb}</p>
          <p className="mt-2 font-mono text-xs text-subtle">
            Photographs by {VMU_BOOK.photographer} · {VMU_BOOK.format}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <a href={VMU_BOOK.href} target="_blank" rel="noreferrer">
                Get the book
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={VMU_BOOK.archive} target="_blank" rel="noreferrer">
                viralmonetaryunit.com
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-px border-t border-border bg-border">
        {VMU_BOOK.plates.map((p) => (
          <li key={p.src} className="bg-raised">
            <img src={p.src} alt={p.alt} className="aspect-[4/3] h-auto w-full max-w-full object-cover" />
          </li>
        ))}
      </ul>
    </section>
  );
}
