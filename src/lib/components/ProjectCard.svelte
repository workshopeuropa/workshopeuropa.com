<script lang="ts">
	import Card from './Card.svelte';
	import type { Project } from '$lib/content/projects';

	type Props = {
		project: Project;
		heading?: 'h1' | 'h2' | 'h3';
		orientation?: 'portrait' | 'landscape';
		/** A card that is pointing somewhere rather than presenting a
		    project: the headline drops a size, since it is a signpost and not
		    a title page. */
		quiet?: boolean;
		/** Off when the card is the project it sits on — a page should not
		    link to itself. */
		link?: boolean;
		/** Off where the same project already has a card on this page: a
		    name has to be unique in the document, and two cards claiming one
		    cancel the whole transition. */
		morph?: boolean;
		/** The card carries the project's status and its calls to action, and
		    stops being one big link so it can hold them: a link inside a link
		    is not valid, and the point of a call to action is that it goes
		    somewhere the card does not. */
		cta?: boolean;
	};

	let {
		project,
		heading = 'h2',
		orientation = 'portrait',
		quiet = false,
		link = true,
		morph = true,
		cta = false
	}: Props = $props();

	/* The name the browser follows from the index to the project's own page.
	   Sanitised because it has to be a valid identifier, not a URL segment. */
	let name = $derived(morph ? `project-${project.slug.replace(/[^a-z0-9-]+/gi, '-')}` : undefined);

	/* A project with more than one name, or more than one address, carries
	   them in one string with a bullet between. The bullet is drawn in CSS
	   rather than kept in the text, so a narrow card can drop it and set the
	   parts on their own lines instead. */
	const parts = (value: string) =>
		value
			.split('•')
			.map((part) => part.trim())
			.filter(Boolean);

	let names = $derived(parts(project.title));
	let urls = $derived(project.url ? parts(project.url) : []);
	/** The whole card is the link only where it is not carrying its own. */
	let href = $derived(cta || !link ? undefined : `/projects/${project.slug}`);
</script>

{#snippet series(items: string[])}
	{#each items as item (item)}<span class="part">{item}</span>{/each}
{/snippet}

<Card {orientation} morph={name} {href}>
	{#snippet top()}
		<!-- The name carries the heading: the headline below is the bigger
		     type, but the project is what this card is. On a card holding its
		     own calls to action the name is the way in to the project's page,
		     since the card itself is no longer a link. -->
		<svelte:element this={heading} class="eyebrow series">
			{#if cta && link}
				<a class="name" href="/projects/{project.slug}">{@render series(names)}</a>
			{:else}
				{@render series(names)}
			{/if}
		</svelte:element>
		{#if cta}
			<p class="meta">{project.status}</p>
		{/if}
	{/snippet}
	{#snippet middle()}
		<p class={quiet ? 'title--small' : 'title'}>{project.headline}</p>
	{/snippet}
	{#snippet bottom()}
		{#if cta}
			<p class="actions">
				{#each project.ctas as action, i (action.href)}
					<a
						class="action {i === 0 ? 'action--lead' : ''}"
						href={action.href}
						rel={action.external ? 'noreferrer' : undefined}
					>
						{action.label}
					</a>
				{/each}
			</p>
			{#if project.note}
				<p class="meta">{project.note}</p>
			{/if}
		{:else if urls.length}
			<p class="meta series">{@render series(urls)}</p>
		{/if}
	{/snippet}
</Card>

<style>
	/* A mini bullet between the parts, well under the size of the type it
	   separates, and drawn rather than typed so a narrow card can leave it
	   out. */
	.series :global(.part + .part::before) {
		content: '•';
		font-size: 0.55em;
		vertical-align: 0.18em;
		margin-inline: 0.5em;
	}

	/* The name is a link on a card that is not one. It lightens rather than
	   ruling under itself, the way the wordmark in the masthead does. */
	.name {
		transition: color 140ms ease;
	}

	.name:hover {
		color: color-mix(in srgb, currentColor 65%, transparent);
	}

	/* Half-width cards on a phone have no room for a run of names on one
	   line: the parts take a line each and the bullets come off, rather than
	   the line breaking wherever it lands. Measured against the card's own
	   content box, which is around 8rem for the pair on a phone and 15rem
	   for the same pair on a desktop, so only the phone gets it. */
	@container (max-width: 12rem) {
		.series :global(.part) {
			display: block;
		}

		.series :global(.part + .part::before) {
			content: none;
		}
	}
</style>
