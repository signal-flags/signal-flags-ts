import { getSvg } from '../../src/get-svg';

/*
export interface AllSvgOptions {
	variant?: keyof typeof variants;
	flags?: FlagSet;
	designOptions?: DesignOptions;
	svgOptions?: SvgOptions;
	filter?: FlagFilter;
}
*/

describe('getSvg', () => {
	it('should get the svg for a flag', () => {
		const svg = getSvg('a');
		expect(svg).toMatch(/svg viewBox="0 0 360 240"/);
	});

	describe('the variant option', () => {
		it('should get a named variant', () => {
			const svg = getSvg('a', { variant: 'square' });
			expect(svg).toMatch(/svg viewBox="0 0 240 240"/);
		});

		it('should get the default variant', () => {
			const svg = getSvg('a', { variant: 'default' });
			expect(svg).toMatch(/svg viewBox="0 0 360 240"/);
		});

		it('should throw for a nonexistent variant', () => {
			// @ts-expect-error invalid variant
			expect(() => getSvg('a', { variant: 'x' })).toThrow('Invalid variant');
			// @ts-expect-error invalid variant
			expect(() => getSvg('a', { variant: '' })).toThrow('Invalid variant');
			// @ts-expect-error invalid variant
			expect(() => getSvg('a', { variant: null })).toThrow('Invalid variant');
		});
	});
});
