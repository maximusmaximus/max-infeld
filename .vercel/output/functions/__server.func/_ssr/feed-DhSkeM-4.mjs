import { i as __toESM } from "../_runtime.mjs";
import { d as SOCIALS, g as formatCompact, m as cn } from "./utils-6xH_rjpQ.mjs";
import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as ArrowUpRight, r as RefreshCw } from "../_libs/lucide-react.mjs";
import { c as Button, n as Route, s as ConnectButtons, u as getLiveFeed } from "./router-BwKGU7CT.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { t as FeedList } from "./feed-list-ZCqOIX0O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-DhSkeM-4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GROUPS = [
	{
		id: "presence",
		label: "Presence"
	},
	{
		id: "art",
		label: "Art"
	},
	{
		id: "type",
		label: "Type"
	},
	{
		id: "work",
		label: "Engineering"
	}
];
function SocialGrid({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-10",
		children: (compact ? GROUPS : GROUPS).map((g) => {
			const links = SOCIALS.filter((s) => s.group === g.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 font-mono text-xs uppercase tracking-wider text-subtle",
				children: g.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: cn("grid gap-2", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"),
				children: links.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: s.href,
					target: "_blank",
					rel: "noreferrer",
					className: cn("group flex min-h-20 items-start justify-between gap-3 rounded-lg border bg-surface p-4 transition-colors duration-150 hover:border-line", s.id === "calendly" || s.id === "linkedin" ? "border-line" : "border-border"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-fg",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block font-mono text-xs text-muted",
							children: s.handle
						}),
						compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block text-sm text-muted",
							children: s.blurb
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
				}) }, s.id))
			})] }, g.id);
		})
	});
}
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "x",
		label: "X"
	},
	{
		id: "github",
		label: "GitHub"
	},
	{
		id: "dafont",
		label: "DaFont"
	},
	{
		id: "blog",
		label: "Blog"
	},
	{
		id: "youtube",
		label: "YouTube"
	}
];
function FeedPage() {
	const initial = Route.useLoaderData();
	const query = useQuery({
		queryKey: ["live-feed"],
		queryFn: () => getLiveFeed(),
		initialData: initial,
		refetchInterval: 12e4
	});
	const feed = query.data ?? initial;
	const [filter, setFilter] = (0, import_react.useState)("all");
	const items = (0, import_react.useMemo)(() => filter === "all" ? feed.posts : feed.posts.filter((p) => p.source === filter), [feed.posts, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-wider text-subtle",
						children: "Live sources"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl tracking-tight",
						children: "What Max is publishing right now"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm text-muted",
						children: "This page pulls X, GitHub, DaFont, the Xerographer blog, and YouTube on the server when you open it — then refreshes in the background. No screenshots of a feed. The sources themselves."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => query.refetch(),
					disabled: query.isFetching,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: query.isFetching ? "size-4 animate-spin" : "size-4" }), "Refresh"]
				})]
			}),
			feed.x ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 overflow-hidden rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-28 bg-raised bg-cover bg-center sm:h-36",
					style: { backgroundImage: "url(/portraits/banner.jpg)" },
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/portraits/max.jpg",
							alt: "",
							className: "-mt-12 size-20 max-w-full rounded-md border border-border object-cover sm:size-24"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tracking-tight",
								children: feed.x.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-sm text-muted",
								children: ["@", feed.x.handle]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-lg whitespace-pre-line text-sm text-muted",
								children: feed.x.bio
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-3 gap-4 font-mono text-xs uppercase tracking-wider text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Followers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-lg tabular-nums text-fg",
								children: formatCompact(feed.x.followers)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Posts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-lg tabular-nums text-fg",
								children: formatCompact(feed.x.tweets)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Media" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-lg tabular-nums text-fg",
								children: formatCompact(feed.x.media)
							})] })
						]
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-xs text-subtle",
				children: [
					"Updated ",
					formatDistanceToNow(new Date(feed.fetchedAt), { addSuffix: true }),
					feed.sourcesOk.length ? ` · ${feed.sourcesOk.join(" · ")}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Filter sources",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": filter === f.id,
					onClick: () => setFilter(f.id),
					className: filter === f.id ? "h-10 rounded-sm bg-accent px-3 text-sm text-accent-fg" : "h-10 rounded-sm border border-border px-3 text-sm text-muted hover:text-fg",
					children: f.label
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedList, { items })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Everywhere he publishes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 mb-6 max-w-xl text-sm text-muted",
						children: "Direct links to every public profile we could verify. Start with LinkedIn /in/max or book an exploration call."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectButtons, { className: "mb-8 flex flex-wrap gap-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialGrid, {})
				]
			})
		]
	});
}
//#endregion
export { FeedPage as component };
