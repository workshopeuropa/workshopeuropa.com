<script lang="ts">
	import { page } from '$app/state';
	import Card from './Card.svelte';
	import CardNav from './CardNav.svelte';
	import { site } from '$lib/content/site';

	type Props = {
		title: string;
		subtitle?: string;
		/** The line above the title. Defaults to the site name. */
		eyebrow?: string;
		/** Where that line points. Defaults to the front page. */
		eyebrowHref?: string;
		orientation?: 'portrait' | 'landscape';
	};

	let {
		title,
		subtitle,
		eyebrow = site.name,
		eyebrowHref = '/',
		orientation = 'landscape'
	}: Props = $props();

	let isSelf = $derived(page.url.pathname === eyebrowHref);
</script>

<Card {orientation} wide masthead>
	{#snippet top()}
		{#if isSelf}
			<p class="eyebrow">{eyebrow}</p>
		{:else}
			<p class="eyebrow"><a class="eyebrow__link" href={eyebrowHref}>{eyebrow}</a></p>
		{/if}
	{/snippet}

	{#snippet middle()}
		<h1 class="title">{title}</h1>
		{#if subtitle}
			<p class="subtitle italic">{subtitle}</p>
		{/if}
	{/snippet}

	{#snippet bottom()}
		<CardNav />
	{/snippet}
</Card>

<style>
	.eyebrow__link:hover {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
