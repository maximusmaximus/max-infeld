import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisplayTitle } from "@/components/display-title";
import { cn } from "@/lib/utils";

const LOT = "https://www.christies.com/en/lot/lot-6337619";

const CARDS = [
  { number: 1, label: "1", title: "Apples", artist: "Phneep" },
  { number: 2, label: "2", title: "Nuts", artist: "Phneep" },
  { number: 3, label: "3", title: "Berries", artist: "Phneep" },
  { number: 4, label: "4", title: "Clay", artist: "Phneep" },
  { number: 5, label: "5", title: "Paint", artist: "Phneep" },
  { number: 6, label: "6", title: "Ink", artist: "Phneep" },
  { number: 7, label: "7", title: "Sculpture", artist: "Phneep" },
  { number: 8, label: "8", title: "Painting", artist: "Phneep" },
  { number: 9, label: "9", title: "Book", artist: "Phneep" },
  { number: 10, label: "10", title: "Future", artist: "Phneep" },
  { number: 11, label: "11", title: "BTC Keys", artist: "Cryptograffiti" },
  { number: 12, label: "12", title: "Mine Bitcoin", artist: "Cryptograffiti" },
  { number: 13, label: "13", title: "BTC", artist: "Cryptograffiti" },
  { number: 14, label: "14", title: "CryptoCurrency", artist: "Phneep" },
  { number: 15, label: "15", title: "DigitalCash", artist: "Phneep" },
  { number: 16, label: "16", title: "OriginalCoin", artist: "Phneep" },
  { number: 17, label: "17", title: "UASF", artist: "Cryptopop" },
  { number: 18, label: "18", title: "To The Moon", artist: "Cryptopop" },
  { number: 19, label: "19", title: "Dogs Trading", artist: "Cryptopop" },
  { number: 20, label: "20", title: "MadBitcoins", artist: "Phneep" },
  { number: 21, label: "21", title: "The Wizard", artist: "Robek World" },
  { number: 22, label: "22", title: "The Bard", artist: "Robek World" },
  { number: 23, label: "23", title: "The Barbarian", artist: "Robek World" },
  { number: 24, label: "24", title: "Complexity", artist: "Daniel Friedman" },
  { number: 25, label: "25", title: "Passion", artist: "Daniel Friedman" },
  { number: 26, label: "26", title: "Education", artist: "Daniel Friedman" },
  { number: 27, label: "27", title: "Blue", artist: "Marisol Vengas" },
  { number: 28, label: "28", title: "Pink", artist: "Marisol Vengas" },
  { number: 29, label: "29", title: "Yellow", artist: "Marisol Vengas" },
  { number: 30, label: "30", title: "Eclipse", artist: "Thoros of Myr" },
] as const;

const LINKS = [
  { href: LOT, label: "Christie's lot" },
  {
    href: "https://www.christies.com/en/auction/post-war-to-present-the-nfts-29731/",
    label: "Post-War to Present: The NFTs",
  },
  {
    href: "https://metaverse.sothebys.com/natively-digital/lots/curio-cards-complete-set-1-30-plus-17b",
    label: "Sotheby's Natively Digital 1.2",
  },
  {
    href: "https://medium.com/@curiocards/becoming-marisol-vengas-max-infelds-million-dollar-social-engagement-art-c5024892e898",
    label: "Becoming Marisol Vengas",
  },
  {
    href: "https://chico.newsreview.com/artsculture/arts-devo-totally-cool-6c9351bb",
    label: "Chico News & Review",
  },
] as const;

const MARISOL = new Set([27, 28, 29]);

export function ChristiesBanner({ framed }: { framed?: boolean }) {
  return (
    <section className={cn(framed ? "overflow-hidden rounded-xl border border-border" : "")}>
      <div className={cn("bg-black text-white", framed ? "" : "border-y border-border")}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/60">
              Christie's New York · 1 October 2021
            </p>
            <DisplayTitle className="mt-2 text-4xl text-white">CURIO CARDS</DisplayTitle>
            <p className="mt-3 font-sans text-3xl font-bold tracking-tight">393 ETH</p>
            <p className="mt-3 max-w-md text-sm text-white/80">
              Full set of 30 cards plus misprint 17b. The first collection sold at Christie's with
              live bidding in Ether. Cards 27, 28, and 29 — Blue, Pink, Yellow — are by Marisol
              Vengas.
            </p>
            <div className="mt-5">
              <Button asChild>
                <a href={LOT} target="_blank" rel="noreferrer">
                  View the lot
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <p className="max-w-xl text-sm text-white/70 lg:pb-1">
            Estimate $805,548–$1,127,767. Hammer in the Post-War to Present sale. The same month a
            complete set sold at Sotheby's Natively Digital 1.2: The Collectors.
          </p>
        </div>
        <ul className="mx-auto grid max-w-6xl grid-cols-4 gap-1 px-4 pb-6 sm:grid-cols-6 sm:px-6 lg:grid-cols-8">
          {CARDS.map((c) => (
            <li key={c.number}>
              <figure
                className={cn(
                  "overflow-hidden bg-white/5",
                  MARISOL.has(c.number) && "ring-2 ring-white",
                )}
              >
                <img
                  src={`/media/curio/${c.number}.jpg`}
                  alt={`${c.label}. ${c.title} by ${c.artist}`}
                  className="aspect-[3/4] h-auto w-full max-w-full object-cover"
                  width={315}
                  height={420}
                />
              </figure>
              <p className="mt-1 truncate px-0.5 font-mono text-[10px] uppercase tracking-wider text-white/55">
                {c.label}
                {MARISOL.has(c.number) ? " · Marisol" : ""}
              </p>
            </li>
          ))}
          <li>
            <figure className="grid aspect-[3/4] place-items-center bg-white/10 px-2 text-center">
              <span>
                <span className="block font-sans text-lg font-bold">17b</span>
                <span className="mt-1 block text-[10px] uppercase tracking-wider text-white/60">
                  Misprint in the lot
                </span>
              </span>
            </figure>
          </li>
        </ul>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border bg-surface px-4 py-3 sm:px-6">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-xs text-muted hover:text-fg"
            >
              {l.label}
              <ArrowUpRight className="size-3" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
