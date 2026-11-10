<script lang="ts">
	import { page } from '$app/state';
	import Card from './Card.svelte';
	import { aboutCardTitle } from '$lib/content/about';
	import { join } from '$lib/content/join';
	import { blocks, news, newsTitle } from '$lib/content/news';
	import { featured, projectsCardTitle } from '$lib/content/projects';
	import { links, site } from '$lib/content/site';
	import { HOUSE, tintFor, type Tint } from '$lib/tints';

	type SectionCard = {
		href: string;
		/** The label over the title. */
		label: string;
		/** The title, in the serif. A door rather than a claim — the page's
		    own headline makes the argument on the other side of it. */
		title: string;
		/** The colour, which belongs to whatever the card is about rather
		    than to the page the card is sitting on. */
		tint: Tint;
		/** The About wordmark, set large enough to be cropped by the card. */
		giant?: string;
		/** The foot of the card: what it is, and a line about it. */
		caption: { name?: string; line: string }
	};

	/* ---- The four sections, each built from the thing it is about ---------
	   News takes the newest note and wears the colour of whatever that note
	   announces, which is why the row is not three of one hue: a week where
	   the news is about Inlägg is a week where the News card is aqua. The
	   same rule puts the featured project's colour on the Projects card, and
	   the house lime on the two that are about the studio itself.
	   ---------------------------------------------------------------------- */

	function newsCard(): SectionCard {
		const latest = news[0];
		if (!latest) {
			return {
				href: '/news',
				label: 'News',
				title: newsTitle,
				tint: tintFor(HOUSE),
				caption: { name: site.name, line: site.blurb }
			};
		}

		const opening = blocks(latest).find((block) => block.type === 'p');

		return {
			href: '/news',
			label: 'News',
			title: newsTitle,
			tint: tintFor(latest.subject ?? HOUSE),
			caption: { name: latest.title, line: opening?.type === 'p' ? opening.text : '' }
		};
	}

	function projectsCard(): SectionCard {
		const project = featured();
		return {
			href: '/projects',
			label: 'Projects',
			title: projectsCardTitle,
			tint: tintFor(project.slug),
			caption: { name: project.title, line: project.summary }
		};
	}

	const cards: SectionCard[] = [
		newsCard(),
		{
			href: '/about',
			label: 'About',
			title: aboutCardTitle,
			tint: tintFor(HOUSE),
			giant: site.name,
			caption: { line: site.blurb }
		},
		projectsCard(),
		{
			href: '/join',
			label: 'Join',
			title: join.title,
			tint: tintFor(HOUSE),
			caption: { line: join.blocks[0].body[0] }
		}
	];

	function isCurrent(href: string) {
		const path = page.url.pathname;
		return path === href || path.startsWith(href + '/');
	}

	let shown = $derived(cards.filter((card) => !isCurrent(card.href)).slice(0, 3))

	/** The wordmark stacks a word per row, the way it does in the top bar. */
	const words = site.name.split(/\s+/).filter(Boolean);
	const year = new Date().getFullYear();
</script>

