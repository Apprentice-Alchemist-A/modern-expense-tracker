'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { useAuth } from '@/components/auth/AuthProvider'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { getExpenseGroups, getExpenseGroupsWithFilters } from '@/lib/supabase/queries'
import { SidebarItem } from '@/components/layout/Sidebar'
import { ExpenseViews } from '@/components/expenses/ExpenseViews'
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters'
import { useExpenseFilters } from '@/hooks/useExpenseFilters'
import { useToast } from '@/hooks/useToast'
import { sampleExpenses } from '@/lib/sample-data'
import { ExpenseService } from '@/lib/supabase/expenses'
import { Pagination } from '@/components/ui/Pagination'
import { usePagination } from '@/hooks/usePagination'
import { useUrlParams } from '@/hooks/useUrlParams'

// サンプルサイドバーアイテム
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    href: '/dashboard',
    icon: <Icon name="home" category="navigation" size="sm" />
  },
  {
    id: 'expenses',
    label: '支出一覧',
    href: '/expenses',
    icon: <Icon name="analytics" category="navigation" size="sm" />,
    isActive: true
  },
  {
    id: 'settings',
    label: '設定',
    href: '/settings',
    icon: <Icon name="settings" category="navigation" size="sm" />
  }
]

type ViewMode = 'card' | 'list' | 'table'

const expenseService = ExpenseService.getInstance()

