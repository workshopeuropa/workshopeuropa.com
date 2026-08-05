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
	   image starts at the top of the screen rather than a gutter below it. */
	.plate:first-child {
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

	/* Whatever card is on a plate lies the other way to the image, so the
	   image is never reduced to a frame around it. */
	.plate :global(.card) {
		aspect-ratio: var(--ratio) / 1;
		max-width: var(--band);
		padding: clamp(1.1rem, 4.5cqi, 2.75rem);
	}

	/* On a wide screen the two rectangles swap: the image lies down and the
	   card stands up. A landscape plate keeps the hero near one screen tall
	   instead of the 1.41 screens a full-width portrait one costs. */
	@media (min-width: 60rem) {
		.plate {
			aspect-ratio: var(--ratio) / 1;
		}

		.plate :global(.card) {
			aspect-ratio: 1 / var(--ratio);
			max-width: 26rem;
			padding: clamp(1.1rem, 6cqi, 2.75rem);
		}
	}
</style>
