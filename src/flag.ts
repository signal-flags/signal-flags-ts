import { type FlagShape } from './design';

export interface Flag {
	/** Machine-readable name for use e.g. as a filename. */
	slug?: string;
	/** International Code of Signals or the Racing Rules of Sailing. */
	category: 'ics' | 'rrs' | 'naval-numeral' | 'beach';
	/** rectangle, pennant, triangle or swallowtail */
	shape: FlagShape;
	/** Force a card shape for plus/minus/toPort/toStarboard, also to force square
	 * for some naval numerals? */
	dimensions?: 'default' | 'long' | 'square' | 'card';
	/** e.g. solid, diagonalQuarters... */
	design: string;
	/** Array of colours for the flag. */
	clrs: string[];
	/** For check designs n x n. */
	n?: number;
	/** For variable-width stripes. */
	widths?: number[];
}
