<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** The image behind the card. Without one the plate is just tinted stock. */
		src?: string;
		alt?: string;
		/** The image is usually the tall way, so the card on it can be the wide way. */
		orientation?: 'portrait' | 'landscape';
		/** Where the card sits on the image. */
		align?: 'center' | 'end';
		/** How much of the plate's width the card takes. */
		inset?: number;
		class?: string;
		/** The card. */
		children: Snippet;
	};

	let {
		src,
		alt = '',
		orientation = 'portrait',
		align = 'center',
		inset = 0.86,
		class: klass = '',
		children
	}: Props = $props();
</script>

<figure
	class="plate plate--{orientation} plate--{align} {klass}"
	style="--inset: {Math.round(inset * 100)}%"
>
	<div class="plate__media">
		{#if src}
			<img src={src} {alt} loading="lazy" decoding="async" />
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
		justify-items: center;
		margin: 0 auto;
		width: 100%;
		max-width: 32rem;
		padding: clamp(0.75rem, 4%, 2rem);
		/* Same floor as a card: the ratio, unless what is on it needs more. */
		aspect-ratio: 1 / var(--ratio);
	}

	.plate--landscape {
		aspect-ratio: var(--ratio) / 1;
		max-width: 46rem;
	}

	.plate--center {
		align-items: center;
	}

	.plate--end {
		align-items: end;
	}

	.plate__media {
		position: absolute;
		inset: 0;
		border-radius: var(--radius);
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
		width: var(--inset);
	}
</style>
