<script lang="ts">
	import Rubric from '$lib/components/Rubric.svelte';
	import { join } from '$lib/content/join';
	import { site } from '$lib/content/site';
</script>

<svelte:head>
	<title>Join — {site.name}</title>
	<meta
		name="description"
		content="Join the conversation, donate to the association, or contribute to the open-source projects."
	/>
</svelte:head>

<Rubric level="h1">{join.title}</Rubric>

{#each join.blocks as block (block.id)}
	<section class="section way" id={block.id} aria-labelledby="{block.id}-title">
		<header>
			<h2 id="{block.id}-title">{block.title}</h2>
		</header>

		{#if block.body.length}
			<div class="text">
				{#each block.body as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		{/if}

		{#if block.ctas.length}
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
		{/if}

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
