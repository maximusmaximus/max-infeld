import { ArrowUpRight } from "lucide-react";

export function GithubBanner({ framed }: { framed?: boolean }) {
  return (
    <a
      href="https://github.com/maximusmaximus"
      target="_blank"
      rel="noreferrer"
      className={
        framed
          ? "group grid overflow-hidden rounded-xl border border-border bg-[#0d1117] sm:grid-cols-[auto_1fr]"
          : "group grid overflow-hidden border-y border-border bg-[#0d1117] sm:grid-cols-[auto_1fr]"
      }
    >
      <span className="grid place-items-center bg-[#161b22] px-6 py-8 sm:px-10">
        <img
          src="/portraits/github.jpg"
          alt=""
          className="size-24 rounded-full border border-white/10 object-cover sm:size-32"
          width={256}
          height={256}
        />
      </span>
      <span className="flex min-w-0 flex-col justify-center gap-2 px-4 py-5 sm:px-8 sm:py-10">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/60 sm:text-xs">Public code</span>
        <span className="font-display text-2xl tracking-tight text-white sm:text-3xl">GitHub</span>
        <span className="max-w-xl text-sm font-semibold text-white/85 sm:text-base">
          maximusmaximus — public repositories, from color fonts to agent fleets.
        </span>
        <span className="mt-2 inline-flex min-h-11 items-center gap-2 self-start rounded-md bg-white px-4 text-sm font-semibold text-[#0d1117]">
          github.com/maximusmaximus
          <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>
    </a>
  );
}
