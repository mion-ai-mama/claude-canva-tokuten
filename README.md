# Claude×Canva連携 完全ガイド

Instagramリール特典として配布する、スマホ対応の1ページ完結ガイドです。
HTML / CSS / JavaScript だけで作られた静的サイトで、ビルド作業は必要ありません。

---

## 0. 公開先

- 公開ページ: <https://mion-ai-mama.github.io/claude-canva-tokuten/>
- リポジトリ: <https://github.com/mion-ai-mama/claude-canva-tokuten>（Public）

## 1. プロジェクト概要

| 項目 | 内容 |
|---|---|
| ページタイトル | Claude×Canva連携 完全ガイド |
| サブタイトル | 画像の土台を作って、Canvaで仕上げる実践手順 |
| 想定読者 | 40〜50代のAI初心者女性（スマートフォン閲覧が中心） |
| 目的 | ClaudeとCanvaを連携し、デザイン案をCanvaで仕上げられるようになること |
| 技術 | HTML5 / CSS3 / Vanilla JavaScript（外部フレームワーク不使用） |
| 公開 | GitHub Pages（静的ファイルの配信のみ） |

ページに含まれる主な機能は次のとおりです。

- ページ内目次から各セクションへ移動できる
- すべてのプロンプトに「コピーする」ボタンがあり、押すと「コピーしました！」と表示される
- 長いプロンプトは開閉式（タップでひらく）
- 「うまくいかないとき」はアコーディオン形式
- 「Canvaで仕上げるポイント」はタップでオン・オフできるチェックリスト
- 画像が未配置でもレイアウトが崩れず、差し替え場所が分かるプレースホルダーを表示

---

## 2. ファイル構成

```text
/
├── index.html      ページ本体（文章もここに入っています）
├── style.css       配色・レイアウト
├── script.js       画像プレースホルダー / コピー機能 / 先頭へ戻るボタン
├── README.md       このファイル
└── assets/
    ├── connection-01.webp     STEP1（「＋」ボタン）の画面
    ├── connection-02.webp     STEP2（コネクタを追加）の画面
    ├── connection-03.webp     STEP3（コネクタを参照）の画面
    ├── connection-04.webp     STEP4（Canvaを連携）の画面
    ├── connection-05.webp     STEP5（Canvaで許可）の画面
    ├── connection-06.webp     STEP6（コネクタをオンにする）の画面
    ├── instagram-after.webp   Instagram表紙：Canvaで仕上げた完成例
    ├── banner-after.webp      バナー：Canvaで仕上げた完成例
    ├── ogp.webp               SNSでシェアされたときの画像
    ├── openchat-banner.webp   オープンチャットのバナー（配置済み）
    └── cta-banner.png         AIマネタイズの教科書バナー（配置済み）
```

---

## 3. ローカルでの確認方法

いちばん簡単な方法は、`index.html` をダブルクリックしてブラウザで開くことです。
これだけでも表示とコピー機能を確認できます。

本番に近い状態で確認したい場合は、簡易サーバーを使います。

```bash
cd claude-canva-tokuten
python3 -m http.server 8000
```

ブラウザで <http://localhost:8000> を開きます。
終了するときはターミナルで `Ctrl` + `C` を押します。

> サーバーは1つだけ起動してください。ポートが使用中と表示された場合は、
> `8000` の部分を `8001` などに変えます。

---

## 4. GitHub Pagesでの公開方法

1. GitHubで新しいリポジトリを作成し、このフォルダの中身をすべてアップロードします。
2. リポジトリの **Settings** → **Pages** を開きます。
3. **Source** で「Deploy from a branch」を選びます。
4. **Branch** で `main`、フォルダは `/ (root)` を選び、**Save** を押します。
5. 数分待つと `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます。

公開URLが決まったら、`index.html` の以下2か所を実際のURLに書き換えてください
（OGPの表示に使われます）。

```html
<meta property="og:image" content="https://mion-ai-mama.github.io/claude-canva-tokuten/assets/ogp.webp">
<meta property="og:url"   content="https://mion-ai-mama.github.io/claude-canva-tokuten/">
```

---

## 5. 画像の差し替え方法

`assets/` フォルダに、**上の表と同じファイル名**で画像を置くだけで反映されます。
HTMLを書き換える必要はありません。

- 画像が無い間は「ここに◯◯の画像を入れてください」という枠が表示されます。
- 画像を置くと、その枠が自動的に画像に変わります。
- 推奨形式は `.webp` です。`.jpg` や `.png` を使いたい場合は、
  `index.html` 内の該当する `src="assets/○○.webp"` を実際のファイル名に変更してください。
- 縦横比の目安：連携手順はスクリーンショットの実寸／Instagram表紙 4:5 / 横長バナー 1200:628

---

## 6. OGP画像の変更方法

SNSでシェアされたときに表示される画像です。

1. 1200×630px 程度の画像を `assets/ogp.webp` として保存します。
2. 公開URLが `https://mion-ai-mama.github.io/claude-canva-tokuten/` 以外の場合は、
   `index.html` の `og:image` と `og:url` を実際のURLに書き換えます（§4参照）。
3. OGP画像は**絶対URL**（`https://` から始まるURL）でないとSNSに表示されません。

作らない場合は、`index.html` の `og:image` の行を削除し、
`twitter:card` を `summary` に変更してください。

---

## 7. 掲載情報の日付

- 掲載情報の基準日：**2026年9月15日**
- 変更したときは、`index.html` の「参考情報・免責事項」内にある日付も
  あわせて更新してください。

---

## 8. 更新時に確認すべき公式URL

ClaudeとCanvaは画面や名称が変わることがあります。更新前に次を確認してください。

- Canva AI Connector … <https://www.canva.com/ai-connector/>
- Canva AI Connectorヘルプ … <https://www.canva.com/help/mcp-agent-setup/>
- Claude公式ヘルプ … <https://support.anthropic.com/>

特に、連携手順（STEP1〜6）のボタン名と画面の並びは変わりやすい箇所です。

---

## 9. スマートフォン表示の確認方法

**パソコンで確認する場合**

1. Chromeでページを開きます。
2. `F12`（Macは `option` + `command` + `I`）で開発者ツールを開きます。
3. 左上のスマートフォンのアイコンを押し、機種を `iPhone SE` などに切り替えます。
4. 横方向にスクロールしないこと、文字や画像がはみ出していないことを確認します。

**実機で確認する場合**

パソコンとスマートフォンを同じWi-Fiにつなぎ、パソコンで簡易サーバーを起動して、
スマートフォンから `http://<パソコンのIPアドレス>:8000` を開きます。

確認するポイント：

- 横スクロールが起きない
- 「コピーする」を押すと「コピーしました！」と表示される
- 目次から各セクションへ移動できる
- 文字が小さすぎない

---

## 10. 注意

- このページは学習・情報提供を目的としたもので、特定の収益や成果を保証するものではありません。
- ClaudeやCanvaが生成した文字、URL、人物、商品情報は、公開前に必ず確認してください。
