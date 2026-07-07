import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { works } from '../assets/js/works.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const requiredFiles = [
  'index.html',
  'assets/js/works.mjs',
  'assets/js/main.mjs',
  'scripts/capture-works.mjs'
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(rootDir, file)));

const missingScreenshots = works
  .filter((work) => work.liveUrl)
  .map((work) => `assets/works/${work.slug}.png`)
  .filter((file) => !fs.existsSync(path.join(rootDir, file)));

if (missingFiles.length > 0 || missingScreenshots.length > 0) {
  if (missingFiles.length > 0) {
    console.error('Missing required files:');
    missingFiles.forEach((file) => console.error(`- ${file}`));
  }

  if (missingScreenshots.length > 0) {
    console.error('Missing work screenshots. Run `npm run capture:works`:');
    missingScreenshots.forEach((file) => console.error(`- ${file}`));
  }

  process.exit(1);
}

console.log('Static site validation passed.');
