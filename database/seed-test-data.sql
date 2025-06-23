-- テストデータ投入SQL
-- ページネーション機能検証用の大量データ作成

-- まず現在の認証ユーザーIDを確認する必要があります
-- Supabaseダッシュボードでauth.usersテーブルから自分のuser_idを確認してください

-- 例: ユーザーIDが '12345678-1234-1234-1234-123456789012' の場合
-- 以下のSQLのuser_idを実際の値に置き換えて実行してください

DO $$
DECLARE
    user_uuid UUID := '12345678-1234-1234-1234-123456789012'; -- 実際のユーザーIDに置換
    category_ids UUID[];
    payment_method_ids UUID[];
    group_id UUID;
    i INTEGER;
    random_category UUID;
    random_payment UUID;
    random_date DATE;
    random_amount DECIMAL(10,2);
    item_count INTEGER;
    j INTEGER;
BEGIN
    -- カテゴリIDを取得
    SELECT ARRAY(SELECT id FROM categories ORDER BY display_order LIMIT 5) INTO category_ids;
    
    -- 支払方法IDを取得  
    SELECT ARRAY(SELECT id FROM payment_methods ORDER BY display_order LIMIT 5) INTO payment_method_ids;
    
    -- 100件のテストデータを作成
    FOR i IN 1..100 LOOP
        -- ランダムな値を生成
        random_category := category_ids[1 + (random() * (array_length(category_ids, 1) - 1))::INTEGER];
        random_payment := payment_method_ids[1 + (random() * (array_length(payment_method_ids, 1) - 1))::INTEGER];
        random_date := CURRENT_DATE - (random() * 365)::INTEGER;
        random_amount := (random() * 9000 + 1000)::DECIMAL(10,2); -- 1000-10000円
        item_count := 1 + (random() * 3)::INTEGER; -- 1-4個の項目
        
        -- 支出グループを作成
        INSERT INTO expense_groups (
            user_id, 
            title, 
            description,
            category_id, 
            payment_method_id, 
            expense_date, 
            total_amount, 
            notes
        ) VALUES (
            user_uuid,
            'テストデータ ' || i,
            'ページネーション検証用のテストデータです',
            random_category,
            random_payment,
            random_date,
            random_amount,
            'テスト用メモ ' || i
        ) RETURNING id INTO group_id;
        
        -- 各グループに項目を追加
        FOR j IN 1..item_count LOOP
            INSERT INTO expense_items (
                expense_group_id,
                name,
                amount,
                quantity,
                unit_price,
                notes,
                display_order
            ) VALUES (
                group_id,
                'テスト項目 ' || j,
                (random_amount / item_count)::DECIMAL(10,2),
                1,
                (random_amount / item_count)::DECIMAL(10,2),
                'テスト項目メモ ' || j,
                j - 1
            );
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'テストデータの作成が完了しました: % 件の支出グループを追加', 100;
END $$;

-- 作成されたデータの確認
SELECT 
    COUNT(*) as total_groups,
    MIN(expense_date) as earliest_date,
    MAX(expense_date) as latest_date,
    AVG(total_amount) as avg_amount
FROM expense_groups 
WHERE notes LIKE 'テスト用メモ%';

-- 支出項目の確認
SELECT COUNT(*) as total_items
FROM expense_items ei
JOIN expense_groups eg ON ei.expense_group_id = eg.id
WHERE eg.notes LIKE 'テスト用メモ%';