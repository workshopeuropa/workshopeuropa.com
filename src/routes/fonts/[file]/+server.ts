import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { RequestHandler } from './$types';

/**
 * Areal, handed out from a directory beside the app rather than from the
 * build.
 *
 * The font is licensed and this repository is public, so the files cannot be
 * committed — which also rules out `static/`, since that is baked into the
 * build and a file that arrives afterwards never reaches it. They sit on the
 * volume instead, next to the database, and this route reads them from
 * there. The URL is the same one the stylesheet and the preloads in app.html
 * already ask for, so nothing else in the site knows the difference.
 *
 * Put them at $FONTS_DIR (./data/fonts by default, so /app/data/fonts where
 * the app runs out of /app). Upload them the way the database file gets
 * there; they persist across deploys because the volume does.
 *
 * With nothing there this route 404s, the stack falls through to a system
 * grotesque, and the site is fine. That is the whole reason the fonts are
 * not resolved at build time: a missing licensed binary should cost you the
 * texture of the type, not the deploy.
 *
 * See docs/fonts.md.
 */

/**
 * The two the site asks for, by exact name. A whitelist and not a sanitised
 * path: the directory is on the same volume as the database, and the only
 * thing this route has any business handing out is these two files.
 */
const FONTS = new Set(['areal-regular.woff2', 'areal-medium.woff2']);

/** A week, revalidated by ETag. Not `immutable`, because the URL carries no
    hash — replace a cut under the same name and a client that has it should
    find out within the week rather than never. */
const CACHE = 'public, max-age=604800';

export const prerender = false;

export const GET: RequestHandler = async ({ params, request }) => {
	if (!FONTS.has(params.file)) error(404, 'No such font');

	const path = join(resolve(env.FONTS_DIR || './data/fonts'), params.file);

	const found = await Promise.all([readFile(path), stat(path)]).catch(() => null);
	if (!found) error(404, 'Font not installed');
	const [file, info] = found;

	/* Size and mtime rather than a hash of the bytes: this runs on every
	   request that has not cached yet, and the two together change whenever
	   the file does. */
	const etag = `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;
	if (request.headers.get('if-none-match') === etag) {
		return new Response(null, { status: 304, headers: { etag, 'cache-control': CACHE } });
	}

	return new Response(file, {
		headers: {
			'content-type': 'font/woff2',
			'content-length': String(info.size),
			etag,
			'cache-control': CACHE
			/* No access-control-allow-origin. A same-origin request in CORS
			   mode — which is what the preload makes — does not need one, and
			   adding it would let any other site link straight to a font we
			   are licensed to serve from this domain. */
		}
	});
};
