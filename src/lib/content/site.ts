/**
 * Everything the site says about itself. Edit here, not in the components.
 */

export const site = {
	name: 'Workshop Europa',
	url: 'https://workshopeuropa.com',
	descriptor: 'A design workshop',
	tagline: 'Independent software, built in the open',
	description:
		'Workshop Europa is a small design workshop. We take on a handful of projects a year and build them properly, in the open, with the people who will live with them.',
	email: 'hello@workshopeuropa.com',
	/** The image the front-page card sits on. */
	image: {
		src: '/media/workshop.svg',
		alt: 'Sheets of paper halved and halved again across the workshop bench.'
	}
} as const;

export const nav = [
	{ href: '/join', label: 'Join' },
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/news', label: 'News' }
] as const;

/** The manifesto. One card per entry. */
export const manifesto: { title: string; body: string[] }[] = [
	{
		title: 'Make fewer things',
		body: [
			'A workshop can only hold so much at once. We keep the number of open projects small enough that every one of them gets the attention it was promised.',
			'Fewer things, finished.'
		]
	},
	{
		title: 'Build in the open',
		body: [
			'Work in progress is shown early and often — to the people paying for it, to the people who will use it, and to whoever else is curious.',
			'Nothing here is a surprise at the end.'
		]
	},
	{
		title: 'Keep the tools simple',
		body: [
			'Plain formats, small dependencies, things that can still be opened in ten years.',
			'A tool you can repair yourself is worth two you cannot.'
		]
	},
	{
		title: 'Europe as a workshop',
		body: [
			'The name is a claim about method, not geography: a continent of small studios, shared benches and long apprenticeships.',
			'We would like to work like that.'
		]
	}
];

/** The headline the News page and its footer card carry. */
export const newsTitle = 'Notes from the bench';

/** Short notes, newest first. */
export const news: { date: string; title: string; body: string }[] = [
	{
		date: '2026-06-02',
		title: 'Vionio, in public',
		body: 'The first public build of Vionio is out of the workshop and into the hands of people who asked for it.'
	},
	{
		date: '2026-04-18',
		title: 'Bench space, autumn',
		body: 'Two places open at the bench from September. Join if you would like one of them.'
	},
	{
		date: '2026-02-09',
		title: 'The workshop opens',
		body: 'Workshop Europa starts work, with three projects on the bench and a fourth waiting.'
	}
];

export function formatDate(iso: string) {
	return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
