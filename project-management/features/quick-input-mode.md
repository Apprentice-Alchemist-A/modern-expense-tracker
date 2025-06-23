# クイック入力モード - 機能設計書

## 📋 概要

**機能名**: クイック入力モード  
**優先度**: 🔴 Critical  
**推定工数**: 2週間  
**担当**: TBD  

### 目的
日常的な支出入力を劇的に高速化し、ユーザーが「面倒」と感じることなく継続的に記録できるようにする。

## 🎯 ユーザーストーリー

1. **毎日コンビニで買い物をする会社員として**、いつものパターンをワンタップで入力したい
2. **よく行くカフェの常連として**、店名を選ぶだけで支出を記録したい
3. **家計簿をつけ忘れがちな人として**、後からまとめて素早く入力したい

## 🚀 機能詳細

### 1. お店テンプレート機能

#### 1.1 テンプレート登録
```typescript
interface StoreTemplate {
  id: string
  name: string              // 店名
  category_id: string       // デフォルトカテゴリ
  payment_method_id: string // デフォルト支払方法
  average_amount?: number   // 平均支出額
  common_items?: string[]   // よく買う商品
  location?: {
    lat: number
    lng: number
    address: string
  }
  icon?: string            // 店舗アイコン
  color?: string           // テーマカラー
}
```

#### 1.2 UI/UX設計
- **クイック入力ボタン**: ヘッダーに常時表示
- **店舗選択画面**: 
  - お気に入り店舗をグリッド表示
  - 最近使った店舗を上部に表示
  - 検索バー付き
- **入力フロー**:
  1. クイック入力ボタンをタップ
  2. 店舗を選択（またはその他）
  3. 金額入力（テンキー表示）
  4. 必要に応じて詳細追加
  5. 保存

### 2. 履歴からの再利用

#### 2.1 スマート提案
```typescript
interface QuickSuggestion {
  type: 'recent' | 'frequent' | 'similar'
  expense: ExpenseGroup
  matchScore: number  // 0-100
  reason: string      // "昨日も同じ時間帯に利用"
}
```

#### 2.2 提案ロジック
- **時間帯マッチング**: 同じ時間帯の支出を優先
- **曜日マッチング**: 同じ曜日の支出を考慮
- **場所マッチング**: GPS情報から近い店舗を提案
- **パターン認識**: 定期的な支出を検出

### 3. ショートカット機能

#### 3.1 キーボードショートカット
- `Ctrl/Cmd + N`: 新規クイック入力
- `Ctrl/Cmd + R`: 最後の入力を再利用
- `1-9`: お気に入り店舗を数字で選択
- `Enter`: 確定
- `Esc`: キャンセル

#### 3.2 モバイルジェスチャー
- **長押し**: クイック入力メニュー表示
- **スワイプ**: 店舗切り替え
- **ダブルタップ**: 最後の入力を複製

#### 3.3 音声入力（実験的）
```typescript
interface VoiceCommand {
  pattern: RegExp
  action: (params: any) => void
  example: string
}

const voiceCommands: VoiceCommand[] = [
  {
    pattern: /^(.+)で(\d+)円$/,
    action: ({store, amount}) => createQuickExpense(store, amount),
    example: "セブンで500円"
  }
]
```

## 💾 データモデル

### 新規テーブル
```sql
-- お店テンプレート
CREATE TABLE store_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  category_id UUID REFERENCES categories(id),
  payment_method_id UUID REFERENCES payment_methods(id),
  average_amount DECIMAL(10,2),
  common_items JSONB,
  location JSONB,
  icon VARCHAR(50),
  color VARCHAR(7),
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- クイック入力履歴
CREATE TABLE quick_input_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  expense_group_id UUID REFERENCES expense_groups(id),
  store_template_id UUID REFERENCES store_templates(id),
  input_method VARCHAR(50), -- 'template', 'voice', 'history'
  input_duration_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 UI デザイン

### クイック入力モーダル
```
┌─────────────────────────────┐
│  💨 クイック入力            │
├─────────────────────────────┤
│ 🏪 お気に入り               │
│ ┌────┐ ┌────┐ ┌────┐     │
│ │ 🏪 │ │ ☕ │ │ 🍜 │     │
│ │ｾﾌﾞﾝ │ │ｽﾀﾊﾞ │ │吉野家│     │
│ └────┘ └────┘ └────┘     │
│                             │
│ 📝 最近の入力               │
│ ・セブン ¥540 (1時間前)     │
│ ・スタバ ¥650 (昨日)        │
│ ・吉野家 ¥490 (昨日)        │
│                             │
│ [その他の店舗を選択]         │
└─────────────────────────────┘
```

### 金額入力画面
```
┌─────────────────────────────┐
│  🏪 セブンイレブン           │
├─────────────────────────────┤
│                             │
│         ¥ 540               │
│                             │
│  ┌───┐ ┌───┐ ┌───┐       │
│  │ 7 │ │ 8 │ │ 9 │       │
│  ├───┤ ├───┤ ├───┤       │
│  │ 4 │ │ 5 │ │ 6 │       │
│  ├───┤ ├───┤ ├───┤       │
│  │ 1 │ │ 2 │ │ 3 │       │
│  ├───┴─┤ ├───┤ ├───┤     │
│  │  0  │ │ C │ │ ← │     │
│  └─────┘ └───┘ └───┘     │
│                             │
│ [詳細を追加] [保存]         │
└─────────────────────────────┘
```

## 🔧 実装計画

### Week 1: 基盤実装
- [ ] データモデル設計・実装
- [ ] API エンドポイント作成
- [ ] 基本UIコンポーネント作成

### Week 2: 機能実装
- [ ] テンプレート管理機能
- [ ] クイック入力フロー
- [ ] 履歴・提案機能
- [ ] テスト・最適化

## 📊 成功指標

### 定量的指標
- **入力時間**: 従来の50%以下（平均15秒→7秒）
- **利用率**: 全入力の60%以上がクイック入力経由
- **継続率**: クイック入力利用者の90%が1週間後も利用

### 定性的指標
- 「入力が楽になった」というフィードバック
- 「毎日続けられるようになった」という声
- 「もう他のアプリには戻れない」という評価

## 🚧 技術的考慮事項

### パフォーマンス
- 店舗データのキャッシュ戦略
- 提案アルゴリズムの最適化
- オフライン対応

### セキュリティ
- 位置情報の取り扱い
- 音声データの処理
- プライバシー設定

### 拡張性
- プラグイン構造で入力方法追加可能
- AIによる提案精度向上の余地
- 他機能との連携考慮

## 🔗 関連機能

- **お店データベース**: 店舗情報の詳細管理
- **タグシステム**: クイック入力時のタグ付け
- **分析ダッシュボード**: クイック入力の利用状況分析

---
最終更新: 2025-06-23  
ステータス: 📋 Planning