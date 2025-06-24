'use client'

import React from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { MonthlySummary } from '@/components/dashboard/MonthlySummary'
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart'
import { ExpenseTrendChart } from '@/components/dashboard/ExpenseTrendChart'
import { RecentExpenses } from '@/components/dashboard/RecentExpenses'
import { TopCategories } from '@/components/dashboard/TopCategories'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { SidebarItem } from '@/components/layout/Sidebar'
import Link from 'next/link'

// デモ用サイドバーアイテム
const sidebarItems: SidebarItem[] = [
  {
    id: 'demo-dashboard',
    label: 'ダッシュボード',
    href: '/demo-dashboard',
    icon: <Icon name="home" category="navigation" size="sm" />,
    isActive: true
  },
  {
    id: 'demo-expenses',
    label: '支出一覧',
    href: '/demo-expenses',
    icon: <Icon name="analytics" category="navigation" size="sm" />
  },
  {
    id: 'demo-components',
    label: 'UI一覧',
    href: '/demo',
    icon: <Icon name="settings" category="navigation" size="sm" />
  },
  {
    id: 'home',
    label: 'ホームに戻る',
    href: '/',
    icon: <Icon name="arrow-left" category="actions" size="sm" />
  }
]

// デモ用ダッシュボードデータ
const demoData = {
  // MonthlySummary用データ
  monthlySummary: {
    total: 89750,
    change: 17.7 // (89750 - 76230) / 76230 * 100
  },
  // CategoryPieChart用データ
  categoryData: [
    {
      categoryId: '1',
      categoryName: '食費',
      categoryIcon: 'food',
      categoryColor: '#10b981',
      amount: 35600,
      percentage: 39.7
    },
    {
      categoryId: '2',
      categoryName: '交通費',
      categoryIcon: 'transport',
      categoryColor: '#3b82f6',
      amount: 18900,
      percentage: 21.1
    },
    {
      categoryId: '3',
      categoryName: '娯楽',
      categoryIcon: 'entertainment',
      categoryColor: '#f59e0b',
      amount: 15200,
      percentage: 16.9
    },
    {
      categoryId: '4',
      categoryName: '日用品',
      categoryIcon: 'shopping',
      categoryColor: '#ef4444',
      amount: 12450,
      percentage: 13.9
    },
    {
      categoryId: '5',
      categoryName: 'その他',
      categoryIcon: 'other',
      categoryColor: '#8b5cf6',
      amount: 7600,
      percentage: 8.5
    }
  ],
  // RecentExpenses用データ
  recentExpenses: [
    {
      id: '1',
      title: 'ランチ - イタリアンレストラン',
      amount: 1200,
      date: '2025-01-28',
      categoryName: '食費',
      categoryIcon: 'food',
      categoryColor: '#10b981'
    },
    {
      id: '2', 
      title: 'コンビニ - 朝食',
      amount: 350,
      date: '2025-01-28',
      categoryName: '食費',
      categoryIcon: 'food',
      categoryColor: '#10b981'
    },
    {
      id: '3',
      title: '電車代',
      amount: 480,
      date: '2025-01-27',
      categoryName: '交通費',
      categoryIcon: 'transport',
      categoryColor: '#3b82f6'
    },
    {
      id: '4',
      title: '映画鑑賞',
      amount: 1800,
      date: '2025-01-26',
      categoryName: '娯楽',
      categoryIcon: 'entertainment',
      categoryColor: '#f59e0b'
    },
    {
      id: '5',
      title: 'スーパー - 日用品',
      amount: 2100,
      date: '2025-01-25',
      categoryName: '日用品',
      categoryIcon: 'shopping',
      categoryColor: '#ef4444'
    }
  ],
  // ExpenseTrendChart用データ
  trendData: [
    { month: '11月', amount: 67800 },
    { month: '12月', amount: 76230 },
    { month: '1月', amount: 89750 }
  ],
  // TopCategories用データ
  topCategories: [
    {
      categoryName: '食費',
      categoryIcon: 'food',
      categoryColor: '#10b981',
      amount: 35600,
      count: 15
    },
    {
      categoryName: '交通費',
      categoryIcon: 'transport',
      categoryColor: '#3b82f6',
      amount: 18900,
      count: 8
    },
    {
      categoryName: '娯楽',
      categoryIcon: 'entertainment',
      categoryColor: '#f59e0b',
      amount: 15200,
      count: 6
    }
  ]
}

export default function DemoDashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-primary-50">
      {/* デモ用ヘッダー */}
      <div className="bg-warning-50 border-b border-warning-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Icon name="home" category="navigation" size="sm" className="text-warning-600" />
            <span className="text-sm text-warning-700 font-medium">
              これはデモページです。実際のデータではありません。
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm">
                ホームに戻る
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">
                本格利用を始める
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <AppLayout 
        sidebarItems={sidebarItems}
        userEmail="demo@example.com"
        hideAuthSection={true}
      >
        <div className="space-y-6">
          <PageHeader 
            title="ダッシュボード"
            subtitle="支出の概要と分析"
          />

          {/* クイックアクション */}
          <div className="flex flex-wrap gap-3">
            <Link href="/demo-expenses">
              <Button 
                variant="primary" 
                className="hover:shadow-md transition-shadow"
              >
                <Icon name="arrow-right" category="actions" size="sm" className="mr-2" />
                支出を記録
              </Button>
            </Link>
            <Button 
              variant="secondary"
              onClick={() => alert('デモ版では利用できません')}
            >
              <Icon name="analytics" category="navigation" size="sm" className="mr-2" />
              フィルター
            </Button>
            <Button 
              variant="secondary"
              onClick={() => alert('デモ版では利用できません')}
            >
              <Icon name="arrow-right" category="actions" size="sm" className="mr-2" />
              エクスポート
            </Button>
          </div>

          {/* メインコンテンツ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左カラム - サマリーとグラフ */}
            <div className="lg:col-span-2 space-y-6">
              <MonthlySummary 
                total={demoData.monthlySummary.total} 
                change={demoData.monthlySummary.change} 
              />
              <ExpenseTrendChart initialData={demoData.trendData} />
              <CategoryPieChart data={demoData.categoryData} />
            </div>

            {/* 右カラム - 最近の支出と分析 */}
            <div className="space-y-6">
              <RecentExpenses expenses={demoData.recentExpenses} />
              <TopCategories categories={demoData.topCategories} />
              
              {/* デモ機能案内 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="home" category="navigation" size="sm" className="text-primary-600" />
                    デモ機能について
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-primary-700">
                    <p>✅ データの可視化</p>
                    <p>✅ フィルター・ソート</p>
                    <p>✅ レスポンシブデザイン</p>
                    <p>✅ リアルタイム更新</p>
                    <div className="pt-3 mt-3 border-t border-primary-200">
                      <Link href="/dashboard">
                        <Button size="sm" className="w-full">
                          実際のデータで試す
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  )
}