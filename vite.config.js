import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/signal-flags.ts'),
			formats: ['es', 'iife'],
			name: 'SignalFlags',
		},
		rollupOptions: {},
		sourcemap: true,
	},

	test: {
		include: ['{src,test}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		globals: true,
	},
});
