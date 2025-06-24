import { getSupabaseClient } from './browser-client'
import { Database } from '@/types/database'

type Category = Database['public']['Tables']['categories']['Row']
type PaymentMethod = Database['public']['Tables']['payment_methods']['Row']
type ExpenseGroup = Database['public']['Tables']['expense_groups']['Row']
type ExpenseItem = Database['public']['Tables']['expense_items']['Row']

// カテゴリー関連
export const getCategories = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as Category[]
}

// 支払方法関連
export const getPaymentMethods = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as PaymentMethod[]
}

// 支出グループ関連
export const getExpenseGroups = async (limit = 50) => {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('expense_groups')
    .select(`
      *,
      categories(name, icon, color),
      payment_methods(name, icon),
      expense_items(*)
    `)
    .order('expense_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('getExpenseGroups: Query error:', error)
    throw error
  }
  return data
}

// フィルター・ソート・ページネーション対応の支出グループ取得
export interface ExpenseFilters {
  dateFrom?: string
  dateTo?: string
  categories?: string[]
  paymentMethods?: string[]
  amountMin?: string
  amountMax?: string
  searchText?: string
}

export interface ExpenseSort {
  field: 'date' | 'amount' | 'title' | 'category' | 'payment'
  direction: 'asc' | 'desc'
}

export const getExpenseGroupsWithFilters = async (
  page: number = 1,
  itemsPerPage: number = 20,
  filters?: ExpenseFilters,
  sort?: ExpenseSort | undefined
) => {
  const supabase = getSupabaseClient()
  
  const offset = (page - 1) * itemsPerPage
  
  // クエリビルダーを構築
  let query = supabase
    .from('expense_groups')
    .select(`
      *,
      categories(name, icon, color),
      payment_methods(name, icon),
      expense_items(*)
    `)
  
  let countQuery = supabase
    .from('expense_groups')
    .select('*', { count: 'exact', head: true })
  
  // フィルター適用
  if (filters) {
    // 日付フィルター
    if (filters.dateFrom) {
      query = query.gte('expense_date', filters.dateFrom)
      countQuery = countQuery.gte('expense_date', filters.dateFrom)
    }
    if (filters.dateTo) {
      query = query.lte('expense_date', filters.dateTo)
      countQuery = countQuery.lte('expense_date', filters.dateTo)
    }
    
    // カテゴリフィルター
    if (filters.categories && filters.categories.length > 0) {
      // カテゴリ名からIDを取得
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .in('name', filters.categories)
      
      if (categoryData && categoryData.length > 0) {
        const categoryIds = categoryData.map(c => c.id)
        query = query.in('category_id', categoryIds)
        countQuery = countQuery.in('category_id', categoryIds)
      }
    }
    
    // 支払方法フィルター
    if (filters.paymentMethods && filters.paymentMethods.length > 0) {
      // 支払方法名からIDを取得
      const { data: paymentData } = await supabase
        .from('payment_methods')
        .select('id')
        .in('name', filters.paymentMethods)
      
      if (paymentData && paymentData.length > 0) {
        const paymentIds = paymentData.map(p => p.id)
        query = query.in('payment_method_id', paymentIds)
        countQuery = countQuery.in('payment_method_id', paymentIds)
      }
    }
    
    // 金額フィルター
    if (filters.amountMin) {
      const minAmount = parseFloat(filters.amountMin)
      if (!isNaN(minAmount)) {
        query = query.gte('total_amount', minAmount)
        countQuery = countQuery.gte('total_amount', minAmount)
      }
    }
    if (filters.amountMax) {
      const maxAmount = parseFloat(filters.amountMax)
      if (!isNaN(maxAmount)) {
        query = query.lte('total_amount', maxAmount)
        countQuery = countQuery.lte('total_amount', maxAmount)
      }
    }
    
    // テキスト検索フィルター
    if (filters.searchText) {
      // PostgreSQLのilike演算子を使用してタイトルとメモを検索
      query = query.or(`title.ilike.%${filters.searchText}%,notes.ilike.%${filters.searchText}%`)
      countQuery = countQuery.or(`title.ilike.%${filters.searchText}%,notes.ilike.%${filters.searchText}%`)
    }
  }
  
  // ソート適用
  if (sort) {
    const ascending = sort.direction === 'asc'
    switch (sort.field) {
      case 'date':
        query = query.order('expense_date', { ascending })
        break
      case 'amount':
        query = query.order('total_amount', { ascending })
        break
      case 'title':
        query = query.order('title', { ascending })
        break
      case 'category':
        // カテゴリ名でソートするため、JOINしたテーブルでソート
        query = query.order('categories(name)', { ascending })
        break
      case 'payment':
        // 支払方法名でソートするため、JOINしたテーブルでソート
        query = query.order('payment_methods(name)', { ascending })
        break
      default:
        query = query.order('expense_date', { ascending: false })
    }
  } else {
    // デフォルトソート
    query = query.order('expense_date', { ascending: false })
    query = query.order('created_at', { ascending: false })
  }
  
  // 総件数を取得
  const { count, error: countError } = await countQuery
  
  if (countError) {
    console.error('getExpenseGroupsWithFilters: Count error:', countError)
    throw countError
  }
  
  // ページネーション適用
  query = query.range(offset, offset + itemsPerPage - 1)
  
  // データを取得
  const { data, error } = await query
  
  if (error) {
    console.error('getExpenseGroupsWithFilters: Query error:', error)
    throw error
  }
  
  return {
    data: data || [],
    totalCount: count || 0,
    currentPage: page,
    itemsPerPage,
    totalPages: Math.ceil((count || 0) / itemsPerPage)
  }
}

// レガシー関数（後方互換性のため）
export const getExpenseGroupsPaginated = async (
  page: number = 1,
  itemsPerPage: number = 20
) => {
  return getExpenseGroupsWithFilters(page, itemsPerPage)
}

export const getExpenseGroupById = async (id: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('expense_groups')
    .select(`
      *,
      categories(name, icon, color),
      payment_methods(name, icon),
      expense_items(*)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// 支出グループと明細を同時に作成
export const createExpenseWithItems = async (
  group: Omit<ExpenseGroup, 'id' | 'created_at' | 'updated_at' | 'user_id'>,
  items: Omit<ExpenseItem, 'id' | 'expense_group_id' | 'created_at' | 'updated_at'>[]
) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .rpc('create_expense_with_items', {
      p_expense_group: group,
      p_expense_items: items
    })
  
  if (error) throw error
  return data
}

// 月次サマリー取得
export const getMonthlyExpenseSummary = async (year: number, month: number) => {
  const supabase = getSupabaseClient()
  const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0]
  const endDate = new Date(year, month, 0).toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('expense_groups')
    .select('category_id, categories(name), total_amount')
    .gte('expense_date', startDate)
    .lte('expense_date', endDate)
  
  if (error) throw error
  
  // カテゴリごとに集計
  const summary = data.reduce((acc: any, item) => {
    const categoryId = item.category_id
    if (!acc[categoryId]) {
      acc[categoryId] = {
        category_id: categoryId,
        category_name: (item.categories as any)?.name || 'その他',
        total_amount: 0
      }
    }
    acc[categoryId].total_amount += item.total_amount
    return acc
  }, {})
  
  return Object.values(summary)
}