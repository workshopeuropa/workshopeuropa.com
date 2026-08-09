# workshopeuropa.com

The Workshop Europa site: an umbrella brand and an open register. It is the name four products
publish under, and it keeps a public list of European companies, projects and people who commit to
five principles — each of which comes with the condition under which they would have failed it.

Every other list of European software sorts by jurisdiction: where it is hosted, who owns it, where
the data sits. This one sorts by structure — who does it answer to. A European-owned, EU-hosted,
ad-funded attention platform passes every other list and fails this one.

It is not a studio, an agency, an EU body, or a membership club. There is no approval step, no fee,
and no board, and Workshop Europa's own projects are in the register on the same terms as everyone
else's — which is the only reason the list is worth reading.

Cards in the ISO 216 ratio — 1 : √2 — portrait or landscape, laid on paper or on an image;
everything else is plain type in a column down the middle.

- **SvelteKit 2** (Svelte 5 runes) on `adapter-node`
- **Spectral** and **Spectral SC** via Fontsource
- **Better Auth** + **Drizzle ORM** + **SQLite**, wired up but not currently used by any page

## The pages

| Route | What it is |
| --- | --- |
| `/` | The wedge, the five commitments by title, the register in one paragraph |
| `/commitments` | The five, each with its test. Names no product, ever |
| `/register` | Who it answers to — self-declared, filterable by commitment, never ranked |
| `/projects` | What Workshop Europa publishes, in three groups |
| `/news` | Notes and releases, plus `/news/rss.xml` and `/news/atom.xml` |
| `/about` | Why this exists, and how it is run |
| `/join` | The room, the register, and the projects — three ways in, and they differ |

`/register` and `/projects` are different things and are not to be merged. Projects are what we
publish; the register is everyone, us included.

## Running it

```sh
npm install
cp .env.example .env      # then fill in BETTER_AUTH_SECRET
npm run dev
```

Generate a secret with `openssl rand -base64 32`. The SQLite file is created on first boot and
migrations in `drizzle/` are applied automatically, so there is no setup step beyond the `.env`.

```sh
npm run check       # svelte-check
npm run build       # production build into build/
npm start           # run the built server
```

## Where cards are allowed

A card is a device, not the page. Three things get one:

| Card             | Orientation                | Where                                        |
| ---------------- | -------------------------- | -------------------------------------------- |
| Page header      | Landscape, portrait on a plate on desktop | Top of every page, carrying the nav |
| A project        | Portrait                   | `/projects`, one to a plate                  |
| A section        | One landscape, then two portrait | The footer of every page               |

A project page wears two of them: the section's own header card, exactly as `/projects` wears it,
and then that project's card from the index laid on its side. The section card steps its heading
down to a `p` and the project's card takes the `h1`, so the page still has one — and the project's
card drops its link there, since a page should not link to itself.

Everything else — the commitments, the register, news, project text, particulars — is set straight
onto the paper in a centred column. Adding a fourth kind of card is a decision, not a default.

A project card on `/projects` carries its own calls to action, which means it stops being one big
link: a link inside a link is not valid, and the point of a call to action is that it goes somewhere
the card does not. Its name is the way through to the project's own page instead, and the `morph`
name still sits on the card, so the transition works whichever link you press.

## The cards

`src/lib/components/Card.svelte` is a three-band grid — `top`, `middle`, `bottom` — with
`aspect-ratio` acting as a floor rather than a cage: a card holding more than the ratio allows
grows downwards instead of clipping.

Type inside a card is set, not scaled: `eyebrow` 1rem, `title` 2rem, `title--small` 1.5rem, `meta`
0.875rem, the same in every card. Sizing against the card meant a small card whispered — a project
card should read as loudly as the header card above it. `title--small` is the one exception, and
`Colophon.svelte` takes it back to 2rem from 60rem up, where the footer's cards have the room —
scoped there so the small pair at the foot of a project page stays small at every width.

```svelte
<Card orientation="portrait" href="/projects/vionio">
	{#snippet top()}<p class="eyebrow">2026</p>{/snippet}
	{#snippet middle()}<h2 class="title">Vionio</h2>{/snippet}
	{#snippet bottom()}<p class="meta">Out in the world</p>{/snippet}
</Card>
```

Available classes inside a card: `eyebrow`, `title`, `title--small`, `meta`, `prose`, `italic`.
Titles carry `text-wrap: balance`, so a headline never leaves one word stranded on the last line.
Below 16rem of card, hyphenation comes off — at eight characters a line it stops helping and starts
chopping, and `overflow-wrap: break-word` still catches a word that genuinely cannot fit.

