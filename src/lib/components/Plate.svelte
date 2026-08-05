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
		/* Full bleed: break out of the sheet's measure and fill the screen. */
		width: 100vw;
		margin-inline: calc(50% - 50vw);
		min-height: 100dvh;
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
</style>
