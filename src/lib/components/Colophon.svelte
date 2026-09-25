<script lang="ts">
	import Card from './Card.svelte';
	import { about, aboutCardTitle } from '$lib/content/about';
	import { blocks, news, newsTitle } from '$lib/content/news';
	import { featured, projectFor, projectsCardTitle } from '$lib/content/projects';
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
		media?: { src: string; alt: string };
		/** Instead of a picture: the wordmark set large enough to be cropped
		    by the card it is in, which is what the design does on the card
		    about the studio. */
		wordmark?: boolean;
		/** The foot of the card: what it is, and a line about it. */
		caption: { name: string; line: string };
	};

	/** The studio's own picture, for the cards whose subject is the studio. */
	const house = site.image;

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
				media: house,
				caption: { name: site.name, line: site.blurb }
			};
		}

		/* A note about a project borrows that project's picture and colour;
		   one about the studio keeps the house's. */
		const subject = projectFor(latest.subject);
		const opening = blocks(latest).find((block) => block.type === 'p');

		return {
			href: '/news',
			label: 'News',
			title: newsTitle,
			tint: tintFor(latest.subject ?? HOUSE),
			media: subject?.image ?? house,
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
			media: project.image ?? house,
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
			wordmark: true,
			caption: { name: site.name, line: site.blurb }
		},
		projectsCard()
	];

	/* The same three on every page, which is what the design has: News, the
	   studio, and the work. Join is a thing you do rather than somewhere you
	   read, and it is in the top bar where a site puts its account controls —
	   it used to have a card here and there was never a picture for it.

	   The row used to drop whichever card matched the page you were on. With
	   four that left three; with three it would leave two, and a row of two
	   full-width cards is a different design rather than this one short an
	   item. The card for the page you are on is a link back to the top of it,
	   which is harmless.

	   What is worth avoiding is the same picture twice. The News card borrows
	   the picture of whatever its newest note is about, so on a week when
	   that is the studio — or the very project the Projects card is showing —
	   two of the three come out identical, which reads as a bug whatever rule
	   produced it. A card that loses its first choice falls back to the
	   studio's, and only gives up if that is taken as well. */
	let shown = $derived.by(() => {
		const seen = new Set<string>();
		return cards.map((card) => {
			if (!card.media) return card;
			for (const option of [card.media, house]) {
				if (seen.has(option.src)) continue;
				seen.add(option.src);
				return { ...card, media: option };
			}
			return { ...card, media: undefined };
		});
	});

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
					{#if card.wordmark}
						<!-- Set to be cropped: the band it sits in clips it, so what
						     you get is the middle of two very large words. -->
						<p class="colophon__giant" aria-hidden="true">
							{#each words as word (word)}
								<span>{word}</span>
							{/each}
						</p>
					{:else if card.media}
						<img class="colophon__media" src={card.media.src} alt={card.media.alt} />
					{/if}
				{/snippet}

				{#snippet bottom()}
					<p class="meta">
						<span class="colophon__name">{card.caption.name}</span>
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

	<!-- The small print, unchanged: the three ways out of the site — the
	     room, the source, and the feed — and where this is made. A feed is
	     the sort of thing this audience looks for, and putting it where it
	     can be seen rather than only in the document head is itself on
	     thesis. -->
	<div class="colophon__print">
		<p class="colophon__elsewhere">
			<a href={links.matrix} rel="noreferrer">Matrix</a>
			<a href={links.source} rel="noreferrer">Source</a>
			<a href={links.rss}>RSS</a>
		</p>
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

	/* Laid into the band rather than flowed through it, so the picture is
	   cropped by the card instead of pushing the card's own type out of the
	   way. Cover, not contain: these are illustrations with their own ground,
	   and letterboxing one inside a card puts two backgrounds on screen. */
	.colophon__media {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* The wordmark as the picture, at a size no card can hold — 44% of the
	   card's width per line, which puts the first three or four letters of
	   each word on screen and cuts the rest off at the edge. In cqi so it is
	   the same crop at every card width. */
	.colophon__giant {
		/* Pinned to the middle of the band and pulled back by half its own
		   size, so it runs off both edges rather than only the right one —
		   the crop is the device, and a word cut at one end reads as a word
		   that did not fit. A grid's centre alignment will not do it: an item
		   wider than its track gets clamped back to the start rather than
		   allowed to overflow symmetrically. */
		position: absolute;
		inset-block-start: 50%;
		inset-inline-start: 50%;
		transform: translate(-50%, -50%);
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

	/* The small print sits in the centre column with everything else that is
	   read, rather than under the cards it has nothing to do with. */
	.colophon__print {
		display: grid;
		gap: 0.5rem;
		width: min(100%, var(--column));
		margin-inline: auto;
		font-size: 0.875rem;
		color: var(--ink-soft);
	}

	/* Three words, spaced rather than ruled apart. */
	.colophon__elsewhere {
		display: flex;
		flex-wrap: wrap;
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

		.colophon__media,
		.colophon__giant {
			display: none;
		}
	}

</style>
