<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Plate from '$lib/components/Plate.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { formatDate, manifesto, news, site } from '$lib/content/site';
	import { projects } from '$lib/content/projects';

	const featured = projects.slice(0, 2);
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Plate src={site.image.src} alt={site.image.alt}>
	<HeaderCard title={site.tagline} />
</Plate>

<section class="section" aria-labelledby="manifesto">
	<Rubric id="manifesto" note="What the workshop is for">Manifesto</Rubric>

	<div class="entries">
		{#each manifesto as entry, i (entry.title)}
			<article class="entry">
				<p class="entry__label">
					{String(i + 1).padStart(2, '0')} / {String(manifesto.length).padStart(2, '0')}
				</p>
				<div>
					<h3 class="entry__title">{entry.title}</h3>
					<div class="entry__body">
						{#each entry.body as paragraph (paragraph)}
							<p>{paragraph}</p>
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="section" aria-labelledby="news">
	<Rubric id="news" note="Newest first">News</Rubric>

	<div class="entries">
		{#each news as item (item.title)}
			<article class="entry">
				<p class="entry__label">
					<time datetime={item.date}>{formatDate(item.date)}</time>
				</p>
				<div>
					<h3 class="entry__title">{item.title}</h3>
					<div class="entry__body">
						<p>{item.body}</p>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<p class="more">
		<a href="/news">All notes</a>
	</p>
</section>

<section class="section" aria-labelledby="bench">
	<Rubric id="bench" note="A handful at a time">On the bench</Rubric>

	<Deck columns={2}>
		{#each featured as project (project.slug)}
			<ProjectCard {project} heading="h3" />
		{/each}
	</Deck>

	<p class="more">
		<a href="/projects">All {projects.length} projects</a>
	</p>
</section>

<section class="section" aria-labelledby="join">
	<Rubric id="join" note="Two places from September">Join</Rubric>

	<div class="text">
		<p class="lede">
			Joining means the letter four times a year, and a place in the pile we read from when the
			bench has room.
		</p>
		<p><a href="/join">Tell us what you make →</a></p>
	</div>
</section>
