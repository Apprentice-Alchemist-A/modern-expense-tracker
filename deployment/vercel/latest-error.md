# Vercel デプロイメント - 最新エラーログ

**最終更新**: 2025-01-28
**プロジェクト**: modern-expense-tracker-app
**リポジトリ**: Apprentice-Alchemist-A/modern-expense-tracker

---



```
[22:33:00.832] Running build in Washington, D.C., USA (East) – iad1
[22:33:00.832] Build machine configuration: 2 cores, 8 GB
[22:33:00.850] Cloning github.com/Apprentice-Alchemist-A/modern-expense-tracker (Branch: master, Commit: 8f3fbdd)
[22:33:01.366] Cloning completed: 515.000ms
[22:33:03.275] Restored build cache from previous deployment (AXNDDnV6Ao791ybZdtRy6Li4D8Cz)
[22:33:03.858] Running "vercel build"
[22:33:04.766] Vercel CLI 43.3.0
[22:33:05.076] Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
[22:33:05.085] Running "install" command: `npm install`...
[22:33:22.940] 
[22:33:22.941] up to date, audited 462 packages in 18s
[22:33:22.941] 
[22:33:22.941] 154 packages are looking for funding
[22:33:22.942]   run `npm fund` for details
[22:33:22.990] 
[22:33:22.991] 1 critical severity vulnerability
[22:33:22.991] 
[22:33:22.991] To address all issues, run:
[22:33:22.992]   npm audit fix --force
[22:33:22.992] 
[22:33:22.992] Run `npm audit` for details.
[22:33:23.025] Detected Next.js version: 14.0.4
[22:33:23.026] Running "npm run build"
[22:33:23.140] 
[22:33:23.140] > expense-tracker-redesign@0.1.0 build
[22:33:23.140] > node node_modules/next/dist/bin/next build
[22:33:23.140] 
[22:33:23.792]    ▲ Next.js 14.0.4
[22:33:23.794] 
[22:33:23.794]    Creating an optimized production build ...
[22:33:34.896]  ⚠ Compiled with warnings
[22:33:34.896] 
[22:33:34.896] ./node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js
[22:33:34.896] Critical dependency: the request of a dependency is an expression
[22:33:34.897] 
[22:33:34.897] Import trace for requested module:
[22:33:34.897] ./node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js
[22:33:34.897] ./node_modules/@supabase/realtime-js/dist/main/index.js
[22:33:34.897] ./node_modules/@supabase/supabase-js/dist/module/index.js
[22:33:34.897] ./node_modules/@supabase/auth-helpers-shared/dist/index.mjs
[22:33:34.897] ./node_modules/@supabase/auth-helpers-nextjs/dist/index.js
[22:33:34.897] ./app/api/create-test-data/route.ts
[22:33:34.897] 
[22:33:34.898]    Linting and checking validity of types ...
[22:33:40.569] 
[22:33:40.571] ./app/dashboard/page.tsx
[22:33:40.572] 70:6  Warning: React Hook useEffect has a missing dependency: 'fetchDashboardData'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
[22:33:40.572] 
[22:33:40.573] ./app/expenses/page.tsx
[22:33:40.573] 151:6  Warning: React Hook useEffect has a missing dependency: 'fetchExpenses'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
[22:33:40.573] 
[22:33:40.574] ./app/test-new-db/page.tsx
[22:33:40.574] 83:6  Warning: React Hook useEffect has a missing dependency: 'runAllTests'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
[22:33:40.575] 
[22:33:40.576] ./app/test-supabase/page.tsx
[22:33:40.576] 70:6  Warning: React Hook useEffect has a missing dependency: 'runAllTests'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
[22:33:40.576] 
[22:33:40.577] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/basic-features/eslint#disabling-rules
[22:33:45.855] Failed to compile.
[22:33:45.856] 
[22:33:45.856] ./app/demo-dashboard/page.tsx:133:23
[22:33:45.856] Type error: Type '"outline"' is not assignable to type '"primary" | "secondary" | "ghost" | "danger" | "success" | undefined'.
[22:33:45.856] 
[22:33:45.856] [0m [90m 131 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"flex items-center gap-3"[39m[33m>[39m[0m
[22:33:45.857] [0m [90m 132 |[39m             [33m<[39m[33mLink[39m href[33m=[39m[32m"/"[39m[33m>[39m[0m
[22:33:45.857] [0m[31m[1m>[22m[39m[90m 133 |[39m               [33m<[39m[33mButton[39m variant[33m=[39m[32m"outline"[39m size[33m=[39m[32m"sm"[39m[33m>[39m[0m
[22:33:45.857] [0m [90m     |[39m                       [31m[1m^[22m[39m[0m
[22:33:45.857] [0m [90m 134 |[39m                 ホームに戻る[0m
[22:33:45.857] [0m [90m 135 |[39m               [33m<[39m[33m/[39m[33mButton[39m[33m>[39m[0m
[22:33:45.858] [0m [90m 136 |[39m             [33m<[39m[33m/[39m[33mLink[39m[33m>[39m[0m
[22:33:45.942] Error: Command "npm run build" exited with 1
[22:33:46.522] 
[22:33:49.946] Exiting build container
```

**公開URL**: https://modern-expense-tracker-app.vercel.app

---

## 解決済みエラー履歴
- エラー #017: tailwindcss モジュールが見つからない → ✅ **解決済み**
- エラー #018: @/ パスエイリアスが解決できない → ✅ **解決済み**
- 最終問題: ビルドコマンド競合 → ✅ **解決済み**

## 最終的な解決策
1. **next.config.js**: path.resolve(__dirname) による堅牢なエイリアス設定
2. **package.json**: 正確なNext.jsパス指定
3. **vercel.json**: フレームワーク指定のみの簡素化
4. **dependencies**: 必要なビルドツールの適切な配置

## 成功要因
- 段階的な問題解決アプローチ
- ローカル環境での事前検証
- 設定ファイルの最適化
- 依存関係の正確な管理

---

**🚀 プロダクション環境での運用開始！**