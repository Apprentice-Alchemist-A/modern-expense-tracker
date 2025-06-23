# エラーログ 003 - 編集機能バリデーションスキーマエラー

## エラー概要

**発生日時:** 2024年12月
**重要度:** 高（機能停止）
**影響範囲:** 支出データ編集機能
**状況:** 編集ページで更新ボタンが無応答

## エラー詳細

### 1. 初期発見エラー - データベーススキーマ不整合

**エラーメッセージ:**
```
Failed to load resource: the server responded with a status of 400 ()
ymbtztejxfgprepzbqtk.supabase.co/rest/v1/expense_items?select=*&group_id=eq.d2dbf4ee-1074-48b6-864b-3825332c7883&order=created_at.asc:1
```

**原因:**
- `group_id` フィールド名が実際のDBでは `expense_group_id`
- `order` クエリの構文エラー
- その他のフィールド名不整合

### 2. 主要エラー - バリデーションスキーマnull値問題

**エラーメッセージ:**
```
入力内容にエラーがあります。以下をご確認ください: 
- Expected string, received null

Validation error at memo: Expected string, received null
Validation error at items.0.note: Expected string, received null
```

**詳細ログ:**
```javascript
ExpenseForm.tsx:131 Validation error at memo: Expected string, received null
ExpenseForm.tsx:131 Validation error at items.0.note: Expected string, received null
```

## 根本原因分析

### 1. データベース設計とコード実装の乖離

**問題点:**
- データベーススキーマ: `expense_group_id`, `expense_date`, `notes`
- コード実装: `group_id`, `date`, `memo`
- 一貫性の欠如によりクエリが失敗

**影響:**
- 編集ページへのアクセス時400エラー
- データ取得処理の完全停止

### 2. バリデーションスキーマの型定義問題

**問題の詳細:**
```typescript
// 問題のあった定義
memo: z.string().optional()     // string | undefined のみ許可
note: z.string().optional()     // null は許可されない

// データベースからの実際の値
memo: null                      // nullが返される
note: null                      // nullが返される
```

**TypeScript型推論の問題:**
- `z.string().optional()` = `string | undefined`
- データベースからは `string | null` が返される
- `null !== undefined` のため型不一致が発生

## 修正内容

### 1. データベーススキーマ同期修正

**ファイル:** `lib/supabase/expenses.ts`

**修正前:**
```typescript
.eq('group_id', groupId)
.order('created_at')
date: group.date,
memo: group.memo,
```

**修正後:**
```typescript
.eq('expense_group_id', groupId)
.order('created_at', { ascending: true })
date: group.expense_date,
memo: group.notes,
```

### 2. バリデーションスキーマ修正

**ファイル:** `lib/validations/expense.ts`

**修正前:**
```typescript
memo: z.string().optional(),
note: z.string().optional()
```

**修正後:**
```typescript
memo: z.string().nullable().optional(),
note: z.string().nullable().optional()
```

**型の変化:**
- 修正前: `string | undefined`
- 修正後: `string | null | undefined`

### 3. フォーム入力処理修正

**ファイル:** `components/forms/ExpenseForm.tsx`

**修正内容:**
```typescript
// 空文字列をnullに変換
onChange={(e) => updateField('memo', e.target.value || null)}
onChange={(e) => updateItem(index, 'note', e.target.value || null)}
```

## 学習・改善ポイント

### 1. データベース設計とコード同期の重要性

**問題:**
- スキーマ更新時のコード側同期漏れ
- フィールド名の不統一

**対策:**
- データベーススキーマ変更時のチェックリスト作成
- 型定義ファイルの自動生成検討

### 2. null vs undefined の適切な使い分け

**学習内容:**
- データベース: `null` を使用（SQL標準）
- JavaScript: `undefined` が一般的
- TypeScript: 両方を適切に扱う必要性

**対策:**
- `nullable().optional()` の使用
- データ変換処理の統一

### 3. バリデーション設計の考慮事項

**重要な観点:**
- データベースの実際の値に合わせる
- フロントエンドとバックエンドの型整合性
- ユーザー入力の柔軟性確保

## 予防策

### 1. 開発プロセス改善

- [ ] スキーマ変更時の影響範囲チェック
- [ ] 型定義の自動テスト追加
- [ ] バリデーション仕様の文書化

### 2. コード品質向上

- [ ] データベースアクセス層の統一
- [ ] 型安全性の強化
- [ ] エラーハンドリングの改善

### 3. テスト戦略強化

- [ ] エンドツーエンドテストの追加
- [ ] バリデーションテストの充実
- [ ] データベース連携テストの実装

## 解決確認

### ✅ 修正完了項目

1. **データベースアクセス**: 正常なクエリ実行
2. **編集ページ表示**: エラーなしでアクセス可能
3. **フォーム操作**: 全ての入力フィールドが正常動作
4. **バリデーション**: null値を適切に処理
5. **データ更新**: 正常な保存処理
6. **型チェック**: TypeScript型チェック通過

### ✅ 動作検証

- 編集ページアクセス
- データ入力・編集
- 更新ボタンクリック
- 支出一覧ページ戻り
- 更新データの表示確認

**修正結果:** 編集機能が完全に動作するようになった

## 関連ファイル

- `lib/supabase/expenses.ts` - データベースアクセス修正
- `lib/validations/expense.ts` - バリデーションスキーマ修正
- `components/forms/ExpenseForm.tsx` - フォーム処理修正
- `app/expenses/[id]/edit/page.tsx` - 編集ページ実装