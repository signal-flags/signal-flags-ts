# signal-flags-ts

Generate SVG for flags from the International Code of Signals and Racing Rules of Sailing.

## [4.0.0] - 2025-09-15

### Designs: fixed

- The black and white flag is now the correct, diagonal halves, design (in v3 it
  was a check: although this is not specified in the RRS, the diagonal design is
  used in practice as it is more distinctive from Uniform and Lima).

### Designs: changed

- The aspect ratio of the rectangular and triangular flags is now 3:2 (was 4:3).
  This is closer to the aspect ratios seen 'in the wild'.
- The 'short' option for pennants has been removed.
- The nominal dimensions (i.e. the viewBox size) have been adjusted to give more
  consistent relative border widths (the default border is 1px). This also makes
  the sizes more consistent when reduced/enlarged by a given factor (e.g. 25%).
- The borderless designs have been removed from the standard set: a border can
  still be created in an override.
- The keys for some flags have been changed, and a 'slug' has been added to the
  data to use for a filename where the key is (now) not as suitable.

|     New key     |     New filename      |    Old key    |   Old filename    |
| :-------------: | :-------------------: | :-----------: | :---------------: |
| `blackAndWhite` | `black-and-white.svg` | `blackwhite`  | `blackwhite.svg`  |
| `greenAndWhite` | `green-and-white.svg` | `greenwhite`  | `greenwhite.svg`  |
|    `toPort`     |     `to-port.svg`     |   `toport`    |   `toport.svg`    |
|  `toStarboard`  |  `to-starboard.svg`   | `tostarboard` | `tostarboard.svg` |

### Designs: added

- A 'long' option has been added for longer pennants.
- Beach safety flags have been added as below (and a new `beach` category
  created). For more information about these see
  https://signalflags.org/beach-safety.

|         Key          |          Filename           | Description                         |
| :------------------: | :-------------------------: | ----------------------------------- |
| `blackAndWhiteCheck` | `black-and-white-check.svg` | Surfboard/other watercraft boundary |
|       `purple`       |        `purple.svg`         | Marine pests (or pollution?)        |
|    `redAndYellow`    |    `red-and-yellow.svg`     | Lifeguard patrolled swimming zone   |
