import adapter from '@eslym/sveltekit-adapter-bun'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ bundler: 'bun', precompress: true })
	}
}

export default config
