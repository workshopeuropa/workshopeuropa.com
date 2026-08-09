/**
 * The register: companies, projects and people who commit to the five.
 *
 * Two rules about this file.
 *
 * Every entry is self-declared. An entry says which commitments it holds to
 * and, in its own words, how it meets each test. Nobody writes an entry on
 * somebody else's behalf — a declaration written for you is not a
 * declaration, and the whole list is worth reading only because each line in
 * it was put there by whoever it names. Entries arrive as pull requests
 * against this file.
 *
 * Nothing is ranked. Four of five is a real position, not a failure, so the
 * page filters by commitment and never sorts by how many are met.
 *
 * The seed entries below are Workshop Europa's own, listed on the same terms
 * as everyone else's. They are drafts until the people running each project
 * confirm the wording.
 */

export type Declaration = {
	/** Which of the five, 1–5. */
	commitment: number;
	/** How this entry meets that commitment's test, in its own words. */
	how: string;
};

export type Entry = {
	slug: string;
	name: string;
	/** One line. What it is, not what it aspires to. */
	line: string;
	/** The entry's own address. */
	href: string;
	/** What to show for the address — the domain, not the URL. */
	domain: string;
	/** City, country. City where there is one. */
	place: string;
	/** Only the commitments it declares. Everything else reads as not claimed. */
	declares: Declaration[];
};

export const registerTitle = 'Who it answers to.';

export const registerIntro = [
	'Companies, projects and people across Europe, each declaring which commitments they hold to — and what would prove them wrong. Self-declared. No approval, no fee, no board.',
	'Workshop Europa’s own projects are listed here on the same terms as everyone else’s.'
];

/** The summary the front page carries. */
export const registerSummary = {
	title: 'Who it answers to.',
	note: 'Companies, projects and people across Europe, each declaring which commitments they hold to. Self-declared. No approval, no fee, no board.'
};

export const registerEmpty = 'Nothing here yet under this filter. That’s information too.';

export const entries: Entry[] = [
	{
		slug: 'vionio',
		name: 'Vionio',
		line: 'A creator platform on open protocols — your audience travels with you.',
		href: 'https://vionio.com',
		domain: 'vionio.com',
		place: 'Copenhagen, Denmark',
		declares: [
			{
				commitment: 1,
				how: 'Subscriptions, paid by the people posting and the people reading. No advertising, no paid placement, and nothing sold about anyone here.'
			},
			{
				commitment: 2,
				how: 'The feed is what you subscribed to, in the order it arrived. Nobody working on it is measured on time spent.'
			},
			{
				commitment: 3,
				how: 'Your posts, your following and your identity export in one step and land on another server. The protocol is the way out, so leaving needs nothing from us.'
			},
			{
				commitment: 5,
				how: 'Built on protocols nobody owns, and we don’t operate one. The parts other people depend on are not ours to close.'
			}
		]
	},
	{
		slug: 'inlagg',
		name: 'Inlägg • Indlæg • Innlegg',
		line: 'Nordic social platforms where every account belongs to a person.',
		/* Written in Unicode rather than punycode: the browser encodes it, and
		   a hand-written xn-- is one transposed letter away from a domain
		   somebody else owns. */
		href: 'https://inlägg.com',
		domain: 'inlägg.com • indlæg.com • innlegg.com',
		place: 'Copenhagen, Denmark',
		declares: [
			{
				commitment: 1,
				how: 'A subscription, paid monthly by the people using it. There is no advertiser to answer to because there is no advertising.'
			},
			{
				commitment: 2,
				how: 'No infinite feed, no streaks, no re-engagement mail. Leaving is one button and takes effect immediately.'
			},
			{
				commitment: 3,
				how: 'A full export in an open format, including who follows you, ready to import elsewhere without our involvement.'
			},
			{
				commitment: 4,
				how: 'BankID and MitID issue the proof. What reaches us is that a person stands behind the account, never which person.'
			}
		]
	},
	{
		slug: 'risved',
		name: 'Risved',
		line: 'Open-source European hosting — run it on our hardware or your own.',
		href: 'https://risved.org',
		domain: 'risved.org',
		place: 'Copenhagen, Denmark',
		declares: [
			{
				commitment: 1,
				how: 'Hosting fees from the people hosting. No resale of usage data, and the price list is the whole commercial relationship.'
			},
			{
				commitment: 3,
				how: 'The control plane is the open-source project. Take the images and the configuration and run the same thing on your own machines.'
			},
			{
				commitment: 5,
				how: 'Every part of the stack is published under a licence that cannot be withdrawn. We sell the operation, not the right to operate.'
			}
		]
	},
	{
		slug: 'idun',
		name: 'Idun',
		line: 'An open protocol bridging identity to the federated social web.',
		href: 'https://idun.org',
		domain: 'idun.org',
		place: 'Copenhagen, Denmark',
		declares: [
			{
				commitment: 1,
				how: 'Föreningen Idun is funded by its members, who are the people implementing the specification. Nobody buys a say in it.'
			},
			{
				commitment: 3,
				how: 'An identity is portable by construction: move it between issuers and services without asking any of them.'
			},
			{
				commitment: 4,
				how: 'The proof is issued by a third party and carries one claim — that a person is behind it. Implementers never receive the identity.'
			},
			{
				commitment: 5,
				how: 'Stewarded by a non-profit association whose statutes prevent it from selling or licensing the specification. Implement it without a licence, a fee, or a conversation.'
			}
		]
	}
];

/** Everything the entry did not declare, so the page can say so in words. */
export function declared(entry: Entry, commitment: number): Declaration | undefined {
	return entry.declares.find((declaration) => declaration.commitment === commitment);
}

export function filterEntries(list: Entry[], commitment: number | null): Entry[] {
	if (commitment === null) return list;
	return list.filter((entry) => Boolean(declared(entry, commitment)));
}
