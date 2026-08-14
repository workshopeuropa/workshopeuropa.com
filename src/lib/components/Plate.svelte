<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** The image behind the card. Without one the plate is tinted stock. */
		src?: string;
		alt?: string;
		class?: string;
		/** The card, which sits at the foot of the screen. */
		children: Snippet;
	};

	let { src, alt = '', class: klass = '', children }: Props = $props();
</script>

<figure class="plate {klass}">
	<div class="plate__media">
		{#if src}
			<img {src} {alt} />
		{/if}
	</div>
	<div class="plate__card">
		{@render children()}
	</div>
</figure>

<style>
	.plate {
		position: relative;
		display: grid;
		align-items: end;
		justify-items: center;
		margin: 0;
		/* Full bleed: break out of the sheet's measure to the full width of
		   the page — cqw, not vw, so a capped page caps the plate with it.
		   The height comes from the ratio, never from the viewport. */
		width: 100cqw;
		margin-inline: calc(50% - 50cqw);
		aspect-ratio: 1 / var(--ratio);
		/* The card clears the edge of the screen by the page's own padding. */
		padding: var(--gutter);
	}

	/* When the plate opens a page, cancel the sheet's top padding so the
	   image starts at the top of the screen rather than a gutter below it.

	   Anchored to the sheet rather than left as a bare `:first-child`: a
	   plate is first inside whatever wraps it soon enough — a project on the
	   index is its plate and the commitments under it, grouped — and the
	   loose form pulled every one of those up by the page's top padding. */
	:global(.sheet) > .plate:first-child {
		margin-block-start: calc(-1 * var(--sheet-top));
	}

	.plate__media {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: var(--card);
	}

	.plate__media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.plate__card {
		position: relative;
		width: 100%;
	}

	/* On a phone the plate stands up, so whatever card is on it lies down —
	   the image is never reduced to a frame around the card. */
	.plate :global(.card) {
		aspect-ratio: var(--ratio) / 1;
		max-width: var(--band);
		padding: clamp(1.1rem, 4.5cqi, 2.75rem);
	}

	/* On a wide screen the plate lies down: a landscape plate keeps the hero
	   near one screen tall instead of the 1.41 screens a full-width portrait
	   one costs.

	   A project's card stands up with it, so the image is never reduced to a
	   frame around it. The header card does not: it is the same card on every
	   page, and it is landscape everywhere else, so standing it up here made
	   the front page the one place the masthead changed shape. There is room
	   for both lying down — the card stops at --band while the plate runs to
	   the full width of the page, so the image is still open above it and to
	   either side. */
	@media (min-width: 60rem) {
		.plate {
			aspect-ratio: var(--ratio) / 1;
		}

		.plate :global(.card:not(.card--masthead)) {
			aspect-ratio: 1 / var(--ratio);
			max-width: 26rem;
			padding: clamp(1.1rem, 6cqi, 2.75rem);
		}
	}
</style>
