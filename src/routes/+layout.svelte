<script lang="ts">
	import '@fontsource/spectral/300.css';
	import '@fontsource/spectral/400.css';
	import '@fontsource/spectral/400-italic.css';
	import '@fontsource/spectral/600.css';
	import '@fontsource/spectral/600-italic.css';
	import '../app.css';

	import { site } from '$lib/content/site';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<!-- One tint per page, set here so every card on it shares the same one. -->
<div class="shell" style="--card: hsl({data.hue} var(--tint-s) var(--tint-l))">
	<a class="skip-link" href="#main">Skip to content</a>

	<main id="main" class="sheet">
		{@render children()}
	</main>

	<footer class="colophon">
		<p>{site.name}</p>
		<p><a href="mailto:{site.email}">{site.email}</a></p>
	</footer>
</div>

<style>
	.shell {
		/* Held in variables so the safe-area maths below can be tested by
		   overriding them — env() itself cannot be set from script. */
		--safe-top: env(safe-area-inset-top, 0px);
		--safe-bottom: env(safe-area-inset-bottom, 0px);
		--safe-left: env(safe-area-inset-left, 0px);
		--safe-right: env(safe-area-inset-right, 0px);
		--sheet-pad: clamp(1.25rem, 5vw, 4rem);

		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		/* Landscape on a notched phone puts the cut-out down one side. */
		padding-inline: var(--safe-left) var(--safe-right);
	}

	.sheet {
		flex: 1;
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		/* Where the browser already reserves space at the top, spend that
		   instead of our own: the gap ends up max(--sheet-pad, --safe-top). */
		padding-block-start: max(0px, var(--sheet-pad) - var(--safe-top));
		padding-block-end: var(--sheet-pad);
		display: grid;
		gap: var(--stack);
		align-content: start;
	}

	.colophon {
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 4rem);
		padding-bottom: calc(clamp(2rem, 6vw, 4rem) + var(--safe-bottom));
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 1.5rem;
		font-size: 0.85rem;
		color: var(--ink-soft);
	}
</style>
