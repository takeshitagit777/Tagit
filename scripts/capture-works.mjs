import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { works } from '../assets/js/works.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'assets', 'works');

fs.mkdirSync(outputDir, { recursive: true });

const targets = works.filter((work) => work.liveUrl && work.liveUrl.startsWith('http'));

if (targets.length === 0) {
  console.log('撮影対象のliveUrlがありません。assets/js/works.mjs の liveUrl を入力してください。');
  process.exit(0);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1
});

for (const work of targets) {
  const outputPath = path.join(outputDir, `${work.slug}.png`);
  try {
    console.log(`撮影中: ${work.title} / ${work.liveUrl}`);
    await page.goto(work.liveUrl, { waitUntil: 'networkidle', timeout: 90000 });
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`保存しました: assets/works/${work.slug}.png`);
  } catch (error) {
    console.error(`撮影失敗: ${work.title}`);
    console.error(error.message);
  }
}

await browser.close();
