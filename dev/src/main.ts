import './style.css';
import {
	flags,
	generateDefault,
	generateLong,
	generatePrimary,
	generateSquare,
} from '../../src/signal-flags';

const createEl = (html: string, el = 'td') => {
	const child = document.createElement(el);
	child.innerHTML = html;
	return child;
};

const svg = generateDefault().svg;
const svgLong = generateLong().svg;
const svgSquare = generateSquare().svg;
const svgPrimary = generatePrimary().svg;

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
$tr.append(createEl('Long', 'th'));
$tr.append(createEl('Primary', 'th'));

for (const [key, flag] of Object.entries(flags)) {
	const $tr = document.createElement('tr');
	$tbody.append($tr);
	$tr.append(createEl(key));
	$tr.append(createEl(flag.slug ?? `(${key})`));

	$tr.append(createEl(flag.category));

	let div = createEl(svg[key], 'div');
	let td = createEl('');
	td.append(div);
	div.style.width = flag.shape === 'pennant' ? '18vw' : '12vw';
	$tr.append(td);

	div = createEl(svgSquare[key], 'div');
	td = createEl('');
	td.append(div);
	div.style.width =
		flag.shape === 'pennant' ? '18vw'
		: flag.shape === 'triangle' ? '12vw'
		: '8vw';

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
