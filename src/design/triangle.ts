import { type DesignSet, type DrawFunction, type OutlineFunction } from '.';
import { getColour } from '../colour';

/**
 * Draw an outline.
 *
 * @param settings Design settings.
 * @returns SVG fragment for an outline.
 */
const outline: OutlineFunction = ({ dimensions, clrSet, outline: ow }) => {
	if (ow === false) return '';
	const [w, h] = dimensions;

	const off = ow / 2;
	const colour = getColour('outline', clrSet);
	return [
		`<path fill="none" stroke="${colour}" stroke-width="${ow}" `,
		`d="M${off},${off}L${w - off},${h / 2 + off}L${off},${h - off}Z"/>`,
	].join('');
};

/**
 * Draw a triangle with 3 horizontal stripes (e.g. 3rd Substitute).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const horizontal: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	const yi = h / clrs.length;
	const h2 = h / 2;
	const xi = (w * 2) / clrs.length;
	// Draw the top stripe.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="M0,0`);
	parts.push(`V${yi}H${xi}Z"/>`);
	// Draw the middle stripe.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="M0,${yi}`);
	parts.push(`V${yi + yi}H${xi}L${w},${h2}L${xi},${yi}Z"/>`);
	// Draw the bottom stripe.
	parts.push(`<path fill="${getColour(clrs[2], clrSet)}" d="M0,${h}`);
	parts.push(`V${yi + yi}H${xi}Z"/>`);

	return parts.join('');
};

export const triangle: DesignSet = {
	// Dimensions must be divisble by 30.
	dimensions: {
		// default: [360, 270],
		default: [360, 240],
	},

	outline,

	designs: {
		horizontal,
	},
};
