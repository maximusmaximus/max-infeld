import { ArrowUpRight } from "lucide-react";
import { McclawBanner } from "@/components/mcclaw-banner";
import { PROJECT_BANNERS } from "@/lib/profile";
import { displayFontClass, cn } from "@/lib/utils";

export function ProjectBanners() {
  return (
    <div>
      <McclawBanner />
      {PROJECT_BANNERS.filter((b) => b.id !== "mcclaw").map((b) => (
        <a
          key={b.id}
          href={b.href}
          target="_blank"
          rel="noreferrer"
          className="group relative block overflow-hidden border-t border-border"
        >
          <img
            src={b.image}
            alt={`${b.title} banner`}
            className="aspect-[21/8] h-auto w-full max-w-full object-cover sm:aspect-[1972/700]"
            width={1972}
            height={700}
          />
          <span className="flex items-center justify-between gap-4 border-t border-border bg-bg px-4 py-4 sm:px-6">
            <span className="min-w-0">
              <span className="block font-mono text-xs uppercase tracking-wider text-subtle">{b.kicker}</span>
              <span className={cn("mt-1 block text-2xl tracking-tight", displayFontClass(b.title))}>
                {b.title}
              </span>
              <span className="mt-1 block max-w-xl text-sm text-muted">{b.lede}</span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      ))}
    </div>
  );
}

export function ProjectBanner({ id }: { id: "mcclaw" | "culty" }) {
  if (id === "mcclaw") return <McclawBanner framed />;
  const b = PROJECT_BANNERS.find((x) => x.id === id);
  if (!b) return null;
  return (
    <a
      href={b.href}
      target="_blank"
      rel="noreferrer"
      className="group relative mt-12 block overflow-hidden rounded-xl border border-border"
    >
      <img
        src={b.image}
        alt={`${b.title} banner`}
        className="aspect-[21/8] h-auto w-full max-w-full object-cover sm:aspect-[1972/700]"
        width={1972}
        height={700}
      />
      <span className="flex items-center justify-between gap-4 border-t border-border bg-surface px-4 py-4 sm:px-5">
        <span className="min-w-0">
          <span className="block font-mono text-xs uppercase tracking-wider text-subtle">{b.kicker}</span>
          <span className={cn("mt-1 block text-xl tracking-tight", displayFontClass(b.title))}>
            {b.title}
          </span>
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}