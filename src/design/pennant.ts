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
	const [w, h, fh] = dimensions;

	const off = ow / 2;
	const colour = getColour('outline', clrSet);
	return [
		`<path fill="none" stroke="${colour}" stroke-width="${ow}" `,
		`d="M${off},${off}L${w - off},${(h - fh) / 2 + off}`,
		`V${(h + fh) / 2 - off}L${off},${h - off}Z"/>`,
	].join('');
};

/**
 * Draw a pennant with a circle e.g. Numeral 1.
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const circle: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h, fh] = dimensions;

	const parts = [];

	// Radius.
	const r = h / 4;

	// Centre 3 radii from hoist except for short (<= 2:1) pennants 2 radii.
	const cx = w / h > 2 ? r * 3 : r * 2;

	// Draw the background.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="M0,0`);
	parts.push(`L${w},${(h - fh) / 2}V${(h + fh) / 2}L0,${h}Z`);
	// Draw the cut out centre anti-clockwise so it doesn't fill.
	parts.push(`M${cx},${h / 2 - r}`);
	parts.push(`A${r},${r} 0 0 0 ${cx - r},${h / 2}`);
	parts.push(`A${r},${r} 0 1 0 ${cx},${h / 2 - r}"/>`);
	// Draw the centre.
	parts.push(`<circle fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` cx="${cx}" cy="${h / 2}" r="${r}"/>`);
	return parts.join('');
};

/**
 * Draw a pennant with a circle e.g. Numeral 1.
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const horizontal: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h, fh] = dimensions;
	const parts = [];

	const h2 = h / 2;
	// Half the fly height.
	const fh2 = fh / 2;

	// Draw the top half.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M0,0V${h2}H${w}V${h2 - fh2}Z"/>`);
	// Draw the bottom half.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M0,${h}V${h2}H${w}V${h2 + fh2}Z"/>`);
	return parts.join('');
};

/**
 * Draw a pennant with a nordic cross e.g. Numeral 4.
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const nordic: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h, fh] = dimensions;
	const parts = [];

	// Standard cross width is 1/5 of the height of the flag; this means x and y need
	// to be carefully chosen to avoid long fractions.
	const x0 = h / 5;
	const y0 = x0;

	// Centre the cross 1/3 of the width across the flag, or the height if less,
	// rounding to a multiple of 4 to avoid long decimals.
	const w2 = Math.floor(Math.min(w / 3, h));
	const h2 = h / 2;

	const x1 = w2 - x0 / 2;
	const y1 = (h - y0) / 2;

	// Half the fly height.
	const fh2 = fh / 2;
	// Height factor.
	const heightFactor = (h2 - fh2) / w;
	// Half the height at the left side of the cross.
	const hhl = h2 - heightFactor * x1;
	// Half the height at the right side of the cross.
	const hhr = h2 - heightFactor * (x1 + x0);

	// Draw the two limbs of the cross - it doesn't matter that they intersect.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="`);
	parts.push(
		`M${x1 + x0},${h2 - hhr}V${h2 + hhr}L${x1},${h2 + hhl}V${h2 - hhl}Z`,
	);
	parts.push(`M0,${y1}H${w}V${y1 + y0}H${0}Z"/>`);

	const clr = getColour(clrs[1], clrSet);
	// Draw the top left quarter.
	parts.push(`<path fill="${clr}" d="M0,0V${y1}H${x1}V${h2 - hhl}Z`);
	// Draw the top right quarter.
	parts.push(`M${x1 + x0},${h2 - hhr}V${y1}H${w}V${h2 - fh2}Z`);
	// Draw the bottom right quarter.
	parts.push(`M${x1 + x0},${h2 + hhr}V${y1 + x0}H${w}V${h2 + fh2}Z`);
	// Draw the bottom left quarter.
	parts.push(`M0,${h}V${y1 + x0}H${x1}V${h2 + hhl}Z"/>`);
	return parts.join('');
};

/**
 * Draw a pennant with quarters e.g. Numeral 9.
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const quarters: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h, fh] = dimensions;
	const parts = [];

	// 5/12 works better than 1/2, but round down to a multiple of 3 to avoid
	// long decimals.
	const w2 = Math.floor((w * 5) / 12 / 3) * 3;
	const h2 = h / 2;
	// Half the fly height.
	const fh2 = fh / 2;
	// Half the height half way along the flag.
	const hh2 = (7 * h + 5 * fh) / 24;

	// Draw the top left quarter.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M0,0V${h2}H${w2}V${h2 - hh2}Z"/>`);
	// Draw the top right quarter.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M${w2},${h2 - hh2}V${h2}H${w}V${h2 - fh2}Z"/>`);
	// Draw the bottom left quarter.
	parts.push(`<path fill="${getColour(clrs[2], clrSet)}"`);
	parts.push(` d="M0,${h}V${h2}H${w2}V${h2 + hh2}Z"/>`);
	// Draw the bottom right quarter.
	parts.push(`<path fill="${getColour(clrs[3], clrSet)}"`);
	parts.push(` d="M${w2},${h2 + hh2}V${h2}H${w}V${h2 + fh2}Z"/>`);
	return parts.join('');
};

/**
 * Draw a pennant with vertical stripes (e.g. AP).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const vertical: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h, fh] = dimensions;
	const parts = [];

	// Stripe width - add part of the width to the last stripe.
	// const factors = [4.5 / 10, 3 / 10, 2.25 / 10, 1.75 / 10];
	// const sw = Math.round(w * factors[clrs.length - 2]);
	const factors = [5 / 12, 3.5 / 12, 1 / 4, 1 / 5];
	// Make sure the stripe width is divisible by 12 to avoid long decimals.
	const sw = Math.floor((w * factors[clrs.length - 2]) / 4) * 4;
	// Difference in height per stripe.
	const dh = ((h - fh) * (sw / w)) / 2;

	// t is the top left of the stripe.
	let t = 0;
	// l is the left edge of the stripe.
	let l = 0;
	for (let i = 0; i < clrs.length - 1; i++) {
		parts.push(`<path fill="${getColour(clrs[i], clrSet)}"`);
		parts.push(` d="M${l},${t}`);
		t += dh;
		parts.push(`L${l + sw},${t}V${h - t}L${l},${h - t + dh}Z"/>`);
		l += sw;
	}
	// Draw the last stripe
	parts.push(`<path fill="${getColour(clrs[clrs.length - 1], clrSet)}"`);
	parts.push(` d="M${l},${t}L${w},${(h - fh) / 2}V${(h + fh) / 2}`);
	t += dh;
	parts.push(`L${l},${h - t + dh}Z"/>`);
	return parts.join('');
};

export const pennant: DesignSet = {
	// Dimensions must be divisble by 30.
	dimensions: {
		default: [480, 180, 60], // Twice the length of a default square, 8:3.
		long: [640, 180, 60], // Twice the length of a default rectangle, 32:9.
		short: [320, 180, 60], // The same length as a default rectangle.
	},

	outline,

	designs: {
		circle,
		horizontal,
		quarters,
		nordic,
		vertical,
	},
};
