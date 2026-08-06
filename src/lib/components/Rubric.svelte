<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { id?: string; children: Snippet };
	let { id, children }: Props = $props();
</script>

<div class="rubric">
	<h2 {id} class="rubric__title">{@render children()}</h2>
</div>

<style>
	.rubric {
		width: min(100%, var(--band));
		margin-inline: auto;
		padding-inline: 0.25rem;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 0.6rem;
		margin-bottom: calc(var(--gutter) * -0.25);
		text-align: center;
	}

	/* Spectral SC cuts its small caps for the lowercase, so the text is
	   lowercased rather than left alone — a capital comes through as a
	   full-height capital and leaves the first letter of every rubric a
	   size out from the rest of it. */
	.rubric__title {
		font-family: var(--font-caps);
		font-size: 1.15rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: lowercase;
	}
</style>
