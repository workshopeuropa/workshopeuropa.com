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
 *
 * ---- What changed -----------------------------------------------------
 *
 * A hue used to belong to a page, handed out by a walk round the wheel that
 * advanced a stop per navigation and kept its place in a cookie. It belongs
 * to a subject now: Workshop Europa is lime, Risved is sand, Inlägg is aqua,
 * and a card wears the colour of whatever it is about rather than the colour
 * of where it happens to sit. Three cards in a row on the front page is what
 * settled it — under the walk they were three cards of one hue, which said
 * nothing about the three different things on them.
 *
 * So the walk is gone, and with it the cookie and the per-request load that
 * turned it. What a page is about is a static fact, which is one fewer thing
 * for the server to decide.
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

/** A tint by name, for the table below and for anything that stores one. */
export function byName(name: string): Tint | undefined {
	return tints.find((tint) => tint.name === name);
}

/* ---- Who wears what ------------------------------------------------------
   The studio and the four projects. Everything else on the site is about one
   of them: a note is about the project it announces, the Projects card is
   about the project it shows, and a page with no particular subject — About,
   Join, the front page — is about the studio, which is lime.

   Three of these are from the design. Vionio and Idun are not in it, so
   their two are a choice: the far side of the wheel from the three that were
   given, and far enough from each other to be told apart on a phone. Change
   them here and every card, page and label follows.
   -------------------------------------------------------------------------- */

/** The studio itself, and the fallback for anything unrecognised. */
export const HOUSE = 'Workshop Europa';

const subjectTints: Record<string, string> = {
	'workshop europa': 'Lime',
	vionio: 'Periwinkle',
	risved: 'Sand',
	inlagg: 'Aqua',
	idun: 'Cornflower'
};

/**
 * The lookup key for a subject, which arrives in more than one shape: a
 * project's slug (`inlagg`), its title (`Inlägg • Indlæg • Innlegg`), or the
 * subject written on a note (`Workshop Europa`).
 *
 * The first name only — a project with three of them is one subject — and
 * folded to unaccented lowercase, so `Inlägg` and `inlagg` are the same key.
 */
export function subjectKey(subject: string): string {
	return subject
		.split('•')[0]
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.trim()
		.toLowerCase()
		.replace(/\s+/g, ' ');
}

/**
 * The tint a subject wears. Anything unrecognised — and anything with no
 * subject at all — gets the house colour, so a card is never uncoloured and
 * a typo in a note's subject is a wrong hue rather than a broken page.
 */
export function tintFor(subject?: string | null): Tint {
	const name = subject ? subjectTints[subjectKey(subject)] : undefined;
	return byName(name ?? '') ?? byName(subjectTints[subjectKey(HOUSE)])!;
}

/** The two custom properties a card sets to wear a tint. Everything that
    colours something reads this, so the pair can never drift apart. */
export function tintVars(tint: Tint): string {
	return `--hue:${tint.hue};--hue-cold:${shadeHue(tint)}`;
}
