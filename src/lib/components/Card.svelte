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
		/** A name the browser can follow across a navigation, so this card
		    travels to where its counterpart sits on the next page instead of
		    being cut away. Must be unique in the document. */
		morph?: string;
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
		morph,
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
		style:view-transition-name={morph}
		data-morph={morph}
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
		style:view-transition-name={morph}
		data-morph={morph}
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
		/* One inset for everything the card holds: the wordmark, the nav, the
		   line at the foot all sit this far in, so nothing is closer to an
		   edge than anything else. Published so a child can read it. */
		--pad: clamp(1rem, 6cqi, 2.75rem);
		padding: var(--pad);
		/* The nav's type, and the pill it makes: 1.2 of line and 0.2em of
		   padding above and below, so 1.6 times the size. Set here rather
		   than in the nav because the corner below is cut from it, and the
		   card's own font-size is not the nav's. 1rem from 364px up; four
		   labels do not fit a narrower card than that at full size, and in
		   vw rather than cqi so both places resolve it against the same
		   thing. */
		--nav-size: clamp(0.9rem, 4.4vw, 1rem);
		--pill-h: calc(var(--nav-size) * 1.6);
		/* The corner is cut to fit what sits in it, rather than the other way
		   round: a capsule of half --pill-h, inset by the padding, is
		   concentric with a corner of exactly this. */
		--radius: calc(var(--pad) + var(--pill-h) / 2);
		border-radius: var(--radius);
		background: var(--card);
		color: var(--ink);
		font-family: var(--font-display);
		/* A card is Spectral throughout, so it does not take the body's
		   tracking. Titles set their own, tighter still. */
		letter-spacing: 0;
		text-align: center;
		overflow-wrap: break-word;
		/* aspect-ratio sets the floor — a card with more in it than the ratio
		   allows grows downwards rather than clipping. */
		aspect-ratio: 1 / var(--ratio);
		max-width: 26rem;
	}

	.card--landscape {
		aspect-ratio: var(--ratio) / 1;
		--pad: clamp(1rem, 4.5cqi, 2.75rem);
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

	/* Below about eight characters a line, hyphenation stops helping and
	   starts chopping: a half-width card reads better ragged. break-word
	   still catches a word that genuinely cannot fit. */
	@container (max-width: 16rem) {
		.card :global(.title),
		.card :global(.title--small) {
			hyphens: manual;
			overflow-wrap: break-word;
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
