import './style.css';
import {
	getSvg,
	flags,
	allSvg,
	variants,
	defaultDimensions,
} from '../../src/signal-flags';

console.log({ variants, defaultDimensions });

const createEl = (html: string, el = 'td') => {
	const child = document.createElement(el);
	child.innerHTML = html;
	return child;
};

{
	// Test the README example.
	const svg = getSvg('ap', {
		designOptions: {
			dimensions: { pennant: { default: [720, 80, 20] } },
		},
	});
	const div = document.createElement('pre');
	div.innerHTML = svg;
	document.body.prepend(div);
}

const svgDefault = allSvg();
const svgAlt = allSvg({ variant: 'alternative' });
const svgSquare = allSvg({ variant: 'square' });
const svgPrimary = allSvg({ variant: 'primary' });
const svgIcs = allSvg({ variant: 'ics' });

const $app = document.querySelector<HTMLDivElement>('#app');

const $table = document.createElement('table');
$app?.append($table);

const $thead = document.createElement('thead');
$table.append($thead);
const $tbody = document.createElement('tbody');
$table.append($tbody);

const $tr = document.createElement('tr');
$thead.append($tr);
$tr.append(createEl('Key', 'th'));
$tr.append(createEl('slug', 'th'));
$tr.append(createEl('Category', 'th'));
$tr.append(createEl('Default', 'th'));
$tr.append(createEl('Square', 'th'));
$tr.append(createEl('ICS', 'th'));
$tr.append(createEl('Alternative', 'th'));
$tr.append(createEl('Primary', 'th'));

const scale = 2 / 100;

for (const [key, flag] of Object.entries(flags)) {
	const $tr = document.createElement('tr');
	$tbody.append($tr);
	const $key = createEl(key);
	$tr.append($key);
	$tr.append(createEl(flag.slug ?? `(${key})`));

	$tr.append(createEl(flag.category));

	let div = createEl(svgDefault[key], 'div');
	let td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? `${630 * scale}vw`
		: flag.shape === 'triangle' ? `${360 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${360 * scale}vw`;
	$tr.append(td);

	div = createEl(svgSquare[key], 'div');
	td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? `${480 * scale}vw`
		: flag.shape === 'triangle' ? `${336 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${240 * scale}vw`;
	$tr.append(td);

	// ICS.
	div = createEl(svgIcs[key], 'div');
	td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? `${520 * scale}vw`
		: flag.shape === 'triangle' ? `${336 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${288 * scale}vw`;
	$tr.append(td);

	// Alternative.
	div = createEl(svgAlt[key], 'div');
	td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? `${360 * scale}vw`
		: flag.shape === 'triangle' ? `${320 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${320 * scale}vw`;
	$tr.append(td);

	div = createEl(svgPrimary[key], 'div');
	td = createEl('');
	td.append(div);
	td.style.background = '#eee';
	div.style.width =
		flag.shape === 'pennant' ? `${480 * scale}vw`
		: flag.shape === 'triangle' ? `${336 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${240 * scale}vw`;
	$tr.append(td);
}
/*
const $pre = document.createElement('pre');
$pre.innerText = JSON.stringify(flags, null, 2);
$app?.append($pre);
*/
