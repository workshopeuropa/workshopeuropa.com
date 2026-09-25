<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>{page.status} — {site.name}</title>
</svelte:head>

<h1 class="page-title">Nothing at this address.</h1>

<section class="section">
	<p class="actions">
		<a class="action action--lead" href="/">Back to the front page</a>
	</p>
</section>
