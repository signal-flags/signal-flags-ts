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
 * Draw a triangle with a border (1st Substitute).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const border: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	const h2 = h / 2;
	// The factor in xi must be half that in yi. Note the similarity to vertical.
	const yi = h / 4.8;
	const xi = w / 2.4;

	// Draw the inner part.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M0,${yi}V${h - yi}L${w - xi},${h2}Z"/>`);
	// Draw the outer part leaving a hole for the inner part.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M0,0L${w},${h2}L0,${h}Z`);
	parts.push(`M0,${yi}V${h - yi}L${w - xi},${h2}L0,${yi}"/>`);

	return parts.join('');
};

/**
 * Draw a triangle with 3 horizontal stripes (3rd Substitute).
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

/**
 * Draw a triangle with an inset square on the hoist (4th Substitute).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const hoistSquare: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	const s = h / 3;
	const h2 = h / 2;

	// Draw the ground...
	parts.push(
		`<path fill="${getColour(clrs[1], clrSet)}" d="`,
		`M0,0L${w},${h2}L0,${h}Z`,
		// ...with a cut-out drawn anti-clockwise so it doesn't fill.
		`M0,${s}V${s * 2}H${s}V${s}H0Z"/>`,
		// Draw the square.
		`<path fill="${getColour(clrs[0], clrSet)}" d="`,
		`M0,${s}H${s}V${s * 2}H0Z"/>`,
	);

	return parts.join('');
};

/**
 * Draw a triangle with 3 horizontal stripes (3rd Substitute).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const vertical: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	// Stripe width.
	const sw = w / 2.4;
	// Difference in height per stripe.
	const dh = h / 4.8;
	const parts = [];
	// l is the left edge of the stripe.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M0,0`);
	parts.push(`L${sw},${dh}V${h - dh}L0,${h}Z"/>`);
	// Last stripe goes to a point.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M${sw},${dh}L${w},${h / 2}L${sw},${h - dh}Z"/>`);
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
		border,
		horizontal,
		hoistSquare,
		vertical,
	},
};
