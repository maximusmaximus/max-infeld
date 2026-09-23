import { ArrowUpRight } from "lucide-react";
import { SOCIALS, type SocialLink } from "@/lib/profile";
import { cn } from "@/lib/utils";

const GROUPS: { id: SocialLink["group"]; label: string }[] = [
  { id: "presence", label: "Presence" },
  { id: "art", label: "Art" },
  { id: "type", label: "Type" },
  { id: "work", label: "Engineering" },
];

export function SocialGrid({ compact = false }: { compact?: boolean }) {
  const groups = compact
    ? GROUPS
    : GROUPS;

  return (
    <div className="grid gap-10">
      {groups.map((g) => {
        const links = SOCIALS.filter((s) => s.group === g.id);
        return (
          <section key={g.id}>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-subtle">{g.label}</p>
            <ul className={cn("grid gap-2", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
              {links.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  className={cn(
                    "group flex min-h-20 items-start justify-between gap-3 rounded-lg border bg-surface p-4 transition-colors duration-150 hover:border-line",
                    s.id === "calendly" || s.id === "linkedin" ? "border-line" : "border-border",
                  )}
                  >
                    <span>
                      <span className="block text-sm text-fg">{s.name}</span>
                      <span className="mt-0.5 block font-mono text-xs text-muted">{s.handle}</span>
                      {compact ? null : (
                        <span className="mt-2 block text-sm text-muted">{s.blurb}</span>
                      )}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
