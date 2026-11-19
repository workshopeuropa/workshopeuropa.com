<script lang="ts">
	import LinkedMessage from '$lib/components/LinkedMessage.svelte'
	import NewsEntry from '$lib/components/NewsEntry.svelte'
	import { news, newsEmpty, newsTitle } from '$lib/content/news'
	import { links, site } from '$lib/content/site'
	import { m } from '$lib/paraglide/messages'

	const feedLinks = {
		'{rss}': { href: links.rss, label: 'RSS' },
		'{atom}': { href: links.atom, label: 'Atom' }
	}
</script>

<svelte:head>
	<title>{m.nav_news()} — {site.name}</title>
</svelte:head>

<h1 class="page-title">{newsTitle()}</h1>

<section class="section">
	{#if news.length === 0}
		<p class="empty">{newsEmpty()}</p>
	{:else}
		<div class="entries">
			{#each news as note (note.slug)}
				<NewsEntry {note} />
			{/each}
		</div>
	{/if}
</section>

<section class="section">
	<p class="standfirst">
		<small><LinkedMessage text={m.news_feed({ rss: '{rss}', atom: '{atom}' })} links={feedLinks} /></small>
	</p>
</section>

<style>
	small {
		font-size: 0.875rem;
	}

	.empty {
		width: min(100%, var(--column));
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 3.5rem);
		text-align: center;
		color: var(--ink-soft);
	}
</style>
