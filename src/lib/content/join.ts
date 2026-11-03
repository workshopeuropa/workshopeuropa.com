import { links, site } from './site'

export type Block = {
	/** The anchor, so a block can be linked to on its own. */
	id: string
	title: string
	body: string[]
	ctas: { label: string; href: string; external?: boolean }[]
	/** A quieter line under the buttons, wrapped round an address so the
	    address itself is the link rather than something next to it. */
	note?: { before: string; email: string; after: string }
}

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
			id: 'donate',
			title: 'Donate to the association',
			body: [],
			ctas: [],
			note: {
				before: 'Contact ',
				email: site.email,
				after: ' for donations.'
			}
		},
		{
			id: 'contribute',
			title: 'Contribute on the projects',
			body: [
				'Everything is open source.'
			],
			ctas: [
				{ label: 'Source', href: links.source, external: true },
				{ label: 'Open issues', href: links.issues, external: true }
			]
		}
	] satisfies Block[]
}
