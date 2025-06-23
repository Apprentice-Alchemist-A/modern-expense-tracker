'use client'

import { useState, useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/browser-client'

interface CategoryOption {
  id: string
  value: string
  label: string
  icon: string
  color: string
}

interface PaymentMethodOption {
  id: string
  value: string
  label: string
  icon: string
}

interface MasterDataFilters {
  categories: CategoryOption[]
  paymentMethods: PaymentMethodOption[]
  loading: boolean
  error: string | null
}

export function useMasterDataFilters(): MasterDataFilters {
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setLoading(true)
        setError(null)

        const supabase = getSupabaseClient()

        // カテゴリデータ取得
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name, icon, color')
          .order('display_order')

        if (categoriesError) {
          throw new Error(`カテゴリ取得エラー: ${categoriesError.message}`)
        }

        // 支払方法データ取得
        const { data: paymentMethodsData, error: paymentMethodsError } = await supabase
          .from('payment_methods')
          .select('id, name, icon')
          .order('display_order')

        if (paymentMethodsError) {
          throw new Error(`支払方法取得エラー: ${paymentMethodsError.message}`)
        }

        // フィルターオプション形式に変換（シンプル化）
        const categoryOptions: CategoryOption[] = categoriesData?.map(cat => ({
          id: cat.id,
          value: cat.name,
          label: cat.name,
          icon: cat.icon, // ✅ DBから直接使用
          color: cat.color
        })) || []

        const paymentMethodOptions: PaymentMethodOption[] = paymentMethodsData?.map(pm => ({
          id: pm.id,
          value: pm.name,
          label: pm.name,
          icon: pm.icon // ✅ DBから直接使用
        })) || []

        setCategories(categoryOptions)
        setPaymentMethods(paymentMethodOptions)

      } catch (err: any) {
        console.error('マスターデータ取得エラー:', err)
        setError(err.message || 'データの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchMasterData()
  }, [])

  return {
    categories,
    paymentMethods,
    loading,
    error
  }
}

// マッピング関数は不要になりました
// DBに直接SVGファイル名を保存する方式に変更