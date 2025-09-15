import * as pkg from '../package.json';
import { generator, version } from '../src/meta';

describe('Package metadata', () => {
	test('version should match package.json', () => {
		expect(version).toBe(pkg.version);
	});
	test('generatpr should match package.homepage', () => {
		expect(generator).toBe(pkg.homepage);
	});
});
