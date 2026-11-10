import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FONT_PROFILES, MAILTO_URL } from "@/lib/profile";
import { MobileCollapse } from "@/components/mobile-collapse";
import { formatDafontRange, recentDafontUpdates } from "@/lib/projects";

const SPECIMEN = "DATBOX   HATCH   CRACKVETICA   WESTERN RACING   ELECTRICAL   METALSHOW";

export function DafontBanner({ fonts }: { fonts: number }) {
  const recent = recentDafontUpdates();
  const range = formatDafontRange(recent);

  return (
    <section className="overflow-hidden border-y border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:gap-6 sm:px-6 sm:py-14 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Xerographer Fonts</p>
            {recent.length > 0 ? (
              <Badge className="border-border bg-accent text-accent-fg">Recently updated</Badge>
            ) : null}
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Type for everyone</h2>
          <p className="mt-4 max-w-xl text-sm text-muted">
            {fonts.toLocaleString("en-US")} original typefaces. 100M+ downloads. Download on DaFont.
            Contact for commercial use licensing.
          </p>
          {recent.length > 0 && range ? (
            <p className="mt-3 max-w-xl text-sm text-fg">
              New fonts: {recent.length} faces were updated on DaFont {range}.
              <span className="hidden sm:inline">
                {" "}These are updates to existing typefaces, not an increase in the catalog count.
              </span>
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={MAILTO_URL}>
              <Mail className="size-4" />
              E-Mail Max
            </a>
          </Button>
        </div>
      </div>
      {recent.length > 0 ? (
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 sm:pb-6">
          <p className="mb-2 hidden font-mono text-[10px] uppercase tracking-wider text-subtle sm:block">
            Updated on DaFont
          </p>
          <MobileCollapse label={`${recent.length} faces updated on DaFont`}>
            <ul className="flex flex-wrap gap-2">
              {recent.map((font) => (
                <li key={font.slug}>
                  <Button asChild variant="outline" size="sm">
                    <a href={font.url} target="_blank" rel="noreferrer">
                      {font.name}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </MobileCollapse>
        </div>
      ) : null}
      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 sm:pb-6">
        <MobileCollapse label="Font profiles and links">
          <div className="flex flex-wrap gap-2">
            {FONT_PROFILES.map((p) => (
              <Button key={p.href} asChild variant="outline" size="sm">
                <a href={p.href} target="_blank" rel="noreferrer">
                  {p.name}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </Button>
            ))}
          </div>
        </MobileCollapse>
      </div>
      <div className="overflow-x-auto border-t border-border">
        <p className="whitespace-nowrap px-4 py-4 font-display text-[clamp(1.2rem,3.2vw,2.6rem)] leading-none text-fg sm:px-6 sm:py-6">
          {SPECIMEN}
        </p>
      </div>
    </section>
  );
}
