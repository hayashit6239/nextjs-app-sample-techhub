# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

Next.js App Router を使用した技術スタック共有アプリ。プロジェクトと採用技術を管理し、ユーザーがログインして技術情報を編集できる機能を提供。

## 開発コマンド

### 基本開発
- `npm run dev` - 開発サーバー起動（Turbopack使用）
- `npm run build` - プロダクションビルド
- `npm start` - プロダクションサーバー起動
- `npm run lint` - ESLint実行

### データベース
- `npm run validate` - Prisma スキーマ検証
- `npm run seed` - テストデータ投入
- `npm run test` - テスト実行（DB リセット + Bun テスト）

### Docker 環境
- `./build.sh` - Docker コンテナ build & run（ポート3000）

## アーキテクチャ

### 設計パターン
Container/Presentational パターンを採用：
- **Container**: Server Components でデータ取得とビジネスロジック
- **Presentational**: Client Components で UI表示

### ディレクトリ構成

```
src/app/
├── @modal/          # Intercepting Routes用モーダル
├── projects/        # プロジェクト機能
│   ├── _containers/ # Container Components
│   ├── _utils/      # データ取得ユーティリティ
│   └── [id]/        # 動的ルート
├── login/logout/    # 認証機能
└── layout.tsx       # ルートレイアウト（MantineProvider含む）

src/components/      # 共通コンポーネント（Radix UI + Tailwind）
src/features/        # ドメイン別コンポーネント
src/lib/             # ユーティリティ・型定義・Prisma設定
src/server/api/      # Route Handlers
```

### データベース（Prisma + SQLite）
- Project, Department, Techcategory, Techtopic, Adoption, User, Affiliation
- 開発では SQLite、本番では PostgreSQL 想定（schema_postgres.prisma）

### 認証
- JWT ベース（jose ライブラリ）
- bcrypt でパスワードハッシュ化
- デフォルトユーザー: username=tester, password=test

## フレームワーク・ライブラリ

- **UI**: Mantine + Radix UI + Tailwind CSS
- **フォーム**: Formik + Zod
- **テスト**: Bun Test
- **ORM**: Prisma
- **認証**: jose + bcrypt

## 開発時の注意点

- テスト実行時は DB が自動リセットされる
- 技術追加後はページリロードが必要
- Container/Presentational の責務分離を維持
- パス解決には `@/*` エイリアスを使用