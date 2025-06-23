-- 新Supabaseプロジェクト動作確認用クエリ
-- 各テーブルが正しく作成されているかチェック

-- =====================================
-- テーブル作成確認
-- =====================================

-- 1. 全テーブル一覧表示
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- 2. カテゴリマスターの確認
SELECT COUNT(*) as category_count FROM categories;
SELECT name, icon, color FROM categories ORDER BY display_order LIMIT 5;

-- 3. 支払方法マスターの確認  
SELECT COUNT(*) as payment_method_count FROM payment_methods;
SELECT name, icon FROM payment_methods ORDER BY display_order LIMIT 5;

-- =====================================
-- RLS (Row Level Security) 確認
-- =====================================

-- 4. RLS有効状態確認
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- 5. RLSポリシー確認
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

-- =====================================
-- インデックス確認
-- =====================================

-- 6. 作成されたインデックス確認
SELECT 
    t.relname as table_name,
    i.relname as index_name,
    a.attname as column_name
FROM 
    pg_class t,
    pg_class i,
    pg_index ix,
    pg_attribute a
WHERE 
    t.oid = ix.indrelid
    and i.oid = ix.indexrelid
    and a.attrelid = t.oid
    and a.attnum = ANY(ix.indkey)
    and t.relkind = 'r'
    and t.relname IN ('expense_groups', 'expense_items', 'stores', 'tags', 'expense_tags')
ORDER BY t.relname, i.relname;

-- =====================================
-- ビュー確認
-- =====================================

-- 7. 作成されたビューの確認
SELECT 
    schemaname,
    viewname,
    viewowner
FROM pg_views 
WHERE schemaname = 'public'
ORDER BY viewname;

-- =====================================
-- ストアドプロシージャ確認
-- =====================================

-- 8. 作成された関数の確認
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_catalog.pg_get_function_result(p.oid) as return_type,
    pg_catalog.pg_get_function_arguments(p.oid) as arguments
FROM pg_catalog.pg_proc p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public' 
    AND p.proname IN ('create_expense_with_items', 'update_updated_at_column')
ORDER BY function_name;

-- =====================================
-- 権限確認（認証必須）
-- =====================================

-- 9. 現在のユーザー確認（認証後のテスト用）
-- SELECT auth.uid() as current_user_id;

-- 10. サンプルデータ挿入テスト（認証後のテスト用）
-- INSERT INTO tags (user_id, name, color) VALUES (auth.uid(), 'テストタグ', '#ff0000');
-- SELECT * FROM tags WHERE user_id = auth.uid();

-- =====================================
-- 期待される結果
-- =====================================

/*
1. テーブル一覧: 9個のテーブルが表示される
   - categories, payment_methods, stores, tags, templates
   - expense_groups, expense_items, expense_tags, template_tags

2. カテゴリ: 12個のカテゴリが登録される
   - 食費, 交通費, 娯楽費, 日用品, 医療費, 教育費, 光熱費, 通信費, 衣類, 美容・理容, 雑費, その他

3. 支払方法: 13個の支払方法が登録される
   - 現金, クレジットカード, デビットカード, ICカード, PayPay, 楽天Pay, LINE Pay, d払い, au PAY, メルペイ, Amazon Pay, 銀行振込, その他

4. RLS: 全テーブルでRLSが有効化される

5. インデックス: パフォーマンス用のインデックスが作成される

6. ビュー: 3個のビューが作成される
   - expense_summary, monthly_expense_summary, popular_stores

7. 関数: 2個の関数が作成される
   - create_expense_with_items, update_updated_at_column
*/