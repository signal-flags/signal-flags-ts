import { swallowtail } from './swallowtail';

import { type Flag } from '../flag';

export interface DesignSettings {
  dimensions: number[];
  outline?: number | boolean;
  clrSet?: string | Record<string, string>;
}

export interface DesignOptions {
  dimensions?: string | number[];
  outline?: number | boolean;
  clrSet?: string | Record<string, string>;
}

export type DrawFunction = (flag: Flag, options: DesignSettings) => string;
export type OutlineFunction = (options: DesignSettings) => string;

export interface DesignSet {
  dimensions: Record<string, [a: number, b: number]>;
  outline: OutlineFunction;
  designs: Record<string, DrawFunction>;
}

const designs: Record<string, DesignSet> = {
  swallowtail,
};

// Ponyfill for btoa in node.
const toBase64 =
  typeof btoa === 'undefined'
    ? (b: string) => Buffer.from(b).toString('base64')
    : btoa;

export interface BuildOptions {
  dimensions?: [a: number, b: number] | string;
  file?: boolean;
  dataUri?: boolean;
}

/**
 * Build the SVG for a flag.
 *
 * @private
 * @param {object} shape A map of functions to draw designs for this shape.
 * @param {mixed[]} design An array of design elements for the flag.
 * @param {object} colors Colours for this flag set.
 * @param {number[]} size The size to draw [width, height].
 */
// function buildFlagSvg({ draw, design, colors, outline, file, dataUri, shape }) {
/**
 * Build the SVG for a flag.
 *
 * @param flag
 * @param design
 * @param options
 * @returns
 */
export const buildFlagSvg = (
  flag: Flag,
  design: DesignOptions,
  options: BuildOptions,
): string => {
  const designSet = designs[flag.shape];

  // Get the dimensions for this shape.
  // const [w, h] = Array.isArray(shape)
  //   ? shape
  //   : (shape && draw.size[shape]) || draw.size.default;
  const dimensions = Array.isArray(options.dimensions)
    ? options.dimensions
    : designSet.dimensions[options.dimensions ?? 'default'];
  const [w, h] = dimensions;
  let parts = [];

  if (options.file || options.dataUri) {
    // Add the xml declaration for a file.
    parts.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    parts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">\n`,
    );
  } else {
    // Just the svg tag for a DOM node.
    parts.push(`<svg viewBox="0 0 ${w} ${h}">\n`);
  }

  // Add the tags for each part of the design.
  // shape.designs[flag.design](part) => {
  // Remember some flags (F) need to know about the outline.
  // parts.push(draw[part[0]](part, { w, h, colors, outline }));
  // });

  parts.push(designSet.designs[flag.design](flag, { ...design, dimensions }));
  // Draw the outline.
  const { outline, clrSet } = design;
  if (outline) {
    parts.push(designSet.outline({ dimensions, clrSet, outline }));
  }

  // Close the svg element with or without a final newline.
  parts.push(options.file || options.dataUri ? '</svg>\n' : '</svg>');

  // Return the markup as a dataUri...
  if (options.dataUri) {
    // ? support %-encoding as an option, although it generates longer strings?
    // 'data:image/svg+xml;utf8,' + encodeURIComponent(...);
    return 'data:image/svg+xml;base64,' + toBase64(parts.join(''));
  }

  // ... or just plain text.
  return parts.join('');
};
