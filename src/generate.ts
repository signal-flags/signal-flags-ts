import { type Flag } from './flag';
import { flags as defaultFlagSet, type FlagSet } from './flag-set';

import { getSvg, type DesignOptions, type BuildOptions } from './design';
import { version, generator } from './meta';

export { getSvg };

export type FilterFunction = (flag: Flag) => boolean;

const getGenerateMeta = () => {
	return { generator, version, generated: new Date().toISOString() };
};

/**
 * Generate default svg for all flags.
 *
 * @param flags
 * @param design
 * @param build
 * @returns
 */
export const allSvg = (
	flags: FlagSet | null = defaultFlagSet,
	designOptions: DesignOptions | null = {},
	buildOptions: BuildOptions = {},
) => {
	flags = flags ?? defaultFlagSet;
	designOptions = designOptions ?? {};
	buildOptions = buildOptions ?? {};

	const all: Record<string, string> = {};
	for (const [key, flag] of Object.entries(flags)) {
		all[key] = getSvg(flag, designOptions, buildOptions);
	}
	return all;
};

/**
 * Generate svg for a filtered subset of flags in a set.
 *
 * @param flags Source flagset.
 * @param designOptions
 * @param buildOptions
 * @param filter Filter function.
 * @returns
 */
export const someSvg = (
	flags: FlagSet | null,
	designOptions: DesignOptions | null,
	buildOptions: BuildOptions | null,
	filter: FilterFunction,
) => {
	flags = flags ?? defaultFlagSet;
	designOptions = designOptions ?? {};
	buildOptions = buildOptions ?? {};

	const some: Record<string, string> = {};
	for (const [key, flag] of Object.entries(flags)) {
		if (!filter(flag)) continue;
		some[key] = getSvg(flag, designOptions, buildOptions);
	}
	return some;
};

/**
 * Generate default flags.
 * @param flags
 * @param buildOptions
 * @returns
 */
export const generateDefault = (
	flags: FlagSet | null = defaultFlagSet,
	buildOptions: BuildOptions = {},
) => {
	flags = flags ?? defaultFlagSet;
	const meta = getGenerateMeta();
	flags = flags ?? defaultFlagSet;
	const options: DesignOptions = {};
	const svg = allSvg(flags, options, buildOptions);
	return { meta, flags, options, svg };
};

/**
 * Generate all long pennants.
 *
 * @param flags
 * @param buildOptions
 * @returns
 */
export const generateLong = (
	flags: FlagSet | null = defaultFlagSet,
	buildOptions: BuildOptions = {},
) => {
	flags = flags ?? defaultFlagSet;
	const meta = getGenerateMeta();
	const options: DesignOptions = {
		dimensions: {
			// Make `long` the default for pennants and rectangles/swallowtails.
			pennant: { default: 'long' },
			rectangle: { default: 'long' },
			swallowtail: { default: 'long' },
		},
	};
	const svg = allSvg(flags, options, buildOptions);
	return { meta, flags, options, svg };
};

/**
 * Generate all short pennants.
 *
 * @param flags
 * @param buildOptions
 * @returns
 */
export const generateShort = (
	flags: FlagSet | null = defaultFlagSet,
	buildOptions: BuildOptions = {},
) => {
	flags = flags ?? defaultFlagSet;
	const meta = getGenerateMeta();
	const options: DesignOptions = {
		dimensions: {
			// Make `short` the default for pennants and triangles.
			pennant: { default: 'short' },
			triangle: { default: 'short' },
		},
	};
	const svg = allSvg(flags, options, buildOptions);
	return { meta, flags, options, svg };
};

/**
 * Generate all flags with square alphabet flags.
 * @param flags
 * @param buildOptions
 * @returns
 */
export const generateSquare = (
	flags: FlagSet | null = defaultFlagSet,
	buildOptions: BuildOptions = {},
) => {
	flags = flags ?? defaultFlagSet;
	const meta = getGenerateMeta();
	const options: DesignOptions = {
		dimensions: {
			// Make `square` the default for rectangles and swallowtails.
			rectangle: { default: 'square' },
			swallowtail: { default: 'square' },
		},
	};
	const svg = allSvg(flags, options, buildOptions);
	return { meta, flags, options, svg };
};

/**
 * Generate hideous primary coloured flags with no outlines which WikiPedia
 * seems to like.
 *
 * @param flags
 * @param buildOptions
 * @returns
 */
export const generatePrimary = (
	flags: FlagSet | null = defaultFlagSet,
	buildOptions: BuildOptions = {},
) => {
	flags = flags ?? defaultFlagSet;
	const meta = getGenerateMeta();
	const options: DesignOptions = {
		dimensions: {
			// Make `square` the default for rectangles and swallowtails.
			rectangle: { default: 'square' },
			swallowtail: { default: 'square' },
		},
		// Use the `primary` colour set.
		clrSet: 'primary',
		// No outlines.
		outline: false,
	};
	const svg = someSvg(
		flags,
		options,
		buildOptions,
		({ category }) => category === 'ics',
	);
	return { meta, flags, options, svg };
};
