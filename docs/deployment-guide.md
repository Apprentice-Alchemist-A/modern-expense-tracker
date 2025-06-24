# 🚀 デプロイガイド - Vercel & GitHub

## 📋 デプロイ手順概要

1. **GitHubリポジトリ作成**
2. **Vercelアカウント作成とプロジェクト設定**
3. **環境変数設定**
4. **Supabase URL設定**
5. **デプロイ実行**

---

## 1. 📁 GitHubリポジトリ作成

### ステップ1: GitHubでリポジトリ作成
1. **[GitHub.com](https://github.com)** にアクセス
2. 右上の **"+"** → **"New repository"** をクリック
3. **Repository details**:
   ```
   Repository name: modern-expense-tracker
   Description: Modern expense tracking app with Notion-style UI built with Next.js 14 and Supabase
   Visibility: Public (推奨) または Private
   ```
4. **"Create repository"** をクリック

### ステップ2: ローカルからプッシュ
```bash
# リモートリポジトリ設定（既に設定済み）
git remote add origin https://github.com/Apprentice-Alchemist-A/modern-expense-tracker.git

# 初回プッシュ
git push -u origin master
```

---

## 2. 🌐 Vercelアカウント作成とプロジェクト設定

### ステップ1: Vercelアカウント作成
1. **[Vercel.com](https://vercel.com)** にアクセス
2. **"Start Deploying"** または **"Sign Up"** をクリック
3. **GitHub連携推奨**:
   - **"Continue with GitHub"** を選択
   - GitHubアカウントでログイン
   - Vercelの権限を承認

### ステップ2: 新しいプロジェクト作成
1. Vercelダッシュボードで **"New Project"** をクリック
2. **"Import Git Repository"** セクション:
   - **`modern-expense-tracker`** リポジトリを選択
   - **"Import"** をクリック

### ステップ3: プロジェクト設定
```yaml
# 自動検出される設定（確認用）
Framework Preset: Next.js
Build Command: npm run vercel-build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

---

## 3. ⚙️ 環境変数設定

### Vercel管理画面での設定
1. プロジェクト画面で **"Settings"** タブ
2. 左メニューから **"Environment Variables"**
3. 以下の変数を**1つずつ**追加:

```bash
# 必須環境変数
NEXT_PUBLIC_SUPABASE_URL
Value: https://otgwixohboxauaefahfe.supabase.co
Environment: Production, Preview, Development

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90Z3dpeG9oYm94YXVhZWZhaGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzExMjEsImV4cCI6MjA1MzU0NzEyMX0.Cv1qhxK3vbQT2LyRY2iV4mfHKpOA6EXhQnNbw5zJ8aU
Environment: Production, Preview, Development

NEXT_PUBLIC_APP_URL
Value: https://your-project-name.vercel.app  # デプロイ後に更新
Environment: Production, Preview, Development
```

### 🔒 セキュリティ注意事項
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** は公開されても安全な匿名キーです
- **本番環境では** Supabase RLS (Row Level Security) が有効です
- **秘密鍵は絶対にコミットしない**

---

## 4. 🔗 Supabase URL設定

### Supabaseダッシュボードでの設定
1. **[Supabase Dashboard](https://supabase.com/dashboard)** にアクセス
2. プロジェクト **`expense-tracker-app`** を選択
3. **Authentication** → **URL Configuration**:

```yaml
Site URL: https://your-project-name.vercel.app
Additional Redirect URLs:
  - https://your-project-name.vercel.app/auth/callback
  - https://your-project-name-*.vercel.app/auth/callback  # Preview用
```

### Google OAuth設定確認
```yaml
# Authentication > Providers > Google
Client ID: 既に設定済み
Client Secret: 既に設定済み
Redirect URL: https://otgwixohboxauaefahfe.supabase.co/auth/v1/callback
```

---

## 5. 🎯 デプロイ実行

### 自動デプロイ
1. **GitHubにプッシュするだけ**で自動デプロイ開始
2. **Vercelダッシュボード**でビルド状況確認
3. **デプロイ完了**後にドメインが発行される

### 手動デプロイ（必要に応じて）
```bash
# Vercel CLIインストール（オプション）
npm i -g vercel

# ローカルからデプロイ
vercel --prod
```

---

## 6. ✅ デプロイ後の確認事項

### 動作確認チェックリスト
- [ ] **トップページ** (/) が表示される
- [ ] **ダッシュボード** (/dashboard) にリダイレクトされる
- [ ] **Google OAuth** でログインできる
- [ ] **支出データ** が正常に表示される
- [ ] **新規登録・編集・削除** が機能する
- [ ] **フィルター・ソート** が動作する
- [ ] **グラフ・チャート** が表示される

### パフォーマンス確認
- [ ] **Lighthouse Score** 90点以上
- [ ] **Core Web Vitals** 全てGreen
- [ ] **モバイル表示** 正常
- [ ] **セキュリティヘッダー** 設定済み

---

## 7. 🛠 トラブルシューティング

### よくあるエラーと解決法

#### ビルドエラー
```bash
# TypeScriptエラー
Solution: npm run type-check でローカル確認

# 依存関係エラー  
Solution: package-lock.json削除 → npm install
```

#### 認証エラー
```bash
# OAuth Redirect エラー
Solution: Supabase URL設定確認

# 環境変数エラー
Solution: Vercel環境変数設定確認
```

#### データベース接続エラー
```bash
# Supabase接続エラー
Solution: 環境変数とSupabase設定確認

# RLS Policy エラー
Solution: authenticated ユーザー用ポリシー確認
```

---

## 📞 サポート

### ドキュメント
- **[Vercel Docs](https://vercel.com/docs)**
- **[Next.js Deploy](https://nextjs.org/docs/deployment)**
- **[Supabase Auth](https://supabase.com/docs/guides/auth)**

### コミュニティ
- **[Vercel Discord](https://vercel.com/discord)**
- **[Supabase Discord](https://supabase.com/discord)**

---

## 🎉 デプロイ成功後

デプロイが成功したら：
1. **ドメインURL**をチーム/ユーザーに共有
2. **進捗報告**を作成
3. **次の機能開発**に進む

**Good luck with your deployment! 🚀**