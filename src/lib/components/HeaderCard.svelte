<script lang="ts">
	import { page } from '$app/state';
	import Card from './Card.svelte';
	import CardNav from './CardNav.svelte';
	import { site } from '$lib/content/site';

	type Props = {
		title: string;
		/** The line above the title. Defaults to the site name. */
		eyebrow?: string;
		/** Where that line points. Defaults to the front page. */
		eyebrowHref?: string;
		orientation?: 'portrait' | 'landscape';
		/** Drop to a p where something else on the page is the h1 — a project
		    page names the section here and the project in the card below. */
		heading?: 'h1' | 'p';
	};

	let {
		title,
		eyebrow = site.name,
		eyebrowHref = '/',
		orientation = 'landscape',
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

<!-- The word count drives how much room the stretch needs reserving. -->
{#snippet eyebrowLine()}
	<p class="eyebrow" style="--logo-lines: {words.length}">
		{#if isSelf}
			{@render name()}
		{:else}
			<a class="eyebrow__link" href={eyebrowHref}>{@render name()}</a>
		{/if}
	</p>
{/snippet}

<Card {orientation} wide masthead>
	{#snippet top()}
		{@render eyebrowLine()}
	{/snippet}

	{#snippet middle()}
		<svelte:element this={heading} class="title">{title}</svelte:element>
	{/snippet}

	{#snippet bottom()}
		<CardNav />
	{/snippet}
</Card>

<style>
	/* The logo, stretched to twice its height. A transform rather than a
	   font weight, so the strokes distort with it — scaling from the top
	   keeps the name pinned where it sits and grows it downwards into the
	   space the band already has. */
	.eyebrow {
		transform: scale(1, 2);
		transform-origin: top center;
		/* A transform paints outside the layout box, so the stretch has to be
		   paid for by hand: one extra line-height per line, or a long title
		   centred on a narrow card rises into the wordmark. */
		margin-block-end: calc(var(--logo-lines, 2) * 1.2em);
	}

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
