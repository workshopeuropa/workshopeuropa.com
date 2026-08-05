<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { site } from '$lib/content/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);
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

<!-- Only when there is body copy: the summary is already the last line of
     the card above, and printing it again is not a paragraph. -->
{#if project.body?.length}
	<section class="section">
		<div class="text">
			{#each project.body as paragraph, i (paragraph)}
				<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
			{/each}
		</div>
	</section>
{/if}

<!-- Only the particulars this project actually has; nothing at all if it
     has none, rather than a rule over an empty list. -->
{#if hasParticulars}
	<section class="section" aria-labelledby="particulars">
		<Rubric id="particulars" note={project.status}>Particulars</Rubric>

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
	<Rubric id="next" note="Back and forwards">More projects</Rubric>

	<Deck columns={2}>
		<ProjectCard project={data.previous} label="Previous" heading="h3" />
		<ProjectCard project={data.next} label="Next" heading="h3" />
	</Deck>
</section>

<style>
	.facts dd a {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
