<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		src?: string
		darkSrc?: string
		alt?: string
		children: Snippet
	}

	let { src, darkSrc, alt = '', children }: Props = $props()
</script>

<figure>
	{#if src}
		<picture>
			{#if darkSrc}
				<source media="(prefers-color-scheme: dark)" srcset={darkSrc} />
			{/if}
			<img {src} {alt} width="3200" height="2000" loading="lazy" />
		</picture>
	{/if}
	<figcaption>
		{@render children()}
	</figcaption>
</figure>

<style>
	figure {
		display: grid;
		width: 100%;
		margin: 0;
	}

	picture {
		display: block;
		min-width: 0;
		border: 1px solid color-mix(in srgb, var(--ink) 15%, transparent);
	}

	img {
		width: 100%;
		height: auto;
	}

	figcaption {
		position: relative;
		width: 100%;
	}

	picture + figcaption {
		width: calc(100% - 2rem);
		margin: -2rem auto 0;
	}

	figure :global(.card) {
		aspect-ratio: var(--ratio) / 1;
	}

	@media (min-width: 60rem) {
		figure:has(picture) {
			/* Keep the screenshot within the page instead of bleeding to the viewport. */
			padding-block-end: 4rem;
		}

		picture,
		picture + figcaption {
			grid-area: 1 / 1;
		}

		picture + figcaption {
			align-self: end;
			justify-self: end;
			width: 55%;
			margin: 0 2rem -4rem 0;
		}
	}
</style>
