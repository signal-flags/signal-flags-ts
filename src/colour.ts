export type ColourSet = {
	outline: string;
	black: string;
	blue: string;
	green: string;
	red: string;
	yellow: string;
	white: string;
	orange: string;
};

const colourSets: Record<string, ColourSet> = {
	default: {
		outline: '#000', // The default outline is true black.
		black: '#2d2926', // Pantone Black C
		blue: '#005eb8', // Pantone 300 C
		// Consider the Irish flag colours Pantone 347 C #009a44 or 347 U #169b62.
		green: '#00965e', // Pantone 340 C
		red: '#c8102e', // Pantone 186 C
		yellow: '#ffd100', // Pantone 109 C
		white: '#f5f5f5',
		// Consider the Irish flag colours Pantone 151 C #ff8200 or 347 U #ff883e.
		orange: '#e37017', // Arithmetical mean red and yellow best in 'tests'.
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
	name: string,
	colourSet?: keyof typeof colourSets | Record<string, string>,
): string => {
	if (name === 'outline') {
		if (!colourSet) return colourSets.default.outline;
		if (typeof colourSet === 'string') {
			if (colourSets[colourSet]) return colourSets[colourSet].outline;
			return colourSet;
		}
		return colourSet.outline;
	}
	// If no colourSet is provided, use the default colourSet.
	if (!colourSet) return colourSets.default[name as keyof ColourSet] ?? name;
	// If colourSet is a string, use it to index colourSets.
	if (typeof colourSet === 'string') {
		if (colourSets[colourSet])
			return colourSets[colourSet][name as keyof ColourSet] ?? name;
		return colourSet;
	}
	return colourSet[name];
};
