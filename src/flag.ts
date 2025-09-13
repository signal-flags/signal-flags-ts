import { type FlagShape } from './design';

export interface Flag {
	/** Machine-readable name for use e.g. as a filename. */
	slug?: string;
	/** International Code of Signals or the Racing Rules of Sailing. */
	category: 'ics' | 'rrs';
	/** rectangle, pennant, triangle or swallowtail */
	shape: FlagShape;
	/** e.g. solid, diagonalQuarters... */
	design: string;
	/** Array of colours for the flag. */
	clrs: string[];
	/** For check designs n x n */
	n?: number;
}
