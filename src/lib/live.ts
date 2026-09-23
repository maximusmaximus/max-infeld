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
  sourcesOk: SourceId[];
};

const UA = "MaxInfeldStudio/1.0 (+https://grok.com; public monograph aggregator)";
const TTL_MS = 30_000;
let cache: { at: number; data: LiveFeed } | null = null;

async function fetchText(url: string, ms = 8000, accept = "text/html,application/xml,application/json"): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: accept },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

async function fetchJson<T>(url: string, ms = 8000): Promise<T> {
  const text = await fetchText(url, ms, "application/json");
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

const FLICKR_KEY = "57f7bcf7c339a0d7e2c852c919d5c3b0";
const FLICKR_NSID = "11706974@N08";
const FLICKR_BLOCK =
  /\b(armpit|porn|spank|breast|nude|nsfw|sex|xxx|x-rated|erotic|naked|fetish|handcuff)\b/i;
const FLICKR_TAG_SKIP =
  /^(https?|www|httpgoogl\w*|max|infeld|maxinfeld|ep[0-9]+|omd?|f[0-9.]+|cmount|nikkor|nikon|canon|olympusxa|olympus|zuiko|rokkor\w*|minolta|yashica|fuji|navitar|wollensak|raptar|silvernose|preai|nonai|m43|mft|microfourthirds?|dslr|camera|lens|auto|digital|scan|duplicator|transparancy|transparency|bellows|inc|com|org|htm|html|jpg|raw|nr|iso\d*|fstop|sharpglass|telephoto|wideangle|prime)$/i;
const FLICKR_EXTRAS = "url_l,url_c,url_z,url_m,date_taken,views,media,safety_level,tags";

type FlickrApiPhoto = {
  id: string;
  title: string;
  media?: string;
  safe?: number | string;
  safety_level?: number | string;
  views?: string | number;
  datetaken?: string;
  tags?: string;
  url_l?: string;
  url_c?: string;
  url_z?: string;
  url_m?: string;
};

type FlickrRest<T> = T & { stat?: string };

function flickrUrl(method: string, params: Record<string, string | number>): string {
  const q = new URLSearchParams({
    method,
    api_key: FLICKR_KEY,
    format: "json",
    nojsoncallback: "1",
  });
  for (const [k, v] of Object.entries(params)) q.set(k, String(v));
  return `https://api.flickr.com/services/rest/?${q.toString()}`;
}

export function isFlickrTagUseful(name: string): boolean {
  const t = name.trim().toLowerCase();
  if (t.length < 3 || t.length > 32) return false;
  if (FLICKR_BLOCK.test(t)) return false;
  if (FLICKR_TAG_SKIP.test(t)) return false;
  if (/^\d+$/.test(t)) return false;
  if (/^\d{2,4}mm$/.test(t) || /inch$/.test(t)) return false;
  if (/^(19|20)\d{2}$/.test(t)) return false;
  return true;
}

function parsePhotoTags(raw?: string): string[] {
  if (!raw) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const part of raw.split(/\s+/)) {
    const t = part.trim().toLowerCase();
    if (!isFlickrTagUseful(t) || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out.slice(0, 12);
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

function mapFlickrPhoto(p: FlickrApiPhoto): FlickrPhoto | null {
  if (Number(p.safety_level ?? 0) >= 1) return null;
  if (p.media && p.media !== "photo") return null;
  if (FLICKR_BLOCK.test(p.title || "")) return null;
  const large = p.url_l || p.url_c || p.url_z;
  const thumb = p.url_c || p.url_z || p.url_m || large;
  if (!large || !thumb) return null;
  return {
    id: p.id,
    title: p.title || "Untitled",
    thumb,
    url: large,
    href: `https://www.flickr.com/photos/maximusmaximus/${p.id}/`,
    views: p.views ? Number(p.views) : undefined,
    taken: p.datetaken,
    tags: parsePhotoTags(p.tags),
  };
}

async function flickrSearch(params: Record<string, string | number>): Promise<{
  items: FlickrPhoto[];
  page: number;
  pages: number;
}> {
  const data = await fetchJson<
    FlickrRest<{ photos?: { photo?: FlickrApiPhoto[]; page?: number; pages?: number } }>
  >(
    flickrUrl("flickr.photos.search", {
      user_id: FLICKR_NSID,
      extras: FLICKR_EXTRAS,
      content_type: 1,
      media: "photos",
      per_page: 24,
      ...params,
    }),
    9000,
  );
  const items = (data.photos?.photo ?? []).map(mapFlickrPhoto).filter((x): x is FlickrPhoto => x !== null);
  return {
    items,
    page: Number(data.photos?.page ?? 1),
    pages: Number(data.photos?.pages ?? 1),
  };
}

async function flickrRandomHaul(tag?: string): Promise<{ items: FlickrPhoto[]; page: number; pages: number }> {
  const params: Record<string, string | number> = {
    sort: tag ? "interestingness-desc" : "date-posted-desc",
    safe_search: 1,
  };
  if (tag) {
    params.tags = tag;
    params.tag_mode = "all";
  }
  const first = await flickrSearch({ ...params, page: 1 });
  const cap = Math.max(1, Math.min(first.pages, 80));
  const pick = 1 + Math.floor(Math.random() * cap);
  let haul = pick === 1 ? first : await flickrSearch({ ...params, page: pick });
  if (!haul.items.length && pick !== 1) haul = first;
  return { ...haul, items: shuffleInPlace([...haul.items]) };
}

async function fetchFlickrTags(): Promise<FlickrTag[]> {
  const data = await fetchJson<
    FlickrRest<{ who?: { tags?: { tag?: { _content?: string; count?: string | number }[] } } }>
  >(flickrUrl("flickr.tags.getListUserPopular", { user_id: FLICKR_NSID, count: 200 }), 8000);
  const raw = data.who?.tags?.tag ?? [];
  return raw
    .map((t) => ({
      name: (t._content ?? "").trim().toLowerCase(),
      count: Number(t.count ?? 0),
    }))
    .filter((t) => t.name && t.count > 0 && isFlickrTagUseful(t.name))
    .sort((a, b) => b.count - a.count)
    .slice(0, 48);
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
  const [info, haul, tags, about] = await Promise.allSettled([
    fetchJson<
      FlickrRest<{
        person?: {
          photos?: { count?: { _content?: string | number } };
          coverphoto_url?: { h?: string; l?: string };
        };
      }>
    >(flickrUrl("flickr.people.getInfo", { user_id: FLICKR_NSID }), 8000),
    flickrRandomHaul(),
    fetchFlickrTags(),
    fetchText("https://www.flickr.com/people/maximusmaximus/", 8000),
  ]);

  const person = info.status === "fulfilled" ? info.value.person : undefined;
  const photos = Number(person?.photos?.count?._content ?? 14136);
  const cover = person?.coverphoto_url?.h || person?.coverphoto_url?.l;
  const viewsMatch =
    about.status === "fulfilled" ? about.value.match(/"totalViews"\s*:\s*(\d+)/) : null;
  const views = viewsMatch ? Number(viewsMatch[1]) : 1_837_359;
  const items = haul.status === "fulfilled" ? haul.value.items.slice(0, 16) : [];
  const tagList = tags.status === "fulfilled" ? tags.value : [];
  const remoteCover = cover
    ? (cover.startsWith("//") ? `https:${cover}` : cover).split("#")[0]
    : undefined;

  return {
    photos,
    views,
    cover: remoteCover || "/media/flickr-cover.jpg",
    items,
    pages: haul.status === "fulfilled" ? haul.value.pages : Math.max(1, Math.ceil(photos / 24)),
    tags: mergeFlickrTags(tagList, items),
  };
}

export const getFlickrTags = createServerFn({ method: "GET" }).handler(async (): Promise<FlickrTag[]> => {
  return fetchFlickrTags();
});

export const getFlickrPage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      tag: z.string().max(40).optional(),
      random: z.boolean().optional(),
      page: z.number().int().min(1).max(400).optional(),
    }),
  )
  .handler(
    async ({
      data,
    }): Promise<{ items: FlickrPhoto[]; page: number; pages: number; tags: FlickrTag[] }> => {
      const tag = data.tag?.trim().toLowerCase() || undefined;
      const haul =
        data.random || !data.page
          ? await flickrRandomHaul(tag)
          : await flickrSearch({
              page: data.page,
              sort: "interestingness-desc",
              ...(tag ? { tags: tag, tag_mode: "all" } : {}),
            });
      return {
        items: haul.items,
        page: haul.page,
        pages: haul.pages,
        tags: mergeFlickrTags([], haul.items).filter((t) => t.fresh),
      };
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
    sourcesOk: [],
  };
}

async function assemble(): Promise<LiveFeed> {
  const feed = emptyFeed();
  const [x, tweets, github, dafont, blog, youtube, flickr] = await Promise.allSettled([
    fetchXProfile(),
    fetchXPosts(),
    fetchGithub(),
    fetchDafont(),
    fetchBlog(),
    fetchYoutube(),
    fetchFlickrHome(),
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
