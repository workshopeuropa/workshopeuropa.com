<script lang="ts">
	/* ---- The two faces -------------------------------------------------
	   Spectral is the display face and Areal is everything else, and between
	   them the site sets exactly three things: Spectral roman, Spectral
	   italic, and Areal at two weights. What is imported here is that list
	   and nothing else.

	   Spectral at 400 only. Every heading, card title and pull quote on the
	   site is 400 — the weight above it went with the header card, and the
	   500 that is left on the page belongs to the small labels, which are
	   Areal. `font-synthesis` is off with the faces, so a stray 500 on a
	   Spectral element renders as 400 rather than as a smeared one.

	   Subsets, not the lot: `400.css` is a barrel that pulls in Cyrillic,
	   Cyrillic Extended and Vietnamese alongside the two the site can
	   actually set. Latin carries the English; Latin Extended carries the
	   Nordic — the ä of Inlägg, the æ of Indlæg — which turns up in a
	   Spectral heading on a project page.

	   The italic is Latin only. It has one string in it, in three places:
	   the wordmark in the bar, the one at the foot, and the outsized one on
	   the About card. All three are `site.name`, which is ASCII. Set
	   anything with an accent in italic and its Latin Extended file has to
	   come back with it.

	   Spectral SC has gone with the small caps it was cut for — the labels
	   are tracked capitals in Areal now — and so has its package.

	   Areal is licensed and this repository is public, so it is not imported
	   from anywhere: its two files sit on the data volume, are handed out by
	   src/routes/fonts/[file]/+server.ts, and are preloaded in app.html. See
	   docs/fonts.md for how they get onto a server.
	   --------------------------------------------------------------------- */
	import '@fontsource/spectral/latin-400.css';
	import '@fontsource/spectral/latin-ext-400.css';
	import '@fontsource/spectral/latin-400-italic.css';
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
