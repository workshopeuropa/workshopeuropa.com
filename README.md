# workshopeuropa.com

The Workshop Europa site. Cards in the ISO 216 ratio — 1 : √2 — portrait or landscape, laid on
paper or on an image; everything else is plain type in a column down the middle.

- **SvelteKit 2** (Svelte 5 runes) on `adapter-node`
- **Spectral** via `@fontsource/spectral`
- **Better Auth** + **Drizzle ORM** + **SQLite** behind the Join form

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

A card is a device, not the page. Four things get one:

| Card             | Orientation                | Where                                        |
| ---------------- | -------------------------- | -------------------------------------------- |
| Page header      | Landscape, portrait on a plate on desktop | Top of every page, carrying the nav |
| A project        | Portrait                   | `/projects`, and the bench on the front page |
| A person         | Portrait                   | About                                        |
| Related projects | Portrait                   | Foot of a project page                       |

A project page wears two of them: the section's own header card, exactly as `/projects` wears it,
and then that project's card from the index laid on its side. The section card steps its heading
down to a `p` and the project's card takes the `h1`, so the page still has one — and the project's
card drops its link there, since a page should not link to itself.

Everything else — the manifesto, news, project text, particulars, the join form — is set straight
onto the paper in a centred column. Adding a fifth kind of card is a decision, not a default.

## The cards

`src/lib/components/Card.svelte` is a three-band grid — `top`, `middle`, `bottom` — with
`aspect-ratio` acting as a floor rather than a cage: a card holding more than the ratio allows
grows downwards instead of clipping.

Type inside a card is sized in container query units (`cqi`), so a card's composition is identical
at any size, and the landscape variant scales its own type back down because it is wider.

```svelte
<Card orientation="portrait" href="/projects/vionio">
	{#snippet top()}<p class="eyebrow">2026</p>{/snippet}
	{#snippet middle()}<h2 class="title">Vionio</h2>{/snippet}
	{#snippet bottom()}<p class="meta">Out in the world</p>{/snippet}
</Card>
```

Available classes inside a card: `eyebrow`, `title`, `title--small`, `meta`, `prose`, `italic`.
Titles carry `text-wrap: balance`, so a headline never leaves one word stranded on the last line.
`Deck.svelte` lays cards out — one or two columns, collapsing to one on small screens, and centring
rather than leaving a hole when there is a single card.

Rows are `1fr auto 1fr`: the outer tracks are equal by definition, so the middle band sits on the
card's centre line however much the bands above and below weigh.

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
| Text on a card | 5.45:1 worst | 5.45:1 worst |

Text on a card is the same pair either way round, which is what makes the inversion safe. Nothing
falls below AA, and text on the page clears AAA in both modes.

`--ink-soft` and `--rule` are mixed down from `--ink`, so they follow it into dark mode rather than
staying a fixed grey.

### One colour per page

A page draws a tint at random and every card on it shares that one — the header, the projects, the
people, the footer cards. Move to another page and it draws again.

The draw happens in `src/routes/+layout.ts`, not in a component, for two reasons. A universal load
runs on the server and its result is serialised into the page, so the client hydrates with the same
colour instead of flashing a second one. And touching `url.pathname` in that load registers the URL
as a dependency, so SvelteKit re-runs it on every navigation — without that line the load would run
once and the colour would stick for the whole session.

`+layout.svelte` writes the hue into a `<style>` in the head rather than onto the shell, because
the shell is capped at `--page` and the body paints everything outside it — a background set on the
shell would leave the margins the wrong colour on a wide screen. `data-tint` names the hue on the
shell, so which one you are looking at is legible in the inspector and assertable in a test.

To pin the site to one colour, replace `pickTint()` with a constant; `--hue` in `app.css` defaults
to 75, Lime, for anything the layout does not reach.

## Widths

All centred on one axis, in `src/app.css`:

- `--column` (38rem) — running text
- `--band` (44rem) — cards, decks, and the rules above each section
- `--page` (80rem) — the widest the page gets, and what a full-bleed plate spans
- `--gutter` (1rem) — the page's padding, on every edge, and the inset of a card on its plate
- `--gap` — space between cards in a deck, and `--stack` between sections. Not padding, so they
  keep their own measure rather than collapsing to 1rem with the page.

Tokens — the ratio, the tints, the radius — live at the top of the same file.

## Editing the content

No CMS. Text lives in `src/lib/content/`:

| File          | What it holds                                          |
| ------------- | ------------------------------------------------------ |
| `site.ts`     | Site name, nav, the manifesto clauses, the news notes   |
| `projects.ts` | One object per project — drives the index and the pages |
| `people.ts`   | One object per person — one card each                   |
| `about.ts`    | The About page                                          |
| `join.ts`     | Join copy and the list of disciplines                   |

Adding a project is one object in `projects.ts`; `/projects/<slug>` starts working immediately.

The project copy currently in the repo is a first draft — real text goes in the same shape.

## Join, auth and the database

`/join` is a progressively enhanced form action. Without JavaScript it posts, validates server-side
and re-renders with errors; with it, `use:enhance` keeps you in place.

Submitting creates a Better Auth account (email + password, auto sign-in) and a `membership` row
with what you make, where you are, and a link. Someone already signed in updates their row instead.
`?/signin` and `?/signout` handle coming back.

Schema is in `src/lib/server/db/schema.ts`: Better Auth's `user`, `session`, `account` and
`verification`, plus our `membership`. After changing it:

```sh
npm run db:generate   # write a migration into drizzle/
npm run db:migrate    # apply it (boot does this too)
npm run db:studio     # look at the data
```

Session cookies are `Secure` outside dev, so deploy behind HTTPS and set `ORIGIN` for the Node
adapter.

## Deploying

`npm run build` then `npm start` — the Node adapter's server, listening on `PORT` (3000 by
default). It needs `ORIGIN` set to the public URL or form posts fail their CSRF check.

The build precompresses static assets to `.br` and `.gz`, and the handler serves whichever the
client accepts — about a third of the original bytes for the CSS and JS. Fonts are left alone;
woff2 is already compressed. Server-rendered HTML is not covered, so leave compression on in
whatever sits in front, or the pages themselves go out uncompressed.
