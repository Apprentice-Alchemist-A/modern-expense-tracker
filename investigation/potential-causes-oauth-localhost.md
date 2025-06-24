# OAuth localhost リダイレクト問題 - 考えられる原因一覧

**問題**: Google認証後に `http://localhost:3000/?code=...` にリダイレクトされる  
**コード調査結果**: localhost:3000を参照するコードは存在しない

## 考えられる原因

### 1. 🔧 Vercel環境変数の実際の値
**可能性**: 環境変数が画面上では正しく見えているが、実際のランタイムで異なる値

**確認方法**:
```javascript
// ブラウザのコンソールで実行
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL)
console.log('window.location.origin:', window.location.origin)
```

- 回答
```js
> window.location.origin
'https://modern-expense-tracker-app-five.vercel.app'
> process.env.NEXT_PUBLIC_APP_URL
VM138:1 Uncaught ReferenceError: process is not defined
    at <anonymous>:1:1
```

### 2. 💾 ブラウザキャッシュ・セッション
**可能性**: 古い認証情報やリダイレクト設定がキャッシュされている

**影響範囲**:
- LocalStorage
- SessionStorage
- Browser Cookie
- OAuth認証セッション

- 回答
再起同等してキャッシュを消しても、Googleアカウントを選択した後に`localhost:3000`にリダイレクトする

### 3. 🏗️ Vercelビルド・デプロイ
**可能性**: 
- 環境変数変更後の再デプロイ未実行
- ビルド時のキャッシュ問題
- デプロイメント間の設定不整合

- 回答
環境変数はあっています。feedback/ にスクショを入れましたので確認してください

### 4. 📡 Supabaseクライアント内部
**可能性**: 
- Supabaseライブラリのデフォルト設定
- 内部キャッシュ機能
- 認証プロバイダー設定の問題

### 5. 🔗 Google OAuth設定の不整合
**可能性**:
- Google Cloud Consoleの設定
- Supabase側でのGoogle OAuth設定
- 認証プロバイダー間の設定ミスマッチ

### 6. 🌐 Supabase認証設定の詳細
**可能性**:
- URL Configuration以外の隠れた設定
- セッション設定
- セキュリティポリシー

### 7. 📜 ブラウザ開発者ツールログ
**確認すべき内容**:
- Network タブでの実際のリクエストURL
- Console でのエラーメッセージ
- Application タブでのストレージ内容

### 8. 🔍 OAuth認証フローの詳細追跡
**Step-by-step確認**:
1. 認証開始時のリダイレクトURL
2. Google認証完了時のコールバックURL
3. Supabase処理後のリダイレクト先
4. 最終的なブラウザ到達URL

- 回答
1. https://modern-expense-tracker-app-five.vercel.app/dashboard
2. https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=578712399443-rdiric1vjgsor6ihol0arm76tepdpbgc.apps.googleusercontent.com&redirect_to=https%3A%2F%2Fmodern-expense-tracker-app-five.vercel.app%2Fauth%2Fcallback%3FredirectTo%3D%252Fdashboard&redirect_uri=https%3A%2F%2Fotgwixohboxauaefahfe.supabase.co%2Fauth%2Fv1%2Fcallback&response_type=code&scope=email%20profile&state=eyJhbGciOiJIUzI1NiIsImtpZCI6IjlZRDYxK2FXMGM5QWNKSE4iLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NTA3ODM1MjYsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnb29nbGUiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImZsb3dfc3RhdGVfaWQiOiJlNGU1NmM4Ni1lNDdkLTQ3ZTYtODI0Zi04NDVmMjI2Y2E4MzMifQ.mOFRMsLMZbyypV1MtIXpnUTgjzx7KAdPD9FFQfaBdJY&service=lso&o2v=2&flowName=GeneralOAuthFlow
3. http://localhost:3000/?code=62dd8e39-29e8-430d-9113-f595642e772b

### 9. 🏷️ Vercel Domain設定
**可能性**:
- プロジェクトの実際のドメイン設定
- カスタムドメイン設定との競合
- DNS設定の問題

### 10. 📦 パッケージ・ライブラリ問題
**可能性**:
- Supabaseライブラリのバージョン問題
- Next.jsのルーティング設定
- 依存関係の競合

## 調査の優先順位

1. **高**: ブラウザ開発者ツールでの実際の環境変数値確認
2. **高**: 完全なブラウザキャッシュクリア後のテスト
3. **中**: Vercel環境変数の再設定と再デプロイ
4. **中**: OAuth認証フローの詳細ログ確認
5. **低**: Supabaseプロジェクトの全設定再確認