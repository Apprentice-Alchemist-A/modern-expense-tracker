# エラーログ #018 - Vercelデプロイメントエラー（2回目）

**日付**: 2025-01-28
**カテゴリ**: デプロイメント
**環境**: Vercel Production Build
**前回の修正後**: dependencies移動後も失敗

## エラー内容

```
[20:03:19.230] Running build in Washington, D.C., USA (East) – iad1
[20:03:19.230] Build machine configuration: 2 cores, 8 GB
[20:03:19.255] Cloning github.com/Apprentice-Alchemist-A/modern-expense-tracker (Branch: master, Commit: fab8262)
[20:03:19.275] Skipping build cache, deployment was triggered without cache.
[20:03:19.662] Cloning completed: 407.000ms
[20:03:19.972] Running "vercel build"
[20:03:20.425] Vercel CLI 43.3.0
[20:03:20.733] Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
[20:03:20.740] Running "install" command: `npm install`...
[20:03:23.393] npm warn deprecated @supabase/auth-helpers-shared@0.7.0: This package is now deprecated - please use the @supabase/ssr package instead.
[20:03:23.677] npm warn deprecated @supabase/auth-helpers-nextjs@0.10.0: This package is now deprecated - please use the @supabase/ssr package instead.
[20:03:31.890] 
[20:03:31.891] added 206 packages, and audited 207 packages in 11s
[20:03:31.891] 
[20:03:31.892] 40 packages are looking for funding
[20:03:31.892]   run `npm fund` for details
[20:03:31.969] 
[20:03:31.969] 1 critical severity vulnerability
[20:03:31.969] 
[20:03:31.969] To address all issues, run:
[20:03:31.970]   npm audit fix --force
[20:03:31.970] 
[20:03:31.970] Run `npm audit` for details.
[20:03:32.187] Detected Next.js version: 14.0.4
[20:03:32.188] Running "npm install && npm run build"
[20:03:33.348] 
[20:03:33.349] up to date, audited 205 packages in 1s
[20:03:33.349] 
[20:03:33.349] 40 packages are looking for funding
[20:03:33.350]   run `npm fund` for details
[20:03:33.418] 
[20:03:33.418] 1 critical severity vulnerability
[20:03:33.418] 
[20:03:33.418] To address all issues, run:
[20:03:33.418]   npm audit fix --force
[20:03:33.419] 
[20:03:33.419] Run `npm audit` for details.
[20:03:33.542] 
[20:03:33.543] > expense-tracker-redesign@0.1.0 build
[20:03:33.543] > node node_modules/next/dist/bin/next build
[20:03:33.543] 
[20:03:34.477] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[20:03:34.477] This information is used to shape Next.js' roadmap and prioritize features.
[20:03:34.477] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[20:03:34.477] https://nextjs.org/telemetry
[20:03:34.477] 
[20:03:34.559]    ▲ Next.js 14.0.4
[20:03:34.560] 
[20:03:34.560]    Creating an optimized production build ...
[20:03:34.664]  ⚠ Found lockfile missing swc dependencies, run next locally to automatically patch
[20:03:39.916] Failed to compile.
[20:03:39.916] 
[20:03:39.917] ./app/dashboard/page.tsx
[20:03:39.918] Module not found: Can't resolve '@/components/layout/AppLayout'
[20:03:39.918] 
[20:03:39.918] https://nextjs.org/docs/messages/module-not-found
[20:03:39.918] 
[20:03:39.918] ./app/dashboard/page.tsx
[20:03:39.918] Module not found: Can't resolve '@/components/layout/PageHeader'
[20:03:39.918] 
[20:03:39.919] https://nextjs.org/docs/messages/module-not-found
[20:03:39.919] 
[20:03:39.920] ./app/dashboard/page.tsx
[20:03:39.920] Module not found: Can't resolve '@/components/dashboard/MonthlySummary'
[20:03:39.920] 
[20:03:39.920] https://nextjs.org/docs/messages/module-not-found
[20:03:39.920] 
[20:03:39.921] ./app/dashboard/page.tsx
[20:03:39.921] Module not found: Can't resolve '@/components/dashboard/CategoryPieChart'
[20:03:39.921] 
[20:03:39.921] https://nextjs.org/docs/messages/module-not-found
[20:03:39.921] 
[20:03:39.921] ./app/dashboard/page.tsx
[20:03:39.922] Module not found: Can't resolve '@/components/dashboard/ExpenseTrendChart'
[20:03:39.922] 
[20:03:39.924] https://nextjs.org/docs/messages/module-not-found
[20:03:39.924] 
[20:03:39.925] 
[20:03:39.925] > Build failed because of webpack errors
[20:03:39.954] Error: Command "npm install && npm run build" exited with 1
[20:03:40.133] 
[20:03:43.176] Exiting build container
```

## 状況

- GitHubリポジトリ: `modern-expense-tracker`
- Vercelプロジェクト: `modern-expense-tracker-app`
- ブランチ: master/main
- コミット: fix: move build dependencies to production for Vercel deployment
- 前回の修正: tailwindcss等をdependenciesに移動済み

## 解決策

### 問題の根本原因
**@/パスエイリアスが解決できない** - Vercelのビルド環境で TypeScript のパスマッピングが正しく処理されていない

### 実施した修正

#### 1. **重複ディレクトリの削除**
- `/expense-tracker-redesign/expense-tracker-redesign/` という重複構造を削除
- パス解決の混乱を解消

#### 2. **next.config.js の強化**
```javascript
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    }
    return config
  },
}
```

#### 3. **package.json の最適化**
- 標準的なNext.jsコマンドに変更 (`next dev`, `next build`)
- ESLint設定を追加

#### 4. **vercel.json の改善**
- `npm ci` を使用してより安定したインストール
- ビルドコマンドを最適化

## 関連ファイル

- `/package.json`
- `/vercel.json`
- `/tsconfig.json`