import { type DesignSet, type DrawFunction, type OutlineFunction } from '.';

import { getColour } from '../colour';

/**
 * Draw an outline.
 *
 * @param settings Design settings.
 * @returns SVG fragment for an outline.
 */
const outline: OutlineFunction = ({ dimensions, clrSet, outline }) => {
	if (outline === false) return '';
	const [w, h] = dimensions;
	const off = outline / 2;
	const colour = getColour('outline', clrSet);
	return [
		`<path fill="none" stroke="${colour}" stroke-width="${outline}" `,
		`d="M${off},${off}H${w - off}V${h - off}H${off}Z"/>`,
	].join('');
};

/**
 * Draw a border design (e.g. P, W).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const border: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];
	const { length } = clrs;

	// Draw the border(s) from the outside in.
	// xbw and ybw are the border widths in the x and y dimension.
	let xbw, ybw;
	if (length === 2) {
		if (w === h) {
			// This factor is close to the US Navy spec.
			ybw = h * 0.32;
			xbw = w * 0.32;
		} else {
			// This factor works well for rectangular P and S flags.
			ybw = h * 0.25;
			xbw = w * 0.25;
		}
	} else {
		ybw = h / (length * 2);
		xbw = w / (length * 2);
	}
	let xb = 0;
	let yb = 0;
	for (let i = clrs.length - 1; i > 0; i--) {
		parts.push(`<path fill="${getColour(clrs[i], clrSet)}" d="M${xb},${yb}`);
		parts.push(`H${w - xb}V${h - yb}H${xb}Z`);
		xb += xbw;
		yb += ybw;
		// Draw the 'hole' anti-clockwise so it does not fill.
		parts.push(`M${xb},${yb}`);
		parts.push(`V${h - yb}H${w - xb}V${yb}Z"/>`);
	}
	// Draw the centre.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="M${xb},${yb}`);
	parts.push(`H${w - xb}V${h - yb}H${xb}Z"/>`);
	return parts.join('');
};

/**
 * Draw a flag with diagonal halves (e.g. O).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const check: DrawFunction = ({ clrs, n }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	// xw and yw are the check widths in the x and y dimension.
	let repeat = n || 2;
	const xw = w / repeat;
	const yw = h / repeat;
	repeat = repeat / 2 - 1;
	let i;
	let x = xw;
	let y = h - yw;
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="M0,0H${x}V${h}`);
	for (i = 0; i < repeat; i++) {
		x += xw;
		parts.push(`H${x}V${0}`);
		x += xw;
		parts.push(`H${x}V${h}`);
	}
	parts.push(`H${w}V${y}H${0}`);
	for (i = 0; i < repeat; i++) {
		y -= yw;
		parts.push(`V${y}H${w}`);
		y -= yw;
		parts.push(`V${y}H${0}`);
	}
	parts.push(`V${0}"/>`);

	x = w - xw;
	y = yw;
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="M${w},0H${x}V${h}`);
	for (i = 0; i < repeat; i++) {
		x -= xw;
		parts.push(`H${x}V${0}`);
		x -= xw;
		parts.push(`H${x}V${h}`);
	}
	parts.push(`H${0}V${y}H${w}`);
	for (i = 0; i < repeat; i++) {
		y += yw;
		parts.push(`V${y}H${0}`);
		y += yw;
		parts.push(`V${y}H${w}`);
	}
	parts.push(`V${0}"/>`);
	return parts.join('');
};

/**
 * Draw a flag with a circle (i.e. I).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const circle: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	// Radius - smaller on square flags to match USN spec, otherwise match flag of Japan.
	const r = w === h ? h * 0.2 : h * 0.3;

	// Draw a rectangle background.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M0,0H${w}V${h}H0Z`);
	// Draw the cut out centre anti-clockwise so it doesn't fill.
	parts.push(`M${w / 2},${h / 2 - r}`);
	parts.push(`A${r},${r} 0 0 0 ${w / 2 - r},${h / 2}`);
	parts.push(`A${r},${r} 0 1 0 ${w / 2},${h / 2 - r}"/>`);
	// Draw the centre.
	parts.push(`<circle fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` cx="${w / 2}" cy="${h / 2}" r="${r}"/>`);
	return parts.join('');
};

/**
 * Draw a flag with diagonal halves (e.g. O).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const diagonalHalves: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	// Draw the top right half.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M0,0L${w},${h}V0Z"/>`);
	// Draw the bottom left half.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M0,0L${w},${h}H0Z"/>`);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const diamond: DrawFunction = ({ clrs }, { dimensions, outline, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];
	// Make sure we draw inside any outline.
	const off = outline === false ? 0 : outline;

	// Draw a rectangle background.
	const w2 = w / 2;
	const h2 = h / 2;
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M0,0H${w}V${h}H0Z`);
	// Draw the cut out centre anti-clockwise so it doesn't fill.
	parts.push(`M${w2},${off}L${off},${h2}L${w2},${h - off}`);
	parts.push(`L${w - off},${h2}L${w2},${off}"/>`);
	// Draw the centre.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M${w2},${off}L${off},${h2}L${w2},${h - off}`);
	parts.push(`L${w - off},${h2}Z"/>`);

	return parts.join('');
};

/**
 * Draw a flag with a solid background (e.g. O).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const horizontal: DrawFunction = ({ clrs, widths }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];
	if (widths) {
		// Variable stripe height.
		const sh = h / widths.reduce((sum, stripe) => sum + stripe, 0);
		// t is the top edge of the stripe.
		for (let i = 0, t = 0; i < widths.length; i++) {
			parts.push(`<path fill="${getColour(clrs[i], clrSet)}" d="M0,${t}`);
			t += widths[i] * sh;
			parts.push(`H${w}V${t}H${0}Z"/>`);
		}
		return parts.join('');
	}

	// Fixed stripe height.
	const sh = h / clrs.length;
	// t is the top edge of the stripe.
	for (let t = 0; t < h; t += sh) {
		parts.push(`<path fill="${getColour(clrs[t / sh], clrSet)}"`);
		parts.push(` d="M0,${t}H${w}V${t + sh}H${0}Z"/>`);
	}
	return parts.join('');
};

/**
 * Draw a flag with a solid background (e.g. O).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const solid: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	return `<path fill="${getColour(clrs[0], clrSet)}" d="M0,0H${w}V${h}H0Z"/>`;
};

/**
 * Draw a flag with vertical stripes (e.g. G).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const vertical: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
    // Stripe width.
    const sw = w / clrs.length;
    const parts = [];
    // l is the left edge of the stripe.
    for (let l = 0; l < w; l += sw) {
      parts.push(`<path fill="${getColour(clrs[l / sw], clrSet)}"`);
      parts.push(` d="M${l},0H${l + sw}V${h}H${l}Z"/>`);
    }
    return parts.join('');
  };

export const rectangle: DesignSet = {
	// Dimensions must be divisible by ?90.
	dimensions: {
		default: [360, 240], // [240, 180],
		// default: [360, 270], // [240, 180],
		square: [240, 240], // [180, 180],
		// square: [270, 270], // [180, 180],
	},

	outline,

	designs: {
		check,
		circle,
		border,
		diamond,
		diagonalHalves,
		horizontal,
		vertical,
		solid,
	},
};
