<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import { formatDate, news, newsTitle, site } from '$lib/content/site';
</script>

<svelte:head>
	<title>News — {site.name}</title>
	<meta name="description" content="Notes from the bench at {site.name} — what is being made, and when." />
</svelte:head>

<HeaderCard title={newsTitle} />

<!-- Every note, newest first. The header card carries the h1, so the notes
     themselves sit one level down. -->
<section class="section">
	<div class="entries">
		{#each news as item (item.title)}
			<article class="entry">
				<p class="entry__label">
					<time datetime={item.date}>{formatDate(item.date)}</time>
				</p>
				<div>
					<h2 class="entry__title">{item.title}</h2>
					<div class="entry__body">
						<p>{item.body}</p>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="section">
	<div class="text">
		<p class="lede">The letter goes out four times a year, and says rather more than this page does.</p>
		<p><a href="/join">Join the workshop →</a></p>
	</div>
</section>
