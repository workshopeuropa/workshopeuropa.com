<script lang="ts">
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import { join } from '$lib/content/join';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>Join — {site.name}</title>
	<meta
		name="description"
		content="The room is open to read before you commit to anything. Holding to the commitments is a public declaration. They are not the same thing."
	/>
</svelte:head>

<HeaderCard title={join.title} />

<!-- Three blocks, and the difference between the first two is the page.
     Reading the room costs nothing; the commitments are a declaration with
     your name on it. -->
{#each join.blocks as block (block.id)}
	<section class="section way" id={block.id} aria-labelledby="{block.id}-title">
		<h2 class="headline" id="{block.id}-title">{block.title}</h2>

		<div class="text">
			{#each block.body as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>

		<p class="actions">
			{#each block.ctas as action, i (action.href)}
				<a
					class="action {i === 0 ? 'action--lead' : ''}"
					href={action.href}
					rel={action.external ? 'noreferrer' : undefined}
				>
					{action.label}
				</a>
			{/each}
		</p>

		{#if block.note}
			<p class="standfirst">
				{block.note.before}<a href="mailto:{block.note.email}">{block.note.email}</a
				>{block.note.after}
			</p>
		{/if}
	</section>
{/each}

<style>
	/* A block can be linked to on its own, so it has to land clear of the
	   top of the window. */
	.way {
		scroll-margin-top: var(--gutter);
	}
</style>
