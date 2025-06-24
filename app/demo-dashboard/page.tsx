'use client'

import { useState } from 'react'
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
  summary: {
    currentMonth: {
      total: 89750,
      count: 28,
      average: 3205
    },
    previousMonth: {
      total: 76230,
      count: 25,
      average: 3049
    }
  },
  categoryData: [
    { name: '食費', value: 35600, color: '#10b981' },
    { name: '交通費', value: 18900, color: '#3b82f6' },
    { name: '娯楽', value: 15200, color: '#f59e0b' },
    { name: '日用品', value: 12450, color: '#ef4444' },
    { name: 'その他', value: 7600, color: '#8b5cf6' }
  ],
  recentExpenses: [
    {
      id: '1',
      title: 'ランチ - イタリアンレストラン',
      amount: 1200,
      date: '2025-01-28',
      category: '食費',
      payment_method: 'クレジットカード'
    },
    {
      id: '2', 
      title: 'コンビニ - 朝食',
      amount: 350,
      date: '2025-01-28',
      category: '食費',
      payment_method: '現金'
    },
    {
      id: '3',
      title: '電車代',
      amount: 480,
      date: '2025-01-27',
      category: '交通費',
      payment_method: 'ICカード'
    },
    {
      id: '4',
      title: '映画鑑賞',
      amount: 1800,
      date: '2025-01-26',
      category: '娯楽',
      payment_method: 'クレジットカード'
    },
    {
      id: '5',
      title: 'スーパー - 日用品',
      amount: 2100,
      date: '2025-01-25',
      category: '日用品',
      payment_method: 'クレジットカード'
    }
  ],
  trendData: [
    { month: '11月', amount: 67800 },
    { month: '12月', amount: 76230 },
    { month: '1月', amount: 89750 }
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
            description="支出の概要と分析"
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
              <MonthlySummary data={demoData.summary} />
              <ExpenseTrendChart data={demoData.trendData} />
              <CategoryPieChart data={demoData.categoryData} />
            </div>

            {/* 右カラム - 最近の支出と分析 */}
            <div className="space-y-6">
              <RecentExpenses data={demoData.recentExpenses} />
              <TopCategories data={demoData.categoryData} />
              
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