Italic is the wordmark and nothing else. Only Spectral's 500 italic is loaded, so anything that
asks for italic elsewhere gets a synthesised slant — which is the point: ask deliberately.

`Deck.svelte` lays cards out — one or two columns, collapsing to one on small screens, and centring
rather than leaving a hole when there is a single card. A firm deck (`collapse={false}`) keeps its
columns all the way down and stretches them level, so a card that outgrows the ratio takes its
neighbour with it rather than leaving a step.

Rows are `1fr auto 1fr`: the outer tracks are equal by definition, so the middle band sits on the
card's centre line however much the bands above and below weigh.

## The nav and the footer

`CardNav.svelte` is the six sections — Commitments, Register, Projects, News, About, Join — with
equal gaps between them. The page you are on wears a pill in `--ink` with `--card` as the type, the
same pairing as text on a card, inverted, so it holds 5.45:1 at worst in either mode. The pill is a
capsule, and the card's rim is measured from it.

Six labels, one of them eleven characters long, do not fit the foot of a card on a phone at any size
worth reading, so the row wraps rather than shrinking to fit the longest word. Wrapped rows are
centred: a run spread edge to edge is what a full row looks like, and a second row of one item
pushed to the left margin is not.

Nothing in a masthead card underlines on hover — a line under a word would be the only hard edge on
a card made of soft rectangles. A nav item fills its own pill shape faintly instead, and the
wordmark lightens.

A capsule of radius r sits concentric inside a corner of radius R when it is inset by `R - r`. The
card has one inset — its padding — and everything sits on it: the wordmark at the head, the nav at
the foot, the line of copyright under the colophon's, the headline in between. So the corner is cut
to fit what sits in it, rather than the other way round:

```css
--nav-size: clamp(0.8rem, 3.2vw, 1rem);        /* the nav's type */
--pill-h: calc(var(--nav-size) * 1.6);         /* 1.2 of line, 0.2em either side */
--radius: calc(var(--pad) + var(--pill-h) / 2);
```

Everything comes off those two numbers, so nothing can fall out of step: at 1280 the padding is 44px,
the pill's radius 12.8, and the card's corner 56.8 — the difference is the padding exactly, at every
width the site runs at. `--nav-size` is set on the card rather than in the nav because the corner is
cut from it, and in `vw` rather than `cqi` so both places resolve it against the same thing. The
floor is the smallest size the nav is still comfortable to press at, rather than the size at which
the whole row happens to fit on one line, because it no longer has to.

`--pad` is why the card registers its padding with `@property` rather than leaving it a plain custom
property. It is written in `cqi`, and an element is not its own query container: on the card those
units answer to `.shell`, on a descendant they answer to the card. Registered as a `<length>` it
resolves once, on the card, and inherits as that length — otherwise a child computes a different
padding from the one the card is actually using, and the two curves drift apart.

`Colophon.svelte` builds the footer from the same six sections: the three that come after the one
you are on, wrapping round at the end. The first becomes a landscape card across the top, the other
two a portrait pair under it that keeps its columns on a phone. With four sections a fixed order
minus the current one showed every section somewhere; with six it would have shown the first three
and never the last three, so the run starts where you are. The front page belongs to none of the
six, so it keeps the first three.

The card at the very bottom carries the wordmark, the place, the year, and the three ways out of the
site: the room, the source, and the feed. A feed is the sort of thing this audience looks for, and
putting it where it can be seen rather than only in the document head is itself on thesis.

## Moving between pages

Navigations go through the View Transitions API: `+layout.svelte` hands the navigation to
`document.startViewTransition`, and every duration and curve is CSS in `app.css`. Cards that pass a
`morph` name to `Card.svelte` are lifted out of both pages and tweened between the two positions
instead of being cut away:

| Name | The card |
| --- | --- |
| `masthead` | The page header — full height everywhere, half height on a project page |
| `colophon` | The card at the foot of the footer |
| `project-<slug>` | A project's card: portrait on the index, landscape at the top of its own page |
| `nav-pill` | The pill on the current nav item, sliding to the next section |

The group animates over 320ms while the type on a card crosses over in the first 150, so what you
watch is the card travelling rather than two sets of type lying on top of each other the whole way.
The page underneath cross-fades in 180ms, faster than the cards moving across it.

