<script lang="ts">
	import { commitments } from '$lib/content/commitments';
	import { declared, type Project } from '$lib/content/projects';

	type Props = {
		project: Project;
		/** The whole picture: all five, the declared ones with the project's
		    own words under them and the rest marked, in words, as not claimed.
		    Off, it is a highlight — the ones it holds to, and nothing else. */
		detail?: boolean;
	};

	let { project, detail = false }: Props = $props();

	/* Never sorted by how many, never a count, never a score. Four of five is
	   a real position, not a failure. */
	let held = $derived(commitments.filter((commitment) => declared(project, commitment.n)));
</script>

{#if detail}
	<ul class="declares">
		{#each commitments as commitment (commitment.slug)}
			{@const declaration = declared(project, commitment.n)}
			<li class="declares__item" class:is-met={Boolean(declaration)}>
				<p class="declares__head">
					<span class="declares__mark">{declaration ? 'Met' : 'Not claimed'}</span>
					<a class="declares__title" href="/#{commitment.slug}">
						{commitment.n}
						{commitment.short}
					</a>
				</p>
				{#if declaration}
					<p class="declares__how">{declaration.how}</p>
				{/if}
			</li>
		{/each}
	</ul>
{:else if held.length}
	<ul class="held">
		{#each held as commitment (commitment.slug)}
			<li>
				<a class="held__one" href="/#{commitment.slug}">
					{commitment.n}
					{commitment.short}
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	/* The highlight: what a project holds to, at a glance, on the paper
	   under its plate. Each one is a way through to the commitment itself,
	   so the claim and the test it comes with are one press apart. */
	.held {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		width: min(100%, var(--band));
		margin-inline: auto;
	}

	.held__one {
		display: block;
		padding: 0.3rem 0.85rem;
		border: 1px solid var(--ink-soft);
		border-radius: 999px;
		font-size: 0.9rem;
		line-height: 1.25;
		transition:
			background 140ms ease,
			border-color 140ms ease,
			color 140ms ease;
	}

	.held__one:hover {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--paper);
	}

	/* The whole picture, on the project's own page. */
	.declares {
		display: grid;
		gap: 1rem;
		width: min(100%, var(--column));
		margin-inline: auto;
	}

	.declares__item {
		display: grid;
		gap: 0.25rem;
	}

	.declares__head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5em;
	}

	/* A word, not a colour: the indicator has to survive being read aloud
	   and being looked at by somebody who does not see the difference
	   between two greens. */
	.declares__mark {
		flex: none;
		min-width: 6.5em;
		padding: 0.1em 0.6em;
		border: 1px solid var(--ink-soft);
		border-radius: 999px;
		font-family: var(--font-caps);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		text-align: center;
		text-transform: lowercase;
		color: var(--ink-soft);
	}

	.is-met .declares__mark {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--paper);
	}

	.declares__title {
		font-weight: 500;
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}

	.declares__item:not(.is-met) .declares__title {
		color: var(--ink-soft);
	}

	.declares__how {
		/* Under the label rather than beside it, and indented to exactly the
		   width of the marker plus the gap beside it, so the declarations line
		   up down the page. In rem, because the marker's 6.5em is 6.5 of its
		   own 0.8rem and this paragraph is set at 0.95. */
		padding-inline-start: calc(6.5 * 0.8rem + 0.5rem);
		font-size: 0.95rem;
		line-height: 1.55;
	}

	@media (max-width: 32rem) {
		.declares__how {
			padding-inline-start: 0;
		}
	}
</style>
