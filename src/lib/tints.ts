/**
 * The tint scale: twelve hues, 30° apart, offset by 15° so that 75 — the
 * house colour the site started from — sits on the scale rather than beside
 * it. 12 × 30 closes the wheel exactly, so the wrap from 345 back to 15 is
 * the same step as every other.
 *
 * The CSS side of this lives in src/app.css as --tint-15 … --tint-345.
 *
 * The names are the common colour each hue lands on at this saturation and
 * lightness, checked against the nearest CSS named colours by hue angle.
 */

export const HUE_STEP = 30;
export const HUE_OFFSET = 15;

export type Tint = { hue: number; name: string };

export const tints: Tint[] = [
	{ hue: 15, name: 'Coral' },
	{ hue: 45, name: 'Butter' },
	{ hue: 75, name: 'Lime' }, // the house colour
	{ hue: 105, name: 'Apple' },
	{ hue: 135, name: 'Spring' },
	{ hue: 165, name: 'Mint' },
	{ hue: 195, name: 'Sky' },
	{ hue: 225, name: 'Cornflower' },
	{ hue: 255, name: 'Periwinkle' },
	{ hue: 285, name: 'Lilac' },
	{ hue: 315, name: 'Orchid' },
	{ hue: 345, name: 'Rose' }
];

export const hues = tints.map((tint) => tint.hue);

/** The one a page shows. Every card on that page shares it. */
export function pickTint(): Tint {
	return tints[Math.floor(Math.random() * tints.length)];
}
