# Phase 2: 高度機能実装計画

## 🎯 目標
ユーザー要望の高度機能を実装し、統合型生活管理アプリとして完成度を高める

## 📅 期間
2025年7月16日 - 2025年9月30日（2.5ヶ月間）

## 🚀 主要機能実装

### 1. 食事管理システム（優先度: 🔴 Critical）
**目的**: 家計簿とは独立した食事記録システム

#### 食事専用ページ
- **実装内容**:
  - 食事記録専用UI
  - カレンダービュー
  - 食事写真ギャラリー
  - 栄養情報表示（将来）
  
#### 食事タグシステム
- **階層タグ構造**:
  ```
  和食 
  ├── 寿司
  ├── ラーメン
  └── 丼物
      ├── 牛丼
      ├── 親子丼
      └── カツ丼
  
  洋食
  ├── イタリアン
  │   ├── パスタ
  │   └── ピザ
  └── フレンチ
  ```

- **機能詳細**:
  - 複数タグ選択可能
  - タグ検索・フィルター
  - タグ使用頻度統計
  - 自動タグ提案

**推定工数**: 3週間

### 2. Google Photos連携（優先度: 🟡 High）
**目的**: 食事・レシートの写真を日付で自動関連付け

#### 実装機能
- **日付連動写真選択**:
  - 設定した日付の写真のみ表示
  - Google Photos API連携
  - サムネイル表示
  - 複数選択可能

- **写真管理**:
  - Supabase Storageに保存
  - 自動リサイズ
  - 遅延読み込み

**推定工数**: 2週間

### 3. レシートOCR機能（優先度: 🟡 High）
**目的**: レシート撮影から自動データ入力

#### Google Cloud Vision API統合
- **OCR処理フロー**:
  1. 画像アップロード
  2. OCRテキスト抽出
  3. 店名・金額・日付の自動判定
  4. 支出データへの変換
  5. 確認・編集画面
  6. 一括登録

- **精度向上機能**:
  - 店名辞書マッチング
  - 金額パターン認識
  - 日付フォーマット対応
  - 手動修正機能

**推定工数**: 3週間

### 4. お店データベース・地図連携（優先度: 🟡 High）
**目的**: 店舗情報の一元管理と位置情報活用

#### 店舗管理機能
- **店舗情報**:
  - 基本情報（名前、カテゴリ、電話番号）
  - 位置情報（住所、緯度経度）
  - 営業時間、定休日
  - 平均予算、支払方法
  - ユーザーメモ・評価

#### Google Maps連携
- **地図機能**:
  - 店舗位置のマップ表示
  - 現在地からのルート案内
  - 近くの店舗検索
  - 店舗写真・レビュー連携

**推定工数**: 2.5週間

### 5. テンプレート機能（優先度: 🟢 Medium）
**目的**: よく使う支出パターンの効率化

#### テンプレート種類
- **定期支出テンプレート**:
  - 固定費（家賃、光熱費等）
  - 月額サブスクリプション
  - 定期購買

- **お店テンプレート**:
  - よく行く店舗のデフォルト設定
  - カテゴリ・支払方法の自動設定
  - 平均金額の表示

- **イベントテンプレート**:
  - 旅行、飲み会等
  - 複数項目のセット登録
  - 参加者管理（将来）

**推定工数**: 2週間

### 6. 高度な分析ダッシュボード（優先度: 🟡 High）
**目的**: データの可視化と洞察提供

#### 分析機能
- **時系列分析**:
  - 月次・週次・日次の支出推移
  - カテゴリ別トレンド
  - 前年同月比較

- **パターン分析**:
  - 曜日別支出パターン
  - 時間帯別消費傾向
  - 季節性分析

#### ビジュアライゼーション
- **チャート種類**:
  - 円グラフ（カテゴリ別割合）
  - 棒グラフ（月次比較）
  - 折れ線グラフ（トレンド）
  - ヒートマップ（支出密度）

**推定工数**: 3週間

## 🛠️ 技術実装

