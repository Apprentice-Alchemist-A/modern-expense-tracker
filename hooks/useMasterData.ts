'use client'

import { useState, useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/browser-client'

export interface Category {
  id: string
  name: string
  icon: string | null
  color: string | null
  display_order: number
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string | null
  display_order: number
}

export function useMasterData() {
  const [categories, setCategories] = useState<Category[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setLoading(true)
        setError(null)

        const supabase = getSupabaseClient()

        // カテゴリを取得
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name, icon, color, display_order')
          .eq('is_active', true)
          .order('display_order')

        if (categoriesError) {
          throw categoriesError
        }

        // 支払方法を取得
        const { data: paymentMethodsData, error: paymentMethodsError } = await supabase
          .from('payment_methods')
          .select('id, name, icon, display_order')
          .eq('is_active', true)
          .order('display_order')

        if (paymentMethodsError) {
          throw paymentMethodsError
        }

        setCategories(categoriesData || [])
        setPaymentMethods(paymentMethodsData || [])
      } catch (err) {
        console.error('Error fetching master data:', err)
        setError(err instanceof Error ? err.message : 'データの取得に失敗しました')
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
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      // useEffectが再実行される
    }
  }
}