# ダッシュボード無限再レンダリング問題分析

**日付**: 2025-01-28  
**問題**: ダッシュボードページがチカチカして無限更新が発生

## 🔍 発見した問題

### 根本原因: useEffect依存配列の無限ループ

**問題箇所**: `/app/dashboard/page.tsx` 70行目

```typescript
useEffect(() => {
  fetchDashboardData()
}, [user, fetchDashboardData])  // ← fetchDashboardDataが毎回新しい関数として作成される
```

### 無限ループの流れ

1. **コンポーネント初回レンダリング**: `fetchDashboardData` 関数が作成される
2. **useEffect実行**: `fetchDashboardData()` が実行される
3. **データ取得・setState**: `setDashboardData()` が実行される
4. **再レンダリング**: stateが更新されコンポーネントが再レンダリング
5. **新しい関数作成**: `fetchDashboardData` が新しい関数として再作成される
6. **useEffect再実行**: 依存配列の `fetchDashboardData` が変わったため再実行
7. **無限ループ**: 2に戻って繰り返し

## 🎯 修正方法

### 解決策1: useCallback使用（推奨）

```typescript
const fetchDashboardData = useCallback(async () => {
  if (!user) return
  
  try {
    setLoading(true)
    setError('')
    const data = await dashboardService.getDashboardData()
    setDashboardData(data)
  } catch (err) {
    console.error('Failed to fetch dashboard data:', err)
    setError('ダッシュボードデータの取得に失敗しました')
  } finally {
    setLoading(false)
  }
}, [user])

useEffect(() => {
  fetchDashboardData()
}, [fetchDashboardData])
```

### 解決策2: 依存配列から関数を除外

```typescript
useEffect(() => {
  fetchDashboardData()
}, [user])  // fetchDashboardDataを除外
```

### 解決策3: 関数をuseEffect内に移動

```typescript
useEffect(() => {
  const fetchData = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError('')
      const data = await dashboardService.getDashboardData()
      setDashboardData(data)
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError('ダッシュボードデータの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }
  
  fetchData()
}, [user])
```

## 🔧 その他の潜在的問題

### AuthProviderの多重ログ出力

`AuthProvider.tsx` で大量のconsole.logが出力されている：
- セッションチェック
- 認証状態変更
- エラーハンドリング

これらのログも無限ループの一因となっている可能性があります。

### Supabaseクライアントの重複作成

`DashboardService.getInstance()` を毎回呼び出している可能性も確認が必要。

## 📋 推奨修正アプローチ

1. **最優先**: useCallbackを使用した関数のメモ化
2. **中優先**: 不要なconsole.logの削除
3. **低優先**: Supabaseクライアントの最適化

---

**結論**: useEffectの依存配列に関数を含める際は、useCallbackでメモ化が必須。