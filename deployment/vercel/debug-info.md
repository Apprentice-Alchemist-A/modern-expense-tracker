# Vercel デバッグ情報

## プロジェクト設定
- **Project Name**: modern-expense-tracker-app
- **Repository**: https://github.com/Apprentice-Alchemist-A/modern-expense-tracker
- **Branch**: master (設定済み ✅)
- **Framework**: Next.js 14.0.4
- **Node.js**: >=18.0.0

## Deploy Hook
- **URL**: https://api.vercel.com/v1/integrations/deploy/prj_BGnGOcVjm6vTdNk8JFygNxyYhZDX/AWNyPMddJZ
- **用途**: 手動デプロイトリガー用（緊急時使用）

## 環境変数 (設定済み)
```
NEXT_PUBLIC_SUPABASE_URL=https://otgwixohboxauaefahfe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(設定済み)
NEXT_PUBLIC_APP_URL=(デプロイURL予定)
```

## Build & Output Settings
```
Build Command: npm install && npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

## 既知の問題
1. **@/ パスエイリアス解決失敗**
   - ローカル: ✅ 動作
   - Vercel: ❌ 失敗

## トラブルシューティング手順
1. エラーログを `latest-error.md` に貼り付け
2. エラー内容を確認
3. 対策を実施
4. Git push してデプロイ確認
5. 必要に応じて追加修正

## 緊急回避策
もしパス解決が解決しない場合は、絶対パスに一時変更:
```typescript
// Before: import { AppLayout } from '@/components/layout/AppLayout'
// After:  import { AppLayout } from '../../../components/layout/AppLayout'
```