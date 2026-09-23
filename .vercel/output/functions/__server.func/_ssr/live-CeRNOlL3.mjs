import { _ as stripTags, f as TALKS, h as decodeEntities, u as RECENT_X_IDS, v as titleFromSlug } from "./utils-6xH_rjpQ.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-CeRNOlL3.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var UA = "MaxInfeldStudio/1.0 (+https://grok.com; public monograph aggregator)";
var TTL_MS = 9e4;
var cache = null;
async function fetchText(url, ms = 8e3, accept = "text/html,application/xml,application/json") {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), ms);
	try {
		const res = await fetch(url, {
			signal: ctrl.signal,
			headers: {
				"User-Agent": UA,
				Accept: accept
			},
			redirect: "follow"
		});
		if (!res.ok) throw new Error(`${res.status} ${url}`);
		return await res.text();
	} finally {
		clearTimeout(t);
	}
}
async function fetchJson(url, ms = 8e3) {
	const text = await fetchText(url, ms, "application/json");
	return JSON.parse(text);
}
function parseCount(raw) {
	return Number(raw.replace(/,/g, ""));
}
async function fetchXProfile() {
	const u = (await fetchJson("https://api.fxtwitter.com/maximusmaximus")).user;
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
		joined: u.joined
	};
}
async function fetchXPosts() {
	return (await Promise.all(RECENT_X_IDS.map(async (id) => {
		const t = (await fetchJson(`https://api.fxtwitter.com/maximusmaximus/status/${id}`, 7e3)).tweet;
		if (!t?.text) return null;
		const image = t.media?.photos?.[0]?.url;
		return {
			id: `x-${t.id}`,
			source: "x",
			title: t.text,
			url: `https://x.com/maximusmaximus/status/${t.id}`,
			date: new Date(t.created_at).toISOString(),
			meta: [t.likes ? `${t.likes} ${t.likes === 1 ? "like" : "likes"}` : null, t.views ? `${t.views} views` : null].filter(Boolean).join(" · ") || void 0,
			image
		};
	}))).filter((x) => x !== null);
}
async function fetchGithub() {
	const [userRepos, orgRepos, events] = await Promise.all([
		fetchJson("https://api.github.com/users/maximusmaximus/repos?sort=updated&per_page=12"),
		fetchJson("https://api.github.com/orgs/xerographer/repos?sort=updated&per_page=8"),
		fetchJson("https://api.github.com/users/maximusmaximus/events/public?per_page=12")
	]);
	const mapRepo = (r) => ({
		name: r.name,
		fullName: r.full_name,
		url: r.html_url,
		description: r.description,
		language: r.language,
		stars: r.stargazers_count,
		updated: r.updated_at,
		owner: r.owner.login
	});
	return {
		repos: [...userRepos, ...orgRepos].filter((r) => !r.fork).sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)).map(mapRepo),
		events: events.slice(0, 10).map((e) => {
			const commit = e.payload?.commits?.[0]?.message;
			const verb = e.type === "PushEvent" ? "Pushed" : e.type === "CreateEvent" ? `Created ${e.payload?.ref_type ?? "repo"}` : e.type.replace(/Event$/, "");
			return {
				id: `gh-${e.id}`,
				source: "github",
				title: commit ? `${verb}: ${commit.split("\n")[0]}` : `${verb} on ${e.repo.name}`,
				url: `https://github.com/${e.repo.name}`,
				date: e.created_at,
				meta: e.repo.name
			};
		})
	};
}
async function fetchDafont() {
	const html = await fetchText("https://www.dafont.com/max-infeld.d3584", 1e4);
	const stats = html.match(/([\d,]+)\s*fonts[\s\S]{0,40}?([\d,]+)\s*downloads(?:\s*\(([\d,]+)\s*yesterday\))?/i);
	const fonts = stats ? parseCount(stats[1]) : 0;
	const downloads = stats ? parseCount(stats[2]) : 0;
	const yesterday = stats?.[3] ? parseCount(stats[3]) : void 0;
	const latest = [];
	const seen = /* @__PURE__ */ new Set();
	for (const m of html.matchAll(/href="([a-z0-9-]+)\.font"(?:><strong>([^<]+)<\/strong>)?[\s\S]{0,900}?([\d,]+)\s+downloads(?:\s+\(([\d,]+)\s+yesterday\))?/gi)) {
		const slug = m[1];
		if (seen.has(slug)) continue;
		seen.add(slug);
		latest.push({
			slug,
			name: m[2] ? decodeEntities(m[2]) : titleFromSlug(slug),
			downloads: m[3] ? parseCount(m[3]) : void 0,
			yesterday: m[4] ? parseCount(m[4]) : void 0,
			href: `https://www.dafont.com/${slug}.font`
		});
		if (latest.length >= 12) break;
	}
	if (!latest.length) for (const m of html.matchAll(/href="([a-z0-9-]+)\.font"/g)) {
		const slug = m[1];
		if (seen.has(slug)) continue;
		seen.add(slug);
		latest.push({
			slug,
			name: titleFromSlug(slug),
			href: `https://www.dafont.com/${slug}.font`
		});
		if (latest.length >= 12) break;
	}
	return {
		fonts,
		downloads,
		yesterday,
		latest
	};
}
async function fetchBlog() {
	return [...(await fetchText("https://xerographer.blogspot.com/feeds/posts/default", 1e4, "application/atom+xml,application/xml")).matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 8).map((m, i) => {
		const block = m[1];
		const title = decodeEntities((block.match(/<title[^>]*>([\s\S]*?)<\/title>/) ?? [])[1] ?? "").trim();
		const link = (block.match(/<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"]/) ?? block.match(/<link[^>]*href=['"]([^'"]+)['"][^>]*rel=['"]alternate['"]/))?.[1];
		const date = (block.match(/<updated>([^<]+)<\/updated>/) ?? block.match(/<published>([^<]+)<\/published>/))?.[1];
		const summary = stripTags((block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/) ?? block.match(/<content[^>]*>([\s\S]*?)<\/content>/))?.[1] ?? "").slice(0, 180);
		if (!title || !link) return null;
		return {
			id: `blog-${i}-${link}`,
			source: "blog",
			title,
			body: summary || void 0,
			url: link,
			date: date ? new Date(date).toISOString() : void 0,
			meta: "Xerographer blog"
		};
	}).filter((x) => x !== null);
}
async function fetchYoutube() {
	return await Promise.all(TALKS.map(async (talk) => {
		try {
			const data = await fetchJson(`https://www.youtube.com/oembed?url=${encodeURIComponent(talk.href)}&format=json`, 7e3);
			return {
				id: `yt-${talk.id}`,
				source: "youtube",
				title: data.title || talk.title,
				url: talk.href,
				meta: data.author_name || talk.host,
				image: talk.thumb
			};
		} catch {
			return {
				id: `yt-${talk.id}`,
				source: "youtube",
				title: talk.title,
				url: talk.href,
				meta: `${talk.host} · ${talk.year}`,
				image: talk.thumb
			};
		}
	}));
}
var FLICKR_KEY = "57f7bcf7c339a0d7e2c852c919d5c3b0";
var FLICKR_NSID = "11706974@N08";
var FLICKR_BLOCK = /\b(armpit|porn|spank|breast|nude|nsfw|sex|xxx|x-rated|erotic|naked|fetish|handcuff)\b/i;
function flickrUrl(method, params) {
	const q = new URLSearchParams({
		method,
		api_key: FLICKR_KEY,
		format: "json",
		nojsoncallback: "1"
	});
	for (const [k, v] of Object.entries(params)) q.set(k, String(v));
	return `https://api.flickr.com/services/rest/?${q.toString()}`;
}
function mapFlickrPhoto(p) {
	if (String(p.safe) === "0") return null;
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
		views: p.views ? Number(p.views) : void 0,
		taken: p.datetaken
	};
}
async function flickrPhotos(params) {
	return ((await fetchJson(flickrUrl("flickr.photos.search", {
		user_id: FLICKR_NSID,
		extras: "url_l,url_c,url_z,url_m,date_taken,views,media,safe",
		content_type: 1,
		media: "photos",
		per_page: 50,
		...params
	}), 9e3)).photos?.photo ?? []).map(mapFlickrPhoto).filter((x) => x !== null);
}
async function flickrAlbumPhotos(setId, perPage = 40) {
	return ((await fetchJson(flickrUrl("flickr.photosets.getPhotos", {
		photoset_id: setId,
		extras: "url_l,url_c,url_z,url_m,date_taken,views,media,safe",
		media: "photos",
		per_page: perPage
	}), 9e3)).photoset?.photo ?? []).map(mapFlickrPhoto).filter((x) => x !== null);
}
async function fetchFlickrHome() {
	const [info, interesting, recent, albums] = await Promise.allSettled([
		fetchJson(flickrUrl("flickr.people.getInfo", { user_id: FLICKR_NSID }), 8e3),
		flickrPhotos({
			sort: "interestingness-desc",
			page: 1
		}),
		flickrPhotos({
			sort: "date-posted-desc",
			page: 1
		}),
		fetchJson(flickrUrl("flickr.photosets.getList", {
			user_id: FLICKR_NSID,
			per_page: 12
		}), 8e3)
	]);
	const person = info.status === "fulfilled" ? info.value.person : void 0;
	const photos = Number(person?.photos?.count?._content ?? 14136);
	const cover = person?.coverphoto_url?.h || person?.coverphoto_url?.l;
	const byId = /* @__PURE__ */ new Map();
	for (const batch of [interesting, recent]) {
		if (batch.status !== "fulfilled") continue;
		for (const p of batch.value) if (!byId.has(p.id)) byId.set(p.id, p);
	}
	const albumList = [];
	if (albums.status === "fulfilled") for (const s of albums.value.photosets?.photoset ?? []) {
		const title = s.title?._content?.trim();
		if (!title || /upload|wifi|to upload|cnr/i.test(title)) continue;
		albumList.push({
			id: s.id,
			title
		});
	}
	return {
		photos,
		cover: cover ? (cover.startsWith("//") ? `https:${cover}` : cover).split("#")[0] : void 0,
		items: [...byId.values()],
		pages: Math.max(1, Math.ceil(photos / 50)),
		albums: albumList.slice(0, 8)
	};
}
var getFlickrPage_createServerFn_handler = createServerRpc({
	id: "cf990260c668cc5a9f162c4a4aa9b9a2788d80a15f1221e6835150a3643f84bd",
	name: "getFlickrPage",
	filename: "src/lib/live.ts"
}, (opts) => getFlickrPage.__executeServer(opts));
var getFlickrPage = createServerFn({ method: "POST" }).validator(object({
	page: number().int().min(1).max(400).optional(),
	sort: _enum([
		"interestingness-desc",
		"date-posted-desc",
		"date-taken-desc"
	]).optional(),
	album: string().max(40).optional()
})).handler(getFlickrPage_createServerFn_handler, async ({ data }) => {
	if (data.album) return {
		items: await flickrAlbumPhotos(data.album),
		page: 1
	};
	const page = data.page ?? 1;
	return {
		items: await flickrPhotos({
			sort: data.sort ?? "date-posted-desc",
			page
		}),
		page
	};
});
function emptyFeed() {
	return {
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		x: null,
		posts: [],
		github: [],
		dafont: null,
		flickr: null,
		sourcesOk: []
	};
}
async function assemble() {
	const feed = emptyFeed();
	const tasks = {
		x: fetchXProfile(),
		tweets: fetchXPosts(),
		github: fetchGithub(),
		dafont: fetchDafont(),
		blog: fetchBlog(),
		youtube: fetchYoutube(),
		flickr: fetchFlickrHome()
	};
	const [x, tweets, github, dafont, blog, youtube, flickr] = await Promise.allSettled([
		tasks.x,
		tasks.tweets,
		tasks.github,
		tasks.dafont,
		tasks.blog,
		tasks.youtube,
		tasks.flickr
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
		feed.posts.push(...dafont.value.latest.slice(0, 6).map((f) => ({
			id: `df-${f.slug}`,
			source: "dafont",
			title: f.name,
			url: f.href,
			meta: f.downloads ? `${f.downloads.toLocaleString("en-US")} downloads` : "Xerographer on DaFont"
		})));
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
		return (b.date ? +new Date(b.date) : 0) - da;
	});
	feed.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
	return feed;
}
var getLiveFeed_createServerFn_handler = createServerRpc({
	id: "a442ecf253a01ebcd760d61188b0d7786ffb7b3a91a816dc673289f153eb5f7f",
	name: "getLiveFeed",
	filename: "src/lib/live.ts"
}, (opts) => getLiveFeed.__executeServer(opts));
var getLiveFeed = createServerFn({ method: "GET" }).handler(getLiveFeed_createServerFn_handler, async () => {
	const now = Date.now();
	if (cache && now - cache.at < TTL_MS) return cache.data;
	try {
		const data = await assemble();
		cache = {
			at: now,
			data
		};
		return data;
	} catch {
		return cache?.data ?? emptyFeed();
	}
});
//#endregion
export { getFlickrPage_createServerFn_handler, getLiveFeed_createServerFn_handler };
