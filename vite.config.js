import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/signal-flags.ts'),
			formats: ['es', 'iife'],
			name: 'SignalFlags',
		},
		sourcemap: true,
	},

	test: {
		include: ['{src,test}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		globals: true,
		coverage: {
			include: ['src'],
		},
	},
});
