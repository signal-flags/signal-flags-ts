import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';

import vitest from '@vitest/eslint-plugin';

export default defineConfig([
	globalIgnores(['dist/**/*']),
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	tseslint.configs.recommended,
	{
		files: ['**/*.json'],
		ignores: ['**/package-lock.json'],
		plugins: { json },
		language: 'json/json',
		extends: ['json/recommended'],
	},
	{
		files: ['**/tsconfig*.json', '**/*.jsonc'],
		plugins: { json },
		language: 'json/jsonc',
		extends: ['json/recommended'],
	},
	{
		// update this to match your test files
		files: ['**/*.spec.js', '**/*.test.js'],
		plugins: {
			vitest,
		},
		rules: {
			...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
		},
		languageOptions: {
			globals: {
				...vitest.environments.env.globals,
			},
		},
	},
]);
