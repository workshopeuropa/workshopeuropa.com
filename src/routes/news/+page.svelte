<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import {
		blocks,
		formatDate,
		news,
		newsEmpty,
		newsIntro,
		newsTitle,
		noteSlug
	} from '$lib/content/news';
	import { links, site } from '$lib/content/site';
</script>

<svelte:head>
	<title>News — {site.name}</title>
	<meta name="description" content={newsIntro} />
</svelte:head>

<HeaderCard title={newsTitle} />

<section class="section">
	<div class="text">
		<p class="lede">{newsIntro}</p>
	</div>
</section>

<!-- Newest first, no categories. The header card carries the h1, so the
     notes themselves sit one level down. -->
<section class="section">
	{#if news.length === 0}
		<p class="empty">{newsEmpty}</p>
	{:else}
		<div class="entries">
			{#each news as item (item.date + item.title)}
				<article class="entry" id={noteSlug(item)}>
					<header>
						<p>
							<time datetime={item.date}>{formatDate(item.date)}</time>
							<!-- `9 August 2026 · Risved`. The separator is a real
							     character rather than a drawn one, so the meta line
							     survives being copied: unlike the run of names on a
							     project card, there is no width at which it wants to
							     come off. -->
							{#if item.subject}<span class="subject"> · {item.subject}</span>{/if}
						</p>
						<h2>{item.title}</h2>
					</header>
					<div class="text">
						<!-- Keyed by position: two paragraphs in one note can say the
						     same thing twice, and a list is not unique either. The
						     order is the content, and it does not reshuffle. -->
						{#each blocks(item) as block, i (i)}
							{#if block.type === 'list'}
								<ul class="points">
									{#each block.items as point (point)}
										<li>{point}</li>
									{/each}
								</ul>
							{:else}
								<p>{block.text}</p>
							{/if}
						{/each}
						{#if item.link}
							<p><a href={item.link.href}>{item.link.label}</a></p>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<section class="section">
	<div class="text">
		<p class="standfirst">
			Every note goes out on the feed as well:
			<a href={links.rss}>RSS</a> or <a href={links.atom}>Atom</a>.
		</p>
	</div>
</section>

<style>
	/* The date and what it is about are one line, so they break together
	   rather than leaving the subject stranded under it. */
	.subject {
		white-space: nowrap;
	}

	/* The reset takes the markers off every list on the site, so a list in a
	   note draws its own. Hung in the margin rather than indented into it:
	   the text of a point starts on the same line the paragraphs above and
	   below it start on, and a point that wraps lines up under itself. */
	.points {
		display: grid;
		gap: 0.4em;
		line-height: 1.5;
	}

	.points li {
		position: relative;
		padding-inline-start: 1.1em;
	}

	.points li::before {
		content: '•';
		position: absolute;
		inset-inline-start: 0;
		color: var(--ink-soft);
	}

	.empty {
		width: min(100%, var(--column));
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 3.5rem);
		text-align: center;
		color: var(--ink-soft);
	}
</style>
