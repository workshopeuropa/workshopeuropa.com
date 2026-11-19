<script lang="ts">
	import JsonLd from '$lib/components/JsonLd.svelte'
	import NewsEntry from '$lib/components/NewsEntry.svelte'
	import { blocks, notePath, noteTitle } from '$lib/content/news'
	import { site } from '$lib/content/site'
	import { m } from '$lib/paraglide/messages'
	import { getLocale, localizeHref } from '$lib/paraglide/runtime'
	import { localizedPageUrl } from '$lib/seo'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	const note = $derived(data.note)
	const title = $derived(noteTitle(note))
	const opening = $derived(blocks(note, { localize: true })[0])
	const description = $derived(opening?.type === 'list' ? opening.items.join(' ') : opening?.text)
	const locale = getLocale()
	const url = $derived(localizedPageUrl(notePath(note), locale))
	const structuredData = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		datePublished: note.date,
		inLanguage: locale,
		url,
		mainEntityOfPage: url,
		publisher: { '@type': 'Organization', '@id': new URL('/#organization', site.url).href, name: site.name }
	})
</script>

<svelte:head>
	<title>{title} — {site.name}</title>
	{#if description}<meta name="description" content={description} />{/if}
</svelte:head>

<JsonLd data={structuredData} />

<NewsEntry {note} standalone />

<p class="standfirst"><a href={localizeHref('/news')}>{m.nav_news()}</a></p>
