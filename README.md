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

Available classes inside a card: `eyebrow`, `title`, `title--small`, `subtitle`, `meta`, `prose`,
`italic`. `Deck.svelte` lays cards out — 1, 2 or 3 columns, collapsing to one on small screens, and
centring rather than leaving a hole when there are fewer cards than columns.

## Plates

`Plate.svelte` is the interplay between a card and an image: a portrait image at the same ratio,
with a landscape card sitting on top of it.

```svelte
<Plate src={project.image.src} alt={project.image.alt} align="end">
	<HeaderCard title={project.title} subtitle={project.subtitle} />
</Plate>
```

`align` puts the card in the middle of the image or near its foot; `inset` (default `0.86`) is how
much of the plate's width the card takes. The front page and every project page with an image use
one.

The images in `static/media/` are placeholder screenshots — drop real ones in at the same 1 : √2
proportion and point `image` at them in `projects.ts`.

## Colour

One saturation, one lightness, a hue every 24°. Fifteen tints, `--tint-0` through `--tint-336`,
defined at the top of `src/app.css`:

```css
--tint-s: 80%;
--tint-l: 80%;
--tint-72: hsl(72 var(--tint-s) var(--tint-l));
```

15 × 24 = 360, so the wheel closes exactly: every neighbouring pair is the same distance apart,
including the wrap from 336 back to 0.

Each hue is named for the common colour it lands on at this saturation and lightness, checked
against the nearest CSS named colours by hue angle. The names live in `src/lib/tints.ts`; the CSS
tokens are numeric, because the hue is what the system is actually made of.

| Hue | | Name | Hue | | Name | Hue | | Name |
|---|---|---|---|---|---|---|---|---|
| 0° | `#f5a3a3` | Rose | 120° | `#a3f5a3` | Green | 240° | `#a3a3f5` | Periwinkle |
| 24° | `#f5c4a3` | Peach | 144° | `#a3f5c4` | Mint | 264° | `#c4a3f5` | Lilac |
| 48° | `#f5e4a3` | Butter | 168° | `#a3f5e4` | Turquoise | 288° | `#e4a3f5` | Mauve |
| 72° | `#e4f5a3` | **Lime** | 192° | `#a3e4f5` | Sky | 312° | `#f5a3e4` | Orchid |
| 96° | `#c4f5a3` | Chartreuse | 216° | `#a3c4f5` | Cornflower | 336° | `#f5a3c4` | Pink |

Lime is the house colour — where the original green already sat, and what `--card` falls back to.

Two properties follow from fixing s and l, and both are worth keeping:

- **Every tint clears 7.9:1 against the ink** (worst is 240°), so text is safe on any of them
  without checking. AAA at every hue.
- **No tint clears 2:1 against the paper** (1.05–1.97:1). They are for filling shapes. A tint will
  not hold as a hairline, a small mark, or a text colour on the page background.

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
`--tint-72` and takes over wherever the shell's value does not reach.

## Widths

Three of them, all centred on one axis, in `src/app.css`:

- `--column` (38rem) — running text
- `--band` (44rem) — cards, decks, and the rules above each section
- plates cap at 32rem, narrower than the band, so a hero never dominates

Tokens — the ratio, the greens, the radius — live at the top of the same file.

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
