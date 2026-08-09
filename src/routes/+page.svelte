<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Plate from '$lib/components/Plate.svelte';
	import { commitments, commitmentsSummary } from '$lib/content/commitments';
	import { registerSummary } from '$lib/content/register';
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
		<a class="action action--lead" href="/commitments">Read the commitments</a>
		<a class="action" href="/register">See the register</a>
		<a class="action" href={links.matrix} rel="noreferrer">Open the room</a>
	</p>
</section>

<!-- The titles only. The commitments themselves, and the tests that come
     with them, are one page away and are not worth saying twice. -->
<section class="section" aria-labelledby="commitments">
	<h2 class="headline" id="commitments">{commitmentsSummary.title}</h2>
	<p class="standfirst">{commitmentsSummary.note}</p>

	<ul class="entries">
		{#each commitments as commitment (commitment.slug)}
			<li class="entry entry--single">
				<p class="entry__label">{commitment.n}</p>
				<h3 class="entry__title">
					<a href="/commitments#{commitment.slug}">{commitment.title}</a>
				</h3>
			</li>
		{/each}
	</ul>
</section>

<section class="section" aria-labelledby="register">
	<h2 class="headline" id="register">{registerSummary.title}</h2>
	<p class="standfirst">{registerSummary.note}</p>

	<p class="actions">
		<a class="action action--lead" href="/register">See the register</a>
		<a class="action" href="/join#register">Add yourself</a>
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

	.entry--single .entry__title a {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
