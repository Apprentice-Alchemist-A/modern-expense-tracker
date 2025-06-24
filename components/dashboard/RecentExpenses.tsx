'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface RecentExpense {
  id: string
  title: string
  date: string
  amount: number
  categoryName: string
  categoryIcon: string
  categoryColor: string
}

interface RecentExpensesProps {
  expenses: RecentExpense[]
  isLoading?: boolean
  className?: string
}

export function RecentExpenses({ expenses, isLoading, className }: RecentExpensesProps) {
  const router = useRouter()
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    // 今日・昨日の判定
    if (date.toDateString() === today.toDateString()) {
      return '今日'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨日'
    }
    
    // 今年の場合は年を省略
    if (date.getFullYear() === today.getFullYear()) {
      return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
    }
    
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>最近の支出</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-primary-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-primary-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-5 w-20 bg-primary-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (!expenses || expenses.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>最近の支出</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Icon name="receipt" category="ui" size="lg" className="mx-auto mb-4 text-primary-400" />
            <p className="text-primary-600 mb-4">まだ支出データがありません</p>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => router.push('/expenses/new')}
            >
              <Icon name="plus" category="ui" size="sm" className="mr-2" />
              支出を記録する
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>最近の支出</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/expenses')}
        >
          すべて見る
          <Icon name="arrow-right" category="ui" size="sm" className="ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {expenses.map((expense) => (
            <div 
              key={expense.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer"
              onClick={() => router.push(`/expenses/${expense.id}/edit`)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${expense.categoryColor}20` }}
                >
                  <Icon 
                    name={expense.categoryIcon} 
                    category="categories" 
                    size="sm"
                    style={{ color: expense.categoryColor }}
                  />
                </div>
                <div>
                  <p className="font-medium text-primary-900 line-clamp-1">
                    {expense.title}
                  </p>
                  <p className="text-xs text-primary-500">
                    {formatDate(expense.date)} • {expense.categoryName}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-900">
                  {formatCurrency(expense.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {expenses.length >= 10 && (
          <div className="mt-4 pt-4 border-t border-primary-100">
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full"
              onClick={() => router.push('/expenses')}
            >
              すべての支出を見る
              <Icon name="arrow-right" category="ui" size="sm" className="ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}