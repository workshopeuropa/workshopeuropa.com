import { stepTint, tints } from '$lib/tints';
import type { LayoutServerLoad } from './$types';

const COOKIE = 'we-tint';

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
	// Touching the URL makes this load a dependency of navigation, so the
	// walk advances a step on every page rather than once per session.
	void url.pathname;

	const seen = Number(cookies.get(COOKIE));
	const previous = Number.isInteger(seen) && seen >= 0 && seen < tints.length ? seen : null;
	const { index, tint } = stepTint(previous);

	// Per visitor, not per server: a shared counter would jump several stops
	// whenever somebody else loaded a page in between.
	cookies.set(COOKIE, String(index), {
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30
	});

	return { user: locals.user, tint };
};
