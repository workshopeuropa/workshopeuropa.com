<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import {
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
						<p>{item.body}</p>
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

	.empty {
		width: min(100%, var(--column));
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 3.5rem);
		text-align: center;
		color: var(--ink-soft);
	}
</style>
