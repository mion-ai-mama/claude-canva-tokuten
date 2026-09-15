# Claude×Canva連携 完全ガイド（Instagramリール特典ページ）

> 設計の共通原則（基本原則・資産価値の原則・自律解決の原則）は `~/.claude/CLAUDE.md` に従う。

## プロジェクト設定

技術スタック:
  frontend: HTML5 / CSS3 / Vanilla JavaScript（ビルド工程なし・フレームワーク不使用）
  backend: なし
  database: なし
  hosting: GitHub Pages（静的ファイル配信のみ）

ビルド・サーバーが不要な完全な静的サイト。`index.html` を直接開く、または
`python3 -m http.server` で確認する。ポートのランダム生成・バックエンドポートの割り当ては不要。

## 環境変数

このプロジェクトは環境変数を使用しない（APIキー・DB接続情報が一切不要な静的サイトのため）。
`.env` 系ファイルは作成しない。

## ファイル構成の原則

指示書で指定されたフラット構成を維持する（テンプレート元リポジトリの `css/` `js/` 分割とは異なる）。

```text
index.html / style.css / script.js / README.md / assets/
```

- **文章の単一の源は `index.html`**。このページは `content.js` 方式を使わない。
  文言を変えるときは `index.html` を直接編集する。
- 画像は `assets/` に**同名ファイル**を置くだけで反映される。HTMLの書き換えは不要。
- 画像が無い間は `script.js` がプレースホルダー枠に差し替える（レイアウトは崩れない）。

## 命名規則

- ファイル: kebab-case（例: `connection-01.webp`）
- JavaScript変数・関数: camelCase / CSSクラス: BEM風（`.block__element--modifier`）

## 配色（変更しないこと。変える場合はユーザー確認）

| 用途 | 変数 | 値 |
|---|---|---|
| 背景 | `--color-bg` | `#FFF9F2` |
| メイン文字 | `--color-text` | `#4A3025` |
| オレンジ（ボタン・重要箇所のみ） | `--color-orange` | `#F28A32` |
| くすみピンク | `--color-pink` | `#D9A09B` |
| 薄いベージュ | `--color-beige` | `#F2E4D8` |
| 白 | `--color-white` | `#FFFFFF` |
| 注意 | `--color-note` | `#FFF2D9` |
| 失敗例 | `--color-fail` | `#FFF0F0` |

本文16px以上・行間1.8・オレンジはボタンと重要箇所だけ、を守る。

## コード品質

- 関数: 100行以下 / ファイル: 700行以下 / 複雑度: 10以下 / 行長: 120文字
- 700行基準は `style.css` / `script.js` に適用する。`index.html` は掲載文章そのもの
  （プロンプト全文を含む）を保持するため対象外とし、分割しない（単一性を優先）。

## 表示確認（納品前に必須）

Playwrightで実ビューポートを再現して確認する。
claude-in-chrome拡張の `resize_window` はOSウィンドウのみでCSSビューポート幅が変わらず、
モバイル幅の検証には使えない。

確認項目: 横スクロールが起きない（320 / 375 / 1280px）／JSエラーなし／
コピーボタンで「コピーしました！」が出る／目次から各セクションへ移動できる／
画像未配置でもレイアウトが崩れない。

## 画像の扱い

- `<img>` に `width` / `height` 属性を付けない。
  CSS側で `aspect-ratio` + `object-fit: contain` + `height: auto` を使う
  （Instagramアプリ内ブラウザで縦に歪む不具合の対策）。
- 縦横比は `style="--ar: 4 / 5;"` のようにインライン変数で指定する。

## ドキュメント管理

許可されたドキュメントのみ作成可能:
- `README.md`（テンプレートの使い方・公開手順）
- `docs/requirements.md`（要件定義）
- `docs/SCOPE_PROGRESS.md`（進捗管理）

上記以外のドキュメント作成はユーザー許諾が必要。実装済みの記載は積極的に削除する。

## 公開

- GitHub Pages（`main` ブランチ / `/ (root)`）
- 公開後、`index.html` の `og:image` と `og:url` を実際の公開URLに書き換える
- 親ディレクトリ `instagram-tokuten-template` とは別リポジトリとして扱う
  （親の `.gitignore` に `claude-canva-tokuten/` を登録済み）
