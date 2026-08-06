<script lang="ts">
	import { page } from '$app/state';
	import Card from './Card.svelte';
	import CardNav from './CardNav.svelte';
	import { site } from '$lib/content/site';

	type Props = {
		/** Left out, the card is just the wordmark and the nav. */
		title?: string;
		/** The title broken at named words rather than wherever it fits. */
		lines?: string[];
		/** The line above the title. Defaults to the site name. */
		eyebrow?: string;
		/** Where that line points. Defaults to the front page. */
		eyebrowHref?: string;
		orientation?: 'portrait' | 'landscape';
		/** Half height — for a header with no title to carry. */
		half?: boolean;
		/** Drop to a p where something else on the page is the h1 — a project
		    page names the section here and the project in the card below. */
		heading?: 'h1' | 'p';
	};

	let {
		title,
		lines,
		eyebrow = site.name,
		eyebrowHref = '/',
		orientation = 'landscape',
		half = false,
		heading = 'h1'
	}: Props = $props();

	let isSelf = $derived(page.url.pathname === eyebrowHref);
	/** A word per row: "Workshop Europa" stacks, "Projects" stays put. */
	let words = $derived(eyebrow.split(/\s+/).filter(Boolean));
</script>

{#snippet name()}
	{#each words as word (word)}
		<span class="eyebrow__word">{word}</span>
	{/each}
{/snippet}

{#snippet eyebrowLine()}
	<p class="eyebrow">
		{#if isSelf}
			{@render name()}
		{:else}
			<a class="eyebrow__link" href={eyebrowHref}>{@render name()}</a>
		{/if}
	</p>
{/snippet}

<Card {orientation} {half} wide masthead>
	{#snippet top()}
		{@render eyebrowLine()}
	{/snippet}

	{#snippet middle()}
		{#if title}
			<svelte:element this={heading} class="title">
				{#if lines}
					{#each lines as line, i (line)}{#if i}<br />{/if}{line}{/each}
				{:else}
					{title}
				{/if}
			</svelte:element>
		{/if}
	{/snippet}

	{#snippet bottom()}
		<CardNav />
	{/snippet}
</Card>

<style>
	/* A word per row, at the size the type was cut for. */
	.eyebrow__word {
		display: block;
	}

	.eyebrow__link {
		display: inline-block;
	}

	.eyebrow__link:hover {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