The curve is eased at both ends rather than launched. It used to be `cubic-bezier(0.2, 0, 0, 1)`,
which put 63% of the journey in its first 113ms — fine over the few pixels a card grows by, but over
the width of a card it reads as a jump followed by a creep, and the marker sliding between two nav
items looked as though it were not animating at all.

The masthead is the exception, because it is the one card that changes shape rather than place: full
height on most pages, half on a project page. By default a snapshot is drawn at its own height and
pinned to the top of the group, so the box grew while the two pictures inside it sat still — the
card read as two cards laid over each other rather than one changing height. Its snapshots take
`height: 100%` and `object-fit: fill` instead, so they move with the box, and their cross-fade runs
the full 320ms rather than settling early on a picture that is still being resized.

### Handing the masthead over

Press something in the footer and it is the card you are looking at, not the header you have
scrolled away from, that should become the header on the page you land on. `Colophon.svelte` moves
the `masthead` name onto that card and takes it off the page's own header, so it travels up from
where you pressed instead of the header flying in from off-screen. Which card that is depends on
what you pressed: one of the three section cards is its own answer, and the menu at the very bottom
belongs to the colophon card around it — which lends its own name out for the length of the
navigation and gets it back with the rest.

That is done to the DOM in the click handler rather than through state: it has to be true before the
navigation is snapshotted, and the click is the last moment that is certain. The elements are marked with
`data-handoff`, and the layout gives the names back inside the transition callback — after the new
page is in place, before the new state is captured — restoring each to whatever its `data-morph`
declared rather than to nothing. The handler skips under the same two conditions
the layout does, since a name moved when no transition runs would never be handed back, and it
sweeps up any mark left by a navigation that never completed.

A name has to be unique in the document — two cards claiming one cancels the whole transition — so
`ProjectCard` takes `morph={false}` for a card whose project already has one on that page. The
project page uses it on previous and next, which with a short enough list can be the same project as
the one you are looking at. `CardNav` takes its name as a prop for the same reason: the header's nav
and the colophon's mark the same section, so they cannot both be `nav-pill`.

The pill lies over its link with its own copy of the label, rather than being the link itself. It is
the only thing lifted out, so the labels underneath stay where they are and the marker slides off
one and onto the next. Putting the pill behind the label instead would leave that label
`--card`-coloured on a `--card` card for as long as the pill was away from it — invisible for the
length of the animation — and making the pill the whole link carried the label off with it.

Only the header's pill is named. The colophon's has no name: two footers sit at different depths
down two pages of different lengths and the scroll resets on the way, so a named pill down there
swept thousands of pixels vertically on every navigation.

Every item carries a pill; all but the current one are invisible. They are there so the marker has
somewhere to come from on a page that is in none of the sections — the front page. Pressing an item
there hands its own invisible pill the name, so the marker travels out of the word you pressed and
fades up on the way, instead of being set down at its destination while the card is still arriving.
`CardNav` does that in the click handler, for the same reason `Colophon` does its hand-over there:
it has to be true before the navigation is snapshotted.

The way back is the mirror: landing on a page that is in none of the sections leaves the pill you set
off with nothing to land on, so the layout gives the name to the invisible pill on the item you came
from and it falls with the card and goes out there, instead of fading where it stood while the card
carried on without it.

There is one way left to leave the front page without arming a pill — by a footer card rather than
the nav. The layout notices that nothing holds the name, raises `data-pill-rides` on `<html>` for
the length of that navigation, and the pill travels inside the card's own snapshot. The flag comes
down on `transition.finished`, not when the callback ends: it has to still be up when the new state
is captured.

None of it is load-bearing. Without the API, or with motion turned down in the OS, `onNavigate`
returns early and the navigation happens exactly as it did before.

## Plates

`Plate.svelte` is the interplay between a card and an image: an image filling the screen, with a
landscape card at the foot of it, clear of the edge by the page's own padding.

```svelte
<Plate src={project.image.src} alt={project.image.alt}>
	<HeaderCard title={project.title} />
</Plate>
```

It full-bleeds out of the sheet with `margin-inline: calc(50% - 50cqw)`, and when it opens a page
it cancels the sheet's top padding via `--sheet-top`, so the image starts at the top of the screen
rather than a gutter below it. `.shell` carries `overflow-x: clip` as a guard against a full-bleed
child ever overhanging it.

