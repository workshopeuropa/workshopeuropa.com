<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { site } from '$lib/content/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);
	/* The card at the top of the page already carries this project's name,
	   and with a short list previous and next can be the same project. Only
	   hand out a name that nothing else on the page has claimed. */
	let previousMorphs = $derived(data.previous.slug !== project.slug);
	let nextMorphs = $derived(
		data.next.slug !== project.slug && data.next.slug !== data.previous.slug
	);
	let hasParticulars = $derived(
		Boolean(
			project.year || project.discipline || project.credits?.length || project.links?.length
		)
	);
</script>

<svelte:head>
	<title>{project.title} — {site.name}</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<!-- Two header cards. The first is the wordmark and the nav at half height,
     with nothing in the middle to hold; the second is the project's own card
     from the index, laid on its side, carrying the h1. -->
<HeaderCard half />

<Deck columns={1}>
	<ProjectCard {project} orientation="landscape" heading="h1" link={false} />
</Deck>

<!-- The description opens the page: the card carries the url now, so this
     is where it says what the project actually is. -->
<section class="section">
	<div class="text">
		<p class="lede">{project.summary}</p>
		{#each project.body ?? [] as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
</section>

<!-- Only the particulars this project actually has; nothing at all if it
     has none, rather than a rule over an empty list. -->
{#if hasParticulars}
	<section class="section" aria-labelledby="particulars">
		<Rubric id="particulars">Particulars</Rubric>

		<dl class="facts">
			{#if project.year}<div><dt>Year</dt><dd>{project.year}</dd></div>{/if}
			{#if project.discipline}<div><dt>Discipline</dt><dd>{project.discipline}</dd></div>{/if}
			{#each project.credits ?? [] as credit (credit.role + credit.name)}
				<div><dt>{credit.role}</dt><dd>{credit.name}</dd></div>
			{/each}
			{#each project.links ?? [] as link (link.href)}
				<div>
					<dt>Elsewhere</dt>
					<dd><a href={link.href} rel="noreferrer">{link.label}</a></dd>
				</div>
			{/each}
		</dl>
	</section>
{/if}

<section class="section" aria-labelledby="next">
	<Rubric id="next">More projects</Rubric>

	<Deck columns={2}>
		<ProjectCard project={data.previous} label="Previous" heading="h3" morph={previousMorphs} />
		<ProjectCard project={data.next} label="Next" heading="h3" morph={nextMorphs} />
	</Deck>
</section>

<style>
	.facts dd a {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
