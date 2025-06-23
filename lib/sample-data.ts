// サンプル支出データ（フィルター・ソートテスト用に拡張）
export const sampleExpenses = [
  {
    id: '1',
    title: 'ランチ - 和食レストラン',
    expense_date: '2024-01-15',
    total_amount: 1200,
    categories: {
      name: '食事・飲み物',
      icon: 'food',
      color: '#ef4444'
    },
    payment_methods: {
      name: 'クレジットカード',
      icon: 'credit-card'
    },
    stores: {
      name: '和食処さくら'
    },
    notes: '同僚との会食'
  },
  {
    id: '2',
    title: '交通費 - 電車',
    expense_date: '2024-01-15',
    total_amount: 320,
    categories: {
      name: '交通費',
      icon: 'transport',
      color: '#3b82f6'
    },
    payment_methods: {
      name: 'ICカード',
      icon: 'IC'
    },
    notes: '渋谷→新宿 往復'
  },
  {
    id: '3',
    title: 'コンビニ - 朝食',
    expense_date: '2024-01-14',
    total_amount: 450,
    categories: {
      name: '食事・飲み物',
      icon: 'food',
      color: '#ef4444'
    },
    payment_methods: {
      name: '現金',
      icon: 'cash'
    },
    stores: {
      name: 'セブンイレブン'
    },
    notes: 'サンドイッチとコーヒー'
  },
  {
    id: '4',
    title: 'ガソリン代',
    expense_date: '2024-01-13',
    total_amount: 3500,
    categories: {
      name: '交通費',
      icon: 'transport',
      color: '#3b82f6'
    },
    payment_methods: {
      name: 'クレジットカード',
      icon: 'credit-card'
    },
    stores: {
      name: 'ENEOS'
    },
    notes: 'レギュラー30L'
  },
  {
    id: '5',
    title: '本購入 - 技術書',
    expense_date: '2024-01-12',
    total_amount: 2800,
    categories: {
      name: '教育・学習',
      icon: 'education',
      color: '#10b981'
    },
    payment_methods: {
      name: 'クレジットカード',
      icon: 'credit-card'
    },
    stores: {
      name: 'Amazon'
    },
    notes: 'React入門書'
  },
  {
    id: '6',
    title: '薬局 - 風邪薬',
    expense_date: '2024-01-11',
    total_amount: 980,
    categories: {
      name: '医療・健康',
      icon: 'medical',
      color: '#f59e0b'
    },
    payment_methods: {
      name: '現金',
      icon: 'cash'
    },
    stores: {
      name: 'マツモトキヨシ'
    },
    notes: '総合感冒薬とのど飴'
  },
  {
    id: '7',
    title: 'スターバックス - コーヒー',
    expense_date: '2024-01-16',
    total_amount: 530,
    categories: {
      name: '食事・飲み物',
      icon: 'food',
      color: '#ef4444'
    },
    payment_methods: {
      name: 'PayPay',
      icon: 'paypay'
    },
    stores: {
      name: 'スターバックス'
    },
    notes: 'ラテ トール'
  },
  {
    id: '8',
    title: '映画鑑賞',
    expense_date: '2024-01-10',
    total_amount: 1800,
    categories: {
      name: '娯楽・趣味',
      icon: 'entertainment',
      color: '#8b5cf6'
    },
    payment_methods: {
      name: 'クレジットカード',
      icon: 'credit-card'
    },
    stores: {
      name: 'TOHOシネマズ'
    },
    notes: '新作映画'
  },
  {
    id: '9',
    title: '電気代',
    expense_date: '2024-01-09',
    total_amount: 8500,
    categories: {
      name: '光熱費',
      icon: 'utilities',
      color: '#06b6d4'
    },
    payment_methods: {
      name: 'デビットカード',
      icon: 'debit-card'
    },
    stores: {
      name: '東京電力'
    },
    notes: '12月分電気料金'
  },
  {
    id: '10',
    title: 'ユニクロ - シャツ',
    expense_date: '2024-01-08',
    total_amount: 2990,
    categories: {
      name: '衣類・服飾',
      icon: 'clothing',
      color: '#84cc16'
    },
    payment_methods: {
      name: '楽天Pay',
      icon: 'rakuten-pay'
    },
    stores: {
      name: 'ユニクロ'
    },
    notes: 'ビジネスシャツ'
  },
  {
    id: '11',
    title: 'タクシー代',
    expense_date: '2024-01-17',
    total_amount: 1240,
    categories: {
      name: '交通費',
      icon: 'transport',
      color: '#3b82f6'
    },
    payment_methods: {
      name: '現金',
      icon: 'cash'
    },
    notes: '終電後の帰宅'
  },
  {
    id: '12',
    title: 'ドラッグストア',
    expense_date: '2024-01-07',
    total_amount: 1560,
    categories: {
      name: '日用品',
      icon: 'daily-goods',
      color: '#f97316'
    },
    payment_methods: {
      name: 'ICカード',
      icon: 'IC'
    },
    stores: {
      name: 'ココカラファイン'
    },
    notes: 'シャンプー、歯磨き粉'
  }
]