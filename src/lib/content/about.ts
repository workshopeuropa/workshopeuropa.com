/** The About page, in one place. */

export const about = {
	title: 'Why this exists.',

	/** Section one: the argument, and the claim it lands on. */
	argument: {
		body: [
			'Software you depend on can be sold, closed, or quietly turned against you. Not because anyone is a villain, but because the money usually comes from somewhere other than you.',
			'Europe has spent a decade regulating the symptoms and almost no time building the alternative. Workshop Europa is a small attempt at the second thing: build the software, publish the commitments, and keep a public list of everyone else doing the same.'
		],
		claim: 'Independence is infrastructure.'
	},

	/** Section two: a typographic device, not a language switcher. The words
	    link to nothing. */
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

	/** Section four: how it is run, which is the only reason the register is
	    worth reading. */
	run: {
		body: [
			'Workshop Europa is a name, not an institution. It publishes a handful of products and it keeps the register.',
			'There’s no approval step, no fee, and no board. Adding yourself to the register doesn’t go through anyone. Our own projects are listed on the same terms as everyone else’s, which is the only reason the list is worth reading.',
			'If the register outgrows one person looking after it, stewardship moves to an association. That’s a promise about structure, not about intent.'
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
