import type { LayoutServerLoad } from './$types';

/* This used to hand every page a hue, walking one stop round the tint scale
   per navigation and keeping its place in a cookie. A hue belongs to a
   subject now rather than to a page — see src/lib/tints.ts — so the colour
   on a card is a static fact about what the card is about, and there is
   nothing left for the server to decide or to remember.

   The `we-tint` cookie it used to set is no longer read. Nothing has to be
   done about the ones already out there: they expire on their own, and a
   stale one is now just an unread thirty-byte header. */
export const load: LayoutServerLoad = async ({ locals }) => {
	return { user: locals.user };
};
