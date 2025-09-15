import { allSvg, generateLong, generateSquare } from '../src/generate';
import { match2DP } from '../src/check';

const flags = allSvg();
const longFlags = generateLong();
const squareFlags = generateSquare();

describe('Default flags', () => {
	it('should have 56 designs', () => {
		expect(Object.entries(flags).length).toBe(56);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(flags)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 390 characters (except for y)', () => {
		for (const [key, flag] of Object.entries(flags)) {
			if (['y'].includes(key)) continue;
			expect(flag.length).toBeLessThan(390);
		}
	});

	test('y should be 583 characters', () => {
		expect(flags.y.length).toBe(583);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(flags)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Square flags', () => {
	it('should have 56 designs', () => {
		expect(Object.entries(squareFlags).length).toBe(56);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(squareFlags)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 390 characters (except for Y)', () => {
		for (const [key, flag] of Object.entries(squareFlags)) {
			if (['y'].includes(key)) continue;
			expect(flag.length).toBeLessThan(390);
		}
	});

	test('Y should be 579 characters', () => {
		expect(squareFlags.y.length).toBe(579);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(squareFlags)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Long flags', () => {
	it('should have 11 designs', () => {
		expect(Object.entries(longFlags).length).toBe(11);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(longFlags)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 310 characters (except for AP)', () => {
		for (const [key, flag] of Object.entries(longFlags)) {
			if (['ap'].includes(key)) continue;
			expect(flag.length).toBeLessThan(310);
		}
	});

	test('AP should be 389 characters', () => {
		expect(longFlags.ap.length).toBe(389);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(longFlags)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});
