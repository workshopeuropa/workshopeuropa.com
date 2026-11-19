/**
 * Resolve an ordered list of language preferences to a supported locale.
 * The order of supported locales breaks ties between regional variants.
 */
export function resolveLocale<const Locale extends string>(
	supportedLocales: readonly Locale[],
	fallback: NoInfer<Locale>,
	preferredLanguages: readonly string[] = typeof window === 'undefined' ? [] : window.navigator.languages
): Locale {
	const supported = supportedLocales.map(value => {
		const locale = new Intl.Locale(value)
		return { value, tag: locale.baseName, script: locale.maximize().script }
	})

	for (const language of preferredLanguages) {
		let preference: Intl.Locale
		try {
			preference = new Intl.Locale(language)
		} catch {
			continue
		}

		const candidates = preference.script
			? supported.filter(locale => locale.script === preference.script)
			: supported

		for (const parts = preference.baseName.split('-'); parts.length; parts.pop()) {
			const tag = parts.join('-')
			const match = candidates.find(locale => locale.tag === tag)
				?? candidates.find(locale => locale.tag.startsWith(`${tag}-`))

			if (match) return match.value
		}
	}

	return fallback
}
