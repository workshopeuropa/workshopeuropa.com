<script lang="ts">
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
<h1>{about.title}</h1>

<section class="section">
	<div class="text">
		{#each about.argument.body as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
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
	/* The body claim and its typography have been removed. */
</style>
