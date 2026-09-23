import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-6xH_rjpQ.js
var LINKEDIN_URL = "https://www.linkedin.com/in/max";
var CALENDLY_URL = "https://calendly.com/maxinfeld/exploration";
var PROFILE = {
	name: "Max Infeld",
	handle: "maximusmaximus",
	location: "San Francisco, CA",
	origin: "Chico, California",
	born: 1981,
	tagline: "Artist, designer, and engineer of socially distributed work.",
	instagramLine: "I make things happen. I happen to make things.",
	xBio: "socially distributed art — community design",
	education: {
		school: "California State University, Chico",
		degree: "BFA",
		fields: [
			"Printmaking",
			"Social Practice",
			"Graphic Design",
			"Computer Science"
		]
	}
};
var SOCIALS = [
	{
		id: "calendly",
		name: "Calendly",
		handle: "Set up a time",
		href: CALENDLY_URL,
		blurb: "Book an exploration call — calendly.com/maxinfeld/exploration.",
		group: "presence"
	},
	{
		id: "linkedin",
		name: "LinkedIn",
		handle: "linkedin.com/in/max",
		href: LINKEDIN_URL,
		blurb: "Primary profile. Connect with Max at /in/max.",
		group: "presence"
	},
	{
		id: "x",
		name: "X",
		handle: "@maximusmaximus",
		href: "https://x.com/maximusmaximus",
		blurb: "Daily notes on art, community, and building.",
		group: "presence"
	},
	{
		id: "flickr",
		name: "Flickr",
		handle: "maximusmaximus",
		href: "https://www.flickr.com/photos/maximusmaximus/",
		blurb: "14,000+ photographs. Photostream since 2007.",
		group: "art"
	},
	{
		id: "linkedin-type",
		name: "LinkedIn",
		handle: "/in/maximusmaximus",
		href: "https://www.linkedin.com/in/maximusmaximus",
		blurb: "Xerographer Publishing and Typography.",
		group: "presence"
	},
	{
		id: "instagram",
		name: "Instagram",
		handle: "@maxinfeld",
		href: "https://www.instagram.com/maxinfeld/",
		blurb: "Architect of user engagement and experience.",
		group: "presence"
	},
	{
		id: "aboutme",
		name: "About.me",
		handle: "maxinfeld",
		href: "https://about.me/maxinfeld",
		blurb: "Art director, web developer, software engineer.",
		group: "presence"
	},
	{
		id: "github",
		name: "GitHub",
		handle: "maximusmaximus",
		href: "https://github.com/maximusmaximus",
		blurb: "Live engineering — agents, fleets, DAOs, type tools.",
		group: "work"
	},
	{
		id: "github-xero",
		name: "GitHub",
		handle: "xerographer",
		href: "https://github.com/xerographer",
		blurb: "Open-source SVG-in-OpenType color fonts.",
		group: "type"
	},
	{
		id: "mcclaw",
		name: "McClaw",
		handle: "mcclaw.io",
		href: "https://mcclaw.io/",
		blurb: "The marketplace where AI agents hire humans. $MCLAW.",
		group: "work"
	},
	{
		id: "culty",
		name: "CULTY",
		handle: "culty.io",
		href: "https://culty.io/",
		blurb: "Why Cult — culturebase token for real-world engagement.",
		group: "work"
	},
	{
		id: "voidride",
		name: "VOIDRIDE",
		handle: "soundcloud.com/ridethevoid",
		href: "https://soundcloud.com/ridethevoid",
		blurb: "First artist under Xerographer Media. Sound design series.",
		group: "art"
	},
	{
		id: "nostr",
		name: "Nostr / VMU",
		handle: "vmu.cash",
		href: "http://www.vmu.cash",
		blurb: "Viral Monetary Units — public-ledger gift currency.",
		group: "art"
	},
	{
		id: "dafont",
		name: "DaFont",
		handle: "Xerographer Fonts",
		href: "https://www.dafont.com/max-infeld.d3584",
		blurb: "1,300+ original typefaces. Tens of millions of downloads.",
		group: "type"
	},
	{
		id: "fontspace",
		name: "Fontspace",
		handle: "xerographer-fonts",
		href: "https://www.fontspace.com/xerographer-fonts",
		blurb: "Free type library, continuously expanded.",
		group: "type"
	},
	{
		id: "xerographer",
		name: "Xerographer",
		handle: "xerographer.com",
		href: "http://www.xerographer.com/",
		blurb: "Studio site and color-font project.",
		group: "type"
	},
	{
		id: "blog",
		name: "Studio blog",
		handle: "xerographer.blogspot.com",
		href: "https://xerographer.blogspot.com/",
		blurb: "Release notes, specimens, and type experiments.",
		group: "type"
	},
	{
		id: "colorfonts",
		name: "Color fonts",
		handle: "xerographer.github.io",
		href: "https://xerographer.github.io/",
		blurb: "Polychromatic SVG-in-OT fonts, Creative Commons.",
		group: "type"
	},
	{
		id: "facebook",
		name: "Facebook",
		handle: "xerographer",
		href: "https://www.facebook.com/xerographer/",
		blurb: "Xerographer Fonts studio page.",
		group: "type"
	},
	{
		id: "curio",
		name: "Curio Cards",
		handle: "curio.cards",
		href: "https://curio.cards",
		blurb: "The first art NFTs on Ethereum. Cards 27, 28, 29.",
		group: "art"
	},
	{
		id: "marisol",
		name: "Marisol Vengas",
		handle: "marisolvengas.com",
		href: "https://marisolvengas.com/collections/blue-27-pink-28-yellow-29",
		blurb: "Studio alias for the Blue / Pink / Yellow series.",
		group: "art"
	},
	{
		id: "medium",
		name: "Medium",
		handle: "Becoming Marisol Vengas",
		href: "https://medium.com/@curiocards/becoming-marisol-vengas-max-infelds-million-dollar-social-engagement-art-c5024892e898",
		blurb: "The origin story of a million-dollar social engagement work.",
		group: "art"
	}
];
var PRACTICES = [
	{
		to: "/artist",
		kicker: "01",
		title: "Artist",
		lede: "Social practice, public ledgers, and the first art NFTs on Ethereum."
	},
	{
		to: "/designer",
		kicker: "02",
		title: "Designer",
		lede: "Xerographer Fonts — type that has already lived on millions of screens."
	},
	{
		to: "/engineer",
		kicker: "03",
		title: "Engineer",
		lede: "Software, DAOs, games, and the infrastructure that lets communities move."
	}
];
var FEATURED_FONTS = [
	{
		slug: "datbox",
		name: "DatBox",
		note: "Block display. One of the most downloaded Xerographer faces — used for headers here."
	},
	{
		slug: "crackvetica",
		name: "Crackvetica",
		note: "A cracked grotesque — xerography as letterform."
	},
	{
		slug: "funsized",
		name: "Funsized",
		note: "One of the most downloaded display faces on DaFont."
	},
	{
		slug: "electrical",
		name: "Electrical",
		note: "Letters split by lightning."
	},
	{
		slug: "hot-sweat",
		name: "Hot Sweat",
		note: "Textured poster type with a physical, inked surface."
	},
	{
		slug: "metalshow",
		name: "MetalShow",
		note: "A stage-ready display face."
	}
];
var COLOR_FONTS = [
	{
		name: "Multicoloure",
		href: "https://github.com/xerographer/multicoloure-font",
		stars: 17
	},
	{
		name: "Reinebow",
		href: "https://github.com/xerographer/reinebow-color-font",
		stars: 14
	},
	{
		name: "Freizer",
		href: "https://github.com/xerographer/freizer-color-font",
		stars: 8
	},
	{
		name: "Gradiently",
		href: "https://github.com/xerographer/gradiently-color-font",
		stars: 4
	}
];
var TALKS = [
	{
		id: "XCpIJU2PT4Y",
		title: "Original Curio Card artist shares the origin story",
		host: "Jake Gallen",
		year: "2022",
		href: "https://www.youtube.com/watch?v=XCpIJU2PT4Y",
		thumb: "/media/yt-XCpIJU2PT4Y.jpg"
	},
	{
		id: "wI8HAoySh4U",
		title: "Adventures in NFTs #5",
		host: "World Crypto Network",
		year: "2021",
		href: "https://www.youtube.com/watch?v=wI8HAoySh4U",
		thumb: "/media/yt-wI8HAoySh4U.jpg"
	},
	{
		id: "X6vV9m8Xaqs",
		title: "Community engagement",
		host: "Sense Channel",
		year: "2020",
		href: "https://www.youtube.com/watch?v=X6vV9m8Xaqs",
		thumb: "/media/yt-X6vV9m8Xaqs.jpg"
	},
	{
		id: "CQMmgfVvRUA",
		title: "State of the Dapp — EOS Reel",
		host: "Jacques Whales",
		year: "2020",
		href: "https://www.youtube.com/watch?v=CQMmgfVvRUA",
		thumb: "/media/yt-CQMmgfVvRUA.jpg"
	}
];
var QUOTE = {
	text: "Most art communicates in one direction. I was really interested in interactive-style art — facilitating an interaction, not delivering a picture.",
	attrib: "Max Infeld, on social practice"
};
var MARISOL_WORKS = [
	{
		id: "27",
		color: "Blue",
		title: "Blue 27",
		price: "$2,800,000",
		href: "https://marisolvengas.com/products/27",
		image: "/media/marisol-blue.jpg",
		blurb: "One of one original. Handmade mixed media. Curio Cards, May 2017."
	},
	{
		id: "28",
		color: "Pink",
		title: "Pink 28",
		price: "$3,250,000",
		href: "https://marisolvengas.com/products/28",
		image: "/media/marisol-pink.jpg",
		blurb: "One of one original. Community-colored, then assembled by Max."
	},
	{
		id: "29",
		color: "Yellow",
		title: "Yellow 29",
		price: "$3,800,500",
		href: "https://marisolvengas.com/products/29",
		image: "/media/marisol-yellow.jpg",
		blurb: "One of one original. The mature form of the Marisol process."
	}
];
var VOIDRIDE = {
	artist: "VOIDRIDE",
	title: "₴ØɄ₦ĐĐɆ₴łǤ",
	href: "https://soundcloud.com/ridethevoid/sets/ea88qa7iecaa",
	profile: "https://soundcloud.com/ridethevoid",
	cover: "/media/voidride-cover.jpg",
	released: "August 2026",
	blurb: "Sound design series. Seven dark nightride trap studies fusing environmental sound with witch house production. First artist under Xerographer Media.",
	tracks: [
		{
			title: "THUNDERVEIL",
			href: "https://soundcloud.com/ridethevoid/v-idride-v",
			art: "/media/voidride-thunderveil.png",
			time: "3:30"
		},
		{
			title: "RAINSHADOW",
			href: "https://soundcloud.com/ridethevoid/v-idride-d-d",
			art: "/media/voidride-rainshadow.png",
			time: "3:30"
		},
		{
			title: "REDLINE WRAITH",
			href: "https://soundcloud.com/ridethevoid/v-idride-d-4",
			art: "/media/voidride-redline.png",
			time: "3:30"
		},
		{
			title: "HOLLOW CHOIR",
			href: "https://soundcloud.com/ridethevoid/v-idride-5",
			art: "/media/voidride-hollow.png",
			time: "3:30"
		},
		{
			title: "STORMHEX",
			href: "https://soundcloud.com/ridethevoid/v-idride-6",
			art: "/media/voidride-stormhex.png",
			time: "3:30"
		},
		{
			title: "GHOSTSHIFT",
			href: "https://soundcloud.com/ridethevoid/ghostshift",
			art: "/media/voidride-ghostshift.jpg",
			time: "3:30"
		},
		{
			title: "CLOUDBURIAL",
			href: "https://soundcloud.com/ridethevoid/cloudburial",
			art: "/media/voidride-cloudburial.jpg",
			time: "3:30"
		}
	]
};
var PROJECT_BANNERS = [{
	id: "mcclaw",
	href: "https://mcclaw.io/",
	image: "/banners/mcclaw-2.webp",
	kicker: "McClaw",
	title: "McClaw",
	lede: "AI agents hiring humans. Marketplace on Base, powered by $MCLAW."
}, {
	id: "culty",
	href: "https://culty.io/",
	image: "/banners/culty-banner.jpg",
	kicker: "Why Cult",
	title: "CULTY",
	lede: "Culturebase — a token for real-world engagement. Artists, community, IRL action."
}];
/** Recent public posts used as a live-refresh seed via FixTweet. */
var RECENT_X_IDS = [
	"2090303471841108476",
	"2090132809847652765",
	"2089885044420825300",
	"2089879254821650733",
	"2089875683799687365",
	"2089562937828766166",
	"2089201087580721438",
	"2088867846017388661",
	"2088524108434653297",
	"2088515675421855982"
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatCompact(n) {
	if (n >= 1e6) {
		const v = n / 1e6;
		return `${v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, "")}M`;
	}
	if (n >= 1e3) {
		const v = n / 1e3;
		return `${v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, "")}k`;
	}
	return n.toLocaleString("en-US");
}
function decodeEntities(input) {
	return input.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, "\"").replace(/&#39;/g, "'").replace(/'/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}
function stripTags(html) {
	return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}
function titleFromSlug(slug) {
	return slug.split("-").map((w) => w.length ? w[0].toUpperCase() + w.slice(1) : w).join(" ");
}
//#endregion
export { stripTags as _, MARISOL_WORKS as a, PROJECT_BANNERS as c, SOCIALS as d, TALKS as f, formatCompact as g, decodeEntities as h, LINKEDIN_URL as i, QUOTE as l, cn as m, COLOR_FONTS as n, PRACTICES as o, VOIDRIDE as p, FEATURED_FONTS as r, PROFILE as s, CALENDLY_URL as t, RECENT_X_IDS as u, titleFromSlug as v };
