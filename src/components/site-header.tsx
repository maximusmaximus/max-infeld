import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL, LINKEDIN_URL } from "@/lib/profile";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Studio" },
  { href: "/#flickr", label: "Flickr" },
  { to: "/artist", label: "Artist" },
  { to: "/designer", label: "Designer" },
  { to: "/engineer", label: "Engineer" },
  { to: "/feed", label: "Live" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-xs border border-line font-display text-lg leading-none text-fg"
          >
            M
          </span>
          <span className="truncate font-display text-base tracking-tight sm:text-lg">Max Infeld</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            if ("href" in item) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-sm px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
                >
                  {item.label}
                </a>
              );
            }
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-sm px-3 py-2 text-sm transition-colors duration-150",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="h-11">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
              <Calendar className="size-4" />
              <span className="hidden sm:inline">Set up a time</span>
              <span className="sm:hidden">Book</span>
            </a>
          </Button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-sm border border-border md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border px-4 py-3 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={"href" in item ? item.href : item.to}>
                {"href" in item ? (
                  <a href={item.href} className="flex min-h-11 items-center text-base text-fg" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    className="flex min-h-11 items-center text-base text-fg"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center text-base text-fg"
                onClick={() => setOpen(false)}
              >
                Set up a time
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center text-base text-fg"
                onClick={() => setOpen(false)}
              >
                LinkedIn /in/max
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
