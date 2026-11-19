import { m } from '$lib/paraglide/messages'

export const about = {
	get title() { return m.about_title() },
	get body() { return [m.site_blurb(), m.about_vision(), m.about_projects()] },
	founding: {
		founders: [
			{ name: 'Alfred Nerstu', href: 'https://alfrednerstu.com' },
			{ name: 'Hans Nerstu', href: 'https://inlagg.se/hans' },
			{ name: 'Robin Isaksson', href: 'https://robinisaksson.com' }
		]
	}
}
