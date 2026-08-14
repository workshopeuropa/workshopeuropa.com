<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { id?: string; children: Snippet };
	let { id, children }: Props = $props();
</script>

<div class="rubric">
	<h2 {id} class="rubric__title">{@render children()}</h2>
</div>

<style>
	/* No line under it: the small caps and the space around them are enough
	   to say a section has started. */
	.rubric {
		width: min(100%, var(--band));
		margin-inline: auto;
		padding-inline: 0.25rem;
		text-align: center;
	}

	/* Spectral SC cuts its small caps for the lowercase, so the text is
	   lowercased rather than left alone — a capital comes through as a
	   full-height capital and leaves the first letter of every rubric a
	   size out from the rest of it. */
	.rubric__title {
		font-family: var(--font-caps);
		font-size: 1.125rem;
		font-weight: 500;
		letter-spacing: 0.125em;
		text-transform: lowercase;
	}
</style>
