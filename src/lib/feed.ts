/**
 * The feeds. Both of them, in full — a feed is what this audience will look
 * for first, and publishing one is the same argument the commitments make:
 * you can read this site without ever coming back to it.
 */

import { blocks, news, notePath, type Note } from './content/news'
import { site } from './content/site';

const ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&apos;'
};

export function escapeXml(value: string) {
	return value.replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

export const feed = {
	title: `${site.name} — news`,
	description: 'Releases, specification updates, and notes from the bench.',
	home: `${site.url}/news`,
	rss: `${site.url}/news/rss.xml`,
	atom: `${site.url}/news/atom.xml`
};

/** Newest first, whatever order the file happens to be in. */
export const ordered = [...news].sort((a, b) => b.date.localeCompare(a.date));

export function noteUrl(note: Note) {
	return new URL(notePath(note), site.url).href
}

/** Preserve the item identifiers published before notes had their own pages. */
export function noteFeedId(note: Note) {
	return `${feed.home}#${note.slug}`
}

/** Midday rather than midnight, so a reader in a western timezone does not
    file the note under the day before. */
export function noteDate(note: Note) {
	return new Date(`${note.date}T12:00:00Z`);
}

export const updated = ordered.length ? noteDate(ordered[0]) : new Date(0);

/** A note's whole body as one run of text. Both feeds carry a summary as
    plain text rather than as markup, so the structure survives in the only
    way plain text has: a paragraph keeps the blank line after it and a list
    keeps a bullet on every point. Five points run together into one
    sentence would be worse than the markup is worth. */
export function noteText(note: Note) {
	return blocks(note)
		.map((block) =>
			block.type === 'list' ? block.items.map((point) => `• ${point}`).join('\n') : block.text
		)
		.join('\n\n');
}

/** What a note says in a feed: the body, and the subject where it has one. */
export function noteSummary(note: Note) {
	const text = noteText(note);
	return note.subject ? `${note.subject} — ${text}` : text;
}

export const headers = (type: string) => ({
	'Content-Type': `${type}; charset=utf-8`,
	/* Long enough that a reader polling every quarter of an hour is not
	   rebuilding the page each time, short enough that a note published this
	   morning is out by lunch. */
	'Cache-Control': 'public, max-age=1800'
});
