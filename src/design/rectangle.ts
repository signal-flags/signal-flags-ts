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
	const ow = outline || 0;

	// Draw a rectangle background.
	const w2 = w / 2;
	const h2 = h / 2;
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M0,0H${w}V${h}H0Z`);
	// Draw the cut out centre anti-clockwise so it doesn't fill.
	parts.push(`M${w2},${ow}L${ow},${h2}L${w2},${h - ow}`);
	parts.push(`L${w - ow},${h2}L${w2},${ow}"/>`);
	// Draw the centre.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M${w2},${ow}L${ow},${h2}L${w2},${h - ow}`);
	parts.push(`L${w - ow},${h2}Z"/>`);

	return parts.join('');
};

//---------------------------------------------------------------------------

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const cross: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];
	// Standard cross width is 1/5 of the height of the flag; this means x and y need
	// to be carefully chosen to avoid long fractions.
	const x0 = h / 5;
	const y0 = x0;
	const x1 = (w - x0) / 2;
	const y1 = (h - y0) / 2;
	// Draw the two limbs of the cross - it doesn't matter that they intersect.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="`);
	parts.push(`M${x1},0H${x1 + x0}V${h}H${x1}Z`);
	parts.push(`M0,${y1}H${w}V${y1 + y0}H${0}Z"/>`);
	// Draw the four background rectangles.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="`);
	parts.push(`M0,0H${x1}V${y1}H0Z`);
	parts.push(`M${x1 + x0},0H${w}V${y1}H${x1 + x0}Z`);
	parts.push(`M0,${y1 + y0}H${x1}V${h}H0Z`);
	parts.push(`M${x1 + x0},${y1 + y0}H${w}V${h}H${x1 + x0}Z"/>`);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const minus: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	const w2 = w / 2;
	const h2 = h / 2;
	const ht2 = h / 4;
	const t = h / 20;

	// Draw a rectangle background.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="`);
	parts.push(
		`M0,0H${w}V${h}H0Z`,
		// Draw the cut out centre shape anti-clockwise so it doesn't fill.
		`M${w2 - ht2},${h2 - t}V${h2 + t}H${w2 + ht2}V${h2 - t}Z"/>`,
	);
	// Draw the centre shape.
	parts.push(
		`<path fill="${getColour(clrs[0], clrSet)}" d="`,
		`M${w2 - ht2},${h2 - t}H${w2 + ht2}V${h2 + t}H${w2 - ht2}Z"/>`,
	);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const plus: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	const w2 = w / 2;
	const h2 = h / 2;
	const ht2 = h / 4;
	const t = h / 20;

	// Draw a rectangle background.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="`);
	parts.push(
		`M0,0H${w}V${h}H0Z`,
		// Draw the cut out centre shape anti-clockwise so it doesn't fill.
		`M${w2 - t},${h2 - ht2}V${h2 - t}H${w2 - ht2}`,
		`V${h2 + t}H${w2 - t}V${h2 + ht2}H${w2 + t}V${h2 + t}H${w2 + ht2}`,
		`V${h2 - t}H${w2 + t}V${h2 - ht2}Z"/>`,
	);
	// Draw the centre shape.
	parts.push(
		`<path fill="${getColour(clrs[0], clrSet)}" d="`,
		`M${w2 - t},${h2 - ht2}H${w2 + t}V${h2 - t}H${w2 + ht2}`,
		`V${h2 + t}H${w2 + t}V${h2 + ht2}H${w2 - t}V${h2 + t}H${w2 - ht2}`,
		`V${h2 - t}H${w2 - t}Z"/>`,
	);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const innerRectangle: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	// Height.
	const w2 = w / 2;
	const h2 = h / 2;
	const rh = h / 3;
	const rw = h / 4;

	// Draw a rectangle background.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M0,0H${w}V${h}H0Z`);
	// Draw the cut out centre shape anti-clockwise so it doesn't fill.
	parts.push(`M${w2 - rw},${h2 - rh}V${h2 + rh}H${w2 + rw}V${h2 - rh}Z"/>`);
	// Draw the centre shape.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" `);
	parts.push(`d="M${w2 - rw},${h2 - rh}H${w2 + rw}V${h2 + rh}H${w2 - rw}Z"/>`);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const saltire: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];
	const x0 = w / 8;
	const y0 = h / 8;
	const x1 = w / 2 - x0;
	const y1 = h / 2 - y0;
	// Draw the two limbs of the cross - it doesn't matter that they intersect.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="`);
	parts.push(`M0,0H${x0}L${w},${h - y0}V${h}H${w - x0}L0,${y0}Z`);
	parts.push(`M${w - x0},0H${w}V${y0}L${x0},${h}H0V${h - y0}Z"/>`);
	// Draw the four background triangles.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="`);
	parts.push(`M${x0},0H${w - x0}L${w / 2},${y1}Z`);
	parts.push(`M${w},${y0}V${h - y0}L${w - x1},${h / 2}Z`);
	parts.push(`M${x0},${h}H${w - x0}L${w / 2},${h - y1}Z`);
	parts.push(`M0,${y0}V${h - y0}L${x1},${h / 2}Z"/>`);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const triangle: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	// Height.
	const w2 = w / 2;
	const h2 = h / 2;
	const th = h / 3;
	const tw = h / 4;

	// Draw a rectangle background.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}" d="`);
	parts.push(`M0,0H${w}V${h}H0Z`);
	// Draw the cut out centre shape anti-clockwise so it doesn't fill.
	parts.push(`M${w2},${h2 - th}L${w2 - tw},${h2 + th}H${w2 + tw}Z"/>`);
	// Draw the centre shape.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="`);
	parts.push(`M${w2},${h2 - th}L${w2 + tw},${h2 + th}H${w2 - tw}Z"/>`);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const diagonalQuarters: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];

	// Start at the centre!
	const c = `${w / 2},${h / 2}`;

	// Draw the top quarter.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M${c}L0,0H${w}Z"/>`);
	// Draw the right quarter.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M${c}L${w},0V${h}Z"/>`);
	// Draw the bottom quarter.
	parts.push(`<path fill="${getColour(clrs[2], clrSet)}"`);
	parts.push(` d="M${c}L${w},${h}H0Z"/>`);
	// Draw the left quarter.
	parts.push(`<path fill="${getColour(clrs[3], clrSet)}"`);
	parts.push(` d="M${c}L0,${h}V0Z"/>`);
	return parts.join('');
};

