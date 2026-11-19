import { m } from '$lib/paraglide/messages'

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

import { subjectKey } from '$lib/tints';

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
	/** A product screenshot for the card to sit on. */
	image?: { src: string; darkSrc?: string; alt: string };
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
export const projectsTitle = m.projects_title

/** What the Projects card in the closing row is headed — a door rather than
    a claim, for the same reason as About's. */
export const projectsCardTitle = m.projects_card_title

/** The project the closing row shows. The first on the list, so the order
    here is the decision; nothing else reads it. */
export const featured = () => projects[0];

/** The three groups, in the order the page shows them. A group with nothing
    in it is hidden rather than announced. */
export const groups: { id: Group; label: () => string }[] = [
	{ id: 'running', label: m.projects_running },
	{ id: 'self-hostable', label: m.projects_self_hostable },
	{ id: 'early', label: m.projects_early }
];

export const projects: Project[] = [
	{
		slug: 'vionio',
		title: 'Vionio',
		get headline() { return m.vionio_headline() },
		get summary() { return m.vionio_summary() },
		group: 'running',
		status: 'Running',
		ctas: [{ label: 'Open', href: 'https://vionio.com', external: true }],
		declares: [
			{
				commitment: 1,
				get how() { return m.vionio_funding() }
			},
			{
				commitment: 2,
				get how() { return m.vionio_time() }
			},
			{
				commitment: 3,
				get how() { return m.vionio_open() }
			},
			{
				commitment: 5,
				get how() { return m.vionio_infrastructure() }
			}
		],
		url: 'vionio.com'
	},
	{
		slug: 'risved',
		title: 'Risved',
		get headline() { return m.risved_headline() },
		get summary() { return m.risved_summary() },
		group: 'self-hostable',
		status: 'Self-hostable',
		ctas: [{ label: 'Read the docs', href: 'https://risved.org', external: true }],
		declares: [
			{
				commitment: 1,
				get how() { return m.risved_funding() }
			},
			{
				commitment: 3,
				get how() { return m.risved_open() }
			},
			{
				commitment: 5,
				get how() { return m.risved_infrastructure() }
			}
		],
		url: 'risved.org • risved.com',
		image: {
			src: '/media/screenshots/risved.png',
			darkSrc: '/media/screenshots/risved-dark.png',
			get alt() { return m.risved_image_alt() }
		}
	},
	{
		slug: 'inlagg',
		title: 'Inlägg • Indlæg • Innlegg',
		get headline() { return m.inlagg_headline() },
		get summary() { return m.inlagg_summary() },
		group: 'early',
		status: 'Early',
		/* Unicode rather than punycode, so the browser does the encoding: a
		   hand-written xn-- is one transposed letter away from a domain
		   somebody else owns. */
		ctas: [{ label: 'Follow along', href: 'https://inlägg.com', external: true }],
		declares: [
			{
				commitment: 1,
				get how() { return m.inlagg_funding() }
			},
			{
				commitment: 2,
				get how() { return m.inlagg_time() }
			},
			{
				commitment: 3,
				get how() { return m.inlagg_open() }
			},
			{
				commitment: 4,
				get how() { return m.inlagg_real() }
			}
		],
		url: 'inlägg.com • indlæg.com • innlegg.com',
		image: {
			src: '/media/screenshots/inlagg.png',
			darkSrc: '/media/screenshots/inlagg-dark.png',
			get alt() { return m.inlagg_image_alt() }
		}
	},
	{
		slug: 'idun',
		title: 'Idun',
		get headline() { return m.idun_headline() },
		get summary() { return m.idun_summary() },
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
				get how() { return m.idun_funding() }
			},
			{
				commitment: 3,
				get how() { return m.idun_open() }
			},
			{
				commitment: 4,
				get how() { return m.idun_real() }
			},
			{
				commitment: 5,
				get how() { return m.idun_infrastructure() }
			}
		],
		note: 'Stewarded by Föreningen Idun — a non-profit association, so no single company can close it.',
		url: 'idun.org'
	}
];

/**
 * The project a subject names, however it is written — a slug, a title, or
 * the subject on a note. A note says `Vionio` and a project is `vionio`; a
 * project with three names is still one project, and `subjectKey` keeps the
 * first of them. Nothing matches for a note about the studio itself, which
 * is the right answer rather than a miss.
 */
export function projectFor(subject?: string | null): Project | undefined {
	if (!subject) return undefined;
	const wanted = subjectKey(subject);
	return projects.find(
		(project) => project.slug === wanted || subjectKey(project.title) === wanted
	);
}

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
