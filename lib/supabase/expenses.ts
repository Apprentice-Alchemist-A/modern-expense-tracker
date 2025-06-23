'use client'

import { ExpenseGroup } from '@/lib/validations/expense'
import { ensureAuthenticated } from '@/lib/utils/auth'
import { getSupabaseClient } from '@/lib/supabase/browser-client'

export class ExpenseService {
  private supabase = getSupabaseClient()
  private static instance: ExpenseService

  constructor() {
    if (ExpenseService.instance) {
      return ExpenseService.instance
    }
    ExpenseService.instance = this
  }

  static getInstance(): ExpenseService {
    if (!ExpenseService.instance) {
      ExpenseService.instance = new ExpenseService()
    }
    return ExpenseService.instance
  }

  /**
   * 新しい支出グループと項目を作成（認証チェック版）
   */
  async createExpense(data: ExpenseGroup): Promise<string> {
    console.log('ExpenseService.createExpense called with:', data)
    
    // 認証状態を確認
    const { session, user } = await ensureAuthenticated()
    console.log('User authenticated:', user.id)

    return this.createExpenseWithUser(data, user.id)
  }

  /**
   * 新しい支出グループと項目を作成（ユーザーID直接指定版）
   */
  async createExpenseWithUser(data: ExpenseGroup, userId: string): Promise<string> {
    console.log('ExpenseService.createExpenseWithUser called with:', { data, userId })

    try {
      // Supabaseのcreate_expense_with_items関数を呼び出し
      // データベース関数の正しいパラメータ形式に合わせる
      const { data: result, error } = await this.supabase.rpc('create_expense_with_items', {
        p_expense_group: {
          title: data.title,
          description: null, // 現在のフォームにはdescriptionがないのでnull
          category_id: data.category_id,
          payment_method_id: data.payment_method_id,
          store_id: null, // 店舗機能は未実装なのでnull
          template_id: null, // テンプレート機能は未実装なのでnull
          expense_date: data.date,
          notes: data.memo || null,
          receipt_url: null // 写真機能は未実装なのでnull
        },
        p_expense_items: data.items.map(item => ({
          name: item.item_name,
          amount: item.amount,
          quantity: 1, // デフォルト値
          unit_price: item.amount, // 数量が1なので単価=金額
          notes: item.note || null,
          display_order: 0 // デフォルト値
        }))
      })

      console.log('RPC call result:', { result, error })

      if (error) {
        console.error('Error creating expense:', error)
        throw error
      }

      return result as string
    } catch (err) {
      console.error('Failed to create expense:', err)
      throw new Error('支出の作成に失敗しました')
    }
  }

  /**
   * 支出グループを更新
   */
  async updateExpense(groupId: string, data: ExpenseGroup): Promise<void> {
    const { data: { session }, error: sessionError } = await this.supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      throw new Error('認証が必要です')
    }

    try {
      // トランザクション的な更新を行う
      // 1. 支出グループを更新
      const { error: groupError } = await this.supabase
        .from('expense_groups')
        .update({
          title: data.title,
          category_id: data.category_id,
          payment_method_id: data.payment_method_id,
          date: data.date,
          memo: data.memo,
          updated_at: new Date().toISOString()
        })
        .eq('id', groupId)
        .eq('user_id', session.user.id)

      if (groupError) {
        throw groupError
      }

      // 2. 既存の項目を削除
      const { error: deleteError } = await this.supabase
        .from('expense_items')
        .delete()
        .eq('group_id', groupId)

      if (deleteError) {
        throw deleteError
      }

      // 3. 新しい項目を追加
      const itemsToInsert = data.items.map(item => ({
        group_id: groupId,
        item_name: item.item_name,
        amount: item.amount,
        note: item.note || null
      }))

      const { error: insertError } = await this.supabase
        .from('expense_items')
        .insert(itemsToInsert)

      if (insertError) {
        throw insertError
      }

      // 4. 合計金額を更新
      const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0)
      const { error: totalError } = await this.supabase
        .from('expense_groups')
        .update({ total_amount: totalAmount })
        .eq('id', groupId)

      if (totalError) {
        throw totalError
      }
    } catch (err) {
      console.error('Failed to update expense:', err)
      throw new Error('支出の更新に失敗しました')
    }
  }

  /**
   * 支出グループを削除
   */
  async deleteExpense(groupId: string): Promise<void> {
    const { data: { session }, error: sessionError } = await this.supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      throw new Error('認証が必要です')
    }

    try {
      // 項目は外部キー制約により自動削除される
      const { error } = await this.supabase
        .from('expense_groups')
        .delete()
        .eq('id', groupId)
        .eq('user_id', session.user.id)

      if (error) {
        throw error
      }
    } catch (err) {
      console.error('Failed to delete expense:', err)
      throw new Error('支出の削除に失敗しました')
    }
  }

  /**
   * 支出グループの詳細を取得（編集用）
   */
  async getExpenseById(groupId: string): Promise<ExpenseGroup | null> {
    const { data: { session }, error: sessionError } = await this.supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      throw new Error('認証が必要です')
    }

    try {
      // 支出グループを取得
      const { data: group, error: groupError } = await this.supabase
        .from('expense_groups')
        .select('*')
        .eq('id', groupId)
        .eq('user_id', session.user.id)
        .single()

      if (groupError) {
        throw groupError
      }

      if (!group) {
        return null
      }

      // 関連する項目を取得
      const { data: items, error: itemsError } = await this.supabase
        .from('expense_items')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at')

      if (itemsError) {
        throw itemsError
      }

      return {
        title: group.title,
        category_id: group.category_id,
        payment_method_id: group.payment_method_id,
        date: group.date,
        memo: group.memo,
        items: items.map(item => ({
          item_name: item.item_name,
          amount: item.amount,
          note: item.note
        }))
      }
    } catch (err) {
      console.error('Failed to fetch expense:', err)
      throw new Error('支出データの取得に失敗しました')
    }
  }
}