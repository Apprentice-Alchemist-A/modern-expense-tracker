# プロジェクト概要と現在の状況

## 🎯 プロジェクト概要

**プロジェクト名**: 経費・食事管理アプリ リデザイン  
**開始日**: 2025-06-20  
**現在のステータス**: MVP機能80%完成（追加要件対応中）

### プロジェクトの目的
既存の経費管理アプリのUIを全面的にリデザインし、Notion風の洗練されたインターフェースで、より使いやすく視覚的に美しい統合型生活管理アプリケーションに進化させる。

## 📊 現在の開発進捗

### 完成度: 75%

#### ✅ 完成済み機能（90%）
- **基盤構築**
  - Next.js 14 (App Router) セットアップ
  - TypeScript設定
  - Tailwind CSS設定
  - デザインシステム構築

- **UI/UXコンポーネント**
  - 基本UIコンポーネント（Button, Input, Card等）
  - レイアウトシステム（AppLayout, Sidebar）
  - SVGアイコンシステム（カテゴリ別・色制御対応）
  - Notion風UIデザイン

- **認証システム**
  - Google OAuth認証
  - セッション管理
  - 認証状態の永続化
  - シングルトンクライアント実装

- **データベース**
  - Supabaseプロジェクト設定
  - PostgreSQLスキーマ設計
  - RLS（Row Level Security）実装
  - マスターデータ投入

- **主要機能**
  - 支出データ登録（新規作成フォーム）
  - 支出データ一覧表示（カード/リスト/テーブル）
  - フィルター機能（日付・カテゴリ・支払方法・金額・テキスト）
  - ソート機能（日付・金額・カテゴリ・タイトル）
  - ~~データ編集機能~~ → UI実装済み、動作確認必要
  - ~~データ削除機能~~ → 確認ダイアログ未実装

#### 🚧 開発中・要実装（25%）

**基本機能の改善**
- **編集機能の動作確認** - UIは実装済み、統合テスト必要
- **削除確認ダイアログ** - モーダル実装とアラート削除
- **表示制限機能** - ページネーション/無限スクロール
- **URL連携** - フィルター・ソート状態の保持

**新規ページ開発**
- **ダッシュボード** - 分析・統計表示
- **トップページ** - ランディングページ
- **設定ページ** - ユーザー設定管理
- **食事専用ページ** - 食事記録の特化ビュー
- **お店ページ** - 店舗別管理・地図連携

**高度な機能**
- **Google Photos連携** - 日付連動の写真選択
- **レシートOCR** - Google Cloud Vision API
- **食事タグシステム** - 階層タグ管理
- **テンプレート機能** - よく使うパターンの保存
- **高度な分析機能** - グラフ・レポート生成

**デプロイ**
- **Vercelデプロイ** - 本番環境設定

## 🛠️ 技術スタック

### フロントエンド
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Validation**: Zod
- **Charts**: Chart.js / Recharts (予定)

### バックエンド
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Google OAuth)
- **API**: Supabase RPC Functions
- **Storage**: Supabase Storage (画像保存用)
- **External APIs**: 
  - Google Photos API (予定)
  - Google Cloud Vision API (予定)
  - Google Maps API (予定)

### 開発ツール
- **Package Manager**: npm
- **Build Tool**: Next.js built-in
- **Deployment**: Vercel
- **Monitoring**: Vercel Analytics (予定)

## 📈 パフォーマンス指標

### 現在の状態
- **ビルドサイズ**: 未測定
- **初回ロード時間**: 開発環境で約2秒
- **データ取得速度**: 50件で約500ms（要改善）
- **TypeScriptエラー**: 0件

### 必要な最適化
- ページネーション実装（現在全件取得）
- 画像の遅延読み込み
- データキャッシュ戦略
- バンドルサイズ削減

## 🔧 開発環境

### 必要条件
- Node.js 18.x以上
- npm 9.x以上
- Supabaseアカウント
- Google Cloud Console（OAuth、Vision API、Photos API）
- Vercelアカウント

### 環境変数（追加予定）
```env
# 既存
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=

# 追加予定
GOOGLE_CLOUD_VISION_API_KEY=
GOOGLE_PHOTOS_CLIENT_ID=
GOOGLE_PHOTOS_CLIENT_SECRET=
GOOGLE_MAPS_API_KEY=
```

## 📝 既知の問題と改善点

### 修正済み
- ✅ SVGアイコンの色が変更されない問題
- ✅ Google OAuth認証ループ問題
- ✅ RPC関数404エラー
- ✅ データ型変換によるNaN表示
- ✅ 複数Supabaseクライアントインスタンス問題

### 要対応
- ⚠️ 削除時の確認ダイアログ未実装
- ⚠️ 編集機能の動作確認不足
- ⚠️ 大量データ時のパフォーマンス問題
- ⚠️ 適切な色分け・カラーテーマ未設定
- ⚠️ モバイルレスポンシブの最適化不足

### 未実装（優先度高）
- 📌 URL連携（ブラウザ履歴対応）
- 📌 分析ダッシュボード
- 📌 食事管理機能
- 📌 お店データベース

## 🎨 デザインコンセプト

### インスピレーション
- **Notion**: クリーンで洗練されたUI
- **Obsidian**: 高度なフィルタリング機能
- **Google Photos**: 直感的な画像管理
- **食べログ**: 店舗情報の構造化

### デザイン原則
1. **シンプルさ**: 必要最小限の要素で最大の効果
2. **一貫性**: 統一されたデザイン言語
3. **レスポンシブ**: あらゆるデバイスで快適に使用
4. **アクセシビリティ**: すべてのユーザーが使いやすい
5. **視覚的階層**: 適切な色分けと情報の優先順位

## 📊 データモデル（拡張予定）

### 既存テーブル
- `expense_groups` - 支出グループ（親）
- `expense_items` - 支出明細（子）
- `categories` - カテゴリマスター
- `payment_methods` - 支払方法マスター
- `stores` - 店舗マスター（未使用→要実装）
- `tags` - タグマスター（未使用→要実装）
- `templates` - テンプレート（未使用→要実装）

### 追加予定テーブル
- `food_records` - 食事記録（支出と独立）
- `food_tags` - 食事タグ（階層構造）
- `store_locations` - 店舗位置情報
- `receipt_images` - レシート画像
- `photo_links` - Google Photos連携

## 🚀 次のステップ（優先順位順）

1. **緊急対応（3日以内）**
   - 削除確認ダイアログ実装
   - 編集機能の動作確認
   - URL連携実装

2. **短期目標（1週間）**
   - ダッシュボード作成
   - 表示制限（ページネーション）
   - Vercelデプロイ

3. **中期目標（2週間）**
   - 食事管理機能
   - お店データベース
   - テンプレート機能

4. **長期目標（1ヶ月）**
   - Google Photos連携
   - レシートOCR
   - 地図連携

---
最終更新: 2025-06-23  
作成者: Claude Code