<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		id?: string;
		/** The front page's rubric is the page's own heading; a rubric over a
		    group inside a page is a level down. */
		level?: 'h1' | 'h2';
		children: Snippet;
	};

	let { id, level = 'h2', children }: Props = $props();
</script>

<div class="rubric">
	<svelte:element this={level} {id} class="rubric__title">{@render children()}</svelte:element>
</div>

<style>
	/* No line under it: the capitals and the space around them are enough to
	   say a section has started. */
	.rubric {
		width: min(100%, var(--column));
		margin-inline: auto;
		text-align: start;
	}

	/* This used to be Spectral SC, lowercased so the face's small caps came
	   through on every letter — a capital in the source otherwise arrived as
	   a full-height capital and left the first letter of every rubric a size
	   out from the rest. The design sets its rubrics as tracked capitals in
	   the sans instead, which is the same device the numbers over the
	   commitments and the labels on the cards use, so the small labels are
	   now one system rather than two. */
	.rubric__title {
		font-family: var(--font-caps);
		font-size: 0.8rem;
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		/* Two short lines rather than one long one, which is how the design
		   sets it — it is a label, and a label that runs the width of the
		   column stops reading as one. */
		max-width: 18em;
		text-wrap: balance;
	}
</style>
