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
		gap: 0.75em;
		font-size: clamp(0.78rem, 3.4cqi, 1.05rem);
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
		padding-block: 0.15em;
		transition: opacity 140ms ease;
	}

	.card-nav__link:hover {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}

	.is-current {
		font-weight: 700;
	}

	:global(.card--landscape) .card-nav {
		font-size: clamp(0.78rem, 2.3cqi, 1.05rem);
	}

	/* Fixed in the masthead, like the rest of its type. Must come after the
	   landscape rule — same specificity, so source order decides. */
	:global(.card--masthead) .card-nav {
		font-size: 1rem;
	}
</style>
