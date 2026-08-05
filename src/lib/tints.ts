/**
 * The tint scale: fifteen hues, 24° apart, which closes the wheel exactly.
 * The CSS side of this lives in src/app.css as --tint-0 … --tint-336.
 *
 * The names are the common colour each hue lands on at this saturation and
 * lightness, checked against the nearest CSS named colours by hue angle.
 */

export const HUE_STEP = 24;

export type Tint = { hue: number; name: string };

export const tints: Tint[] = [
	{ hue: 0, name: 'Rose' },
	{ hue: 24, name: 'Peach' },
	{ hue: 48, name: 'Butter' },
	{ hue: 72, name: 'Lime' }, // the house colour
	{ hue: 96, name: 'Chartreuse' },
	{ hue: 120, name: 'Green' },
	{ hue: 144, name: 'Mint' },
	{ hue: 168, name: 'Turquoise' },
	{ hue: 192, name: 'Sky' },
	{ hue: 216, name: 'Cornflower' },
	{ hue: 240, name: 'Periwinkle' },
	{ hue: 264, name: 'Lilac' },
	{ hue: 288, name: 'Mauve' },
	{ hue: 312, name: 'Orchid' },
	{ hue: 336, name: 'Pink' }
];

export const hues = tints.map((tint) => tint.hue);

/** The one a page shows. Every card on that page shares it. */
export function pickTint(): Tint {
	return tints[Math.floor(Math.random() * tints.length)];
}
