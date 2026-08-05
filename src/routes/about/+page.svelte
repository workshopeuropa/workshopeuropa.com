<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import PersonCard from '$lib/components/PersonCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { about } from '$lib/content/about';
	import { people } from '$lib/content/people';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>About — {site.name}</title>
	<meta name="description" content={about.body[0]} />
</svelte:head>

<HeaderCard title={about.title} />

<section class="section">
	<div class="text">
		{#each about.body as paragraph, i (paragraph)}
			<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
		{/each}
	</div>
</section>

<section class="section" aria-labelledby="particulars">
	<Rubric id="particulars" note="The short answers">Particulars</Rubric>

	<div class="entries">
		{#each about.facts as fact (fact.label)}
			<article class="entry">
				<p class="entry__label">{fact.label}</p>
				<div>
					<h3 class="entry__title">{fact.title}</h3>
					<div class="entry__body">
						<p>{fact.note}</p>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="section" aria-labelledby="bench">
	<Rubric id="bench" note="Who is at the bench">People</Rubric>

	<Deck columns={2}>
		{#each people as person (person.name)}
			<PersonCard {person} />
		{/each}
	</Deck>
</section>

<section class="section">
	<div class="text">
		<p class="lede">
			Commissions, questions and letters: <a href="mailto:{site.email}">{site.email}</a>.
		</p>
		<p><a href="/join">Or join the workshop →</a></p>
	</div>
</section>
