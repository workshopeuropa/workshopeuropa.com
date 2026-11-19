import { defineConfig } from '@inlang/paraglide-js'

const sections = {
	sv: { news: 'nyheter', about: 'om', projects: 'projekt', join: 'delta' },
	da: { news: 'nyheder', about: 'om', projects: 'projekter', join: 'deltag' },
	nb: { news: 'nyheter', about: 'om', projects: 'prosjekter', join: 'bli-med' },
	nn: { news: 'nyheiter', about: 'om', projects: 'prosjekt', join: 'ver-med' },
	de: { news: 'neuigkeiten', about: 'ueber-uns', projects: 'projekte', join: 'mitmachen' },
	fr: { news: 'actualites', about: 'a-propos', projects: 'projets', join: 'participer' },
	es: { news: 'noticias', about: 'quienes-somos', projects: 'proyectos', join: 'participa' },
	it: { news: 'notizie', about: 'chi-siamo', projects: 'progetti', join: 'partecipa' },
	pl: { news: 'aktualnosci', about: 'o-nas', projects: 'projekty', join: 'dolacz' },
	nl: { news: 'nieuws', about: 'over-ons', projects: 'projecten', join: 'doe-mee' },
	'pt-PT': { news: 'noticias', about: 'sobre-nos', projects: 'projetos', join: 'participar' }
} as const

type Slugs = (typeof sections)[keyof typeof sections]
type Section = keyof Slugs

const prefix = (locale: string) => `/${locale.toLowerCase()}`

function localizedPatterns(pattern: string, pathFor: (locale: string, slugs: Slugs) => string) {
	const localized: [string, string][] = Object.entries(sections).map(([locale, slugs]) => [
		locale,
		pathFor(locale, slugs)
	])
	localized.push(['en', pattern])
	return { pattern, localized }
}

function sectionPattern(section: Section, suffix = '') {
	return localizedPatterns(
		`/${section}${suffix}`,
		(locale, slugs) => `${prefix(locale)}/${slugs[section]}${suffix}`
	)
}

export default defineConfig({
	outdir: './src/lib/paraglide',
	strategy: ['url', 'baseLocale'],
	emitTsDeclarations: true,
	trailingSlash: 'never',
	urlPatterns: [
		localizedPatterns('/', prefix),
		sectionPattern('news'),
		sectionPattern('news', '/:slug'),
		sectionPattern('about'),
		sectionPattern('projects'),
		sectionPattern('projects', '/:slug'),
		sectionPattern('join'),
		localizedPatterns('/:path(.*)?', locale => `${prefix(locale)}/:path(.*)?`)
	]
})
