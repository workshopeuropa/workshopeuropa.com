<script lang="ts">
	import { page } from '$app/state';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
</script>

<svelte:head>
	<title>{page.status} — Workshop Europa</title>
</svelte:head>

<HeaderCard title={String(page.status)} subtitle={page.error?.message ?? 'Something went wrong'} />

<section class="section">
	<p class="text"><a href="/">Back to the front page →</a></p>
</section>
