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
import { site } from '$lib/content/site';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const entries = ordered
		.map(
			(note) => `	<entry>
		<title>${escapeXml(note.title)}</title>
		<link href="${escapeXml(noteUrl(note))}" />
		<id>${escapeXml(noteUrl(note))}</id>
		<updated>${noteDate(note).toISOString()}</updated>
		<summary>${escapeXml(noteSummary(note))}</summary>
	</entry>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>${escapeXml(feed.title)}</title>
	<subtitle>${escapeXml(feed.description)}</subtitle>
	<link href="${escapeXml(feed.atom)}" rel="self" />
	<link href="${escapeXml(feed.home)}" />
	<id>${escapeXml(feed.home)}</id>
	<updated>${updated.toISOString()}</updated>
	<author><name>${escapeXml(site.name)}</name></author>
${entries}
</feed>
`;

	return new Response(body, { headers: headers('application/atom+xml') });
};
