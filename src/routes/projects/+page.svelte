<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import { projects } from '$lib/content/projects';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>Projects — {site.name}</title>
	<meta
		name="description"
		content="Projects made at Workshop Europa — on the bench, out in the world, and resting."
	/>
</svelte:head>

<Deck columns={1}>
	<HeaderCard title="Projects" subtitle="A handful at a time, finished properly" />
</Deck>

<Deck columns={2}>
	{#each projects as project (project.slug)}
		<Card orientation="portrait" href="/projects/{project.slug}">
			{#snippet top()}
				<p class="eyebrow">{project.year}</p>
			{/snippet}
			{#snippet middle()}
				<h2 class="title">{project.title}</h2>
				<p class="subtitle italic">{project.subtitle}</p>
			{/snippet}
			{#snippet bottom()}
				<p class="meta">{project.discipline}</p>
				<p class="meta">{project.status}</p>
			{/snippet}
		</Card>
	{/each}
</Deck>
