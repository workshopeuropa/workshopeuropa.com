# Fonts

Spectral is installed from npm (`@fontsource/spectral`) and imported in
`src/routes/+layout.svelte`. It needs nothing here.

Areal is licensed, so its files are not in the repository and are not
fetched from a registry. Drop them in this directory and they are served
from `/fonts/…`, which is what `src/fonts.css` points at.

## What to put here

The design uses the **Semi Mono** cut of ABC Areal, in two weights:

| File                              | Weight | Used for                            |
| --------------------------------- | ------ | ----------------------------------- |
| `ABCArealSemiMono-Regular.woff2`  | 400    | Running text, navigation, captions  |
| `ABCArealSemiMono-Medium.woff2`   | 500    | Tracked capitals on the small labels |

Rename whatever the foundry ships to exactly those two names, or edit the
`src:` URLs in `src/fonts.css` to match what you have. `.woff2` only — every
browser the site targets reads it, and a second format is dead weight.

If what you have is the variable superfamily rather than the two static
cuts, `src/fonts.css` carries a commented-out `@font-face` for it. Uncomment
that one, delete the two static rules, and set the axis values that pin it
to the Semi Mono instance — the tag in there is a placeholder, not a value
to trust.

## Until then

The stack in `--font-sans` falls through to the system grotesque. The
measure, the tracking and the layout are all set in rem and em, so nothing
moves when the real files arrive — but Areal Semi Mono is a semi-monospace
and a grotesque is not, so the even colour the column is designed around
only shows up once the files are in place. Judge the typography after, not
before.

## Licensing

Check the licence covers web use and the domain before deploying. These
files are served to every visitor, so a desktop-only licence is not enough.
