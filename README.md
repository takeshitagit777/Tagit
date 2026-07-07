# takeshita hiroki portfolio

和風・盆栽モチーフの制作実績ポートフォリオサイトです。

## スクリーンショットの更新

制作実績カードは `assets/works/{slug}.png` をサムネイルとして表示します。
各リンク先サイトのファーストビューを更新したいときは、次のコマンドを実行してください。

```bash
npm install
npx playwright install chromium
npm run capture:works
```

撮影設定は `scripts/capture-works.mjs` で管理しています。

- viewport: `1440 x 900`
- `fullPage: false`
- 保存先: `assets/works/`
- 対象: `assets/js/works.mjs` の `liveUrl` が設定されている制作実績

生成される主な画像:

```txt
assets/works/saga-chuo-motors.png
assets/works/saga-agritech.png
assets/works/seiko-manufacturing.png
assets/works/hoken.png
assets/works/toremachi.png
assets/works/chotgpt.png
```

外部URLにアクセスできない環境では画像生成に失敗します。その場合は、ネットワーク接続がある環境で上記コマンドを実行してください。

## Vercel

`npm run build` は静的ファイルを `public/` に出力します。Vercel の Output Directory が `public` のままでデプロイできます。
