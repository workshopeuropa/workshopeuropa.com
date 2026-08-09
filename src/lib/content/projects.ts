/**
 * Projects. One entry per project — the list page and the project page
 * both read from here, so adding a project is one object.
 *
 * A project sits in one of three groups. The group decides where it appears
 * on /projects and which verb its call to action uses: a thing you can use
 * today does not ask to be read about, and a specification does not ask to
 * be signed up for.
 */

export type Group = 'running' | 'self-hostable' | 'early';

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
	/** Where the card points. One, except where a project has a reason for
	    more: the CTA is the whole invitation, so a second is a decision. */
	ctas: Cta[];
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
		ctas: [
			{ label: 'Open', href: 'https://vionio.com', external: true },
			{ label: 'Pricing', href: 'https://vionio.com/pricing', external: true }
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
		ctas: [
			{ label: 'Read the docs', href: 'https://risved.org/docs', external: true },
			{ label: 'Source', href: 'https://risved.org/source', external: true }
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
		ctas: [{ label: 'Follow along', href: '/news', external: false }],
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
		   commitment 5 asks of whoever stewards a shared layer. */
		ctas: [
			{ label: 'Read the spec', href: 'https://idun.org/spec', external: true },
			{ label: 'Implement it', href: 'https://idun.org/implement', external: true },
			{ label: 'Join the association', href: 'https://idun.org/association', external: true }
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
