<script lang="ts">
	import Card from './Card.svelte';
	import type { Person } from '$lib/content/people';

	let { person }: { person: Person } = $props();
</script>

<Card orientation="portrait">
	{#snippet top()}
		<p class="eyebrow">{person.role}</p>
	{/snippet}
	{#snippet middle()}
		<h3 class="title">{person.name}</h3>
	{/snippet}
	{#snippet bottom()}
		{#if person.link}
			<p class="meta">
				<a class="person-link" href={person.link.href} rel="noreferrer">{person.link.label}</a>
			</p>
		{/if}
	{/snippet}
</Card>

<style>
	.person-link {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
