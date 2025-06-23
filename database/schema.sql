-- 経費・食事管理アプリ データベーススキーマ
-- 新機能対応版（お店データベース、タグ機能、テンプレート機能）

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================
-- マスターテーブル
-- =====================================

-- カテゴリマスター
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(100) NOT NULL DEFAULT '🏷️',
    color VARCHAR(7) NOT NULL DEFAULT '#6b7280', -- HEX color
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 支払方法マスター
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(100) NOT NULL DEFAULT '💳',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- お店マスター（新機能）
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES categories(id),
    address TEXT,
    phone VARCHAR(20),
    website_url TEXT,
    notes TEXT,
    visit_count INTEGER NOT NULL DEFAULT 0,
    last_visited_at TIMESTAMP WITH TIME ZONE,
    is_favorite BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- タグマスター（新機能）
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#6b7280',
    usage_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, name)
);

-- テンプレートマスター（新機能）
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    payment_method_id UUID REFERENCES payment_methods(id),
    store_id UUID REFERENCES stores(id),
    default_amount DECIMAL(10,2),
    usage_count INTEGER NOT NULL DEFAULT 0,
    is_favorite BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================
-- メインデータテーブル
-- =====================================

-- 支出グループ（親テーブル）
CREATE TABLE expense_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_id UUID NOT NULL REFERENCES categories(id),
    payment_method_id UUID NOT NULL REFERENCES payment_methods(id),
    store_id UUID REFERENCES stores(id),
    template_id UUID REFERENCES templates(id),
    expense_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    notes TEXT,
    receipt_url TEXT, -- 画像URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 支出明細（子テーブル）
CREATE TABLE expense_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_group_id UUID NOT NULL REFERENCES expense_groups(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================
-- 関連テーブル
-- =====================================

-- 支出-タグ関連テーブル
CREATE TABLE expense_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_group_id UUID NOT NULL REFERENCES expense_groups(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(expense_group_id, tag_id)
);

-- テンプレート-タグ関連テーブル
CREATE TABLE template_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(template_id, tag_id)
);

-- =====================================
-- インデックス作成
-- =====================================

-- パフォーマンス向上のためのインデックス
CREATE INDEX idx_expense_groups_user_id ON expense_groups(user_id);
CREATE INDEX idx_expense_groups_expense_date ON expense_groups(expense_date);
CREATE INDEX idx_expense_groups_category_id ON expense_groups(category_id);
CREATE INDEX idx_expense_groups_store_id ON expense_groups(store_id);

CREATE INDEX idx_expense_items_expense_group_id ON expense_items(expense_group_id);
CREATE INDEX idx_expense_tags_expense_group_id ON expense_tags(expense_group_id);
CREATE INDEX idx_expense_tags_tag_id ON expense_tags(tag_id);

CREATE INDEX idx_stores_user_id ON stores(user_id);
CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_templates_user_id ON templates(user_id);

-- =====================================
-- Row Level Security (RLS) 設定
-- =====================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_tags ENABLE ROW LEVEL SECURITY;

-- マスターテーブル（全ユーザー読み取り可能）
CREATE POLICY "Allow read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow read access to payment_methods" ON payment_methods FOR SELECT USING (true);

-- ユーザー固有データ（自分のデータのみアクセス可能）
CREATE POLICY "Users can manage their own stores" ON stores FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own tags" ON tags FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own templates" ON templates FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own expense_groups" ON expense_groups FOR ALL USING (auth.uid() = user_id);

-- 支出明細（親テーブルの権限を継承）
CREATE POLICY "Users can manage expense_items through expense_groups" ON expense_items FOR ALL 
USING (EXISTS(SELECT 1 FROM expense_groups WHERE expense_groups.id = expense_items.expense_group_id AND expense_groups.user_id = auth.uid()));

-- 関連テーブル
CREATE POLICY "Users can manage expense_tags through expense_groups" ON expense_tags FOR ALL 
USING (EXISTS(SELECT 1 FROM expense_groups WHERE expense_groups.id = expense_tags.expense_group_id AND expense_groups.user_id = auth.uid()));

CREATE POLICY "Users can manage template_tags through templates" ON template_tags FOR ALL 
USING (EXISTS(SELECT 1 FROM templates WHERE templates.id = template_tags.template_id AND templates.user_id = auth.uid()));

-- =====================================
-- トリガー関数
-- =====================================

-- updated_at自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_atトリガー設定
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_methods_updated_at BEFORE UPDATE ON payment_methods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expense_groups_updated_at BEFORE UPDATE ON expense_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expense_items_updated_at BEFORE UPDATE ON expense_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================
-- ストアドプロシージャ
-- =====================================

-- 支出グループと明細を同時に作成する関数
CREATE OR REPLACE FUNCTION create_expense_with_items(
    p_expense_group JSONB,
    p_expense_items JSONB[]
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    expense_group_id UUID;
    item JSONB;
    total_amount DECIMAL(10,2) := 0;
BEGIN
    -- 合計金額を計算
    FOREACH item IN ARRAY p_expense_items
    LOOP
        total_amount := total_amount + (item->>'amount')::DECIMAL(10,2);
    END LOOP;
    
    -- 支出グループを作成
    INSERT INTO expense_groups (
        user_id, title, description, category_id, payment_method_id, 
        store_id, template_id, expense_date, total_amount, notes, receipt_url
    ) VALUES (
        auth.uid(),
        p_expense_group->>'title',
        p_expense_group->>'description',
        (p_expense_group->>'category_id')::UUID,
        (p_expense_group->>'payment_method_id')::UUID,
        (p_expense_group->>'store_id')::UUID,
        (p_expense_group->>'template_id')::UUID,
        (p_expense_group->>'expense_date')::DATE,
        total_amount,
        p_expense_group->>'notes',
        p_expense_group->>'receipt_url'
    ) RETURNING id INTO expense_group_id;
    
    -- 支出明細を作成
    FOREACH item IN ARRAY p_expense_items
    LOOP
        INSERT INTO expense_items (
            expense_group_id, name, amount, quantity, unit_price, notes, display_order
        ) VALUES (
            expense_group_id,
            item->>'name',
            (item->>'amount')::DECIMAL(10,2),
            COALESCE((item->>'quantity')::INTEGER, 1),
            (item->>'unit_price')::DECIMAL(10,2),
            item->>'notes',
            COALESCE((item->>'display_order')::INTEGER, 0)
        );
    END LOOP;
    
    RETURN expense_group_id;
END;
$$;