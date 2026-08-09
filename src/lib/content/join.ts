/**
 * Two ways in, and a third for anyone who wants to work on the projects.
 *
 * The room is public and free to enter — it is not gated behind the
 * register. A gated room with fourteen people in it reads as failure; an
 * open room with fourteen reads as early.
 *
 * The register is not a form. An entry arrives as a pull request against
 * src/lib/content/register.ts, which costs slightly more effort and buys
 * enormously more credibility: the register's history is then public and
 * auditable, which is the same argument the commitments make. The email
 * fallback exists so that argument does not become a technical entrance
 * requirement.
 */

import { links, site } from './site';

export type Block = {
	/** The anchor other pages point at — /register sends people to #register. */
	id: string;
	title: string;
	body: string[];
	ctas: { label: string; href: string; external?: boolean }[];
	/** A quieter line under the buttons, wrapped round an address so the
	    address itself is the link rather than something next to it. */
	note?: { before: string; email: string; after: string };
};

export const join = {
	title: 'Two ways in, and they’re different.',
	blocks: [
		{
			id: 'room',
			title: 'Open the room',
			body: [
				'The conversation happens on Matrix, in the open. Come read before you commit to anything. No invitation, no vetting, no application.'
			],
			ctas: [{ label: 'Open the room', href: links.matrix, external: true }]
		},
		{
			id: 'register',
			title: 'Add yourself to the register',
			body: [
				'This one is a public commitment. Declare which of the five you hold to, and how you’d know if you’d broken them. Leave out the ones you don’t meet — an honest three is worth more than a claimed five.',
				'Entries go in as a pull request against a public file, so the register’s history is open to anyone who wants to check it.'
			],
			ctas: [{ label: 'Add yourself', href: links.registerSource, external: true }],
			note: {
				before: 'Rather write a sentence than a pull request? Send the same thing to ',
				email: site.email,
				after: ' and it goes in under your name.'
			}
		},
		{
			id: 'contribute',
			title: 'Work on the projects',
			body: [
				'Everything is public. Issues, specifications, and translation work, in that order of usefulness.'
			],
			ctas: [
				{ label: 'Source', href: links.source, external: true },
				{ label: 'Open issues', href: links.issues, external: true }
			]
		}
	] satisfies Block[]
};
