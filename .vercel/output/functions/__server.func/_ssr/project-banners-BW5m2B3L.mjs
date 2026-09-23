import { c as PROJECT_BANNERS } from "./utils-6xH_rjpQ.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-banners-BW5m2B3L.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectBanners() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: PROJECT_BANNERS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: b.href,
		target: "_blank",
		rel: "noreferrer",
		className: "group relative block overflow-hidden border-t border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: b.image,
			alt: `${b.title} banner`,
			className: "aspect-[21/8] h-auto w-full max-w-full object-cover sm:aspect-[1972/700]",
			width: 1972,
			height: 700
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center justify-between gap-4 border-t border-border bg-bg px-4 py-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-mono text-xs uppercase tracking-wider text-subtle",
						children: b.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block font-display text-2xl tracking-tight",
						children: b.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block max-w-xl text-sm text-muted",
						children: b.lede
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-5 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
		})]
	}, b.id)) });
}
function ProjectBanner({ id }) {
	const b = PROJECT_BANNERS.find((x) => x.id === id);
	if (!b) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: b.href,
		target: "_blank",
		rel: "noreferrer",
		className: "group relative mt-12 block overflow-hidden rounded-xl border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: b.image,
			alt: `${b.title} banner`,
			className: "aspect-[21/8] h-auto w-full max-w-full object-cover sm:aspect-[1972/700]",
			width: 1972,
			height: 700
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center justify-between gap-4 border-t border-border bg-surface px-4 py-4 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-mono text-xs uppercase tracking-wider text-subtle",
					children: b.kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block font-display text-xl tracking-tight",
					children: b.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-5 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
		})]
	});
}
//#endregion
export { ProjectBanners as n, ProjectBanner as t };
