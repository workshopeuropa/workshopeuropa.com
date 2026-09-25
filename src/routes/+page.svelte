<script lang="ts">
	import Rubric from '$lib/components/Rubric.svelte';
	import {
		commitments,
		commitmentsFooter,
		commitmentsIntro,
		commitmentsTitle
	} from '$lib/content/commitments';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<!-- The page opens on its rubric rather than on a hero: the top bar carries
     the wordmark now, so the first thing under it is the first thing to
     read. The rubric is the h1 — it is the only heading the page has above
     the commitments themselves. -->
<Rubric level="h1" id="commitments">{commitmentsTitle}</Rubric>

{#if site.wedge.length}
	<section class="section">
		<p class="lede">
			{#each site.wedge as line, i (line)}{#if i}<br />{/if}{line}{/each}
		</p>
	</section>
{/if}

{#if commitmentsIntro}
	<section class="section">
		<p class="standfirst">{commitmentsIntro}</p>
	</section>
{/if}

<!-- The five, set as one list rather than five sections: a title at the size
     of the text under it, with the space above each pair doing the work that
     a bigger heading used to. Deep links come from every project page, one
     per commitment declared, so each has to land clear of the top of the
     window. -->
<div class="entries">
	{#each commitments as commitment (commitment.slug)}
		{#if commitment.opens}
			<p class="turn">{commitment.opens}</p>
		{/if}

		<article class="entry" id={commitment.slug}>
			<header>
				<p>{commitment.n}</p>
				<h2>{commitment.title}</h2>
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
</div>

{#if commitmentsFooter}
	<section class="section">
		<div class="text">
			<p class="closing">{commitmentsFooter}</p>
		</div>
	</section>
{/if}

<style>
	/* Deep links come from every project page, so a commitment has to land
	   clear of the top of the window. */
	.entry {
		scroll-margin-top: var(--gutter);
	}

	/* Set away from the fifth commitment rather than running on from its
	   coda — it is addressed to whoever is reading, not to the set. */
	.closing {
		padding-block-start: clamp(1.5rem, 5vw, 3rem);
		color: var(--ink-soft);
	}
</style>
