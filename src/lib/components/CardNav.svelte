<script lang="ts">
	import { page } from '$app/state';
	import { nav } from '$lib/content/site';

	let { class: klass = '' }: { class?: string } = $props();

	function isCurrent(href: string) {
		const path = page.url.pathname;
		return path === href || path.startsWith(href + '/');
	}
</script>

<nav class="card-nav {klass}" aria-label="Sections">
	{#each nav as item (item.href)}
		<a
			class="card-nav__link"
			class:is-current={isCurrent(item.href)}
			href={item.href}
			aria-current={isCurrent(item.href) ? 'page' : undefined}
		>
			{item.label}
		</a>
	{/each}
</nav>

<style>
	/* Equal gaps, not equal tracks. A track each centred the inner labels
	   in their own column while the outer two reached for the edges, which
	   left three different-sized holes; spreading the items puts the same
	   space between every pair. There is no middle item to knock off the
	   card's centre line now that there are four of them. */
	.card-nav {
		/* A pill of 1.2em of line between 0.2em of padding, so a capsule is
		   half of that. Both the rounding and the inset below are cut from
		   this one number, and cannot fall out of step. */
		--pill-h: 1.6em;
		--pill-r: calc(var(--pill-h) / 2);
		/* A capsule sits concentric inside the card's corner when it is
		   inset by the difference between the two radii — much less than
		   the card's padding, so the nav breaks out of it and runs close to
		   the edges. Everything else in the card keeps the padding. */
		--inset: max(0px, calc(var(--radius) - var(--pill-r)));
		--break: calc(var(--inset) - var(--pad, 0px));
		margin-inline: var(--break);

		display: flex;
		justify-content: space-between;
		align-items: baseline;
		/* The narrowest card the site is built for holds four labels at 1rem
		   with this much between them and this much inside each pill, and
		   nothing narrower is a target — so the type is set, like the rest
		   of the card's. */
		gap: 0.4em;
		font-size: 1rem;
		line-height: 1.2;
	}

	/* Whichever edge the nav is against is the one it breaks towards — the
	   foot of a page header, the head of the colophon. align-self keeps the
	   band from stretching it back over the negative margin it just took. */
	:global(.band--bottom) > .card-nav {
		align-self: end;
		margin-block-end: var(--break);
	}

	:global(.band--top) > .card-nav {
		align-self: start;
		margin-block-start: var(--break);
	}

	.card-nav__link {
		padding: 0.2em 0.6em;
		border-radius: var(--pill-r);
		transition:
			background 140ms ease,
			color 140ms ease;
	}

	.card-nav__link:hover {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}

	/* The page you are on wears a pill in the ink, with the card's own
	   colour as the type — the same pairing as text on card, inverted, so
	   it holds its contrast in both schemes. */
	.is-current {
		background: var(--ink);
		color: var(--card);
	}

	.is-current:hover {
		text-decoration: none;
	}

</style>
