<script lang="ts">
	import { about } from '$lib/content/about'
	import { site } from '$lib/content/site'
</script>

<svelte:head>
	<title>About — {site.name}</title>
	<meta name="description" content={about.body[0]} />
</svelte:head>

<h1>{about.title}</h1>

<section class="section">
	<div class="text">
		{#each about.body as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
		<p>{about.founding.before}<strong>{about.founding.founders}</strong>.</p>
	</div>
</section>
