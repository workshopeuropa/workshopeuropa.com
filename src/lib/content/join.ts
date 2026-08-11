/**
 * Two ways in, and a third for anyone who wants to work on the projects.
 *
 * The room is public and free to enter — it is not gated behind anything. A
 * gated room with fourteen people in it reads as failure; an open room with
 * fourteen reads as early.
 *
 * The second is not a form and not a membership. The commitments are written
 * to be repeated rather than attributed, so holding to them is something you
 * do in your own voice, on your own site, and it needs nothing from us.
 */

import { links, site } from './site';

export type Block = {
	/** The anchor, so a block can be linked to on its own. */
	id: string;
	title: string;
	body: string[];
	ctas: { label: string; href: string; external?: boolean }[];
	/** A quieter line under the buttons, wrapped round an address so the
	    address itself is the link rather than something next to it. */
	note?: { before: string; email: string; after: string };
};

export const join = {
	title: 'Take part',
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
			id: 'declare',
			title: 'Take the commitments',
			body: [
				'This one is a public commitment. Declare which of the five you hold to, and how you’d know if you’d broken them. Leave out the ones you don’t meet — an honest three is worth more than a claimed five.'
			],
			ctas: [{ label: 'Read the commitments', href: '/#commitments', external: false }],
			note: {
				before: 'Building something that holds to them? Write to ',
				email: site.email,
				after: ' and tell us what you would put beside each one.'
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
