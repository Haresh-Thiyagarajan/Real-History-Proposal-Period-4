#!/usr/bin/env node
'use strict';

// Refresh the static reading copies embedded in the six HTML pages.
// Visitors still open the site directly; this helper is only needed after
// editing js/data.js and before publishing the updated no-JavaScript version.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourceFiles = ['js/data.js', 'js/map-paths.js', 'js/app.js'];
const scripts = sourceFiles.map(file => fs.readFileSync(path.join(root, file), 'utf8'));
const routes = [
  ['index.html', 'intro'],
  ['outbreak.html', 'outbreak'],
  ['evidence.html', 'evidence'],
  ['change.html', 'change'],
  ['historians.html', 'historians'],
  ['conclusion.html', 'conclusion']
];
const note = '<noscript class="noscript-note"><p>This reading version includes the full chapter text, evidence and citations below. Votes, filters, saved weights, lightbox, animations and presentation controls require JavaScript. Saved responses stay in this browser.</p></noscript>\n';

function render(page) {
  const main = { innerHTML: '', focus() {} };
  const classList = { add() {}, remove() {}, toggle() {} };
  const document = {
    title: '',
    body: { dataset: { page }, classList },
    documentElement: { scrollHeight: 1200, classList },
    getElementById(id) { return id === 'chapter-content' ? main : null; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    addEventListener() {}
  };
  const store = new Map();
  const context = {
    console,
    document,
    location: { hash: '' },
    localStorage: {
      getItem(key) { return store.get(key) || null; },
      setItem(key, value) { store.set(key, value); },
      removeItem(key) { store.delete(key); }
    },
    requestAnimationFrame() { return 1; },
    cancelAnimationFrame() {},
    Date,
    performance: { now() { return 0; } },
    setTimeout,
    clearTimeout
  };
  context.window = context;
  context.innerWidth = 1440;
  context.innerHeight = 900;
  context.matchMedia = () => ({ matches: false });
  context.addEventListener = () => {};
  vm.createContext(context);
  for (const [index, script] of scripts.entries()) {
    vm.runInContext(script, context, { filename: sourceFiles[index] });
  }
  if (!main.innerHTML.includes('chapter-end')) {
    throw new Error(`The ${page} page could not be rendered with chapter navigation.`);
  }
  return main.innerHTML;
}

for (const [file, page] of routes) {
  const target = path.join(root, file);
  const html = fs.readFileSync(target, 'utf8');
  const open = '<main id="chapter-content" tabindex="-1">';
  const start = html.indexOf(open);
  const end = html.indexOf('</main>', start);
  if (start < 0 || end < 0) throw new Error(`${file}: missing chapter-content main element.`);
  const main = `\n${note}${render(page)}\n  `;
  fs.writeFileSync(target, html.slice(0, start + open.length) + main + html.slice(end));
  console.log(`Updated ${file}`);
}
