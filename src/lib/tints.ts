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

/* ---- The shades ----------------------------------------------------------
   Each tint has a dark partner: less saturated, much darker, and colder by
   a fixed number of degrees. "Colder" is a direction, not a sign — 225 is the
   coldest point on the wheel, so each hue moves that many degrees along the
   shorter arc towards it. Orange goes up towards yellow, pink goes down
   towards violet, and 225 itself has nowhere colder to go.
   -------------------------------------------------------------------------- */

/** The cold pole: the point on the wheel every hue moves towards to get
    colder. A cyan-leaning blue rather than pure blue — 240 is already
    turning towards violet, and 210 reads colder than 225. */
export const COLD_POLE = 210;
/** Under test. Raise it for a colder set, drop it to 0 to keep the hue. */
export const COLD_SHIFT = 15;

export function colder(hue: number, by = COLD_SHIFT) {
	const up = (COLD_POLE - hue + 360) % 360;
	const down = (hue - COLD_POLE + 360) % 360;
	if (up === 0) return hue; // already the coldest hue there is
	// Equidistant (45°) goes up, which lands on yellow rather than orange.
	return (hue + (up <= down ? by : -by) + 360) % 360;
}

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

/** The dark partner of a tint, as a hue. */
export function shadeHue(tint: Tint) {
	return colder(tint.hue);
}

/** The one a page shows. Every card on that page shares it. */
export function pickTint(): Tint {
	return tints[Math.floor(Math.random() * tints.length)];
}
