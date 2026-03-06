# 歯科専用フェイスタオル | O premium

現場の歯科衛生士が考えた、超甘撚り糸で織りあげた歯科専用プレミアムタオルのブランドサイトです。

## 技術スタック

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Motion** (アニメーション)
- **lucide-react** (アイコン)

## 開発

**前提:** Node.js がインストールされていること

1. 依存関係のインストール:
   ```bash
   npm install
   ```
2. 開発サーバー起動:
   ```bash
   npm run dev
   ```
3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## スクリプト

- `npm run dev` - 開発サーバー起動 (ポート 3000)
- `npm run build` - 本番ビルド
- `npm run start` - 本番サーバー起動
- `npm run lint` - ESLint 実行

## 構成

- `src/app/` - Next.js App Router（ページ・レイアウト・グローバルCSS）
- `src/components/` - 共通コンポーネント（Layout など）
