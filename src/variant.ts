import { type DesignOptions } from './design';
import { type FlagFilter } from './get-svg';

export interface Variant {
	designOptions?: DesignOptions;
	filter?: FlagFilter;
}

const defaultVariant: Variant = {};

/** All squares are rectangles and in this variant all rectangles are squares. */
const square: Variant = {
	designOptions: {
		dimensions: {
			// Make `square` the default for rectangles and swallowtails.
			rectangle: { default: 'square' },
			swallowtail: { default: 'square' },
		},
	},
};

const short: Variant = {
	designOptions: {
		dimensions: {
			// Make `short` the default for pennants and triangles.
			pennant: { default: 'short' },
			triangle: { default: 'short' },
		},
	},
};

const long: Variant = {
	designOptions: {
		dimensions: {
			// Make `long` the default for pennants and rectangles/swallowtails.
			pennant: { default: 'long' },
			rectangle: { default: 'long' },
			swallowtail: { default: 'long' },
		},
	},
};

/** Hideous primary colours with no outlines which WikiPedia seems to like. */
const primary: Variant = {
	designOptions: {
		dimensions: {
			// Make `square` the default for rectangles and swallowtails.
			rectangle: { default: 'square' },
			swallowtail: { default: 'square' },
		},
		// Use the `primary` colour set.
		clrSet: 'primary',
		// No outlines.
		outline: false,
	},
	filter: ({ category }) => category === 'ics',
};

export const variants = {
	default: defaultVariant,
	square,
	short,
	long,
	primary,
};
