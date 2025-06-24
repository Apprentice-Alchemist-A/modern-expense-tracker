/**
 * ダッシュボード関連の定数とスタイル設定
 */
import { PeriodConfig } from '@/types/dashboard'

// 期間選択オプション
export const PERIOD_OPTIONS: PeriodConfig[] = [
  { value: 3, label: '3ヶ月' },
  { value: 6, label: '6ヶ月' },
  { value: 12, label: '12ヶ月' }
]

// チャート共通設定
export const CHART_CONFIG = {
  colors: {
    primary: '#4f46e5',
    primaryLight: '#6366f1',
    secondary: '#9ca3af',
    background: '#f8fafc',
    text: '#374151',
    textLight: '#6b7280',
    grid: '#e5e7eb'
  },
  
  // グラデーション設定
  gradients: {
    primary: {
      id: 'colorAmount',
      stops: [
        { offset: '5%', color: '#4f46e5', opacity: 0.1 },
        { offset: '95%', color: '#4f46e5', opacity: 0 }
      ]
    }
  },
  
  // ドット設定
  dots: {
    normal: { 
      fill: '#4f46e5', 
      strokeWidth: 2, 
      r: 4 
    },
    active: { 
      r: 6, 
      stroke: '#4f46e5', 
      strokeWidth: 2, 
      fill: '#ffffff' 
    }
  },
  
  // 線の設定
  lines: {
    trend: {
      stroke: '#4f46e5',
      strokeWidth: 2
    },
    average: {
      stroke: '#9ca3af',
      strokeDasharray: '5 5',
      strokeWidth: 1
    }
  }
}

// レスポンシブ設定
export const RESPONSIVE_CONFIG = {
  chart: {
    height: 300,
    heightMobile: 250
  },
  
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024
  }
}

// アニメーション設定
export const ANIMATION_CONFIG = {
  duration: 500,
  easing: 'ease-out'
}

// デフォルト値
export const DEFAULTS = {
  period: 6 as const,
  recentExpensesLimit: 10,
  topCategoriesLimit: 5,
  chartHeight: 300
}