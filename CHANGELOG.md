# Change Log

## [4.2.0](https://github.com/signal-flags/signal-flags-ts/tree/v4.2.0) - _2025-09-17_

### Design changes

- change the colour of the purple flag to be close to the ISO 20712-2 spec.
- move the circle on numerals 1 and 2 closer to the hoist when the dimensions
  are narrow (which they are in the `short` set).
- revert the `default` set to 4:3 for rectangles/swallowtails (as in v2.x).
- add rectangles at 3:2 to the `long` set.
- fully populate the `short` and `long` sets even with duplication. All sets
  except primary now have all the flags.

## [4.1.1](https://github.com/signal-flags/signal-flags-ts/tree/v4.1.1) - _2025-09-16_

### Design changes

- add `short` option for dimensions (4:3 for rectangles, 2:1 for pennants and
  4:3 for triangles).
- fix the dimensions of flags A and B in the `square` set.
- make the cross thicker on non-square R and X flags.

### API changes

- `feat` add `generateShort` to support short option.

## [4.0.0](https://github.com/signal-flags/signal-flags-ts/tree/v4.0.0) - _2025-09-15_

v4 is a ground-up rewrite in Typescript with a completely new API.
