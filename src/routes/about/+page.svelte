<script lang="ts">
	import { about } from '$lib/content/about'
	import { site } from '$lib/content/site'
	import LinkedMessage from '$lib/components/LinkedMessage.svelte'
	import { m } from '$lib/paraglide/messages'
	import { getLocale } from '$lib/paraglide/runtime'

	const founderLinks = Object.fromEntries(about.founding.founders.map((founder, index) => [
		`{${index}}`, { href: founder.href, label: founder.name }
	]))
	const locale = getLocale()
	const founders = new Intl.ListFormat(locale === 'en' ? 'en-GB' : locale).format(Object.keys(founderLinks))
</script>

<svelte:head>
	<title>{m.nav_about()} — {site.name}</title>
	<meta name="description" content={about.body[0]} />
</svelte:head>

<h1>{about.title}</h1>

<section class="section">
	<div class="text">
		{#each about.body as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
		<p>
			<LinkedMessage text={m.about_founding({ founders })} links={founderLinks} />
		</p>
	</div>
</section>
