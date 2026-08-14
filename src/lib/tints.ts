/**
 * The tint scale: twelve hues, 30° apart, offset by 15°. Angles are OKLCH,
 * not HSL, so they do not mean what the old ones meant — the green the site
 * started from was 75 in HSL and is 120 in OKLCH. 12 × 30 closes the wheel
 * exactly, so the wrap from 345 back to 15 is the same step as every other,
 * and in OKLCH those steps are also perceptually equal, which in HSL they
 * were not.
 *
 * The offset is kept, which means the house green is no longer on the scale:
 * 120 falls between 105 and 135. 135 is the stop that lands nearest to a
 * green — 105 comes out khaki — so 135 carries the name and starts the walk.
 *
 * The recipes that turn a hue into a colour live in src/app.css.
 *
 * The names are the common colour each hue lands on at this lightness and
 * chroma, checked against the nearest CSS named colours by OKLCH hue angle.
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
    colder. A cyan-leaning blue rather than pure blue — in OKLCH 264 is
    already turning towards violet, and 255 reads colder. It is itself a stop
    on the scale, so Cornflower's shade is its own hue; under the old pole no
    hue landed on it and two shared the result. */
export const COLD_POLE = 255;
/** Under test. Raise it for a colder set, drop it to 0 to keep the hue. */
export const COLD_SHIFT = 15;

export function colder(hue: number, by = COLD_SHIFT) {
	const up = (COLD_POLE - hue + 360) % 360;
	const down = (hue - COLD_POLE + 360) % 360;
	if (up === 0) return hue; // already the coldest hue there is
	// Equidistant (75°) goes up, which heads for green rather than orange.
	return (hue + (up <= down ? by : -by) + 360) % 360;
}

export type Tint = { hue: number; name: string };

export const tints: Tint[] = [
	{ hue: 15, name: 'Rose' },
	{ hue: 45, name: 'Coral' },
	{ hue: 75, name: 'Sand' },
	{ hue: 105, name: 'Straw' },
	{ hue: 135, name: 'Lime' }, // the house colour
	{ hue: 165, name: 'Mint' },
	{ hue: 195, name: 'Aqua' },
	{ hue: 225, name: 'Sky' },
	{ hue: 255, name: 'Cornflower' },
	{ hue: 285, name: 'Periwinkle' },
	{ hue: 315, name: 'Lilac' },
	{ hue: 345, name: 'Orchid' }
];

export const hues = tints.map((tint) => tint.hue);

/** The dark partner of a tint, as a hue. */
export function shadeHue(tint: Tint) {
	return colder(tint.hue);
}

/** Where the walk begins: Lime, the nearest stop to the colour the site
    started from. */
export const START = tints.findIndex((tint) => tint.hue === 135);

/**
 * The next colour along. Pages step round the wheel one stop at a time
 * rather than jumping about, so moving through the site reads as a
 * progression instead of a shuffle.
 */
export function stepTint(previous: number | null): { index: number; tint: Tint } {
	const index = previous === null ? START : (previous + 1) % tints.length;
	return { index, tint: tints[index] };
}
