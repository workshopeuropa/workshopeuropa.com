<script lang="ts">
	import { page } from '$app/state';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte'
	import { navEnd, navStart, site } from '$lib/content/site';
	import { m } from '$lib/paraglide/messages'
	import { deLocalizeUrl, localizeHref } from '$lib/paraglide/runtime'

	/** The wordmark stacks a word per row, the way it did on the card. */
	const words = site.name.split(/\s+/).filter(Boolean);
	let currentPath = $derived(deLocalizeUrl(page.url).pathname)

	function isCurrent(href: string) {
		return currentPath === href || currentPath.startsWith(href + '/')
	}
</script>

{#snippet group(items: readonly { href: string; label: string }[], side: string)}
	<nav class="bar__nav bar__nav--{side}" aria-label={side === 'start' ? m.nav_sections() : m.nav_account()}>
		{#each items as item (item.href)}
			<a
				class="bar__link"
				class:is-current={isCurrent(item.href)}
				href={localizeHref(item.href)}
				aria-current={isCurrent(item.href) ? 'page' : undefined}
			>
				{item.label}
			</a>
		{/each}
		{#if side === 'end'}
			<LanguageSwitcher />
		{/if}
	</nav>
{/snippet}

<!-- Three columns, and the middle one is the only one that is measured: the
     outer two are equal fractions, so the wordmark sits on the page's centre
     line whatever the two navs weigh. Centring it in the flow instead put it
     wherever the left-hand nav happened to end. -->
<header class="bar">
	{@render group(navStart, 'start')}

	<p class="bar__mark">
		<a class="bar__wordmark" href={localizeHref('/')} aria-label={currentPath === '/' ? undefined : site.name}>
			{#each words as word (word)}
				<span class="bar__word">{word}</span>
			{/each}
		</a>
	</p>

	{@render group(navEnd, 'end')}
</header>

<style>
	.bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: start;
		gap: var(--gutter);
		/* The bar and the row of cards at the foot are the two things that
		   are the width of the page rather than the width of the column, and
		   the gutter is all that holds either of them off the edge. */
		width: calc(100% - var(--gutter) * 2);
		margin-inline: auto;
		padding-block: clamp(1.25rem, 3vw, 2.4rem);
	}

	.bar__nav {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		/* The design sets these ~95px apart at 1728, which is 5.9rem between
		   the start of one and the start of the next. Measured as a gap it is
		   nearer 4rem, and it closes rather than wrapping as the page
		   narrows. */
		gap: 0.5rem clamp(1.5rem, 4vw, 4rem);
		/* The nav is the small-label role: tracked capitals' sibling, set at
		   the label size rather than the column's. */
		font-size: 1rem;
		line-height: 1.25;
		letter-spacing: var(--track-label);
	}

	.bar__nav--end {
		justify-content: flex-end;
	}

	/* The design marks nothing as current. A section you are already in is
	   worth saying quietly all the same — a weight rather than a rule or a
	   pill, so the row stays one even line of type. */
	.bar__link,
	.bar__nav > :global(button[popovertarget]) {
		transition: opacity 140ms ease;
	}

	.bar__link:hover,
	.bar__nav > :global(button[popovertarget]:hover) {
		opacity: 0.6;
	}

	.is-current {
		font-weight: 500;
	}

	/* The one italic in the set, and the only serif above the fold. */
	.bar__mark {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-style: italic;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0;
		text-align: center;
	}

	.bar__word {
		display: block;
	}

	.bar__wordmark {
		display: inline-block;
		transition: opacity 140ms ease;
	}

	.bar__wordmark:hover {
		opacity: 0.6;
	}

	/* A phone has no room for a nav either side of a centred wordmark. The
	   mark goes up on its own row and the two navs sit under it, still at
	   opposite ends, so the shape of the thing survives the fold. */
	@media (max-width: 40rem) {
		.bar {
			grid-template-columns: minmax(0, 1fr) fit-content(50%);
			row-gap: clamp(1rem, 4vw, 1.5rem);
		}

		.bar__mark {
			grid-row: 1;
			grid-column: 1 / -1;
		}

		.bar__nav {
			column-gap: 1rem;
		}

		.bar__nav--start {
			grid-row: 2;
			grid-column: 1;
		}

		.bar__nav--end {
			grid-row: 2;
			grid-column: 2;
		}
	}
</style>
