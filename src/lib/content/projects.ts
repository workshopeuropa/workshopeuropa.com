/**
 * Projects. One entry per project — the list page and the project page
 * both read from here, so adding a project is one object.
 */

export type Project = {
	slug: string;
	title: string;
	/** The claim the project makes, in the big type on its card. */
	headline: string;
	/** What it actually is. Opens the project page and serves as the meta
	    description; the card carries the url instead. */
	summary: string;
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
	status?: string;
	credits?: { role: string; name: string }[];
	links?: { label: string; href: string }[];
};

/** The headline on the Projects card — on the index, and on the copy of it
    that opens every project page. */
export const projectsTitle = 'Make the shift';

export const projects: Project[] = [
	{
		slug: 'vionio',
		title: 'Vionio',
		headline: 'Creator platform on open protocols',
		summary:
			'A creator platform on open protocols — your audience travels with you.',
		url: 'vionio.com',
		image: {
			src: '/media/vionio.svg',
			alt: 'A creator’s following moving between two servers, the connection unbroken.'
		}
	},
	{
		slug: 'inlagg',
		title: 'Inlägg • Indlæg • Innlegg',
		headline: 'Authentic Nordic social platforms',
		summary:
			'A Nordic social platform where every account is verified with BankID or MitID.',
		url: 'inlägg.com • indlæg.com • innlegg.com',
		image: {
			src: '/media/inlagg.svg',
			alt: 'A column of posts, each one carrying a verification mark.'
		}
	},
	{
		slug: 'risved',
		title: 'Risved',
		headline: 'Open-source hosting interface',
		summary:
			'Open-source European hosting — run it on our cloud or your own hardware.',
		url: 'risved.org • risved.com',
		image: {
			src: '/media/risved.svg',
			alt: 'Racks of hardware, some of them ours and some of them yours.'
		}
	},
	{
		slug: 'idun',
		title: 'Idun',
		headline: 'Open protocol for federated identity',
		summary: 'An open protocol bridging identity to the federated social web.',
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
