import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { RECENT_X_IDS, TALKS } from "./profile";
import { decodeEntities, stripTags, titleFromSlug } from "./utils";

export type SourceId = "x" | "github" | "dafont" | "blog" | "youtube" | "flickr";

export type LiveItem = {
  id: string;
  source: SourceId;
  title: string;
  body?: string;
  url: string;
  date?: string;
  meta?: string;
  image?: string;
};

export type XProfile = {
  name: string;
  handle: string;
  bio: string;
  followers: number;
  following: number;
  tweets: number;
  media: number;
  location: string;
  avatar: string;
  banner?: string;
  website?: string;
  joined?: string;
};

export type GithubRepo = {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  updated: string;
  owner: string;
};

export type DafontFont = {
  slug: string;
  name: string;
  downloads?: number;
  yesterday?: number;
  href: string;
};

export type DafontStats = {
  fonts: number;
  downloads: number;
  yesterday?: number;
  latest: DafontFont[];
};

export type FlickrPhoto = {
  id: string;
  title: string;
  thumb: string;
  url: string;
  href: string;
  views?: number;
  taken?: string;
  posted?: string;
  tags: string[];
};

export type FlickrTag = {
  name: string;
  count: number;
  fresh?: boolean;
};

export type FlickrFeed = {
  photos: number;
  views?: number;
  cover?: string;
  items: FlickrPhoto[];
  pages: number;
  tags: FlickrTag[];
};

export type LiveFeed = {
  fetchedAt: string;
  x: XProfile | null;
  posts: LiveItem[];
  github: GithubRepo[];
  dafont: DafontStats | null;
  flickr: FlickrFeed | null;
  voidride: VoidridePlaylist[];
  sourcesOk: SourceId[];
};

export type VoidrideTrack = {
  title: string;
  href: string;
  art: string;
  time: string;
};

export type VoidridePlaylist = {
  id: string;
  title: string;
  href: string;
  cover: string;
  released: string;
  blurb: string;
  tracks: VoidrideTrack[];
};

const UA = "MaxInfeldStudio/1.0 (+https://grok.com; public monograph aggregator)";
const TTL_MS = 30_000;
let cache: { at: number; data: LiveFeed } | null = null;

async function fetchText(
  url: string,
  ms = 8000,
  accept = "text/html,application/xml,application/json",
  ua = UA,
): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": ua, Accept: accept },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

async function fetchJson<T>(url: string, ms = 8000, ua = UA): Promise<T> {
  const text = await fetchText(url, ms, "application/json", ua);
  return JSON.parse(text) as T;
}

function parseCount(raw: string): number {
  return Number(raw.replace(/,/g, ""));
}

async function fetchXProfile(): Promise<XProfile | null> {
  const u = (await fetchJson<{ user?: {
    name: string;
    screen_name: string;
    description: string;
    followers: number;
    following: number;
    tweets: number;
    media_count: number;
    location: string;
    avatar_url: string;
    banner_url?: string;
    website?: { url?: string };
    joined?: string;
  } }>("https://api.fxtwitter.com/maximusmaximus")).user;
  if (!u) return null;
  const avatar = u.avatar_url.replace("_normal", "").replace("_200x200", "");
  return {
    name: u.name,
    handle: u.screen_name,
    bio: u.description,
    followers: u.followers,
    following: u.following,
    tweets: u.tweets,
    media: u.media_count,
    location: u.location,
    avatar,
    banner: u.banner_url,
    website: u.website?.url,
    joined: u.joined,
  };
}

async function fetchXPosts(): Promise<LiveItem[]> {
  const items = await Promise.all(
    RECENT_X_IDS.map(async (id) => {
      const t = (
        await fetchJson<{
          tweet?: {
            id: string;
            text: string;
            created_at: string;
            likes?: number;
            views?: number;
            media?: { photos?: { url: string }[] };
          };
        }>(`https://api.fxtwitter.com/maximusmaximus/status/${id}`, 7000)
      ).tweet;
      if (!t?.text) return null;
      const image = t.media?.photos?.[0]?.url;
      return {
        id: `x-${t.id}`,
        source: "x" as const,
        title: t.text,
        url: `https://x.com/maximusmaximus/status/${t.id}`,
        date: new Date(t.created_at).toISOString(),
        meta: [
          t.likes ? `${t.likes} ${t.likes === 1 ? "like" : "likes"}` : null,
          t.views ? `${t.views} views` : null,
        ]
          .filter(Boolean)
          .join(" · ") || undefined,
        image,
      } satisfies LiveItem;
    }),
  );
  return items.filter((x): x is NonNullable<typeof x> => x !== null);
}

