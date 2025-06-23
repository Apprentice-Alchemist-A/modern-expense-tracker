# UIパターン集

## インタラクションパターン

### 1. ホバー効果

#### カードホバー
```css
.card-hover {
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
```

#### ボタンホバー
```css
.button-hover {
  transition: all 150ms ease;
}

.button-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 2. ページ遷移アニメーション

#### スライドイン
```css
.page-slide-in {
  animation: slideIn 250ms ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

#### フェードイン
```css
.page-fade-in {
  animation: fadeIn 300ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 3. フォーカス状態

#### インプットフォーカス
```css
.input-focus {
  border: 1px solid #e5e5e5;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input-focus:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}
```

## レイアウトパターン

### 1. サイドバーレイアウト

```tsx
// デスクトップ
<div className="flex h-screen">
  <aside className="w-64 bg-white border-r">
    {/* サイドバー */}
  </aside>
  <main className="flex-1 overflow-auto">
    {/* メインコンテンツ */}
  </main>
</div>

// モバイル（引き出し式）
<div className="relative">
  {/* オーバーレイ */}
  {sidebarOpen && (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={closeSidebar}
    />
  )}
  
  {/* サイドバー */}
  <aside className={`
    fixed left-0 top-0 h-full w-64 bg-white z-50
    transform transition-transform duration-300
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `}>
    {/* サイドバーコンテンツ */}
  </aside>
  
  {/* メインコンテンツ */}
  <main className="min-h-screen">
    {/* コンテンツ */}
  </main>
</div>
```

### 2. カードグリッドレイアウト

```tsx
// レスポンシブグリッド
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} className="p-6">
      {/* カードコンテンツ */}
    </Card>
  ))}
</div>
```

### 3. モーダルレイアウト

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* オーバーレイ */}
  <div className="fixed inset-0 bg-black bg-opacity-50" />
  
  {/* モーダル */}
  <div className="
    relative bg-white rounded-lg shadow-xl
    w-full max-w-md mx-4
    transform transition-all duration-200
    scale-100 opacity-100
  ">
    {/* モーダルコンテンツ */}
  </div>
</div>
```

## データ表示パターン

### 1. 空状態

```tsx
<div className="text-center py-12">
  <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
    {/* 空状態アイコン */}
    📝
  </div>
  <h3 className="text-lg font-medium text-gray-900 mb-2">
    まだ支出がありません
  </h3>
  <p className="text-gray-500 mb-6">
    最初の支出を記録してみましょう
  </p>
  <Button variant="primary">
    支出を記録する
  </Button>
</div>
```

### 2. ローディング状態

```tsx
// リスト用スケルトン
<div className="space-y-4">
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  ))}
</div>
```

### 3. エラー状態

```tsx
<div className="text-center py-12">
  <div className="w-16 h-16 mx-auto mb-4 text-red-400">
    ⚠️
  </div>
  <h3 className="text-lg font-medium text-gray-900 mb-2">
    データの読み込みに失敗しました
  </h3>
  <p className="text-gray-500 mb-6">
    しばらく時間をおいて再度お試しください
  </p>
  <Button variant="secondary" onClick={retry}>
    再試行
  </Button>
</div>
```

## フォームパターン

### 1. 段階的入力

```tsx
// ステップ表示
<div className="flex items-center justify-center mb-8">
  {steps.map((step, index) => (
    <div key={step.id} className="flex items-center">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
        ${currentStep >= index + 1 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-600'
        }
      `}>
        {index + 1}
      </div>
      {index < steps.length - 1 && (
        <div className={`
          w-12 h-0.5 mx-2
          ${currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'}
        `} />
      )}
    </div>
  ))}
</div>
```

### 2. バリデーション表示

```tsx
<div className="space-y-2">
  <Input
    value={value}
    onChange={setValue}
    error={error}
    className={error ? 'border-red-500' : ''}
  />
  {error && (
    <p className="text-sm text-red-600 flex items-center">
      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
      {error}
    </p>
  )}
</div>
```

## ナビゲーションパターン

### 1. ブレッドクラム

```tsx
<nav className="flex items-center space-x-2 text-sm text-gray-500">
  {breadcrumbs.map((crumb, index) => (
    <div key={crumb.href} className="flex items-center">
      {index > 0 && <ChevronRightIcon className="w-4 h-4 mx-2" />}
      {index === breadcrumbs.length - 1 ? (
        <span className="text-gray-900 font-medium">{crumb.label}</span>
      ) : (
        <Link href={crumb.href} className="hover:text-gray-900">
          {crumb.label}
        </Link>
      )}
    </div>
  ))}
</nav>
```

### 2. タブナビゲーション

```tsx
<div className="border-b border-gray-200">
  <nav className="flex space-x-8">
    {tabs.map(tab => (
      <button
        key={tab.id}
        className={`
          py-2 px-1 border-b-2 font-medium text-sm
          ${activeTab === tab.id
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
          }
        `}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </nav>
</div>
```

## フィードバックパターン

### 1. トースト通知

```tsx
<div className={`
  fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50
  transform transition-all duration-300
  ${type === 'success' ? 'bg-green-500 text-white' : ''}
  ${type === 'error' ? 'bg-red-500 text-white' : ''}
  ${type === 'info' ? 'bg-blue-500 text-white' : ''}
`}>
  <div className="flex items-center">
    <span className="mr-2">{getIcon(type)}</span>
    <span>{message}</span>
    <button 
      onClick={onClose}
      className="ml-4 text-white hover:text-gray-200"
    >
      ×
    </button>
  </div>
</div>
```

### 2. 進行状況表示

```tsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
<p className="text-sm text-gray-600 mt-2 text-center">
  {progress}% 完了
</p>
```