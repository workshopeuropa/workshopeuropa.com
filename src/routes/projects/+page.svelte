<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Plate from '$lib/components/Plate.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { groups, projectsIn, projectsIntro, projectsTitle } from '$lib/content/projects';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>Projects — {site.name}</title>
	<meta name="description" content="What Workshop Europa publishes. {projectsIntro}" />
</svelte:head>

<HeaderCard title={projectsTitle} />

<section class="section">
	<div class="text">
		<p class="lede">{projectsIntro}</p>
	</div>
</section>

<!-- Three benches, and a group with nothing on it is not there at all: an
     empty heading announces the emptiness, and "coming soon" announces it
     twice. The unfinished ones are not dressed up — they say Early and the
     verb on the button says what you can actually do with them. -->
{#each groups as group (group.id)}
	{@const list = projectsIn(group.id)}
	{#if list.length}
		<section class="section" aria-labelledby={group.id}>
			<Rubric id={group.id}>{group.title}</Rubric>
			<p class="standfirst">{group.note}</p>

			{#each list as project (project.slug)}
				<Plate src={project.image?.src} alt={project.image?.alt}>
					<ProjectCard {project} cta />
				</Plate>
			{/each}
		</section>
	{/if}
{/each}
