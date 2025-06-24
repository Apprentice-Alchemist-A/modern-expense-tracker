# Vercel カスタムドメイン設定ガイド

## 現在のURL
- **メインURL**: https://modern-expense-tracker-app.vercel.app
- **ステータス**: ✅ 完全公開（Vercelアカウント不要でアクセス可能）

## カスタムドメイン追加手順

### 1. Vercel Dashboard でドメイン追加
```
1. https://vercel.com/dashboard にログイン
2. プロジェクト「modern-expense-tracker-app」を選択
3. Settings タブ → Domains セクション
4. 「Add Domain」ボタンをクリック
5. 独自ドメインを入力（例: expense-tracker.com）
```

### 2. DNS設定
独自ドメインのDNS設定で以下を追加：

```dns
# Aレコード（ルートドメイン用）
Type: A
Name: @
Value: 76.76.19.61

# CNAMEレコード（www用）
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. 追加できるドメインタイプ

#### A. 独自ドメイン（有料ドメイン購入必要）
- `expense-tracker.com`
- `my-expense-app.net`
- `家計簿アプリ.jp`

#### B. 無料サブドメイン（サービス利用）
- `your-name.github.io` (GitHub Pages)
- `your-app.netlify.app` (Netlify)
- `your-project.railway.app` (Railway)

#### C. Vercel提供の追加URL
```
# プロジェクト設定で自動生成される
https://modern-expense-tracker-git-main-username.vercel.app
https://modern-expense-tracker-abc123.vercel.app
```

## 複数URL管理のメリット

### 1. 用途別URL
```
本番用: https://expense-tracker.com
テスト用: https://staging-expense-tracker.vercel.app
開発用: https://dev-expense-tracker.vercel.app
```

### 2. 地域別URL
```
日本: https://jp.expense-tracker.com
米国: https://us.expense-tracker.com
グローバル: https://expense-tracker.com
```

## アクセス制限の解除確認

### 現在の設定確認
```bash
# 認証なしでアクセス可能
curl -I https://modern-expense-tracker-app.vercel.app
# ステータス: 200 OK（認証不要）
```

### 追加設定（vercel.json）
```json
{
  "public": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 費用について

### 無料プラン（現在）
- ✅ .vercel.app ドメイン無制限
- ✅ 月100GBトラフィック
- ✅ 無制限のサイト訪問者

### Pro プラン（$20/月）
- ✅ カスタムドメイン無制限
- ✅ 月1TBトラフィック
- ✅ エンタープライズレベル機能

## 即座に利用可能な追加URL

### 1. Git ブランチベースURL
新しいブランチを作成すると自動生成：
```bash
git checkout -b production
git push origin production
# → https://modern-expense-tracker-production.vercel.app
```

### 2. プレビューURL
プルリクエスト作成時に自動生成：
```
# 各PRごとに自動生成
https://modern-expense-tracker-pr-123.vercel.app
```

## 実行可能なアクション

すぐに実行できる方法：
1. **Gitブランチベース**: 新ブランチ作成 → 自動URL生成
2. **カスタムドメイン**: 独自ドメイン購入 → Vercel設定
3. **Proプラン**: アップグレード → 高度な機能利用

現在のURLは既に完全公開されており、誰でもアクセス可能です。