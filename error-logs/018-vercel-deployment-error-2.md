# エラーログ #018 - Vercelデプロイメントエラー（2回目）

**日付**: 2025-01-28
**カテゴリ**: デプロイメント
**環境**: Vercel Production Build
**前回の修正後**: dependencies移動後も失敗

## エラー内容

```
[21:26:51.880] Running build in Washington, D.C., USA (East) – iad1
[21:26:51.881] Build machine configuration: 2 cores, 8 GB
[21:26:51.898] Cloning github.com/Apprentice-Alchemist-A/modern-expense-tracker (Branch: master, Commit: fab8262)
[21:26:51.906] Skipping build cache, deployment was triggered without cache.
[21:26:52.351] Cloning completed: 452.000ms
[21:26:52.687] Running "vercel build"
[21:26:53.161] Vercel CLI 43.3.0
[21:26:53.449] Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
[21:26:53.457] Running "install" command: `npm install`...
[21:26:56.008] npm warn deprecated @supabase/auth-helpers-shared@0.7.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:26:56.255] npm warn deprecated @supabase/auth-helpers-nextjs@0.10.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:27:04.092] 
[21:27:04.093] added 206 packages, and audited 207 packages in 10s
[21:27:04.094] 
[21:27:04.094] 40 packages are looking for funding
[21:27:04.095]   run `npm fund` for details
[21:27:04.155] 
[21:27:04.156] 1 critical severity vulnerability
[21:27:04.156] 
[21:27:04.157] To address all issues, run:
[21:27:04.157]   npm audit fix --force
[21:27:04.157] 
[21:27:04.158] Run `npm audit` for details.
[21:27:04.211] Detected Next.js version: 14.0.4
[21:27:04.211] Running "npm install && npm run build"
[21:27:05.300] 
[21:27:05.301] up to date, audited 205 packages in 1s
[21:27:05.301] 
[21:27:05.302] 40 packages are looking for funding
[21:27:05.302]   run `npm fund` for details
[21:27:05.396] 
[21:27:05.397] 1 critical severity vulnerability
[21:27:05.397] 
[21:27:05.397] To address all issues, run:
[21:27:05.397]   npm audit fix --force
[21:27:05.397] 
[21:27:05.397] Run `npm audit` for details.
[21:27:05.523] 
[21:27:05.523] > expense-tracker-redesign@0.1.0 build
[21:27:05.523] > node node_modules/next/dist/bin/next build
[21:27:05.523] 
[21:27:06.022] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[21:27:06.023] This information is used to shape Next.js' roadmap and prioritize features.
[21:27:06.024] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[21:27:06.024] https://nextjs.org/telemetry
[21:27:06.025] 
[21:27:06.103]    ▲ Next.js 14.0.4
[21:27:06.104] 
[21:27:06.105]    Creating an optimized production build ...
[21:27:06.194]  ⚠ Found lockfile missing swc dependencies, run next locally to automatically patch
[21:27:11.325] Failed to compile.
[21:27:11.326] 
[21:27:11.326] ./app/dashboard/page.tsx
[21:27:11.326] Module not found: Can't resolve '@/components/layout/AppLayout'
[21:27:11.326] 
[21:27:11.326] https://nextjs.org/docs/messages/module-not-found
[21:27:11.327] 
[21:27:11.327] ./app/dashboard/page.tsx
[21:27:11.327] Module not found: Can't resolve '@/components/layout/PageHeader'
[21:27:11.327] 
[21:27:11.327] https://nextjs.org/docs/messages/module-not-found
[21:27:11.327] 
[21:27:11.327] ./app/dashboard/page.tsx
[21:27:11.327] Module not found: Can't resolve '@/components/dashboard/MonthlySummary'
[21:27:11.327] 
[21:27:11.327] https://nextjs.org/docs/messages/module-not-found
[21:27:11.327] 
[21:27:11.327] ./app/dashboard/page.tsx
[21:27:11.327] Module not found: Can't resolve '@/components/dashboard/CategoryPieChart'
[21:27:11.327] 
[21:27:11.327] https://nextjs.org/docs/messages/module-not-found
[21:27:11.328] 
[21:27:11.328] ./app/dashboard/page.tsx
[21:27:11.328] Module not found: Can't resolve '@/components/dashboard/ExpenseTrendChart'
[21:27:11.328] 
[21:27:11.328] https://nextjs.org/docs/messages/module-not-found
[21:27:11.328] 
[21:27:11.329] 
[21:27:11.329] > Build failed because of webpack errors
[21:27:11.359] Error: Command "npm install && npm run build" exited with 1
[21:27:11.593] 
[21:27:14.581] Exiting build container
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