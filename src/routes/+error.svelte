<script lang="ts">
	import { page } from '$app/state';
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>{page.status} — Workshop Europa</title>
</svelte:head>

<Deck columns={1}>
	<HeaderCard title={String(page.status)} subtitle={page.error?.message ?? 'Something went wrong'} />

	<Card orientation="landscape" tone="paper" wide href="/">
		{#snippet middle()}
			<p class="title title--small">Back to the front page</p>
		{/snippet}
	</Card>
</Deck>
