import { variants } from '../../src/variant';

describe('variants', () => {
	it('should have the correct keys', () => {
		expect(Object.keys(variants).sort()).toEqual([
			'default',
			'long',
			'primary',
			'short',
			'square',
		]);
	});
});
