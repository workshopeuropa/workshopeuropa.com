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
			title: 'Contribute to the projects',
			body: [
				'Everything is open source.'
			],
			ctas: [
				{ label: 'Source', href: links.source, external: true }
			]
		}
	] satisfies Block[]
}
