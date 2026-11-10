import { ArrowUpRight, Calendar, Linkedin } from "lucide-react";
import { CALENDLY_URL, LINKEDIN_URL } from "@/lib/profile";
import { Button } from "@/components/ui/button";
import { DisplayTitle } from "@/components/display-title";

export function ConnectBand() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-8 sm:gap-4 sm:px-6 sm:py-12 md:grid-cols-2">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-36 flex-col justify-between rounded-xl border border-line bg-bg p-6 transition-colors duration-150 hover:border-accent"
        >
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-subtle">
            <Calendar className="size-3.5" />
            Calendly
          </span>
          <span>
            <span className="mt-4 block font-display text-2xl tracking-tight">Set up a time</span>
            <span className="mt-2 block text-sm text-muted">
              Exploration call — pick a slot that works.
            </span>
          </span>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-fg">
            calendly.com/maxinfeld/exploration
            <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-36 flex-col justify-between rounded-xl border border-line bg-bg p-6 transition-colors duration-150 hover:border-accent"
        >
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-subtle">
            <Linkedin className="size-3.5" />
            LinkedIn
          </span>
          <span>
            <DisplayTitle as="span" className="mt-4 block text-2xl tracking-tight">
              /in/max
            </DisplayTitle>
            <span className="mt-2 block text-sm text-muted">
              The primary profile. Connect, follow the practice, write.
            </span>
          </span>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-fg">
            linkedin.com/in/max
            <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>
    </section>
  );
}

export function ConnectButtons({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex flex-wrap gap-3"}>
      <Button asChild>
        <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
          <Calendar className="size-4" />
          Set up a time
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          <Linkedin className="size-4" />
          linkedin.com/in/max
        </a>
      </Button>
    </div>
  );
}
