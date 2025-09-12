import './style.css';
import { flagSet, allSvg, generateLong, generatePrimary, generateSquare } from '../../src';

const $app = document.querySelector<HTMLDivElement>('#app');

const $table = document.createElement('table');
const $tbody = document.createElement('tbody');
$table.append($tbody);
$app?.append($table);

const createEl = (html: string, el = 'td') => {
  const child = document.createElement(el);
  child.innerHTML = html;
  return child;
};

const flags = allSvg();
const flagsLong = generateLong();
const flagsSquare = generateSquare();
const flagsPrimary = generatePrimary();

for (const [key, flag] of Object.entries(flagSet)) {
  const $tr = document.createElement('tr');
  $tbody.append($tr);
  $tr.append(createEl(key));
  $tr.append(createEl(flag.name));

  let div = createEl(flagsLong[key], 'div');
  let td = createEl('');
  td.append(div);
  div.style.width = flag.shape === 'pennant' ? '24vw' : '9vw';
  $tr.append(td);

  div = createEl(flags[key], 'div');
  td = createEl('');
  td.append(div);
  div.style.width = flag.shape === 'pennant' ? '18vw' : '12vw';
  $tr.append(td);

  div = createEl(flagsSquare[key], 'div');
  td = createEl('');
  td.append(div);
  div.style.width = flag.shape === 'pennant' ? '18vw' : '9vw';
  $tr.append(td);

  div = createEl(flagsPrimary[key], 'div');
  td = createEl('');
  td.append(div);
  div.style.width = flag.shape === 'pennant' ? '18vw' : '12vw';
  $tr.append(td);
}
