import { createFileRoute } from "@tanstack/react-router";
import { DafontBanner } from "@/components/dafont-banner";
import { FontsGrokBanner } from "@/components/fonts-grok-banner";
import { GrokWorksBanners } from "@/components/grok-works-banners";
import { DisplayTitle } from "@/components/display-title";
import { FeedList } from "@/components/feed-list";
import { getLiveFeed } from "@/lib/live";
import { COLOR_FONTS, FEATURED_FONTS } from "@/lib/profile";
import { displayFontClass, formatCompact, cn } from "@/lib/utils";

export const Route = createFileRoute("/designer")({
  loader: () => getLiveFeed(),
  component: Designer,
});

function Designer() {
  const feed = Route.useLoaderData();
  const fonts = feed.dafont?.fonts ?? 1376;
  const downloads = feed.dafont?.downloads ?? 44_150_444;
  const yesterday = feed.dafont?.yesterday;
  const latest = feed.dafont?.latest?.length ? feed.dafont.latest : FEATURED_FONTS.map((f) => ({
    slug: f.slug,
    name: f.name,
    href: `https://www.dafont.com/${f.slug}.font`,
  }));
  const blog = feed.posts.filter((p) => p.source === "blog").slice(0, 5);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">Designer</p>
      <DisplayTitle as="h1" className="mt-3 max-w-3xl text-3xl tracking-tight">
        Xerographer Fonts — a one-person foundry with a city-scale audience.
      </DisplayTitle>
      <p className="mt-6 max-w-2xl text-muted">
        Since 2011 Max has released type under the Xerographer name: grunge grotesques, color
        OpenType experiments, hand-cut display faces. Download on DaFont. Contact for commercial
        use licensing.
      </p>

      <section className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        <Stat k={fonts.toLocaleString("en-US")} v="faces on DaFont" />
        <Stat k={formatCompact(downloads)} v="lifetime downloads" />
        <Stat
          k={yesterday ? yesterday.toLocaleString("en-US") : "live"}
          v={yesterday ? "downloads yesterday" : "DaFont counter"}
        />
      </section>

      <section className="mt-14">
        <FontsGrokBanner framed />
      </section>
      <section className="mt-6">
        <GrokWorksBanners framed ids={["xeroemoji"]} />
      </section>

      <div className="-mx-4 mt-14 sm:-mx-6">
        <DafontBanner fonts={fonts} />
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <DisplayTitle className="text-2xl tracking-tight">On the foundry bench</DisplayTitle>
          <a
            href="https://www.dafont.com/max-infeld.d3584"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted hover:text-fg"
          >
            Open DaFont
          </a>
        </div>
        <p className="mt-2 text-sm text-muted">Pulled live from the Xerographer author page.</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((f) => (
            <li key={f.slug}>
              <a
                href={f.href}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-24 flex-col justify-between rounded-lg border border-border bg-surface p-4 hover:border-line"
              >
                <span className={cn("text-2xl tracking-tight", displayFontClass(f.name))}>{f.name}</span>
                <span className="mt-3 font-mono text-xs text-muted">
                  {"downloads" in f && f.downloads
                    ? `${f.downloads.toLocaleString("en-US")} downloads`
                    : "Xerographer Fonts"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <article>
          <DisplayTitle className="text-2xl tracking-tight">Color fonts, open source</DisplayTitle>
          <p className="mt-3 text-muted">
            In 2016 the studio published SVG-in-OpenType polychromatic fonts — Multicoloure, Reinebow,
            Freizer, Gradiently — under Creative Commons. They still live on GitHub as working
            specimens of a then-new format.
          </p>
          <ul className="mt-5 grid gap-2">
            {COLOR_FONTS.map((f) => (
              <li key={f.name}>
                <a
                  href={f.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3 text-sm hover:border-line"
                >
                  <span>{f.name}</span>
                  <span className="font-mono text-xs text-muted">{f.stars} stars</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <DisplayTitle className="text-2xl tracking-tight">Studio notes</DisplayTitle>
          <p className="mt-3 mb-5 text-sm text-muted">From the Xerographer blog feed.</p>
          <FeedList items={blog} />
        </article>
      </section>
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-bg px-5 py-6">
      <p className="font-sans text-3xl font-bold tabular-nums tracking-tight">{k}</p>
      <p className="mt-1 text-sm text-muted">{v}</p>
    </div>
  );
}
