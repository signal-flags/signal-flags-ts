// Will find all numbers with at least two digits after the decimal point.
const twoDPRegExp = /(\.\d{2}\d*)/;
const threeDPRegExp = /(\.\d{3}\d*)/;
const fourDPRegExp = /(\.\d{4}\d*)/;
const fiveDPRegExp = /(\.\d{5}\d*)/;

export const match2DP = (svg: string) => {
	return svg.match(twoDPRegExp);
};

export const match3DP = (svg: string) => {
	return svg.match(threeDPRegExp);
};

export const match4DP = (svg: string) => {
	return svg.match(fourDPRegExp);
};

export const match5DP = (svg: string) => {
	return svg.match(fiveDPRegExp);
};
