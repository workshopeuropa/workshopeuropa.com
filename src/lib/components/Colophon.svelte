<script lang="ts">
	import { page } from '$app/state';
	import Card from './Card.svelte';
	import CardNav from './CardNav.svelte';
	import Deck from './Deck.svelte';
	import { about } from '$lib/content/about';
	import { join } from '$lib/content/join';
	import { newsTitle } from '$lib/content/news';
	import { projectsTitle } from '$lib/content/projects';
	import { links, site } from '$lib/content/site';

	/** The four sections, in the order the footer would rather have them.
	    A page drops its own card and the next one moves up, so every page
	    points at the three places you have not got to yet. The front page
	    belongs to none of them, so it keeps the first three. */
	const sections: { href: string; label: string; title: string }[] = [
		{ href: '/about', label: 'About', title: about.title },
		{ href: '/join', label: 'Join', title: join.title },
		{ href: '/projects', label: 'Projects', title: projectsTitle },
		{ href: '/news', label: 'News', title: newsTitle }
	];

	function isCurrent(href: string) {
		const path = page.url.pathname;
		return path === href || path.startsWith(href + '/');
	}

	let shown = $derived(sections.filter((section) => !isCurrent(section.href)).slice(0, 3));
	let lead = $derived(shown[0]);
	let pair = $derived(shown.slice(1));

	/** The wordmark stacks a word per row, the way it does in the header. */
	const words = site.name.split(/\s+/).filter(Boolean);
	const year = new Date().getFullYear();

	/* Press something down here and it is the card you are looking at that
	   should become the header card up there — not the header card you have
	   scrolled away from, which is what the browser would otherwise fly in
	   from off-screen.

	   Which card that is depends on what you pressed: one of the three
	   section cards is its own answer, and the menu at the very bottom
	   belongs to the colophon card around it.

	   The name can only be on one element at a time, so that card takes it
	   and the page's own header gives it up. Done to the DOM rather than
	   through state because it has to be true before the navigation is
	   snapshotted, and this click is the last moment that is certain. The
	   layout hands the names back once the new page is in place. */
	function handOver(event: MouseEvent) {
		/* The same two conditions the layout uses to decide whether to
		   transition at all — without them the name would be moved and never
		   handed back, since the giving back happens inside the transition. */
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		if (event.defaultPrevented || event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

		const target = event.target as Element | null;
		const link = target?.closest('a[href]');
		if (!link || !sections.some((section) => section.href === link.getAttribute('href'))) return;

		const card = link.matches('a.card')
			? link
			: link.closest('.card-nav') && document.querySelector('[data-morph="colophon"]');
		if (!(card instanceof HTMLElement)) return;

		const header = document.querySelector<HTMLElement>('[data-morph="masthead"]');
		if (!header || header === card) return;

		/* Anything left over from a navigation that never completed. Two
		   elements holding one name cancels the whole transition, so it is
		   worth a sweep before taking it. */
		for (const stale of document.querySelectorAll<HTMLElement>('[data-handoff]')) {
			stale.style.viewTransitionName = stale.dataset.morph ?? '';
			delete stale.dataset.handoff;
		}

		/* Marked as well, so a navigation that never completes leaves the
		   header able to get its own name back. */
		header.style.viewTransitionName = 'none';
		header.dataset.handoff = '';
		card.style.viewTransitionName = 'masthead';
		card.dataset.handoff = '';
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<!-- Delegated rather than per-card: it is a hand-over between two elements,
     not something a card should know how to do. The links keep working with
     the keyboard and without JavaScript either way. -->
<footer class="colophon" onclick={handOver}>
	<!-- The first across the top, the other two side by side under it. -->
	<Deck columns={1}>
		<Card orientation="landscape" href={lead.href}>
			{#snippet top()}
				<p class="eyebrow">{lead.label}</p>
			{/snippet}
			{#snippet middle()}
				<p class="title--small">{lead.title}</p>
			{/snippet}
		</Card>
	</Deck>

	<Deck columns={2} collapse={false}>
		{#each pair as section (section.href)}
			<Card orientation="portrait" href={section.href}>
				{#snippet top()}
					<p class="eyebrow">{section.label}</p>
				{/snippet}
				{#snippet middle()}
					<p class="title--small">{section.title}</p>
				{/snippet}
			</Card>
		{/each}
	</Deck>

	<Deck columns={1}>
		<Card orientation="landscape" masthead morph="colophon">
			{#snippet top()}
				<!-- No name on this one. The two footers sit at different
				     depths down two pages of different lengths, and the scroll
				     resets on the way, so a named pill here swept thousands of
				     pixels down the page on every navigation — the curve you
				     see out of the corner of your eye. Sliding the marker is a
				     header gesture; down here it simply changes over. -->
				<CardNav />
			{/snippet}
			{#snippet middle()}
				<!-- The wordmark is the way to the front page, which is where
				     the commitments are. The header card's is a link for the
				     same reason; this is the same gesture at the other end of
				     the page, so somebody who has read to the bottom does not
				     have to scroll back up to find it. -->
				<p class="title italic">
					<a class="wordmark" href="/">
						{#each words as word (word)}
							<span class="word">{word}</span>
						{/each}
					</a>
				</p>
			{/snippet}
			{#snippet bottom()}
				<!-- The three ways out of the site: the room, the source, and
				     the feed. A feed is the sort of thing this audience looks
				     for, and putting it where it can be seen rather than only
				     in the document head is itself on thesis. -->
				<p class="meta elsewhere">
					<a href={links.matrix} rel="noreferrer">Matrix</a>
					<a href={links.source} rel="noreferrer">Source</a>
					<a href={links.rss}>RSS</a>
				</p>
				<p class="meta">{site.place} · © {year}</p>
			{/snippet}
		</Card>
	</Deck>
</footer>

<style>
	.colophon {
		display: grid;
		gap: var(--gap);
		width: min(100% - var(--gutter) * 2, 64rem);
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 4rem);
		padding-bottom: calc(clamp(2rem, 6vw, 4rem) + var(--safe-bottom, 0px));
	}

	.word {
		display: block;
	}

	/* No underline on hover: the wordmark is two stacked words, and ruling
	   under both of them is the only hard edge on the card. It lightens
	   instead, the way the masthead's does. */
	.wordmark {
		display: inline-block;
		transition: color 140ms ease;
	}

	.wordmark:hover {
		color: color-mix(in srgb, currentColor 65%, transparent);
	}

	/* Three words, spaced rather than ruled apart — the card has no hard
	   edges anywhere else on it either. */
	.elsewhere {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25em 1.25em;
	}

	.elsewhere a {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}

	/* Only small where the card is: on a desktop the footer's cards have the
	   room to carry the same 2rem as every other card. Kept here rather than
	   in Card so a small card elsewhere — the pair at the foot of a project
	   page — stays small at every width. */
	@media (min-width: 60rem) {
		.colophon :global(.title--small) {
			font-size: 2rem;
		}
	}
</style>
