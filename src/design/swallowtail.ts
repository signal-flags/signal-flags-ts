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
	const [w, h, td] = dimensions;
	const off = ow / 2;
	const woff = w - off;
	const color = getColour('outline', clrSet);
	return [
		`<path fill="none" stroke="${color}" stroke-width="${ow}" `,
		`d="M${off},${off}`,
		`H${woff}L${woff - td},${h / 2}L${woff},${h - off}H${off}Z"/>`,
	].join('');
};

/**
 * Draw a solid colour flag e.g. B.
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const solid: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h, td] = dimensions;
	return [
		`<path fill="${getColour(clrs[0], clrSet)}" d="M0,0`,
		`H${w}L${w - td},${h / 2}L${w},${h}H0Z"/>`,
	].join('');
};

/**
 * Draw a flag with vertical stripes e.g. A.
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const vertical: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h, td] = dimensions;
	// Stripe width.
	const sw = w / clrs.length;
	const parts = [];
	// l is the left edge of the stripe.
	for (let l = 0; l < w - sw; l += sw) {
		parts.push(`<path fill="${getColour(clrs[l / sw], clrSet)}" d="M${l},0`);
		parts.push(`H${l + sw}V${h}H${l}Z"/>`);
	}
	// Last stripe has the swallowtail.
	parts.push(`<path fill="${getColour(clrs.at(-1) ?? '', clrSet)}"`);
	parts.push(` d="M${w - sw},0H${w}L${w - td},${h / 2}L${w},${h}`);
	parts.push(`H${w - sw}Z"/>`);
	return parts.join('');
};

export const swallowtail: DesignSet = {
	// Dimensions must be divisible by 90.
	dimensions: {
		/** Width, height, tail depth. */
		default: [360, 270, 90],
		square: [270, 270, 67.5],
	},

	outline,

	designs: {
		solid,
		vertical,
	},
};
