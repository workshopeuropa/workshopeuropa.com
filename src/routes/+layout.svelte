<script lang="ts">
	/* 400 for running text, 500 for anything that asks for it — headings,
	   cards, rubrics, the labels over a list. Italic is the wordmark and
	   nothing else, so only the one weight of it is here. */
	import '@fontsource/spectral/400.css';
	import '@fontsource/spectral/500.css';
	import '@fontsource/spectral/500-italic.css';
	import '@fontsource/spectral-sc/500.css';
	import '../app.css';

	import { onNavigate } from '$app/navigation';
	import Colophon from '$lib/components/Colophon.svelte';
	import { shadeHue } from '$lib/tints';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	/* Hand the navigation to the browser so it can tween between the two
	   pages rather than swapping them. Cards that name themselves travel to
	   where their counterpart sits on the next page; everything else
	   cross-fades. The animation itself is in app.css.

	   Nothing here is load-bearing: without the API, or with motion turned
	   down, the navigation happens exactly as it did before. */
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		/* Every nav item carries a pill, but only one of them is ever named:
		   the current section's, or on the front page whichever you just
		   pressed. If none is — you left the front page by a footer card
		   rather than the nav — there is nothing for the pill on the next page
		   to come from, so let it ride inside the card's own snapshot instead
		   of being set down at its destination while the card is still on its
		   way. Read before the transition starts, since by the time the
		   callback runs the new page is already coming in. */
		const rides = ![...document.querySelectorAll('[data-pill]')].some(
			(pill) => getComputedStyle(pill).viewTransitionName !== 'none'
		);

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				if (rides) document.documentElement.dataset.pillRides = '';
				resolve();
				await navigation.complete;
				/* Something in the footer may have taken the masthead's name on
				   the way out. The page it landed on has its own header card
				   wearing that name now, so give it back before this state is
				   snapshotted — two elements holding one name cancels the
				   whole transition. Back to whatever the element declared
				   rather than to nothing: the colophon card lends its name out
				   and needs its own returned. */
				for (const el of document.querySelectorAll<HTMLElement>('[data-handoff]')) {
					el.style.viewTransitionName = el.dataset.morph ?? '';
					delete el.dataset.handoff;
				}
			});

			/* Lowered once the animation is over, not when the callback ends:
			   the flag has to still be up when the new state is captured. */
			transition.finished.finally(() => {
				delete document.documentElement.dataset.pillRides;
			});
		});
	});

	/* The page's hue, and the same hue moved towards the cold pole. Set on
	   :root rather than the shell so the page background takes it too — the
	   shell is capped at --page, and body paints everything outside it.

	   :root:root, not :root: svelte:head renders above the stylesheet links,
	   so at equal specificity app.css's default hue would win on document
	   order and every page would come out the same colour. Doubling the
	   selector settles it on specificity instead, wherever the tag lands. */
	let hues = $derived(
		`:root:root{--hue:${data.tint.hue};--hue-cold:${shadeHue(data.tint)}}`
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
