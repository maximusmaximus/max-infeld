import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as Route$1, s as ConnectButtons } from "./router-BwKGU7CT.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { t as FeedList } from "./feed-list-ZCqOIX0O.mjs";
import { t as ProjectBanner } from "./project-banners-BW5m2B3L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engineer-CqsQZak9.js
var import_jsx_runtime = require_jsx_runtime();
function Engineer() {
	const feed = Route$1.useLoaderData();
	const events = feed.posts.filter((p) => p.source === "github").slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-wider text-subtle",
				children: "Engineer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl font-display text-3xl tracking-tight",
				children: "Tools first, then communities. Software as a way to keep people in the same room."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-2xl text-muted",
				children: "Max writes the systems that his art and type need: public ledgers in 2007, color-font build pipelines, DAC toolkits on EOS, product for Alien Worlds, agent fleets and coworking software now. The engineering is not a second career. It is how the social work scales."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectButtons, { className: "mt-8 flex flex-wrap gap-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Role, {
						year: "2007–",
						title: "Public ledgers",
						body: "An alternative “viral currency” with a public ledger — years before it was fashionable — later VMUs and Bitcoin-era experiments."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Role, {
						year: "Alien Worlds",
						title: "Product, DAOs & community",
						body: "Product Manager of DAOs and Communities with Dacoco, the studio behind Alien Worlds. Games, guilds, and the social layer of a planet-scale title."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Role, {
						year: "Now",
						title: "McClaw & Boardy",
						body: "Human worker at McClaw.io. Deal Partner at Boardy Ventures, looking at startups in AI, fintech, and crypto."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectBanner, { id: "mcclaw" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectBanner, { id: "culty" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Repositories, live"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://github.com/maximusmaximus",
						target: "_blank",
						rel: "noreferrer",
						className: "text-sm text-muted hover:text-fg",
						children: "github.com/maximusmaximus"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 grid gap-2 sm:grid-cols-2",
					children: feed.github.slice(0, 10).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: r.url,
						target: "_blank",
						rel: "noreferrer",
						className: "block rounded-lg border border-border bg-surface p-4 hover:border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-subtle",
								children: [
									r.owner,
									" · ",
									r.language ?? "repo"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-fg",
								children: r.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-muted",
								children: r.description ?? "Open engineering work."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-mono text-xs text-subtle",
								children: [
									"Updated ",
									formatDistanceToNow(new Date(r.updated), { addSuffix: true }),
									r.stars ? ` · ${r.stars} stars` : ""
								]
							})
						]
					}) }, r.fullName))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Public activity"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 mb-5 text-sm text-muted",
						children: "GitHub events, fetched on load."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedList, { items: events })
				]
			})
		]
	});
}
function Role({ year, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-wider text-subtle",
				children: year
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-2xl tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: body
			})
		]
	});
}
//#endregion
export { Engineer as component };
