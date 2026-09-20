import {cp, mkdir, rm} from 'node:fs/promises';
import {build} from 'esbuild';

const staticFiles = [
  'index.html',
  'styles.css',
  'manifest.webmanifest'
];

await rm('dist', {recursive: true, force: true});
await mkdir('dist', {recursive: true});

for (const file of staticFiles) {
  await cp(file, `dist/${file}`);
}

await build({
  entryPoints: ['telegram.js', 'data.js', 'app.js'],
  outdir: 'dist',
  bundle: false,
  platform: 'browser',
  format: 'iife',
  target: ['chrome61'],
  charset: 'utf8',
  legalComments: 'none',
  logLevel: 'info'
});

await cp('assets', 'dist/assets', {recursive: true});

console.log('Built compatibility JS for Chrome 61+ and copied static assets into dist/');
