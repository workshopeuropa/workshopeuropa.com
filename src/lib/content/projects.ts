/**
 * Projects. One entry per project — the list page and the project page
 * both read from here, so adding a project is one object.
 */

export type Project = {
	slug: string;
	title: string;
	/** The one-line "what is it". Shown under the title on the project card. */
	subtitle: string;
	year: string;
	discipline: string;
	status: 'In the workshop' | 'Out in the world' | 'Resting';
	/** Shown on the index card and used as the meta description. */
	summary: string;
	/** A tall screenshot for the project page — the card sits on top of it. */
	image?: { src: string; alt: string };
	/** The project page, one paragraph per string. */
	body: string[];
	credits?: { role: string; name: string }[];
	links?: { label: string; href: string }[];
};

export const projects: Project[] = [
	{
		slug: 'vionio',
		title: 'Vionio',
		subtitle: 'A reading room for moving images',
		year: '2026',
		discipline: 'Product, identity, build',
		status: 'Out in the world',
		summary:
			'A quiet place to keep, watch and annotate film — built for people who return to the same twenty films for the rest of their lives.',
		image: {
			src: '/media/vionio.svg',
			alt: 'A shelf of films in the Vionio reading room, with notes running down the side.'
		},
		body: [
			'Vionio started as a complaint. Everything built for film is built for discovery: endless shelves, endless rows, an algorithm certain you have not yet met your favourite film. But most people already know what they love. What they lack is somewhere to keep it.',
			'So Vionio is a reading room rather than a shop. You bring a small collection in, and the room gives it back to you organised: notes attached to timecodes, essays beside the films they argue about, a shelf that stays where you left it.',
			'The interface is almost entirely typographic. Posters are used sparingly and never as decoration — an image earns its place only when it says something the words cannot. The whole thing runs on one small server and will keep running on one small server.',
			'It went into public use in the summer of 2026 and is now maintained rather than expanded, which was always the plan.'
		],
		credits: [
			{ role: 'Design and build', name: 'Workshop Europa' },
			{ role: 'Editorial', name: 'The Vionio readers' }
		],
		links: [{ label: 'vionio.com', href: 'https://vionio.com' }]
	},
	{
		slug: 'bottega',
		title: 'Bottega',
		subtitle: 'An apprenticeship, arranged as software',
		year: '2025—',
		discipline: 'Programme, tools, writing',
		status: 'In the workshop',
		summary:
			'A year-long bench programme for two people at a time, and the small set of tools that keeps it honest.',
		image: {
			src: '/media/bottega.svg',
			alt: 'The Bottega bench log, showing what each person is holding this week.'
		},
		body: [
			'Bottega is how the workshop teaches. Two people join the bench for a year, work on real projects from the first week, and leave with a body of finished work rather than a certificate.',
			'The software is deliberately thin: a shared log, a review queue, and a way to see what everyone is holding this week. It exists to make the arrangement legible, not to manage anybody.',
			'The programme is the project. The tools are the offcuts, and we publish them because someone else will want to run a bench of their own.'
		],
		credits: [{ role: 'Programme and tools', name: 'Workshop Europa' }]
	},
	{
		slug: 'a-series',
		title: 'A-Series',
		subtitle: 'A grid built on 1 : √2',
		year: '2025',
		discipline: 'Type, layout, open source',
		status: 'Out in the world',
		summary:
			'The layout system behind this site: every surface an ISO 216 rectangle, folded in half to make the next one.',
		image: {
			src: '/media/a-series.svg',
			alt: 'An A4 sheet folded down through A5 and A6, each half the one before.'
		},
		body: [
			'A sheet of A4 halved is A5, halved again is A6, and the proportion never changes. It is the only paper standard that survives its own folding, and it makes a good grid for screens for the same reason it makes good paper.',
			'A-Series is that idea written down: a set of card sizes, a type scale measured against the card rather than the viewport, and rules for when a card may grow beyond its ratio rather than clip what is inside it.',
			'It is used here, on this site, which is the shortest documentation we could write for it.'
		],
		links: [{ label: 'The ratio, explained', href: 'https://en.wikipedia.org/wiki/ISO_216' }]
	},
	{
		slug: 'nice-to-meet-you',
		title: 'Nice to meet you',
		subtitle: 'Correspondence, on paper',
		year: '2024—',
		discipline: 'Print, editorial',
		status: 'Resting',
		summary:
			'A letter sent four times a year to everyone who has joined, printed at A5 and posted rather than delivered.',
		image: {
			src: '/media/nice-to-meet-you.svg',
			alt: 'A letter folded once, ready for the envelope.'
		},
		body: [
			'Everybody who joins the workshop gets a letter. It is printed, folded once, and posted — four times a year, no more.',
			'The letter carries whatever is on the bench: a drawing that did not work, a paragraph from a project brief, a note about something we read. It is not a newsletter and it does not measure whether you opened it.',
			'It is resting while the workshop is busy, and it will come back when there is something worth the postage.'
		]
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