/**
 * Draw a diamond flag (e.g. F).
 *
 * @param flag Flag settings.
 * @param settings Design settings.
 * @returns
 */
const diagonalStripes: DrawFunction = ({ clrs }, { dimensions, clrSet }) => {
	const [w, h] = dimensions;
	const parts = [];
	let x = w / 5;
	let y = h / 5;
	const xi = x;
	const yi = y;
	let clr = 0;
	// The first stripe - just a triangle.
	parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
	parts.push(` d="M0,0H${x}L0,${y}Z"/>`);
	// Second, third, fourth and fifth stripes.
	for (let i = 0; i < 4; i++) {
		clr = 1 - clr;
		parts.push(`<path fill="${getColour(clrs[clr], clrSet)}"`);
		parts.push(` d="M${x},0H${x + xi}L0,${y + yi}V${y}Z"/>`);
		x += xi;
		y += yi;
	}
	/*
      clr = 1 - clr;
      y = h / 10;
      parts.push(`<path d="M${x},0H${w}V${y}L${w / 10},${h}H0V${h - y}Z`);
      parts.push(`" fill="${getColour(clrs[clr], clrSet)}"/>`);
      x = w / 10;
      */
	x = 0;
	y = 0;
	// Seventh, eighth, ninth and tenth stripes.
	for (let i = 0; i < 4; i++) {
		clr = 1 - clr;
		parts.push(`<path fill="${getColour(clrs[clr], clrSet)}"`);
		parts.push(` d="M${w},${y}V${y + yi}L${x + xi},${h}H${x}Z"/>`);
		x += xi;
		y += yi;
	}
	// The final triangle.
	parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
	parts.push(` d="M${w},${y}V${h}H${x}Z"/>`);
	return parts.join('');
};

//---------------------------------------------------------------------------

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
		// Default 2:3 rectangle.
		default: [360, 240],
		// 1:1 alternative.
		square: [240, 240], // [180, 180],
		// 3:4 (portrait).
		card: [270, 360], // [180, 180],
	},

	outline,

	designs: {
		border,
		check,
		circle,
		cross,
		diagonalHalves,
		diagonalQuarters,
		diagonalStripes,
		diamond,
		horizontal,
		minus,
		plus,
		rectangle: innerRectangle,
		saltire,
		solid,
		triangle,
		vertical,
	},
};
