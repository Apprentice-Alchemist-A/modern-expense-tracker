'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ChartWrapper, EmptyState } from './ChartWrapper'
import { formatCurrency, formatRelativeDate } from '@/lib/utils/formatters'
import { RecentExpense, DashboardComponentProps } from '@/types/dashboard'

interface RecentExpensesProps extends DashboardComponentProps {
  expenses: RecentExpense[]
}

export function RecentExpenses({ expenses, isLoading, className }: RecentExpensesProps) {
  const router = useRouter()

  // 空状態アクション
  const emptyAction = (
    <Button 
      variant="primary" 
      size="sm"
      onClick={() => router.push('/expenses/new')}
    >
      <Icon name="plus" category="ui" size="sm" className="mr-2" />
      支出を記録する
    </Button>
  )

  // ヘッダーアクション
  const headerAction = (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => router.push('/expenses')}
    >
      すべて見る
      <Icon name="arrow-right" category="ui" size="sm" className="ml-1" />
    </Button>
  )

  return (
    <ChartWrapper
      title="最近の支出"
      isLoading={isLoading}
      className={className}
      action={headerAction}
      emptyIcon="receipt"
      emptyMessage="まだ支出データがありません"
    >
      {!expenses || expenses.length === 0 ? (
        <EmptyState 
          icon="receipt" 
          message="まだ支出データがありません" 
          action={emptyAction}
        />
      ) : (
        <>
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
                      {formatRelativeDate(expense.date)} • {expense.categoryName}
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
        </>
      )}
    </ChartWrapper>
  )
}