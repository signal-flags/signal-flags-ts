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

	c: {
		category: 'ics',
		shape: 'rectangle',
		design: 'horizontal',
		clrs: ['blue', 'white', 'red', 'white', 'blue'],
	},

	d: {
		category: 'ics',
		shape: 'rectangle',
		design: 'horizontal',
		clrs: ['yellow', 'blue', 'yellow'],
		widths: [1, 3, 1],
	},

	e: {
		category: 'ics',
		shape: 'rectangle',
		design: 'horizontal',
		clrs: ['blue', 'red'],
	},

	f: {
		category: 'ics',
		shape: 'rectangle',
		design: 'diamond',
		clrs: ['red', 'white'],
	},

	g: {
		category: 'ics',
		shape: 'rectangle',
		design: 'vertical',
		clrs: ['yellow', 'blue','yellow', 'blue','yellow', 'blue',],
	},

	h: {
		category: 'ics',
		shape: 'rectangle',
		design: 'vertical',
		clrs: ['white', 'red'],
	},

	i: {
		category: 'ics',
		shape: 'rectangle',
		design: 'circle',
		clrs: ['black', 'yellow'],
	},

	
	j: {
		category: 'ics',
		shape: 'rectangle',
		design: 'horizontal',
		clrs: ['blue', 'white', 'blue'],
	},

	
	k: {
		category: 'ics',
		shape: 'rectangle',
		design: 'vertical',
		clrs: ['yellow', 'blue'],
	},

	
	l: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'check',
		clrs: ['yellow', 'black'],
		n: 2,
	},
	
	n: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'check',
		clrs: ['blue', 'white'],
		n: 4,
	},

	o: {
		category: 'ics',
		shape: 'rectangle',
		design: 'diagonalHalves',
		clrs: ['red', 'yellow'],
	},

	p: {
		category: 'ics',
		shape: 'rectangle',
		design: 'border',
		clrs: ['white', 'blue'],
	},

	q: {
		category: 'ics',
		shape: 'rectangle',
		design: 'solid',
		clrs: ['yellow'],
	},

	s: {
		category: 'ics',
		shape: 'rectangle',
		design: 'border',
		clrs: ['blue', 'white'],
	},
	
		t: {
		category: 'ics',
		shape: 'rectangle',
		design: 'vertical',
		clrs: ['red','white', 'blue'],
	},

	u: {
		category: 'rrs',
		shape: 'rectangle',
		design: 'check',
		clrs: ['red', 'white'],
		n: 2,
	},

	w: {
		category: 'ics',
		shape: 'rectangle',
		design: 'border',
		clrs: ['red', 'white', 'blue'],
	},

				n0: {
		category: 'ics',
		shape: 'pennant',
		design: 'vertical',
		clrs: ['yellow','red', 'yellow'],
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

			n3: {
		category: 'ics',
		shape: 'pennant',
		design: 'vertical',
		clrs: ['red','white', 'blue'],
	},
	
	n5: {
		category: 'ics',
		shape: 'pennant',
		design: 'vertical',
		clrs: ['yellow', 'blue'],
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
};
