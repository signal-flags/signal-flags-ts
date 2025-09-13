import { swallowtail } from './swallowtail';
import { rectangle } from './rectangle';
import { pennant } from './pennant';

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
};

// Ponyfill for btoa in node.
const toBase64 =
	typeof btoa === 'undefined'
		? (b: string) => Buffer.from(b).toString('base64')
		: btoa;

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
	design: DesignOptions,
	options: BuildOptions,
): string => {
	// Holds the parts of the SVG.
	const parts = [];

	// Get the design for the flag.
	const designSet = designs[flag.shape];

	// Get the dimensions for this shape.
	// const [w, h] = Array.isArray(shape)
	//   ? shape
	//   : (shape && draw.size[shape]) || draw.size.default;
	const dimensions = Array.isArray(design.dimensions)
		? design.dimensions
		: (designSet.dimensions[design.dimensions ?? 'default'] ??
			designSet.dimensions.default);

	// Add the declaration and outer <svg> element.
	const [w, h] = dimensions;
	if (options.file || options.dataUri) {
		// Add the xml declaration for a file.
		parts.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
		parts.push(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">`,
		);
	} else {
		// Just the svg tag for a DOM node.
		parts.push(`<svg viewBox="0 0 ${w} ${h}">`);
	}

	// Add the tags for each part of the design.
	// shape.designs[flag.design](part) => {
	// Remember some flags (F) need to know about the outline.
	// parts.push(draw[part[0]](part, { w, h, colors, outline }));
	// });

	const defaultOutline = 1;
	const outline =
		design.outline === true
			? defaultOutline
			: (design.outline ?? defaultOutline);
	const settings: DesignSettings = {
		outline,
		clrSet: design.clrSet,
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
