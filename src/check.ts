// Will find all numbers with at least two digits after the decimal point.
const twoDPRegExp = /(\.\d{2}\d*)/;

export const match2DP = (svg: string) => {
	return svg.match(twoDPRegExp);
};
