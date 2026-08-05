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

| Card                 | Orientation | Where                                            |
| -------------------- | ----------- | ------------------------------------------------ |
| Page header          | Landscape   | Top of every page, carrying the nav              |
| A project            | Portrait    | `/projects`, and the bench on the front page     |
| A person             | Portrait    | About                                            |
| Related projects     | Portrait    | Foot of a project page                           |

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

One saturation, one lightness, a hue every 30°, offset by 15°. Twelve tints, `--tint-15` through
`--tint-345`, defined at the top of `src/app.css`:

```css
--tint-s: 80%;
--tint-l: 80%;
--tint-75: hsl(75 var(--tint-s) var(--tint-l)); /* Lime — the house colour */
```

12 × 30 = 360, so the wheel closes exactly: every neighbouring pair is the same distance apart,
including the wrap from 345 back to 15. The 15° offset is what puts 75 on the scale — the green
the site started from — rather than leaving it between two stops.

Each hue is named for the common colour it lands on at this saturation and lightness, checked
against the nearest CSS named colours by hue angle. The names live in `src/lib/tints.ts`; the CSS
tokens are numeric, because the hue is what the system is actually made of.

| Hue | | Name | Hue | | Name | Hue | | Name |
|---|---|---|---|---|---|---|---|---|
| 15° | `#f5b8a3` | Coral | 135° | `#a3f5b8` | Spring | 255° | `#b8a3f5` | Periwinkle |
| 45° | `#f5e0a3` | Butter | 165° | `#a3f5e0` | Mint | 285° | `#e0a3f5` | Lilac |
| 75° | `#e0f5a3` | **Lime** | 195° | `#a3e0f5` | Sky | 315° | `#f5a3e0` | Orchid |
| 105° | `#b8f5a3` | Apple | 225° | `#a3b8f5` | Cornflower | 345° | `#f5a3b8` | Rose |

Two properties follow from fixing s and l, and both are worth keeping:

- **Every tint clears 8.3:1 against the ink** (worst is 255°), so text is safe on any of them
  without checking. AAA at every hue.
- **No tint clears 2:1 against the paper** (1.05–1.93:1). They are for filling shapes. A tint will
  not hold as a hairline, a small mark, or a text colour on the page background.

Lime is the house colour — where the original green sat, and what `--card` falls back to.

### The shades

Each tint has a dark partner — less saturated, much darker, and colder. "Colder" is a direction,
not a sign: every hue moves 15° along the shorter arc towards the cold pole at 210°, a cyan-leaning
blue rather than pure blue, since 240 is already turning towards violet. The warm half climbs
towards yellow-green, the cool half falls towards blue. Sky and Cornflower sit either side of the
pole and both land on it, so they share a shade — the one place two tints have the same partner.

```css
--shade-s: 45%;
--shade-l: 25%;
--shade-75: hsl(90 var(--shade-s) var(--shade-l)); /* Lime's partner */
```

Tokens are named for the tint they partner, not for their own hue — `--shade-75` goes with
`--tint-75`. The rule lives in `colder()` in `src/lib/tints.ts`: `COLD_POLE` is where hues head
and `COLD_SHIFT` is how far, so both are one number each. Dropping the shift to 0 keeps every shade
on its tint's own hue.

| Tint | | Shade | | Contrast |
|---|---|---|---|---|
| Coral 15° | `#f5b8a3` | 0° | `#5c2323` | 7.13:1 |
| Butter 45° | `#f5e0a3` | 60° | `#5c5c23` | 5.34:1 |
| Lime 75° | `#e0f5a3` | 90° | `#405c23` | 6.40:1 |
| Apple 105° | `#b8f5a3` | 120° | `#235c23` | 6.33:1 |
| Spring 135° | `#a3f5b8` | 150° | `#235c40` | 6.09:1 |
| Mint 165° | `#a3f5e0` | 180° | `#235c5c` | 6.06:1 |
| Sky 195° | `#a3e0f5` | 210° | `#23405c` | 7.42:1 |
| Cornflower 225° | `#a3b8f5` | 210° | `#23405c` | 5.47:1 |
| Periwinkle 255° | `#b8a3f5` | 240° | `#23235c` | 6.54:1 |
| Lilac 285° | `#e0a3f5` | 270° | `#40235c` | 6.65:1 |
| Orchid 315° | `#f5a3e0` | 300° | `#5c235c` | 6.05:1 |
| Rose 345° | `#f5a3b8` | 330° | `#5c2340` | 6.11:1 |

Every pair clears AA at 5.32:1 or better, so a shade is safe as text on its own tint. Cards use it
as their ink — `color: var(--shade, var(--ink))` — so the type on a card belongs to the same colour
as the card. `.meta` mixes down from `currentColor` rather than the page ink, so it follows.

### One colour per page

A page draws a tint at random and every card on it shares that one — the header, the projects, the
people, the footer cards. Move to another page and it draws again.

The draw happens in `src/routes/+layout.ts`, not in a component, for two reasons. A universal load
runs on the server and its result is serialised into the page, so the client hydrates with the same
colour instead of flashing a second one. And touching `url.pathname` in that load registers the URL
as a dependency, so SvelteKit re-runs it on every navigation — without that line the load would run
once and the colour would stick for the whole session.

`+layout.svelte` puts it on the shell as `--card`, which every card reads, and names it in
`data-tint` so which one you are looking at is legible in the inspector and assertable in a test:

```svelte
<div class="shell" style="--card: hsl({data.tint.hue} …)" data-tint={data.tint.name}>
```

To pin the site to one colour, replace `pickTint()` with a constant; `--card` in `app.css` is still
`--tint-75` and takes over wherever the shell's value does not reach.

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
