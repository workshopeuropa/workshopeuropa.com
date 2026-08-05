<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Plate from '$lib/components/Plate.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects, projectsTitle } from '$lib/content/projects';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>Projects — {site.name}</title>
	<meta
		name="description"
		content="Projects made at Workshop Europa — independent software, built in the open."
	/>
</svelte:head>

<HeaderCard title={projectsTitle} />

<!-- One plate per project: the image the full width of the page, the
     project's own card sitting on it. -->
{#each projects as project (project.slug)}
	<Plate src={project.image?.src} alt={project.image?.alt}>
		<ProjectCard {project} />
	</Plate>
{/each}