A plate is always an A rectangle, never a viewport-shaped box — but which way up depends on the
screen. Narrow, the image stands and the card lies down; from 60rem the two swap, so the image
lies down and the card stands up. That keeps the hero near one screen tall on a desktop instead of
the 1.41 screens a full-width portrait plate would cost:

| | Plate | Card |
| --- | --- | --- |
| 430px | 430 × 608 portrait | 398 × 281 landscape |
| 1280px | 1280 × 905 landscape | 416 × 588 portrait |

It bleeds to `100cqw` rather than `100vw`, measured against `.shell` as a container, so the page's
`--page` cap caps the plate with it: past 80rem the site stops growing and the plate stops with it.

The card on a plate fills the width on a phone and stands up at 26rem on a wide screen. The front
page and every project page with an image use one.

The images in `static/media/` are placeholder screenshots. They are cropped to fill the screen now,
so anything important in them wants to be near the middle.

## Colour

One hue per page, four recipes on it, two modes. Everything is derived — the layout sets `--hue`
and `--hue-cold` on `:root`, and `src/app.css` does the rest:

```css
--tint-s: 80%;  --tint-l: 80%;   /* the card in light mode, the ink in dark */
--shade-s: 30%; --shade-l: 25%;  /* the ink in light mode, the card in dark */
--wash-s: 50%;  --wash-l: 95%;   /* the page in light mode */
--deep-s: 20%;  --deep-l: 12%;   /* the page in dark mode */
```

Three roles read those: `--paper`, `--card`, `--ink`. **Dark mode is the card turned inside out** —
the fill and the ink swap places, and the page goes down to the deep with them:

```css
@media (prefers-color-scheme: dark) {
	:root { --paper: var(--deep); --card: var(--shade); --ink: var(--tint); }
}
```

All text on the page uses `--ink`, the card's own text colour, so the type on the paper and the
type on a card are the same colour rather than two near-blacks.

### The scale

Twelve hues, 30° apart, offset by 15° so that 75 — the green the site started from — lands on the
scale. 12 × 30 closes the wheel exactly, so the wrap from 345 back to 15 is the same step as every
other. `--hue-cold` is the hue moved 15° along the shorter arc towards the cold pole at 210°, a
cyan-leaning blue rather than pure blue; Sky and Cornflower sit either side of it and both land on
it, so they share a shade. The rule is `colder()` in `src/lib/tints.ts`, where `COLD_POLE` and
`COLD_SHIFT` are one number each.

| Hue | Tint | Shade | Wash | Deep |
|---|---|---|---|---|
| Coral 15° | `#f5b8a3` | `#532d2d` | `#f9efec` | `#251c18` |
| Butter 45° | `#f5e0a3` | `#53532d` | `#f9f5ec` | `#252218` |
| Lime 75° | `#e0f5a3` | `#40532d` | `#f5f9ec` | `#222518` |
| Apple 105° | `#b8f5a3` | `#2d532d` | `#eff9ec` | `#1c2518` |
| Spring 135° | `#a3f5b8` | `#2d5340` | `#ecf9ef` | `#18251c` |
| Mint 165° | `#a3f5e0` | `#2d5353` | `#ecf9f5` | `#182522` |
| Sky 195° | `#a3e0f5` | `#2d4053` | `#ecf5f9` | `#182225` |
| Cornflower 225° | `#a3b8f5` | `#2d4053` | `#eceff9` | `#181c25` |
| Periwinkle 255° | `#b8a3f5` | `#2d2d53` | `#efecf9` | `#1c1825` |
| Lilac 285° | `#e0a3f5` | `#402d53` | `#f5ecf9` | `#221825` |
| Orchid 315° | `#f5a3e0` | `#532d53` | `#f9ecf5` | `#251822` |
| Rose 345° | `#f5a3b8` | `#532d40` | `#f9ecef` | `#25181c` |

Measured in a browser across all twelve hues in both modes:

| | Light | Dark |
|---|---|---|
| Text on the page | 7.30:1 worst | 7.95:1 worst |
| Softened text on the page | 5.03:1 worst | 5.03:1 worst |
| Text on a card | 5.45:1 worst | 5.45:1 worst |

Text on a card is the same pair either way round, which is what makes the inversion safe. Nothing
falls below AA, and text on the page clears AAA in both modes.

`--ink-soft` is mixed down from `--ink`, so it follows it into dark mode rather than staying a fixed
grey. It is 85% of the ink, not 70: at 70 the worst hue on the wheel landed at 3.54:1, which is under
AA for a caption or a standfirst or a commitment's test, all of which have to be readable.

