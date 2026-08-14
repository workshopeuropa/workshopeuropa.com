<script lang="ts">
	import HeaderCard from "$lib/components/HeaderCard.svelte";
	import Plate from "$lib/components/Plate.svelte";
	import {
		commitments,
		commitmentsFooter,
		commitmentsIntro,
		commitmentsTitle,
	} from "$lib/content/commitments";
	import { links, site, taglineLines } from "$lib/content/site";
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Plate src={site.image.src} alt={site.image.alt}>
	<HeaderCard title={site.tagline} lines={taglineLines} />
</Plate>

<section class="section">
	<p class="lede wedge">
		{#each site.wedge as line, i (line)}{#if i}<br />{/if}{line}{/each}
	</p>
</section>

<section class="section" aria-labelledby="commitments">
	<header>
		<h2 id="commitments">{commitmentsTitle}</h2>
		<p>{commitmentsIntro}</p>
	</header>
</section>

{#each commitments as commitment (commitment.slug)}
	{#if commitment.opens}
		<p class="turn">{commitment.opens}</p>
	{/if}

	<article class="section" id={commitment.slug}>
		<header>
			<p>{commitment.n}</p>
			<h3>{commitment.title}</h3>
		</header>

		<div class="text">
			{#each commitment.body as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}

			<dl>
				<dt>Test</dt>
				<dd>{commitment.test}</dd>
			</dl>

			{#if commitment.coda}
				<p>{commitment.coda}</p>
			{/if}
		</div>
	</article>
{/each}

<section class="section">
	<div class="text">
		<p class="closing">{commitmentsFooter}</p>
	</div>
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

	/* Deep links come from every project page, one per commitment declared,
	   so a commitment has to land clear of the top of the window. */
	article.section {
		scroll-margin-top: var(--gutter);
	}

	/* Set away from the fifth commitment rather than running on from its
	   coda — it is addressed to whoever is reading, not to the set. */
	.closing {
		padding-block-start: clamp(1.5rem, 5vw, 3rem);
		color: var(--ink-soft);
	}
</style>
