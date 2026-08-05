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

{#snippet eyebrowLine()}
	<p class="eyebrow">
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
	/* The logo, stretched to twice its width. A transform rather than a
	   wider cut, so the strokes distort with it — verticals thicken while
	   horizontals hold. Scaled about the centre, so the name stays on the
	   card's centre line, and nothing needs reserving: the stretch runs
	   across the band's own empty width rather than into the title. */
	.eyebrow {
		transform: scale(2, 1);
		transform-origin: center;
	}

	/* Hugging the glyphs rather than the band, so scaling the line widens
	   the letters instead of an invisible full-width box. */
	.eyebrow__word {
		display: block;
		width: fit-content;
		margin-inline: auto;
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
