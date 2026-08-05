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

	.rubric__title {
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.rubric__note {
		font-size: 0.9rem;
		font-style: italic;
		color: var(--ink-soft);
	}
</style>
