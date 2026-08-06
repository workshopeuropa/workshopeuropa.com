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
		/** Off where the same project already has a card on this page: a
		    name has to be unique in the document, and two cards claiming one
		    cancel the whole transition. */
		morph?: boolean;
	};

	let {
		project,
		label,
		heading = 'h2',
		orientation = 'portrait',
		link = true,
		morph = true
	}: Props = $props();

	/* The name the browser follows from the index to the project's own page.
	   Sanitised because it has to be a valid identifier, not a URL segment. */
	let name = $derived(morph ? `project-${project.slug.replace(/[^a-z0-9-]+/gi, '-')}` : undefined);
</script>

<Card {orientation} morph={name} href={link ? `/projects/${project.slug}` : undefined}>
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
