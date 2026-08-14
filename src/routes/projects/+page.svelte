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
		<section class="section group" aria-labelledby={group.id}>
			<Rubric id={group.id}>{group.title}</Rubric>
			<p class="standfirst">{group.note}</p>

			<div class="bench">
				{#each list as project (project.slug)}
					<!-- A plate and the commitments under it are one project, so they
					     are one element: laid out flat, every gap on the bench was
					     the section's single gap, and a row of pills sat exactly as
					     far from the plate it belongs to as from the next project's.
					     Grouped, the tight gap is inside a project and the loose one
					     falls between two. -->
					<article class="project">
						<!-- The card on the index is one big link to the project's
						     page: name at the top, the claim in the big type, the
						     address at the foot. The status is the group heading's job
						     here, and what you can do with the thing is on the page
						     the card opens. -->
						<Plate src={project.image?.src} alt={project.image?.alt}>
							<ProjectCard {project} />
						</Plate>

						<!-- What it holds to, at a glance. How it meets each test is
						     on the project's own page, which is more than a row under
						     a plate can carry. -->
						<Declarations {project} />
					</article>
				{/each}
			</div>
		</section>
	{/if}
{/each}

<style>
	/* The list has three distances and they have to come in that order at
	   every width, which flat they did not: a project and what it declares
	   were as far apart as two projects, and the sheet's own gap between two
	   benches — 1rem where it bottoms out — was tighter on a phone than the
	   2rem the section put between two projects on one bench, so the further
	   apart two things were in the structure the closer they sat on screen.

	   Tightest inside a project, looser between two, loosest between benches,
	   all from one ratio so they cannot cross again. */
	.project {
		display: grid;
		gap: clamp(0.75rem, 2vw, 1.25rem);
	}

	.bench {
		display: grid;
		gap: clamp(2rem, 5vw, 3.25rem);
	}

	/* On top of the sheet's own gap, and only between benches: the first one
	   keeps whatever distance the intro above it already sets. */
	.group + .group {
		margin-block-start: clamp(1.5rem, 3vw, 2.25rem);
	}
</style>
