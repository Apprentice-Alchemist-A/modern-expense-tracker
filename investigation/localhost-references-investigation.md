# localhost:3000 参照箇所調査レポート

**調査日**: 2025-01-28
**目的**: OAuth認証でlocalhostにリダイレクトされる原因の特定

## 調査概要

プロジェクト全体でlocalhost:3000に関連するコードを徹底調査。

## 発見した箇所

### 1. 環境変数ファイル

#### /.env.local (本番用)
```env
NEXT_PUBLIC_APP_URL=https://modern-expense-tracker-app.vercel.app
```
✅ 正しく設定済み

#### /.env.local.backup (バックアップ)
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
❓ バックアップファイルのため実行時影響なし

### 2. 認証関連コード

#### /lib/supabase/auth.ts
```typescript
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
```
✅ 環境変数優先の適切な実装

#### /app/auth/callback/route.ts
```typescript
return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
```
✅ 動的オリジン取得の適切な実装

### 3. その他調査結果

- **ハードコードされたlocalhost:3000**: 存在しない
- **ポート3000の直接参照**: 存在しない
- **条件分岐でのlocalhost処理**: 存在しない

## 結論

### ❌ localhost:3000を参照しているコードは存在しない
- すべて環境変数ベースまたは動的取得
- 適切なフォールバック実装
- ハードコードなし

### 🤔 考えられる他の原因

1. **ブラウザキャッシュ**
   - 以前の認証セッション情報
   - LocalStorageの古い設定

2. **Vercelデプロイの問題**
   - 環境変数が実際に反映されていない
   - ビルド時の問題

3. **Supabaseクライアント側の問題**
   - ライブラリ内部のデフォルト設定
   - 認証プロバイダーの設定

4. **Google OAuth設定**
   - Google側の設定とSupabase設定の不整合
   - 認証フローの内部的な問題

## 次のステップ

コード上の問題は見つからないため、以下を確認する必要：
1. ブラウザの完全なキャッシュクリア
2. Vercel環境変数の実際の値確認
3. Supabaseログの確認
4. ブラウザ開発者ツールでの実際の環境変数値確認