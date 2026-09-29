<script lang="ts">
	import { page } from '$app/state';
	import Rubric from '$lib/components/Rubric.svelte';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>{page.status} — {site.name}</title>
</svelte:head>

<Rubric level="h1">Nothing at this address.</Rubric>

<section class="section">
	<p class="actions">
		<a class="action action--lead" href="/">Back to the front page</a>
	</p>
</section>
