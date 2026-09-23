import { a as MARISOL_WORKS, p as VOIDRIDE } from "./utils-6xH_rjpQ.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voidride-album-BguS-zQa.js
var import_jsx_runtime = require_jsx_runtime();
function MarisolShelf() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs uppercase tracking-wider text-subtle",
			children: "Marisol Vengas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-3xl tracking-tight",
			children: "Blue · Pink · Yellow"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: "https://marisolvengas.com/collections/blue-27-pink-28-yellow-29",
			target: "_blank",
			rel: "noreferrer",
			className: "inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-fg",
			children: ["marisolvengas.com", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-4 sm:grid-cols-3",
		children: MARISOL_WORKS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: w.href,
			target: "_blank",
			rel: "noreferrer",
			className: "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-150 hover:border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative block aspect-[4/5] overflow-hidden bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: w.image,
					alt: `${w.title}, one of one original artwork`,
					className: "h-full w-full max-w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex flex-1 flex-col p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs uppercase tracking-wider text-subtle",
						children: [
							"Card ",
							w.id,
							" · one of one"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 font-display text-2xl tracking-tight",
						children: w.color
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 flex-1 text-sm text-muted",
						children: w.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-4 flex items-center justify-between font-mono text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: w.price }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
					})
				]
			})]
		}) }, w.id))
	})] });
}
function VoidrideAlbum() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-[minmax(0,18rem)_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: VOIDRIDE.href,
				target: "_blank",
				rel: "noreferrer",
				className: "block bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: VOIDRIDE.cover,
					alt: `${VOIDRIDE.artist} — ${VOIDRIDE.title} album cover`,
					className: "aspect-square h-auto w-full max-w-full object-cover",
					width: 1080,
					height: 1080
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs uppercase tracking-wider text-subtle",
						children: ["Xerographer Media · ", VOIDRIDE.released]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl tracking-tight",
						children: VOIDRIDE.artist
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-poster text-lg text-muted",
						children: VOIDRIDE.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm text-muted",
						children: VOIDRIDE.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-5 divide-y divide-border border-y border-border",
						children: VOIDRIDE.tracks.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: t.href,
							target: "_blank",
							rel: "noreferrer",
							className: "flex min-h-11 items-center gap-3 py-2.5 transition-colors duration-150 hover:bg-raised",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: t.art,
									alt: "",
									className: "size-10 shrink-0 rounded-xs object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 shrink-0 font-mono text-xs text-subtle",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-sm",
									children: t.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-subtle",
									children: t.time
								})
							]
						}) }, t.href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: VOIDRIDE.href,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm text-fg",
						children: ["Listen on SoundCloud", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
					})
				]
			})]
		})
	});
}
//#endregion
export { VoidrideAlbum as n, MarisolShelf as t };
