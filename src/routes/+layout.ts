import { pickHue } from '$lib/tints';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url, data }) => {
	// Touching the URL registers it as a dependency of this load, so SvelteKit
	// re-runs it on every navigation and the next page draws a fresh colour.
	// Without it a layout load runs once and the colour sticks for the session.
	void url.pathname;

	// Drawn here rather than in the component so the server and the client
	// agree: the value is serialised with the page and reused on hydration.
	return { ...data, hue: pickHue() };
};
