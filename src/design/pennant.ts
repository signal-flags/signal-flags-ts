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

  // Centre 3 radii from hoist.
  const cx = r * 3;

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
  const sw = w * factors[clrs.length - 2];
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
    default: [540, 180, 60],
    long: [720, 180, 60],
  },

  outline,

  designs: {
    circle,
    vertical,
  },
};
