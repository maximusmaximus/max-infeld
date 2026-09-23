import { ArrowUpRight } from "lucide-react";

export function AlienWorldsBanner() {
  return (
    <a
      href="https://alienworlds.io/"
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden border-y border-border bg-black"
    >
      <img
        src="/media/aw-hero.jpg"
        alt="Alien Worlds space terrain"
        className="aspect-[21/9] h-auto w-full max-w-full object-cover sm:aspect-[21/8]"
        width={1598}
        height={900}
      />
      <span className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
      <span className="absolute inset-0 flex flex-col justify-end gap-3 px-4 py-6 sm:px-8 sm:py-10">
        <img
          src="/media/aw-logo.png"
          alt="Alien Worlds"
          className="h-9 w-auto max-w-[220px] object-contain object-left sm:h-12"
          width={640}
          height={252}
        />
        <span className="font-mono text-xs uppercase tracking-wider text-white/70">2021–2024</span>
        <span className="max-w-xl text-sm font-semibold text-white sm:text-base">
          Product Manager and Strategist — @Dacoco, the maker of alienworlds.io
        </span>
        <span className="inline-flex items-center gap-2 text-sm text-white/80">
          alienworlds.io
          <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>
    </a>
  );
}
