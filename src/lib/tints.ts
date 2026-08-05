/**
 * The tint scale: fifteen hues, 24° apart, which closes the wheel exactly.
 * The CSS side of this lives in src/app.css as --tint-0 … --tint-336.
 */

export const HUE_STEP = 24;

export const hues = Array.from({ length: 360 / HUE_STEP }, (_, i) => i * HUE_STEP);

/** The one a page shows. Every card on that page shares it. */
export function pickHue() {
	return hues[Math.floor(Math.random() * hues.length)];
}
