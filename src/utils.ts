export const roundDecimalPlaces = (x: number, places: number) => {
	const factor = 10 ** places;
	return Math.round(x * factor) / factor;
};
