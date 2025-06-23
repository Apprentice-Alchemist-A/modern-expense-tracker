'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase/client'
import { SidebarItem } from '@/components/layout/Sidebar'

// サンプルサイドバーアイテム
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    href: '/dashboard',
    icon: <Icon name="home" category="navigation" size="sm" />
  },
  {
    id: 'test-icons',
    label: 'アイコンテスト',
    href: '/test-icons',
    icon: <Icon name="settings" category="navigation" size="sm" />,
    isActive: true
  },
  {
    id: 'expenses',
    label: '支出一覧',
    href: '/expenses',
    icon: <Icon name="analytics" category="navigation" size="sm" />
  }
]

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

interface PaymentMethod {
  id: string
  name: string
  icon: string
}

export default function TestIconsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  // データベースからカテゴリとペイメント方法を取得
  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      
      // カテゴリを取得
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name, icon, color')
        .order('display_order')
      
      if (categoriesError) throw categoriesError
      
      // 支払方法を取得
      const { data: paymentMethodsData, error: paymentMethodsError } = await supabase
        .from('payment_methods')
        .select('id, name, icon')
        .order('display_order')
      
      if (paymentMethodsError) throw paymentMethodsError
      
      setCategories(categoriesData || [])
      setPaymentMethods(paymentMethodsData || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout sidebarItems={sidebarItems}>
      <div className="p-6 space-y-6">
        <PageHeader
          title="アイコンテスト"
          subtitle="データベースのSVGアイコンが正しく表示されているかを確認"
          breadcrumbs={[
            { label: 'ダッシュボード', href: '/dashboard' },
            { label: 'アイコンテスト' }
          ]}
        />

        {/* データ取得ボタン */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button onClick={fetchData} disabled={loading}>
                  {loading ? 'データ取得中...' : 'データベースからアイコンを取得'}
                </Button>
                <span className="text-sm text-primary-600">
                  データベースの更新が反映されているかをテストします
                </span>
              </div>
              {(categories.length > 0 || paymentMethods.length > 0) && (
                <div className="text-sm text-primary-700">
                  カテゴリ: {categories.length}件 | 支払方法: {paymentMethods.length}件
                </div>
              )}
            </div>
            {error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">エラー: {error}</p>
              </div>
            )}
          </CardContent>
        </Card>

          {/* カテゴリアイコンテスト */}
          {categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>カテゴリアイコン ({categories.length}件)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-3 p-3 border border-primary-200 rounded-lg">
                      <Icon 
                        name={category.icon} 
                        category="categories" 
                        size="md" 
                        variant="default" 
                      />
                      <div>
                        <div className="font-medium text-primary-900">{category.name}</div>
                        <div className="text-xs text-primary-500">{category.icon}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 支払方法アイコンテスト */}
          {paymentMethods.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>支払方法アイコン ({paymentMethods.length}件)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paymentMethods.map((paymentMethod) => (
                    <div key={paymentMethod.id} className="flex items-center gap-3 p-3 border border-primary-200 rounded-lg">
                      <Icon 
                        name={paymentMethod.icon} 
                        category="payments" 
                        size="md" 
                        variant="default" 
                      />
                      <div>
                        <div className="font-medium text-primary-900">{paymentMethod.name}</div>
                        <div className="text-xs text-primary-500">{paymentMethod.icon}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 新しいUIアイコンテスト */}
          <Card>
            <CardHeader>
              <CardTitle>新しいUIアイコン</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 border border-primary-200 rounded-lg">
                  <Icon name="store" category="ui" size="md" variant="default" />
                  <div>
                    <div className="font-medium text-primary-900">店舗</div>
                    <div className="text-xs text-primary-500">store.svg</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-primary-200 rounded-lg">
                  <Icon name="location" category="ui" size="md" variant="default" />
                  <div>
                    <div className="font-medium text-primary-900">場所</div>
                    <div className="text-xs text-primary-500">location.svg</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
  )
}