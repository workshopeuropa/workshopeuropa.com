<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Cards per row on a wide screen. Everything collapses to one column on small. */
		columns?: 1 | 2;
		/** Off to keep the columns on a phone rather than stacking them. */
		collapse?: boolean;
		class?: string;
		children: Snippet;
	};

	let { columns = 2, collapse = true, class: klass = '', children }: Props = $props();
</script>

<div class="deck deck--{columns} {collapse ? '' : 'deck--firm'} {klass}">
	{@render children()}
</div>

<style>
	/* Decks sit in the same band as the rules and the header card —
	   with this ratio, every extra centimetre of width costs 1.41 of
	   height, so the band is what keeps a card from becoming a billboard. */
	.deck {
		display: grid;
		gap: var(--gap);
		grid-template-columns: minmax(0, 1fr);
		align-items: start;
		width: min(100%, var(--band));
		margin-inline: auto;
	}

	/* A firm deck keeps its columns all the way down. :global for the same
	   reason as below — the children come from a snippet. */
	:global(.deck--firm.deck--2:has(> :nth-child(2))) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	/* Only split into columns when there is something to put in them,
	   so a deck of one centres instead of leaving a hole. */
	/* :global because the children come from a snippet — Svelte cannot see
	   them at compile time and prunes the scoped rule as unused. */
	@media (min-width: 44rem) {
		:global(.deck--2:has(> :nth-child(2))) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
