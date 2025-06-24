# 経費・食事管理アプリ - リデザイン版

Notion風の洗練されたUIを持つ経費管理アプリです。

## 🚀 主要機能

- **ダッシュボード**: 支出の概要と分析
- **支出管理**: 支出の登録・編集・削除
- **フィルター・検索**: 高度な絞り込み機能
- **データ可視化**: グラフとチャートによる分析
- **認証**: Google OAuth認証

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **認証**: Supabase Auth (Google OAuth)
- **データベース**: Supabase (PostgreSQL)
- **スタイリング**: Tailwind CSS
- **グラフ**: Recharts
- **デプロイ**: Vercel

## 📦 セットアップ

### 1. プロジェクトのクローン

```bash
git clone <repository-url>
cd expense-tracker-redesign
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example` を参考に `.env.local` を作成：

```bash
cp .env.example .env.local
```

必要な環境変数：
- `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase匿名キー
- `NEXT_PUBLIC_APP_URL`: アプリケーションURL

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリにアクセスできます。

## 🏗 ビルドとデプロイ

### ローカルビルド

```bash
npm run build
npm run start
```

### Vercelデプロイ

1. Vercelアカウントにログイン
2. プロジェクトをインポート
3. 環境変数を設定
4. 自動デプロイ実行

## 📁 プロジェクト構成

```
expense-tracker-redesign/
├── app/                   # Next.js App Router
│   ├── dashboard/         # ダッシュボードページ
│   ├── expenses/          # 支出管理ページ
│   └── auth/              # 認証関連
├── components/            # Reactコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── forms/            # フォームコンポーネント
│   ├── dashboard/        # ダッシュボード用コンポーネント
│   └── expenses/         # 支出管理用コンポーネント
├── lib/                  # ユーティリティ・設定
│   ├── supabase/         # Supabase関連
│   ├── utils/            # ユーティリティ関数
│   └── validations/      # バリデーション
├── types/                # TypeScript型定義
├── styles/               # グローバルスタイル
└── public/               # 静的ファイル
```

## 🎨 デザインシステム

### カラーパレット

- **Primary**: Notion風の落ち着いたグレートーン
- **Semantic**: Success(緑)、Warning(黄)、Error(赤)、Info(青)
- **Category**: カテゴリ別の識別色

### コンポーネント

- 統一されたボタン、入力フィールド、カード
- ホバー効果とアニメーション
- レスポンシブ対応

## 📊 データベース

### テーブル構成

- `categories`: 支出カテゴリ
- `payment_methods`: 支払方法
- `expense_groups`: 支出グループ
- `expense_items`: 支出アイテム

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check

# Vercel用ビルド
npm run vercel-build
```

## 🚀 デプロイ

### Vercel設定

1. **環境変数**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`

2. **ビルド設定**:
   - Build Command: `npm run vercel-build`
   - Output Directory: `.next`

3. **セキュリティヘッダー**: 自動設定済み

## 📝 ライセンス

このプロジェクトはプライベートプロジェクトです。

## 🤝 コントリビューション

現在、外部からのコントリビューションは受け付けていません。# Deployment trigger
