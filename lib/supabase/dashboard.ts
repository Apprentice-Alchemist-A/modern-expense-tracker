import { getSupabaseClient } from './browser-client'
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'
import { TrendData } from '@/types/dashboard'

export interface DashboardData {
  monthlyTotal: number
  monthlyChange: number // 前月比
  categoryBreakdown: Array<{
    categoryId: string
    categoryName: string
    categoryIcon: string
    categoryColor: string
    amount: number
    percentage: number
  }>
  monthlyTrend: Array<{
    month: string
    amount: number
  }>
  recentExpenses: Array<{
    id: string
    title: string
    date: string
    amount: number
    categoryName: string
    categoryIcon: string
    categoryColor: string
  }>
  topCategories: Array<{
    categoryName: string
    categoryIcon: string
    categoryColor: string
    amount: number
    count: number
  }>
}

export class DashboardService {
  private supabase = getSupabaseClient()
  
  /**
   * 推移データのみを取得（期間変更用）
   */
  async getTrendData(months: number): Promise<TrendData[]> {
    return this.getMonthlyTrend(months)
  }

  /**
   * ダッシュボードデータを取得
   */
  async getDashboardData(trendMonths: number = 6): Promise<DashboardData> {
    const now = new Date()
    const currentMonthStart = startOfMonth(now)
    const currentMonthEnd = endOfMonth(now)
    const lastMonthStart = startOfMonth(subMonths(now, 1))
    const lastMonthEnd = endOfMonth(subMonths(now, 1))
    
    // 並列でデータを取得
    const [
      currentMonthData,
      lastMonthData,
      categoryBreakdown,
      monthlyTrend,
      recentExpenses,
      topCategories
    ] = await Promise.all([
      this.getMonthlyTotal(currentMonthStart, currentMonthEnd),
      this.getMonthlyTotal(lastMonthStart, lastMonthEnd),
      this.getCategoryBreakdown(currentMonthStart, currentMonthEnd),
      this.getMonthlyTrend(trendMonths), // 指定された期間
      this.getRecentExpenses(10), // 最新10件
      this.getTopCategories(currentMonthStart, currentMonthEnd, 5) // トップ5
    ])
    
    // 前月比を計算
    const monthlyChange = lastMonthData > 0 
      ? ((currentMonthData - lastMonthData) / lastMonthData) * 100 
      : 0
    
    return {
      monthlyTotal: currentMonthData,
      monthlyChange,
      categoryBreakdown,
      monthlyTrend,
      recentExpenses,
      topCategories
    }
  }
  
  /**
   * 月間合計金額を取得
   */
  private async getMonthlyTotal(startDate: Date, endDate: Date): Promise<number> {
    const { data, error } = await this.supabase
      .from('expense_groups')
      .select('total_amount')
      .gte('expense_date', format(startDate, 'yyyy-MM-dd'))
      .lte('expense_date', format(endDate, 'yyyy-MM-dd'))
    
    if (error) {
      console.error('Error fetching monthly total:', error)
      return 0
    }
    
    return data.reduce((sum, expense) => sum + (expense.total_amount || 0), 0)
  }
  
  /**
   * カテゴリ別内訳を取得
   */
  private async getCategoryBreakdown(startDate: Date, endDate: Date) {
    const { data, error } = await this.supabase
      .from('expense_groups')
      .select(`
        category_id,
        total_amount,
        categories (
          id,
          name,
          icon,
          color
        )
      `)
      .gte('expense_date', format(startDate, 'yyyy-MM-dd'))
      .lte('expense_date', format(endDate, 'yyyy-MM-dd'))
    
    if (error) {
      console.error('Error fetching category breakdown:', error)
      return []
    }
    
    // カテゴリ別に集計
    const categoryMap = new Map<string, any>()
    let totalAmount = 0
    
    data.forEach(expense => {
      const categoryId = expense.category_id
      const amount = expense.total_amount || 0
      totalAmount += amount
      
      if (categoryMap.has(categoryId)) {
        categoryMap.get(categoryId).amount += amount
      } else {
        const categories = Array.isArray(expense.categories) ? expense.categories[0] : expense.categories
        categoryMap.set(categoryId, {
          categoryId,
          categoryName: categories?.name || 'その他',
          categoryIcon: categories?.icon || 'help',
          categoryColor: categories?.color || '#6b7280',
          amount
        })
      }
    })
    
    // パーセンテージを計算してソート
    return Array.from(categoryMap.values())
      .map(category => ({
        ...category,
        percentage: totalAmount > 0 ? (category.amount / totalAmount) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount)
  }
  
  /**
   * 月次推移を取得
   */
  private async getMonthlyTrend(months: number) {
    const trends = []
    const now = new Date()
    
    for (let i = months - 1; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i))
      const monthEnd = endOfMonth(subMonths(now, i))
      const total = await this.getMonthlyTotal(monthStart, monthEnd)
      
      trends.push({
        month: format(monthStart, 'yyyy-MM'),
        amount: total
      })
    }
    
    return trends
  }
  
  /**
   * 最近の支出を取得
   */
  private async getRecentExpenses(limit: number) {
    const { data, error } = await this.supabase
      .from('expense_groups')
      .select(`
        id,
        title,
        expense_date,
        total_amount,
        categories (
          name,
          icon,
          color
        )
      `)
      .order('expense_date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching recent expenses:', error)
      return []
    }
    
    return data.map(expense => {
      const categories = Array.isArray(expense.categories) ? expense.categories[0] : expense.categories
      return ({
        id: expense.id,
        title: expense.title,
        date: expense.expense_date,
        amount: expense.total_amount || 0,
        categoryName: categories?.name || 'その他',
        categoryIcon: categories?.icon || 'help',
        categoryColor: categories?.color || '#6b7280'
      })
    })
  }
  
  /**
   * トップカテゴリを取得
   */
  private async getTopCategories(startDate: Date, endDate: Date, limit: number) {
    const { data, error } = await this.supabase
      .from('expense_groups')
      .select(`
        category_id,
        total_amount,
        categories (
          name,
          icon,
          color
        )
      `)
      .gte('expense_date', format(startDate, 'yyyy-MM-dd'))
      .lte('expense_date', format(endDate, 'yyyy-MM-dd'))
    
    if (error) {
      console.error('Error fetching top categories:', error)
      return []
    }
    
    // カテゴリ別に集計
    const categoryMap = new Map<string, any>()
    
    data.forEach(expense => {
      const categoryId = expense.category_id
      const amount = expense.total_amount || 0
      
      if (categoryMap.has(categoryId)) {
        const category = categoryMap.get(categoryId)
        category.amount += amount
        category.count += 1
      } else {
        const categories = Array.isArray(expense.categories) ? expense.categories[0] : expense.categories
        categoryMap.set(categoryId, {
          categoryName: categories?.name || 'その他',
          categoryIcon: categories?.icon || 'help',
          categoryColor: categories?.color || '#6b7280',
          amount,
          count: 1
        })
      }
    })
    
    // 金額でソートして上位を返す
    return Array.from(categoryMap.values())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, limit)
  }
  
  // シングルトン
  private static instance: DashboardService
  
  static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService()
    }
    return DashboardService.instance
  }
}