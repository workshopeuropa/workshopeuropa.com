/**
 * Projects. One entry per project — the list page and the project page
 * both read from here, so adding a project is one object.
 *
 * A project sits in one of three groups. The group decides where it appears
 * on /projects and which verb its call to action uses: a thing you can use
 * today does not ask to be read about, and a specification does not ask to
 * be signed up for.
 *
 * A project also declares which of the five commitments it holds to, and how
 * it meets each test in its own words. That declaration is the project's, not
 * ours to write for it: these four are Workshop Europa's own and stay drafts
 * until the people running each of them confirm the wording.
 *
 * Nothing here is ranked or scored. Four of five is a real position, not a
 * failure, so the list shows what a project declares and never how many.
 */

export type Group = 'running' | 'self-hostable' | 'early';

/** How a project meets one commitment's test, in its own words. */
export type Declaration = {
	/** Which of the five, 1–5. */
	commitment: number;
	how: string;
};

export type Cta = {
	label: string;
	href: string;
	/** Off for a link that stays on this site. */
	external?: boolean;
};

export type Project = {
	slug: string;
	title: string;
	/** The claim the project makes, in the big type on its card. */
	headline: string;
	/** What it actually is. Opens the project page and serves as the meta
	    description; the card carries the url instead. */
	summary: string;
	/** Which bench it is on. */
	group: Group;
	/** The word on the card. Short — the group heading says the rest. */
	status: string;
	/** Where the card points. One each for now: the products' own sites do
	    not have the routes a second would need yet, and two buttons landing
	    on the same page is worse than one. The shape takes more when they do
	    — a running project wants Pricing beside Open, a self-hostable one
	    Source beside its docs, and Idun the two below. */
	ctas: Cta[];
	/** Only the commitments it declares. Everything else reads as not
	    claimed, in words, on the project's own page. */
	declares: Declaration[];
	/** A line under the card, where a project needs one said out loud. */
	note?: string;
	/** At the foot of the card. Plain text, since the card is already a link
	    and a link inside a link is not valid. */
	url?: string;
	/** A full-width image for the card to sit on. */
	image?: { src: string; alt: string };
	/** The project page, one paragraph per string. */
	body?: string[];
	/* Everything below is optional: a project shows the particulars it has
	   and the section disappears when it has none. */
	year?: string;
	discipline?: string;
	credits?: { role: string; name: string }[];
	links?: { label: string; href: string }[];
};

/** The headline on the Projects card — on the index, and on the copy of it
    that opens every project page. */
export const projectsTitle = 'What’s on the bench.';

export const projectsIntro = 'Some finished, some half-built, all in the open.';

/** The three groups, in the order the page shows them. A group with nothing
    in it is hidden rather than announced. */
export const groups: { id: Group; title: string; note: string }[] = [
	{ id: 'running', title: 'Running', note: 'Live, you can use them today.' },
	{ id: 'self-hostable', title: 'Self-hostable', note: 'Run them yourself.' },
	{ id: 'early', title: 'Early', note: 'Specification or prototype.' }
];

export const projects: Project[] = [
	{
		slug: 'vionio',
		title: 'Vionio',
		headline: 'Dual protocol social platform',
		summary: 'A creator platform on open protocols — your audience travels with you.',
		group: 'running',
		status: 'Running',
		ctas: [{ label: 'Open', href: 'https://vionio.com', external: true }],
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
		],
		url: 'vionio.com',
		image: {
			src: '/media/vionio.svg',
			alt: 'A creator’s following moving between two servers, the connection unbroken.'
		}
	},
	{
		slug: 'risved',
		title: 'Risved',
		headline: 'Open-source hosting interface',
		summary: 'Open-source European hosting — run it on our cloud or your own hardware.',
		group: 'self-hostable',
		status: 'Self-hostable',
		ctas: [{ label: 'Read the docs', href: 'https://risved.org', external: true }],
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
		],
		url: 'risved.org • risved.com',
		image: {
			src: '/media/risved.svg',
			alt: 'Racks of hardware, some of them ours and some of them yours.'
		}
	},
	{
		slug: 'inlagg',
		title: 'Inlägg • Indlæg • Innlegg',
		headline: 'Authentic Nordic social platforms',
		summary: 'A Nordic social platform where every account is verified with BankID or MitID.',
		group: 'early',
		status: 'Early',
		/* Unicode rather than punycode, so the browser does the encoding: a
		   hand-written xn-- is one transposed letter away from a domain
		   somebody else owns. */
		ctas: [{ label: 'Follow along', href: 'https://inlägg.com', external: true }],
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
		],
		url: 'inlägg.com • indlæg.com • innlegg.com',
		image: {
			src: '/media/inlagg.svg',
			alt: 'A column of posts, each one carrying a verification mark.'
		}
	},
	{
		slug: 'idun',
		title: 'Idun',
		headline: 'Open protocol for federated identity',
		summary: 'An open protocol bridging identity to the federated social web.',
		group: 'early',
		status: 'Early',
		/* Never a sign-up. Idun is a specification other people implement, and
		   an invitation to join it as a product would be the opposite of what
		   commitment 5 asks of whoever stewards a shared layer. "Implement it"
		   and "Join the association" belong beside this one and go back the
		   moment idun.org has somewhere for them to land. */
		ctas: [{ label: 'Read the spec', href: 'https://idun.org', external: true }],
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
		],
		note: 'Stewarded by Föreningen Idun — a non-profit association, so no single company can close it.',
		url: 'idun.org',
		image: {
			src: '/media/idun.svg',
			alt: 'One identity on the left, a span across to the servers that accept it.'
		}
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

export function projectsIn(group: Group): Project[] {
	return projects.filter((project) => project.group === group);
}

/** What a project says about one commitment, or nothing if it does not
    claim it. */
export function declared(project: Project, commitment: number): Declaration | undefined {
	return project.declares.find((declaration) => declaration.commitment === commitment);
}
