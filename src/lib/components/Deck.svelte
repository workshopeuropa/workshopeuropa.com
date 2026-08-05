<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Cards per row on a wide screen. Everything collapses to one column on small. */
		columns?: 1 | 2 | 3;
		class?: string;
		children: Snippet;
	};

	let { columns = 2, class: klass = '', children }: Props = $props();
</script>

<div class="deck deck--{columns} {klass}">
	{@render children()}
</div>

<style>
	.deck {
		display: grid;
		gap: var(--gutter);
		grid-template-columns: minmax(0, 1fr);
		justify-content: center;
		align-items: start;
	}

	/* Columns are capped so a card never grows into a billboard —
	   the ratio means every extra centimetre of width costs 1.41 of height. */
	@media (min-width: 52rem) {
		.deck--2 {
			grid-template-columns: repeat(2, minmax(0, 30rem));
		}

		.deck--3 {
			grid-template-columns: repeat(3, minmax(0, 22rem));
		}
	}
</style>
