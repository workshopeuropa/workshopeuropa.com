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
		/* Held in a variable so anything sitting against the card's inner
		   edge can measure itself off it — the nav rounds its pill by
		   --radius minus this. */
		--pad: clamp(1.1rem, 6cqi, 2.75rem);
		padding: var(--pad);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--ink);
		font-family: var(--font-display);
		text-align: center;
		overflow-wrap: break-word;
		/* aspect-ratio sets the floor — a card with more in it than the ratio
		   allows grows downwards rather than clipping. */
		aspect-ratio: 1 / var(--ratio);
		max-width: 26rem;
	}

	.card--landscape {
		aspect-ratio: var(--ratio) / 1;
		--pad: clamp(1.1rem, 4.5cqi, 2.75rem);
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

	/* --- Typography inside a card ---------------------------------------
	   Set, not scaled. Every card carries the same three sizes, so a
	   project card reads as loudly as the header card above it — sizing
	   against the card meant a small card whispered.
	   --------------------------------------------------------------------- */

	.card :global(.eyebrow) {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.2;
	}

	.card :global(.title),
	.card :global(.title--small) {
		/* Even the last line: a headline should not leave one word alone. */
		text-wrap: balance;
		font-weight: 500;
		line-height: 1.05;
		letter-spacing: -0.01em;
		/* A word longer than its column hyphenates rather than hanging out
		   of the card — two columns on a phone leave about eight characters
		   a line at this size. */
		hyphens: auto;
		overflow-wrap: anywhere;
	}

	.card :global(.title) {
		font-size: 2rem;
	}

	.card :global(.title--small) {
		font-size: 1.5rem;
	}

	/* Only small where the card is: on a desktop the footer's cards have
	   the room to carry the same 2rem as every other card. */
	@media (min-width: 60rem) {
		.card :global(.title--small) {
			font-size: 2rem;
		}
	}

	.card :global(.italic) {
		font-style: italic;
	}

	.card :global(.meta) {
		font-size: 0.875rem;
		/* Follows whatever ink the card is using rather than the page's. */
		color: color-mix(in srgb, currentColor 72%, transparent);
	}

	.card :global(.prose) {
		font-size: 1rem;
		line-height: 1.55;
		text-align: left;
		max-width: var(--measure);
		margin-inline: auto;
		display: grid;
		gap: 0.85em;
	}

	/* The masthead's wordmark is the one italic in the set. */
	.card--masthead :global(.eyebrow) {
		font-style: italic;
	}

</style>
