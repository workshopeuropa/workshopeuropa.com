<script lang="ts">
	import '@fontsource/spectral/latin-400.css'
	import '@fontsource/spectral/latin-ext-400.css'
	import '@fontsource/spectral/latin-400-italic.css'
	import '../fonts.css';
	import '../app.css';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state'
	import Colophon from '$lib/components/Colophon.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import { m } from '$lib/paraglide/messages'
	import { baseLocale, deLocalizeUrl, extractLocaleFromUrl, locales } from '$lib/paraglide/runtime'
	import { indexablePaths, localizedPageUrl } from '$lib/seo'
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const seo = $derived.by(() => {
		if (page.status !== 200) return

		const path = deLocalizeUrl(page.url).pathname
		if (!indexablePaths.has(path)) return

		return {
			canonical: localizedPageUrl(path, extractLocaleFromUrl(page.url) ?? baseLocale),
			fallback: localizedPageUrl(path, baseLocale),
			alternates: locales.map(locale => ({ locale, href: localizedPageUrl(path, locale) }))
		}
	})

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

<svelte:head>
	{#if seo}
		<link rel="canonical" href={seo.canonical} />
		{#each seo.alternates as { locale, href } (locale)}
			<link rel="alternate" hreflang={locale} {href} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={seo.fallback} />
	{/if}
</svelte:head>

<div class="shell">
	<a class="skip-link" href="#main">{m.skip_to_content()}</a>

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
	   the width of the column. Extra space above and below gives the content
	   room between the top bar and the footer cards. */
	.sheet {
		flex: 1;
		width: min(100% - var(--gutter) * 2, var(--column));
		margin-inline: auto;
		padding-block: 8rem;
		display: grid;
		gap: var(--stack);
		align-content: start;
	}

	@media (max-width: 40rem) {
		.sheet {
			padding-block: 3rem;
		}
	}
</style>
