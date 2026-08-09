<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Plate from '$lib/components/Plate.svelte';
	import {
		commitments,
		commitmentsFooter,
		commitmentsIntro,
		commitmentsTitle
	} from '$lib/content/commitments';
	import { links, site } from '$lib/content/site';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Plate src={site.image.src} alt={site.image.alt}>
	<HeaderCard title={site.tagline} />
</Plate>

<!-- The wedge. Every other list of European software sorts by jurisdiction —
     where it is hosted, who owns it, where the data sits. This one sorts by
     structure, and the two lines are the whole difference. -->
<section class="section">
	<p class="lede wedge">
		{#each site.wedge as line, i (line)}{#if i}<br />{/if}{line}{/each}
	</p>

	<p class="actions">
		<a class="action action--lead" href="#commitments">Read the commitments</a>
		<a class="action" href="/projects">See the projects</a>
		<a class="action" href={links.matrix} rel="noreferrer">Open the room</a>
	</p>
</section>

<!-- The commitments are the front page rather than a page you have to find:
     this is the argument, and everything else on the site is what follows
     from it. Three movements, and the turns between them are stage
     directions rather than headings — a heading would put them in the same
     register as the commitments they introduce. -->
<section class="section" aria-labelledby="commitments">
	<h2 class="headline" id="commitments">{commitmentsTitle}</h2>
	<p class="standfirst">{commitmentsIntro}</p>
</section>

{#each commitments as commitment (commitment.slug)}
	{#if commitment.opens}
		<p class="turn">{commitment.opens}</p>
	{/if}

	<article class="section commitment" id={commitment.slug}>
		<div class="text">
			<p class="commitment__number">{commitment.n} of {commitments.length}</p>
			<h3 class="commitment__title">{commitment.title}</h3>

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

<!-- What we publish against them. Each project says which of the five it
     holds to, and its own page says how it meets each test. -->
<section class="section" aria-labelledby="answers-to">
	<h2 class="headline" id="answers-to">Who it answers to.</h2>
	<p class="standfirst">
		Every project on the bench declares which of the five it holds to, and how it meets each test.
	</p>

	<p class="actions">
		<a class="action action--lead" href="/projects">See the projects</a>
	</p>
</section>

<section class="section">
	<p class="pull">{site.pullQuote}</p>
</section>

<style>
	/* Two lines, broken where they are written rather than where they fit —
	   the second answers the first, and a break anywhere else loses that. */
	.wedge {
		text-align: center;
		text-wrap: balance;
	}

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

	/* Deep links come from every project page, one per commitment declared,
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
