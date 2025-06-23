# エラーログ #011 - URLパラメータ無限ループ問題修正

## 発生日時
2025-06-23

## 問題の症状
- `/expenses`ページで無限データリロードが発生
- 大量のSVGアイコン読み込みエラー（`ERR_INSUFFICIENT_RESOURCES`）
- ブラウザリソース枯渇状態
- コンソールでHTTPリクエストが無限に繰り返される

## 根本原因分析

### 主要原因: URLパラメータ連携実装によるuseEffect依存関係の循環

```javascript
// 問題のコード
useEffect(() => {
  if (user) {
    fetchExpenses()
  }
}, [filters, sort, currentPage, itemsPerPage, user]) // オブジェクト参照が毎回変わる
```

### 循環ループのメカニズム
1. **URLパラメータ解析** → `parseStateFromUrl()`で新しいオブジェクト生成
2. **useEffect発火** → `fetchExpenses`実行  
3. **レンダリング** → `useUrlParams`再実行
4. **新しい状態オブジェクト** → URLパラメータ更新
5. **1に戻る** = **無限ループ**

### 技術的問題点

#### A. オブジェクト参照の不安定性
- `parseStateFromUrl`が毎回新しいオブジェクトを作成
- `useCallback`の依存関係`[searchParams]`が毎回変化
- React.useMemoが不適切に使用されていた

#### B. 状態更新の副作用
- `updateUrl` → URL変更 → `searchParams`変更 → 再解析 → 無限ループ
- 状態とURLの二重管理による同期問題

## 実装した修正

### 1. useUrlParamsフックの安定化

```javascript
// 修正前
const parseStateFromUrl = useCallback(() => {
  // ...
}, [searchParams]) // 毎回変化

// 修正後  
const parseStateFromUrl = useCallback(() => {
  // ...
}, [searchParams.toString()]) // 文字列化で安定化
```

### 2. 状態更新関数の直接URL操作

```javascript
// 修正前: 中間状態経由
const updateFilters = useCallback((filters) => {
  const newState = { ...currentState, filters, page: 1 }
  updateUrl(newState)
}, [currentState, updateUrl])

// 修正後: 直接URL操作
const updateFilters = useCallback((filters) => {
  const params = new URLSearchParams(searchParams.toString())
  // 直接URLSearchParamsを操作
  router.push(newUrl, { scroll: false })
}, [searchParams.toString(), router])
```

### 3. fetchExpenses関数のメモ化

```javascript
// useCallbackで依存関係を明確化
const fetchExpenses = useCallback(async () => {
  // ...
}, [currentPage, itemsPerPage, filters, sort])
```

### 4. useEffectの依存関係最適化

```javascript
// 修正前: オブジェクト直接参照
}, [filters, sort, currentPage, itemsPerPage, user])

// 修正後: fetchExpenses経由
}, [user, fetchExpenses])
```

### 5. アイコンコンポーネントの堅牢化

```javascript
// マウント状態チェックとフォールバック追加
useEffect(() => {
  let isMounted = true
  
  const loadSvg = async () => {
    try {
      // ... エラーハンドリング強化
    } catch (error) {
      if (isMounted) {
        // フォールバックアイコン設定
      }
    }
  }
  
  return () => { isMounted = false }
}, [iconPath])
```

### 6. 不足SVGアイコンの追加

- `chevron-left.svg`
- `chevron-right.svg`

## 検証結果

### 修正前
- ✗ 無限リロードループ
- ✗ ブラウザリソース枯渇
- ✗ 大量の404エラー

### 修正後 (期待値)
- ✅ 安定したページロード
- ✅ 適切なURLパラメータ同期
- ✅ リソース消費の正常化
- ✅ エラーハンドリングの改善

## 技術的学習

### A. Reactフックの依存関係管理
- オブジェクト参照の安定性が重要
- `useCallback`/`useMemo`の適切な使用
- 副作用の連鎖を避ける設計

### B. URLパラメータ同期パターン
- 直接URL操作 vs 中間状態経由
- 循環参照の回避方法
- パフォーマンスとコードの複雑性のトレードオフ

## 予防策
- 複雑な状態管理では依存関係図を事前に描く
- 無限ループの検出とアラート機能の追加検討
- URLパラメータ管理ライブラリの導入検討

## 修正ファイル
- `/hooks/useUrlParams.ts` - 主要修正
- `/app/expenses/page.tsx` - useEffect依存関係修正
- `/components/ui/Icon.tsx` - エラーハンドリング強化
- `/public/icons/ui/chevron-*.svg` - 不足アイコン追加