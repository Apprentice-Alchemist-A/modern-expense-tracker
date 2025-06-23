// 共通型定義
export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
}

// ユーザー型
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

// カテゴリ型
export interface Category extends BaseEntity {
  name: string
  icon?: string
  color?: string
  display_order: number
  is_active: boolean
}

// 支払方法型
export interface PaymentMethod extends BaseEntity {
  name: string
  type: 'cash' | 'credit' | 'debit' | 'e-money' | 'bank_transfer' | 'other'
  icon?: string
  display_order: number
  is_active: boolean
}

// 支出明細型
export interface ExpenseItem {
  id?: string
  item_name: string
  amount: number
  note?: string
}

// 支出グループ型
export interface ExpenseGroup extends BaseEntity {
  user_id: string
  title: string
  category_id: string
  payment_method_id: string
  date: string
  total_amount: number
  memo?: string
  photo_urls: string[]
  
  // リレーション
  category?: Category
  payment_method?: PaymentMethod
  items?: ExpenseItem[]
  tags?: string[]
}

// フォームデータ型
export interface ExpenseFormData {
  title: string
  category_id: string
  payment_method_id: string
  date: string
  memo?: string
  items: ExpenseItem[]
  tags?: string[]
}

// クイック入力データ型
export interface QuickExpenseData {
  storeName: string
  amount: number
  category: string
  paymentMethod: string
  date: string
  note?: string
}

// 店舗型
export interface Store {
  id: string
  name: string
  category: string
  average_amount: number
  visit_count: number
  last_visit?: string
  is_favorite: boolean
  user_id: string
}

// 店舗テンプレート型
export interface StoreTemplate {
  id: string
  store_name: string
  category: string
  payment_method: string
  average_amount: number
  frequent_items: string[]
  icon?: string
  user_id: string
}

// 支出テンプレート型
export interface ExpenseTemplate {
  id: string
  name: string
  category: string
  payment_method: string
  items: ExpenseItem[]
  tags: string[]
  created_at: string
  usage_count: number
  user_id: string
}

// フィルター型
export interface ExpenseFilters {
  dateRange?: [Date, Date]
  categories?: string[]
  paymentMethods?: string[]
  tags?: string[]
  searchQuery?: string
  storeNames?: string[]
}

// 統計データ型
export interface ExpenseStats {
  totalAmount: number
  transactionCount: number
  averageAmount: number
  topCategory: string
  topPaymentMethod: string
}

// 月次統計型
export interface MonthlyStats {
  month: string
  totalAmount: number
  transactionCount: number
  categoryBreakdown: Record<string, number>
  paymentMethodBreakdown: Record<string, number>
  dailyAmounts: Record<string, number>
}

// チャートデータ型
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
  }[]
}

// 分析データ型
export interface AnalyticsData {
  monthlyTrend: ChartData
  categoryDistribution: ChartData
  dailySpending: ChartData
  paymentMethodUsage: ChartData
  stats: ExpenseStats
}

// API レスポンス型
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  hasMore: boolean
}

// UI状態型
export interface UIState {
  loading: boolean
  error?: string
  success?: string
}

// 設定型
export interface UserSettings {
  currency: string
  dateFormat: string
  defaultCategory?: string
  defaultPaymentMethod?: string
  notifications: {
    email: boolean
    push: boolean
  }
  privacy: {
    shareData: boolean
    analytics: boolean
  }
}