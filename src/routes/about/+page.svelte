<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import { about, aboutTitleLines } from '$lib/content/about';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>About — {site.name}</title>
	<meta name="description" content={about.argument.body[0]} />
</svelte:head>

<HeaderCard title={about.title} lines={aboutTitleLines} />

<section class="section">
	<div class="text">
		{#each about.argument.body as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
		<p class="claim">{about.argument.claim}</p>
	</div>
</section>

<!-- A typographic device, not a language switcher: six words for the same
     room, and none of them links anywhere. -->
<section class="section">
	<p class="languages">
		{#each about.languages.words as word (word)}<span class="languages__word">{word}</span>{/each}
	</p>
	<p class="standfirst">{about.languages.line}</p>
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
		font-size: clamp(1.15rem, 1rem + 0.8vw, 1.5rem);
		letter-spacing: 0;
		line-height: 1.3;
	}

	.languages {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.15em 0.5em;
		width: min(100%, var(--band));
		margin-inline: auto;
		font-size: clamp(1.5rem, 1rem + 2.4vw, 2.75rem);
		font-weight: 500;
		line-height: 1.15;
		letter-spacing: -0.01em;
		text-align: center;
	}

	/* Drawn rather than typed, and hung off the word before it rather than
	   the word after: the row wraps, and a separator carried into the next
	   line opens it with a mark rather than a word. Trailing at the end of a
	   line it reads as punctuation, which is what it is. */
	.languages__word:not(:last-child)::after {
		content: '·';
		margin-inline-start: 0.5em;
		color: var(--ink-soft);
	}
</style>
