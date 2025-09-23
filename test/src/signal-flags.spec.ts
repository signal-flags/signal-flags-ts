import * as SignalFlags from '../../src/signal-flags';

import * as pkg from '../../package.json';

const api = ['allSvg', 'flags', 'getFlagSvg', 'getSvg', 'variants', 'version'];

describe('The entry point', () => {
	it('should only expose the public API', () => {
		expect(Object.keys(SignalFlags).sort()).toEqual(api);
	});

	it('should expose the correct version', () => {
		expect(SignalFlags.version).toBe(pkg.version);
	});
});
