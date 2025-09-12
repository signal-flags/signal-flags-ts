import { type Flag } from '../flag';
import { type DesignSet, type DesignSettings } from '.';
import { getColour } from '../colour';

export const swallowtail: DesignSet = {
  // Dimensions must be divisible by 90.
  dimensions: {
    default: [240, 180],
    square: [180, 180],
  },

  // Draw an outline.
  outline: ({ dimensions, clrSet, outline }: DesignSettings) => {
    const [w, h] = dimensions;
    // Make the tail height 1/4 of the width of the flag.
    const th = w * 0.25;
    const ow = typeof outline === 'number' ? outline : 1;
    const off = ow / 2;
    const woff = w - off;
    const color = getColour('outline', clrSet);
    return [
      `<path fill="none" stroke="${color}" stroke-width="${ow}" `,
      `d="M${off},${off}`,
      `H${woff}L${woff - th},${h / 2}L${woff},${h - off}H${off}Z"/>\n`,
    ].join('');
  },

  designs: {
    // Draw a field (background).
    solid(flag: Flag, { dimensions, clrSet }: DesignSettings) {
      const [w, h] = dimensions;
      // Make the tail 1/4 of the width of the flag.
      const tail = w * 0.25;
      return [
        `<path fill="${getColour(flag.clrs[0], clrSet)}" d="M0,0`,
        `H${w}L${w - tail},${h / 2}L${w},${h}H0Z"/>\n`,
      ].join('');
    },

    // Draw vertical stripes.
    vertical(flag: Flag, { dimensions, clrSet }: DesignSettings) {
      const [w, h] = dimensions;
      // Make the tail 1/4 of the width of the flag.
      const tail = w * 0.25;
      // Stripe width.
      const sw = w / flag.clrs.length;
      const parts = [];
      // l is the left edge of the stripe.
      for (let l = 0; l < w - sw; l += sw) {
        parts.push(
          `<path fill="${getColour(flag.clrs[l / sw], clrSet)}" d="M${l},0`,
        );
        parts.push(`H${l + sw}V${h}H${l}Z"/>\n`);
      }
      // Last stripe has the swallowtail.
      parts.push(`<path fill="${getColour(flag.clrs.at(-1) ?? '', clrSet)}"`);
      parts.push(` d="M${w - sw},0H${w}L${w - tail},${h / 2}L${w},${h}`);
      parts.push(`H${w - sw}Z"/>\n`);
      return parts.join('');
    },
  },
};
