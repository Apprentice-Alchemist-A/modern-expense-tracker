/**
 * ダッシュボード関連の型定義
 */

// 基本的なチャートデータ型
export interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

// 月次推移データ
export interface TrendData {
  month: string
  amount: number
}

// カテゴリ別データ
export interface CategoryData {
  categoryId: string
  categoryName: string
  categoryIcon: string
  categoryColor: string
  amount: number
  percentage: number
}

// 最近の支出データ
export interface RecentExpense {
  id: string
  title: string
  date: string
  amount: number
  categoryName: string
  categoryIcon: string
  categoryColor: string
}

// トップカテゴリデータ
export interface TopCategory {
  categoryName: string
  categoryIcon: string
  categoryColor: string
  amount: number
  count: number
}

// ダッシュボード総合データ
export interface DashboardData {
  monthlyTotal: number
  monthlyChange: number
  categoryBreakdown: CategoryData[]
  monthlyTrend: TrendData[]
  recentExpenses: RecentExpense[]
  topCategories: TopCategory[]
}

// コンポーネント共通Props
export interface DashboardComponentProps {
  isLoading?: boolean
  className?: string
}

// 期間選択オプション
export type PeriodOption = 3 | 6 | 12

export interface PeriodConfig {
  value: PeriodOption
  label: string
}