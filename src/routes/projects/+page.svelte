<script lang="ts">
	import Declarations from '$lib/components/Declarations.svelte'
	import JsonLd from '$lib/components/JsonLd.svelte'
	import Plate from '$lib/components/Plate.svelte'
	import ProjectCard from '$lib/components/ProjectCard.svelte'
	import { groups, projectsIn, projectsTitle } from '$lib/content/projects'
	import { site } from '$lib/content/site'
	import { m } from '$lib/paraglide/messages'
	import { getLocale } from '$lib/paraglide/runtime'
	import { localizedPageUrl } from '$lib/seo'

	const locale = getLocale()
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: m.nav_projects(),
		url: localizedPageUrl('/projects', locale),
		inLanguage: locale,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: groups.flatMap(group => projectsIn(group.id)).map((project, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: project.title,
				url: localizedPageUrl(`/projects/${project.slug}`, locale)
			}))
		}
	}
</script>

<svelte:head>
	<title>{m.nav_projects()} — {site.name}</title>
	<meta name="description" content={m.projects_description()} />
</svelte:head>

<JsonLd data={structuredData} />

<h1 class="page-title">{projectsTitle()}</h1>

<!-- Keep the projects in their existing order without status headings. -->
{#each groups as group (group.id)}
	{@const list = projectsIn(group.id)}
	{#if list.length}
		<section class="section group" aria-label={group.label()}>
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
						<Plate
							src={project.image?.src}
							darkSrc={project.image?.darkSrc}
							alt={project.image?.alt}
						>
							<ProjectCard {project} orientation="landscape" />
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

	/* Add to the sheet's gap between benches. */
	.group + .group {
		margin-block-start: clamp(1.5rem, 3vw, 2.25rem);
	}
</style>