<footer class="colophon">
	<!-- Full width, three across, and one column once a third of the page is
	     too narrow to set a card in. -->
	<div class="colophon__row">
		{#each shown as card (card.href)}
			<Card href={card.href} tint={card.tint}>
				{#snippet top()}
					<p class="eyebrow">{card.label}</p>
					<p class="title">{card.title}</p>
				{/snippet}

				{#snippet middle()}
					{#if card.giant}
						<!-- Set to be cropped: the card clips it, so what you get is
						     the left of two very large words and the rest running
						     off the edge. Hidden from the reading order — the same
						     words are already the card's title or its caption. -->
						<p class="colophon__giant" aria-hidden="true">
							{#each card.giant.split(/\s+/) as word (word)}
								<span>{word}</span>
							{/each}
						</p>
					{/if}
				{/snippet}

				{#snippet bottom()}
					<p class="meta">
						{#if card.caption.name}
							<span class="colophon__name">{card.caption.name}</span>
						{/if}
						{card.caption.line}
					</p>
				{/snippet}
			</Card>
		{/each}
	</div>

	<!-- The wordmark is the way back to the front page, which is where the
	     commitments are. The top bar carries the same gesture; this is it at
	     the other end, so somebody who has read to the bottom does not have
	     to scroll up to find it. -->
	<p class="colophon__mark">
		<a class="colophon__wordmark" href="/">
			{#each words as word (word)}
				<span class="colophon__word">{word}</span>
			{/each}
		</a>
	</p>

	<!-- Source, feed, and association details. -->
	<div class="colophon__print">
		<p class="colophon__elsewhere">
			<a href="https://github.com/workshopeuropa" rel="noreferrer">Source</a>
			<a href={links.rss}>RSS</a>
		</p>
		<p>CVR 46878248</p>
		<p>{site.place} · © {year}</p>
	</div>
</footer>

<style>
	.colophon {
		display: grid;
		gap: clamp(2rem, 6vw, 4rem);
		/* Full width, unlike everything above it: the row of cards is the one
		   thing on the page that is not in the centre column, and the gutter
		   is all that holds it off the edge of the screen. */
		width: calc(100% - var(--gutter) * 2);
		margin-inline: auto;
		padding-block: clamp(2rem, 6vw, 4rem);
		padding-bottom: calc(clamp(2rem, 6vw, 4rem) + var(--safe-bottom, 0px));
	}

	.colophon__row {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--gutter);
	}

	/* The outsized type, as the picture.

	   Not centred in the card, which is what it was and what made it look
	   like a caption that had got out: the design sets the block in from the
	   left and lets it run off the right, so the card holds the opening of
	   each word and the rest is gone. 26cqi is where the design puts it —
	   144px in from the card's padding on a 555px card — and in cqi it is
	   the same fraction of the card at every width.

	   The two lines are centred on each other, not on the card, so the
	   shorter one sits in from the longer at both ends. That is the only
	   thing here that is centred.

	   It reaches past the card's padding because the card is what clips it;
	   the band it sits in no longer does its own clipping. A margin of card
	   colour down the right-hand side would have said the type stopped
	   rather than that it was cut. */
	.colophon__giant {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 26cqi;
		display: grid;
		align-content: center;
		width: max-content;
		font-family: var(--font-display);
		font-size: 44cqi;
		font-style: italic;
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0;
		text-align: center;
		white-space: nowrap;
	}

	.colophon__giant span {
		display: block;
	}

	/* The subject, then what it is: one paragraph, with the name set apart by
	   weight rather than by a line of its own — it is the beginning of the
	   sentence, not a heading over it. */
	.colophon__name {
		display: block;
		font-weight: 500;
	}

	/* The wordmark at the foot, twice the size it is in the top bar. The
	   design gives it the whole width of the page to sit in the middle of,
	   and nothing else on that line. */
	.colophon__mark {
		font-family: var(--font-display);
		font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
		font-style: italic;
		font-weight: 400;
		line-height: 1;
		text-align: center;
	}

	.colophon__word {
		display: block;
	}

	.colophon__wordmark {
		display: inline-block;
		transition: opacity 140ms ease;
	}

	.colophon__wordmark:hover {
		opacity: 0.6;
	}

	/* The small print reads up to the wordmark above it rather than across
	   to the column it is nowhere near, so it is centred under it. The one
	   place on the site the type is not set from the left — and it is set
	   that way because of what it sits beneath, not in spite of it. */
	.colophon__print {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
		width: min(100%, var(--column));
		margin-inline: auto;
		font-size: 0.875rem;
		text-align: center;
		color: var(--ink-soft);
	}

	/* Three words, spaced rather than ruled apart. */
	.colophon__elsewhere {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25em 1.25em;
	}

	.colophon__elsewhere a {
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}

	/* ---- How it folds --------------------------------------------------
	   Last in the file, so each of these overrides the rule it refines
	   rather than being overridden by it — same selector, same specificity,
	   and at that point the only thing left to decide it is order. The
	   wordmark spent a pass at the portrait size on a landscape card for
	   exactly this reason.
	   ---------------------------------------------------------------------- */

	/* A third of the page stops being a card and starts being a column of
	   broken words somewhere around here: three portrait cards across need
	   about 22rem each to hold a 2rem title, and below that they stack.
	   One step, not two — a two-up row leaves an odd card on its own, which
	   is worse than three in a stack. */
	@media (max-width: 66rem) {
		.colophon__row {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--gap);
		}

		/* Stacked, a card no longer has to hold its own against two beside
		   it, and a full-width portrait card would be most of a screen. It
		   lies down instead. */
		.colophon__row :global(.card) {
			aspect-ratio: var(--ratio) / 1;
			max-width: var(--band);
			margin-inline: auto;
		}

		/* The wordmark is set against the card's width, and a card that has
		   just turned over is √2 times wider and √2 shorter. At the portrait
		   size it came out taller than the band holding it and all you saw
		   was a strip of stems across the middle — the crop has to take the
		   ends off the words, not the tops and bottoms.

		   Lying down, the head and the foot of the card eat most of what the
		   shorter card has left, so this is measured against what the band
		   actually gets rather than against the card: two lines at 0.95 fit
		   inside it here, and the words still run off both edges. */
		.colophon__giant {
			font-size: 13cqi;
		}
	}

	/* On a phone even a landscape card is tall, and whatever is in the middle
	   is the part that can go: the label, the title and the line at the foot
	   are what the card is for. The card stops keeping a ratio here too, so
	   the middle band has no height to lay a picture into either way. */
	@media (max-width: 30rem) {
		.colophon__row :global(.card) {
			aspect-ratio: auto;
		}

		.colophon__giant {
			display: none;
		}
	}

</style>
