-- 経費・食事管理アプリ マスターデータ
-- 初期データ投入用SQL

-- =====================================
-- カテゴリマスター
-- =====================================

INSERT INTO categories (name, icon, color, display_order) VALUES
('食費', '🍽️', '#ff6b6b', 1),
('交通費', '🚃', '#4ecdc4', 2),
('娯楽費', '🎮', '#45b7d1', 3),
('日用品', '🧴', '#96ceb4', 4),
('医療費', '🏥', '#ffeaa7', 5),
('教育費', '📚', '#dda0dd', 6),
('光熱費', '💡', '#f39c12', 7),
('通信費', '📱', '#3498db', 8),
('衣類', '👕', '#e74c3c', 9),
('美容・理容', '💄', '#ff69b4', 10),
('雑費', '📋', '#95a5a6', 11),
('その他', '🏷️', '#6b7280', 99);

-- =====================================
-- 支払方法マスター
-- =====================================

INSERT INTO payment_methods (name, icon, display_order) VALUES
('現金', '💵', 1),
('クレジットカード', '💳', 2),
('デビットカード', '💳', 3),
('ICカード', '📱', 4),
('PayPay', '📱', 5),
('楽天Pay', '📱', 6),
('LINE Pay', '📱', 7),
('d払い', '📱', 8),
('au PAY', '📱', 9),
('メルペイ', '📱', 10),
('Amazon Pay', '📱', 11),
('銀行振込', '🏦', 12),
('その他', '💸', 99);

-- =====================================
-- サンプルお店データ（開発用）
-- =====================================

-- Note: 実際のuser_idは認証後に設定する必要があります
-- これはスキーマの確認用サンプルです

/*
-- お店データのサンプル（実際の使用時はアプリケーションから登録）
INSERT INTO stores (user_id, name, category_id, address, notes) VALUES
('00000000-0000-0000-0000-000000000000', 'セブンイレブン 〇〇店', (SELECT id FROM categories WHERE name = '日用品'), '東京都渋谷区〇〇', 'よく利用するコンビニ'),
('00000000-0000-0000-0000-000000000000', 'スターバックス 〇〇店', (SELECT id FROM categories WHERE name = '食費'), '東京都新宿区〇〇', 'お気に入りのカフェ'),
('00000000-0000-0000-0000-000000000000', 'ファミリーマート 〇〇店', (SELECT id FROM categories WHERE name = '食費'), '東京都品川区〇〇', '会社近くのコンビニ');
*/

-- =====================================
-- 開発用ビューの作成
-- =====================================

-- 支出サマリービュー
CREATE OR REPLACE VIEW expense_summary AS
SELECT 
    eg.id,
    eg.title,
    eg.expense_date,
    eg.total_amount,
    c.name as category_name,
    c.icon as category_icon,
    c.color as category_color,
    pm.name as payment_method_name,
    pm.icon as payment_method_icon,
    s.name as store_name,
    eg.user_id,
    array_agg(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as tags
FROM expense_groups eg
LEFT JOIN categories c ON eg.category_id = c.id
LEFT JOIN payment_methods pm ON eg.payment_method_id = pm.id
LEFT JOIN stores s ON eg.store_id = s.id
LEFT JOIN expense_tags et ON eg.id = et.expense_group_id
LEFT JOIN tags t ON et.tag_id = t.id
GROUP BY eg.id, c.name, c.icon, c.color, pm.name, pm.icon, s.name;

-- 月次集計ビュー
CREATE OR REPLACE VIEW monthly_expense_summary AS
SELECT 
    eg.user_id,
    DATE_TRUNC('month', eg.expense_date) as month,
    c.name as category_name,
    c.color as category_color,
    COUNT(*) as transaction_count,
    SUM(eg.total_amount) as total_amount,
    AVG(eg.total_amount) as avg_amount
FROM expense_groups eg
LEFT JOIN categories c ON eg.category_id = c.id
GROUP BY eg.user_id, DATE_TRUNC('month', eg.expense_date), c.name, c.color
ORDER BY month DESC, total_amount DESC;

-- よく使うお店ランキングビュー
CREATE OR REPLACE VIEW popular_stores AS
SELECT 
    s.user_id,
    s.id as store_id,
    s.name as store_name,
    c.name as category_name,
    COUNT(eg.id) as usage_count,
    SUM(eg.total_amount) as total_spent,
    AVG(eg.total_amount) as avg_amount,
    MAX(eg.expense_date) as last_visit_date
FROM stores s
LEFT JOIN expense_groups eg ON s.id = eg.store_id
LEFT JOIN categories c ON s.category_id = c.id
GROUP BY s.user_id, s.id, s.name, c.name
HAVING COUNT(eg.id) > 0
ORDER BY usage_count DESC, total_spent DESC;

-- =====================================
-- 権限設定（ビュー用）
-- =====================================

-- ビューのRLS設定
ALTER VIEW expense_summary SET (security_barrier = true);
ALTER VIEW monthly_expense_summary SET (security_barrier = true);
ALTER VIEW popular_stores SET (security_barrier = true);

-- ビューに対するポリシー（実際にはビューは元テーブルのRLSを継承）
-- これらのビューは既存のテーブルのRLSポリシーによって保護されます