There is no soft tone on a card at all. The ink and the fill are 5.45:1 apart at the closest hue, so
there is no room to spend: 72% of the ink landed at 3.15:1, and any mix that does clear 4.5 is too
close to the ink to read as a different tone. `.meta` is set down a size instead of down a tone.

## Type

One face, set two ways:

| Token | Face | What it sets |
| --- | --- | --- |
| `--font-text` | Spectral | Everything — running text, headings, cards, the form |
| `--font-display` | (the same) | Kept apart because it is a different job, not a different face |
| `--font-caps` | Spectral SC | `Rubric` — the one heading set in small caps |

Four weights ship: Spectral 400 and 500, its 500 italic for the wordmark, and Spectral SC 500.
Running text is 400; headings, cards, rubrics and the labels over a list ask for 500 themselves.

Spectral SC cuts its small caps for the lowercase, so `Rubric` is set `text-transform: lowercase`,
not uppercase: a capital comes through as a full-height capital and leaves the first letter of every
rubric a size out from the rest of it. The rubric is centred over its section.

The lists under a rubric — the commitments by title, the notes, a register entry's declarations —
centre their label and their headline under it rather than running the label down a column at the
side. Nothing is ruled off:
no line under a rubric, none between one entry and the next, none under a row of particulars. The
spacing carries it.

The small label over each entry — the date and subject on a note, the numbering on a commitment — is
a size down and a weight up from the paragraph it heads, since it is a caption rather than running
text.

Running text carries `letter-spacing: 0.01em`, which the face wants at the size it is read at and
does not want at heading size. It is declared on `body`, so headings, cards and `.lede` set it back
to zero, and card titles go tighter still at `-0.01em`.

### One colour per page

A page takes one tint and every card on it shares it — the header, the projects, the people, the
footer cards. The next page takes the next one along the scale, so a visit walks the wheel a step
at a time from Lime rather than jumping about.

The walk lives in `src/routes/+layout.server.ts` and its position is kept in a `we-tint` cookie —
per visitor, not per server, since a shared counter would skip several stops whenever somebody else
loaded a page in between. Touching `url.pathname` in that load registers the URL as a dependency,
so SvelteKit re-runs it on every navigation; without that line the load would run once and the
colour would stick for the whole session. Running on the server and serialising the result into the
page means the client hydrates with the same colour instead of flashing a second one.

`+layout.svelte` writes the hue into a `<style>` in the head rather than onto the shell, because
the shell is capped at `--page` and the body paints everything outside it — a background set on the
shell would leave the margins the wrong colour on a wide screen. It writes `:root:root`, not
`:root`: `svelte:head` renders above the stylesheet links, so at equal specificity `app.css`'s
default would win on document order and every page would come out Lime. `data-tint` names the hue
on the shell, so which one you are looking at is legible in the inspector and assertable in a test.

To pin the site to one colour, return a constant from the layout load instead of `stepTint()`;
`--hue` in `app.css` defaults to 75, Lime, for anything the layout does not reach.

## Widths

All centred on one axis, in `src/app.css`:

- `--column` (38rem) — running text
- `--band` (44rem) — cards, decks, and the rubric above each section
- `--page` (80rem) — the widest the page gets, and what a full-bleed plate spans
- `--gutter` (1rem) — the page's padding, on every edge, and the inset of a card on its plate
- `--gap` — space between cards in a deck, and `--stack` between sections. Not padding, so they
  keep their own measure rather than collapsing to 1rem with the page.

Tokens — the ratio, the tints, the faces — live at the top of the same file. The card's corner is
not among them: it is derived, in `Card.svelte`, from the card's own padding.

## Editing the content

No CMS. Text lives in `src/lib/content/`:

| File             | What it holds                                              |
| ---------------- | ---------------------------------------------------------- |
| `site.ts`        | Name, nav, the wedge, the pull quote, and every outbound link |
| `commitments.ts` | The five, their tests, and the turns between the movements  |
| `register.ts`    | One object per entry — everything on `/register`            |
| `projects.ts`    | One object per project — drives the index and the pages     |
| `news.ts`        | One object per note — drives `/news` and both feeds          |
| `about.ts`       | The About page                                              |
| `join.ts`        | The three ways in                                           |

