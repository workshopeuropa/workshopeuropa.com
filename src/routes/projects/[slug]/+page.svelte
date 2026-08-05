<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import { site } from '$lib/content/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.title} — {site.name}</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<Deck columns={1}>
	<HeaderCard
		title={project.title}
		subtitle={project.subtitle}
		eyebrow="Projects"
		eyebrowHref="/projects"
	/>
</Deck>

<Deck columns={1}>
	<Card orientation="landscape" wide>
		{#snippet top()}
			<p class="meta">{project.year} · {project.status}</p>
		{/snippet}
		{#snippet middle()}
			<div class="prose">
				{#each project.body as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		{/snippet}
		{#snippet bottom()}
			<p class="meta italic">{project.discipline}</p>
		{/snippet}
	</Card>
</Deck>

<Deck columns={1}>
	<Card orientation="landscape" tone="paper" wide>
		{#snippet top()}
			<p class="meta">Particulars</p>
		{/snippet}
		{#snippet middle()}
			<dl class="facts">
				<div><dt>Year</dt><dd>{project.year}</dd></div>
				<div><dt>Discipline</dt><dd>{project.discipline}</dd></div>
				<div><dt>Status</dt><dd>{project.status}</dd></div>
				{#each project.credits ?? [] as credit (credit.role + credit.name)}
					<div><dt>{credit.role}</dt><dd>{credit.name}</dd></div>
				{/each}
			</dl>
		{/snippet}
		{#snippet bottom()}
			{#if project.links?.length}
				<ul class="links">
					{#each project.links as link (link.href)}
						<li><a href={link.href} rel="noreferrer">{link.label}</a></li>
					{/each}
				</ul>
			{/if}
		{/snippet}
	</Card>

</Deck>

<Deck columns={2}>
	<Card orientation="landscape" href="/projects/{data.previous.slug}">
		{#snippet top()}
			<p class="meta">Previous</p>
		{/snippet}
		{#snippet middle()}
			<p class="title title--small">{data.previous.title}</p>
		{/snippet}
		{#snippet bottom()}
			<p class="meta italic">{data.previous.subtitle}</p>
		{/snippet}
	</Card>

	<Card orientation="landscape" href="/projects/{data.next.slug}">
		{#snippet top()}
			<p class="meta">Next</p>
		{/snippet}
		{#snippet middle()}
			<p class="title title--small">{data.next.title}</p>
		{/snippet}
		{#snippet bottom()}
			<p class="meta italic">{data.next.subtitle}</p>
		{/snippet}
	</Card>
</Deck>

<style>
	.facts {
		display: grid;
		gap: 0.5em;
		margin: 0;
		text-align: left;
		max-width: var(--measure);
		margin-inline: auto;
		width: 100%;
		font-size: clamp(0.85rem, 2.4cqi, 1rem);
	}

	.facts > div {
		display: flex;
		justify-content: space-between;
		gap: 1.5em;
		align-items: baseline;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 0.4em;
	}

	.facts dt {
		font-style: italic;
		color: var(--ink-soft);
	}

	.facts dd {
		margin: 0;
		text-align: right;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25em 1.5em;
		font-size: clamp(0.8rem, 2.3cqi, 1rem);
	}

	.links a {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
