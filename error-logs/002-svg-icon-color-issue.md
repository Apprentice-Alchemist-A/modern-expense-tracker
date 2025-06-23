# エラーログ #002: SVGアイコンの色変更機能不具合

## 発生日時
2025-06-22

## エラー概要
SVGアイコンコンポーネントで、variant プロパティによる色変更が機能しない重大な不具合が発生。

## 症状
- Icon コンポーネントに `variant="error"` 等を指定しても、アイコンの色が変わらない
- 全てのアイコンが黒色（#4B4B4B）で固定表示される
- CSSフィルター（`filter brightness-0 invert`）は動作するが、variantシステムが動作しない

## 影響範囲
- 全てのSVGアイコン表示箇所
- `/demo/icons-new` ページのカラーバリエーション機能
- 今後実装予定の全画面でのアイコン色制御

## 原因調査

### 1. 初期診断
**仮説**: 正規表現による色置換が機能していない
**調査結果**: SVGファイル内に複数の色指定方法が存在
```xml
<style type="text/css">.st0{fill:#4B4B4B;}</style>
<path class="st0" d="..." style="fill: rgb(75, 75, 75);"></path>
```

### 2. 第二段階調査
**仮説**: CSS継承が機能していない
**調査結果**: 
- SVGにclass属性は追加されているが、既存のstyle指定が優先される
- インラインstyle属性 > class属性のCSS優先度問題

### 3. 最終調査
**発見**: 開発者ツールでCSSルール自体が存在しない
**原因**: TailwindのPurgeCSSが動的クラス名を削除していた

## 根本原因

### 1. SVGファイルの複雑な色指定
- `<style>`タグ内のCSS定義
- `class="st0"`による間接参照
- `style="fill: rgb(75,75,75)"`のインライン指定

### 2. TailwindのPurgeCSS
- 動的に生成される`icon-error`等のクラスがビルド時に削除される
- CSSファイルには定義があるが、最終的なCSSバンドルに含まれない

## 解決策

### 1. SVG処理の改善
```javascript
const processedSvg = svgContent
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')  // styleタグ削除
  .replace(/\s+class="[^"]*"/g, '')                // 既存class削除
  .replace(/\s+style="[^"]*"/g, '')                // style属性削除
  .replace(/<(path|circle|rect|polygon)([^>]*)>/g, `<$1$2 class="${iconClass}">`)
```

### 2. Tailwind設定の修正
```javascript
// tailwind.config.js
safelist: [
  'icon-default',
  'icon-primary', 
  'icon-success',
  'icon-warning',
  'icon-error'
]
```

### 3. CSS定義の強化
```css
.icon-error,
path.icon-error,
svg.icon-error path {
  fill: #dc2626 !important;
  stroke: #dc2626 !important;
}
```

## 修正後の動作確認
- ✅ 全てのvariant（default, primary, success, warning, error）で色変更確認
- ✅ path, circle, rect, polygon 各要素での色変更確認
- ✅ 本番ビルドでの動作確認

## 教訓

### 1. SVGの色制御は複雑
- 単純なCSS継承では不十分
- 既存のSVGファイルの構造を理解する必要がある
- 複数の色指定方法を考慮する必要がある

### 2. Tailwindの動的クラス問題
- 動的に生成されるクラス名はsafelistで保護が必要
- PurgeCSSの挙動を理解することが重要

### 3. デバッグアプローチ
- 開発者ツールでのCSS確認は必須
- コンソールログによる段階的な処理確認が有効
- 問題の切り分けを体系的に行う

## 予防策
1. 新しい動的クラスを追加する際は必ず`safelist`に追加
2. SVGファイルは事前に構造を確認
3. CSS適用確認は開発者ツールで必ず実施

## 関連ファイル
- `/components/ui/Icon.tsx`
- `/styles/globals.css`
- `/tailwind.config.js`
- `/app/demo/icons-new/page.tsx`