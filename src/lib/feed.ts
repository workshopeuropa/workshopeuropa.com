/**
 * The feeds. Both of them, in full — a feed is what this audience will look
 * for first, and publishing one is the same argument the commitments make:
 * you can read this site without ever coming back to it.
 *
 * A note has no page of its own, so its address is an anchor on /news and
 * its id is that address. Ids are stable as long as a note's date and title
 * are, which is the deal every feed reader assumes.
 */

import { news, noteSlug, type Note } from './content/news';
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
	return `${feed.home}#${noteSlug(note)}`;
}

/** Midday rather than midnight, so a reader in a western timezone does not
    file the note under the day before. */
export function noteDate(note: Note) {
	return new Date(`${note.date}T12:00:00Z`);
}

export const updated = ordered.length ? noteDate(ordered[0]) : new Date(0);

/** What a note says in a feed: the body, and the subject where it has one. */
export function noteSummary(note: Note) {
	return note.subject ? `${note.subject} — ${note.body}` : note.body;
}

export const headers = (type: string) => ({
	'Content-Type': `${type}; charset=utf-8`,
	/* Long enough that a reader polling every quarter of an hour is not
	   rebuilding the page each time, short enough that a note published this
	   morning is out by lunch. */
	'Cache-Control': 'public, max-age=1800'
});
