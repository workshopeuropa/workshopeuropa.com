/**
 * Everything the site says about itself. Edit here, not in the components.
 */

/**
 * The front page's headline, broken where a card should break it: at the
 * comma, which is where the sentence turns. Two lines at every width — on a
 * landscape card it would otherwise set as one long line, which is not how
 * the rest of the set reads. `tagline` is joined back up from this, so the
 * two cannot drift apart.
 */
export const taglineLines = [
	"Independent software,",
	"built to answer to its users",
];

export const site = {
	name: "Workshop Europa",
	url: "https://workshopeuropa.com",
	place: "Copenhagen",
	/** The h1 on the front page. */
	tagline: taglineLines.join(" "),
	/** The wedge, a line to a row. Every other list sorts by jurisdiction;
	    this one sorts by structure. */
	wedge: [
		"We're a workshop in Copenhagen building software to answer to its users.",
	],
	/** The standalone pull quote on the front page. */
	//pullQuote: "",
	/** The studio in one paragraph, at the foot of its own card in the row
	    that closes every page. Longer than `description`, which has a meta
	    tag's length to keep to, and written to be read rather than indexed. */
	blurb:
		"One studio, one person, five commitments. Software built in Copenhagen that answers to the people who pay for it, and you can leave with everything you brought.",
	description:
		"Independent software, built to answers its users. Five principles, each with a test.",
	email: "hello@workshopeuropa.com",
	/** The image the front-page card sits on. */
	image: {
		src: "/media/workshop.svg",
		alt: "Sheets of paper halved and halved again across the workshop bench.",
	},
} as const;

/**
 * Where the site points outside itself.
 *
 * `matrix` is [TBD] — the room exists once someone opens it, and the alias
 * below is a placeholder until it does. Everything that offers to open the
 * room reads this one value, so correcting it is one line.
 */
export const links = {
	matrix: "https://matrix.to/#/#workshopeuropa:matrix.org",
	source: "https://github.com/workshopeuropa/workshopeuropa.com",
	issues: "https://github.com/workshopeuropa/workshopeuropa.com/issues",
	rss: "/news/rss.xml",
	atom: "/news/atom.xml",
} as const;

/* Four sections, in two groups, because the top bar has two ends. The three
   that are places on the site sit to the left of the wordmark; Join is what
   you do rather than somewhere you read, so it sits to the right where a
   site puts its account controls.

   The design has Login beside it. There is no route behind it yet — Better
   Auth is mounted but nothing renders a form — and a nav item that 404s is
   worse than one that is not there, so it lands here when the page does. */
export const navStart = [
	{ href: "/news", label: "News" },
	{ href: "/about", label: "About" },
	{ href: "/projects", label: "Projects" },
] as const;

export const navEnd = [{ href: "/join", label: "Join" }] as const;

/* The two groups as one list, for anything that wants every section and does
   not care which end of the bar it is on. */
export const nav = [...navStart, ...navEnd] as const;
