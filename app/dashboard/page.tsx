'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { MonthlySummary } from '@/components/dashboard/MonthlySummary'
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart'
import { ExpenseTrendChart } from '@/components/dashboard/ExpenseTrendChart'
import { RecentExpenses } from '@/components/dashboard/RecentExpenses'
import { TopCategories } from '@/components/dashboard/TopCategories'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { SidebarItem } from '@/components/layout/Sidebar'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { useAuth } from '@/components/auth/AuthProvider'
import { DashboardService, DashboardData } from '@/lib/supabase/dashboard'

// サイドバーアイテム
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    href: '/dashboard',
    icon: <Icon name="home" category="navigation" size="sm" />,
    isActive: true
  },
  {
    id: 'expenses',
    label: '支出一覧',
    href: '/expenses',
    icon: <Icon name="analytics" category="navigation" size="sm" />
  },
  {
    id: 'settings',
    label: '設定',
    href: '/settings',
    icon: <Icon name="settings" category="navigation" size="sm" />
  }
]

const dashboardService = DashboardService.getInstance()

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  
  // ダッシュボードデータの取得
  const fetchDashboardData = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError('')
      const data = await dashboardService.getDashboardData()
      setDashboardData(data)
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError('ダッシュボードデータの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchDashboardData()
  }, [user])
  
  // クイックアクション
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add':
        router.push('/expenses/new')
        break
      case 'view':
        router.push('/expenses')
        break
      case 'report':
        // TODO: レポート機能
        alert('レポート機能は準備中です')
        break
    }
  }
  
  return (
    <AuthGuard requireAuth={true}>
      <AppLayout sidebarItems={sidebarItems}>
        <div className="p-6 space-y-6">
          <PageHeader
            title="ダッシュボード"
            subtitle="支出の概要と分析"
            action={
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => router.push('/expenses/new')}
              >
                <Icon name="plus" category="ui" size="sm" variant="white" className="mr-2" />
                新規追加
              </Button>
            }
          />
          
          {/* エラー表示 */}
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {/* クイックアクション */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleQuickAction('add')}
              className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg border border-primary-200 hover:border-primary-300 transition-all shadow-sm hover:shadow-md flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Icon name="plus" category="ui" size="sm" variant="white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-primary-900">支出を記録</p>
                <p className="text-sm text-primary-600">新しい支出を追加</p>
              </div>
            </button>
            
            <button
              onClick={() => handleQuickAction('view')}
              className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg border border-primary-200 hover:border-primary-300 transition-all shadow-sm hover:shadow-md flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Icon name="list" category="ui" size="sm" variant="white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-primary-900">一覧を見る</p>
                <p className="text-sm text-primary-600">すべての支出を確認</p>
              </div>
            </button>
            
            <button
              onClick={() => handleQuickAction('report')}
              className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg border border-primary-200 hover:border-primary-300 transition-all shadow-sm hover:shadow-md flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Icon name="document" category="ui" size="sm" variant="white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-primary-900">レポート</p>
                <p className="text-sm text-primary-600">詳細な分析を表示</p>
              </div>
            </button>
          </div>
          
          {/* メインコンテンツ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左側：サマリーとグラフ */}
            <div className="lg:col-span-2 space-y-6">
              {/* 月間サマリー */}
              <MonthlySummary
                total={dashboardData?.monthlyTotal || 0}
                change={dashboardData?.monthlyChange || 0}
                isLoading={loading}
              />
              
              {/* 支出推移グラフ */}
              <ExpenseTrendChart
                initialData={dashboardData?.monthlyTrend || []}
                isLoading={loading}
              />
              
              {/* カテゴリ別円グラフ */}
              <CategoryPieChart
                data={dashboardData?.categoryBreakdown || []}
                isLoading={loading}
              />
            </div>
            
            {/* 右側：リスト系 */}
            <div className="space-y-6">
              {/* 最近の支出 */}
              <RecentExpenses
                expenses={dashboardData?.recentExpenses || []}
                isLoading={loading}
              />
              
              {/* トップカテゴリ */}
              <TopCategories
                categories={dashboardData?.topCategories || []}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  )
}