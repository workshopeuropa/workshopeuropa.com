<script lang="ts">
	/* ---------------------------------------------------------------------
	   A TEMPORARY SPECIMEN PAGE. Not linked from anywhere, noindexed, and
	   meant to be deleted once the decisions it is for have been taken.

	   Every size on it is the real one: the roles defined in src/app.css are
	   used directly, and Rubric and Declarations are the actual components.
	   The nine styles scoped to a route component — .turn, .commitment__*,
	   .test, .coda, .closing, .claim, .languages — cannot reach this page,
	   so they are COPIED into the style block at the foot, marked as copies,
	   with the file they were copied from on each row. If one of them is
	   changed at home and not here, this page is wrong about it.

	   The copy is written in the site's own register rather than sampled
	   from it, so nothing here reads as a page that exists.
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
	'clamp(1.75rem, 1.2rem + 2.6vw, 3rem) · caps at 1108px',
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
	'clamp(1.5rem, 1rem + 2.4vw, 2.75rem) · caps at 1167px',
	'',
	languagesBody
)}

{#snippet headlineBody()}
	<h2 class="headline" data-measure>Who does it answer to?</h2>
{/snippet}
{@render spec(
	'.headline',
	'app.css:255',
	'clamp(1.6rem, 1.35rem + 1.2vw, 2.2rem) · caps at 1133px',
	'',
	headlineBody
)}

{#snippet commitmentTitleBody()}
	<h3 class="commitment__title" data-measure>You can leave, and take it with you.</h3>
{/snippet}
{@render spec(
	'.commitment__title',
	'+page.svelte:136 — copied',
	'clamp(1.4rem, 1.1rem + 1.3vw, 2rem) · caps at 1108px',
	'',
	commitmentTitleBody
)}

{#snippet entryTitleBody()}
	<h2 class="entry__title" data-measure>Idun leaves the drafts folder</h2>
{/snippet}
{@render spec(
	'.entry__title',
	'app.css:359',
	'clamp(1.25rem, 1.05rem + 0.9vw, 1.7rem) · caps at 1156px',
	'',
	entryTitleBody
)}

{#snippet ledeBody()}
	<p class="lede" data-measure>Some finished, some half-built, all in the open.</p>
{/snippet}
{@render spec(
	'.lede',
	'app.css:244',
	'clamp(1.15rem, 1rem + 0.8vw, 1.5rem) · caps at 1000px',
	'',
	ledeBody
)}

{#snippet claimBody()}
	<p class="claim" data-measure>Independence is infrastructure.</p>
{/snippet}
{@render spec(
	'.claim',
	'about/+page.svelte:64 — copied',
	'the same clamp as .lede, at weight 500 and lh 1.3',
	'',
	claimBody
)}

{#snippet rubricBody()}
	<Rubric>running</Rubric>
{/snippet}
{@render spec('Rubric', 'Rubric.svelte:28', '1.15rem · Spectral SC · fixed', '.rubric__title', rubricBody)}

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
	'clamp(1rem, 0.95rem + 0.25vw, 1.125rem) · caps at 1120px',
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
	<div class="entries">
		<div class="entry">
			<div class="entry__body">
				<p data-measure>
					The first public build is out of the workshop. Your following exports in one step and
					lands on another server without asking us for anything.
				</p>
			</div>
		</div>
	</div>
{/snippet}
{@render spec(
	'.entry__body',
	'app.css:366',
	'no size of its own · body, at lh 1.6',
	'',
	entryBodyBody
)}

{#snippet testBody()}
	<div class="text">
		<p class="test" data-measure>
			<span class="test__label">Test</span>
			If a paid tier ever gates the way out, we have failed this one.
		</p>
	</div>
{/snippet}
{@render spec(
	'.test / .test__label',
	'+page.svelte:146 — copied',
	'no size of its own · body at weight 500, label in Spectral SC',
	'',
	testBody
)}

{#snippet codaBody()}
	<div class="text">
		<p class="coda" data-measure>
			This is the easiest of the five to write down and the hardest to keep.
		</p>
	</div>
{/snippet}
{@render spec(
	'.coda / .closing',
	'+page.svelte:162, 168 — copied',
	'no size of its own · body, in --ink-soft',
	'',
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
{@render spec('.turn', '+page.svelte:109 — copied', '1rem · Spectral SC · fixed', '', turnBody)}

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
	<div class="entries">
		<div class="entry">
			<p class="entry__label" data-measure>9 August 2026 · Vionio</p>
		</div>
	</div>
	<p class="commitment__number">3 of 5</p>
{/snippet}
{@render spec(
	'.entry__label / .commitment__number',
	'app.css:349, +page.svelte:127 — one copied',
	'0.9rem · fixed · in --ink-soft',
	'',
	labelBody
)}

{#snippet heldBody()}
	<Declarations project={vionio} />
{/snippet}
{@render spec(
	'.held__one',
	'Declarations.svelte:69',
	'0.9rem · fixed · outlined',
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
	<h2 class="headline">Five things, each with a test.</h2>
	<p class="standfirst">
		Anyone can claim principles. These come with the condition under which we would have failed
		them.
	</p>
</section>

<p class="turn">and then the harder half</p>

<article class="section demo">
	<div class="text">
		<p class="commitment__number">3 of 5</p>
		<h3 class="commitment__title">You can leave, and take it with you.</h3>
		<p>
			Leaving should cost you an afternoon, not a year. Everything you have put in comes out in a
			format something else can read, and the way out does not run through us.
		</p>
		<p class="test">
			<span class="test__label">Test</span>
			If a paid tier ever gates the export, we have failed this one.
		</p>
		<p class="coda">This is the easiest of the five to write down and the hardest to keep.</p>
	</div>
</article>

<section class="section demo">
	<p class="pull">The exit is the feature.</p>
</section>

<p class="context-note">A news entry.</p>

<section class="section demo">
	<div class="entries">
		<article class="entry">
			<p class="entry__label">9 August 2026 · Vionio</p>
			<h3 class="entry__title">Idun leaves the drafts folder</h3>
			<div class="entry__body">
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
			<p class="entry__label">2 June 2026 · Workshop Europa</p>
			<h3 class="entry__title">Five things, each with a test</h3>
			<div class="entry__body">
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
	<h2 class="headline">Independence is infrastructure</h2>
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
	Four fixed sizes, the same on a phone and on a desktop. The paper's .headline tops out at 35.2px
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
		font-size: clamp(1.6rem, 1.35rem + 1.2vw, 2.2rem);
		font-weight: 500;
		line-height: 1.1;
		letter-spacing: -0.01em;
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
		gap: 0.2em 1.25em;
		margin-block-end: 1.25em;
	}

	.spec__what {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2em 1.25em;
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

	/* ---- Copies -----------------------------------------------------------
	   Scoped to a route component at home, so unreachable from here. Each is
	   a verbatim copy of the declaration named on its row above; change one
	   at home and this page is lying about it until it is changed here too.
	   ----------------------------------------------------------------------- */

	/* src/routes/+page.svelte */
	.turn {
		width: 100%;
		margin-inline: auto;
		padding-block: clamp(1rem, 4vw, 2.5rem) 0;
		font-family: var(--font-caps);
		font-size: 1rem;
		letter-spacing: 0.04em;
		text-align: center;
		text-transform: lowercase;
		color: var(--ink-soft);
	}

	.commitment__number {
		font-size: 0.9rem;
		font-weight: 500;
		letter-spacing: 0;
		color: var(--ink-soft);
		text-align: center;
	}

	.commitment__title {
		font-size: clamp(1.4rem, 1.1rem + 1.3vw, 2rem);
		font-weight: 500;
		line-height: 1.15;
		text-align: center;
		text-wrap: balance;
		margin-bottom: 0.2em;
	}

	.test {
		font-weight: 500;
	}

	.test__label {
		font-family: var(--font-caps);
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: lowercase;
		color: var(--ink-soft);
	}

	.test__label::after {
		content: ':';
	}

	.coda {
		color: var(--ink-soft);
	}

	/* src/routes/about/+page.svelte */
	.claim {
		font-weight: 500;
		font-size: clamp(1.15rem, 1rem + 0.8vw, 1.5rem);
		letter-spacing: 0;
		line-height: 1.3;
	}

	.languages {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.15em 0.5em;
		width: min(100%, var(--band));
		margin-inline: auto;
		font-size: clamp(1.5rem, 1rem + 2.4vw, 2.75rem);
		font-weight: 500;
		line-height: 1.15;
		letter-spacing: -0.01em;
		text-align: center;
	}

	.languages__word:not(:last-child)::after {
		content: '·';
		margin-inline-start: 0.5em;
		color: var(--ink-soft);
	}

	/* src/lib/components/Declarations.svelte — the mark on its own, so the
	   smallest size on the site can be looked at without the list round it. */
	.declares__mark-demo {
		display: inline-block;
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
</style>
