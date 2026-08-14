/**
 * The five commitments. They are the front page: you get to them by pressing
 * the wordmark in the header or the footer.
 *
 * No product is named here. Commitment 5 is the argument a protocol makes,
 * stated generally — naming the protocol inside a standard other people sign
 * turns a commitment into a moat. What each project declares against these
 * lives with the project, in projects.ts.
 */

export type Commitment = {
	/** 1–5. The number is part of how a commitment is referred to. */
	n: number;
	/** The anchor on the front page. A project's page links to it for each
	    commitment it declares. */
	slug: string;
	/** The commitment itself. */
	title: string;
	/** The short label a project's declaration is listed under, without the
	    number. */
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
		slug: "funded-by-users",
		title: "Funded by our users",
		short: "Funded by users",
		opens: "our principles",
		body: [
			"People using our projects keeps the lights on. No other incentives come in the way.",
		],
		test: "Every euro traces back to a user",
	},
	{
		n: 2,
		slug: "no-competition-for-time",
		title: "We don’t compete for your time",
		short: "No competition for time",
		body: [
			"As we're not trying to please advertisers we don't need to keep you longer than you meant to stay.",
		],
		test: "No one is measured on time spent",
	},
	{
		n: 3,
		slug: "you-can-leave",
		title: "You can leave when you want",
		short: "You can leave",
		body: [
			"Everything you’ve made can leave in open formats, complete, in one step.",
		],
		test: "A competitor can take you in without asking us",
	},
	{
		n: 4,
		slug: "everyone-is-real",
		title: "Everyone is a real person",
		short: "Everyone is real",
		body: [
			"You prove you’re a person, not which person. Spam farms and coordinated campaigns depend on accounts being free to make.",
		],
		test: "The proof is issued by someone else. We never see the identity behind it.",
		coda: "Applies to social platforms where people can reach each other",
	},
	{
		n: 5,
		slug: "nobody-owns-the-layer",
		title: "Nobody owns the sharable layer",
		short: "Nobody owns the layer",
		body: ["We use open protocols and formats."],
		test: "Anyone can build on it without a licence, a fee, or a conversation",
	},
];

/** The heading over the set on the front page. */
export const commitmentsTitle = "";

export const commitmentsIntro = "";

export const commitmentsFooter = "";

export function getCommitment(n: number): Commitment | undefined {
	return commitments.find((commitment) => commitment.n === n);
}
