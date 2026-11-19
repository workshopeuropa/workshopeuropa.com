<script lang="ts">
	import { onMount } from 'svelte'
	import { join } from '$lib/content/join'
	import { site } from '$lib/content/site'

	const newsletterList = '4ebf4fba-e3fc-11f1-ab86-4b6e822dbeb8'

	onMount(() => {
		const script = document.createElement('script')
		script.src = 'https://emailoctopus.com/bundles/emailoctopuslist/js/1.6/form-embed.js'
		document.head.append(script)
		return () => script.remove()
	})
</script>

<svelte:head>
	<title>Join — {site.name}</title>
	<meta
		name="description"
		content="Subscribe to the Workshop Europa newsletter, donate to the association, or contribute to the open-source projects."
	/>
</svelte:head>

<h1>{join.title}</h1>

<section class="section way" id="newsletter" aria-labelledby="newsletter-title">
	<header>
		<h2 id="newsletter-title">Newsletter</h2>
	</header>

	<form
		action="https://emailoctopus.com/lists/{newsletterList}/members/embedded/1.3/add"
		method="post"
		class="emailoctopus-form"
		data-message-unknown-error="We couldn’t complete your signup. Please try again."
	>
		<p>
			<label for="newsletter-email">Email address</label>
			<input id="newsletter-email" name="field_0" type="email" autocomplete="email" required />
		</p>
		<p class="emailoctopus-form-row-hp" hidden>
			<input type="text" name="hp{newsletterList}" tabindex="-1" autocomplete="off" />
		</p>
		<input type="hidden" name="successRedirectUrl" value="" />
		<button class="action action--lead" type="submit">Subscribe</button>
	</form>
	<p class="emailoctopus-success-message" role="status"></p>
	<p class="emailoctopus-error-message" role="alert"></p>
</section>

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
			<p>
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

	form {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		gap: 0.5rem 0.75rem;
		max-width: var(--measure);
		font-size: 1rem;
	}

	form p:first-child {
		flex: 1 1 15rem;
		min-width: 0;
	}

	label {
		display: block;
		margin-block-end: 0.5rem;
	}

	input[type='email'] {
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--ink);
		background: var(--paper);
		line-height: 1.25;
	}

	button {
		cursor: pointer;
	}

	button:disabled {
		cursor: wait;
	}

	form + p:empty,
	form + p + p:empty {
		position: absolute;
	}
</style>
