import { Link } from "@tanstack/react-router";
import { ConnectButtons } from "@/components/connect-band";
import { SOCIALS } from "@/lib/profile";

export function SiteFooter() {
  const primary = SOCIALS.filter((s) =>
    ["calendly", "linkedin", "x", "flickr", "mcclaw", "culty", "emoji", "ripple", "bath", "mv910", "xeroemoji", "fonts", "voidride", "github", "dafont", "curio"].includes(s.id),
  );

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-2xl tracking-tight">Max Infeld</p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Artist, designer, and engineer. Socially distributed work from Chico to San Francisco.
            </p>
            <ConnectButtons className="mt-5 flex flex-wrap gap-3" />
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">
            Sources refresh from the public web
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {primary.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors duration-150 hover:text-fg"
              >
                {s.id === "linkedin" ? "LinkedIn /in/max" : s.id === "calendly" ? "Set up a time" : s.name}
              </a>
            </li>
          ))}
          <li>
            <Link to="/feed" className="text-sm text-muted hover:text-fg">
              Live feed
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
