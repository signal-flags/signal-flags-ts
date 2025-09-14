import { type Flag } from './flag';
import { flagSet as defaultFlagSet, type FlagSet } from './flag-set';

import { getSvg, type DesignOptions, type BuildOptions } from './design';

export { getSvg };

export type FilterFunction = (flag: Flag) => boolean;

/**
 * Generate svg for all flags in a set.
 *
 * @param flagSet
 * @param design
 * @param build
 * @returns
 */
export const allSvg = (
	flagSet: FlagSet = defaultFlagSet,
	design: DesignOptions = {},
	build: BuildOptions = {},
) => {
	const all: Record<string, string> = {};
	for (const [key, flag] of Object.entries(flagSet)) {
		all[key] = getSvg(flag, design, build);
	}
	return all;
};

/**
 * Generate svg for a filtered subset of flags in a set.
 *
 * @param flagSet Source flagset.
 * @param designOptions
 * @param buildOptions
 * @param filter Filter function.
 * @returns
 */
export const someSvg = (
	flagSet: FlagSet = defaultFlagSet,
	designOptions: DesignOptions = {},
	buildOptions: BuildOptions = {},
	filter: FilterFunction,
) => {
	const some: Record<string, string> = {};
	for (const [key, flag] of Object.entries(flagSet)) {
		if (!filter(flag)) continue;
		some[key] = getSvg(flag, designOptions, buildOptions);
	}
	return some;
};

export const generateLong = (
	flagSet: FlagSet = defaultFlagSet,
	buildOptions: BuildOptions = {},
) =>
	someSvg(
		flagSet,
		{
			dimensions: {
				// Make `long` the default for pennants.
				pennant: { default: 'long' },
			},
		},
		buildOptions,
		// Generate only pennants.
		({ shape }) => shape === 'pennant',
	);

export const generateSquare = (
	flagSet: FlagSet = defaultFlagSet,
	buildOptions: BuildOptions = {},
) =>
	allSvg(
		flagSet,
		{
			dimensions: {
				// Make `square` the default for rectangles.
				rectangle: { default: 'square' },
			},
		},
		buildOptions,
	);

export const generatePrimary = (
	flagSet: FlagSet = defaultFlagSet,
	buildOptions: BuildOptions = {},
) =>
	someSvg(
		flagSet,
		{
			dimensions: {
				// Make `square` the default for rectangles.
				rectangle: { default: 'square' },
			},
			// Use the `primary` colour set.
			clrSet: 'primary',
			// No outlines.
			outline: false,
		},
		// Generate only ics flags and pennants.
		buildOptions,
		({ category }) => category === 'ics',
	);