async function fetchGithub(): Promise<{ repos: GithubRepo[]; events: LiveItem[] }> {
  type GhRepo = {
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    fork?: boolean;
    owner: { login: string };
  };
  type GhEvent = {
    id: string;
    type: string;
    created_at: string;
    repo: { name: string };
    payload?: { commits?: { message: string }[]; ref_type?: string };
  };
  const [userRepos, orgRepos, events] = await Promise.all([
    fetchJson<GhRepo[]>("https://api.github.com/users/maximusmaximus/repos?sort=updated&per_page=12"),
    fetchJson<GhRepo[]>("https://api.github.com/orgs/xerographer/repos?sort=updated&per_page=8"),
    fetchJson<GhEvent[]>("https://api.github.com/users/maximusmaximus/events/public?per_page=12"),
  ]);
  const mapRepo = (r: GhRepo): GithubRepo => ({
    name: r.name,
    fullName: r.full_name,
    url: r.html_url,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    updated: r.updated_at,
    owner: r.owner.login,
  });
  const eventItems: LiveItem[] = events.slice(0, 10).map((e) => {
    const commit = e.payload?.commits?.[0]?.message;
    const verb =
      e.type === "PushEvent"
        ? "Pushed"
        : e.type === "CreateEvent"
          ? `Created ${e.payload?.ref_type ?? "repo"}`
          : e.type.replace(/Event$/, "");
    return {
      id: `gh-${e.id}`,
      source: "github",
      title: commit ? `${verb}: ${commit.split("\n")[0]}` : `${verb} on ${e.repo.name}`,
      url: `https://github.com/${e.repo.name}`,
      date: e.created_at,
      meta: e.repo.name,
    };
  });
  return {
    repos: [...userRepos, ...orgRepos]
      .filter((r) => !r.fork)
      .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
      .map(mapRepo),
    events: eventItems,
  };
}

async function fetchDafont(): Promise<DafontStats> {
  const html = await fetchText("https://www.dafont.com/max-infeld.d3584", 10000);
  const stats = html.match(/([\d,]+)\s*fonts[\s\S]{0,40}?([\d,]+)\s*downloads(?:\s*\(([\d,]+)\s*yesterday\))?/i);
  const fonts = stats ? parseCount(stats[1]!) : 0;
  const downloads = stats ? parseCount(stats[2]!) : 0;
  const yesterday = stats?.[3] ? parseCount(stats[3]) : undefined;

  const latest: DafontFont[] = [];
  const seen = new Set<string>();
  const re =
    /href="([a-z0-9-]+)\.font"(?:><strong>([^<]+)<\/strong>)?[\s\S]{0,900}?([\d,]+)\s+downloads(?:\s+\(([\d,]+)\s+yesterday\))?/gi;
  for (const m of html.matchAll(re)) {
    const slug = m[1]!;
    if (seen.has(slug)) continue;
    seen.add(slug);
    latest.push({
      slug,
      name: m[2] ? decodeEntities(m[2]) : titleFromSlug(slug),
      downloads: m[3] ? parseCount(m[3]) : undefined,
      yesterday: m[4] ? parseCount(m[4]) : undefined,
      href: `https://www.dafont.com/${slug}.font`,
    });
    if (latest.length >= 12) break;
  }

  if (!latest.length) {
    for (const m of html.matchAll(/href="([a-z0-9-]+)\.font"/g)) {
      const slug = m[1]!;
      if (seen.has(slug)) continue;
      seen.add(slug);
      latest.push({ slug, name: titleFromSlug(slug), href: `https://www.dafont.com/${slug}.font` });
      if (latest.length >= 12) break;
    }
  }

  return { fonts, downloads, yesterday, latest };
}