function ExpensesPageContent() {
  const router = useRouter()
  const { user } = useAuth()
  const { toasts, removeToast, success, error: showError } = useToast()
  const [rawExpenses, setRawExpenses] = useState<any[]>([])
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [viewMode, setViewMode] = useState<ViewMode>('card')

  // URLパラメータと状態の同期
  const urlParams = useUrlParams()
  
  // URLパラメータから状態を取得
  const filters = urlParams.state.filters
  const sort = urlParams.state.sort
  const currentPage = urlParams.state.page
  const itemsPerPage = urlParams.state.itemsPerPage

  // フィルターの有効性チェック
  const hasActiveFilters = !!(
    filters.dateFrom || filters.dateTo ||
    (filters.categories && filters.categories.length > 0) ||
    (filters.paymentMethods && filters.paymentMethods.length > 0) ||
    filters.amountMin || filters.amountMax ||
    filters.searchText
  )

  // 支出データを取得（フィルター・ソート・ページネーション対応）
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('Fetching expenses from database...')
      // フィルター・ソート・ページネーション対応のデータ取得
      const result = await getExpenseGroupsWithFilters(
        currentPage,
        itemsPerPage,
        filters,
        sort
      )
      console.log('Fetched expenses from DB:', result.data?.length, 'items, total:', result.totalCount)
      
      // データを画面表示用の形式に変換
      const formattedExpenses = result.data?.map(expense => ({
        id: expense.id,
        title: expense.title,
        category: {
          id: expense.category_id,
          name: expense.categories?.name || 'その他',
          icon: expense.categories?.icon || 'help',
          color: expense.categories?.color || '#6b7280'
        },
        paymentMethod: {
          id: expense.payment_method_id,
          name: expense.payment_methods?.name || 'その他',
          icon: expense.payment_methods?.icon || 'help'
        },
        date: expense.expense_date,
        total: Number(expense.total_amount) || 0,
        memo: expense.notes || '',
        items: expense.expense_items?.map((item: any) => ({
          id: item.id,
          name: item.name,
          amount: Number(item.amount) || 0,
          note: item.notes || ''
        })) || []
      })) || []
      
      setRawExpenses(formattedExpenses)
      setTotalExpenses(result.totalCount)
      console.log(`支出データを取得しました: ${formattedExpenses.length}件 / 総計: ${result.totalCount}件`)
    } catch (err: any) {
      console.error('Failed to fetch expenses:', err)
      setError(err.message || '支出データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, filters, sort])

  useEffect(() => {
    console.log('ExpensesPage: user state changed:', { user, hasUser: !!user })
    if (user) {
      fetchExpenses()
    }
  }, [user, fetchExpenses])

  // ページに戻ってきた時にもデータを再取得
  useEffect(() => {
    const handleFocus = () => {
      if (user && !loading) {
        console.log('Page focused, refreshing data...')
        fetchExpenses()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [user, loading])

  // 編集ハンドラー
  const handleEdit = (expenseId: string) => {
    router.push(`/expenses/${expenseId}/edit`)
  }

  // 削除ハンドラー
  const handleDelete = async (expenseId: string) => {
    try {
      await expenseService.deleteExpense(expenseId)
      
      // データを再取得
      await fetchExpenses()
      success('支出を削除しました')
    } catch (error) {
      console.error('Failed to delete expense:', error)
      showError('支出の削除に失敗しました。もう一度お試しください。')
    }
  }

  return (
    <AuthGuard requireAuth={true}>
      <AppLayout sidebarItems={sidebarItems}>
        <div className="p-6 space-y-6">
          <PageHeader
            title="支出一覧"
            subtitle="登録された支出データの確認・管理"
            breadcrumbs={[
              { label: 'ダッシュボード', href: '/dashboard' },
              { label: '支出一覧' }
            ]}
          />

          {/* フィルター・ソート機能 */}
          <ExpenseFilters
            filters={filters}
            onFiltersChange={urlParams.updateFilters}
            sort={sort}
            onSortChange={urlParams.updateSort}
            totalCount={totalExpenses}
            filteredCount={rawExpenses.length}
            viewMode={viewMode}
          />

          {/* 表示モード切り替えとアクション */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'card' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('card')}
              >
                <Icon name="menu" category="ui" size="sm" className="mr-2" />
                カード
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <Icon name="menu" category="ui" size="sm" className="mr-2" />
                リスト
              </Button>
              <Button
                variant={viewMode === 'table' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Icon name="menu" category="ui" size="sm" className="mr-2" />
                テーブル
              </Button>
            </div>

            <div className="flex space-x-2">
              {/* 統計情報表示 */}
              {hasActiveFilters && (
                <div className="flex items-center space-x-4 text-sm text-primary-600 bg-primary-50 px-3 py-2 rounded-md">
                  <span>フィルター適用中</span>
                </div>
              )}
              
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => router.push('/expenses/new')}
              >
                <Icon name="plus" category="ui" size="sm" className="mr-2" />
                新規追加
              </Button>
            </div>
          </div>

          {/* データ表示エリア */}
          <Card>
            <CardHeader>
              <CardTitle>
                支出データ ({rawExpenses.length}件 / 総計: {totalExpenses}件)
              </CardTitle>
              <CardDescription>
                {viewMode === 'card' && 'カード表示で支出データを確認'}
                {viewMode === 'list' && 'リスト表示で支出データを確認'}
                {viewMode === 'table' && 'テーブル表示で支出データを確認'}
                {hasActiveFilters && ` (フィルター適用中)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-primary-300 border-t-primary-900 rounded-full mx-auto mb-4"></div>
                  <p className="text-primary-600">データを読み込み中...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <div className="text-error text-lg mb-2">エラーが発生しました</div>
                  <p className="text-primary-600 mb-4">{error}</p>
                  <Button onClick={fetchExpenses} variant="secondary" size="sm">
                    再試行
                  </Button>
                </div>
              ) : rawExpenses.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="search" category="ui" size="lg" variant="default" className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-primary-900 mb-2">
                    {totalExpenses === 0 ? '支出データがありません' : '該当するデータがありません'}
                  </h3>
                  <p className="text-primary-600 mb-6">
                    {totalExpenses === 0 ? (
                      <>
                        まだ支出データが登録されていません。<br />
                        「新規追加」ボタンから最初の支出を登録してみましょう。
                      </>
                    ) : (
                      <>
                        現在のフィルター条件に一致するデータがありません。<br />
                        フィルター条件を変更するか、クリアしてください。
                      </>
                    )}
                  </p>
                  {totalExpenses === 0 ? (
                    <Button 
                      variant="primary"
                      onClick={() => router.push('/expenses/new')}
                    >
                      <Icon name="plus" category="ui" size="sm" className="mr-2" />
                      最初の支出を登録
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={urlParams.resetAll}>
                      <Icon name="x" category="ui" size="sm" className="mr-2" />
                      フィルターをクリア
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <ExpenseViews 
                    expenses={rawExpenses} 
                    viewMode={viewMode}
                    sort={sort}
                    onSortChange={urlParams.updateSort}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  
                  {/* ページネーション */}
                  {totalExpenses > 0 && (
                    <div className="mt-6 pt-4 border-t border-primary-200">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalExpenses / itemsPerPage)}
                        totalItems={totalExpenses}
                        itemsPerPage={itemsPerPage}
                        onPageChange={urlParams.updatePage}
                        onItemsPerPageChange={urlParams.updateItemsPerPage}
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </AuthGuard>
  )
}

export default function ExpensesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-300 border-t-primary-900 rounded-full"></div>
      </div>
    }>
      <ExpensesPageContent />
    </Suspense>
  )
}