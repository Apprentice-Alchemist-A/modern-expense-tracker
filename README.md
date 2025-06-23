# 経費・食事管理アプリ リデザイン

## プロジェクト概要

既存の経費管理アプリのUIを全面的にリデザインし、Notion風の洗練されたインターフェースに変更するプロジェクトです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **認証**: Supabase Auth (Google OAuth)
- **データベース**: Supabase (PostgreSQL)
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel

## 既存資産（引き継ぎ）

- Supabase設定: `https://otgwixohboxauaefahfe.supabase.co`
- データベーススキーマ: categories, payment_methods, expense_groups, expense_items
- Google OAuth認証設定

## 参照元プロジェクト

`/mnt/e/MyProject/ToDoExtension/` - 既存実装（UIは完全に作り直し）

## ディレクトリ構成

```
expense-tracker-redesign/
├── design-docs/           # 設計ドキュメント
│   ├── wireframes/        # ワイヤーフレーム
│   ├── component-specs/   # コンポーネント仕様
│   ├── design-system/     # デザインシステム定義
│   └── ui-patterns/       # UIパターン集
├── app/                   # Next.js App Router
├── components/            # Reactコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── forms/            # フォームコンポーネント
│   ├── data-display/     # データ表示コンポーネント
│   ├── charts/           # チャート・分析コンポーネント
│   └── templates/        # テンプレート機能
├── lib/                  # ユーティリティ・設定
│   ├── supabase/         # Supabase関連
│   ├── utils/            # ユーティリティ関数
│   └── validations/      # バリデーション
├── types/                # TypeScript型定義
├── hooks/                # カスタムフック
├── styles/               # グローバルスタイル
└── public/               # 静的ファイル
```

## 重要な新機能

1. **クイック入力モード** - お店テンプレートによる高速入力
2. **タグ機能** - 自由なタグ付けと検索
3. **お店データベース** - よく行く店の管理
4. **テンプレート機能** - 入力パターンの保存
5. **データ可視化** - 月別推移、カテゴリ別分析

## デザインコンセプト

- **参考**: Notion、Obsidian、VSCode
- **スタイル**: シンプルで洗練された
- **アニメーション**: 適度な動きで操作感を演出
- **全体感**: モダンで落ち着いた雰囲気