Adding a project is one object in `projects.ts`; `/projects/<slug>` starts working immediately. A
project with more than one name, or more than one address, writes them into the one string with a
bullet between — `Inlägg • Indlæg • Innlegg`. `ProjectCard` splits on the bullet and draws its own
in CSS at 0.55em, and below 12rem of card it drops the bullet and sets the parts on their own lines:
half-width cards on a phone have no room for a run of names across one.
Adding a note is one object in `news.ts`; it appears on `/news` and in both feeds at once. Adding a
section means a line in `nav` and a matching entry in `Colophon.svelte`, which is where the footer's
order lives.

`links` in `site.ts` is every address the site points at outside itself, in one object, so that
correcting one is one line. The Matrix room alias in it is a placeholder until somebody opens the
room.

The project copy currently in the repo is a first draft — real text goes in the same shape. So are
the four register entries, which are Workshop Europa's own and stay drafts until the people running
each project confirm the wording.

## The register

Every entry is self-declared. An entry says which commitments it holds to and, in its own words, how
it meets each test. Nobody writes an entry on somebody else's behalf — a declaration written for you
is not a declaration, and the list is worth reading only because each line in it was put there by
whoever it names. Entries arrive as pull requests against `src/lib/content/register.ts`, so the
register's history is public and auditable, which is the same argument the commitments make. The
email fallback on `/join` exists so that argument does not become a technical entrance requirement.

Nothing is ranked and nothing is scored. Four of five is a real position, not a failure, so the page
filters by commitment and never sorts by how many are met. All five are shown for every entry, the
declared ones with the entry's own words under them and the rest marked "not claimed" — in words,
never in a colour alone.

The filter lives in the URL as `?c=<1-5>`, so a filtered register can be linked to, works before the
JavaScript arrives, and goes back the way it came.

The page should not ship with fewer than about thirty entries. An empty register announces its own
emptiness; seed it before launch.

## The commitments

`/commitments` names no product, anywhere. The fifth commitment is the argument a protocol makes,
stated generally — naming the protocol inside a standard other people sign turns a commitment into a
moat. The tests are readable text rather than anything hidden behind a hover: the test is the half of
a commitment that can be held against us.

The set has three movements, and the page shows the turns. They are set in the small-caps cut, quiet
and full width, and they are not headings — a heading would put a stage direction in the same
register as the commitments it introduces. The spec writes them in italic; italic on this site is the
wordmark and nothing else, so they take size and colour instead.

## Feeds

`/news/rss.xml` and `/news/atom.xml` are built from `news.ts` by `src/lib/feed.ts`. Both are linked
from the document head on every page and visibly in the footer. A note has no page of its own, so its
address is an anchor on `/news` and its id is that address — stable as long as the note's date and
title are, which is the deal every feed reader assumes.

## Auth and the database

Nothing on the site currently uses these. Better Auth, Drizzle and the SQLite file are still wired
up — `hooks.server.ts` resolves a session and the layout passes `user` down — because the pieces are
harder to put back than to leave in place, but no page reads them since `/join` stopped being a form.

Schema is in `src/lib/server/db/schema.ts`: Better Auth's `user`, `session`, `account` and
`verification`, plus `membership`. After changing it:

```sh
npm run db:generate   # write a migration into drizzle/
npm run db:migrate    # apply it (boot does this too)
npm run db:studio     # look at the data
```

Session cookies are `Secure` outside dev, so deploy behind HTTPS and set `ORIGIN` for the Node
adapter.

## Voice

Second person — "you", not "users". Plain declaratives, and no adjective doing persuasive work.
Short sentences, 8–14 words in body copy. Sentence case everywhere, including buttons and nav.
Buttons are verb-first and never "Submit" or "Learn more". Numerals, 24-hour clock, metric; dates as
`2026-08-09` in metadata and `9 August 2026` in prose.

Never position against Silicon Valley by name. Naming them makes them the reference point, which is
the dependency the whole thesis argues against. Avoid "internet", "ecosystem", "empower",
"seamless", "revolutionary", "we believe".

Descriptive link text everywhere, no "click here" or a bare "read more". WCAG AA contrast at
minimum, which the colour system holds at every hue.

## Deploying

`npm run build` then `npm start` — the Node adapter's server, listening on `PORT` (3000 by
default). It needs `ORIGIN` set to the public URL or form posts fail their CSRF check.

The build precompresses static assets to `.br` and `.gz`, and the handler serves whichever the
client accepts — about a third of the original bytes for the CSS and JS. Fonts are left alone;
woff2 is already compressed. Server-rendered HTML is not covered, so leave compression on in
whatever sits in front, or the pages themselves go out uncompressed.
