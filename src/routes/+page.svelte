<script lang="ts">
	import JsonLd from '$lib/components/JsonLd.svelte'
	import { commitments, commitmentsTitle } from '$lib/content/commitments'
	import { links, site } from '$lib/content/site'

	const home = new URL('/', site.url).href
	const organization = `${home}#organization`
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': organization,
				name: site.name,
				url: home,
				logo: new URL('/w-512.png', home).href,
				description: site.blurb,
				email: site.email,
				identifier: { '@type': 'PropertyValue', propertyID: 'CVR', value: site.registrationNumber },
				sameAs: [links.source]
			},
			{
				'@type': 'WebSite',
				'@id': `${home}#website`,
				name: site.name,
				url: home,
				publisher: { '@id': organization }
			}
		]
	}
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<JsonLd data={structuredData} />

<!-- The page opens on its rubric rather than on a hero: the top bar carries
     the wordmark now, so the first thing under it is the first thing to
     read. The rubric is the h1 — the five below are the only other headings
     the page has. -->
<h1 id="commitments">{commitmentsTitle()}</h1>

<!-- The five, set as one list rather than five sections: a title at the size
     of the text under it, with the space above each pair doing the work a
     bigger heading used to. Each commitment is a title and a paragraph and
     nothing else — no number over it, no test under it. Both are still in
     commitments.ts, and the note at the top of that file says why they are
     not here.

     Deep links come from every project page, one per commitment declared, so
     each has to land clear of the top of the window. -->
<div class="entries">
	{#each commitments as commitment (commitment.slug)}
		<article class="entry" id={commitment.slug}>
			<header>
				<h2>{commitment.title}</h2>
			</header>

			<div class="text">
				{#each commitment.body as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</article>
	{/each}
</div>

<style>
	/* Deep links come from every project page, so a commitment has to land
	   clear of the top of the window. */
	.entry {
		scroll-margin-top: var(--gutter);
	}
</style>
