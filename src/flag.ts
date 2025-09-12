import { type FlagShape } from './design';

export interface Flag {
  /** Human name for the flag. */
  name: string;
  /** International Code of Signals or the Racing Rules of Sailing. */
  category: 'ics' | 'rrs';
  /** Long version of the name e.g. Numeral 0. */
  longName?: string;
  /** rectangle, pennant, triangle or swallowtail */
  shape: FlagShape;
  /** e.g. solid, diagonalQuarters... */
  design: string;
  /** Array of colours for the flag. */
  clrs: string[];
  /** For check designs n x n */
  n?: number;
}
