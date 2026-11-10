import { createFileRoute } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ConnectButtons } from "@/components/connect-band";
import { DisplayTitle } from "@/components/display-title";
import { FeedList } from "@/components/feed-list";
import { ProjectBanner } from "@/components/project-banners";
import { AlienWorldsBanner } from "@/components/alien-worlds-banner";
import { GrokWorksBanners } from "@/components/grok-works-banners";
import { GithubBanner } from "@/components/github-banner";
import { getLiveFeed } from "@/lib/live";
import { displayFontClass, cn } from "@/lib/utils";

export const Route = createFileRoute("/engineer")({
  loader: () => getLiveFeed(),
  component: Engineer,
});

function Engineer() {
  const feed = Route.useLoaderData();
  const events = feed.posts.filter((p) => p.source === "github").slice(0, 8);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">Engineer</p>
      <DisplayTitle as="h1" className="mt-3 max-w-3xl text-3xl tracking-tight">
        Tools first, then communities. Software as a way to keep people in the same room.
      </DisplayTitle>
      <p className="mt-6 max-w-2xl text-muted">
        Max writes the systems that his art and type need: public ledgers in 2007, color-font build
        pipelines, DAC toolkits on EOS, product for Alien Worlds, agent fleets and coworking software
        now. The engineering is not a second career. It is how the social work scales.
      </p>
      <ConnectButtons className="mt-8 flex flex-wrap gap-3" />

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <Role
          year="2007–"
          title="Public ledgers"
          body="An alternative “viral currency” with a public ledger — years before it was fashionable — later VMUs and Bitcoin-era experiments."
        />
        <Role
          year="Alien Worlds"
          title="Product, DAOs & community"
          body="Product Manager of DAOs and Communities with Dacoco, the studio behind Alien Worlds. Games, guilds, and the social layer of a planet-scale title."
        />
        <Role
          year="Now"
          title="McClaw & Boardy"
          body="Human worker at McClaw.io. Deal Partner at Boardy Ventures, looking at startups in AI, fintech, and crypto."
        />
      </section>

      <div className="-mx-4 mt-12 sm:-mx-6">
        <AlienWorldsBanner />
      </div>
      <ProjectBanner id="mcclaw" />
      <ProjectBanner id="culty" />
      <GrokWorksBanners framed />
      <div className="mt-6">
        <GithubBanner framed />
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <DisplayTitle className="text-2xl tracking-tight">Repositories, live</DisplayTitle>
          <a
            href="https://github.com/maximusmaximus"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted hover:text-fg"
          >
            github.com/maximusmaximus
          </a>
        </div>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {feed.github.slice(0, 10).map((r) => (
            <li key={r.fullName}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-border bg-surface p-4 hover:border-line"
              >
                <p className="font-mono text-xs text-subtle">
                  {r.owner} · {r.language ?? "repo"}
                </p>
                <p className="mt-1 text-fg">{r.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {r.description ?? "Open engineering work."}
                </p>
                <p className="mt-3 font-mono text-xs text-subtle">
                  Updated {formatDistanceToNow(new Date(r.updated), { addSuffix: true })}
                  {r.stars ? ` · ${r.stars} stars` : ""}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <DisplayTitle className="text-2xl tracking-tight">Public activity</DisplayTitle>
        <p className="mt-2 mb-5 text-sm text-muted">GitHub events, fetched on load.</p>
        <FeedList items={events} />
      </section>
    </main>
  );
}

function Role({ year, title, body }: { year: string; title: string; body: string }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">{year}</p>
      <h2 className={cn("mt-3 text-2xl tracking-tight", displayFontClass(title))}>{title}</h2>
      <p className="mt-3 text-sm text-muted">{body}</p>
    </article>
  );
}
