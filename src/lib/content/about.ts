/** The About page, in one place. */

/**
 * The headline, broken where a card should break it. Two lines at every
 * width — on a wide card it would otherwise set as one long line and stop
 * looking like the rest of the set. `title` is joined back up from this, so
 * the two cannot drift apart.
 *
 * Nothing reads the broken form any more: page headings are tracked capitals
 * now, short enough to find their own turn, so the page sets `title` and
 * leaves the break to the label. Kept because the break is a judgement about
 * the sentence — the second line answers the first — and that judgement is
 * worth more than the line of code that used it.
 */
export const aboutTitleLines = ['Independence', 'is infrastructure'];

/** What the About card in the closing row is headed. Plainer than the page's
    own headline on purpose: the card is a door, and a door says where it
    goes rather than making the argument on the other side of it. */
export const aboutCardTitle = 'The workshop';

export const about = {
	title: aboutTitleLines.join(' '),

	/** Section one: the argument, and the claim it lands on. */
	argument: {
		body: [
			'Software you depend on can be sold, closed, or quietly turned against you. Not because anyone is a villain, but because the money usually comes from somewhere other than you.',
			'Europe has spent a decade regulating the symptoms and almost no time building the alternative. Workshop Europa is a small attempt at the second thing: build the software, publish the commitments, and keep a public list of everyone else doing the same.'
		],
		claim: 'Independence is infrastructure.'
	},

	/** Section two: a typographic device, not a language switcher. The words
	    link to nothing.

	    Off the page for now — it was the one centred thing left on a site
	    that is otherwise set from the left, and it read as a stray rather
	    than as a device. Kept whole so it can come back somewhere the
	    centring is the point. */
	languages: {
		words: ['Bottega', 'Atelier', 'Verkstad', 'Werkstatt', 'Warsztat', 'Workshop'],
		line: 'Same room, same bench, six languages.'
	},

	/** Section three: where the name comes from, both ways. */
	europa: {
		body: [
			'Europa was carried across the sea and gave the continent its name. Europa was also the name of Europe’s first launcher programme, in the 1960s — an attempt, mostly unsuccessful, to reach orbit without depending on anyone else’s rockets.',
			'Both readings are the point. The second one more than the first.'
		]
	},

	/** Section four: how it is run, which is the only reason a declaration
	    here is worth reading. */
	run: {
		body: [
			'Workshop Europa is a name, not an institution. It publishes a handful of products and it publishes the commitments they answer to.',
			'There’s no approval step, no fee, and no board. The commitments are written to be repeated rather than attributed, so holding to them doesn’t go through anyone. Our own projects declare against them in public, and can be held to the same tests as anyone else.',
			'If this outgrows one person looking after it, stewardship moves to an association. That’s a promise about structure, not about intent.'
		]
	},

	/** Section five: one paragraph and one outbound link. The biography lives
	    on alfrednerstu.com — this site is the umbrella, not the CV. */
	who: {
		before: 'Started in Copenhagen by ',
		link: { label: 'Alfred Nerstu', href: 'https://alfrednerstu.com' },
		after:
			', an independent designer and developer. Twenty years of work for other people’s brands, turned toward software that answers to the people using it.'
	}
};
