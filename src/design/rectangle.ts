import {
  type DesignSet,
  type DrawFunction,
  type OutlineFunction,
} from '.';

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
    ].join('');};

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

export const rectangle: DesignSet = {
  // Dimensions must be divisible by 90.
  dimensions: {
    default: [240, 180],
    square: [180, 180],
  },

  outline,

  designs: {
    diamond,
  },
};
