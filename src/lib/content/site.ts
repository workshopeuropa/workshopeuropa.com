/**
 * Everything the site says about itself. Edit here, not in the components.
 */

export const site = {
	name: 'Workshop Europa',
	url: 'https://workshopeuropa.com',
	place: 'Copenhagen',
	/** The h1 on the front page. */
	tagline: 'Independent software, built in the open.',
	/** The wedge, a line to a row. Every other list sorts by jurisdiction;
	    this one sorts by structure. */
	wedge: [
		'Most lists of European software ask where it’s hosted.',
		'This one asks who it answers to.'
	],
	/** The standalone pull quote on the front page. */
	pullQuote: 'Nobody pays us for access to you.',
	description:
		'European software that answers to the people using it. Five commitments, each with a test.',
	email: 'hello@workshopeuropa.com',
	/** The image the front-page card sits on. */
	image: {
		src: '/media/workshop.svg',
		alt: 'Sheets of paper halved and halved again across the workshop bench.'
	}
} as const;

/**
 * Where the site points outside itself.
 *
 * `matrix` is [TBD] — the room exists once someone opens it, and the alias
 * below is a placeholder until it does. Everything that offers to open the
 * room reads this one value, so correcting it is one line.
 */
export const links = {
	matrix: 'https://matrix.to/#/#workshopeuropa:matrix.org',
	source: 'https://github.com/workshopeuropa/workshopeuropa.com',
	issues: 'https://github.com/workshopeuropa/workshopeuropa.com/issues',
	rss: '/news/rss.xml',
	atom: '/news/atom.xml'
} as const;

/* Four sections. The commitments are the front page — you get to them by
   pressing the wordmark in the header or the footer — and what each project
   declares sits with the project rather than in a list of its own. */
export const nav = [
	{ href: '/news', label: 'News' },
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/join', label: 'Join' }
] as const;
