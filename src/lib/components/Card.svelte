<script lang="ts">
	import { shadeHue, type Tint } from '$lib/tints';
	import type { Snippet } from 'svelte';

	type Props = {
		/** 1 : √2 the tall way, or √2 : 1 the wide way. */
		orientation?: 'portrait' | 'landscape';
		/** The colour the card wears. Left out, it inherits whatever hue is
		    in scope — which at the top of the tree is the house lime. */
		tint?: Tint;
		/** Turns the card into a link. */
		href?: string;
		/** Span the full width of the row. */
		wide?: boolean;
		/** A name the browser can follow across a navigation, so this card
		    travels to where its counterpart sits on the next page instead of
		    being cut away. Must be unique in the document. */
		morph?: string;
		/** Extra classes for the caller. */
		class?: string;
		/** Three bands: something at the head, something in the middle,
		    something at the foot. */
		top?: Snippet;
		middle?: Snippet;
		bottom?: Snippet;
		/** Or take the whole surface. */
		children?: Snippet;
	};

	let {
		orientation = 'portrait',
		tint,
		href,
		wide = false,
		morph,
		class: klass = '',
		top,
		middle,
		bottom,
		children
	}: Props = $props();

	/* Set on the card rather than the page, which is the whole change: a row
	   of three cards is three hues now, and the page under them is neutral. */
	let hue = $derived(tint ? String(tint.hue) : undefined);
	let hueCold = $derived(tint ? String(shadeHue(tint)) : undefined);
</script>

