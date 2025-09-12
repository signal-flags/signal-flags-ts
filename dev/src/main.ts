import './style.css';
import { flagSets, getSvg } from '../../src';

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

for (const flagSet of Object.values(flagSets)) {
  for (const [key, flag] of Object.entries(flagSet)) {
    const $tr = document.createElement('tr');
    $tbody.append($tr);
    $tr.append(createEl(key));
    $tr.append(createEl(flag.name));

    let td = createEl(getSvg(flag));
    td.style.width = '10vw';
    $tr.append(td);

    td = createEl(getSvg(flag, { dimensions: 'square' }));
    td.style.width = '10vw';
    $tr.append(td);

    td = createEl(
      getSvg(flag, {
        clrSet: 'primary',
        outline: false,
        dimensions: 'square',
      }),
    );
    td.style.width = '10vw';
    $tr.append(td);
  }
}

