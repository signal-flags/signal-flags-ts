import { swallowtail } from './swallowtail';
import { rectangle } from './rectangle';
import { pennant } from './pennant';
import { triangle } from './triangle';

import { type Flag } from '../flag';
import { variants } from '../variant';

import { clrSets } from '../colour';

export type FlagShape = keyof typeof designs;

export interface FlagSvgOptions {
	variant?: keyof typeof variants;
	designOptions?: DesignOptions;
	svgOptions?: SvgOptions;
}

export interface SvgOptions {
	dimensions?: number[] | string;
	file?: boolean;
	dataUri?: boolean;
}

export interface DesignOptions {
	/** Override dimensions. */
	dimensions?: Record<string, Record<string, string | number[]>>;
	/** Add an outline with default or specified width. */
	outline?: number | boolean;
	/** Use a named colourset or provide overrides. */
	clrSet?: keyof typeof clrSets | Record<string, string>;
}

export interface DesignSettings {
	dimensions: number[];
	outline: number | false;
	clrSet?: string | Record<string, string>;
}

export type DrawFunction = (flag: Flag, options: DesignSettings) => string;
export type OutlineFunction = (options: DesignSettings) => string;

export interface DesignSet {
	dimensions: Record<string, number[]>;
	outline: OutlineFunction;
	designs: Record<string, DrawFunction>;
}

const designs = {
	swallowtail,
	rectangle,
	pennant,
	triangle,
};

// Ponyfill for btoa in node.
const toBase64 =
	typeof btoa === 'undefined' ?
		(b: string) => Buffer.from(b).toString('base64')
	:	btoa;

export const defaultDimensions = {
	rectangle: rectangle.dimensions,
	swallowtail: swallowtail.dimensions,
	pennant: pennant.dimensions,
	triangle: triangle.dimensions,
};

/**
 * Get the numerical dimensions from a complicated series of potential
 * overrides.
 *
 * @param designSet
 * @param options
 * @param flag
 * @returns
 */
export const getNumericalDimensions = (
	designSet: DesignSet,
	options: DesignOptions,
	flag: Flag,
): number[] => {
	// If the flag has its own dimensions (e.g. `card` for the `decrease` flag)
	// start with these, otherwise use `default`.
	const flagDimensions = flag.dimensions ?? 'default';
	// Are there any dimensions options set for this shape?
	if (options.dimensions?.[flag.shape]) {
		// Get any dimensions option set for the flag's dimensions.
		const setDimensions = options.dimensions[flag.shape][flagDimensions];
		// If there is an override, use this (either the actual numbers or the
		// numbers from the definition in the design set).
		if (setDimensions) {
			return Array.isArray(setDimensions) ? setDimensions : (
					designSet.dimensions[setDimensions]
				);
		}
	}
	// There are no options set, return the default dimensions for this flag.
	return designSet.dimensions[flagDimensions];
};

/**
 * Build the SVG for a flag.
 *
 * @param flag
 * @param design
 * @param options
 * @returns
 */
export const getFlagSvg = (
	flag: Flag,
	options: FlagSvgOptions = {},
): string => {
	let { svgOptions } = options;
	// Merge the design options.

	if (options.variant !== undefined && !variants[options.variant]) {
		throw new Error('Invalid variant');
	}
	const variant = options.variant && variants[options.variant];

	const designOptions: DesignOptions =
		variant?.designOptions ?
			{ ...variant.designOptions, ...options.designOptions }
		:	{ ...options.designOptions };

	// Holds the parts of the SVG.
	const parts = [];

	// Get the design for the flag.
	const designSet = designs[flag.shape];

	// Get the dimensions for this shape, using overrides set in the options or in
	// the flag specification.
	const dimensions = getNumericalDimensions(designSet, designOptions, flag);

	const [w, h] = dimensions;

	svgOptions = svgOptions ?? {};
	if (svgOptions.file || svgOptions.dataUri) {
		// Add the xml declaration for a file.
		parts.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
		parts.push(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">`,
		);
	} else {
		// Just the svg tag for a DOM node (the xmlms attribute is not required in
		// HTML 5).
		parts.push(`<svg viewBox="0 0 ${w} ${h}">`);
	}

	// Note that some flags (F) need to know about the outline.
	const defaultOutline = 1;
	const outline =
		designOptions.outline === true ?
			defaultOutline
		:	(designOptions.outline ?? defaultOutline);
	const settings: DesignSettings = {
		outline,
		clrSet: designOptions.clrSet,
		dimensions,
	};

	const designFn = designSet.designs[flag.design];

	if (typeof designFn !== 'function') {
		throw new Error(
			`Design "${flag.design}" does not exist for shape "${flag.shape}"`,
		);
	}

	parts.push(designSet.designs[flag.design](flag, settings));
	// Draw the outline.
	if (outline) {
		parts.push(designSet.outline(settings));
	}

	// Close the svg element with or without a final newline.
	parts.push(svgOptions.file || svgOptions.dataUri ? '</svg>\n' : '</svg>');

	// Return the markup as a dataUri...
	if (svgOptions.dataUri) {
		// ? support %-encoding as an option, although it generates longer strings?
		// 'data:image/svg+xml;utf8,' + encodeURIComponent(...);
		return 'data:image/svg+xml;base64,' + toBase64(parts.join(''));
	}

	// ... or just plain text.
	return parts.join('');
};