async function fetchBlog(): Promise<LiveItem[]> {
  const xml = await fetchText(
    "https://xerographer.blogspot.com/feeds/posts/default",
    10000,
    "application/atom+xml,application/xml",
  );
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 8);
  return entries
    .map((m, i) => {
      const block = m[1]!;
      const title = decodeEntities((block.match(/<title[^>]*>([\s\S]*?)<\/title>/) ?? [])[1] ?? "").trim();
      const link = (block.match(/<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"]/) ??
        block.match(/<link[^>]*href=['"]([^'"]+)['"][^>]*rel=['"]alternate['"]/))?.[1];
      const date = (block.match(/<updated>([^<]+)<\/updated>/) ?? block.match(/<published>([^<]+)<\/published>/))?.[1];
      const summary = stripTags(
        (block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/) ?? block.match(/<content[^>]*>([\s\S]*?)<\/content>/))?.[1] ??
          "",
      ).slice(0, 180);
      if (!title || !link) return null;
      return {
        id: `blog-${i}-${link}`,
        source: "blog" as const,
        title,
        body: summary || undefined,
        url: link,
        date: date ? new Date(date).toISOString() : undefined,
        meta: "Xerographer blog",
      } satisfies LiveItem;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

async function fetchYoutube(): Promise<LiveItem[]> {
  return Promise.all(
    TALKS.map(async (talk) => {
      type Oembed = { title: string; author_name: string; thumbnail_url?: string };
      try {
        const data = await fetchJson<Oembed>(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(talk.href)}&format=json`,
          7000,
        );
        return {
          id: `yt-${talk.id}`,
          source: "youtube" as const,
          title: data.title || talk.title,
          url: talk.href,
          meta: data.author_name || talk.host,
          image: talk.thumb,
        } satisfies LiveItem;
      } catch {
        return {
          id: `yt-${talk.id}`,
          source: "youtube" as const,
          title: talk.title,
          url: talk.href,
          meta: `${talk.host} · ${talk.year}`,
          image: talk.thumb,
        } satisfies LiveItem;
      }
    }),
  );
}

const FLICKR_BLOCK =
  /\b(armpit|porn|spank|breast|nude|nsfw|sex|xxx|x-rated|erotic|naked|fetish|handcuff)\b/i;
const FLICKR_TAG_SKIP =
  /^(https?|www|httpgoogl\w*|max|infeld|maxinfeld|ep[0-9]+|omd?|f[0-9.]+|cmount|nikkor|nikon|canon|olympusxa|olympus|zuiko|rokkor\w*|minolta|yashica|fuji|navitar|wollensak|raptar|silvernose|preai|nonai|m43|mft|microfourthirds?|dslr|camera|lens|auto|digital|scan|duplicator|transparancy|transparency|bellows|inc|com|org|htm|html|jpg|raw|nr|iso\d*|fstop|sharpglass|telephoto|wideangle|prime)$/i;
const FLICKR_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const FLICKR_PHOTO =
  "https://www.flickr.com/photos/maximusmaximus/";

export function isFlickrTagUseful(name: string): boolean {
  const t = name.trim().toLowerCase();
  if (t.length < 3 || t.length > 48) return false;
  if (FLICKR_BLOCK.test(t)) return false;
  if (FLICKR_TAG_SKIP.test(t)) return false;
  if (/^\d+$/.test(t)) return false;
  if (/^\d{2,4}mm$/.test(t) || /inch$/.test(t)) return false;
  if (/^(19|20)\d{2}$/.test(t)) return false;
  return true;
}

function flickrPageUrl(page: number, tag?: string): string {
  if (tag) {
    const base = `${FLICKR_PHOTO}tags/${encodeURIComponent(tag)}/`;
    return page > 1 ? `${base}page${page}` : base;
  }
  return page > 1 ? `${FLICKR_PHOTO}page${page}` : FLICKR_PHOTO;
}

function unescapeFlickrUrl(raw: string): string {
  const path = raw.replace(/\\\//g, "/");
  if (path.startsWith("//")) return `https:${path}`;
  return path;
}

function flickrSizeRank(url: string): number {
  if (/_b\.jpg$/i.test(url)) return 0;
  if (/_c\.jpg$/i.test(url)) return 1;
  if (/_z\.jpg$/i.test(url)) return 2;
  if (!/_[a-z]\.jpg$/i.test(url)) return 3;
  if (/_w\.jpg$/i.test(url)) return 4;
  if (/_n\.jpg$/i.test(url)) return 5;
  if (/_m\.jpg$/i.test(url)) return 6;
  return 9;
}

function decodeFlickrString(raw: string): string {
  try {
    return JSON.parse(`"${raw}"`) as string;
  } catch {
    return raw;
  }
}

/** Public photostream HTML. Flickr's REST key is not available to this site. */
function parseFlickrPhotos(html: string): FlickrPhoto[] {
  const parts = html.split(/"_flickrModelRegistry":"photo(?:-lite)?-models"/).slice(1);
  const items: FlickrPhoto[] = [];
  const seen = new Set<string>();
  for (const chunk of parts) {
    const titleM = chunk.match(/"title":"((?:\\.|[^"\\])*)"/);
    if (!titleM) continue;
    const title = decodeFlickrString(titleM[1] || "Untitled");
    if (FLICKR_BLOCK.test(title)) continue;
    const media = chunk.match(/"mediaType":"([^"]+)"/)?.[1];
    if (media && media !== "photo") continue;
    const safety = Number(chunk.match(/"safetyLevel":(\d+)/)?.[1] ?? 0);
    if (safety >= 1) continue;
    const urls = [...chunk.matchAll(/displayUrl":"([^"]+)"/g)]
      .map((m) => unescapeFlickrUrl(m[1] || ""))
      .filter((u) => u.includes("staticflickr.com") && flickrSizeRank(u) < 9);
    if (!urls.length) continue;
    urls.sort((a, b) => flickrSizeRank(a) - flickrSizeRank(b));
    const large = urls[0]!;
    const thumb = urls.find((u) => /_z\.jpg$/i.test(u)) || urls.find((u) => /_n\.jpg$/i.test(u)) || large;
    const id = large.match(/\/(\d{6,})_/)?.[1];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const taken = chunk.match(/"dateTaken":"([^"]+)"/)?.[1];
    const postedRaw = chunk.match(/"datePosted":"?(\d+)"?/)?.[1];
    const posted = postedRaw ? new Date(Number(postedRaw) * 1000).toISOString() : undefined;
    const views = chunk.match(/"viewCount":(\d+)/)?.[1];
    items.push({
      id,
      title,
      thumb,
      url: large,
      href: `${FLICKR_PHOTO}${id}/`,
      views: views ? Number(views) : undefined,
      taken,
      posted,
      tags: [],
    });
  }
  return items;
}

function hintedPages(html: string): number {
  const nums = [...html.matchAll(/\/page(\d+)/g)]
    .map((m) => Number(m[1]))
    .filter((n) => n > 0 && n < 2000);
  return nums.length ? Math.max(...nums) : 1;
}

function flickrStreamPages(html: string, page: number, itemCount: number): number {
  const hinted = hintedPages(html);
  if (itemCount === 0) return Math.max(1, hinted, page - 1);
  if (hinted > page) return hinted;
  // A full page with no later page link may still have older photos.
  if (itemCount >= 12) return page + 1;
  return Math.max(hinted, page);
}

async function fetchFlickrHtml(page: number, tag?: string): Promise<string> {
  return fetchText(flickrPageUrl(page, tag), 14000, "text/html", FLICKR_UA);
}

async function flickrHtmlHaul(tag?: string): Promise<{ items: FlickrPhoto[]; page: number; pages: number }> {
  const firstHtml = await fetchFlickrHtml(1, tag);
  const hinted = hintedPages(firstHtml);
  const cap = tag ? Math.max(hinted, 20) : Math.min(Math.max(hinted, 1), 142);
  const pick = 1 + Math.floor(Math.random() * cap);
  let items = parseFlickrPhotos(firstHtml);
  if (pick !== 1) {
    try {
      const more = parseFlickrPhotos(await fetchFlickrHtml(pick, tag));
      if (more.length) items = more;
    } catch {
      /* page 1 already loaded */
    }
  }
  return { items: shuffleInPlace(items).slice(0, 18), page: pick, pages: cap };
}

type FlickrTagIndex = { at: number; names: string[] };
let flickrTagIndexCache: FlickrTagIndex | null = null;
const FLICKR_TAG_PAGE = 72;

async function loadFlickrTagIndex(): Promise<FlickrTagIndex> {
  const now = Date.now();
  if (flickrTagIndexCache && now - flickrTagIndexCache.at < 10 * 60 * 1000) return flickrTagIndexCache;
  const html = await fetchText(`${FLICKR_PHOTO}tags/`, 20000, "text/html", FLICKR_UA);
  const seen = new Set<string>();
  const names: string[] = [];
  for (const m of html.matchAll(/\/photos\/maximusmaximus\/tags\/([^/"?#\s]+)/g)) {
    let name = m[1] || "";
    try {
      name = decodeURIComponent(name);
    } catch {
      /* keep raw */
    }
    name = name.trim().toLowerCase();
    if (!name || seen.has(name) || !isFlickrTagUseful(name)) continue;
    seen.add(name);
    names.push(name);
  }
  names.sort((a, b) => a.localeCompare(b));
  if (!names.length) throw new Error("flickr tags empty");
  flickrTagIndexCache = { at: now, names };
  return flickrTagIndexCache;
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = a;
  }
  return arr;
}

export const getFlickrTagBrowse = createServerFn({ method: "POST" })
  .validator(
    z.object({
      q: z.string().max(48).optional(),
      letter: z.string().max(2).optional(),
      page: z.number().int().min(1).max(800).optional(),
      limit: z.number().int().min(1).max(500).optional(),
    }),
  )
  .handler(async ({ data }): Promise<{ tags: FlickrTag[]; total: number; page: number; pages: number }> => {
    const index = await loadFlickrTagIndex();
    const q = data.q?.trim().toLowerCase() ?? "";
    const letter = data.letter?.trim().toLowerCase() ?? "";
    let list = index.names;
    if (letter === "#") list = list.filter((n) => /^[0-9]/.test(n));
    else if (letter) list = list.filter((n) => n.startsWith(letter));
    if (q) list = list.filter((n) => n.includes(q));
    const total = list.length;
    const size = data.limit ?? FLICKR_TAG_PAGE;
    const pages = Math.max(1, Math.ceil(total / size));
    const page = Math.min(Math.max(1, data.page ?? 1), pages);
    const start = (page - 1) * size;
    return {
      tags: list.slice(start, start + size).map((name) => ({
        name,
        count: 1,
      })),
      total,
      page,
      pages,
    };
  });

function tagHash(name: string): number {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Mix the heaviest tags with a spread of the long tail so the cloud is not just the top hits. */
export function spreadFlickrTags(tags: FlickrTag[], limit = 64): FlickrTag[] {
  const seen = new Set<string>();
  const unique = tags.filter((t) => {
    if (!t.name || seen.has(t.name) || !isFlickrTagUseful(t.name)) return false;
    seen.add(t.name);
    return true;
  });
  const ranked = [...unique].sort((a, b) => b.count - a.count);
  const pool = ranked.length <= limit ? ranked : (() => {
    const headN = Math.min(16, Math.floor(limit * 0.3));
    const head = ranked.slice(0, headN);
    const rest = ranked.slice(headN);
    const need = limit - head.length;
    const picked: FlickrTag[] = [];
    if (rest.length <= need) picked.push(...rest);
    else {
      const step = rest.length / need;
      for (let i = 0; i < need; i++) picked.push(rest[Math.floor(i * step)]!);
    }
    return [...head, ...picked];
  })();
  return pool.sort((a, b) => tagHash(a.name) - tagHash(b.name));
}

export function mergeFlickrTags(base: FlickrTag[], photos: FlickrPhoto[]): FlickrTag[] {
  const map = new Map<string, FlickrTag>();
  for (const t of base) map.set(t.name, { ...t, fresh: false });
  for (const p of photos) {
    for (const name of p.tags) {
      if (map.has(name)) continue;
      map.set(name, { name, count: 1, fresh: true });
    }
  }
  return [...map.values()].sort((a, b) => {
    if (!!a.fresh !== !!b.fresh) return a.fresh ? -1 : 1;
    return b.count - a.count;
  });
}

async function fetchFlickrHome(): Promise<FlickrFeed> {
  const [stream, about] = await Promise.allSettled([
    fetchFlickrHtml(1),
    fetchText("https://www.flickr.com/people/maximusmaximus/", 12000, "text/html", FLICKR_UA),
  ]);
  const html = stream.status === "fulfilled" ? stream.value : "";
  const aboutHtml = about.status === "fulfilled" ? about.value : "";
  const items = html ? parseFlickrPhotos(html) : [];
  const countMatch = `${html}\n${aboutHtml}`.match(/"photoCount":(\d+)/);
  const photos = countMatch ? Number(countMatch[1]) : 14136;
  const viewsMatch = aboutHtml.match(/"totalViews"\s*:\s*(\d+)/);
  const views = viewsMatch ? Number(viewsMatch[1]) : 1_861_927;

  return {
    photos,
    views,
    cover: items[0]?.url || "/media/flickr-cover.jpg",
    items,
    pages: html ? hintedPages(html) : 1,
    tags: [],
  };
}

async function fetchFlickrTags(): Promise<FlickrTag[]> {
  const index = await loadFlickrTagIndex();
  return index.names.map((name) => ({ name, count: 1 }));
}

export const getFlickrTags = createServerFn({ method: "GET" }).handler(async (): Promise<FlickrTag[]> => {
  try {
    return await fetchFlickrTags();
  } catch {
    return [];
  }
});

export const getFlickrPage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      tag: z.string().max(48).optional(),
      random: z.boolean().optional(),
      page: z.number().int().min(1).max(400).optional(),
    }),
  )
  .handler(
    async ({
      data,
    }): Promise<{ items: FlickrPhoto[]; page: number; pages: number; tags: FlickrTag[] }> => {
      try {
        const tag = data.tag?.trim().toLowerCase() || undefined;
        if (data.random) {
          const haul = await flickrHtmlHaul(tag);
          return { items: haul.items, page: haul.page, pages: haul.pages, tags: [] };
        }
        const page = data.page ?? 1;
        const html = await fetchFlickrHtml(page, tag);
        const items = parseFlickrPhotos(html);
        return {
          items,
          page,
          pages: flickrStreamPages(html, page, items.length),
          tags: [],
        };
      } catch {
        return { items: [], page: 1, pages: 1, tags: [] };
      }
    },
  );

function emptyFeed(): LiveFeed {
  return {
    fetchedAt: new Date().toISOString(),
    x: null,
    posts: [],
    github: [],
    dafont: null,
    flickr: null,
    voidride: [],
    sourcesOk: [],
  };
}

async function assemble(): Promise<LiveFeed> {
  const feed = emptyFeed();
  const [x, tweets, github, dafont, blog, youtube, flickr, voidride] = await Promise.allSettled([
    fetchXProfile(),
    fetchXPosts(),
    fetchGithub(),
    fetchDafont(),
    fetchBlog(),
    fetchYoutube(),
    fetchFlickrHome(),
    loadVoidride(),
  ]);

  if (x.status === "fulfilled" && x.value) {
    feed.x = x.value;
    feed.sourcesOk.push("x");
  }
  if (tweets.status === "fulfilled") {
    feed.posts.push(...tweets.value);
    if (tweets.value.length) feed.sourcesOk.push("x");
  }
  if (github.status === "fulfilled") {
    feed.github = github.value.repos;
    feed.posts.push(...github.value.events);
    feed.sourcesOk.push("github");
  }
  if (dafont.status === "fulfilled") {
    feed.dafont = dafont.value;
    feed.sourcesOk.push("dafont");
    feed.posts.push(
      ...dafont.value.latest.slice(0, 6).map((f) => ({
        id: `df-${f.slug}`,
        source: "dafont" as const,
        title: f.name,
        url: f.href,
        meta: f.downloads ? `${f.downloads.toLocaleString("en-US")} downloads` : "Xerographer on DaFont",
      })),
    );
  }
  if (blog.status === "fulfilled") {
    feed.posts.push(...blog.value);
    if (blog.value.length) feed.sourcesOk.push("blog");
  }
  if (youtube.status === "fulfilled") {
    feed.posts.push(...youtube.value);
    feed.sourcesOk.push("youtube");
  }
  if (flickr.status === "fulfilled" && flickr.value) {
    feed.flickr = flickr.value;
    feed.sourcesOk.push("flickr");
  }
  if (voidride.status === "fulfilled") feed.voidride = voidride.value;

  feed.sourcesOk = [...new Set(feed.sourcesOk)];
  feed.posts.sort((a, b) => {
    const da = a.date ? +new Date(a.date) : 0;
    const db = b.date ? +new Date(b.date) : 0;
    return db - da;
  });
  feed.fetchedAt = new Date().toISOString();
  return feed;
}

export const getLiveFeed = createServerFn({ method: "GET" }).handler(async (): Promise<LiveFeed> => {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.data;
  try {
    const data = await assemble();
    cache = { at: now, data };
    return data;
  } catch {
    return cache?.data ?? emptyFeed();
  }
});

const SC_BROWSER = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
let voidrideCache: { at: number; data: VoidridePlaylist[] } | null = null;

function scArt(url: string | null | undefined): string {
  if (!url) return "/media/voidride-cover.jpg";
  return url.replace(/-(large|t\d+x\d+|original|badge|small|tiny|mini)(?=\.)/, "-t500x500");
}

function scTime(ms: number): string {
  const sec = Math.max(0, Math.round((ms || 0) / 1000));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

async function fetchVoidridePlaylists(): Promise<VoidridePlaylist[]> {
  const html = await fetchText("https://soundcloud.com/ridethevoid/sets", 10000, "text/html", SC_BROWSER);
  const id = html.match(/"hydratable":"apiClient","data":\{"id":"([A-Za-z0-9]+)"/)?.[1];
  if (!id) throw new Error("soundcloud client id missing");
  const user = await fetchJson<{ id: number }>(
    `https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent("https://soundcloud.com/ridethevoid")}&client_id=${id}`,
    10000,
    SC_BROWSER,
  );
  const sets = await fetchJson<{
    collection?: {
      id: number;
      title?: string;
      permalink_url?: string;
      artwork_url?: string | null;
      created_at?: string;
      description?: string | null;
      tracks?: {
        title?: string;
        permalink_url?: string;
        artwork_url?: string | null;
        duration?: number;
      }[];
    }[];
  }>(
    `https://api-v2.soundcloud.com/users/${user.id}/playlists?client_id=${id}&limit=50&linked_partitioning=1&representation=full`,
    14000,
    SC_BROWSER,
  );
  return (sets.collection ?? [])
    .filter((p) => p.title && p.permalink_url && p.created_at)
    .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
    .map((p) => {
      const tracks = (p.tracks ?? [])
        .filter((t) => t.title && t.permalink_url)
        .map((t) => ({
          title: t.title!,
          href: t.permalink_url!,
          art: scArt(t.artwork_url || p.artwork_url),
          time: scTime(t.duration ?? 0),
        }));
      const released = new Date(p.created_at!).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
      return {
        id: String(p.id),
        title: p.title!,
        href: p.permalink_url!,
        cover: scArt(p.artwork_url),
        released,
        blurb: (p.description || "Xerographer Media").replace(/\s+/g, " ").trim(),
        tracks,
      };
    })
    .filter((p) => p.tracks.length > 0);
}

export async function loadVoidride(): Promise<VoidridePlaylist[]> {
  const now = Date.now();
  if (voidrideCache && now - voidrideCache.at < 60_000) return voidrideCache.data;
  const data = await fetchVoidridePlaylists();
  voidrideCache = { at: now, data };
  return data;
}

export const getVoidride = createServerFn({ method: "GET" }).handler(async (): Promise<VoidridePlaylist[]> => {
  try {
    return await loadVoidride();
  } catch {
    return [];
  }
});
