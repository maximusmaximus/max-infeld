export const LINKEDIN_URL = "https://www.linkedin.com/in/max";
export const CALENDLY_URL = "https://calendly.com/maxinfeld/exploration";
export const EMAIL = "maxinfeld@gmail.com";
export const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent("Commercial use licensing")}`;

export const FONT_PROFILES = [
  { name: "fonts.grok.me", href: "https://fonts.grok.me/" },
  { name: "DaFont", href: "https://www.dafont.com/max-infeld.d3584" },
  { name: "Fontspace", href: "https://www.fontspace.com/xerographer-fonts" },
  { name: "1001 Fonts", href: "https://www.1001fonts.com/search.html?search=xerographer" },
  { name: "Abstract Fonts", href: "https://www.abstractfonts.com/search/?q=xerographer" },
  { name: "Xerographer", href: "http://www.xerographer.com/" },
  { name: "GitHub", href: "https://github.com/xerographer" },
] as const;

export type SocialLink = {
  id: string;
  name: string;
  handle: string;
  href: string;
  blurb: string;
  group: "presence" | "work" | "type" | "art";
};

export const PROFILE = {
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
    fields: ["Printmaking", "Social Practice", "Graphic Design", "Computer Science"],
  },
} as const;

export const SOCIALS: SocialLink[] = [
  {
    id: "calendly",
    name: "Calendly",
    handle: "Set up a time",
    href: CALENDLY_URL,
    blurb: "Book an exploration call — calendly.com/maxinfeld/exploration.",
    group: "presence",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "linkedin.com/in/max",
    href: LINKEDIN_URL,
    blurb: "Primary profile. Connect with Max at /in/max.",
    group: "presence",
  },
  {
    id: "x",
    name: "X",
    handle: "@maximusmaximus",
    href: "https://x.com/maximusmaximus",
    blurb: "Daily notes on art, community, and building.",
    group: "presence",
  },
  {
    id: "flickr",
    name: "Flickr",
    handle: "maximusmaximus",
    href: "https://www.flickr.com/photos/maximusmaximus/",
    blurb: "14,000+ photographs. Photostream since 2007.",
    group: "art",
  },
  {
    id: "linkedin-type",
    name: "LinkedIn",
    handle: "/in/maximusmaximus",
    href: "https://www.linkedin.com/in/maximusmaximus",
    blurb: "Xerographer Publishing and Typography.",
    group: "presence",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@maxinfeld",
    href: "https://www.instagram.com/maxinfeld/",
    blurb: "Architect of user engagement and experience.",
    group: "presence",
  },
  {
    id: "aboutme",
    name: "About.me",
    handle: "maxinfeld",
    href: "https://about.me/maxinfeld",
    blurb: "Art director, web developer, software engineer.",
    group: "presence",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "maximusmaximus",
    href: "https://github.com/maximusmaximus",
    blurb: "Live engineering — agents, fleets, DAOs, type tools.",
    group: "work",
  },
  {
    id: "github-xero",
    name: "GitHub",
    handle: "xerographer",
    href: "https://github.com/xerographer",
    blurb: "Open-source SVG-in-OpenType color fonts.",
    group: "type",
  },
  {
    id: "mcclaw",
    name: "McClaw",
    handle: "mcclaw.io",
    href: "https://mcclaw.io/",
    blurb: "The marketplace where AI agents hire humans. $MCLAW.",
    group: "work",
  },
  {
    id: "culty",
    name: "CULTY",
    handle: "culty.io",
    href: "https://culty.io/",
    blurb: "Why Cult — culturebase token for real-world engagement.",
    group: "work",
  },
  {
    id: "bath",
    name: "Lumen Bath",
    handle: "bath.grok.me",
    href: "https://bath.grok.me/",
    blurb: "A crystal singing-bowl sound bath you place, share, and remix.",
    group: "art",
  },
  {
    id: "emoji",
    name: "Emoji Old Masters",
    handle: "emoji.grok.me",
    href: "https://emoji.grok.me/",
    blurb: "Public-domain paintings remade as live emoji mosaics.",
    group: "art",
  },
  {
    id: "ripple",
    name: "Ripple",
    handle: "drawing.grok.me",
    href: "https://drawing.grok.me/",
    blurb: "Full-screen interactive fluid surface. Paint waves, camera, mic, phone-to-wall.",
    group: "work",
  },
  {
    id: "fonts",
    name: "Xerographer Fonts",
    handle: "fonts.grok.me",
    href: "https://fonts.grok.me/",
    blurb: "Explore 1,376 faces, test custom text, license commercial use via x402.",
    group: "type",
  },
  {
    id: "voidride",
    name: "VOIDRIDE",
    handle: "soundcloud.com/ridethevoid",
    href: "https://soundcloud.com/ridethevoid",
    blurb: "First artist under Xerographer Media. Sound design series.",
    group: "art",
  },
  {
    id: "nostr",
    name: "Viral Monetary Units",
    handle: "viralmonetaryunit.com",
    href: "https://web.archive.org/web/20080000000000*/viralmonetaryunit.com",
    blurb: "Archived original site — International Bank of Gifting and Exchange.",
    group: "art",
  },
  {
    id: "dafont",
    name: "DaFont",
    handle: "Xerographer Fonts",
    href: "https://www.dafont.com/max-infeld.d3584",
    blurb: "Download on DaFont. Contact for commercial use licensing.",
    group: "type",
  },
  {
    id: "fontspace",
    name: "Fontspace",
    handle: "xerographer-fonts",
    href: "https://www.fontspace.com/xerographer-fonts",
    blurb: "Xerographer library. Contact for commercial use licensing.",
    group: "type",
  },
  {
    id: "xerographer",
    name: "Xerographer",
    handle: "xerographer.com",
    href: "http://www.xerographer.com/",
    blurb: "Studio site and color-font project.",
    group: "type",
  },
  {
    id: "blog",
    name: "Studio blog",
    handle: "xerographer.blogspot.com",
    href: "https://xerographer.blogspot.com/",
    blurb: "Release notes, specimens, and type experiments.",
    group: "type",
  },
  {
    id: "colorfonts",
    name: "Color fonts",
    handle: "xerographer.github.io",
    href: "https://xerographer.github.io/",
    blurb: "Polychromatic SVG-in-OT fonts, Creative Commons.",
    group: "type",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "xerographer",
    href: "https://www.facebook.com/xerographer/",
    blurb: "Xerographer Fonts studio page.",
    group: "type",
  },
  {
    id: "curio",
    name: "Curio Cards",
    handle: "curio.cards",
    href: "https://curio.cards",
    blurb: "The first art NFTs on Ethereum. Cards 27, 28, 29.",
    group: "art",
  },
  {
    id: "marisol",
    name: "Marisol Vengas",
    handle: "marisolvengas.com",
    href: "https://marisolvengas.com/collections/blue-27-pink-28-yellow-29",
    blurb: "Studio alias for the Blue / Pink / Yellow series.",
    group: "art",
  },
  {
    id: "mv910",
    name: "MV910",
    handle: "marisol.grok.me",
    href: "https://marisol.grok.me/",
    blurb: "888 one-of-one buildings. Pick a rough, set the windows, mint.",
    group: "art",
  },
  {
    id: "xeroemoji",
    name: "Xero Emoji",
    handle: "xeroemoji.grok.me",
    href: "https://xeroemoji.grok.me/",
    blurb: "A city built from the Xero emoji set. It grows while someone is watching.",
    group: "type",
  },
  {
    id: "medium",
    name: "Medium",
    handle: "Becoming Marisol Vengas",
    href: "https://medium.com/@curiocards/becoming-marisol-vengas-max-infelds-million-dollar-social-engagement-art-c5024892e898",
    blurb: "The origin story of a million-dollar social engagement work.",
    group: "art",
  },
];

export const PRACTICES = [
  {
    to: "/artist" as const,
    kicker: "01",
    title: "Artist",
    lede: "Social practice, public ledgers, and the first art NFTs on Ethereum.",
  },
  {
    to: "/designer" as const,
    kicker: "02",
    title: "Designer",
    lede: "Xerographer Fonts — type that has already lived on millions of screens.",
  },
  {
    to: "/engineer" as const,
    kicker: "03",
    title: "Engineer",
    lede: "Software, DAOs, games, and the infrastructure that lets communities move.",
  },
] as const;

export const FEATURED_FONTS = [
  { slug: "datbox", name: "DatBox", note: "Block display. One of the most downloaded Xerographer faces — used for headers here." },
  { slug: "crackvetica", name: "Crackvetica", note: "A cracked grotesque — xerography as letterform." },
  { slug: "funsized", name: "Funsized", note: "One of the most downloaded display faces on DaFont." },
  { slug: "electrical", name: "Electrical", note: "Letters split by lightning." },
  { slug: "hot-sweat", name: "Hot Sweat", note: "Textured poster type with a physical, inked surface." },
  { slug: "metalshow", name: "MetalShow", note: "A stage-ready display face." },
] as const;

export const COLOR_FONTS = [
  { name: "Multicoloure", href: "https://github.com/xerographer/multicoloure-font", stars: 17 },
  { name: "Reinebow", href: "https://github.com/xerographer/reinebow-color-font", stars: 14 },
  { name: "Freizer", href: "https://github.com/xerographer/freizer-color-font", stars: 8 },
  { name: "Gradiently", href: "https://github.com/xerographer/gradiently-color-font", stars: 4 },
] as const;

export const TALKS = [
  {
    id: "XCpIJU2PT4Y",
    title: "Original Curio Card artist shares the origin story",
    host: "Jake Gallen",
    year: "2022",
    href: "https://www.youtube.com/watch?v=XCpIJU2PT4Y",
    thumb: "/media/yt-XCpIJU2PT4Y.jpg",
  },
  {
    id: "wI8HAoySh4U",
    title: "Adventures in NFTs #5",
    host: "World Crypto Network",
    year: "2021",
    href: "https://www.youtube.com/watch?v=wI8HAoySh4U",
    thumb: "/media/yt-wI8HAoySh4U.jpg",
  },
  {
    id: "X6vV9m8Xaqs",
    title: "Community engagement",
    host: "Sense Channel",
    year: "2020",
    href: "https://www.youtube.com/watch?v=X6vV9m8Xaqs",
    thumb: "/media/yt-X6vV9m8Xaqs.jpg",
  },
  {
    id: "CQMmgfVvRUA",
    title: "State of the Dapp — EOS Reel",
    host: "Jacques Whales",
    year: "2020",
    href: "https://www.youtube.com/watch?v=CQMmgfVvRUA",
    thumb: "/media/yt-CQMmgfVvRUA.jpg",
  },
] as const;

export const QUOTE = {
  text: "Most art communicates in one direction. I was really interested in interactive-style art — facilitating an interaction, not delivering a picture.",
  attrib: "Max Infeld, on social practice",
};

export const MARISOL_WORKS = [
  {
    id: "27",
    color: "Blue",
    title: "Blue 27",
    price: "$2,800,000",
    href: "https://marisolvengas.com/products/27",
    image: "/media/marisol-blue.jpg",
    blurb: "One of one original. Handmade mixed media. Curio Cards, May 2017.",
  },
  {
    id: "28",
    color: "Pink",
    title: "Pink 28",
    price: "$3,250,000",
    href: "https://marisolvengas.com/products/28",
    image: "/media/marisol-pink.jpg",
    blurb: "One of one original. Community-colored, then assembled by Max.",
  },
  {
    id: "29",
    color: "Yellow",
    title: "Yellow 29",
    price: "$3,800,500",
    href: "https://marisolvengas.com/products/29",
    image: "/media/marisol-yellow.jpg",
    blurb: "One of one original. The mature form of the Marisol process.",
  },
] as const;

export const MARISOL_BOOK = {
  title: "The Art of Marisol Vengas",
  href: "https://www.lulu.com/shop/max-infeld/the-art-of-marisol-vengas/paperback/product-18474rky.html",
  year: "2009",
  pages: "100",
  format: "Color paperback · Crown Quarto",
  price: "$30.50",
  cover: "/media/marisol-book.jpg",
  blurb: "All the works. 100 full-color pieces completed in June 2009.",
} as const;

export const FOUND_FLYERS = {
  title: "FOUND FLYERS",
  href: "https://www.lulu.com/shop/max-infeld/found-flyers/paperback/product-12gk597.html",
  year: "2008",
  pages: "61",
  format: "Paperback · US Letter · 2nd edition",
  price: "$7.06",
  cover: "/media/flyers/cover.jpg",
  blurb:
    "Not so found. Rip them out and put them everywhere. A gift for anyone who likes contemporary or socially engaged work. First edition: five copies.",
  read: [
    {
      id: "tobacky",
      paper: "green",
      caption: "Page from FOUND FLYERS — xerox flyer, Chico, 2008.",
      blocks: [
        { style: "lead", text: "DO YOU HAVE ANY" },
        { style: "hero", text: "WACKY" },
        { style: "hero", text: "TOBACKY?" },
        { style: "body", text: "if you have extra" },
        { style: "body", text: "call me, thanks" },
        { style: "phone", text: "(530) 892-4263" },
        { style: "body", text: "ask for MAX" },
        { style: "place", text: "Chico, CA" },
      ],
    },
    {
      id: "furniture",
      paper: "cream",
      caption: "Page from FOUND FLYERS — xerox flyer, Chico, 2008.",
      blocks: [
        { style: "lead", text: "DO YOU HAVE ANY" },
        { style: "hero", text: "EXTRA" },
        { style: "hero", text: "FURNITURE" },
        { style: "lead", text: "THAT YOU DON'T NEED?" },
        { style: "phone", text: "(530) 892-4263" },
        { style: "body", text: "ask for MAX" },
        { style: "place", text: "Chico, CA" },
      ],
    },
    {
      id: "rip",
      paper: "white",
      caption: "Instruction page — 2nd edition, 2008.",
      blocks: [
        { style: "lead", text: "MAX INFELD" },
        { style: "hero", text: "FOUND" },
        { style: "hero", text: "FLYERS" },
        { style: "body", text: "Well, not so found." },
        { style: "body", text: "Rip 'em out and put everywhere." },
        { style: "place", text: "2nd edition · 61 pages · 2008" },
      ],
    },
  ],
} as const;

export const VMU_BOOK = {
  title: "International Bank of Gifting and Exchange",
  subtitle: "Viral Monetary Units",
  href: "https://www.lulu.com/shop/max-infeld/international-bank-of-gifting-and-exchange-viral-monetary-units/ebook/product-17453916.html",
  archive: "https://web.archive.org/web/20080000000000*/viralmonetaryunit.com",
  year: "2011",
  photographer: "Kyle Delmar",
  format: "PDF ebook · Lulu",
  blurb:
    "The Making of Viral Monetary Units — photographs documenting the manufacturing of the notes. Behind the scenes at the bank. Serialized gifts of coffee, beer, a meal, tracked on a public ledger.",
  cover: "/media/vmu/cover.jpg",
  banner: "/media/vmu/moola.jpg",
  siteBanner: "/media/vmu/ibge-banner.jpg",
  logo: "/media/vmu/ibge-logo.jpg",
  plates: [
    { src: "/media/vmu/gold.jpg", alt: "Gold special edition Viral Monetary Units" },
    { src: "/media/vmu/chico-dollar.jpg", alt: "One Chico dollar chalkboard" },
    { src: "/media/vmu/empire.jpg", alt: "Installing the VMU show at Empire Coffee" },
  ],
} as const;

export const VOIDRIDE_PLAYLISTS = [
  {
    id: "interference",
    title: "ꐃ₦₮ɄɌꐃɄƦɌɆ₦₵Ɇᵾ₦",
    href: "https://soundcloud.com/ridethevoid/sets/qv0hy2qdsehm",
    cover: "/media/voidride/interference.jpg",
    released: "August 2026",
    blurb: "Phantom architecture, glass corridors, crawlspaces, night rituals, underground vaults.",
    tracks: [
      { title: "ENTRYWOUND", href: "https://soundcloud.com/ridethevoid/entrywound", art: "/media/voidride/entrywound.jpg", time: "2:30" },
      { title: "GLASSUNDER", href: "https://soundcloud.com/ridethevoid/glassunder", art: "/media/voidride/glassunder.jpg", time: "2:30" },
      { title: "CRAWLSPACE", href: "https://soundcloud.com/ridethevoid/crawlspace", art: "/media/voidride/crawlspace.jpg", time: "2:30" },
      { title: "NIGHTRITE", href: "https://soundcloud.com/ridethevoid/nightrite", art: "/media/voidride/nightrite.jpg", time: "2:30" },
      { title: "UNDERCROFT", href: "https://soundcloud.com/ridethevoid/undercroft", art: "/media/voidride/undercroft.jpg", time: "2:30" },
    ],
  },
  {
    id: "sounddesign",
    title: "₴ØɄ₦ĐĐɆ₴łǤ",
    href: "https://soundcloud.com/ridethevoid/sets/ea88qa7iecaa",
    cover: "/media/voidride/sounddesign.jpg",
    released: "August 2026",
    blurb: "Seven dark nightride trap studies fusing environmental sound with witch house production.",
    tracks: [
      { title: "THUNDERVEIL", href: "https://soundcloud.com/ridethevoid/v-idride-v", art: "/media/voidride-thunderveil.png", time: "3:30" },
      { title: "RAINSHADOW", href: "https://soundcloud.com/ridethevoid/v-idride-d-d", art: "/media/voidride-rainshadow.png", time: "3:30" },
      { title: "REDLINE WRAITH", href: "https://soundcloud.com/ridethevoid/v-idride-d-4", art: "/media/voidride-redline.png", time: "3:30" },
      { title: "HOLLOW CHOIR", href: "https://soundcloud.com/ridethevoid/v-idride-5", art: "/media/voidride-hollow.png", time: "3:30" },
      { title: "STORMHEX", href: "https://soundcloud.com/ridethevoid/v-idride-6", art: "/media/voidride-stormhex.png", time: "3:30" },
      { title: "GHOSTSHIFT", href: "https://soundcloud.com/ridethevoid/ghostshift", art: "/media/voidride-ghostshift.jpg", time: "3:30" },
      { title: "CLOUDBURIAL", href: "https://soundcloud.com/ridethevoid/cloudburial", art: "/media/voidride-cloudburial.jpg", time: "3:30" },
    ],
  },
  {
    id: "underpass",
    title: "Ʉ₦ĐɆƦ₱Δ$$",
    href: "https://soundcloud.com/ridethevoid/sets/xy5zeim73nug",
    cover: "/media/voidride/underpass.jpg",
    released: "August 2026",
    blurb: "Fog, chrome, neon arches. Tracks under the overpass.",
    tracks: [
      { title: "GRAVE ENGINE", href: "https://soundcloud.com/ridethevoid/v-idride-d-1", art: "/media/voidride/underpass.jpg", time: "3:30" },
      { title: "NIGHTCRAWL", href: "https://soundcloud.com/ridethevoid/v-idride-d-2", art: "/media/voidride/underpass.jpg", time: "3:30" },
      { title: "HOLLOW SIGNAL", href: "https://soundcloud.com/ridethevoid/v-idride-d-3", art: "/media/voidride/underpass.jpg", time: "3:30" },
      { title: "RUST PULSE", href: "https://soundcloud.com/ridethevoid/v-idride-2", art: "/media/voidride/underpass.jpg", time: "3:00" },
      { title: "SLANT UNDER", href: "https://soundcloud.com/ridethevoid/v-idride-3", art: "/media/voidride/underpass.jpg", time: "3:00" },
    ],
  },
  {
    id: "origins",
    title: "ORIGINS",
    href: "https://soundcloud.com/ridethevoid/sets/origins",
    cover: "/media/voidride/origins.jpg",
    released: "August 2026",
    blurb: "The first transmissions.",
    tracks: [
      { title: "PHANTOM LANE", href: "https://soundcloud.com/ridethevoid/v-idride-phantom-lane", art: "/media/voidride/origins.jpg", time: "3:00" },
      { title: "MIDNIGHT PROTOCOL", href: "https://soundcloud.com/ridethevoid/v-idride-midnight-protocol", art: "/media/voidride/origins.jpg", time: "3:00" },
      { title: "GHOST FREQUENCY", href: "https://soundcloud.com/ridethevoid/v-idride-ghost-frequency", art: "/media/voidride/origins.jpg", time: "3:00" },
      { title: "FADE TO BLACK", href: "https://soundcloud.com/ridethevoid/v-idride-fade-to-black", art: "/media/voidride/origins.jpg", time: "3:00" },
      { title: "NEON CEMETERY", href: "https://soundcloud.com/ridethevoid/v-idride-neon-cemetery-3", art: "/media/voidride/origins.jpg", time: "3:00" },
    ],
  },
  {
    id: "desert",
    title: "DESERT VOID",
    href: "https://soundcloud.com/ridethevoid/sets/desert-void",
    cover: "/media/voidride/desert.jpg",
    released: "August 2026",
    blurb: "Five mirages on endless asphalt.",
    tracks: [
      { title: "VELVET MENACE", href: "https://soundcloud.com/ridethevoid/vxlvxt-mxndcx", art: "/media/voidride/desert.jpg", time: "2:30" },
      { title: "PHANTOM MERIDIAN", href: "https://soundcloud.com/ridethevoid/phdnt-m-mxrididn", art: "/media/voidride/desert.jpg", time: "2:30" },
      { title: "COLD START", href: "https://soundcloud.com/ridethevoid/c-ld-tdrt", art: "/media/voidride/desert.jpg", time: "2:30" },
      { title: "GHOST LANE", href: "https://soundcloud.com/ridethevoid/gh-t-ldnx", art: "/media/voidride/desert.jpg", time: "2:30" },
      { title: "DAWN LINE", href: "https://soundcloud.com/ridethevoid/dwn-linx", art: "/media/voidride/desert.jpg", time: "2:30" },
    ],
  },
] as const;

export const VOIDRIDE = {
  artist: "VOIDRIDE",
  profile: "https://soundcloud.com/ridethevoid",
} as const;

export const PROJECT_BANNERS = [
  {
    id: "mcclaw",
    href: "https://mcclaw.io/",
    image: "/banners/mcclaw-2.webp",
    kicker: "McClaw",
    title: "McClaw",
    lede: "AI agents hiring humans. Marketplace on Base, powered by $MCLAW.",
  },
  {
    id: "culty",
    href: "https://culty.io/",
    image: "/banners/culty-banner.jpg",
    kicker: "Why Cult",
    title: "CULTY",
    lede: "Culturebase — a token for real-world engagement. Artists, community, IRL action.",
  },
] as const;

export const GROK_WORKS = [
  {
    id: "mv910",
    href: "https://marisol.grok.me/",
    image: "/media/marisol-og.jpg",
    kicker: "Marisol Vengas",
    title: "MV910",
    lede: "888 one-of-one buildings. Pick a rough, set the windows, mint. The photoreal piece is revealed after it passes a quality check.",
    cta: "Pick a rough",
  },
  {
    id: "xeroemoji",
    href: "https://xeroemoji.grok.me/",
    image: "/media/xeroemoji-og.jpg",
    kicker: "Xerographer",
    title: "XERO EMOJI",
    lede: "A city built from the Xero emoji set. Farms, streets, and camps. It only grows while someone is watching.",
    cta: "Walk the city",
  },
  {
    id: "bath",
    href: "https://bath.grok.me/",
    image: "/media/bath-og.jpg",
    kicker: "Live work",
    title: "LUMEN BATH",
    lede: "A crystal singing-bowl sound bath you place, share, and remix. Turn the ear. Daily baths follow what people play most.",
    cta: "Place a bowl",
  },
  {
    id: "emoji",
    href: "https://emoji.grok.me/",
    image: "/media/emoji-og.jpg",
    kicker: "Live work",
    title: "EMOJI OLD MASTERS",
    lede: "Public-domain paintings remade as live emoji mosaics. Change density, or try your own image.",
  },
  {
    id: "ripple",
    href: "https://drawing.grok.me/",
    image: "/media/drawing-og.jpg",
    kicker: "Live work",
    title: "RIPPLE",
    lede: "Full-screen interactive fluid surface. Paint waves, switch presets, layer camera and mic, cast phone-to-wall.",
  },
  {
    id: "flies",
    href: "https://flies.grok.me/",
    image: "/media/flies-og.jpg",
    kicker: "Live work",
    title: "DROSOCORE",
    lede: "A hydrogen fusion tokamak maintained and extended by fruit flies. Coil 14 was a discussion.",
    cta: "Don't swat. They're on shift.",
  },
] as const;

export const RECENT_X_IDS = [
  "2090303471841108476",
  "2090132809847652765",
  "2089885044420825300",
  "2089879254821650733",
  "2089875683799687365",
  "2089562937828766166",
  "2089201087580721438",
  "2088867846017388661",
  "2088524108434653297",
  "2088515675421855982",
] as const;
