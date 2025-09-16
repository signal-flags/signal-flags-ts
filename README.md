# signal-flags-ts

> Generate SVG for flags from the International Code of Signals, Racing Rules of
> Sailing, and more.

## Getting started

If you want to use flag images in a document or website, you can download them from
https://signalflags.org.

You only need this package if you want to generate custom versions of these
images.

## Installation

```console
$ npm i signal-flags
```

## Example usage

This will generate an SVG file for a long and narrow AP (answering pennant).

```js
import { writeFile } from 'node:fs/promises';
import { flags, getSvg } from 'signal-flags';
const svgFile = getSvg(
	flags.ap,
	{
		dimensions: { pennant: { default: [720, 80, 20] } },
	},
	{ file: true },
);
await writeFile('ap-extra-wide.svg', svgFile);
```

## Example usage in a browser

This will create a long and narrow AP (answering pennant) at the top of the
current page.

```html
<script src=" https://cdn.jsdelivr.net/npm/signal-flags@4"></script>
<script>
	const { flags, getSvg } = SignalFlags;
	const svg = getSvg(flags.ap, {
		dimensions: { pennant: { default: [720, 80, 20] } },
	});
	const div = document.createElement('div');
	div.innerHTML = svg;
	document.body.prepend(div);
</script>
```

## Documentation

Documentation for this module can be found on the
[Signal Flags website](https://signalflags.org/docs/signal-flags-ts).

## Support

Please report any bugs or suggestions on the
[Signal Flags Issue Tracker](https://github.com/signal-flags/signal-flags/issues).
