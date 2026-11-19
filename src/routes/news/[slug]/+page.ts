import { error } from '@sveltejs/kit'
import { news } from '$lib/content/news'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {
	const note = news.find(item => item.slug === params.slug)
	if (!note) error(404, 'No such news entry')

	return { note }
}
