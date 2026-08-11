/**
 * Notes and releases, newest first.
 *
 * Minimal chrome on purpose: no categories until there are more than about
 * forty of these, at which point the list stops being readable in one go.
 */

export type Note = {
	/** ISO in the data, `9 August 2026` in the prose. */
	date: string;
	title: string;
	/** Two or three sentences. */
	body: string;
	/** What it is about, on the meta line beside the date. */
	subject?: string;
	link?: { label: string; href: string };
};

/** The headline the News page and its footer card carry. */
export const newsTitle = 'Notes from the bench';

export const newsIntro = 'Releases, specification updates, and notes from the bench.';

export const newsEmpty = 'Nothing posted yet.';

export const news: Note[] = [
	{
		date: '2026-08-09',
		title: 'Five things, each with a test',
		subject: 'Workshop Europa',
		body: 'The commitments are published, each with the condition under which we would have failed it. Every project on the bench now says which of the five it holds to, and how it meets each test.',
		link: { label: 'Read the commitments', href: '/#commitments' }
	},
	{
		date: '2026-06-02',
		title: 'Vionio, in public',
		subject: 'Vionio',
		body: 'The first public build of Vionio is out of the workshop. Your following exports in one step and lands on another server without asking us for anything.'
	},
	{
		date: '2026-04-18',
		title: 'Föreningen Idun',
		subject: 'Idun',
		body: 'The specification moves to a non-profit association. Whoever stewards a layer other people depend on should be structurally incapable of selling it, and this is what that looks like on paper.'
	},
	{
		date: '2026-02-09',
		title: 'The workshop opens',
		subject: 'Workshop Europa',
		body: 'Workshop Europa starts work, with three projects on the bench and a fourth waiting.'
	}
];

/** A note has no page of its own, so its address is an anchor on /news.
    The same string is the anchor on the page and the id in both feeds. */
export function noteSlug(note: Note) {
	const title = note.title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
	return `${note.date}-${title}`;
}

export function formatDate(iso: string) {
	return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
