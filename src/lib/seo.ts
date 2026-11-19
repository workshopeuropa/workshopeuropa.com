import { news, notePath } from '$lib/content/news'
import { projects } from '$lib/content/projects'
import { nav, site } from '$lib/content/site'
import { localizeUrl, type Locale } from '$lib/paraglide/runtime'

export const indexablePaths = new Set<string>([
	'/',
	...nav.map(item => item.href),
	...news.map(notePath),
	...projects.map(project => `/projects/${project.slug}`)
])

export function localizedPageUrl(path: string, locale: Locale) {
	return localizeUrl(new URL(path, site.url), { locale }).href
}
