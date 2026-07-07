import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './validate-site.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'public');

const entries = ['index.html', 'assets'];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const entry of entries) {
  fs.cpSync(path.join(rootDir, entry), path.join(outputDir, entry), {
    recursive: true
  });
}

console.log('Static site built to public/.');
