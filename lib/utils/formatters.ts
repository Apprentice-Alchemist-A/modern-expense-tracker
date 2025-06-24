/**
 * 共通フォーマット関数
 */

/**
 * 通貨フォーマット（カンマ区切り）
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(amount)
}

/**
 * 通貨フォーマット（コンパクト表記）
 */
export const formatCurrencyCompact = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    notation: 'compact'
  }).format(amount)
}

/**
 * 月表示フォーマット（YYYY-MM → M月）
 */
export const formatMonth = (monthStr: string | undefined | null): string => {
  if (!monthStr || typeof monthStr !== 'string') {
    return '不明'
  }
  
  const parts = monthStr.split('-')
  if (parts.length !== 2) {
    return monthStr
  }
  
  const [year, month] = parts
  return `${parseInt(month)}月`
}

/**
 * 日付の相対表示（今日、昨日、MM/DD）
 */
export const formatRelativeDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  // 今日・昨日の判定
  if (date.toDateString() === today.toDateString()) {
    return '今日'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨日'
  }
  
  // 今年の場合は年を省略
  if (date.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
  }
  
  return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * パーセンテージフォーマット
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}