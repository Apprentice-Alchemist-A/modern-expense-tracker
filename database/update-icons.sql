-- アイコンを絵文字からSVGファイル名に更新

-- カテゴリアイコンの更新
UPDATE categories SET icon = 'food' WHERE name = '食費';
UPDATE categories SET icon = 'transport' WHERE name = '交通費';
UPDATE categories SET icon = 'entertainment' WHERE name = '娯楽費';
UPDATE categories SET icon = 'daily-goods' WHERE name = '日用品';
UPDATE categories SET icon = 'medical' WHERE name = '医療費';
UPDATE categories SET icon = 'education' WHERE name = '教育費';
UPDATE categories SET icon = 'utilities' WHERE name = '光熱費';
UPDATE categories SET icon = 'communication' WHERE name = '通信費';
UPDATE categories SET icon = 'clothing' WHERE name = '衣類';
UPDATE categories SET icon = 'beauty' WHERE name = '美容・理容';
UPDATE categories SET icon = 'miscellaneous' WHERE name = '雑費';
UPDATE categories SET icon = 'others' WHERE name = 'その他';

-- 支払方法アイコンの更新
UPDATE payment_methods SET icon = 'cash' WHERE name = '現金';
UPDATE payment_methods SET icon = 'credit-card' WHERE name = 'クレジットカード';
UPDATE payment_methods SET icon = 'debit-card' WHERE name = 'デビットカード';
UPDATE payment_methods SET icon = 'IC' WHERE name = 'ICカード';
UPDATE payment_methods SET icon = 'paypay' WHERE name = 'PayPay';
UPDATE payment_methods SET icon = 'rakuten-pay' WHERE name = '楽天Pay';
UPDATE payment_methods SET icon = 'line-pay' WHERE name = 'LINE Pay';
UPDATE payment_methods SET icon = 'd-barai' WHERE name = 'd払い';
UPDATE payment_methods SET icon = 'au-pay' WHERE name = 'au PAY';
UPDATE payment_methods SET icon = 'merpay' WHERE name = 'メルペイ';
UPDATE payment_methods SET icon = 'amazon-pay' WHERE name = 'Amazon Pay';
UPDATE payment_methods SET icon = 'bank' WHERE name = '銀行振込';
UPDATE payment_methods SET icon = 'payment-others' WHERE name = 'その他';