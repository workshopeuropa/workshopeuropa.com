/**
 * The five commitments. They are the front page: you get to them by pressing
 * the wordmark in the top bar or the one at the foot.
 *
 * No product is named here. Commitment 5 is the argument a protocol makes,
 * stated generally — naming the protocol inside a standard other people sign
 * turns a commitment into a moat. What each project declares against these
 * lives with the project, in projects.ts.
 *
 * ---- What the page prints -----------------------------------------------
 *
 * The titles and bodies below are the copy from the design, which rewrote
 * both: the titles are shorter and name the commitment rather than stating
 * it, and each body carries in one paragraph what a terse line plus a test
 * used to carry between them.
 *
 * The front page prints the title and the body, and nothing else. `test`,
 * `coda` and `opens` are not rendered anywhere at the moment — the design's
 * column has no room for them and they were deliberately left out rather
 * than lost. They are kept because they are content and the argument for
 * them has not changed: a commitment with no stated condition for failing it
 * is a slogan. Putting one back on the page is a line of markup.
 *
 * Two things elsewhere still refer to them, and want a look if the tests
 * stay off the page: `site.description`, and the note headed "Five things,
 * each with a test" in news.ts.
 *
 * The slugs follow the titles: `open-doors`, not the `you-can-leave` that
 * the old title left behind. An anchor nobody can read back to the heading
 * it lands on is a small tax on everyone who ever links to one.
 */

export type Commitment = {
	/** 1–5. The number is part of how a commitment is referred to — in the
	    pills on a project page, and in prose. The front page no longer
	    prints it: the design sets each title directly over its body. */
	n: number;
	/** The anchor on the front page. A project's page links to it for each
	    commitment it declares. */
	slug: string;
	/** The commitment itself. */
	title: string;
	/** The label a project's declaration is listed under, where the title is
	    too long to serve. The design's titles are short enough that none of
	    them needs this; left in so a longer title can have one without the
	    two having to be kept in step by hand. */
	short?: string;
	/** One paragraph per string. */
	body: string[];
	/** The condition under which we would have failed it. Not currently
	    printed — see the note at the top of this file. */
	test: string;
	/** A line after the test, where a commitment has one. Not currently
	    printed. */
	coda?: string;
	/** The turn in the set that this commitment opens, where it opens one.
	    Stage directions rather than headings. Not currently printed. */
	opens?: string;
};

export const commitments: Commitment[] = [
	{
		n: 1,
		slug: "funded-by-users",
		title: "Funded by users",
		opens: "our principles",
		body: [
			"The people who use the software are the people who pay for it. No advertisers, no data buyers, no third party whose interests and incentives point in another direction.",
		],
		test: "Every euro traces back to a user",
	},
	{
		n: 2,
		slug: "respects-your-time",
		title: "Respects your time",
		body: [
			"We don’t compete for your attention. No infinite feeds, no streaks, no notifications designed to pull you back. The software should do its job and let you leave.",
		],
		test: "No one is measured on time spent",
	},
	{
		n: 3,
		slug: "open-doors",
		title: "Open doors",
		body: [
			"Everything you put in, you can take out. Complete, automated, in formats other software can read. Leaving should be as easy as joining. Staying should be a choice, not a trap.",
		],
		test: "A competitor can take you in without asking us",
	},
	{
		n: 4,
		slug: "everyone-is-real",
		title: "Everyone is real",
		body: [
			"Each account is held by one verified person, and no one has to reveal who they are to prove it. No bots, no troll factories. Ban someone once and they stay banned.",
		],
		test: "The proof is issued by someone else. We never see the identity behind it.",
		coda: "Applies to social platforms where people can reach each other",
	},
	{
		n: 5,
		slug: "shared-infrastructure",
		title: "Shared infrastructure",
		body: [
			"We build on protocols and formats that no single company owns, including us. What we make can be replaced, forked, or connected to without our permission.",
		],
		test: "Anyone can build on it without a licence, a fee, or a conversation",
	},
];

/** The rubric at the top of the front page, and the page's own heading. Set
    as tracked capitals, like every other small label on the site. */
export const commitmentsTitle = "Independent software is infrastructure";

/* The design opens on the rubric and goes straight into the five. Both of
   these were already empty and nothing prints them now; they are the slots
   for a standfirst over the set and a closing line under it, if either
   earns its place back. */
export const commitmentsIntro = "";

export const commitmentsFooter = "";

export function getCommitment(n: number): Commitment | undefined {
	return commitments.find((commitment) => commitment.n === n);
}

/** What a commitment is called in a list beside its number. */
export function label(commitment: Commitment): string {
	return commitment.short ?? commitment.title;
}
