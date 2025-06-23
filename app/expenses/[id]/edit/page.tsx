'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/AppLayout'
import { ExpenseForm } from '@/components/forms/ExpenseForm'
import { ExpenseService } from '@/lib/supabase/expenses'
import { ExpenseGroup } from '@/lib/validations/expense'
import { Card } from '@/components/ui/Card'
import { AuthGuard } from '@/components/auth/AuthGuard'

const expenseService = ExpenseService.getInstance()

interface EditExpensePageProps {
  params: {
    id: string
  }
}

export default function EditExpensePage({ params }: EditExpensePageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [initialData, setInitialData] = useState<ExpenseGroup | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 初期データを取得
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setFetchLoading(true)
        setError(null)
        
        const data = await expenseService.getExpenseById(params.id)
        if (!data) {
          setError('支出データが見つかりません')
          return
        }
        
        setInitialData(data)
      } catch (err) {
        console.error('Failed to fetch expense:', err)
        setError('支出データの取得に失敗しました')
      } finally {
        setFetchLoading(false)
      }
    }

    if (params.id) {
      fetchExpense()
    }
  }, [params.id])

  const handleSubmit = async (data: ExpenseGroup) => {
    try {
      setLoading(true)
      await expenseService.updateExpense(params.id, data)
      
      // 成功時は支出一覧ページに戻る
      router.push('/expenses')
      router.refresh() // データを再取得
    } catch (error) {
      console.error('Failed to update expense:', error)
      alert('支出の更新に失敗しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/expenses')
  }

  if (fetchLoading) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-primary-600">支出データを読み込み中...</div>
            </div>
          </Card>
        </div>
      </AppLayout>
    )
  }

  if (error || !initialData) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">
                {error || '支出データが見つかりません'}
              </div>
              <button
                onClick={() => router.push('/expenses')}
                className="text-primary-600 hover:text-primary-800"
              >
                支出一覧に戻る
              </button>
            </div>
          </Card>
        </div>
      </AppLayout>
    )
  }

  return (
    <AuthGuard requireAuth={true}>
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <ExpenseForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={initialData}
            isEdit={true}
            loading={loading}
          />
        </div>
      </AppLayout>
    </AuthGuard>
  )
}