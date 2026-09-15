# 開発進捗：Claude×Canva連携 完全ガイド

## アーキ構成

- 確定アーキ: #6 WEBアプリ（決定論）の最小形＝静的1ページサイト
- 操作者: ブラウザのエンドユーザー
- AI本体(プロンプトY): なし ／ MCP: なし ／ 自社DB: なし
- フロントUI: あり ／ 動的変数: なし
- 種別: Web型 ／ 配布: GitHub Pages で公開

## 実装計画

### 開発フェーズ

| Phase | 名称 | 担当 | 状態 |
|-------|------|------|------|
| 1 | 要件定義 | Agent 1 | [x] |
| 2 | Git管理 | Agent 2 | [x] mion-ai-mama/claude-canva-tokuten（Public） |
| 3 | フロントエンド基盤 | Agent 3 | [x] |
| 4 | ページ実装 | Agent 4 | [x] |
| 5 | 環境構築 | Agent 5 | スキップ（環境変数・依存パッケージなし） |
| 6 | バックエンド計画 | Agent 6 | スキップ（バックエンドなし） |
| 7 | エージェント構築 | Agent 7 | スキップ（AI本体なし） |
| 8 | バックエンド実装 | Agent 8 | スキップ（バックエンドなし） |
| 9 | フロントエンド実装(API統合) | Agent 9 | スキップ（API連携なし） |
| 10 | E2Eテスト | Agent 10 | [x] Playwrightで実施 |
| 11 | ローカル動作確認 | Agent 11 | [x] 320 / 375 / 390 / 1280px で確認 |
| 12 | デプロイ | Agent 12 | [x] GitHub Pages 公開済み（2026-09-16） |

## ページ管理表

| ID | セクション | 状態 |
|----|-----------|------|
| P-001 | ファーストビュー | [x] |
| P-002 | 目次 | [x] |
| P-003 | Claude×Canvaでできること | [x] |
| P-004 | 連携方法（STEP1〜6） | [x] |
| P-005 | 基本の使い方 | [x] |
| P-006 | 用途別コピペ用プロンプト（5-1〜5-4） | [x] |
| P-007 | うまくいかないとき | [x] |
| P-008 | Canvaで仕上げるポイント | [x] |
| P-009 | Claude in Chrome | [x] |
| P-010 | まとめ | [x] |
| P-011 | ご案内（AIマネタイズの教科書） | [x] |
| P-012 | 参考情報・免責事項 | [x] |

## 公開情報

- リポジトリ: https://github.com/mion-ai-mama/claude-canva-tokuten （Public）
- 公開ページ: https://mion-ai-mama.github.io/claude-canva-tokuten/
- ブランチ `main` / `/ (root)` を GitHub Pages が配信
- `index.html` の `og:image` / `og:url` は上記URLで設定済み（書き換え不要）

## 検証結果（2026-09-16 / Chromium・公開URLで再確認）

| 項目 | 結果 |
|---|---|
| 横スクロール（320 / 375 / 1280px） | なし |
| 画面外へのはみ出し要素 | なし |
| JavaScriptエラー | なし |
| コピーボタン11個 | すべて「コピーしました！」表示 |
| 目次リンク9件 | すべて対象セクションへ移動 |
| アコーディオン開閉 | 正常 |
| チェックボックス | タップでオン・オフ可能 |
| 外部リンク5件 | すべて `rel="noopener noreferrer"` |
| 画像未配置時 | 10か所すべてプレースホルダー表示・レイアウト崩れなし |

## 残作業（素材の配置）

`assets/` に同名ファイルを置くだけで反映される。

| ファイル名 | 内容 | 状態 |
|---|---|---|
| `hero-image.webp` | ファーストビューのメイン画像 | [ ] |
| `connection-01〜05.webp` | 連携手順STEP1〜5の画面 | [ ] |
| `instagram-before.webp` / `instagram-after.webp` | Instagram表紙のビフォーアフター | [ ] |
| `banner-before.webp` / `banner-after.webp` | 横長バナーのビフォーアフター | [ ] |
| `ogp.webp` | SNSシェア画像（1200×630px推奨） | [ ] |
| `cta-banner.png` | ご案内バナー | [x] 配置済み |

画像を `assets/` に置いて `git add -A && git commit && git push` すると、数分で公開ページに反映される。
