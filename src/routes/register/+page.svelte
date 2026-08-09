<script lang="ts">
	import { page } from '$app/state';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import { commitments } from '$lib/content/commitments';
	import {
		declared,
		entries,
		filterEntries,
		registerEmpty,
		registerIntro,
		registerTitle
	} from '$lib/content/register';
	import { site } from '$lib/content/site';

	/* The filter lives in the URL, so a filtered register can be linked to,
	   works before the JavaScript arrives, and goes back the way it came. */
	let active = $derived.by(() => {
		const raw = Number(page.url.searchParams.get('c'));
		return commitments.some((commitment) => commitment.n === raw) ? raw : null;
	});

	/* Never sorted by how many commitments an entry declares, and never
	   scored. Four of five is a real position, not a failure — the list
	   filters by commitment and keeps its own order. */
	let shown = $derived(filterEntries(entries, active));
</script>

<svelte:head>
	<title>Register — {site.name}</title>
	<meta name="description" content={registerIntro[0]} />
</svelte:head>

<HeaderCard title={registerTitle} />

<section class="section">
	<div class="text">
		{#each registerIntro as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
	</div>
</section>

<section class="section" aria-labelledby="filters">
	<h2 class="visually-hidden" id="filters">Filter the register</h2>

	<nav class="filters" aria-label="Filter by commitment">
		<a
			class="filter"
			class:is-on={active === null}
			href="/register"
			aria-current={active === null ? 'page' : undefined}
			data-sveltekit-noscroll
		>
			All
		</a>
		{#each commitments as commitment (commitment.slug)}
			<a
				class="filter"
				class:is-on={active === commitment.n}
				href="/register?c={commitment.n}"
				aria-current={active === commitment.n ? 'page' : undefined}
				data-sveltekit-noscroll
			>
				{commitment.n}
				{commitment.short}
			</a>
		{/each}
	</nav>
</section>

<section class="section">
	{#if shown.length === 0}
		<p class="empty">{registerEmpty}</p>
	{:else}
		<ul class="list">
			{#each shown as entry (entry.slug)}
				<li>
					<article class="record">
						<h2 class="record__name">{entry.name}</h2>
						<p class="record__line">{entry.line}</p>
						<p class="record__meta">
							<span>{entry.place}</span>
							<a href={entry.href} rel="noreferrer">{entry.domain}</a>
						</p>

						<!-- All five, every time. An entry that declares three says so
						     in words, and the two it leaves out say so in words as
						     well — never in a colour, and never as a score. -->
						<ul class="declares">
							{#each commitments as commitment (commitment.slug)}
								{@const declaration = declared(entry, commitment.n)}
								<li class="declares__item" class:is-met={Boolean(declaration)}>
									<p class="declares__head">
										<span class="declares__mark">{declaration ? 'Met' : 'Not claimed'}</span>
										<a class="declares__title" href="/commitments#{commitment.slug}">
											{commitment.n}
											{commitment.short}
										</a>
									</p>
									{#if declaration}
										<p class="declares__how">{declaration.how}</p>
									{/if}
								</li>
							{/each}
						</ul>
					</article>
				</li>
			{/each}
		</ul>
	{/if}

	<p class="actions">
		<a class="action action--lead" href="/join#register">Add yourself</a>
	</p>
</section>

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		width: min(100%, var(--band));
		margin-inline: auto;
	}

	.filter {
		padding: 0.35rem 0.9rem;
		border: 1px solid var(--ink-soft);
		border-radius: 999px;
		font-size: 0.95rem;
		line-height: 1.25;
		transition:
			background 140ms ease,
			border-color 140ms ease,
			color 140ms ease;
	}

	.filter:hover {
		border-color: var(--ink);
	}

	/* The filter you are on is filled, the way the nav's pill is, and says
	   so to a screen reader with aria-current as well. */
	.filter.is-on {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--paper);
	}

	.list {
		display: grid;
		gap: 0;
		width: min(100%, var(--column));
		margin-inline: auto;
	}

	.record {
		display: grid;
		gap: 0.5rem;
		padding-block: clamp(1.5rem, 4vw, 2.5rem);
	}

	.record__name {
		font-size: clamp(1.25rem, 1.05rem + 0.9vw, 1.7rem);
		font-weight: 500;
		line-height: 1.2;
		text-align: center;
	}

	.record__line {
		text-align: center;
		text-wrap: pretty;
	}

	.record__meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.2em 1em;
		font-size: 0.9rem;
		color: var(--ink-soft);
	}

	.record__meta a {
		color: var(--ink);
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}

	.declares {
		display: grid;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}

	.declares__item {
		display: grid;
		gap: 0.25rem;
	}

	.declares__head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5em;
	}

	/* A word, not a colour: the indicator has to survive being read aloud
	   and being looked at by somebody who does not see the difference
	   between two greens. */
	.declares__mark {
		flex: none;
		min-width: 6.5em;
		padding: 0.1em 0.6em;
		border: 1px solid var(--ink-soft);
		border-radius: 999px;
		font-family: var(--font-caps);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		text-align: center;
		text-transform: lowercase;
		color: var(--ink-soft);
	}

	.is-met .declares__mark {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--paper);
	}

	.declares__title {
		font-weight: 500;
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}

	.is-met .declares__title {
		color: var(--ink);
	}

	.declares__item:not(.is-met) .declares__title {
		color: var(--ink-soft);
	}

	.declares__how {
		/* Under the label rather than beside it, and indented to exactly the
		   width of the marker plus the gap beside it, so the declarations line
		   up down the entry. In rem, because the marker's 6.5em is 6.5 of its
		   own 0.8rem and this paragraph is set at 0.95. */
		padding-inline-start: calc(6.5 * 0.8rem + 0.5rem);
		font-size: 0.95rem;
		line-height: 1.55;
	}

	@media (max-width: 32rem) {
		.declares__how {
			padding-inline-start: 0;
		}
	}

	.empty {
		width: min(100%, var(--column));
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 3.5rem);
		text-align: center;
		text-wrap: balance;
		color: var(--ink-soft);
	}
</style>
