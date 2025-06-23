# デザインシステム

## カラーパレット

### プライマリカラー（Notion風）
```typescript
const colors = {
  primary: {
    50: '#f7f7f5',   // 極薄グレー
    100: '#e9e9e4',  // 薄グレー
    200: '#d3d3d0',  // ライトグレー
    300: '#b8b8b3',  // ミディアムグレー
    400: '#9c9c96',  // グレー
    500: '#787774',  // ベースグレー
    600: '#6b6b67',  // ダークグレー
    700: '#5a5a56',  // より濃いグレー
    800: '#484844',  // 濃いグレー
    900: '#2f2f2f'   // 最も濃いグレー
  }
}
```

### セマンティックカラー
```typescript
const semanticColors = {
  success: '#22c55e',    // 緑（成功）
  warning: '#f59e0b',    // オレンジ（警告）
  error: '#ef4444',      // 赤（エラー）
  info: '#3b82f6',       // 青（情報）
}
```

### カテゴリカラー（温かみのある色合い）
```typescript
const categoryColors = {
  food: '#ff6b6b',        // 食費 - 温かい赤
  transport: '#4ecdc4',   // 交通費 - ターコイズ
  entertainment: '#45b7d1', // 娯楽費 - スカイブルー
  daily: '#96ceb4',       // 日用品 - ミントグリーン
  medical: '#ffeaa7',     // 医療費 - 薄黄色
  education: '#dda0dd',   // 教育費 - 薄紫
  other: '#95a5a6'        // その他 - グレー
}
```

## タイポグラフィ

### フォントファミリー
```typescript
const fontFamily = {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace']
}
```

### フォントサイズ
```typescript
const fontSize = {
  xs: '0.75rem',    // 12px - キャプション
  sm: '0.875rem',   // 14px - 小さなテキスト
  base: '1rem',     // 16px - 基本テキスト
  lg: '1.125rem',   // 18px - 大きなテキスト
  xl: '1.25rem',    // 20px - 小見出し
  '2xl': '1.5rem',  // 24px - 見出し
  '3xl': '1.875rem', // 30px - 大見出し
  '4xl': '2.25rem', // 36px - ページタイトル
}
```

### フォントウェイト
```typescript
const fontWeight = {
  light: '300',     // ライト
  normal: '400',    // ノーマル
  medium: '500',    // ミディアム
  semibold: '600',  // セミボールド
  bold: '700',      // ボールド
}
```

## スペーシング

### 基本スペーシング（4px基準）
```typescript
const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
}
```

## ボーダーラディウス

```typescript
const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',   // 完全な丸
}
```

## シャドウ

```typescript
const boxShadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
}
```

## アニメーション・トランジション

### 基本トランジション
```typescript
const transition = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '350ms ease',
  bounce: '350ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}
```

### アニメーションパターン
```typescript
const animations = {
  // フェード
  fadeIn: 'opacity 0 → 1',
  fadeOut: 'opacity 1 → 0',
  
  // スライド
  slideInUp: 'transform translateY(20px) → translateY(0)',
  slideInDown: 'transform translateY(-20px) → translateY(0)',
  slideInLeft: 'transform translateX(-20px) → translateX(0)',
  slideInRight: 'transform translateX(20px) → translateX(0)',
  
  // スケール
  scaleIn: 'transform scale(0.95) → scale(1)',
  scaleOut: 'transform scale(1) → scale(0.95)',
  
  // ホバー効果
  liftUp: 'transform translateY(0) → translateY(-2px)',
  cardHover: 'box-shadow elevation + transform lift'
}
```

## グリッドシステム

### ブレイクポイント
```typescript
const breakpoints = {
  sm: '640px',   // モバイル
  md: '768px',   // タブレット
  lg: '1024px',  // デスクトップ
  xl: '1280px',  // 大画面
  '2xl': '1536px' // 超大画面
}
```

### コンテナ幅
```typescript
const container = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```