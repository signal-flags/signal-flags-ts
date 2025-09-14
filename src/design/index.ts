import { swallowtail } from './swallowtail';
import { rectangle } from './rectangle';
import { pennant } from './pennant';
import { triangle } from './triangle';

import { type Flag } from '../flag';

export type FlagShape = keyof typeof designs;

export interface BuildOptions {
	dimensions?: number[] | string;
	file?: boolean;
	dataUri?: boolean;
}

export interface DesignOptions {
	dimensions?: string | number[];
	outline?: number | boolean;
	clrSet?: string | Record<string, string>;
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

export const overrideDesignDimensions = (designSet: DesignSet, options: DesignOptions, flag: Flag) => {
	return (
			options.dimensions ?
			Array.isArray(options.dimensions) ?
				// If numerical dimensions are set in the options, use these.
				options.dimensions
				// If named dimensions are set in the options, use them if they exist for
				// the shape or the default.
			:	(designSet.dimensions[options.dimensions] ?? designSet.dimensions.default)
		: flag.dimensions ?
			Array.isArray(flag.dimensions) ?
				// If numerical dimensions are set in the flag, use these.
				flag.dimensions
				// If named dimensions are set in the flag, use them if they exist for
				// the shape or the default.
			:	(designSet.dimensions[flag.dimensions] ?? designSet.dimensions.default)
			// Otherwise just use the default!
		:	designSet.dimensions.default
	)
}

/**
 * Build the SVG for a flag.
 *
 * @param flag
 * @param design
 * @param options
 * @returns
 */
export const getSvg = (
	flag: Flag,
	designOptions: DesignOptions,
	options: BuildOptions,
): string => {
	// Holds the parts of the SVG.
	const parts = [];

	// Get the design for the flag.
	const designSet = designs[flag.shape];

	// Get the dimensions for this shape, using overrides set in the options or in
	// the flag specification.
	const dimensions = overrideDesignDimensions(designSet, designOptions, flag, )

	const [w, h] = dimensions;

	if (options.file || options.dataUri) {
		// Add the xml declaration for a file.
		parts.push('<?xml version="1.0" encoding="UTF-8" ?>');
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
	parts.push(options.file || options.dataUri ? '</svg>\n' : '</svg>');

	// Return the markup as a dataUri...
	if (options.dataUri) {
		// ? support %-encoding as an option, although it generates longer strings?
		// 'data:image/svg+xml;utf8,' + encodeURIComponent(...);
		return 'data:image/svg+xml;base64,' + toBase64(parts.join(''));
	}

	// ... or just plain text.
	return parts.join('');
};
