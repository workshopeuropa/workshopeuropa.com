<script lang="ts">
	import '@fontsource/spectral/300.css';
	import '@fontsource/spectral/400.css';
	import '@fontsource/spectral/400-italic.css';
	import '@fontsource/spectral/600.css';
	import '@fontsource/spectral/600-italic.css';
	import '../app.css';

	import { site } from '$lib/content/site';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>

<div class="shell">
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
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.sheet {
		flex: 1;
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		padding-block: clamp(1.25rem, 5vw, 4rem);
		display: grid;
		gap: var(--stack);
		align-content: start;
	}

	.colophon {
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 4rem);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 1.5rem;
		font-size: 0.85rem;
		color: var(--ink-soft);
	}
</style>
