<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** 1 : √2 the tall way, or √2 : 1 the wide way. */
		orientation?: 'portrait' | 'landscape';
		/** Turns the card into a link. */
		href?: string;
		/** Green stock or plain paper with a rule around it. */
		tone?: 'green' | 'paper';
		/** Span the full width of the deck. */
		wide?: boolean;
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
		tone = 'green',
		wide = false,
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
		class="card card--{orientation} card--{tone} {wide ? 'card--wide' : ''} card--link {klass}"
		{href}
	>
		{@render body()}
	</a>
{:else}
	<article class="card card--{orientation} card--{tone} {wide ? 'card--wide' : ''} {klass}">
		{@render body()}
	</article>
{/if}

<style>
	.card {
		container-type: inline-size;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 1rem;
		width: 100%;
		margin-inline: auto;
		padding: clamp(1.1rem, 6cqi, 2.75rem);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--ink);
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
		max-width: 42rem;
	}

	.card--paper {
		background: transparent;
		box-shadow: inset 0 0 0 1px var(--rule);
	}

	.card--wide {
		grid-column: 1 / -1;
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
		align-content: start;
	}

	.band--middle {
		align-content: center;
	}

	.band--bottom {
		align-content: end;
	}

	/* --- Typography inside a card, sized against the card itself --------- */

	.card :global(.eyebrow) {
		font-size: clamp(0.85rem, 4.4cqi, 1.4rem);
		font-weight: 400;
		line-height: 1.2;
	}

	.card :global(.title) {
		font-size: clamp(1.4rem, 8.4cqi, 3.4rem);
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: -0.01em;
	}

	.card :global(.title--small) {
		font-size: clamp(1.15rem, 6cqi, 2.2rem);
	}

	.card :global(.subtitle) {
		font-size: clamp(0.85rem, 4cqi, 1.25rem);
		font-weight: 400;
		line-height: 1.3;
	}

	.card :global(.italic) {
		font-style: italic;
	}

	.card :global(.meta) {
		font-size: clamp(0.75rem, 3.3cqi, 1rem);
		color: var(--ink-soft);
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

	.card--landscape :global(.subtitle) {
		font-size: clamp(0.85rem, 2.8cqi, 1.25rem);
	}

	.card--landscape :global(.meta) {
		font-size: clamp(0.75rem, 2.3cqi, 1rem);
	}

	.card--landscape :global(.prose) {
		font-size: clamp(0.95rem, 2.4cqi, 1.1rem);
	}
</style>
