/**
 * Notes and releases, newest first.
 *
 * Minimal chrome on purpose: no categories until there are more than about
 * forty of these, at which point the list stops being readable in one go.
 */

/**
 * A piece of a note's body. Two shapes, because a note is prose and a note
 * is occasionally prose with a list in the middle of it, and nothing here
 * has ever wanted a third.
 *
 * Structure rather than markup: a paragraph is `{ type: 'p' }` and not a
 * string of HTML, so the page and both feeds each render it the way their
 * own format wants, and nothing in the content file can put a tag somewhere
 * a tag should not go.
 */
export type Block =
	{ type: "p"; text: string } | { type: "list"; items: string[] };

export type Note = {
	/** ISO in the data, `9 August 2026` in the prose. */
	date: string;
	title: string;
	/** One paragraph as a plain string, which is what most notes are, or the
	    blocks it is built from where a note runs longer. Read it through
	    `blocks()` rather than directly — a string body is one paragraph and
	    everything that renders a note should see it as one. */
	body: string | Block[];
	/** What it is about, on the meta line beside the date. */
	subject?: string;
	link?: { label: string; href: string };
};

/** The headline the News page and its footer card carry. */
export const newsTitle = "Notes from the bench"

export const newsIntro = "Releases, updates & notes from the bench."

export const newsEmpty = "Nothing posted yet."

export const news: Note[] = [
	{
		date: '2026-10-26',
		title: 'Workshop Europa association',
		subject: 'Workshop Europa',
		body: 'The Workshop Europa association was established on 26 October 2026. CVR 46878248.'
	}
]

/** Both body shapes as the one shape. The short form stays available in the
    file above — a note that is two sentences should not have to be written
    as an array to say so. */
export function blocks(note: Note): Block[] {
	return typeof note.body === "string"
		? [{ type: "p", text: note.body }]
		: note.body
}

/** A note has no page of its own, so its address is an anchor on /news.
    The same string is the anchor on the page and the id in both feeds. */
export function noteSlug(note: Note) {
	const title = note.title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")
	return `${note.date}-${title}`
}

export function formatDate(iso: string) {
	return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	})
}
