import { escapeXml } from '$lib/feed'
import { locales } from '$lib/paraglide/runtime'
import { indexablePaths, localizedPageUrl } from '$lib/seo'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = () => {
	const entries = Array.from(indexablePaths, path =>
		locales.map(locale => `	<url><loc>${escapeXml(localizedPageUrl(path, locale))}</loc></url>`)
	).flat().join('\n')

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`,
		{ headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
	)
}
