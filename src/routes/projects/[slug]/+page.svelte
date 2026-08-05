<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Plate from '$lib/components/Plate.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { site } from '$lib/content/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.title} — {site.name}</title>
	<meta name="description" content={project.summary} />
</svelte:head>

{#if project.image}
	<Plate src={project.image.src} alt={project.image.alt}>
		<HeaderCard title={project.title} eyebrow="Projects" eyebrowHref="/projects" />
	</Plate>
{:else}
	<HeaderCard title={project.title} eyebrow="Projects" eyebrowHref="/projects" />
{/if}

<section class="section">
	<div class="text">
		{#each project.body as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
	</div>
</section>

<section class="section" aria-labelledby="particulars">
	<Rubric id="particulars" note={project.status}>Particulars</Rubric>

	<dl class="facts">
		<div><dt>Year</dt><dd>{project.year}</dd></div>
		<div><dt>Discipline</dt><dd>{project.discipline}</dd></div>
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
