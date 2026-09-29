# Fonts

Two faces. Spectral is the display face — the wordmark, the titles on the
cards, the one pull quote. Areal is everything read at length: the column,
the navigation, and the tracked capitals on every small label.

## Spectral

From npm, imported in `src/routes/+layout.svelte`. Three files, and the list
is deliberate:

```
@fontsource/spectral/latin-400.css
@fontsource/spectral/latin-ext-400.css
@fontsource/spectral/latin-400-italic.css
```

- **400 only.** Every heading, card title and pull quote is 400. The 500 on
  the page belongs to the small labels, which are Areal.
- **Subsets, not the barrel.** `400.css` drags in Cyrillic, Cyrillic Extended
  and Vietnamese. Latin carries the English; Latin Extended carries the
  Nordic — the ä of Inlägg, the æ of Indlæg — which turns up in a Spectral
  heading on a project page.
- **The italic is Latin only.** It has one string in it, in three places: the
  wordmark in the bar, the one at the foot, and the outsized one on the About
  card. All three are the site name, which is ASCII. Set anything accented in
  italic and `latin-ext-400-italic.css` has to come back with it.

`@fontsource/spectral-sc` is gone. The small caps it was cut for were
replaced by tracked capitals in Areal, so the package had no reader.

## Areal

Licensed, and this repository is public — so the files are not in it, and
cannot be. That rules out `static/` as well: `static/` is copied into the
build, and a file that arrives after the build never reaches it.

They live on the volume instead, beside the database, and
`src/routes/fonts/[file]/+server.ts` reads them from there.

### The two files

| File                  | Weight | Used for                             |
| --------------------- | ------ | ------------------------------------ |
| `areal-regular.woff2` | 400    | Running text, navigation, captions   |
| `areal-medium.woff2`  | 500    | The tracked capitals on small labels |

No italic, no other weights. `font-synthesis: none` stops the browser
inventing either if something ever asks.

Rename what the foundry ships to exactly those two names, or edit the three
places that name a font file:

- `src/fonts.css` — the `src:` URLs
- `src/app.html` — the two `<link rel="preload">` tags
- `src/routes/fonts/[file]/+server.ts` — the `FONTS` whitelist

### Putting them there

Set `FONTS_DIR` to the directory. It defaults to `./data/fonts`, so an app
running out of `/app` reads `/app/data/fonts` with no configuration at all —
the same volume `DATABASE_URL` already points into.

Upload them the way the database file gets there. They persist across
deploys because the volume does, so this is once per environment rather than
once per release.

Locally: `mkdir -p data/fonts` and drop them in.

### What happens without them

The route 404s, the two preloads 404, `--font-sans` falls through to the
system grotesque, and everything else works. Nothing is sized in characters,
so the layout does not move when the real files arrive.

That graceful failure is the point. A missing licensed binary should cost
the texture of the type, not the deploy — which is why the fonts are not
resolved at build time. Under `src/`, Vite would fingerprint them and give
them an immutable cache, which is the better cache story and no use at all
when the file is absent by design.

The route asks for a week and revalidates with an ETag built from the file's
size and mtime, so replacing a cut under the same name is picked up rather
than cached forever.

### Preloading

`src/app.html` preloads both weights, because both are on every page — the
regular is the running text and the medium is every small label, so neither
is a speculative fetch. `crossorigin` is required even same-origin: a font is
fetched in CORS mode, and a preload without it is discarded and fetched again.

The route deliberately sends no `Access-Control-Allow-Origin`. A same-origin
request in CORS mode does not need one, and adding it would let any other
site link straight to a font licensed for this domain.

### Licensing

Check the licence covers web use and this domain before deploying. The files
are served to every visitor, so a desktop-only licence is not enough.
