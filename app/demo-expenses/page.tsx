'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { ExpenseList } from '@/components/data-display/ExpenseList'
import { FilterBar } from '@/components/data-display/FilterBar'
import { ViewToggle } from '@/components/data-display/ViewToggle'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { SidebarItem } from '@/components/layout/Sidebar'
import Link from 'next/link'

// デモ用サイドバーアイテム
const sidebarItems: SidebarItem[] = [
  {
    id: 'demo-dashboard',
    label: 'ダッシュボード',
    href: '/demo-dashboard',
    icon: <Icon name="home" category="navigation" size="sm" />
  },
  {
    id: 'demo-expenses',
    label: '支出一覧',
    href: '/demo-expenses',
    icon: <Icon name="analytics" category="navigation" size="sm" />,
    isActive: true
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

// デモ用支出データ
const demoExpenses = [
  {
    id: '1',
    title: 'ランチ - イタリアンレストラン',
    amount: 1200,
    date: '2025-01-28',
    category: '食費',
    payment_method: 'クレジットカード',
    memo: '同僚とのランチミーティング'
  },
  {
    id: '2',
    title: 'コンビニ - 朝食',
    amount: 350,
    date: '2025-01-28',
    category: '食費',
    payment_method: '現金',
    memo: 'おにぎりとコーヒー'
  },
  {
    id: '3',
    title: '電車代',
    amount: 480,
    date: '2025-01-27',
    category: '交通費',
    payment_method: 'ICカード',
    memo: '新宿→渋谷 往復'
  },
  {
    id: '4',
    title: '映画鑑賞',
    amount: 1800,
    date: '2025-01-26',
    category: '娯楽',
    payment_method: 'クレジットカード',
    memo: '最新作を鑑賞'
  },
  {
    id: '5',
    title: 'スーパー - 日用品',
    amount: 2100,
    date: '2025-01-25',
    category: '日用品',
    payment_method: 'クレジットカード',
    memo: 'シャンプー、歯磨き粉など'
  },
  {
    id: '6',
    title: 'カフェ - ドリンク',
    amount: 450,
    date: '2025-01-25',
    category: '食費',
    payment_method: '現金',
    memo: 'アイスコーヒー'
  },
  {
    id: '7',
    title: 'タクシー',
    amount: 1650,
    date: '2025-01-24',
    category: '交通費',
    payment_method: 'クレジットカード',
    memo: '終電逃したため'
  },
  {
    id: '8',
    title: 'ディナー - 和食',
    amount: 3200,
    date: '2025-01-23',
    category: '食費',
    payment_method: 'クレジットカード',
    memo: '家族での外食'
  },
  {
    id: '9',
    title: '書籍購入',
    amount: 1890,
    date: '2025-01-22',
    category: '娯楽',
    payment_method: 'クレジットカード',
    memo: 'プログラミング関連書籍'
  },
  {
    id: '10',
    title: 'ガソリン代',
    amount: 4500,
    date: '2025-01-21',
    category: '交通費',
    payment_method: 'クレジットカード',
    memo: 'レギュラー満タン'
  }
]

// デモ用マスターデータ
const demoCategories = [
  { id: '1', name: '食費', color: '#10b981' },
  { id: '2', name: '交通費', color: '#3b82f6' },
  { id: '3', name: '娯楽', color: '#f59e0b' },
  { id: '4', name: '日用品', color: '#ef4444' },
  { id: '5', name: 'その他', color: '#8b5cf6' }
]

const demoPaymentMethods = [
  { id: '1', name: 'クレジットカード' },
  { id: '2', name: '現金' },
  { id: '3', name: 'ICカード' },
  { id: '4', name: 'デビットカード' }
]

type ViewType = 'card' | 'list' | 'table'

export default function DemoExpensesPage() {
  const [expenses, setExpenses] = useState(demoExpenses)
  const [viewType, setViewType] = useState<ViewType>('card')
  const [filteredData, setFilteredData] = useState(demoExpenses)

  const handleFilterChange = (filters: any) => {
    let filtered = [...demoExpenses]
    
    // デモ用の簡単なフィルタリング
    if (filters.search) {
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        expense.memo?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    if (filters.category) {
      filtered = filtered.filter(expense => expense.category === filters.category)
    }
    
    if (filters.paymentMethod) {
      filtered = filtered.filter(expense => expense.payment_method === filters.paymentMethod)
    }
    
    setFilteredData(filtered)
  }

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    const sorted = [...filteredData].sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (field) {
        case 'date':
          aValue = new Date(a.date)
          bValue = new Date(b.date)
          break
        case 'amount':
          aValue = a.amount
          bValue = b.amount
          break
        case 'title':
          aValue = a.title
          bValue = b.title
          break
        case 'category':
          aValue = a.category
          bValue = b.category
          break
        default:
          return 0
      }
      
      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
    
    setFilteredData(sorted)
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* デモ用ヘッダー */}
      <div className="bg-warning-50 border-b border-warning-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Icon name="info" category="actions" size="sm" className="text-warning-600" />
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
            <Link href="/expenses">
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
          <div className="flex items-center justify-between">
            <PageHeader 
              title="支出一覧 (デモ)"
              description={`${filteredData.length}件の支出データ`}
            />
            <div className="flex items-center gap-4">
              <ViewToggle viewType={viewType} onChange={setViewType} />
              <Button 
                variant="primary"
                onClick={() => alert('デモ版では追加できません')}
              >
                <Icon name="plus" category="actions" size="sm" className="mr-2" />
                支出を追加
              </Button>
            </div>
          </div>

          <FilterBar 
            categories={demoCategories}
            paymentMethods={demoPaymentMethods}
            onFilterChange={handleFilterChange}
            showClearFilters={true}
            onClearFilters={() => {
              setFilteredData(demoExpenses)
            }}
          />

          <ExpenseList 
            expenses={filteredData}
            viewType={viewType}
            categories={demoCategories}
            paymentMethods={demoPaymentMethods}
            onEdit={(expense) => alert('デモ版では編集できません')}
            onDelete={(id) => alert('デモ版では削除できません')}
            onSort={handleSort}
            isLoading={false}
          />
        </div>
      </AppLayout>
    </div>
  )
}