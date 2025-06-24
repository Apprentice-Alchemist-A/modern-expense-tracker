# Vercel環境変数設定ガイド

## OAuth認証問題の修正

Google認証でlocalhostにリダイレクトされる問題を解決するため、Vercelの環境変数を更新してください。

**修正完了**: 2025-01-28  
**コミット**: cdae2ce - Google OAuth認証リダイレクトURL修正

## 設定手順

### 1. Vercelダッシュボードにアクセス
1. https://vercel.com にログイン
2. `modern-expense-tracker-app` プロジェクトを選択
3. "Settings" タブをクリック
4. "Environment Variables" セクションに移動

### 2. 環境変数の更新
以下の環境変数を更新してください：

```
NEXT_PUBLIC_APP_URL=https://modern-expense-tracker-app.vercel.app
```

**重要**: この値は現在 `http://localhost:3000` になっている可能性があります。

### 3. 再デプロイ
環境変数を更新後、以下のいずれかの方法で再デプロイしてください：
- Vercelダッシュボードの "Deployments" タブから最新デプロイを "Redeploy"
- またはGitリポジトリに新しいコミットをプッシュ

## Supabase設定も確認

Supabase管理画面でも以下を確認してください：

1. **Supabaseダッシュボード** → **Authentication** → **URL Configuration**
   - Site URL: `https://modern-expense-tracker-app.vercel.app`
   - Redirect URLs: `https://modern-expense-tracker-app.vercel.app/auth/callback`

2. **OAuth Providers** → **Google**
   - Authorized redirect URIs: `https://modern-expense-tracker-app.vercel.app/auth/callback`

## 確認方法

設定完了後、以下で動作確認：
1. https://modern-expense-tracker-app.vercel.app にアクセス
2. "Googleでログイン" をクリック
3. 認証完了後、localhostではなく本番URLにリダイレクトされることを確認

---

**注意**: 環境変数変更後は必ず再デプロイが必要です。