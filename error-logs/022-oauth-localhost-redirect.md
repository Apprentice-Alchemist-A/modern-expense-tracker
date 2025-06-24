# エラーログ #022 - Google OAuth認証でlocalhostリダイレクト問題

**日付**: 2025-01-28  
**エラータイプ**: 認証リダイレクト問題  
**優先度**: 高

## 問題の詳細

### 現象
```
Google認証完了後、以下のURLにリダイレクトされる:
http://localhost:3000/?code=1011912b-2fde-48b2-97ec-36e742c8f5f8

本来は以下にリダイレクトされるべき:
https://modern-expense-tracker-app.vercel.app/dashboard
```

### 影響範囲
- Google OAuth認証が本番環境で正常に動作しない
- ユーザーが認証後にlocalhostにリダイレクトされアクセス不可能
- 認証フローが完全に破綻

## 根本原因の調査

### 問題の特定
**ファイル**: `/lib/supabase/auth.ts`  
**行**: 11行目  

```typescript
// 問題のあるコード
redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(currentPath)}`,
```

### 原因分析
1. **動的URL生成の問題**: `window.location.origin` を使用してリダイレクトURLを生成
2. **環境変数の未使用**: 設定済みの `NEXT_PUBLIC_APP_URL` が認証処理で使用されていない
3. **本番環境での誤動作**: 本番環境でも現在のブラウザURLのオリジンを使用してしまう

### 調査で判明した事項
- 環境変数 `NEXT_PUBLIC_APP_URL` は正しく設定済み
- 他のファイルでlocalhost参照は適切に管理されている
- 問題は認証処理のリダイレクトURL生成部分に限定

## 解決方法

### コード修正
```typescript
// 修正前
export const signInWithGoogle = async () => {
  console.log('signInWithGoogle: Starting Google OAuth flow')
  const supabase = getSupabaseClient()
  const currentPath = window.location.pathname
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(currentPath)}`,
    },
  })

// 修正後
export const signInWithGoogle = async () => {
  const supabase = getSupabaseClient()
  const currentPath = window.location.pathname
  
  // 本番環境では環境変数を優先、開発環境では現在のオリジンを使用
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${baseUrl}/auth/callback?redirectTo=${encodeURIComponent(currentPath)}`,
    },
  })
```

### 追加の改善
- デバッグログの削除
- コードの簡潔化
- エラーハンドリングの保持

## 設定確認事項

### Vercel環境変数
```
NEXT_PUBLIC_APP_URL=https://modern-expense-tracker-app.vercel.app
```

### Supabase認証設定
- **Site URL**: `https://modern-expense-tracker-app.vercel.app`
- **Redirect URLs**: `https://modern-expense-tracker-app.vercel.app/auth/callback`

## 修正結果

**コミット**: cdae2ce  
**修正ファイル**: `/lib/supabase/auth.ts`  
**ビルド**: ✅ 成功  

### 期待される動作
- 本番環境: 環境変数URLを使用 → `https://modern-expense-tracker-app.vercel.app/auth/callback`
- 開発環境: 現在のオリジンを使用 → `http://localhost:3000/auth/callback`

## 学んだ教訓

1. **環境変数の一貫使用**: 設定した環境変数は確実に使用する
2. **動的URL生成の注意**: `window.location.origin` は開発環境のURLを参照する可能性
3. **本番・開発の両対応**: フォールバック機能で両環境に対応
4. **認証フローの重要性**: リダイレクトURL一つで全体が機能しなくなる

## 今後の対策

1. 環境変数使用の徹底
2. 本番環境での動作テスト強化
3. 認証関連コードのレビュー体制
4. 設定変更チェックリストの活用

---

**ステータス**: 🔧 修正済み（設定確認が必要）