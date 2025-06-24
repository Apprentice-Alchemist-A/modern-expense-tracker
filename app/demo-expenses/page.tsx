'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
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
  const [viewType, setViewType] = useState<ViewType>('card')
  const [filteredData, setFilteredData] = useState(demoExpenses)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('')

  const handleSearch = (text: string) => {
    setSearchText(text)
    applyFilters(text, selectedCategory, selectedPayment)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    applyFilters(searchText, category, selectedPayment)
  }

  const handlePaymentFilter = (payment: string) => {
    setSelectedPayment(payment)
    applyFilters(searchText, selectedCategory, payment)
  }

  const applyFilters = (search: string, category: string, payment: string) => {
    let filtered = [...demoExpenses]
    
    if (search) {
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.memo?.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (category) {
      filtered = filtered.filter(expense => expense.category === category)
    }
    
    if (payment) {
      filtered = filtered.filter(expense => expense.payment_method === payment)
    }
    
    setFilteredData(filtered)
  }

  const clearFilters = () => {
    setSearchText('')
    setSelectedCategory('')
    setSelectedPayment('')
    setFilteredData(demoExpenses)
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
              <Button variant="outline" onClick={() => setViewType(viewType === 'card' ? 'table' : 'card')}>
                <Icon name="settings" category="navigation" size="sm" className="mr-2" />
                {viewType === 'card' ? 'テーブル表示' : 'カード表示'}
              </Button>
              <Button 
                variant="primary"
                onClick={() => alert('デモ版では追加できません')}
              >
                <Icon name="plus" category="actions" size="sm" className="mr-2" />
                支出を追加
              </Button>
            </div>
          </div>

          {/* デモ用フィルターバー */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="検索..."
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  icon={<Icon name="analytics" category="navigation" size="sm" />}
                />
                <Select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  options={[
                    { value: '', label: 'カテゴリ全て' },
                    ...demoCategories.map(cat => ({ value: cat.name, label: cat.name }))
                  ]}
                />
                <Select
                  value={selectedPayment}
                  onChange={(e) => handlePaymentFilter(e.target.value)}
                  options={[
                    { value: '', label: '支払方法全て' },
                    ...demoPaymentMethods.map(pm => ({ value: pm.name, label: pm.name }))
                  ]}
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={clearFilters}>
                    <Icon name="arrow-left" category="actions" size="sm" className="mr-2" />
                    クリア
                  </Button>
                  <Button variant="outline" onClick={() => setViewType(viewType === 'card' ? 'table' : 'card')}>
                    <Icon name="settings" category="navigation" size="sm" className="mr-2" />
                    {viewType === 'card' ? 'テーブル' : 'カード'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* デモ用支出一覧 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-primary-600">
                {filteredData.length}件の支出が見つかりました
              </p>
            </div>
            
            {viewType === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((expense) => (
                  <Card key={expense.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{expense.title}</CardTitle>
                          <p className="text-sm text-primary-600 mt-1">{expense.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary-900">¥{expense.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="analytics" category="navigation" size="sm" className="text-primary-500" />
                          <span>{expense.category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="home" category="navigation" size="sm" className="text-primary-500" />
                          <span>{expense.payment_method}</span>
                        </div>
                        {expense.memo && (
                          <p className="text-sm text-primary-600 mt-2">{expense.memo}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primary-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">日付</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">タイトル</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">カテゴリ</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">支払方法</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-primary-700">金額</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary-100">
                        {filteredData.map((expense) => (
                          <tr key={expense.id} className="hover:bg-primary-25">
                            <td className="px-4 py-3 text-sm text-primary-600">{expense.date}</td>
                            <td className="px-4 py-3 text-sm font-medium text-primary-900">{expense.title}</td>
                            <td className="px-4 py-3 text-sm text-primary-600">{expense.category}</td>
                            <td className="px-4 py-3 text-sm text-primary-600">{expense.payment_method}</td>
                            <td className="px-4 py-3 text-sm font-bold text-primary-900 text-right">¥{expense.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </AppLayout>
    </div>
  )
}