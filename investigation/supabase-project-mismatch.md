# Supabaseプロジェクト不一致問題

**日付**: 2025-01-28  
**問題**: OAuth認証でlocalhost:3000にリダイレクトされる  
**原因**: 異なるSupabaseプロジェクトが混在している

## 🔍 発見した問題

### プロジェクト不一致

#### 現在のアプリケーションで使用中
- **Project ID**: `ymbtztejxfgprepzbqtk`
- **URL**: `https://ymbtztejxfgprepzbqtk.supabase.co`
- **環境変数**: `NEXT_PUBLIC_SUPABASE_URL`で設定済み

#### OAuth認証で実際に使用されている
- **Project ID**: `otgwixohboxauaefahfe`  
- **URL**: `https://otgwixohboxauaefahfe.supabase.co`
- **OAuth設定**: localhost:3000がSite URLに設定されている

### 認証フローでの影響

1. **アプリ起動**: `ymbtztejxfgprepzbqtk` プロジェクトに接続
2. **OAuth開始**: 何らかの理由で `otgwixohboxauaefahfe` プロジェクトが使用される
3. **認証完了**: `otgwixohboxauaefahfe` のSite URL設定（localhost:3000）でリダイレクト

## 🎯 解決方法

### 選択肢1: 現在のプロジェクト（ymbtztejxfgprepzbqtk）でOAuth設定 ⭐推奨

**手順**:
1. `ymbtztejxfgprepzbqtk` プロジェクトでGoogle OAuth設定を有効化
2. Site URLを `https://modern-expense-tracker-app-five.vercel.app` に設定
3. Redirect URLsに `https://modern-expense-tracker-app-five.vercel.app/auth/callback` を追加
4. Google Cloud Consoleでの設定も更新

**メリット**:
- 現在のデータベース設定をそのまま使用可能
- 環境変数の変更不要

### 選択肢2: 古いプロジェクト（otgwixohboxauaefahfe）を使用

**手順**:
1. 環境変数を古いプロジェクトに変更
2. データベーススキーマの移行または再作成
3. Site URLの修正

**デメリット**:
- データ移行が必要
- 設定の大幅な変更が必要

## 🔧 推奨アクション

**選択肢1を実行**:

1. **ymbtztejxfgprepzbqtk プロジェクトのSupabaseダッシュボードにアクセス**
2. **Authentication → Providers → Google → 設定**
3. **Enable Sign in with Google をONにする**
4. **Authentication → Settings → URL Configuration**:
   - Site URL: `https://modern-expense-tracker-app-five.vercel.app`
   - Redirect URLs: `https://modern-expense-tracker-app-five.vercel.app/auth/callback`

## 🤔 なぜ混在したか

考えられる原因:
1. 開発初期に複数のSupabaseプロジェクトを作成
2. 環境変数の更新時にプロジェクトIDのみ変更、OAuth設定は古いプロジェクトのまま
3. 何らかのキャッシュまたは設定の残存

## 📋 確認事項

修正後に以下を確認:
1. OAuth認証が正しいプロジェクトで動作するか
2. データベース接続が正常に動作するか
3. 認証完了後に正しいURLにリダイレクトされるか

---

**結論**: プロジェクト不一致が根本原因。現在のプロジェクトでOAuth設定を行うことで解決可能。