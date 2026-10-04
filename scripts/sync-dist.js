#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const output = path.resolve('dist');
const files = [
  'index.html',
  'outbreak.html',
  'evidence.html',
  'change.html',
  'historians.html',
  'conclusion.html',
  'manus-routes.json',
];
const directories = ['css', 'js', 'img', 'fonts'];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of files) {
  if (!fs.statSync(file).isFile()) throw new Error(`Required publish file is missing: ${file}`);
  fs.copyFileSync(file, path.join(output, file));
}
for (const directory of directories) {
  if (!fs.statSync(directory).isDirectory()) throw new Error(`Required publish directory is missing: ${directory}`);
  fs.cpSync(directory, path.join(output, directory), { recursive: true });
}

if (!fs.existsSync(path.join(output, 'index.html'))) throw new Error('dist/index.html was not created.');
console.log(`Prepared ${output} from ${files.length} route/config files and ${directories.length} asset directories.`);
