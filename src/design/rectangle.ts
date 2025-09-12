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
    `d="M${off},${off}H${w - off}V${h - off}H${off}Z"/>\n`,
  ].join('');
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
  parts.push(`V${0}"/>\n`);

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
  parts.push(`V${0}"/>\n`);
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
  parts.push(` d="M0,0L${w},${h}V0Z"/>\n`);
  // Draw the bottom left half.
  parts.push(`<path fill="${getColour(clrs[1], clrSet)}"`);
  parts.push(` d="M0,0L${w},${h}H0Z"/>\n`);
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
  parts.push(`L${w - off},${h2}L${w2},${off}"/>\n`);
  // Draw the centre.
  parts.push(`<path fill="${getColour(clrs[0], clrSet)}"`);
  parts.push(` d="M${w2},${off}L${off},${h2}L${w2},${h - off}`);
  parts.push(`L${w - off},${h2}Z"/>\n`);

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
  return `<path fill="${getColour(clrs[0], clrSet)}" d="M0,0H${w}V${h}H0Z"/>\n`;
};

export const rectangle: DesignSet = {
  // Dimensions must be divisible by 90.
  dimensions: {
    default: [360, 270], // [240, 180],
    square: [270, 270], // [180, 180],
  },

  outline,

  designs: {
    check,
    diamond,
    diagonalHalves,
    solid,
  },
};
