import { m as cn } from "./utils-6xH_rjpQ.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-list-ZCqOIX0O.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	x: "X",
	github: "GitHub",
	dafont: "DaFont",
	blog: "Blog",
	youtube: "YouTube",
	flickr: "Flickr"
};
function FeedList({ items, className }) {
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-lg border border-border bg-surface p-6 text-sm text-muted",
		children: "Live sources are warming up. Open the original profiles in the directory while this refreshes."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("grid gap-3", className),
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: item.url,
			target: "_blank",
			rel: "noreferrer",
			className: "group flex gap-4 rounded-lg border border-border bg-surface p-4 transition-colors duration-150 hover:border-line",
			children: [
				item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.image,
					alt: "",
					className: "hidden h-16 w-24 shrink-0 rounded-sm object-cover sm:block"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider text-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: LABELS[item.source] }),
								item.date ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDistanceToNow(new Date(item.date), { addSuffix: true }) }) : null,
								item.meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "normal-case tracking-normal",
									children: item.meta
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-pretty text-fg",
							children: item.title
						}),
						item.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted",
							children: item.body
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "mt-1 size-4 shrink-0 text-subtle" })
			]
		}) }, item.id))
	});
}
//#endregion
export { FeedList as t };
