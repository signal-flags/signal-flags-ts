/**
 * @import {Variant} from './variant'
 */

import { getFlagSvg, type DesignOptions, type SvgOptions } from './design';
import { type Flag } from './flag';
import { variants } from './variant';
import { flags as defaultFlagSet, type FlagSet } from './flag-set';

export type FlagFilter = (flag: Flag) => boolean;

export interface AllSvgOptions {
	/** Name of a variant to use. */
	variant?: keyof typeof variants;
	/** Optional flag designs to use instead of the default. */
	flags?: FlagSet;
	/** Overrides for design elements (dimensions, colours). */
	designOptions?: DesignOptions;
	/** Options for the generated SVG (file, dataUri) */
	svgOptions?: SvgOptions;
	/** Filter function to exclude flags. */
	filter?: FlagFilter;
}

/**
 * Get SVG for a flag.
 *
 * @param {string} key The flag's key in the flagset.
 * @param {AllSvgOptions} [options={}] Options:
 * @param {FlagSet} [options.flags] Flagset to use instead of the default.
 * @param {keyof Variant} [options.variant] Named variant to use.
 * @param {DesignOptions} [options.designOptions] Design overrides.
 * @param {SvgOptions} [options.svgOptions] Options for 
 * @returns SVG for the flag.
 */
export const getSvg = (
	key: string,
	{ flags, variant, designOptions, svgOptions }: AllSvgOptions = {},
) => {
	flags = flags ?? defaultFlagSet;
	const flag = flags[key];
	return getFlagSvg(flag, { variant, designOptions, svgOptions });
};

/** Get SVG for all flags. */
export const allSvg = ({
	variant,
	flags,
	designOptions,
	svgOptions,
	filter,
}: AllSvgOptions = {}) => {
	flags = flags ?? defaultFlagSet;
	designOptions = designOptions ?? {};
	svgOptions = svgOptions ?? {};
	if (!filter && variant && variants[variant]?.filter) {
		filter = variants[variant].filter;
	}

	const all: Record<string, string> = {};
	for (const [key, flag] of Object.entries(flags)) {
		if (filter && !filter(flag)) continue;
		all[key] = getFlagSvg(flag, { variant, designOptions, svgOptions });
	}
	return all;
};
