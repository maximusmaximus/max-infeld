import { i as __toESM } from "../_runtime.mjs";
import { g as formatCompact, l as QUOTE, m as cn, o as PRACTICES, s as PROFILE } from "./utils-6xH_rjpQ.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as ChevronRight, f as ArrowRight, l as ChevronLeft, o as ExternalLink, s as Dices, t as X } from "../_libs/lucide-react.mjs";
import { n as VoidrideAlbum, t as MarisolShelf } from "./voidride-album-BguS-zQa.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$4, c as Button, l as getFlickrPage, o as ConnectBand, s as ConnectButtons } from "./router-BwKGU7CT.mjs";
import { t as FeedList } from "./feed-list-ZCqOIX0O.mjs";
import { n as ProjectBanners } from "./project-banners-BW5m2B3L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CWEwNr9I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlickrExplorer({ photos, cover, items, pages, albums }) {
	const [frames, setFrames] = (0, import_react.useState)(items);
	const [active, setActive] = (0, import_react.useState)(0);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [albumId, setAlbumId] = (0, import_react.useState)("stream");
	const [page, setPage] = (0, import_react.useState)(1);
	const current = frames[active] ?? frames[0];
	const chips = (0, import_react.useMemo)(() => [{
		id: "stream",
		title: "Photostream"
	}, ...albums.slice(0, 6)], [albums]);
	const show = (i) => {
		if (!frames.length) return;
		setActive((i + frames.length) % frames.length);
	};
	const load = (0, import_react.useCallback)(async (opts) => {
		setBusy(true);
		try {
			const res = await getFlickrPage({ data: {
				page: opts.page,
				album: opts.album,
				sort: opts.sort
			} });
			setFrames((prev) => {
				if (opts.append) {
					const seen = new Set(prev.map((p) => p.id));
					return [...prev, ...res.items.filter((p) => !seen.has(p.id))];
				}
				return res.items.length ? res.items : prev;
			});
			if (!opts.append) setActive(opts.jump && res.items.length ? Math.floor(Math.random() * res.items.length) : 0);
			if (opts.page) setPage(opts.page);
		} finally {
			setBusy(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
			if (e.key === "ArrowRight") show(active + 1);
			if (e.key === "ArrowLeft") show(active - 1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		open,
		active,
		frames.length
	]);
	if (!current) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-y border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-64 overflow-hidden sm:min-h-80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cover || current.url,
						alt: "",
						className: "absolute inset-0 h-full w-full object-cover opacity-40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/55" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex min-h-64 max-w-6xl flex-col justify-end gap-4 px-4 py-8 sm:min-h-80 sm:px-6 sm:py-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-subtle",
								children: "Flickr · maximusmaximus"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "max-w-xl text-3xl font-bold tracking-tight",
								children: "Light table"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "max-w-xl text-sm text-muted",
								children: [photos.toLocaleString("en-US"), " photographs since 2007. Scrub the strip, open a frame, shuffle into the archive."]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-0 lg:grid-cols-[1.4fr_0.8fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(true),
						className: "relative min-h-64 overflow-hidden bg-raised sm:min-h-96",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: current.url,
							alt: current.title,
							className: "h-full w-full max-w-full object-contain"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-col justify-between border-t border-border p-5 lg:border-l lg:border-t-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-subtle",
								children: [
									"Frame ",
									active + 1,
									" of ",
									frames.length.toLocaleString("en-US")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-xl font-bold tracking-tight",
								children: current.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [current.taken ? current.taken.slice(0, 10) : "Flickr", current.views ? ` · ${formatCompact(current.views)} views` : ""]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => show(active - 1),
									"aria-label": "Previous frame",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => show(active + 1),
									"aria-label": "Next frame",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									disabled: busy,
									onClick: () => {
										const jump = 1 + Math.floor(Math.random() * Math.min(pages, 120));
										load({
											page: jump,
											sort: "date-posted-desc",
											jump: true
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4" }), "Shuffle"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: current.href,
										target: "_blank",
										rel: "noreferrer",
										children: ["Flickr", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })]
									})
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6",
					children: chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setAlbumId(c.id);
							if (c.id === "stream") load({
								page: 1,
								sort: "interestingness-desc"
							});
							else load({ album: c.id });
						},
						className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold", albumId === c.id ? "bg-accent text-accent-fg" : "border border-border text-muted hover:text-fg"),
						children: c.title
					}, c.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex snap-x gap-1 overflow-x-auto px-2 pb-4 sm:px-4",
					children: [frames.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onMouseEnter: () => setActive(i),
						onFocus: () => setActive(i),
						onClick: () => {
							setActive(i);
							setOpen(true);
						},
						className: cn("relative h-24 w-32 shrink-0 snap-start overflow-hidden rounded-xs border", i === active ? "border-accent" : "border-transparent"),
						"aria-label": p.title,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.thumb,
							alt: "",
							className: "h-full w-full object-cover"
						})
					}, p.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void load({
							page: page + 1,
							sort: "date-posted-desc",
							append: true
						}),
						className: "grid h-24 w-32 shrink-0 place-items-center rounded-xs border border-border text-sm text-muted",
						children: busy ? "…" : "More"
					})]
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex flex-col bg-bg/95",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": current.title,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 truncate text-sm font-semibold",
						children: current.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => show(active - 1),
								"aria-label": "Previous",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => show(active + 1),
								"aria-label": "Next",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: current.href,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": "Open on Flickr",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-5" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setOpen(false),
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex min-h-0 flex-1 items-center justify-center px-4 pb-6",
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: current.url,
						alt: current.title,
						className: "max-h-full max-w-full object-contain"
					})
				})]
			}) : null
		]
	});
}
function Home() {
	const feed = Route$4.useLoaderData();
	const fonts = feed.dafont?.fonts ?? 1376;
	const stats = [
		{
			k: "100M+",
			v: "typeface downloads"
		},
		{
			k: (feed.flickr?.photos ?? 14136).toLocaleString("en-US"),
			v: "photographs on Flickr"
		},
		{
			k: fonts.toLocaleString("en-US"),
			v: "original fonts"
		},
		{
			k: "2017",
			v: "first Ethereum art NFTs"
		}
	];
	const latest = feed.posts.filter((p) => p.source === "x" || p.source === "github").slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-wider text-muted",
							children: "Strategy and consulting"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 text-4xl font-extrabold leading-none tracking-tight",
							children: [
								"Max",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Infeld"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs font-semibold uppercase tracking-wider text-subtle",
							children: "San Francisco · Chico · Public practice"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-xl text-lg text-muted",
							children: [PROFILE.tagline, " Type used by millions. The first art show on Ethereum. Software for communities that actually gather."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectButtons, {})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
					className: "relative mx-auto min-w-0 w-full max-w-sm lg:mx-0 lg:justify-self-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-xl border border-border bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/portraits/max.jpg",
							alt: "Max Infeld at a laptop, glasses and a cap, working",
							className: "aspect-square h-auto w-full max-w-full rounded-md object-cover object-top",
							width: 368,
							height: 367
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Studio portrait" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "@maximusmaximus" })]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 bg-bg px-4 py-6 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-2xl font-bold tabular-nums tracking-tight",
						children: s.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: s.v
					})]
				}, s.v))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-wider text-subtle",
				children: "Practice"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid gap-4 md:grid-cols-3",
				children: PRACTICES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: p.to,
					className: "group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-150 hover:border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-subtle",
							children: p.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-3xl tracking-tight",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-sm text-muted",
							children: p.lede
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-6 inline-flex items-center gap-2 text-sm text-fg",
							children: ["Enter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-150 group-hover:translate-x-0.5" })]
						})
					]
				}) }, p.to))
			})]
		}),
		feed.flickr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlickrExplorer, {
			photos: feed.flickr.photos,
			cover: feed.flickr.cover,
			items: feed.flickr.items,
			pages: feed.flickr.pages,
			albums: feed.flickr.albums
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarisolShelf, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-14 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 font-mono text-xs uppercase tracking-wider text-subtle",
				children: "Latest album"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoidrideAlbum, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectBanners, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-sans text-xl italic leading-snug sm:text-2xl",
					children: [
						"“",
						QUOTE.text,
						"”"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "mt-6 font-mono text-xs uppercase tracking-wider text-subtle",
					children: QUOTE.attrib
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-wider text-subtle",
						children: "Now"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl tracking-tight",
						children: "Latest from public sources"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/feed",
						className: "hidden text-sm text-muted hover:text-fg sm:inline",
						children: "Full live feed"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedList, { items: latest }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 sm:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/feed",
						className: "text-sm text-muted",
						children: "Full live feed"
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectBand, {})
	] });
}
//#endregion
export { Home as component };
