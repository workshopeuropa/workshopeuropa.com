<script lang="ts">
	import '@fontsource/spectral/500.css';
	import '@fontsource/spectral/500-italic.css';
	import '../app.css';

	import Colophon from '$lib/components/Colophon.svelte';
	import { shadeHue } from '$lib/tints';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	/* The page's hue, and the same hue moved towards the cold pole. Set on
	   :root rather than the shell so the page background takes it too — the
	   shell is capped at --page, and body paints everything outside it. */
	let hues = $derived(
		`:root{--hue:${data.tint.hue};--hue-cold:${shadeHue(data.tint)}}`
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- two integers we computed -->
	{@html `<style>${hues}</style>`}
</svelte:head>

<!-- One hue per page, so every card on it shares a colour. data-tint names
     it, so which one you are looking at is legible in the inspector and
     assertable in a test. -->
<div class="shell" data-tint={data.tint.name}>
	<a class="skip-link" href="#main">Skip to content</a>

	<main id="main" class="sheet">
		{@render children()}
	</main>

	<Colophon />
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

</style>
