# 食事管理システム - 機能設計書

## 📋 概要

**機能名**: 食事管理システム  
**優先度**: 🔴 Critical  
**推定工数**: 3週間  
**実装予定**: Phase 1.5 (2025年7月16日〜)

### 目的
家計簿の支出管理とは独立した食事記録システムを構築し、食生活の記録・分析・改善をサポートする。

## 🎯 ユーザーストーリー

1. **料理好きな人として**、作った料理や食べた料理を記録して振り返りたい
2. **健康管理をする人として**、外食・自炊のバランスを可視化したい
3. **グルメな人として**、美味しかった店や料理をタグ付けして整理したい
4. **家計管理する人として**、支出とは別に純粋な食事記録をつけたい

## 🚀 機能詳細

### 1. 食事記録機能

#### 1.1 基本記録項目
```typescript
interface FoodRecord {
  id: string
  user_id: string
  title: string              // 料理名・店名
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  eaten_at: Date            // 食事時刻
  location?: {              // 食事場所
    type: 'home' | 'restaurant' | 'other'
    store_id?: string       // 店舗ID（外食の場合）
    address?: string        // 住所
  }
  tags: string[]            // 食事タグ
  photos: string[]          // 写真URL配列
  notes?: string            // メモ
  rating?: number           // 評価（1-5）
  nutrition?: {             // 栄養情報（将来拡張）
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
  expense_link?: string     // 関連する支出記録ID
}
```

#### 1.2 記録方法
- **クイック記録**: 写真＋タグのみで簡単記録
- **詳細記録**: 全項目入力による詳細記録
- **写真からの記録**: Google Photos連携で自動入力

### 2. 階層タグシステム

#### 2.1 タグ階層構造
```typescript
interface FoodTag {
  id: string
  user_id: string
  name: string              // タグ名
  parent_id?: string        // 親タグID
  level: number             // 階層レベル（0=ルート）
  color: string             // タグカラー
  icon?: string             // アイコン
  description?: string      // 説明
  usage_count: number       // 使用回数
  created_at: Date
}
```

#### 2.2 プリセットタグ構造
```
🍜 和食
├── 🍣 寿司
├── 🍜 ラーメン
│   ├── 醤油ラーメン
│   ├── 味噌ラーメン
│   └── 塩ラーメン
├── 🍱 丼物
│   ├── 牛丼
│   ├── 親子丼
│   └── カツ丼
└── 🍙 その他和食

🍕 洋食
├── 🇮🇹 イタリアン
│   ├── 🍝 パスタ
│   │   ├── カルボナーラ
│   │   ├── ペペロンチーノ
│   │   └── ボロネーゼ
│   ├── 🍕 ピザ
│   └── 🥗 サラダ
├── 🇫🇷 フレンチ
└── 🍔 ファストフード

🥘 中華
├── 🥟 点心
├── 🍛 炒め物
└── 🍲 スープ

🥩 肉料理
├── 🥩 ステーキ
├── 🍖 焼肉
└── 🐔 チキン

🐟 魚料理
├── 🍤 刺身
├── 🦐 海鮮
└── 🐟 焼き魚

🥬 ベジタリアン
├── 🥗 サラダ
├── 🥕 野菜料理
└── 🥜 豆類

🍰 デザート
├── 🍰 ケーキ
├── 🍦 アイス
└── 🍪 クッキー

☕ ドリンク
├── ☕ コーヒー
├── 🍵 お茶
└── 🥤 ソフトドリンク
```

#### 2.3 タグ機能
- **階層表示**: ツリー構造での表示
- **多重選択**: 複数タグの同時選択
- **検索機能**: タグ名での部分一致検索
- **使用頻度**: よく使うタグの優先表示
- **カスタムタグ**: ユーザー独自タグの作成
- **タグ統計**: 使用回数・傾向の分析

### 3. 食事専用ページUI

#### 3.1 メイン画面
```
┌─────────────────────────────────────┐
│  🍽️ 食事記録              📅 今日  │
├─────────────────────────────────────┤
│ [📸 写真で記録] [✏️ 詳細記録]      │
├─────────────────────────────────────┤
│ 📊 今週の食事パターン                │
│ ┌─────┬─────┬─────┬─────┐      │
│ │朝食 │昼食 │夕食 │間食 │      │
│ │ 5/7 │ 6/7 │ 7/7 │ 3/7 │      │
│ └─────┴─────┴─────┴─────┘      │
│                                     │
│ 🏷️ よく使うタグ                     │
│ [和食] [ラーメン] [コーヒー] [+]    │
│                                     │
│ 📝 最近の食事記録                   │
│ ┌─────────────────────────────┐  │
│ │ 🍜 味噌ラーメン                 │  │
│ │ 📍 麺屋さくら | 12:30 | ⭐⭐⭐⭐⭐ │  │
│ │ 🏷️ ラーメン, 味噌, 昼食        │  │
│ └─────────────────────────────┘  │
│ ┌─────────────────────────────┐  │
│ │ ☕ ブルーマウンテン              │  │
│ │ 📍 自宅 | 09:15 | ⭐⭐⭐⭐     │  │
│ │ 🏷️ コーヒー, 朝食              │  │
│ └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### 3.2 記録フォーム
```
┌─────────────────────────────────────┐
│  📝 食事記録                         │
├─────────────────────────────────────┤
│ 📸 写真 (最大5枚)                   │
│ ┌────┐ ┌────┐ ┌────┐ [+]      │
│ │    │ │    │ │    │           │
│ └────┘ └────┘ └────┘           │
│                                     │
│ 🍽️ 料理名                          │
│ [________________________]          │
│                                     │
│ 🕐 食事時間                         │
│ [📅 2025/06/23] [⏰ 12:30]        │
│                                     │
│ 🍽️ 食事タイプ                      │
│ ○朝食 ●昼食 ○夕食 ○間食           │
│                                     │
│ 📍 場所                             │
│ ○自宅 ○外食 ○その他               │
│ [お店を選択 ▼]                     │
│                                     │
│ 🏷️ タグ                            │
│ [和食] [ラーメン] [×] [+タグ追加]  │
│                                     │
│ ⭐ 評価                              │
│ ☆☆☆☆☆                           │
│                                     │
│ 📝 メモ                             │
│ [________________________]          │
│                                     │
│ [💾 保存] [🔗 支出と連携] [キャンセル] │
└─────────────────────────────────────┘
```

#### 3.3 カレンダービュー
```
┌─────────────────────────────────────┐
│  📅 2025年6月                      │
├─────────────────────────────────────┤
│  日  月  火  水  木  金  土         │
│                     1   2   3      │
│  4   5   6   7   8   9   10        │
│ 11  12  13  14  15  16  17        │
│ 18  19  20  21  22  23  24        │
│     🍜  ☕      🍣  🍰             │
│ 25  26  27  28  29  30            │
│                                     │
│ 📊 6月の食事統計                   │
│ ┌─────────────────────────────┐  │
│ │ 🍜 和食: 45% │ 🍕 洋食: 30%  │  │
│ │ 🥘 中華: 15% │ 🍰 その他: 10% │  │
│ └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 4. 検索・フィルター機能

