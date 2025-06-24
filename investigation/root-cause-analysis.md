# OAuth問題の根本原因特定

**日付**: 2025-01-28  
**問題**: Google OAuth認証後にlocalhost:3000にリダイレクトされる

## 🎯 根本原因を特定

### 発見した問題

OAuth認証フローのステップ2で、Supabaseが生成する`state`パラメータに以下が含まれている：

```json
{
  "site_url": "http://localhost:3000",
  "referrer": "http://localhost:3000"
}
```

### state パラメータの詳細

**Base64デコード結果**:
```
eyJhbGciOiJIUzI1NiIsImtpZCI6IjlZRDYxK2FXMGM5QWNKSE4iLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NTA3ODM1MjYsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnb29nbGUiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImZsb3dfc3RhdGVfaWQiOiJlNGU1NmM4Ni1lNDdkLTQ3ZTYtODI0Zi04NDVmMjI2Y2E4MzMifQ
```

**ペイロード**:
```json
{
  "exp": 1750783526,
  "site_url": "http://localhost:3000",  ← 問題箇所
  "id": "00000000-0000-0000-0000-000000000000",
  "function_hooks": null,
  "provider": "google",
  "referrer": "http://localhost:3000",  ← 問題箇所
  "flow_state_id": "e4e56c86-e47d-47e6-824f-845f226ca833"
}
```

## 🔍 問題の所在

### Supabaseクライアント側の問題

1. **stateパラメータの生成**: Supabase内部でlocalhost:3000が設定されている
2. **環境変数の未反映**: NEXT_PUBLIC_APP_URLがSupabaseライブラリに渡されていない
3. **site_url設定**: Supabaseプロジェクトのsite_url設定が古い可能性

### 認証フローの流れ

1. ✅ アプリ側: 正しいURLで認証開始
2. ❌ Supabase側: localhost:3000をstateに設定
3. ✅ Google側: 認証処理
4. ❌ コールバック: stateのlocalhost:3000を使用してリダイレクト

## 💡 考えられる修正方法

### 1. Supabaseプロジェクト設定の確認
- Site URL設定の再確認
- URL Configuration以外の隠れた設定

### 2. Supabaseクライアント初期化の確認
- 環境変数がクライアントに正しく渡されているか
- 初期化時のオプション設定

### 3. Vercel環境での動作確認
- 実際のビルド時に環境変数が正しく適用されているか
- サーバーサイドとクライアントサイドの環境変数の違い

## 🎯 次のアクションアイテム

1. **Supabaseプロジェクト設定の全確認**
2. **Supabaseクライアント初期化コードの見直し**
3. **環境変数の適用確認**
4. **ビルド・デプロイプロセスの確認**

---

**結論**: コード上は正しいが、Supabaseライブラリ内部でlocalhost:3000が使用されている。これはSupabaseプロジェクト設定またはクライアント初期化の問題と推測される。