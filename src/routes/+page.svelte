<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { formatDate, manifesto, news, site } from '$lib/content/site';
	import { projects } from '$lib/content/projects';

	const featured = projects.slice(0, 2);
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Deck columns={1}>
	<HeaderCard title={site.tagline} subtitle={site.descriptor} />
</Deck>

<Rubric note="What the workshop is for">Manifesto</Rubric>

<Deck columns={2}>
	{#each manifesto as entry, i (entry.title)}
		<Card orientation="portrait">
			{#snippet top()}
				<p class="meta">
					{String(i + 1).padStart(2, '0')} / {String(manifesto.length).padStart(2, '0')}
				</p>
			{/snippet}
			{#snippet middle()}
				<h3 class="title title--small">{entry.title}</h3>
				<div class="prose">
					{#each entry.body as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				</div>
			{/snippet}
		</Card>
	{/each}
</Deck>

<Rubric note="Notes from the bench">News</Rubric>

<Deck columns={3}>
	{#each news as item (item.title)}
		<Card orientation="landscape">
			{#snippet top()}
				<p class="meta"><time datetime={item.date}>{formatDate(item.date)}</time></p>
			{/snippet}
			{#snippet middle()}
				<h3 class="title title--small">{item.title}</h3>
				<p class="subtitle">{item.body}</p>
			{/snippet}
		</Card>
	{/each}
</Deck>

<Rubric note="A handful at a time">On the bench</Rubric>

<Deck columns={2}>
	{#each featured as project (project.slug)}
		<Card orientation="portrait" href="/projects/{project.slug}">
			{#snippet top()}
				<p class="eyebrow">{project.year}</p>
			{/snippet}
			{#snippet middle()}
				<h3 class="title">{project.title}</h3>
				<p class="subtitle italic">{project.subtitle}</p>
			{/snippet}
			{#snippet bottom()}
				<p class="meta">{project.status}</p>
			{/snippet}
		</Card>
	{/each}

	<Card orientation="landscape" tone="paper" wide href="/projects">
		{#snippet top()}
			<p class="meta">{projects.length} projects</p>
		{/snippet}
		{#snippet middle()}
			<h3 class="title title--small">All projects</h3>
		{/snippet}
		{#snippet bottom()}
			<p class="meta italic">Everything on and off the bench →</p>
		{/snippet}
	</Card>
</Deck>

<Deck columns={1}>
	<Card orientation="landscape" href="/join">
		{#snippet top()}
			<p class="eyebrow">Join</p>
		{/snippet}
		{#snippet middle()}
			<h3 class="title">Nice to meet you</h3>
			<p class="subtitle italic">Two places at the bench from September</p>
		{/snippet}
		{#snippet bottom()}
			<p class="meta">Tell us what you make →</p>
		{/snippet}
	</Card>
</Deck>
