<script lang="ts">
	/* Spectral is the display face: the wordmark, the titles on the cards,
	   and the one pull quote on the paper. 400 for the titles, and the
	   italic for the wordmark, which is the only italic in the set.

	   Spectral SC has gone with the small caps it was cut for — the small
	   labels are tracked capitals in Areal now. The package is still in
	   package.json and nothing imports it; drop it when you are sure.

	   Areal is licensed, so it is served from static/fonts rather than from
	   a registry. See the README there. */
	import '@fontsource/spectral/400.css';
	import '@fontsource/spectral/400-italic.css';
	import '@fontsource/spectral/500.css';
	import '../fonts.css';
	import '../app.css';

	import { onNavigate } from '$app/navigation';
	import Colophon from '$lib/components/Colophon.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	/* Hand the navigation to the browser so it can tween between the two
	   pages rather than swapping them. A card that names itself travels to
	   where its counterpart sits on the next page; everything else
	   cross-fades. The animation itself is in app.css.

	   There used to be a good deal more here: the header card was on every
	   page and had to be carried from one to the next, the nav pill had to be
	   handed between the header and the footer, and a page that belonged to
	   no section needed somewhere for the marker to come from. None of that
	   survives the top bar, which does not move and is not lifted out — so
	   what is left is one project card going from the row on the index to the
	   top of its own page, which the browser does by itself.

	   Nothing here is load-bearing: without the API, or with motion turned
	   down, the navigation happens exactly as it did before. */
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="shell">
	<a class="skip-link" href="#main">Skip to content</a>

	<TopBar />

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

		min-height: 100dvh;
		max-width: var(--page);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		/* The measure the full-width row at the foot breaks out to. */
		container-type: inline-size;
		/* Landscape on a notched phone puts the cut-out down one side. */
		padding-inline: var(--safe-left) var(--safe-right);
		padding-block-start: var(--safe-top);
		overflow-x: clip;
	}

	/* The column. Every page is one measure down the middle of the shell,
	   which is what the top bar and the row of cards at the foot break out
	   of — those two are the width of the page, everything between them is
	   the width of the column.

	   No top padding: the bar above it has its own, and two would put the
	   first line of a page further from the wordmark than the wordmark is
	   from the top of the screen. */
	.sheet {
		flex: 1;
		width: min(100% - var(--gutter) * 2, var(--column));
		margin-inline: auto;
		padding-block-end: var(--gutter);
		display: grid;
		gap: var(--stack);
		align-content: start;
	}
</style>
