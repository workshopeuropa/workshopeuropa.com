<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import {
		commitments,
		commitmentsFooter,
		commitmentsIntro,
		commitmentsTitle
	} from '$lib/content/commitments';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>Commitments — {site.name}</title>
	<meta name="description" content={commitmentsIntro} />
</svelte:head>

<HeaderCard title={commitmentsTitle} />

<section class="section">
	<div class="text">
		<p class="lede">{commitmentsIntro}</p>
	</div>
</section>

<!-- Three movements: what we owe you, the one thing we ask back, and the one
     that binds everybody. The turns between them are stage directions rather
     than headings — they name the shape of the set, and a heading would put
     them in the same register as the commitments they introduce. -->
{#each commitments as commitment (commitment.slug)}
	{#if commitment.opens}
		<p class="turn">{commitment.opens}</p>
	{/if}

	<article class="section commitment" id={commitment.slug}>
		<div class="text">
			<p class="commitment__number">{commitment.n} of {commitments.length}</p>
			<h2 class="commitment__title">{commitment.title}</h2>

			{#each commitment.body as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}

			<!-- Readable text, never a tooltip: the test is the half of the
			     commitment that can be held against us. -->
			<p class="test">
				<span class="test__label">Test</span>
				{commitment.test}
			</p>

			{#if commitment.coda}
				<p class="coda">{commitment.coda}</p>
			{/if}
		</div>
	</article>
{/each}

<section class="section">
	<div class="text">
		<p class="closing">{commitmentsFooter}</p>
	</div>
</section>

<style>
	/* Full width rather than in the column the commitments are set in, so
	   the turn reads as the page changing gear and not as another paragraph.
	   Smaller and quieter than what follows it. */
	.turn {
		width: 100%;
		margin-inline: auto;
		padding-block: clamp(1rem, 4vw, 2.5rem) 0;
		font-family: var(--font-caps);
		font-size: 1rem;
		letter-spacing: 0.04em;
		text-align: center;
		text-transform: lowercase;
		color: var(--ink-soft);
	}

	/* Deep links come from the front page and from the register's filters,
	   so a commitment has to land clear of the top of the window. */
	.commitment {
		scroll-margin-top: var(--gutter);
	}

	.commitment__number {
		font-size: 0.9rem;
		font-weight: 500;
		letter-spacing: 0;
		color: var(--ink-soft);
		text-align: center;
	}

	.commitment__title {
		font-size: clamp(1.4rem, 1.1rem + 1.3vw, 2rem);
		font-weight: 500;
		line-height: 1.15;
		text-align: center;
		text-wrap: balance;
		margin-bottom: 0.2em;
	}

	/* The label in the small-caps cut rather than in italic — italic on this
	   site is the wordmark and nothing else. */
	.test {
		font-weight: 500;
	}

	.test__label {
		font-family: var(--font-caps);
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: lowercase;
		color: var(--ink-soft);
	}

	.test__label::after {
		content: ':';
	}

	.coda {
		color: var(--ink-soft);
	}

	/* Set away from the fifth commitment rather than running on from its
	   coda — it is addressed to whoever is reading, not to the set. */
	.closing {
		padding-block-start: clamp(1.5rem, 5vw, 3rem);
		color: var(--ink-soft);
	}
</style>
