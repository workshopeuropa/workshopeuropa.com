<script lang="ts">
	import { page } from '$app/state';
	import { nav } from '$lib/content/site';

	type Props = {
		/** A name for the current item, so its pill slides from one label to
		    the next across a navigation rather than blinking out and back.
		    Every nav on the page needs its own — the header's and the
		    colophon's mark the same section, and a name has to be unique. */
		marker?: string;
		class?: string;
	};

	let { marker, class: klass = '' }: Props = $props();

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
			style:view-transition-name={isCurrent(item.href) ? marker : undefined}
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
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		/* The narrowest card the site is built for holds four labels at 1rem
		   with this much between them and this much inside each pill, and
		   nothing narrower is a target — so the type is set, like the rest
		   of the card's. */
		gap: 0.4em;
		font-size: var(--nav-size, 1rem);
		line-height: 1.2;
	}

	/* A capsule, whose radius is what the card's rim is measured from — the
	   pill sits concentric inside the corner it is tucked into. */
	.card-nav__link {
		padding: 0.2em 0.6em;
		border-radius: calc(var(--pill-h, 1.6rem) / 2);
		transition: background 140ms ease;
	}

	/* Hovering fills the same shape faintly rather than ruling under the
	   word — the card is a set of soft rectangles, and a line under one of
	   them would be the only hard edge on it. */
	.card-nav__link:hover {
		background: color-mix(in srgb, currentColor 12%, transparent);
	}

	/* The page you are on wears a pill in the ink, with the card's own
	   colour as the type — the same pairing as text on card, inverted, so
	   it holds its contrast in both schemes. Already the strongest thing in
	   the row, so hovering it changes nothing.

	   The pill is the whole link rather than a layer behind the label, so
	   that when it travels the label travels inside it: split them and the
	   label is left card-coloured on a card while the pill is away. */
	.is-current,
	.is-current:hover {
		background: var(--ink);
		color: var(--card);
	}
</style>
