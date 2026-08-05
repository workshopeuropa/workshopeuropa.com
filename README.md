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
