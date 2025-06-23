// デザイントークン - カテゴリカラーとアイコンの設定

export const CATEGORY_COLORS = {
  food: '#ff6b6b',        // 食費 - 温かい赤
  transport: '#4ecdc4',   // 交通費 - ターコイズ  
  entertainment: '#45b7d1', // 娯楽費 - スカイブルー
  daily: '#96ceb4',       // 日用品 - ミントグリーン
  medical: '#ffeaa7',     // 医療費 - 薄黄色
  education: '#dda0dd',   // 教育費 - 薄紫
  other: '#95a5a6'        // その他 - グレー
} as const

// アイコン使用設定 - SVGアイコンをデフォルトで使用
export const USE_SVG_ICONS = true

// カテゴリアイコン設定（フリー素材用）
export const CATEGORY_ICONS = {
  food: {
    emoji: '🍴',
    iconPath: '/icons/categories/food.svg',
    altText: '食費アイコン'
  },
  transport: {
    emoji: '🚇', 
    iconPath: '/icons/categories/transport.svg',
    altText: '交通費アイコン'
  },
  entertainment: {
    emoji: '🎮',
    iconPath: '/icons/categories/entertainment.svg', 
    altText: '娯楽費アイコン'
  },
  daily: {
    emoji: '🧴',
    iconPath: '/icons/categories/daily.svg',
    altText: '日用品アイコン'
  },
  medical: {
    emoji: '🏥',
    iconPath: '/icons/categories/medical.svg',
    altText: '医療費アイコン'
  },
  education: {
    emoji: '📚',
    iconPath: '/icons/categories/education.svg',
    altText: '教育費アイコン'
  },
  other: {
    emoji: '📝',
    iconPath: '/icons/categories/other.svg',
    altText: 'その他アイコン'
  }
} as const

// 支払方法アイコン設定
export const PAYMENT_METHOD_ICONS = {
  cash: {
    emoji: '💴',
    iconPath: '/icons/payments/cash.svg',
    altText: '現金アイコン'
  },
  credit: {
    emoji: '💳',
    iconPath: '/icons/payments/credit.svg', 
    altText: 'クレジットカードアイコン'
  },
  ic_card: {
    emoji: '💳',
    iconPath: '/icons/payments/IC.svg',
    altText: 'ICカードアイコン'
  },
  e_money: {
    emoji: '📱',
    iconPath: '/icons/payments/e-money.svg',
    altText: '電子マネーアイコン'
  },
  bank_transfer: {
    emoji: '🏦',
    iconPath: '/icons/payments/bank.svg',
    altText: '銀行振込アイコン'
  }
} as const

export type CategoryType = keyof typeof CATEGORY_COLORS
export type PaymentMethodType = keyof typeof PAYMENT_METHOD_ICONS