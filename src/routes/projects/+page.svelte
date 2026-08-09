<script lang="ts">
	import Declarations from '$lib/components/Declarations.svelte';
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

				<!-- What it holds to, at a glance. How it meets each test is on
				     the project's own page, which is more than a row under a
				     plate can carry. -->
				<Declarations {project} />
			{/each}
		</section>
	{/if}
{/each}
