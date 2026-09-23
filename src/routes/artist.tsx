import { createFileRoute } from "@tanstack/react-router";
import { DisplayTitle } from "@/components/display-title";
import { MarisolShelf } from "@/components/marisol-shelf";
import { VoidrideAlbum } from "@/components/voidride-album";
import { VmuBook } from "@/components/vmu-book";
import { FoundFlyers } from "@/components/found-flyers";
import { MarisolBook } from "@/components/marisol-book";
import { GrokWorksBanners } from "@/components/grok-works-banners";
import { ChristiesBanner } from "@/components/christies-banner";
import { TALKS } from "@/lib/profile";

export const Route = createFileRoute("/artist")({
  component: Artist,
});

function Artist() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">Artist</p>
      <DisplayTitle as="h1" className="mt-3 max-w-3xl text-3xl tracking-tight">
        Socially distributed art — work that only exists when other people pick it up.
      </DisplayTitle>
      <p className="mt-6 max-w-2xl text-muted">
        Max trained as a printmaker and social-practice artist at Chico State after walking away from
        sterile computer science. The through-line is interaction: scavenger hunts, gift currencies,
        collaborative production lines, and NFTs that are receipts for physical, communal objects.
      </p>

      <figure className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
        <img
          src="/media/marisol-trio.jpg"
          alt="Original scan of Blue 27, Pink 28, and Yellow 29"
          className="aspect-[6/7] h-auto w-full max-w-full object-cover sm:aspect-video"
        />
        <figcaption className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-subtle">
          Original scan — Blue 27, Pink 28, Yellow 29
        </figcaption>
      </figure>

      <section className="mt-14">
        <VmuBook />
      </section>

      <section className="mt-14">
        <article>
          <DisplayTitle className="text-2xl tracking-tight">Marisol Vengas</DisplayTitle>
          <p className="mt-3 text-muted">
            A studio alias, not a disguise. Under this name Max ran a high-frequency production method:
            scripts pulling thousands of building photographs, cheap foamcore instead of precious
            substrates, friends coloring in a café, acetate branches, duct-tape seals. Art as a crew,
            not a signature. About a quarter a piece — on purpose.
          </p>
        </article>
        <div className="mt-6">
          <MarisolBook />
        </div>
      </section>

      <section className="mt-14">
        <MarisolShelf />
      </section>

      <section className="mt-14">
        <FoundFlyers />
      </section>

      <section className="mt-14">
        <ChristiesBanner framed />
        <p className="mt-4 text-sm text-muted">
          See the collection on{" "}
          <a className="underline decoration-border underline-offset-4" href="https://curio.cards" target="_blank" rel="noreferrer">
            curio.cards
          </a>{" "}
          and the physical originals at{" "}
          <a
            className="underline decoration-border underline-offset-4"
            href="https://marisolvengas.com/collections/blue-27-pink-28-yellow-29"
            target="_blank"
            rel="noreferrer"
          >
            marisolvengas.com
          </a>
          .
        </p>
      </section>

      <section className="mt-14">
        <p className="mb-6 font-mono text-xs uppercase tracking-wider text-subtle">Live work</p>
        <GrokWorksBanners framed />
      </section>

      <section className="mt-14">
        <p className="mb-6 font-mono text-xs uppercase tracking-wider text-subtle">Xerographer Media</p>
        <VoidrideAlbum />
      </section>

      <section className="mt-14">
        <DisplayTitle className="text-2xl tracking-tight">In conversation</DisplayTitle>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {TALKS.map((t) => (
            <li key={t.id}>
              <a
                href={t.href}
                target="_blank"
                rel="noreferrer"
                className="flex gap-4 rounded-lg border border-border bg-surface p-3 transition-colors duration-150 hover:border-line"
              >
                <img src={t.thumb} alt="" className="h-20 w-32 shrink-0 rounded-sm object-cover" />
                <span className="min-w-0">
                  <span className="block text-sm text-fg">{t.title}</span>
                  <span className="mt-1 block font-mono text-xs text-muted">
                    {t.host} · {t.year}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
