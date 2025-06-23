'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/AppLayout'
import { ExpenseForm } from '@/components/forms/ExpenseForm'
import { ExpenseService } from '@/lib/supabase/expenses'
import { ExpenseGroup } from '@/lib/validations/expense'
import { useAuth } from '@/components/auth/AuthProvider'
import { AuthGuard } from '@/components/auth/AuthGuard'

const expenseService = ExpenseService.getInstance()

export default function NewExpensePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    console.log('Current user:', user)
    console.log('Auth loading state:', authLoading)
  }, [user, authLoading])

  const handleSubmit = async (data: ExpenseGroup) => {
    try {
      console.log('=== FORM SUBMISSION START ===')
      console.log('Submitting data:', data)
      console.log('Current user from AuthProvider:', user)
      
      // AuthProviderのuserがない場合は処理を停止
      if (!user) {
        console.error('No user found in AuthProvider')
        alert('認証が切れています。再度ログインしてください。')
        return
      }
      
      setSubmitLoading(true)
      
      // ユーザーIDを明示的に渡してデータ作成を実行
      const result = await expenseService.createExpenseWithUser(data, user.id)
      console.log('Create expense result:', result)
      
      // 成功時は支出一覧ページに戻る
      router.push('/expenses')
      router.refresh() // データを再取得
    } catch (error) {
      console.error('Failed to create expense:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      })
      alert('支出の作成に失敗しました。もう一度お試しください。')
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/expenses')
  }

  return (
    <AuthGuard requireAuth={true}>
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <ExpenseForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={submitLoading}
          />
        </div>
      </AppLayout>
    </AuthGuard>
  )
}