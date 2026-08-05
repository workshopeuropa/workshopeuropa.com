import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// precompress writes .br and .gz beside every static asset at build
		// time; the node handler serves them when the client accepts them.
		adapter: adapter({ precompress: true })
	}
};

export default config;
