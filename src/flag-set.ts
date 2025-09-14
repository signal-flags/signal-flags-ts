import { type Flag } from './flag';

export type FlagSet = Record<string, Flag>;

export const flagSet: FlagSet = {
	a: {
		category: 'ics',
		shape: 'swallowtail',
		design: 'vertical',
		clrs: ['white', 'blue'],
	},

	b: {
		category: 'ics',
		shape: 'swallowtail',
		design: 'solid',
		clrs: ['red'],
	},

	f: {
		category: 'ics',
		shape: 'rectangle',
		design: 'diamond',
		clrs: ['red', 'white'],
	},

	n1: {
		category: 'ics',
		shape: 'pennant',
		design: 'circle',
		clrs: ['red', 'white'],
	},

	n2: {
		category: 'ics',
		shape: 'pennant',
		design: 'circle',
		clrs: ['white', 'blue'],
	},

	ap: {
		category: 'ics',
		shape: 'pennant',
		design: 'vertical',

		clrs: ['red', 'white', 'red', 'white', 'red'],
	},

		s3: {
		category: 'ics',
		shape: 'triangle',
		design: 'horizontal',

		clrs: ['white', 'black', 'white'],
	},

	black: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['black'],
	},

	blackAndWhite: {
		slug: 'black-and-white',
		category: 'rrs',
		shape: 'rectangle',
		design: 'diagonalHalves',
		clrs: ['black', 'white'],
	},

	blue: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['blue'],
	},

	green: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['green'],
	},

	greenAndWhite: {
		slug: 'green-and-white',
		category: 'rrs',
		shape: 'rectangle',
		design: 'check',
		clrs: ['green', 'white'],
		n: 4,
	},

	orange: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['orange'],
	},

	red: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['red'],
	},

	yellow: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['yellow'],
	},

	blackAndWhiteCheck: {
		slug: 'black-and-white-check',
		category: 'beach',
		shape: 'rectangle',
		design: 'check',
		clrs: ['black', 'white'],
		n: 2,
	},

	purple: {
		category: 'beach',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['purple'],
	},

	redAndYellow: {
		slug: 'red-and-yellow',
		category: 'beach',
		shape: 'rectangle',
		design: 'horizontal',
		clrs: ['red', 'yellow'],
	},

	redAndYellowDiagonal: {
		slug: 'red-and-yellow-diagonal',
		category: 'beach',
		shape: 'rectangle',
		design: 'diagonalHalves',
		clrs: ['red', 'yellow'],
	},
};
