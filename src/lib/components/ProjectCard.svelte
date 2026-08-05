<script lang="ts">
	import Card from './Card.svelte';
	import type { Project } from '$lib/content/projects';

	type Props = {
		project: Project;
		label?: string;
		heading?: 'h1' | 'h2' | 'h3';
		orientation?: 'portrait' | 'landscape';
		/** Off when the card is the project it sits on — a page should not
		    link to itself. */
		link?: boolean;
	};

	let {
		project,
		label,
		heading = 'h2',
		orientation = 'portrait',
		link = true
	}: Props = $props();
</script>

<Card {orientation} href={link ? `/projects/${project.slug}` : undefined}>
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
		<p class="meta">{project.summary}</p>
	{/snippet}
</Card>
