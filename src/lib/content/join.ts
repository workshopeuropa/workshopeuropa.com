import { links, site } from './site'
import { m } from '$lib/paraglide/messages'

export type Block = {
	/** The anchor, so a block can be linked to on its own. */
	id: string
	title: string
	body: string[]
	ctas: { label: string; href: string; external?: boolean }[]
	/** A quieter line under the buttons, wrapped round an address so the
	    address itself is the link rather than something next to it. */
	note?: { email: string }
}

export const join = {
	get title() { return m.join_title() },
	get newsletterTitle() { return m.join_newsletter() },
	blocks: [
		{
			id: 'donate',
			get title() { return m.donations_title() },
			body: [],
			ctas: [],
			note: { email: site.email }
		},
		{
			id: 'contribute',
			get title() { return m.contribute_title() },
			get body() { return [m.contribute_body()] },
			ctas: [
				{ get label() { return m.source_code() }, href: links.source, external: true }
			]
		}
	] satisfies Block[]
}
