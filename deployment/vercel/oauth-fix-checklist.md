# Google OAuth認証修正チェックリスト

**問題**: Google認証後に `http://localhost:3000/?code=...` にリダイレクトされる  
**修正日**: 2025-01-28  
**状況**: コード修正完了、設定変更が必要

## ✅ 完了した修正

### 1. コード修正 (完了)
- **ファイル**: `/lib/supabase/auth.ts`
- **修正内容**: 環境変数 `NEXT_PUBLIC_APP_URL` を優先的に使用
- **コミット**: cdae2ce

```typescript
// 修正前
redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(currentPath)}`,

// 修正後
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
redirectTo: `${baseUrl}/auth/callback?redirectTo=${encodeURIComponent(currentPath)}`,
```

## 🔄 実行が必要な設定

### 2. Vercel環境変数設定 (要実行)

1. **Vercelダッシュボード**にアクセス
   - https://vercel.com
   - `modern-expense-tracker-app` プロジェクトを選択

2. **環境変数の確認・設定**
   - Settings → Environment Variables
   - `NEXT_PUBLIC_APP_URL` の値を確認
   - **正しい値**: `https://modern-expense-tracker-app.vercel.app`
   - **間違った値**: `http://localhost:3000`

3. **再デプロイ**
   - Deployments → 最新のデプロイを「Redeploy」
   - または新しいコミットをプッシュ

### 3. Supabase認証URL設定 (要確認)

1. **Supabaseダッシュボード**にアクセス
   - プロジェクト: `otgwixohboxauaefahfe`

2. **Authentication設定**
   - Authentication → URL Configuration
   - **Site URL**: `https://modern-expense-tracker-app.vercel.app`
   - **Redirect URLs**: `https://modern-expense-tracker-app.vercel.app/auth/callback`

3. **Google OAuth設定**
   - Authentication → Providers → Google
   - **Authorized redirect URIs**: `https://modern-expense-tracker-app.vercel.app/auth/callback`

## 🧪 テスト手順

設定完了後、以下でテスト：

1. https://modern-expense-tracker-app.vercel.app にアクセス
2. 「Googleでログイン」をクリック
3. 認証完了後、以下のURLにリダイレクトされることを確認：
   - ✅ `https://modern-expense-tracker-app.vercel.app/dashboard`
   - ❌ `http://localhost:3000/?code=...`

## 🔍 トラブルシューティング

### 問題が継続する場合

1. **ブラウザキャッシュをクリア**
2. **Vercelの環境変数を再確認**
3. **Supabaseの認証URLを再確認**
4. **Google Cloud Consoleの設定も確認**

### 問題が解決しない場合

詳細なエラーログとスクリーンショットを提供してください：
- 認証フロー全体のキャプチャ
- ブラウザの開発者ツール（Console、Network）
- Vercelのデプロイログ

---

**注意**: この修正により、開発環境（localhost）では従来通り動作し、本番環境では確実に正しいURLにリダイレクトされます。