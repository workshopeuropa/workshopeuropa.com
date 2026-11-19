<script lang="ts">
	import { blocks, formatDate, notePath, noteTitle, type Note } from '$lib/content/news'
	import { localizeHref } from '$lib/paraglide/runtime'

	let { note, standalone = false }: { note: Note; standalone?: boolean } = $props()

	const title = $derived(noteTitle(note))
	const href = $derived(localizeHref(notePath(note)))
	const body = $derived(blocks(note, { localize: true }))
	const visibleBlocks = $derived(standalone ? body : body.slice(0, 1))
</script>

<article class="h-entry" class:entry={!standalone} class:section={standalone} id={standalone ? undefined : note.slug}>
	<header>
		<p>
			<time class="dt-published" datetime={note.date}>{formatDate(note.date)}</time>
			{#if note.subject}<span class="subject"> · {note.subject}</span>{/if}
		</p>
		{#if standalone}
			<h1 class="page-title p-name"><data class="u-url" value={href}>{title}</data></h1>
		{:else}
			<h2 class="p-name"><a class="u-url" rel="bookmark" {href}>{title}</a></h2>
		{/if}
	</header>
	<div class="text" class:e-content={standalone} class:p-summary={!standalone}>
		{#each visibleBlocks as block, index (index)}
			{#if block.type === 'list'}
				<ul>
					{#each block.items as point}
						<li>{point}</li>
					{/each}
				</ul>
			{:else}
				<p>{block.text}</p>
			{/if}
		{/each}
		{#if standalone && note.link}
			<p><a href={note.link.href}>{note.link.label}</a></p>
		{/if}
	</div>
</article>

<style>
	h2 a:hover {
		opacity: 0.6;
	}

	.subject {
		white-space: nowrap;
	}

	ul {
		display: grid;
		gap: 0.4em;
		line-height: 1.5;
	}

	li {
		position: relative;
		padding-inline-start: 1.1em;
	}

	li::before {
		content: '•';
		position: absolute;
		inset-inline-start: 0;
		color: var(--ink-soft);
	}
</style>
