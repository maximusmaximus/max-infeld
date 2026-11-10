import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ConnectBand, ConnectButtons } from "@/components/connect-band";
import { DafontBanner } from "@/components/dafont-banner";
import { FontsGrokBanner } from "@/components/fonts-grok-banner";
import { DisplayTitle } from "@/components/display-title";
import { FeedList } from "@/components/feed-list";
import { FlickrExplorer } from "@/components/flickr-explorer";
import { MarisolShelf } from "@/components/marisol-shelf";
import { AlienWorldsBanner } from "@/components/alien-worlds-banner";
import { ProjectBanners } from "@/components/project-banners";
import { GrokWorksBanners } from "@/components/grok-works-banners";
import { GithubBanner } from "@/components/github-banner";
import { ChristiesBanner } from "@/components/christies-banner";
import { VoidrideAlbum } from "@/components/voidride-album";
import { getLiveFeed } from "@/lib/live";
import { PRACTICES, PROFILE, QUOTE } from "@/lib/profile";
import { formatCompact } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: () => getLiveFeed(),
  component: Home,
});

function Home() {
  const feed = Route.useLoaderData();
  const fonts = feed.dafont?.fonts ?? 1376;
  const flickrViews = feed.flickr?.views ?? 1_837_359;

  const stats = [
    { k: "100M+", v: "typeface downloads" },
    { k: formatCompact(flickrViews), v: "views on Flickr" },
    { k: fonts.toLocaleString("en-US"), v: "original fonts" },
    { k: "2017", v: "first Ethereum art NFTs" },
  ];

  const latest = feed.posts.filter((p) => p.source === "x" || p.source === "github").slice(0, 5);

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">
              Strategy and consulting
            </p>
            <h1 className="mt-3 font-display text-3xl leading-[0.9] sm:text-4xl">
              Max
              <br />
              Infeld
            </h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-subtle">
              San Francisco · Chico · Public practice
            </p>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {PROFILE.tagline} Type used by millions. The first art show on Ethereum. Software for
              communities that actually gather.
            </p>
            <div className="mt-8">
              <ConnectButtons />
            </div>
          </div>
          <figure className="relative mx-auto min-w-0 w-full max-w-sm lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-xl border border-border bg-surface p-3">
              <img
                src="/portraits/max.jpg"
                alt="Max Infeld at a laptop, glasses and a cap, working"
                className="aspect-square h-auto w-full max-w-full rounded-md object-cover object-top"
                width={368}
                height={367}
              />
              <figcaption className="mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-subtle">
                <span>Studio portrait</span>
                <span>@maximusmaximus</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="min-w-0 bg-bg px-4 py-6 sm:px-6">
              <p className="font-sans text-2xl font-bold tabular-nums tracking-tight">{s.k}</p>
              <p className="mt-1 text-sm text-muted">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <FlickrExplorer
        photos={feed.flickr?.photos ?? 14136}
        items={feed.flickr?.items ?? []}
        pages={feed.flickr?.pages ?? 1}
        tags={feed.flickr?.tags ?? []}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-wider text-subtle">Practice</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {PRACTICES.map((p) => (
            <li key={p.to}>
              <Link
                to={p.to}
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-150 hover:border-line"
              >
                <span className="font-mono text-xs text-subtle">{p.kicker}</span>
                <h2 className="mt-4 font-display text-3xl tracking-tight">{p.title}</h2>
                <p className="mt-3 flex-1 text-sm text-muted">{p.lede}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-fg">
                  Enter
                  <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <DafontBanner fonts={fonts} />
      <FontsGrokBanner />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <MarisolShelf />
      </section>

      <ChristiesBanner />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="mb-6 font-mono text-xs uppercase tracking-wider text-subtle">Xerographer Media</p>
        <VoidrideAlbum playlists={feed.voidride} />
      </section>

      <AlienWorldsBanner />

      <ProjectBanners />

      <GrokWorksBanners />
      <GithubBanner />

      <section className="border-y border-border bg-surface">
        <blockquote className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="font-sans text-xl italic leading-snug sm:text-2xl">“{QUOTE.text}”</p>
          <footer className="mt-6 font-mono text-xs uppercase tracking-wider text-subtle">{QUOTE.attrib}</footer>
        </blockquote>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-subtle">Now</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">Latest from public sources</h2>
          </div>
          <Link to="/feed" className="hidden text-sm text-muted hover:text-fg sm:inline">
            Full live feed
          </Link>
        </div>
        <FeedList items={latest} />
        <div className="mt-6 sm:hidden">
          <Link to="/feed" className="text-sm text-muted">
            Full live feed
          </Link>
        </div>
      </section>

      <ConnectBand />
    </main>
  );
}