#### 4.1 検索機能
- **テキスト検索**: 料理名・店名・メモでの検索
- **タグ検索**: 単一・複数タグでの絞り込み
- **日付範囲**: 期間指定での検索
- **食事タイプ**: 朝食・昼食・夕食・間食での絞り込み
- **評価**: 星評価での絞り込み
- **場所**: 自宅・外食・特定店舗での絞り込み

#### 4.2 ソート機能
- 日時順（新しい順・古い順）
- 評価順（高評価順・低評価順）
- タグ使用頻度順
- 店舗別グループ化

### 5. 分析・統計機能

#### 5.1 基本統計
- 食事回数（日・週・月別）
- 食事タイプ別割合
- タグ別分布
- 評価平均
- 自宅vs外食比率

#### 5.2 トレンド分析
- 食事パターンの変化
- 好みの傾向分析
- 季節性の分析
- 健康度スコア（将来）

## 💾 データベース設計

### 食事記録テーブル
```sql
CREATE TABLE food_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  eaten_at TIMESTAMP WITH TIME ZONE NOT NULL,
  location_type VARCHAR(20) CHECK (location_type IN ('home', 'restaurant', 'other')),
  store_id UUID REFERENCES stores(id),
  location_address TEXT,
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  photos JSONB DEFAULT '[]',
  nutrition_data JSONB,
  expense_group_id UUID REFERENCES expense_groups(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_food_records_user_id ON food_records(user_id);
CREATE INDEX idx_food_records_eaten_at ON food_records(eaten_at);
CREATE INDEX idx_food_records_meal_type ON food_records(meal_type);
```

### 食事タグテーブル
```sql
CREATE TABLE food_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  parent_id UUID REFERENCES food_tags(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 0,
  color VARCHAR(7) DEFAULT '#6b7280',
  icon VARCHAR(50),
  description TEXT,
  usage_count INTEGER DEFAULT 0,
  is_system_tag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, name, parent_id)
);

CREATE INDEX idx_food_tags_user_id ON food_tags(user_id);
CREATE INDEX idx_food_tags_parent_id ON food_tags(parent_id);
```

### 食事-タグ関連テーブル
```sql
CREATE TABLE food_record_tags (
  food_record_id UUID REFERENCES food_records(id) ON DELETE CASCADE,
  food_tag_id UUID REFERENCES food_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (food_record_id, food_tag_id)
);
```

## 🔧 実装計画

### Week 1: データベース・API実装
- [ ] データベーススキーマ実装
- [ ] 基本API エンドポイント作成
- [ ] タグ階層管理機能
- [ ] システムタグの初期データ投入

### Week 2: UI実装
- [ ] 食事記録ページレイアウト
- [ ] 記録フォームコンポーネント
- [ ] タグ選択コンポーネント
- [ ] カレンダービューコンポーネント

### Week 3: 高度機能・統合
- [ ] 検索・フィルター機能
- [ ] 写真アップロード機能
- [ ] 統計・分析機能
- [ ] 支出記録との連携

## 📊 成功指標

### 定量的指標
- **記録頻度**: 日平均1.5回以上の食事記録
- **タグ利用率**: 記録の80%以上でタグ使用
- **継続率**: 1ヶ月後も50%以上が継続利用
- **写真利用率**: 記録の60%以上で写真添付

### 定性的指標
- 「食事記録が楽しくなった」
- 「食生活を振り返りやすくなった」
- 「健康管理に役立っている」

## 🔗 関連機能

- **Google Photos連携**: 写真の自動選択
- **お店データベース**: 外食記録の詳細管理
- **支出管理**: 食事代との連携
- **テンプレート機能**: よく食べるものの登録

## 🎨 デザインガイドライン

### カラーパレット
- **メインカラー**: 温かみのあるオレンジ系
- **アクセント**: 食欲をそそる赤・緑系
- **ニュートラル**: 清潔感のあるグレー系

### アイコン
- 食事関連の豊富なアイコンセット
- 文化・ジャンル別の識別しやすいアイコン
- 統一感のあるスタイル

---
最終更新: 2025-06-23  
ステータス: 📋 Planning