{#snippet body()}
	{#if children}
		{@render children()}
	{:else}
		<div class="band band--top">{#if top}{@render top()}{/if}</div>
		<div class="band band--middle">{#if middle}{@render middle()}{/if}</div>
		<div class="band band--bottom">{#if bottom}{@render bottom()}{/if}</div>
	{/if}
{/snippet}

{#if href}
	<a
		class="card card--{orientation} card--link {klass}"
		class:card--wide={wide}
		style:--hue={hue}
		style:--hue-cold={hueCold}
		style:view-transition-name={morph}
		data-morph={morph}
		{href}
	>
		{@render body()}
	</a>
{:else}
	<article
		class="card card--{orientation} {klass}"
		class:card--wide={wide}
		style:--hue={hue}
		style:--hue-cold={hueCold}
		style:view-transition-name={morph}
		data-morph={morph}
	>
		{@render body()}
	</article>
{/if}

<style>
	.card {
		container-type: inline-size;
		/* The head and the foot take what they need; the middle takes the
		   rest, which is where the picture goes. The old card put its middle
		   band on the centre line between two equal tracks — right for a card
		   that was a title page, wrong for one that has something in it. */
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 1.5rem;
		width: 100%;
		/* A card fills the column it is given and centres in anything wider —
		   a project's card on its plate is capped well under the plate's
		   width, and without this it sat against the left edge of it. */
		margin-inline: auto;
		/* One inset for everything the card holds, so nothing is closer to an
		   edge than anything else. Published so a child can read it. */
		--pad: clamp(1rem, 4.5cqi, 1.75rem);
		padding: var(--pad);
		/* Square. The radius used to be cut from this padding and the nav
		   pill that sat in it, so the two curves stayed concentric at every
		   width — a nice piece of geometry with nothing left to hold, now
		   that the nav has moved to the top bar and the design has squared
		   the corners off. The one curve left on the site is the .action
		   pill, which is the shape of a control. */
		/* The recipes are re-run here rather than inherited, and that is
		   load-bearing. A custom property is substituted at the element that
		   declares it: --tint declared on :root resolves against :root's hue
		   once and then inherits as a finished colour, so setting --hue on a
		   card changed nothing and a row of three came out three shades of
		   lime. Declared on the card, they resolve against the card's own
		   hue. Everything inside inherits the finished colour, which is what
		   the type and the buttons on it want. */
		--tint: oklch(var(--tint-l) var(--tint-c) var(--hue));
		--shade: oklch(var(--shade-l) var(--shade-c) var(--hue-cold));
		--card: var(--tint);

		background: var(--card);
		color: var(--ink);
		/* A card is the sans now, like everything else that is read. Only the
		   title below reaches for the serif. */
		font-family: var(--font-text);
		letter-spacing: 0;
		text-align: start;
		overflow-wrap: break-word;
		/* aspect-ratio sets the floor — a card with more in it than the ratio
		   allows grows downwards rather than clipping. */
		aspect-ratio: 1 / var(--ratio);
		/* The card is what crops what is in it. The middle band used to do
		   its own clipping, which meant nothing could reach past the card's
		   padding — and the outsized wordmark on the About card is supposed
		   to run off the edge of the card, not stop a padding short of it
		   with a margin of card colour around it. */
		overflow: hidden;
	}

	/* The card turns over with the page. Declared here rather than left to
	   the rule in app.css for the same reason as above: that one sets --card
	   on :root, and a card that has redeclared --tint and --shade locally
	   needs to be told locally which of the two it is wearing. */
	@media (prefers-color-scheme: dark) {
		.card {
			--card: var(--shade);
		}
	}

	.card--landscape {
		aspect-ratio: var(--ratio) / 1;
		max-width: var(--band);
	}

	.card--wide {
		grid-column: 1 / -1;
	}

	.card--link {
		transition:
			transform 160ms ease,
			filter 160ms ease;
	}

	.card--link:hover {
		transform: translateY(-2px);
		filter: brightness(1.02);
	}

	.card--link:active {
		transform: translateY(0);
	}

	.band {
		display: grid;
		gap: 0.75rem;
		min-width: 0;
	}

	.band--top {
		align-self: start;
	}

	/* Whatever is in the middle fills the space the other two leave and sits
	   on its own centre line inside it.

	   position is what keeps a picture inside the band: a 1fr row is a
	   definite height, but its content is not obliged to respect it, and an
	   illustration taller than the row centred itself in the row and then
	   spilled over the title above and the line below. It is a frame now, and
	   what goes in it is positioned against it — a picture laid into the
	   frame exactly, so there is nothing to clip.

	   No overflow rule of its own, deliberately: the card does the clipping,
	   so something that wants to can reach past the padding to the card's
	   edge. */
	.band--middle {
		position: relative;
		align-self: stretch;
		align-content: center;
		min-height: 0;
	}

	.band--bottom {
		align-self: end;
	}

	/* --- Typography inside a card ---------------------------------------
	   Set, not scaled. Every card carries the same sizes, so a project card
	   reads as loudly as the one beside it — sizing against the card meant
	   a small card whispered.
	   --------------------------------------------------------------------- */

	/* The label over the title: the same tracked capitals as every other
	   small label on the site. */
	.card :global(.eyebrow) {
		font-family: var(--font-caps);
		font-size: 0.8rem;
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: var(--track-label);
		text-transform: uppercase;
	}

	.card :global(.title),
	.card :global(.title--small) {
		font-family: var(--font-display);
		/* Even the last line: a headline should not leave one word alone. */
		text-wrap: balance;
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: 0;
		/* A word longer than its column hyphenates rather than hanging out
		   of the card. */
		hyphens: auto;
		overflow-wrap: anywhere;
	}

	.card :global(.title) {
		font-size: 2rem;
	}

	.card :global(.title--small) {
		font-size: 1.5rem;
	}

	/* Below about eight characters a line, hyphenation stops helping and
	   starts chopping: a narrow card reads better ragged. break-word still
	   catches a word that genuinely cannot fit. */
	@container (max-width: 16rem) {
		.card :global(.title),
		.card :global(.title--small) {
			hyphens: manual;
			overflow-wrap: break-word;
		}
	}

	.card :global(.italic) {
		font-style: italic;
	}

	/* The line at the foot of a card. A size down from the column and set
	   tighter, since it is a caption rather than something to read at
	   length. */
	.card :global(.meta) {
		font-size: 1rem;
		line-height: 1.5;
	}

	.card :global(.prose) {
		font-size: 1rem;
		line-height: 1.5;
		max-width: var(--measure);
		display: grid;
		gap: 0.85em;
	}

	/* A card's contrast pair is ink on card, not ink on paper, so a button
	   sitting on one inverts to the card's own fill rather than the page's. */
	.card :global(.action:hover),
	.card :global(.action--lead) {
		color: var(--card);
	}

	/* One class deeper than the rule above, so the lead's hover — which
	   empties the fill rather than laying one on — still gets the ink back
	   instead of drawing the card's colour on the card. */
	.card :global(.action--lead:hover) {
		color: var(--ink);
	}
</style>
