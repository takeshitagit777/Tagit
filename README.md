# takeshita hiroki portfolio

和風・盆栽モチーフの制作実績ポートフォリオサイトです。
GitHubに上げている制作物をすべてカードで表示し、公開URLがあるものは実際のサイト画面を自動スクリーンショットとして表示できます。

## 使い方

### 1. ローカルで開く

`index.html` をブラウザで開けば表示できます。

### 2. 公開URLを追加する

`assets/js/works.mjs` の各プロジェクトの `liveUrl` に、Vercelなどで公開したURLを入力してください。

例:

```js
{
  slug: 'ripical',
  title: 'リピカル',
  liveUrl: 'https://xxxxx.vercel.app'
}
```

### 3. 実際のサイト画面を自動撮影する

```bash
npm install
npx playwright install chromium
npm run capture:works
```

成功すると、以下のようにPNG画像が作られます。

```txt
assets/works/saga-chuo-motors.png
assets/works/ripical.png
assets/works/toremachi.png
```

サイト側は `assets/works/{slug}.png` を優先表示します。PNGがない場合は仮サムネイルSVGを表示します。

## GitHubに上げるとき

このフォルダの中身をそのままGitHubリポジトリへ入れてください。
Vercelにデプロイする場合も、このままインポートできます。

