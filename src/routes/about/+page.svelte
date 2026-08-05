<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { about } from '$lib/content/about';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>About — {site.name}</title>
	<meta name="description" content={about.body[0]} />
</svelte:head>

<Deck columns={1}>
	<HeaderCard title={about.title} subtitle={about.subtitle} />
</Deck>

<Deck columns={1}>
	<Card orientation="landscape" wide>
		{#snippet top()}
			<p class="meta italic">{site.name}</p>
		{/snippet}
		{#snippet middle()}
			<div class="prose">
				{#each about.body as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		{/snippet}
		{#snippet bottom()}
			<p class="meta">
				<a class="mail" href="mailto:{site.email}">{site.email}</a>
			</p>
		{/snippet}
	</Card>
</Deck>

<Rubric note="The short answers">Particulars</Rubric>

<Deck columns={2}>
	{#each about.facts as fact (fact.label)}
		<Card orientation="landscape" tone="paper">
			{#snippet top()}
				<p class="meta italic">{fact.label}</p>
			{/snippet}
			{#snippet middle()}
				<h2 class="title title--small">{fact.title}</h2>
				<p class="subtitle">{fact.note}</p>
			{/snippet}
		</Card>
	{/each}
</Deck>

<Deck columns={1}>
	<Card orientation="landscape" href="/join">
		{#snippet top()}
			<p class="eyebrow">Join</p>
		{/snippet}
		{#snippet middle()}
			<h2 class="title">Nice to meet you</h2>
			<p class="subtitle italic">Two places at the bench from September</p>
		{/snippet}
		{#snippet bottom()}
			<p class="meta">Tell us what you make →</p>
		{/snippet}
	</Card>
</Deck>

<style>
	.mail {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
