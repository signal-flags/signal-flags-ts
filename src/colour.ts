export type ClrSet = {
	outline: string;
	black: string;
	blue: string;
	green: string;
	red: string;
	yellow: string;
	white: string;
	orange: string;
};

export const clrSets: Record<string, ClrSet> = {
	default: {
		outline: '#000', // The default outline is true black.
		black: '#2d2926', // Pantone Black C
		blue: '#005eb8', // Pantone 300 C
		// Consider the Irish flag colours Pantone 347 C #009a44 or 347 U #169b62.
		green: '#00965e', // Pantone 340 C
		red: '#c8102e', // Pantone 186 C
		// yellow: '#ffd100', // Pantone 109 C
		yellow: '#ffea00', // From ICS
		white: '#f5f5f5',
		// Consider the Irish flag colours Pantone 151 C #ff8200 or 347 U #ff883e.
		// orange: '#e37017', // Arithmetical mean red and yellow best in 'tests'.
		orange: '#e37d17', // Arithmetical mean red and yellow best in 'tests'.
	},

	primary: {
		outline: '#000',
		black: '#000',
		blue: '#00f',
		green: '#0f0',
		red: '#f00',
		yellow: '#ff0',
		white: '#fff',
		orange: '#ffa500', // HTML orange.
	},
};

/**
 * Get a colour value.
 *
 * @param name
 * @param colourSet
 * @returns
 */
export const getColour = (
	name: keyof ClrSet | string,
	colourSet?: keyof typeof clrSets | Record<string, string>,
): string => {
	if (name === 'outline') {
		if (!colourSet) return clrSets.default.outline;
		if (typeof colourSet === 'string') {
			if (clrSets[colourSet]) return clrSets[colourSet].outline;
			return colourSet;
		}
		return colourSet.outline;
	}
	// If no colourSet is provided, use the default colourSet.
	if (!colourSet) return clrSets.default[name as keyof ClrSet] ?? name;
	// If colourSet is a string, use it to index colourSets.
	if (typeof colourSet === 'string') {
		if (clrSets[colourSet])
			return clrSets[colourSet][name as keyof ClrSet] ?? name;
		return colourSet;
	}
	return colourSet[name];
};
