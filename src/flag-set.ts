import { type Flag } from './flag';

export type FlagSet = Record<string, Flag>;

export const flagSet: FlagSet = {
  a: {
    name: 'A',
    category: 'ics',
    shape: 'swallowtail',
    design: 'vertical',
    clrs: ['white', 'blue'],
  },

  b: {
    name: 'B',
    category: 'ics',
    shape: 'swallowtail',
    design: 'solid',
    clrs: ['red'],
  },

  f: {
    name: 'F',
    category: 'ics',
    shape: 'rectangle',
    design: 'diamond',
    clrs: ['red', 'white'],
  },

  n1: {
    name: '1',
    longName: 'Numeral 1',
    category: 'ics',
    shape: 'pennant',
    design: 'circle',
    clrs: ['red', 'white'],
  },

  n2: {
    name: '2',
    longName: 'Numeral 2',
    category: 'ics',
    shape: 'pennant',
    design: 'circle',
    clrs: ['white', 'blue'],
  },

  ap: {
    name: 'AP',
    category: 'ics',
    longName: 'Answering Pennant',
    shape: 'pennant',
    design: 'vertical',

    clrs: ['red', 'white', 'red', 'white', 'red'],
  },

  black: {
    name: 'black',
    category: 'rrs',
    shape: 'rectangle',
    design: 'solid',
    clrs: ['black'],
  },

  blackAndWhite: {
    name: 'black and white',
    category: 'rrs',
    shape: 'rectangle',
    design: 'diagonalHalves',
    clrs: ['black', 'white'],
  },

  blue: {
    name: 'blue',
    category: 'rrs',
    shape: 'rectangle',
    design: 'solid',
    clrs: ['blue'],
  },

  green: {
    name: 'green',
    category: 'rrs',
    shape: 'rectangle',
    design: 'solid',
    clrs: ['green'],
  },

  greenAndWhite: {
    name: 'green and white',
    category: 'rrs',
    shape: 'rectangle',
    design: 'check',
    clrs: ['green', 'white'],
    n: 4,
  },

  orange: {
    name: 'orange',
    category: 'rrs',
    shape: 'rectangle',
    design: 'solid',
    clrs: ['orange'],
  },

  red: {
    name: 'red',
    category: 'rrs',
    shape: 'rectangle',
    design: 'solid',
    clrs: ['red'],
  },

  yellow: {
    name: 'yellow',
    category: 'rrs',
    shape: 'rectangle',
    design: 'solid',
    clrs: ['yellow'],
  },
};
