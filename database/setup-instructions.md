# 新Supabaseプロジェクト作成手順

## ステップ1: Supabaseプロジェクト作成

### 1. Supabaseダッシュボードにアクセス
- URL: https://app.supabase.com
- Googleアカウントでログイン

### 2. 新プロジェクト作成
1. 「**New project**」ボタンをクリック
2. 以下の設定を入力：
   - **Name**: `expense-tracker-redesign`
   - **Database Password**: 強力なパスワードを設定（推奨: 16文字以上、英数字記号混在）
   - **Region**: `Northeast Asia (Tokyo)` を選択
3. 「**Create new project**」をクリック
4. プロジェクト作成完了まで待機（約2-3分）

### 3. API Keys取得
プロジェクト作成完了後：
1. 左サイドバーの「**Settings**」をクリック
2. 「**API**」セクションを選択
3. 以下をコピーしてメモ：
   - **Project URL** (例: `https://xxxxx.supabase.co`)
   - **anon public** key (例: `eyJhbGciOiJIUzI1NiIsInR5cCI6...`)

---

## ステップ2: データベーススキーマ作成

### 1. SQL Editorを開く
1. 左サイドバーの「**SQL Editor**」をクリック
2. 「**+ New query**」をクリック

### 2. スキーマSQLを実行
1. `database/schema.sql` ファイルの内容を**全てコピー**
2. SQL Editorに**貼り付け**
3. 「**Run**」ボタンをクリック
4. 実行完了を確認（緑色のSuccessメッセージ）

### 3. マスターデータを投入
1. SQL Editorで「**+ New query**」をクリック
2. `database/seed-data.sql` ファイルの内容を**全てコピー**
3. SQL Editorに**貼り付け**
4. 「**Run**」ボタンをクリック
5. 実行完了を確認

---

## ステップ3: Google OAuth設定

### 1. Authentication設定を開く
1. 左サイドバーの「**Authentication**」をクリック
2. 「**Providers**」タブを選択

### 2. Google Provider有効化
1. 「**Google**」プロバイダーを見つけてクリック
2. 「**Enable Google provider**」をオンに切り替え
3. 以下を設定：
   - **Client ID**: `659584302978-7bb4n23qsqb95eajhm46kmdl8rucuu0g.apps.googleusercontent.com`
   - **Client Secret**: `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`
4. 「**Save**」をクリック

### 3. Site URL設定
1. 「**URL Configuration**」タブをクリック
2. 以下を設定：
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: 以下を追加
     ```
     http://localhost:3000/auth/callback
     ```
3. 「**Save**」をクリック

---

## ステップ4: 作成完了の確認

### 完了チェックリスト
- [x] プロジェクトが正常に作成された
- [x] Project URLとAPI keysを取得した
- [x] schema.sqlが正常に実行された
- [x] seed-data.sqlが正常に実行された
- [x] Google OAuth設定が完了した
- [x] URL設定が完了した

### 次のステップ
完了後、以下の情報を開発者に共有してください：

```
Project URL: https://xxxxx.supabase.co
API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## トラブルシューティング

### よくある問題

#### 1. SQL実行でエラーが出る
- **原因**: 構文エラーまたは権限不足
- **解決**: エラーメッセージを確認し、SQL文を再度コピー&ペースト

#### 2. Google OAuth設定が保存できない
- **原因**: Client IDまたはClient Secretが間違っている
- **解決**: 設定値を再度確認してコピー&ペースト

#### 3. プロジェクト作成が失敗する
- **原因**: 同名プロジェクトの存在またはネットワークエラー
- **解決**: 異なる名前で再試行、またはページリロード

### サポート
問題が解決しない場合は、エラーメッセージのスクリーンショットを開発者に共有してください。