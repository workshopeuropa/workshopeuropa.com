import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// better-sqlite3 is a native module — keep it out of the dep optimizer.
	optimizeDeps: {
		exclude: ['better-sqlite3']
	}
});
