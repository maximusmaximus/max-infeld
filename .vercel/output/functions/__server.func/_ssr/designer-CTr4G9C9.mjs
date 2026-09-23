import { g as formatCompact, n as COLOR_FONTS, r as FEATURED_FONTS } from "./utils-6xH_rjpQ.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as Route$2 } from "./router-BwKGU7CT.mjs";
import { t as FeedList } from "./feed-list-ZCqOIX0O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/designer-CTr4G9C9.js
var import_jsx_runtime = require_jsx_runtime();
function Designer() {
	const feed = Route$2.useLoaderData();
	const fonts = feed.dafont?.fonts ?? 1376;
	const downloads = feed.dafont?.downloads ?? 44150444;
	const yesterday = feed.dafont?.yesterday;
	const latest = feed.dafont?.latest?.length ? feed.dafont.latest : FEATURED_FONTS.map((f) => ({
		slug: f.slug,
		name: f.name,
		href: `https://www.dafont.com/${f.slug}.font`
	}));
	const blog = feed.posts.filter((p) => p.source === "blog").slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-wider text-subtle",
				children: "Designer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl font-display text-3xl tracking-tight",
				children: "Xerographer Fonts — a one-person foundry with a city-scale audience."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-2xl text-muted",
				children: "Since 2011 Max has released free type under the Xerographer name: grunge grotesques, color OpenType experiments, hand-cut display faces. The work is generous on purpose. Millions of downloads later, the fonts are in the wild — posters, games, zines, interfaces — without a gate in front of them."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: fonts.toLocaleString("en-US"),
						v: "faces on DaFont"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: formatCompact(downloads),
						v: "lifetime downloads"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: yesterday ? yesterday.toLocaleString("en-US") : "live",
						v: yesterday ? "downloads yesterday" : "DaFont counter"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-tight",
							children: "On the foundry bench"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.dafont.com/max-infeld.d3584",
							target: "_blank",
							rel: "noreferrer",
							className: "text-sm text-muted hover:text-fg",
							children: "Open DaFont"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Pulled live from the Xerographer author page."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
						children: latest.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: f.href,
							target: "_blank",
							rel: "noreferrer",
							className: "flex min-h-24 flex-col justify-between rounded-lg border border-border bg-surface p-4 hover:border-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl tracking-tight",
								children: f.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 font-mono text-xs text-muted",
								children: "downloads" in f && f.downloads ? `${f.downloads.toLocaleString("en-US")} downloads` : "Xerographer Fonts"
							})]
						}) }, f.slug))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Color fonts, open source"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "In 2016 the studio published SVG-in-OpenType polychromatic fonts — Multicoloure, Reinebow, Freizer, Gradiently — under Creative Commons. They still live on GitHub as working specimens of a then-new format."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid gap-2",
						children: COLOR_FONTS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: f.href,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3 text-sm hover:border-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-muted",
								children: [f.stars, " stars"]
							})]
						}) }, f.name))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Studio notes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 mb-5 text-sm text-muted",
						children: "From the Xerographer blog feed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedList, { items: blog })
				] })]
			})
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg px-5 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-sans text-3xl font-bold tabular-nums tracking-tight",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: v
		})]
	});
}
//#endregion
export { Designer as component };
