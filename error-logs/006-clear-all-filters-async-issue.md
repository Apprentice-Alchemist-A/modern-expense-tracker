# エラーログ #006 - フィルタークリア機能の非同期処理問題

## 発生日時
2025-06-23

## エラー概要
「すべてのフィルターをクリア」ボタンが正常に動作しない。クリックしても古いフィルター条件がURLに残ってしまう。

## 症状
1. フィルターやソートを適用した状態で「クリア」ボタンをクリック
2. 一瞬URLが変わるが、すぐに古いフィルター条件を含むURLに戻る
3. フィルターがクリアされない

## 発生条件
- 日付範囲、カテゴリ、支払方法などのフィルターを適用
- 「すべてのフィルターをクリア」ボタンをクリック

## 原因分析

### 1. 非同期処理のタイミング問題

#### 問題のコード
```typescript
// ExpenseFilters.tsx
const clearAllFilters = () => {
  onFiltersChange({})     // 非同期でURL更新
  onSortChange(null)      // 別の非同期でURL更新
}
```

#### 実行フロー
1. `onFiltersChange({})`が実行 → `updateFilters`関数が呼ばれる
2. `updateFilters`内で`searchParams.toString()`を読み取り、URLを更新しようとする
3. **しかし、その処理が完了する前に`onSortChange(null)`が実行される**
4. `updateSort`内で`searchParams.toString()`を読み取る時、まだ古いURLパラメータが残っている
5. 結果として、古いフィルターパラメータを含むURLが再設定される

### 2. コンソールログから判明した動作

```
updateFilters called with: {}
New URL will be: /expenses
updateSort called with: null
updateSort - New URL will be: ?date_from=2025-06-05&date_to=2025-07-14&categories=医療費,教育費,日用品
```

- `updateFilters`は空のオブジェクトを受け取り、`/expenses`に遷移しようとした
- しかし`updateSort`が実行された時、古いパラメータがまだ残っていた

## 解決策

### 1. 一括リセット関数の使用

```typescript
// ExpenseFilters.tsx
interface ExpenseFiltersProps {
  // ...
  onResetAll?: () => void  // 追加
}

const clearAllFilters = () => {
  if (onResetAll) {
    onResetAll()  // 一括でリセット
  } else {
    onFiltersChange({})
    onSortChange(null)
  }
}
```

### 2. URL更新の改善

```typescript
// useUrlParams.ts
const newUrl = params.toString() ? `?${params.toString()}` : ''
const fullUrl = newUrl || '/expenses'  // 空の場合は明示的にパスを指定
router.push(fullUrl, { scroll: false })
```

## 教訓

### 1. 非同期処理の順序性
- 複数の非同期処理を連続で実行する場合、実行順序が保証されない
- 状態の一貫性を保つには、単一の処理で完結させる必要がある

### 2. URL管理の複雑性
- Next.jsのルーターとURLSearchParamsの組み合わせは注意が必要
- 空文字列の扱いなど、エッジケースの考慮が重要

### 3. コンポーネント設計
- 複数の状態を同時に更新する場合は、専用の関数を用意する
- 個別の更新関数の組み合わせは避ける

## 再発防止策

1. **統合テストの追加**
   - フィルタークリア機能の自動テスト
   - URL状態の検証

2. **非同期処理のガイドライン**
   - 関連する状態更新は単一の関数で行う
   - 必要に応じてトランザクション的な処理を実装

3. **デバッグ機能の強化**
   - 開発環境でのURL変更ログ
   - 状態遷移の可視化ツール

## 影響範囲
- ExpenseFiltersコンポーネント
- useUrlParamsフック
- 支出一覧ページのフィルター機能

## 修正ファイル
- `/components/expenses/ExpenseFilters.tsx`
- `/hooks/useUrlParams.ts`
- `/app/expenses/page.tsx`

非同期処理のタイミング問題は、Reactアプリケーションでよく発生する問題の一つ。今回の経験を活かし、より堅牢な状態管理を実装していく。