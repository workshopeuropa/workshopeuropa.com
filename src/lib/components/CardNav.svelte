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
	/* Equal columns rather than space-between: with items of different
	   widths, spreading them leaves the middle one off the card's centre
	   line. A track each puts it on it, and the outer two still reach the
	   edges by aligning within their own track. */
	.card-nav {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		align-items: baseline;
		gap: 0.6em;
		/* 1rem, which is where it sits on every phone from 360px up. Four
		   labels and their pills do not fit a narrower card than that, so
		   below it the nav — and only the nav — gives back a little. */
		font-size: clamp(0.8rem, 5.5cqi, 1rem);
		line-height: 1.2;
	}

	.card-nav__link {
		justify-self: center;
	}

	.card-nav__link:first-child {
		justify-self: start;
	}

	.card-nav__link:last-child {
		justify-self: end;
	}

	.card-nav__link {
		padding: 0.2em 0.7em;
		border-radius: 999px;
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

	/* The pill's padding would push the outer two labels off the line the
	   rest of the card is set to; pulling it back keeps the type aligned
	   with the card's edges and lets only the pill overhang. */
	.card-nav__link:first-child {
		margin-inline-start: -0.7em;
	}

	.card-nav__link:last-child {
		margin-inline-end: -0.7em;
	}

</style>
