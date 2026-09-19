import {cp, mkdir, rm} from 'node:fs/promises';

const files = [
  'index.html',
  'styles.css',
  'app.js',
  'telegram.js',\n  'data.js',
  'manifest.webmanifest'
];

await rm('dist', {recursive: true, force: true});
await mkdir('dist', {recursive: true});

for (const file of files) {
  await cp(file, `dist/${file}`);
}

console.log(`Built ${files.length} static assets into dist/`);
