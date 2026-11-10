import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FONT_PROFILES, MAILTO_URL } from "@/lib/profile";

const SPECIMEN = "DATBOX   HATCH   CRACKVETICA   WESTERN RACING   ELECTRICAL   METALSHOW";

export function DafontBanner({ fonts }: { fonts: number }) {
  return (
    <section className="overflow-hidden border-y border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Xerographer Fonts</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Type for everyone</h2>
          <p className="mt-4 max-w-xl text-sm text-muted">
            {fonts.toLocaleString("en-US")} original typefaces. 100M+ downloads. Download on DaFont.
            Contact for commercial use licensing.
          </p>
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
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 pb-6 sm:px-6">
        {FONT_PROFILES.map((p) => (
          <Button key={p.href} asChild variant="outline" size="sm">
            <a href={p.href} target="_blank" rel="noreferrer">
              {p.name}
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
        ))}
      </div>
      <div className="overflow-x-auto border-t border-border">
        <p className="whitespace-nowrap px-4 py-6 font-display text-[clamp(1.35rem,3.2vw,2.6rem)] leading-none text-fg sm:px-6">
          {SPECIMEN}
        </p>
      </div>
    </section>
  );
}
