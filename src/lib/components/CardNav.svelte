<script lang="ts">
	import { page } from '$app/state';
	import { nav } from '$lib/content/site';

	type Props = {
		/** A name for the pill on the current item, so it slides from one
		    label to the next across a navigation rather than blinking out and
		    back. Every nav on the page needs its own — the header's and the
		    colophon's mark the same section, and a name has to be unique. */
		marker?: string;
		class?: string;
	};

	let { marker, class: klass = '' }: Props = $props();

	function isCurrent(href: string) {
		const path = page.url.pathname;
		return path === href || path.startsWith(href + '/');
	}

	/** True on the front page, which belongs to none of the four. */
	let nowhere = $derived(!nav.some((item) => isCurrent(item.href)));

	/* Every item carries a pill; only the current one is visible. On a page
	   that is in none of the sections there is no current one, so the pill on
	   the next page would have nothing to come from and would be set down at
	   its destination while the card was still arriving. Pressing an item
	   hands its own invisible pill the name, so the marker travels out of the
	   word you pressed and fades up on the way.

	   Done to the DOM rather than through state, for the same reason as the
	   footer's hand-over: it has to be true before the navigation is
	   snapshotted. The layout clears the mark once the new page is in. */
	function armPill(event: MouseEvent) {
		if (!marker || !nowhere) return;
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (event.defaultPrevented || event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

		const link = (event.target as Element | null)?.closest('a.card-nav__link');
		const pill = link?.querySelector<HTMLElement>('[data-pill]');
		if (!pill) return;

		pill.style.viewTransitionName = marker;
		pill.dataset.handoff = '';
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<nav class="card-nav {klass}" aria-label="Sections" onclick={armPill}>
	{#each nav as item (item.href)}
		<a
			class="card-nav__link"
			class:is-current={isCurrent(item.href)}
			href={item.href}
			aria-current={isCurrent(item.href) ? 'page' : undefined}
		>
			{item.label}
			<!-- The pill lies over the label with its own copy of it, so it is
			     the only thing lifted out and moved on a navigation: the labels
			     underneath stay where they are and the marker slides off one
			     and onto the next. The copy is hidden from the reading order,
			     since the label beneath is the real one.

			     Every item has one, and every one but the current is invisible
			     — a place for the marker to come from on a page where none of
			     them is current. -->
			<span
				class="card-nav__pill"
				data-pill
				aria-hidden="true"
				style:view-transition-name={isCurrent(item.href) ? marker : undefined}
			>
				{item.label}
			</span>
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
		position: relative;
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
	   it holds its contrast in both schemes. Laid exactly over the link, so
	   its copy of the label falls on the one underneath. */
	.card-nav__pill {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		border-radius: inherit;
		background: var(--ink);
		color: var(--card);
		/* Only the current one is there to be seen. The rest are kept for the
		   marker to travel out of, and are invisible until then — the browser
		   snapshots them all the same. */
		opacity: 0;
	}

	.is-current .card-nav__pill {
		opacity: 1;
	}

	/* The pill is already the strongest thing in the row; leave it alone. */
	.is-current:hover {
		background: none;
	}

	/* The last resort: leaving a page where no pill was named at all — the
	   front page by way of a footer card rather than the nav. The layout
	   raises this for the length of such a navigation and the pill travels
	   inside the card's own snapshot. Important, because it has to beat the
	   inline name. */
	:global([data-pill-rides]) .card-nav__pill {
		view-transition-name: none !important;
	}
</style>
