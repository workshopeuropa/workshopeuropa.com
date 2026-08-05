<script lang="ts">
	import Card from './Card.svelte';
	import type { Project } from '$lib/content/projects';

	type Props = { project: Project; label?: string; heading?: 'h2' | 'h3' };
	let { project, label, heading = 'h2' }: Props = $props();
</script>

<Card orientation="portrait" href="/projects/{project.slug}" hue={project.hue}>
	{#snippet top()}
		<p class="eyebrow">{label ?? project.year}</p>
	{/snippet}
	{#snippet middle()}
		<svelte:element this={heading} class="title">{project.title}</svelte:element>
		<p class="subtitle italic">{project.subtitle}</p>
	{/snippet}
	{#snippet bottom()}
		<p class="meta">{project.discipline}</p>
		<p class="meta">{project.status}</p>
	{/snippet}
</Card>
