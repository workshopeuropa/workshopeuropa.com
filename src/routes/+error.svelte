<script lang="ts">
	import { page } from '$app/state';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>{page.status} — {site.name}</title>
</svelte:head>

<HeaderCard title="Nothing at this address." />

<section class="section">
	<p class="actions">
		<a class="action action--lead" href="/register">Back to the register</a>
	</p>
</section>
