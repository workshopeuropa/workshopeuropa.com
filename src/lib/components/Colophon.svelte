<script lang="ts">
	import Card from './Card.svelte';
	import CardNav from './CardNav.svelte';
	import Deck from './Deck.svelte';
	import { about } from '$lib/content/about';
	import { join } from '$lib/content/join';
	import { projectsTitle } from '$lib/content/projects';
	import { site } from '$lib/content/site';

	/** The wordmark stacks a word per row, the way it does in the header. */
	const words = site.name.split(/\s+/).filter(Boolean);
	const year = new Date().getFullYear();
</script>

<footer class="colophon">
	<!-- About across the top, then Join and Projects side by side. -->
	<Deck columns={1}>
		<Card orientation="landscape" href="/about">
			{#snippet top()}
				<p class="eyebrow italic">About</p>
			{/snippet}
			{#snippet middle()}
				<p class="title--small">{about.title}</p>
			{/snippet}
		</Card>
	</Deck>

	<Deck columns={2} collapse={false}>
		<Card orientation="portrait" href="/join">
			{#snippet top()}
				<p class="eyebrow italic">Join</p>
			{/snippet}
			{#snippet middle()}
				<p class="title--small">{join.title}</p>
			{/snippet}
		</Card>

		<Card orientation="portrait" href="/projects">
			{#snippet top()}
				<p class="eyebrow italic">Projects</p>
			{/snippet}
			{#snippet middle()}
				<p class="title--small">{projectsTitle}</p>
			{/snippet}
		</Card>
	</Deck>

	<Deck columns={1}>
		<Card orientation="landscape" masthead>
			{#snippet top()}
				<CardNav />
			{/snippet}
			{#snippet middle()}
				<p class="title italic">
					{#each words as word (word)}
						<span class="word">{word}</span>
					{/each}
				</p>
			{/snippet}
			{#snippet bottom()}
				<p class="meta">© {year}</p>
			{/snippet}
		</Card>
	</Deck>
</footer>

<style>
	.colophon {
		display: grid;
		gap: var(--gap);
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 4rem);
		padding-bottom: calc(clamp(2rem, 6vw, 4rem) + var(--safe-bottom, 0px));
	}

	.word {
		display: block;
	}
</style>
