import { type Flag } from '../flag';

export type FlagSet = Record<string, Flag>;

import { icsFlags } from './ics-flags';

import { buildFlagSvg, type DesignOptions, type BuildOptions } from '../design';

export const flagSets = {
  icsFlags,
};

/**
 * Get SVG for a flag.
 *
 * @param flagSet
 * @param key
 * @param designOptions
 * @param buildOptions
 * @returns
 */
export const getSvg = (
  flag: Flag,
  designOptions: DesignOptions = {},
  buildOptions: BuildOptions = {},
) => {
  // Get the definition for this flag.

  // Use any override size from the flag definition: note this will override
  // the explicit `shape` option. This is only currently used for the AP flag.
  // if (size) optShape = size;

  // Get the code to build this shape.

  // Set the colours according to the options or defaults.
  // let colors;
  // if (typeof optColors === 'string') {
  //   colors = colorSets[optColors] ?? this.settings.colors;
  // } else {
  //   colors = { ...this.settings.colors, ...optColors };
  // }

  return buildFlagSvg(flag, designOptions, buildOptions);
};
