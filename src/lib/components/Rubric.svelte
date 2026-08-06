<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { id?: string; note?: string; children: Snippet };
	let { id, note, children }: Props = $props();
</script>

<div class="rubric">
	<h2 {id} class="rubric__title">{@render children()}</h2>
	{#if note}<p class="rubric__note">{note}</p>{/if}
</div>

<style>
	.rubric {
		width: min(100%, var(--band));
		margin-inline: auto;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.25rem 1.5rem;
		padding-inline: 0.25rem;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 0.6rem;
		margin-bottom: calc(var(--gutter) * -0.25);
	}

	/* Spectral SC cuts its own small caps, so the text is left alone —
	   uppercasing it would swap them back for full capitals. */
	.rubric__title {
		font-family: var(--font-caps);
		font-size: 1.15rem;
		font-weight: 500;
		letter-spacing: 0.04em;
	}

	.rubric__note {
		font-family: var(--font-display);
		font-size: 0.95rem;
		font-style: italic;
		color: var(--ink-soft);
	}
</style>
