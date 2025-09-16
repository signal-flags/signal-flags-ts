import './style.css';
import {
	getSvg,
	flags,
	generateDefault,
	generateLong,
	generatePrimary,
	generateSquare,
	generateShort,
} from '../../src/signal-flags';

const createEl = (html: string, el = 'td') => {
	const child = document.createElement(el);
	child.innerHTML = html;
	return child;
};

{
	// Test the README example.
	const svg = getSvg(flags.ap, {
		dimensions: { pennant: { default: [720, 80, 20] } },
	});
	const div = document.createElement('pre');
	div.innerHTML = svg;
	document.body.prepend(div);
}

const svgDefault = generateDefault().svg;
const svgLong = generateLong().svg;
const svgSquare = generateSquare().svg;
const svgPrimary = generatePrimary().svg;
const svgShort = generateShort().svg;

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
$tr.append(createEl('Default 360 (pennants 540, card 180)', 'th'));
$tr.append(
	createEl('Square 240 (pennants 540, triangles 360, card 180)', 'th'),
);
$tr.append(createEl('Short (320, pennants 360, triangles 320, card 180', 'th'));
$tr.append(createEl('Long 720', 'th'));
$tr.append(createEl('Primary', 'th'));

const scale = 3 / 100;
for (const [key, flag] of Object.entries(flags)) {
	const $tr = document.createElement('tr');
	$tbody.append($tr);
	$tr.append(createEl(key));
	$tr.append(createEl(flag.slug ?? `(${key})`));

	$tr.append(createEl(flag.category));

	let div = createEl(svgDefault[key], 'div');
	let td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? `${540 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${360 * scale}vw`;
	$tr.append(td);

	div = createEl(svgSquare[key], 'div');
	td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? `${540 * scale}vw`
		: flag.shape === 'triangle' ? `${360 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${240 * scale}vw`;
	$tr.append(td);

	div = createEl(svgShort[key], 'div');
	td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? `${360 * scale}vw`
		: flag.shape === 'triangle' ? `${320 * scale}vw`
		: flag.dimensions === 'card' ? `${180 * scale}vw`
		: `${320 * scale}vw`;
	$tr.append(td);

	div = createEl(svgLong[key], 'div');
	td = createEl('');
	td.append(div);
	div.style.width = '24vw';
	$tr.append(td);

	div = createEl(svgPrimary[key], 'div');
	td = createEl('');
	td.append(div);
	td.style.background = '#eee';
	div.style.width =
		flag.shape === 'pennant' ? '18vw'
		: flag.shape === 'triangle' ? '12vw'
		: '8vw';
	$tr.append(td);
}
/*
const $pre = document.createElement('pre');
$pre.innerText = JSON.stringify(flags, null, 2);
$app?.append($pre);
*/
