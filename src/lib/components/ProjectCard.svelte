<script lang="ts">
	import Card from './Card.svelte';
	import type { Project } from '$lib/content/projects';

	type Props = { project: Project; label?: string; heading?: 'h2' | 'h3' };
	let { project, label, heading = 'h2' }: Props = $props();
</script>

<Card orientation="portrait" href="/projects/{project.slug}">
	{#snippet top()}
		<!-- The name carries the heading: the headline below is the bigger
		     type, but the project is what this card is. -->
		<svelte:element this={heading} class="eyebrow italic">{project.title}</svelte:element>
	{/snippet}
	{#snippet middle()}
		<p class="title">{project.headline}</p>
	{/snippet}
	{#snippet bottom()}
		{#if label}
			<p class="meta">{label}</p>
		{/if}
		{#if project.url}
			<p class="meta">{project.url}</p>
		{/if}
	{/snippet}
</Card>
