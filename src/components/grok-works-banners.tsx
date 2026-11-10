import { ArrowUpRight } from "lucide-react";
import { GROK_WORKS } from "@/lib/profile";
import { displayFontClass, cn } from "@/lib/utils";

export function GrokWorksBanners({
  framed,
  ids,
}: {
  framed?: boolean;
  ids?: Array<(typeof GROK_WORKS)[number]["id"]>;
}) {
  const works = ids ? GROK_WORKS.filter((w) => ids.includes(w.id)) : GROK_WORKS;

  return (
    <div className={framed ? "space-y-6" : ""}>
      {works.map((w) => (
        <a
          key={w.id}
          href={w.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "group relative block overflow-hidden bg-black",
            framed ? "rounded-xl border border-border" : "border-t border-border",
          )}
        >
          <img
            src={w.image}
            alt={w.title}
            className="aspect-[3/2] h-auto w-full max-w-full object-cover sm:aspect-[21/9] lg:aspect-[21/8]"
            width={1200}
            height={630}
          />
          <span className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
          <span className="absolute inset-0 flex flex-col justify-end gap-1.5 px-4 py-4 sm:gap-2 sm:px-8 sm:py-10">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">{w.kicker}</span>
            <span className={cn("text-xl tracking-tight text-white sm:text-2xl lg:text-3xl", displayFontClass(w.title))}>
              {w.title}
            </span>
            <span className="line-clamp-3 max-w-xl text-sm font-semibold text-white/90 sm:text-base">{w.lede}</span>
            {"cta" in w && w.cta ? (
              <span className="mt-2 inline-flex min-h-11 items-center self-start rounded-md bg-accent px-4 text-sm font-semibold text-accent-fg">
                {w.cta}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-white/80">
                {w.href.replace(/^https:\/\//, "").replace(/\/$/, "")}
                <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            )}
          </span>
        </a>
      ))}
    </div>
  );
}
