import {
	generateDefault,
	generateLong,
	generateSquare,
	generatePrimary,
	generateShort,
} from '../src/generate';
import { match2DP } from '../src/check';

describe('Default flags', () => {
	const flags = generateDefault();

	it('should have 56 designs', () => {
		expect(Object.entries(flags.svg).length).toBe(56);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(flags.svg)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 390 characters (except for Y )', () => {
		for (const [key, flag] of Object.entries(flags.svg)) {
			if (['y'].includes(key)) continue;
			expect(flag.length).toBeLessThan(390);
		}
	});

	test('Y should be 583 characters', () => {
		expect(flags.svg.y.length).toBe(583);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(flags.svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Square flags', () => {
	const flags = generateSquare();

	it('should have 56 designs', () => {
		expect(Object.entries(flags.svg).length).toBe(56);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(flags.svg)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 390 characters (except for Y)', () => {
		for (const [key, flag] of Object.entries(flags.svg)) {
			if (['y'].includes(key)) continue;
			expect(flag.length).toBeLessThan(390);
		}
	});

	test('Y should be 579 characters', () => {
		expect(flags.svg.y.length).toBe(579);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(flags.svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Short flags', () => {
	const flags = generateShort();

	it('should have 56 designs', () => {
		expect(Object.entries(flags.svg).length).toBe(56);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(flags.svg)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 390 characters (except for Y)', () => {
		for (const [key, flag] of Object.entries(flags.svg)) {
			if (['y'].includes(key)) continue;
			expect(flag.length).toBeLessThan(390);
		}
	});

	test('Y should be 583 characters', () => {
		expect(flags.svg.y.length).toBe(583);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(flags.svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Long flags', () => {
	const flags = generateLong();

	it('should have 11 designs', () => {
		expect(Object.entries(flags.svg).length).toBe(11);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(flags.svg)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 310 characters (except for AP)', () => {
		for (const [key, flag] of Object.entries(flags.svg)) {
			if (['ap'].includes(key)) continue;
			expect(flag.length).toBeLessThan(310);
		}
	});

	test('AP should be 389 characters', () => {
		expect(flags.svg.ap.length).toBe(389);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(flags.svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Primary flags', () => {
	const flags = generatePrimary();
	it('should have 41 designs', () => {
		expect(Object.entries(flags.svg).length).toBe(41);
	});

	it('should have no more than one decimal place in all values', () => {
		for (const flag of Object.values(flags.svg)) {
			const match = match2DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 290 characters (except for Y)', () => {
		for (const [key, flag] of Object.entries(flags.svg)) {
			if (['y'].includes(key)) continue;
			expect(flag.length).toBeLessThan(290);
		}
	});

	test('Y should be 469 characters', () => {
		expect(flags.svg.y.length).toBe(469);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(flags.svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});
