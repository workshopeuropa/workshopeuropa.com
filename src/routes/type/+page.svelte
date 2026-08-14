<script lang="ts">
	/* ---------------------------------------------------------------------
	   A TEMPORARY SPECIMEN PAGE. Not linked from anywhere, noindexed, and
	   meant to be deleted once the decisions it is for have been taken.

	   Every size on it is the real one: the roles defined in src/app.css are
	   used directly, and Rubric and Declarations are the actual components.
	   The styles that used to live in route components — .turn, article
	   headers, dl tests, .claim, .languages — now live in app.css. This
	   page uses them directly.
	   --------------------------------------------------------------------- */
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import Declarations from '$lib/components/Declarations.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { getProject } from '$lib/content/projects';

	const vionio = getProject('vionio')!;

	let width = $state(0);

	/* Every specimen carries its own measurement, taken from the element
	   rather than read off the source, and retaken on resize — the whole
	   point of the page is what these are at the width you are looking at. */
	onMount(() => {
		const update = () => {
			width = window.innerWidth;
			for (const spec of document.querySelectorAll<HTMLElement>('.spec')) {
				/* A row either marks its own specimen or names one inside a
				   component it cannot reach into. */
				const probe = spec.dataset.probe;
				const el = spec.querySelector<HTMLElement>(probe || '[data-measure]');
				const out = spec.querySelector<HTMLElement>('[data-px]');
				if (!el || !out) continue;
				const style = getComputedStyle(el);
				const px = parseFloat(style.fontSize);
				const lh = parseFloat(style.lineHeight);
				const track = parseFloat(style.letterSpacing);
				out.textContent = [
					`${px.toFixed(2)}px`,
					`${style.fontWeight}`,
					`lh ${(lh / px).toFixed(2)}`,
					Number.isNaN(track) || track === 0 ? 'no tracking' : `${(track / px).toFixed(3)}em`
				].join('  ·  ');
			}
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(document.documentElement);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Type specimen — temporary</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- One row: what it is, where it is declared, what it is declared as, and
     what that comes to right now. `probe` names the element to measure where
     it sits inside a component this page cannot put an attribute on. -->
{#snippet spec(name: string, where: string, css: string, probe: string, body: Snippet)}
	<div class="spec" data-probe={probe || undefined}>
		<p class="spec__meta">
			<span class="spec__what">
				<span class="spec__name">{name}</span>
				<span class="spec__where">{where}</span>
				<span class="spec__css">{css}</span>
			</span>
			<span class="spec__px" data-px></span>
		</p>
		<div class="spec__body">{@render body()}</div>
	</div>
{/snippet}

<header class="head">
	<h1 class="head__title">Type on the paper</h1>
	<p class="head__note">
		Every role that sets type outside a card, largest to smallest, at the width you are reading
		this. Resize and the numbers follow. Temporary page — delete it when the decisions are made.
	</p>
	<p class="head__width">viewport {width}px</p>
</header>

<!-- ===================================================================
     1. The scale, in size order. Roles that land on the same size are
     grouped, because that is the thing worth seeing.
     =================================================================== -->

<Rubric id="scale">The scale</Rubric>

{#snippet pullBody()}
	<p class="pull" data-measure>The exit is the feature.</p>
{/snippet}
{@render spec(
	'.pull',
	'app.css:319',
	'clamp(1.75rem, 1.25rem + 2.5vw, 3rem)',
	'',
	pullBody
)}

{#snippet languagesBody()}
	<p class="languages" data-measure>
		<span class="languages__word">Bottega</span><span class="languages__word">Atelier</span><span
			class="languages__word">Verkstad</span
		><span class="languages__word">Werkstatt</span><span class="languages__word">Warsztat</span
		><span class="languages__word">Workshop</span>
	</p>
{/snippet}
{@render spec(
	'.languages',
	'about/+page.svelte:76 — copied',
	'clamp(1.5rem, 1rem + 2.5vw, 2.75rem)',
	'',
	languagesBody
)}

{#snippet headlineBody()}
	<section class="section">
		<header>
			<h2 data-measure>Who does it answer to?</h2>
		</header>
	</section>
{/snippet}
{@render spec(
	'section > header h2',
	'app.css',
	'clamp(1.75rem, 1.25rem + 1.25vw, 2rem)',
	'header h2',
	headlineBody
)}

{#snippet commitmentTitleBody()}
	<article class="section">
		<header>
			<h3 data-measure>You can leave, and take it with you.</h3>
		</header>
	</article>
{/snippet}
{@render spec(
	'article header h3',
	'app.css',
	'clamp(1.5rem, 1.125rem + 1.25vw, 2rem)',
	'header h3',
	commitmentTitleBody
)}

{#snippet entryTitleBody()}
	<article class="entry">
		<header>
			<h2 data-measure>Idun leaves the drafts folder</h2>
		</header>
	</article>
{/snippet}
{@render spec(
	'article.entry header h2',
	'app.css',
	'clamp(1.25rem, 1rem + 1vw, 1.75rem)',
	'header h2',
	entryTitleBody
)}

{#snippet ledeBody()}
	<p class="lede" data-measure>Some finished, some half-built, all in the open.</p>
{/snippet}
{@render spec(
	'.lede',
	'app.css:244',
	'clamp(1.125rem, 1rem + 0.75vw, 1.5rem)',
	'',
	ledeBody
)}

{#snippet claimBody()}
	<p class="claim" data-measure>Independence is infrastructure.</p>
{/snippet}
{@render spec(
	'.claim',
	'about/+page.svelte:64 — copied',
	'the same clamp as .lede, at weight 500 and lh 1.25',
	'',
	claimBody
)}

{#snippet rubricBody()}
	<Rubric>running</Rubric>
{/snippet}
{@render spec('Rubric', 'Rubric.svelte:28', '1.125rem · Spectral SC · fixed', '.rubric__title', rubricBody)}

<!-- Everything that rides the body's own curve. Shown together because the
     decision about any one of them is a decision about all eight. -->

{#snippet bodyBody()}
	<div class="text">
		<p data-measure>
			An export button is not a promise. It becomes one only when the file it produces opens
			somewhere that is not ours, without asking us for anything, and keeps opening after we
			have stopped paying attention to it.
		</p>
		<p>
			Most of the software you depend on was paid for by somebody who is not you. That is not a
			conspiracy, it is an accounting fact, and it explains nearly every decision that has ever
			been taken against your interests.
		</p>
	</div>
{/snippet}
{@render spec(
	'body / running text',
	'app.css:122',
	'clamp(1rem, 0.875rem + 0.25vw, 1.125rem)',
	'',
	bodyBody
)}

{#snippet standfirstBody()}
	<p class="standfirst" data-measure>
		Every project on the bench declares which of the five it holds to, and how it meets each test.
	</p>
{/snippet}
{@render spec(
	'.standfirst',
	'app.css:264',
	'no size of its own · body, in --ink-soft',
	'',
	standfirstBody
)}

{#snippet entryBodyBody()}
	<article class="entry">
		<div class="text">
			<p data-measure>
				The first public build is out of the workshop. Your following exports in one step and
				lands on another server without asking us for anything.
			</p>
		</div>
	</article>
{/snippet}
{@render spec(
	'.text',
	'app.css',
	'no size of its own · body, at lh 1.5',
	'',
	entryBodyBody
)}

{#snippet testBody()}
	<article class="section">
		<div class="text">
			<dl data-measure>
				<dt>Test</dt>
				<dd>If a paid tier ever gates the way out, we have failed this one.</dd>
			</dl>
		</div>
	</article>
{/snippet}
{@render spec(
	'article .text dl / dt',
	'app.css',
	'no size of its own · body at weight 500, dt in Spectral SC',
	'dt',
	testBody
)}

{#snippet codaBody()}
	<article class="section">
		<div class="text">
			<dl>
				<dt>Test</dt>
				<dd>Anyone can build on it without a licence.</dd>
			</dl>
			<p data-measure>This is the easiest of the five to write down and the hardest to keep.</p>
		</div>
	</article>
{/snippet}
{@render spec(
	'article .text dl + p / .closing',
	'app.css',
	'no size of its own · body, in --ink-soft',
	'p',
	codaBody
)}

{#snippet factsBody()}
	<dl class="facts" data-measure>
		<div><dt>Year</dt><dd>2026</dd></div>
		<div><dt>Discipline</dt><dd>Design and build</dd></div>
		<div><dt>Elsewhere</dt><dd><a href="/type">vionio.com</a></dd></div>
	</dl>
{/snippet}
{@render spec(
	'.facts dt / dd',
	'app.css:379',
	'no size of its own · body. Nothing on the live site renders it',
	'.facts dt',
	factsBody
)}

{#snippet actionBody()}
	<p class="actions">
		<a class="action action--lead" href="/type" data-measure>Read the commitments</a>
		<a class="action" href="/type">Open the room</a>
	</p>
{/snippet}
{@render spec('.action', 'app.css:286', '1rem · fixed', '', actionBody)}

{#snippet turnBody()}
	<p class="turn" data-measure>and then the harder half</p>
{/snippet}
{@render spec('p.turn', 'app.css', '1rem · Spectral SC · fixed', '', turnBody)}

{#snippet declaresHowBody()}
	<Declarations project={vionio} detail />
{/snippet}
{@render spec(
	'.declares__how',
	'Declarations.svelte:143',
	'0.95rem · fixed. The marks are 0.8rem, the titles ride the body',
	'.declares__how',
	declaresHowBody
)}

{#snippet labelBody()}
	<article class="entry">
		<header>
			<p data-measure>9 August 2026 · Vionio</p>
		</header>
	</article>
{/snippet}
{@render spec(
	'article header > p',
	'app.css',
	'0.875rem · fixed · in --ink-soft',
	'',
	labelBody
)}

{#snippet heldBody()}
	<Declarations project={vionio} />
{/snippet}
{@render spec(
	'.held__one',
	'Declarations.svelte:69',
	'0.875rem · fixed · outlined',
	'.held__one',
	heldBody
)}

{#snippet markBody()}
	<p class="mark-row"><span class="declares__mark-demo" data-measure>not claimed</span></p>
{/snippet}
{@render spec(
	'.declares__mark',
	'Declarations.svelte:113 — copied',
	'0.8rem · Spectral SC · fixed. The smallest type on the site',
	'',
	markBody
)}

<!-- ===================================================================
     2. The same roles in the compositions they actually appear in. The
     intervals are the decision, and an interval is only visible when the
     two sizes are next to each other in the order a reader meets them.
     =================================================================== -->

<Rubric id="context">In context</Rubric>

<p class="context-note">A front page section, top to bottom.</p>

<section class="section demo">
	<header>
		<h2>Five things, each with a test.</h2>
		<p>
			Anyone can claim principles. These come with the condition under which we would have failed
			them.
		</p>
	</header>
</section>

<p class="turn">and then the harder half</p>

<article class="section demo">
	<header>
		<p>3 of 5</p>
		<h3>You can leave, and take it with you.</h3>
	</header>
	<div class="text">
		<p>
			Leaving should cost you an afternoon, not a year. Everything you have put in comes out in a
			format something else can read, and the way out does not run through us.
		</p>
		<dl>
			<dt>Test</dt>
			<dd>If a paid tier ever gates the export, we have failed this one.</dd>
		</dl>
		<p>This is the easiest of the five to write down and the hardest to keep.</p>
	</div>
</article>

<section class="section demo">
	<p class="pull">The exit is the feature.</p>
</section>

<p class="context-note">A news entry.</p>

<section class="section demo">
	<div class="entries">
		<article class="entry">
			<header>
				<p>9 August 2026 · Vionio</p>
				<h2>Idun leaves the drafts folder</h2>
			</header>
			<div class="text">
				<p>
					The first public build is out of the workshop. Your following exports in one step and
					lands on another server without asking us for anything.
				</p>
				<p>
					The protocol is the way out, so nothing about leaving needs our permission or our
					continued existence.
				</p>
			</div>
		</article>
		<article class="entry">
			<header>
				<p>2 June 2026 · Workshop Europa</p>
				<h2>Five things, each with a test</h2>
			</header>
			<div class="text">
				<p>
					The commitments are published, each with the condition under which we would have failed
					it.
				</p>
			</div>
		</article>
	</div>
</section>

<p class="context-note">The head of a section page: headline, lede, running text.</p>

<section class="section demo">
	<header>
		<h2>Independence is infrastructure</h2>
	</header>
	<div class="text">
		<p class="lede">
			Software you depend on can be sold, closed, or quietly turned against you.
		</p>
		<p>
			Not because anyone is a villain, but because the money usually comes from somewhere other
			than you, and the thing that pays is the thing that gets built.
		</p>
		<p class="claim">Independence is infrastructure.</p>
	</div>
</section>

<p class="context-note">A project page: rubric, declarations, particulars.</p>

<section class="section demo">
	<Rubric>commitments</Rubric>
	<Declarations project={vionio} detail />
</section>

<section class="section demo">
	<Rubric>particulars</Rubric>
	<dl class="facts">
		<div><dt>Year</dt><dd>2026</dd></div>
		<div><dt>Discipline</dt><dd>Design and build</dd></div>
		<div><dt>Elsewhere</dt><dd><a href="/type">vionio.com</a></dd></div>
	</dl>
</section>

<!-- ===================================================================
     3. What the paper's scale is sitting next to. The card sets its type
     at fixed sizes rather than against the card, so these four never
     move — which is the other half of any decision made above.
     =================================================================== -->

<Rubric id="cards">For reference: the card</Rubric>

<p class="context-note">
	Four fixed sizes, the same on a phone and on a desktop. The paper's section headline tops out at 32px
	against the card's .title at 32, and the paper's body matches the card's .eyebrow exactly.
</p>

<Card orientation="landscape" wide>
	{#snippet top()}
		<p class="eyebrow">.eyebrow — 1rem</p>
	{/snippet}
	{#snippet middle()}
		<p class="title">.title — 2rem</p>
		<p class="title--small">.title--small — 1.5rem</p>
	{/snippet}
	{#snippet bottom()}
		<p class="meta">.meta — 0.875rem</p>
	{/snippet}
</Card>

<style>
	/* ---- The page's own chrome ------------------------------------------
	   Deliberately in the system font: nothing that labels a specimen may
	   be mistaken for the specimen. None of this is part of the site.
	   --------------------------------------------------------------------- */

	.head {
		width: min(100%, var(--column));
		margin-inline: auto;
		padding-block: clamp(1rem, 4vw, 2.5rem);
		text-align: center;
	}

	.head__title {
		font-size: clamp(1.75rem, 1.25rem + 1.25vw, 2rem);
		font-weight: 500;
		line-height: 1.125;
		letter-spacing: 0;
	}

	.head__note {
		margin-block-start: 0.75em;
		color: var(--ink-soft);
	}

	.head__width,
	.spec__meta,
	.context-note {
		font-family: ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, monospace;
		font-size: 0.75rem;
		line-height: 1.5;
		letter-spacing: 0;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.head__width {
		margin-block-start: 1em;
	}

	.spec {
		width: min(100%, var(--band));
		margin-inline: auto;
		padding-block: clamp(1.25rem, 3vw, 2rem);
		border-top: 1px solid color-mix(in srgb, var(--ink) 15%, transparent);
	}

	/* The one hard-ruled thing on the site, because this is a table and not
	   a page. What it is on the left, what it measures on the right; when the
	   left grows past the room it has, the measurement drops to its own line
	   rather than shunting about from row to row. */
	.spec__meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.25em 1.25em;
		margin-block-end: 1.25em;
	}

	.spec__what {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em 1.25em;
	}

	.spec__name {
		font-weight: 700;
		text-transform: none;
		color: var(--ink);
	}

	.spec__where,
	.spec__css {
		text-transform: none;
	}

	/* Measured, not declared: filled in from the element itself on load and
	   on every resize. */
	.spec__px {
		text-transform: none;
		white-space: nowrap;
	}

	.context-note {
		width: min(100%, var(--band));
		margin-inline: auto;
		padding-block-start: clamp(1.5rem, 4vw, 3rem);
		text-align: center;
	}

	.demo {
		padding-block-start: 0.5rem;
	}

	.mark-row {
		text-align: center;
	}

	/* Scoped to about/+page.svelte — shown here as specimens only. */
	.claim {
		font-weight: 500;
		font-size: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
		letter-spacing: 0;
		line-height: 1.25;
	}

	.languages {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.125em 0.5em;
		width: min(100%, var(--band));
		margin-inline: auto;
		font-size: clamp(1.5rem, 1rem + 2.5vw, 2.75rem);
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: 0;
		text-align: center;
	}

	.languages__word:not(:last-child)::after {
		content: '·';
		margin-inline-start: 0.5em;
		color: var(--ink-soft);
	}

	.declares__mark-demo {
		display: inline-block;
		min-width: 6.5em;
		padding: 0.125em 0.5em;
		border: 1px solid var(--ink-soft);
		border-radius: 999px;
		font-family: var(--font-caps);
		font-size: 0.875rem;
		letter-spacing: 0.125em;
		text-align: center;
		text-transform: lowercase;
		color: var(--ink-soft);
	}
</style>
