# Vercel デプロイメント - 最新エラーログ

**最終更新**: 2025-01-28
**プロジェクト**: modern-expense-tracker-app
**リポジトリ**: Apprentice-Alchemist-A/modern-expense-tracker

---

## 現在のエラー内容

```
[21:32:38.304] Running build in Washington, D.C., USA (East) – iad1
[21:32:38.304] Build machine configuration: 2 cores, 8 GB
[21:32:38.355] Cloning github.com/Apprentice-Alchemist-A/modern-expense-tracker (Branch: master, Commit: f209de8)
[21:32:38.614] Previous build caches not available
[21:32:38.875] Cloning completed: 520.000ms
[21:32:39.199] Running "vercel build"
[21:32:39.626] Vercel CLI 43.3.0
[21:32:39.937] Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
[21:32:39.945] Running "install" command: `npm install`...
[21:32:52.889] npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[21:32:53.392] npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
[21:32:53.816] npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
[21:32:54.081] npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
[21:32:55.109] npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
[21:32:55.139] npm warn deprecated @supabase/auth-helpers-shared@0.7.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:32:55.222] npm warn deprecated glob@7.1.7: Glob versions prior to v9 are no longer supported
[21:32:55.451] npm warn deprecated @supabase/auth-helpers-nextjs@0.10.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:32:57.104] npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
[21:33:03.755] 
[21:33:03.756] added 461 packages, and audited 462 packages in 24s
[21:33:03.757] 
[21:33:03.757] 154 packages are looking for funding
[21:33:03.757]   run `npm fund` for details
[21:33:03.808] 
[21:33:03.809] 1 critical severity vulnerability
[21:33:03.810] 
[21:33:03.810] To address all issues, run:
[21:33:03.810]   npm audit fix --force
[21:33:03.811] 
[21:33:03.811] Run `npm audit` for details.
[21:33:03.858] Detected Next.js version: 14.0.4
[21:33:03.860] Running "npm ci && npm run build"
[21:33:07.902] npm warn deprecated @supabase/auth-helpers-shared@0.7.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:33:08.570] npm warn deprecated @supabase/auth-helpers-nextjs@0.10.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:33:12.439] 
[21:33:12.440] added 204 packages, and audited 205 packages in 9s
[21:33:12.441] 
[21:33:12.441] 40 packages are looking for funding
[21:33:12.442]   run `npm fund` for details
[21:33:12.514] 
[21:33:12.515] 1 critical severity vulnerability
[21:33:12.515] 
[21:33:12.516] To address all issues, run:
[21:33:12.516]   npm audit fix --force
[21:33:12.516] 
[21:33:12.516] Run `npm audit` for details.
[21:33:12.655] 
[21:33:12.656] > expense-tracker-redesign@0.1.0 build
[21:33:12.657] > next build
[21:33:12.657] 
[21:33:13.182] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[21:33:13.183] This information is used to shape Next.js' roadmap and prioritize features.
[21:33:13.183] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[21:33:13.183] https://nextjs.org/telemetry
[21:33:13.183] 
[21:33:13.261]    ▲ Next.js 14.0.4
[21:33:13.262] 
[21:33:13.262]    Creating an optimized production build ...
[21:33:18.455] Failed to compile.
[21:33:18.455] 
[21:33:18.456] ./app/dashboard/page.tsx
[21:33:18.456] Module not found: Can't resolve '@/components/layout/AppLayout'
[21:33:18.456] 
[21:33:18.456] https://nextjs.org/docs/messages/module-not-found
[21:33:18.456] 
[21:33:18.456] ./app/dashboard/page.tsx
[21:33:18.456] Module not found: Can't resolve '@/components/layout/PageHeader'
[21:33:18.456] 
[21:33:18.456] https://nextjs.org/docs/messages/module-not-found
[21:33:18.456] 
[21:33:18.457] ./app/dashboard/page.tsx
[21:33:18.457] Module not found: Can't resolve '@/components/dashboard/MonthlySummary'
[21:33:18.457] 
[21:33:18.457] https://nextjs.org/docs/messages/module-not-found
[21:33:18.457] 
[21:33:18.458] ./app/dashboard/page.tsx
[21:33:18.458] Module not found: Can't resolve '@/components/dashboard/CategoryPieChart'
[21:33:18.458] 
[21:33:18.458] https://nextjs.org/docs/messages/module-not-found
[21:33:18.458] 
[21:33:18.458] ./app/dashboard/page.tsx
[21:33:18.458] Module not found: Can't resolve '@/components/dashboard/ExpenseTrendChart'
[21:33:18.458] 
[21:33:18.458] https://nextjs.org/docs/messages/module-not-found
[21:33:18.458] 
[21:33:18.458] 
[21:33:18.458] > Build failed because of webpack errors
[21:33:18.492] Error: Command "npm ci && npm run build" exited with 1
[21:33:18.694] 
[21:33:21.557] Exiting build container
```

---

## エラー履歴
- エラー #017: tailwindcss モジュールが見つからない → **解決済み**
- エラー #018: @/ パスエイリアスが解決できない → **対応中**

## 現在の試行状況
- [x] dependencies へ移動 (tailwindcss, postcss, autoprefixer)
- [x] next.config.js でWebpack設定追加
- [x] package.json 最適化
- [x] vercel.json 改善
- [ ] パス解決問題の根本解決

## 次の対策候補
1. 絶対パス import に変更
2. tsconfig.json の baseUrl 修正
3. .vercelignore の追加
4. ビルドコマンドの見直し

---

**使用方法**: このファイルに最新のエラーログを上書きで貼り付けてください。