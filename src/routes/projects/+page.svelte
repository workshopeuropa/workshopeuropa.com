<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
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

<HeaderCard title="Projects" subtitle="A handful at a time, finished properly" />

<Deck columns={2}>
	{#each projects as project (project.slug)}
		<ProjectCard {project} />
	{/each}
</Deck>
