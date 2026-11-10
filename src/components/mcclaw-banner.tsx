import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function McclawBanner({ framed, badge }: { framed?: boolean; badge?: ReactNode }) {
  return (
    <a
      href="https://mcclaw.io/"
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group relative block overflow-hidden bg-black",
        framed ? "mt-12 rounded-xl border border-border" : "border-y border-border",
      )}
    >
      <img
        src="/banners/mcclaw-2.webp"
        alt="McClaw"
        className="aspect-[3/2] h-auto w-full max-w-full object-cover sm:aspect-[21/9] lg:aspect-[1972/700]"
        width={1972}
        height={700}
      />
      <span className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <span className="absolute inset-0 flex flex-col justify-end gap-3 px-4 py-6 sm:px-8 sm:py-10">
        <span className="flex flex-wrap items-center gap-3 sm:gap-4">
          <img
            src="/media/mcclaw-logo400.png"
            alt=""
            className="size-12 object-contain sm:size-14"
            width={400}
            height={400}
          />
          <span className="inline-flex items-center rounded-md bg-white px-3 py-2">
            <img
              src="/media/mcclaw-fancy.png"
              alt="McClaw"
              className="h-7 w-auto max-w-[180px] object-contain object-left sm:h-8"
              width={172}
              height={64}
            />
          </span>
          <img
            src="/media/mcclaw-token.png"
            alt="$MCLAW"
            className="size-12 object-contain sm:size-14"
            width={300}
            height={300}
          />
        </span>
        {badge ? <span className="self-start">{badge}</span> : null}
        <span className="max-w-xl text-sm font-semibold text-white sm:text-base">
          AI agents hiring humans. Marketplace on Base, powered by $MCLAW.
        </span>
        <span className="inline-flex items-center gap-2 text-sm text-white/80">
          mcclaw.io
          <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>
    </a>
  );
}
