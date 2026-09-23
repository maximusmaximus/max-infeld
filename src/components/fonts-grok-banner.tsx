import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisplayTitle } from "@/components/display-title";
import { cn } from "@/lib/utils";

const SPECIMEN = ["DATBOX", "CRACKVETICA", "THE QUICK BROWN FOX", "XEROGRAPHER"];

export function FontsGrokBanner({ framed }: { framed?: boolean }) {
  return (
    <section
      className={cn(
        "overflow-hidden bg-surface",
        framed ? "rounded-xl border border-border" : "border-y border-border",
      )}
    >
      <div className="grid md:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">Live catalog</p>
          <DisplayTitle className="mt-2 text-3xl tracking-tight">Xerographer Fonts</DisplayTitle>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Explore 1,376 faces, test custom text, and license unlimited commercial use via x402.
          </p>
          <div className="mt-6">
            <Button asChild>
              <a href="https://fonts.grok.me/" target="_blank" rel="noreferrer">
                fonts.grok.me
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
        <a
          href="https://fonts.grok.me/"
          target="_blank"
          rel="noreferrer"
          className="group relative block min-h-56 bg-raised md:min-h-72"
        >
          <img
            src="/media/fonts-grok-og.jpg"
            alt="Xerographer Fonts catalog on fonts.grok.me — live specimens"
            className="h-full w-full max-w-full object-cover object-top"
            width={1200}
            height={630}
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm text-white">
            Preview — open the live tester
            <ArrowUpRight className="ml-1 inline size-4 align-text-bottom transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>
      <ul className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
        {SPECIMEN.map((s) => (
          <li key={s} className="bg-bg px-3 py-4 text-center">
            <p className="font-display text-xl tracking-tight sm:text-2xl">{s}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
