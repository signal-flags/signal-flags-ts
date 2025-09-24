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
			rectangle: { default: [240, 240] },
			swallowtail: { default: [240, 240, 60] },
			pennant: { default: [480, 180, 60] },
			triangle: { default: [336, 240] },
		},
	},
};

const ics: Variant = {
	designOptions: {
		dimensions: {
			rectangle: { default: [288, 240] },
			swallowtail: { default: [288, 240, 72] },
			pennant: { default: [450, 140, 50] },
			triangle: { default: [336, 240] },
		},
	},
};

const alternative: Variant = {
	designOptions: {
		dimensions: {
			rectangle: { default: [320, 240] },
			swallowtail: { default: [320, 240, 80] },
			pennant: { default: [360, 180, 60] },
			triangle: { default: [320, 240] },
		},
	},
};

/** Hideous primary colours with no outlines which WikiPedia seems to like. */
const primary: Variant = {
	designOptions: {
		dimensions: {
			rectangle: { default: [240, 240] },
			swallowtail: { default: [240, 240, 60] },
			pennant: { default: [480, 180, 60] },
			triangle: { default: [336, 240] },
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
	ics,
	alternative,
	primary,
};
