/**
 * The five commitments.
 *
 * No product is named on this page or in this file. Commitment 5 is the
 * argument a protocol makes, stated generally — naming the protocol inside a
 * standard other people sign turns a commitment into a moat.
 */

export type Commitment = {
	/** 1–5. The number is part of how a commitment is referred to. */
	n: number;
	/** The anchor on /commitments, and what the register filters by. */
	slug: string;
	/** The commitment itself. */
	title: string;
	/** The filter label and the register's indicator, without the number. */
	short: string;
	/** One paragraph per string. */
	body: string[];
	/** The condition under which we would have failed it. */
	test: string;
	/** A line after the test, where a commitment has one. */
	coda?: string;
	/** The turn in the set that this commitment opens, where it opens one.
	    Stage directions rather than headings — the page sets them quieter
	    than the commitments they introduce. */
	opens?: string;
};

export const commitments: Commitment[] = [
	{
		n: 1,
		slug: 'funded-by-users',
		title: 'Funded by the people we build for',
		short: 'Funded by users',
		opens: 'What we owe you',
		body: [
			'Our money comes from the people using the thing. Nobody pays us for access to you.'
		],
		test: 'every euro traces back to a user. Ask for the breakdown.'
	},
	{
		n: 2,
		slug: 'no-competition-for-time',
		title: 'We don’t compete for your time',
		short: 'No competition for time',
		body: [
			'We’re not trying to keep you here longer than you meant to stay — not in the ranking, not in the notifications, not in how hard it is to leave.'
		],
		test: 'no one here is measured on time spent.'
	},
	{
		n: 3,
		slug: 'you-can-leave',
		title: 'You can leave with everything',
		short: 'You can leave',
		body: [
			'Everything you’ve made leaves in an open format, complete, in one step — your data, your connections, and your identity with it. You shouldn’t need our help or our permission to go.'
		],
		test: 'a competitor can take you in without talking to us.'
	},
	{
		n: 4,
		slug: 'everyones-a-person',
		title: 'Everyone here is a person',
		short: 'Everyone’s a person',
		opens: '— and one thing we ask in return.',
		body: [
			'You prove you’re a person, not which person. Spam farms and coordinated campaigns depend on accounts being free to make; this makes them expensive without making you identifiable.'
		],
		test: 'the proof is issued by someone else. We never see the identity behind it.',
		coda: 'Applies wherever people can reach each other.'
	},
	{
		n: 5,
		slug: 'nobody-owns-the-layer',
		title: 'Nobody owns the layer everyone depends on',
		short: 'Nobody owns the layer',
		opens: '— and one that binds all of us.',
		body: [
			'Own your product, your hosting, your name. Not the specification, not the identity layer, not the right to implement them. Whoever stewards the shared parts has to be structurally incapable of selling them.'
		],
		test: 'anyone can build on it without a licence, a fee, or a conversation.',
		coda:
			'This binds both ways: if you operate a shared layer, you can’t own it. If you don’t, you only build on ones nobody owns.'
	}
];

/** The h1, and the headline the footer's card carries. */
export const commitmentsTitle = 'Five things, each with a test.';

export const commitmentsIntro =
	'Anyone can claim principles. These come with the conditions under which we’d have failed them.';

/** The summary the front page carries, in place of the commitments themselves. */
export const commitmentsSummary = {
	title: 'Five things we hold to.',
	note: 'Each one comes with a test. If we fail the test, say so publicly.'
};

export const commitmentsFooter =
	'These are written to be repeated, not attributed. Take them, use them in your own voice, hold yourself to them. Nothing here names a company, and nothing here needs our permission.';

export function getCommitment(n: number): Commitment | undefined {
	return commitments.find((commitment) => commitment.n === n);
}
