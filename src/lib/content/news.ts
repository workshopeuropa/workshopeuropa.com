import { m } from '$lib/paraglide/messages'
import { getLocale } from '$lib/paraglide/runtime'

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
	/** A permanent URL segment shared by every translation. */
	slug: string;
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
	translation?: { title: () => string; body: (input: { date: string }) => string };
};

/** The headline the News page and its footer card carry. */
export const newsTitle = m.news_title

export const newsEmpty = m.news_empty

export const news: Note[] = [
	{
		slug: '2026-10-26-workshop-europa-association',
		date: '2026-10-26',
		title: 'Workshop Europa association',
		subject: 'Workshop Europa',
		body: 'The Workshop Europa association was established on 26 October 2026. CVR 46878248.',
		translation: { title: m.news_association_title, body: m.news_association_body }
	}
]

/** Both body shapes as the one shape. The short form stays available in the
    file above — a note that is two sentences should not have to be written
    as an array to say so. */
export function blocks(note: Note, { localize = false } = {}): Block[] {
	const body = localize && note.translation
		? note.translation.body({ date: formatDate(note.date) })
		: note.body
	return typeof body === 'string' ? [{ type: 'p', text: body }] : body
}

export function noteTitle(note: Note) {
	return note.translation?.title() ?? note.title
}

export function notePath(note: Note) {
	return `/news/${note.slug}`
}

export function formatDate(iso: string) {
	const locale = getLocale()
	return new Date(iso + "T00:00:00Z").toLocaleDateString(locale === 'en' ? 'en-GB' : locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	})
}
