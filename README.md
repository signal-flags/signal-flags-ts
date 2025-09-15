# signal-flags-ts

| Generate SVG for flags from the International Code of Signals, Racing Rules of
| Sailing, and more.

## Getting started

If you want to use flag images in a document or website, download them from
https://signalflags.org.

You only need this package if you want to generate custom versions of these
images.

## Installation

```sh
npm i signal-flags
```

## Usage

To generate a standalone SVG file for a long and narrow AP (answering pennant):

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

## Usage in a browser

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
