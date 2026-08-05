<script lang="ts">
	import '@fontsource/spectral/500.css';
	import '@fontsource/spectral/500-italic.css';
	import '../app.css';

	import { site } from '$lib/content/site';
	import { shadeHue } from '$lib/tints';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let tint = $derived(`hsl(${data.tint.hue} var(--tint-s) var(--tint-l))`);
	let shade = $derived(`hsl(${shadeHue(data.tint)} var(--shade-s) var(--shade-l))`);
</script>

<!-- One tint per page, set here so every card on it shares the same one.
     data-tint names it, so which one you are looking at is legible in the
     inspector and assertable in a test. -->
<div class="shell" style="--card: {tint}; --shade: {shade}" data-tint={data.tint.name}>
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
		--sheet-pad: var(--gutter);
		/* Where the browser already reserves space at the top, spend that
		   instead of our own: the gap ends up max(--sheet-pad, --safe-top).
		   Named so a full-bleed plate can cancel exactly this much. */
		--sheet-top: max(0px, var(--sheet-pad) - var(--safe-top));

		min-height: 100dvh;
		max-width: var(--page);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		/* The measure a full-bleed plate breaks out to. */
		container-type: inline-size;
		/* Landscape on a notched phone puts the cut-out down one side. */
		padding-inline: var(--safe-left) var(--safe-right);
		/* A full-bleed child is 100vw, which counts the scrollbar; clip the
		   overhang rather than letting the page scroll sideways. */
		overflow-x: clip;
	}

	.sheet {
		flex: 1;
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		padding-block-start: var(--sheet-top);
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