### 新規API統合
```typescript
// Google Photos API
const photosApi = {
  getPhotosByDate: (date: string) => Promise<Photo[]>,
  getPhotoMetadata: (photoId: string) => Promise<PhotoMeta>
}

// Google Cloud Vision API
const visionApi = {
  extractText: (imageBuffer: Buffer) => Promise<string>,
  analyzeReceipt: (text: string) => Promise<ReceiptData>
}

// Google Maps API
const mapsApi = {
  searchPlaces: (query: string) => Promise<Place[]>,
  getPlaceDetails: (placeId: string) => Promise<PlaceDetail>
}
```

### データベース拡張
```sql
-- 食事記録テーブル
CREATE TABLE food_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title VARCHAR(200) NOT NULL,
  meal_type VARCHAR(20), -- breakfast, lunch, dinner, snack
  eaten_at TIMESTAMP WITH TIME ZONE NOT NULL,
  location_id UUID REFERENCES stores(id),
  notes TEXT,
  photos JSONB, -- Google Photos links
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 食事タグテーブル（階層構造）
CREATE TABLE food_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  parent_id UUID REFERENCES food_tags(id),
  color VARCHAR(7),
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 食事-タグ関連テーブル
CREATE TABLE food_record_tags (
  food_record_id UUID REFERENCES food_records(id) ON DELETE CASCADE,
  food_tag_id UUID REFERENCES food_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (food_record_id, food_tag_id)
);

-- レシート画像テーブル
CREATE TABLE receipt_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  image_url TEXT NOT NULL,
  ocr_text TEXT,
  extracted_data JSONB,
  expense_group_id UUID REFERENCES expense_groups(id),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 店舗位置情報テーブル
CREATE TABLE store_locations (
  store_id UUID PRIMARY KEY REFERENCES stores(id),
  google_place_id VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address TEXT,
  phone VARCHAR(20),
  business_hours JSONB,
  website TEXT,
  rating DECIMAL(3, 2),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- テンプレートテーブル
CREATE TABLE expense_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(200) NOT NULL,
  template_type VARCHAR(50), -- 'recurring', 'store', 'event'
  category_id UUID REFERENCES categories(id),
  payment_method_id UUID REFERENCES payment_methods(id),
  store_id UUID REFERENCES stores(id),
  default_amount DECIMAL(10,2),
  template_data JSONB,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📊 Phase 2完了基準

### 機能要件
- [ ] 食事記録の独立管理
- [ ] 階層タグシステム動作
- [ ] Google Photos連携
- [ ] レシートOCR処理
- [ ] 地図連携機能
- [ ] テンプレート機能
- [ ] 高度分析機能

### 品質要件
- [ ] 単体テストカバレッジ85%以上
- [ ] E2Eテスト全機能網羅
- [ ] パフォーマンススコア85以上
- [ ] モバイル完全対応

### セキュリティ要件
- [ ] 画像データの適切な暗号化
- [ ] API キーの安全な管理
- [ ] 位置情報の適切な取り扱い

## 📅 マイルストーン

### 2025年7月 (Phase 1.5)
- **第1週 (7/16-7/22)**: 食事管理ページ基盤
- **第2週 (7/23-7/29)**: 食事タグシステム
- **第3週 (7/30-8/5)**: お店データベース

### 2025年8月
- **第1週 (8/6-8/12)**: Google Photos連携
- **第2週 (8/13-8/19)**: レシートOCR実装
- **第3週 (8/20-8/26)**: 地図連携機能
- **第4週 (8/27-9/2)**: テンプレート機能

### 2025年9月
- **第1週 (9/3-9/9)**: 分析ダッシュボード
- **第2週 (9/10-9/16)**: 統合テスト
- **第3週 (9/17-9/23)**: パフォーマンス最適化
- **第4週 (9/24-9/30)**: 最終調整・完成

## 🎯 成功指標

### 定量的指標
- 食事記録利用率: 70%以上
- OCR精度: 85%以上（金額・店名）
- 地図機能利用率: 50%以上
- テンプレート利用率: 60%以上

### 定性的指標
- 「入力が楽になった」: 90%以上
- 「分析が役に立つ」: 80%以上
- 「他アプリより優秀」: 85%以上

---
最終更新: 2025-06-23  
フェーズ完了予定: 2025-09-30