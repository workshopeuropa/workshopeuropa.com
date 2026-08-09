import {
	escapeXml,
	feed,
	headers,
	noteDate,
	noteSummary,
	noteUrl,
	ordered,
	updated
} from '$lib/feed';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const items = ordered
		.map(
			(note) => `		<item>
			<title>${escapeXml(note.title)}</title>
			<link>${escapeXml(noteUrl(note))}</link>
			<guid isPermaLink="true">${escapeXml(noteUrl(note))}</guid>
			<pubDate>${noteDate(note).toUTCString()}</pubDate>
			<description>${escapeXml(noteSummary(note))}</description>
		</item>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(feed.title)}</title>
		<link>${escapeXml(feed.home)}</link>
		<description>${escapeXml(feed.description)}</description>
		<language>en</language>
		<lastBuildDate>${updated.toUTCString()}</lastBuildDate>
		<atom:link href="${escapeXml(feed.rss)}" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(body, { headers: headers('application/rss+xml') });
};
