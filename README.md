# Workshop Europa

Source for [workshopeuropa.com](https://workshopeuropa.com), the website of an independent, non-profit association building open-source digital infrastructure.

Built with SvelteKit, Svelte 5, TypeScript, and plain CSS. Uses Bun for package management.

## Setup

```sh
bun install
cp .env.example .env
```

Set `BETTER_AUTH_SECRET` in `.env` and review the other example settings.

## Checks and production build

```sh
bun run check
bun run build
bun run start
```

For production, set `ORIGIN` and `BETTER_AUTH_URL` to the site's public URL.

## Contributing

Issues and pull requests are welcome. Page content lives in `src/lib/content`, routes in `src/routes`, and shared components in `src/lib/components`. Translation messages live in `messages`.

Use Svelte 5 syntax and plain CSS, and run `bun run check` before submitting changes.
