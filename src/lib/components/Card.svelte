<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** 1 : √2 the tall way, or √2 : 1 the wide way. */
		orientation?: 'portrait' | 'landscape';
		/** Turns the card into a link. */
		href?: string;
		/** Span the full width of the deck. */
		wide?: boolean;
		/** The page header, whose type is set at fixed sizes rather than
		    against the card. */
		masthead?: boolean;
		/** Half the height of a landscape card — the ratio folded the long
		    way, for a header with nothing in the middle to hold. */
		half?: boolean;
		/** Extra classes for the caller. */
		class?: string;
		/** Three bands: something at the head, something in the middle, something at the foot. */
		top?: Snippet;
		middle?: Snippet;
		bottom?: Snippet;
		/** Or take the whole surface. */
		children?: Snippet;
	};

	let {
		orientation = 'portrait',
		href,
		wide = false,
		masthead = false,
		half = false,
		class: klass = '',
		top,
		middle,
		bottom,
		children
	}: Props = $props();
</script>

{#snippet body()}
	{#if children}
		{@render children()}
	{:else}
		<div class="band band--top">{#if top}{@render top()}{/if}</div>
		<div class="band band--middle">{#if middle}{@render middle()}{/if}</div>
		<div class="band band--bottom">{#if bottom}{@render bottom()}{/if}</div>
	{/if}
{/snippet}

{#if href}
	<a
		class="card card--{orientation} card--link {klass}"
		class:card--wide={wide}
		class:card--masthead={masthead}
		class:card--half={half}
		{href}
	>
		{@render body()}
	</a>
{:else}
	<article
		class="card card--{orientation} {klass}"
		class:card--wide={wide}
		class:card--masthead={masthead}
		class:card--half={half}
	>
		{@render body()}
	</article>
{/if}

<style>
	.card {
		container-type: inline-size;
		display: grid;
		grid-template-rows: 1fr auto 1fr;
		gap: 1rem;
		width: 100%;
		margin-inline: auto;
		padding: clamp(1.1rem, 6cqi, 2.75rem);
		border-radius: var(--radius);
		background: var(--card);
		/* The tint's dark partner, so the ink on a card belongs to the same
		   colour. Falls back to the plain ink if no shade is set. */
		color: var(--shade, var(--ink));
		text-align: center;
		overflow-wrap: break-word;
		/* aspect-ratio sets the floor — a card with more in it than the ratio
		   allows grows downwards rather than clipping. */
		aspect-ratio: 1 / var(--ratio);
		max-width: 26rem;
	}

	.card--landscape {
		aspect-ratio: var(--ratio) / 1;
		padding: clamp(1.1rem, 4.5cqi, 2.75rem);
		max-width: var(--band);
	}

	.card--wide {
		grid-column: 1 / -1;
	}

	/* An A rectangle halved across its short side: same width, half the
	   height. Declared after the orientations so it wins over both. */
	.card--half {
		aspect-ratio: calc(var(--ratio) * 2) / 1;
	}

	.card--link {
		transition:
			transform 160ms ease,
			filter 160ms ease;
	}

	.card--link:hover {
		transform: translateY(-2px);
		filter: brightness(1.03);
	}

	.card--link:active {
		transform: translateY(0);
	}

	.band {
		display: grid;
		gap: 0.5em;
	}

	/* The outer bands hug the edges of the card; the middle one sits in an
	   auto-height row between two equal tracks, so it lands on the centre
	   line rather than in the middle of whatever space is left over. */
	.band--top {
		align-self: start;
	}

	.band--middle {
		align-self: center;
	}

	.band--bottom {
		align-self: end;
	}

	/* --- Typography inside a card, sized against the card itself --------- */

	.card :global(.eyebrow) {
		font-size: clamp(0.85rem, 4.4cqi, 1.4rem);
		font-weight: 500;
		line-height: 1.2;
	}

	.card :global(.title),
	.card :global(.title--small) {
		/* Even the last line: a headline should not leave one word alone. */
		text-wrap: balance;
	}

	.card :global(.title) {
		font-size: clamp(1.4rem, 8.4cqi, 3.4rem);
		font-weight: 500;
		line-height: 1.05;
		letter-spacing: -0.01em;
	}

	.card :global(.title--small) {
		font-size: clamp(1.15rem, 6cqi, 2.2rem);
	}

	.card :global(.italic) {
		font-style: italic;
	}

	.card :global(.meta) {
		font-size: clamp(0.75rem, 3.3cqi, 1rem);
		/* Follows whatever ink the card is using rather than the page's. */
		color: color-mix(in srgb, currentColor 72%, transparent);
	}

	.card :global(.prose) {
		font-size: clamp(0.95rem, 3.6cqi, 1.1rem);
		line-height: 1.55;
		text-align: left;
		max-width: var(--measure);
		margin-inline: auto;
		display: grid;
		gap: 0.85em;
	}

	/* A landscape card is wider, so cqi buys more pixels — pull it back. */
	.card--landscape :global(.eyebrow) {
		font-size: clamp(0.85rem, 3.1cqi, 1.4rem);
	}

	.card--landscape :global(.title) {
		font-size: clamp(1.4rem, 5.9cqi, 3.6rem);
	}

	.card--landscape :global(.title--small) {
		font-size: clamp(1.15rem, 4.2cqi, 2.2rem);
	}

	.card--landscape :global(.meta) {
		font-size: clamp(0.75rem, 2.3cqi, 1rem);
	}

	.card--landscape :global(.prose) {
		font-size: clamp(0.95rem, 2.4cqi, 1.1rem);
	}

	/* The masthead is set, not scaled: the same three sizes whatever the
	   card is doing. Declared last so it beats the landscape rules above. */
	.card--masthead :global(.eyebrow) {
		font-size: 1rem;
		font-style: italic;
	}

	.card--masthead :global(.title) {
		font-size: 2rem;
	}
</style>
