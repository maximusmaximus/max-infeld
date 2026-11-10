import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DisplayTitle } from "@/components/display-title";
import { cn } from "@/lib/utils";
import { formatDafontRange, getProject, isRecentlyUpdated, recentDafontUpdates } from "@/lib/projects";

const SPECIMEN = ["DATBOX", "CRACKVETICA", "THE QUICK BROWN FOX", "XEROGRAPHER"];

export function FontsGrokBanner({ framed }: { framed?: boolean }) {
  const project = getProject("fonts");
  const recent = recentDafontUpdates();
  const range = formatDafontRange(recent);
  const showBadge = isRecentlyUpdated(project?.lastUpdated) || recent.length > 0;

  return (
    <section
      data-project-banner="fonts"
      className={cn(
        "overflow-hidden bg-surface",
        framed ? "rounded-xl border border-border" : "border-y border-border",
      )}
    >
      <div className="grid md:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="flex min-w-0 flex-col justify-center p-4 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-xs uppercase tracking-wider text-subtle">Live catalog</p>
            {showBadge ? <Badge className="border-border bg-accent text-accent-fg">Recently updated</Badge> : null}
          </div>
          <DisplayTitle className="mt-2 text-2xl tracking-tight sm:text-3xl">Xerographer Fonts</DisplayTitle>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Explore 1,376 faces, test custom text, and license unlimited commercial use via x402.
          </p>
          {recent.length > 0 && range ? (
            <p className="mt-3 hidden max-w-sm text-sm text-fg sm:block">
              {recent.length} faces updated on DaFont, {range}.
            </p>
          ) : null}
          <div className="mt-4 sm:mt-6">
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
      <ul className="hidden grid-cols-2 gap-px border-t border-border bg-border sm:grid sm:grid-cols-4">
        {SPECIMEN.map((s) => (
          <li key={s} className="bg-bg px-3 py-4 text-center">
            <p className="font-display text-xl tracking-tight sm:text-2xl">{s}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
