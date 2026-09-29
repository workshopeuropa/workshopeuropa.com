<script lang="ts">
	import Rubric from '$lib/components/Rubric.svelte';
	import { about } from '$lib/content/about';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>About — {site.name}</title>
	<meta name="description" content={about.argument.body[0]} />
</svelte:head>

<!-- One string, unbroken. The headline used to be set in the serif at size
     and wanted breaking at the word the content named; as a tracked label it
     is short enough to find its own turn. -->
<Rubric level="h1">{about.title}</Rubric>

<section class="section">
	<div class="text">
		{#each about.argument.body as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
		<p class="claim">{about.argument.claim}</p>
	</div>
</section>

<section class="section">
	<div class="text">
		{#each about.europa.body as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
</section>

<section class="section">
	<div class="text">
		{#each about.run.body as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
</section>

<!-- One paragraph and one link out. The biography lives on the other side of
     that link; this site is the umbrella, not the CV. -->
<section class="section">
	<div class="text">
		<p>
			{about.who.before}<a href={about.who.link.href} rel="noreferrer">{about.who.link.label}</a
			>{about.who.after}
		</p>
	</div>
</section>

<style>
	/* The claim the argument lands on, set apart from the paragraphs that
	   arrive at it. */
	.claim {
		font-weight: 500;
		font-size: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
		letter-spacing: 0;
		line-height: 1.25;
	}

</style>
