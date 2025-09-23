import { allSvg } from '../src/get-svg';
import { match3DP, match4DP, match5DP } from '../src/check';

describe('Default flags', () => {
	const svg = allSvg();

	it('should have 56 designs', () => {
		expect(Object.entries(svg).length).toBe(56);
	});

	it('should have no more than two decimal places in all values', () => {
		for (const flag of Object.values(svg)) {
			const match = match3DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 330 characters (except for G, Y and AP )', () => {
		for (const [key, flag] of Object.entries(svg)) {
			if (['g', 'y', 'ap'].includes(key)) continue;
			expect(flag.length).toBeLessThan(330);
		}
	});

	test('G should be 382 characters', () => {
		expect(svg.g.length).toBe(382);
	});

	test('Y should be 583 characters', () => {
		expect(svg.y.length).toBe(583);
	});

	test('AP should be 386 characters', () => {
		expect(svg.ap.length).toBe(386);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Square flags', () => {
	const svg = allSvg({ variant: 'square' });

	it('should have 56 designs', () => {
		expect(Object.entries(svg).length).toBe(56);
	});

	it('should have no more than two decimal places in all values', () => {
		for (const flag of Object.values(svg)) {
			const match = match3DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 330 characters (except for G, Y and AP )', () => {
		for (const [key, flag] of Object.entries(svg)) {
			if (['g', 'y', 'ap'].includes(key)) continue;
			expect(flag.length).toBeLessThan(330);
		}
	});

	test('G should be 379 characters', () => {
		expect(svg.g.length).toBe(379);
	});

	test('Y should be 579 characters', () => {
		expect(svg.y.length).toBe(579);
	});

	test('AP should be 386 characters', () => {
		expect(svg.ap.length).toBe(386);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Short flags', () => {
	const svg = allSvg({ variant: 'short' });

	it('should have 56 designs', () => {
		expect(Object.entries(svg).length).toBe(56);
	});

	it('should have no more than three decimal places in all values', () => {
		for (const flag of Object.values(svg)) {
			const match = match4DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 330 characters (except for G, Y and AP )', () => {
		for (const [key, flag] of Object.entries(svg)) {
			if (['g', 'y', 'ap'].includes(key)) continue;
			expect(flag.length).toBeLessThan(330);
		}
	});

	test('G should be 382 characters', () => {
		expect(svg.g.length).toBe(382);
	});

	test('Y should be 583 characters', () => {
		expect(svg.y.length).toBe(583);
	});

	test('AP should be 386 characters', () => {
		expect(svg.ap.length).toBe(386);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Long flags', () => {
	const svg = allSvg({ variant: 'long' });

	it('should have 56 designs', () => {
		expect(Object.entries(svg).length).toBe(56);
	});

	it('should have no more than three decimal places in all values except n0, n4 and n8', () => {
		for (const [key, flag] of Object.entries(svg)) {
			if (['n4', 'n8'].includes(key)) continue;
			const match = match4DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should have no more than four decimal places in n4 and n8', () => {
		expect(match5DP(svg.n4)).toBe(null);
		expect(match5DP(svg.n8)).toBe(null);
	});

	it('should be less than 331 characters (except for G, Y and AP )', () => {
		for (const [key, flag] of Object.entries(svg)) {
			if (['g', 'y', 'ap'].includes(key)) continue;
			expect(flag.length).toBeLessThan(331);
		}
	});

	test('G should be 382 characters', () => {
		expect(svg.g.length).toBe(382);
	});

	test('Y should be 583 characters', () => {
		expect(svg.y.length).toBe(583);
	});

	test('AP should be 389 characters', () => {
		expect(svg.ap.length).toBe(389);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});

describe('Primary flags', () => {
	const svg = allSvg({ variant: 'primary' });

	it('should have 41 designs', () => {
		expect(Object.entries(svg).length).toBe(41);
	});

	it('should have no more than two decimal places in all values', () => {
		for (const flag of Object.values(svg)) {
			const match = match3DP(flag);
			expect(match).toBe(null);
		}
	});

	it('should be less than 330 characters (except for G, Y and AP )', () => {
		for (const [key, flag] of Object.entries(svg)) {
			if (['g', 'y', 'ap'].includes(key)) continue;
			expect(flag.length).toBeLessThan(330);
		}
	});

	test('G should be 281 characters', () => {
		expect(svg.g.length).toBe(281);
	});

	test('Y should be 469 characters', () => {
		expect(svg.y.length).toBe(469);
	});

	test('AP should be 280 characters', () => {
		expect(svg.ap.length).toBe(280);
	});

	it('should be on a single line', () => {
		for (const flag of Object.entries(svg)) {
			expect(flag.indexOf('\n')).toBe(-1);
		}
	});
});
