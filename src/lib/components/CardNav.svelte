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
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.6em;
		/* 1rem, which is where it sits on every phone from 360px up. Four
		   labels and their pills do not fit a narrower card than that, so
		   below it the nav — and only the nav — gives back a little. */
		font-size: clamp(0.8rem, 5.5cqi, 1rem);
		line-height: 1.2;
	}

	/* The pill is what you see, so the pill is what lines up: its box runs
	   to the card's inner edge on both sides and sits on it at the foot, so
	   the space left, right and below it is the card's own padding.

	   Rounded to fit inside the card's corner rather than to a capsule —
	   concentric with it, which is the card's radius less the padding the
	   pill is inset by. That can come out at or below zero, in which case
	   the corner is square, and the two curves still agree. */
	.card-nav__link {
		padding: 0.2em 0.7em;
		border-radius: max(0px, calc(var(--radius) - var(--pad, 0px)));
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
