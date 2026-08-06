<script lang="ts">
	import { page } from '$app/state';
	import Card from './Card.svelte';
	import CardNav from './CardNav.svelte';
	import Deck from './Deck.svelte';
	import { about, aboutTitleLines } from '$lib/content/about';
	import { join } from '$lib/content/join';
	import { projectsTitle } from '$lib/content/projects';
	import { newsTitle, site } from '$lib/content/site';

	/** The four sections, in the order the footer would rather have them.
	    A page drops its own card and the next one moves up, so every page
	    points at the three places you have not got to yet. The front page
	    belongs to none of them, so it keeps the first three. */
	const sections: { href: string; label: string; title: string; lines?: string[] }[] = [
		{ href: '/about', label: 'About', title: about.title, lines: aboutTitleLines },
		{ href: '/join', label: 'Join', title: join.title },
		{ href: '/projects', label: 'Projects', title: projectsTitle },
		{ href: '/news', label: 'News', title: newsTitle }
	];

	function isCurrent(href: string) {
		const path = page.url.pathname;
		return path === href || path.startsWith(href + '/');
	}

	let shown = $derived(sections.filter((section) => !isCurrent(section.href)).slice(0, 3));
	let lead = $derived(shown[0]);
	let pair = $derived(shown.slice(1));

	/** The wordmark stacks a word per row, the way it does in the header. */
	const words = site.name.split(/\s+/).filter(Boolean);
	const year = new Date().getFullYear();
</script>

<!-- A section's headline, broken at the words it names if it names any. -->
{#snippet headline(section: (typeof sections)[number])}
	<p class="title--small">
		{#if section.lines}
			{#each section.lines as line, i (line)}{#if i}<br />{/if}{line}{/each}
		{:else}
			{section.title}
		{/if}
	</p>
{/snippet}

<footer class="colophon">
	<!-- The first across the top, the other two side by side under it. -->
	<Deck columns={1}>
		<Card orientation="landscape" href={lead.href}>
			{#snippet top()}
				<p class="eyebrow">{lead.label}</p>
			{/snippet}
			{#snippet middle()}
				{@render headline(lead)}
			{/snippet}
		</Card>
	</Deck>

	<Deck columns={2} collapse={false}>
		{#each pair as section (section.href)}
			<Card orientation="portrait" href={section.href}>
				{#snippet top()}
					<p class="eyebrow">{section.label}</p>
				{/snippet}
				{#snippet middle()}
					{@render headline(section)}
				{/snippet}
			</Card>
		{/each}
	</Deck>

	<Deck columns={1}>
		<Card orientation="landscape" masthead>
			{#snippet top()}
				<CardNav />
			{/snippet}
			{#snippet middle()}
				<p class="title italic">
					{#each words as word (word)}
						<span class="word">{word}</span>
					{/each}
				</p>
			{/snippet}
			{#snippet bottom()}
				<p class="meta">© {year}</p>
			{/snippet}
		</Card>
	</Deck>
</footer>

<style>
	.colophon {
		display: grid;
		gap: var(--gap);
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 4rem);
		padding-bottom: calc(clamp(2rem, 6vw, 4rem) + var(--safe-bottom, 0px));
	}

	.word {
		display: block;
	}
</style>
