'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'

interface TopCategory {
  categoryName: string
  categoryIcon: string
  categoryColor: string
  amount: number
  count: number
}

interface TopCategoriesProps {
  categories: TopCategory[]
  isLoading?: boolean
  className?: string
}

export function TopCategories({ categories, isLoading, className }: TopCategoriesProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }
  
  // 最大金額を取得（プログレスバーの幅計算用）
  const maxAmount = categories.length > 0 
    ? Math.max(...categories.map(c => c.amount))
    : 0
  
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>よく使うカテゴリ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-primary-200 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-16 bg-primary-200 rounded animate-pulse" />
                </div>
                <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-200 animate-pulse" style={{ width: `${80 - i * 15}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (!categories || categories.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>よく使うカテゴリ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Icon name="help" category="ui" size="lg" className="mx-auto mb-4 text-primary-400" />
            <p className="text-primary-600">データがありません</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={cn("card-interactive", className)}>
      <CardHeader>
        <CardTitle>よく使うカテゴリ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={`${category.categoryName}-${index}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.categoryColor}20` }}
                  >
                    <Icon 
                      name={category.categoryIcon} 
                      category="categories" 
                      size="sm"
                      style={{ color: category.categoryColor }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">
                      {category.categoryName}
                    </p>
                    <p className="text-xs text-primary-500">
                      {category.count}回
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-900">
                    {formatCurrency(category.amount)}
                  </p>
                </div>
              </div>
              
              {/* プログレスバー */}
              <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{ 
                    width: `${(category.amount / maxAmount) * 100}%`,
                    backgroundColor: category.categoryColor
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* 合計 */}
        <div className="mt-6 pt-4 border-t border-primary-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-600">合計</span>
            <span className="font-semibold text-primary-900">
              {formatCurrency(categories.reduce((sum, cat) => sum + cat.amount, 0))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}