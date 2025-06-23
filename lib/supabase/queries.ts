import { getSupabaseClient } from './browser-client'
import { Database } from '@/types/supabase'

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