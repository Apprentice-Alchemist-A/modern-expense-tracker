# エラーログ #017 - Vercelデプロイメントエラー

**日付**: 2025-01-28
**カテゴリ**: デプロイメント
**環境**: Vercel Production Build

## エラー内容

```
[18:43:06.064] Running build in Washington, D.C., USA (East) – iad1
[18:43:06.065] Build machine configuration: 2 cores, 8 GB
[18:43:06.082] Cloning github.com/Apprentice-Alchemist-A/modern-expense-tracker (Branch: main, Commit: e43422a)
[18:43:06.269] Previous build caches not available
[18:43:06.546] Cloning completed: 464.000ms
[18:43:06.989] Running "vercel build"
[18:43:07.428] Vercel CLI 43.3.0
[18:43:07.848] Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
[18:43:07.855] Running "install" command: `npm install`...
[18:43:11.054] npm warn deprecated @supabase/auth-helpers-shared@0.7.0: This package is now deprecated - please use the @supabase/ssr package instead.
[18:43:11.373] npm warn deprecated @supabase/auth-helpers-nextjs@0.10.0: This package is now deprecated - please use the @supabase/ssr package instead.
[18:43:19.548] 
[18:43:19.548] added 206 packages, and audited 207 packages in 11s
[18:43:19.549] 
[18:43:19.549] 40 packages are looking for funding
[18:43:19.550]   run `npm fund` for details
[18:43:19.611] 
[18:43:19.612] 1 critical severity vulnerability
[18:43:19.612] 
[18:43:19.613] To address all issues, run:
[18:43:19.613]   npm audit fix --force
[18:43:19.613] 
[18:43:19.614] Run `npm audit` for details.
[18:43:19.660] Detected Next.js version: 14.0.4
[18:43:19.661] Running "npm install && npm run build"
[18:43:20.812] 
[18:43:20.813] up to date, audited 88 packages in 1s
[18:43:20.813] 
[18:43:20.814] 8 packages are looking for funding
[18:43:20.814]   run `npm fund` for details
[18:43:20.922] 
[18:43:20.923] 1 critical severity vulnerability
[18:43:20.923] 
[18:43:20.923] To address all issues, run:
[18:43:20.923]   npm audit fix --force
[18:43:20.923] 
[18:43:20.923] Run `npm audit` for details.
[18:43:21.045] 
[18:43:21.046] > expense-tracker-redesign@0.1.0 build
[18:43:21.047] > node node_modules/next/dist/bin/next build
[18:43:21.047] 
[18:43:21.551] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[18:43:21.552] This information is used to shape Next.js' roadmap and prioritize features.
[18:43:21.552] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[18:43:21.553] https://nextjs.org/telemetry
[18:43:21.553] 
[18:43:21.630]    ▲ Next.js 14.0.4
[18:43:21.630] 
[18:43:21.631]    Creating an optimized production build ...
[18:43:26.751] Failed to compile.
[18:43:26.752] 
[18:43:26.753] app/layout.tsx
[18:43:26.753] An error occured in `next/font`.
[18:43:26.753] 
[18:43:26.754] Error: Cannot find module 'tailwindcss'
[18:43:26.754] Require stack:
[18:43:26.754] - /vercel/path0/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js
[18:43:26.754] - /vercel/path0/node_modules/next/dist/build/webpack/config/blocks/css/index.js
[18:43:26.754] - /vercel/path0/node_modules/next/dist/build/webpack/config/index.js
[18:43:26.754] - /vercel/path0/node_modules/next/dist/build/webpack-config.js
[18:43:26.754] - /vercel/path0/node_modules/next/dist/build/webpack/plugins/next-trace-entrypoints-plugin.js
[18:43:26.754] - /vercel/path0/node_modules/next/dist/build/collect-build-traces.js
[18:43:26.755] - /vercel/path0/node_modules/next/dist/build/index.js
[18:43:26.755] - /vercel/path0/node_modules/next/dist/cli/next-build.js
[18:43:26.755] - /vercel/path0/node_modules/next/dist/lib/commands.js
[18:43:26.755] - /vercel/path0/node_modules/next/dist/bin/next
[18:43:26.759]     at Function.<anonymous> (node:internal/modules/cjs/loader:1401:15)
[18:43:26.759]     at /vercel/path0/node_modules/next/dist/server/require-hook.js:55:36
[18:43:26.759]     at Function.resolve (node:internal/modules/helpers:145:19)
[18:43:26.759]     at loadPlugin (/vercel/path0/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:49:32)
[18:43:26.759]     at /vercel/path0/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:157:56
[18:43:26.760]     at Array.map (<anonymous>)
[18:43:26.760]     at getPostCssPlugins (/vercel/path0/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:157:47)
[18:43:26.760]     at async /vercel/path0/node_modules/next/dist/build/webpack/config/blocks/css/index.js:124:36
[18:43:26.760]     at async /vercel/path0/node_modules/next/dist/build/webpack/loaders/next-font-loader/index.js:86:33
[18:43:26.761]     at async Span.traceAsyncFn (/vercel/path0/node_modules/next/dist/trace/trace.js:147:20)
[18:43:26.761] 
[18:43:26.761] ./app/dashboard/page.tsx
[18:43:26.761] Module not found: Can't resolve '@/components/layout/AppLayout'
[18:43:26.761] 
[18:43:26.763] https://nextjs.org/docs/messages/module-not-found
[18:43:26.763] 
[18:43:26.763] ./app/dashboard/page.tsx
[18:43:26.763] Module not found: Can't resolve '@/components/layout/PageHeader'
[18:43:26.764] 
[18:43:26.764] https://nextjs.org/docs/messages/module-not-found
[18:43:26.764] 
[18:43:26.765] ./app/dashboard/page.tsx
[18:43:26.765] Module not found: Can't resolve '@/components/dashboard/MonthlySummary'
[18:43:26.765] 
[18:43:26.767] https://nextjs.org/docs/messages/module-not-found
[18:43:26.767] 
[18:43:26.767] ./app/dashboard/page.tsx
[18:43:26.767] Module not found: Can't resolve '@/components/dashboard/CategoryPieChart'
[18:43:26.767] 
[18:43:26.767] https://nextjs.org/docs/messages/module-not-found
[18:43:26.768] 
[18:43:26.768] 
[18:43:26.768] > Build failed because of webpack errors
[18:43:26.799] Error: Command "npm install && npm run build" exited with 1
[18:43:27.033] 
```

## 状況

- GitHubリポジトリ: `modern-expense-tracker`
- Vercelプロジェクト: `modern-expense-tracker-app`
- ブランチ: master/main
- コミット: fix: remove problematic env and functions config from vercel.json

## 解決策

### 問題1: tailwindcssモジュールが見つからない
**原因**: Vercelのビルド環境では`devDependencies`がインストールされない場合がある
**解決**: `tailwindcss`, `postcss`, `autoprefixer`を`dependencies`に移動

### 問題2: コンポーネントのインポートパスが解決できない
**原因**: TypeScriptのパスエイリアス`@/`が正しく解決されていない
**解決**: tsconfig.jsonの設定は正しいため、package.jsonの修正で解決されるはず

### 実施した修正
1. package.jsonで以下を`devDependencies`から`dependencies`に移動：
   - tailwindcss
   - postcss
   - autoprefixer
2. package-lock.jsonを削除して再生成

## 関連ファイル

- `/vercel.json`
- `/package.json`
- `/.nvmrc`