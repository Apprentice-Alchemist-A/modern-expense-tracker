'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'

interface MonthlySummaryProps {
  total: number
  change: number // パーセンテージ
  isLoading?: boolean
  className?: string
}

export function MonthlySummary({ total, change, isLoading, className }: MonthlySummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }
  
  const formatChange = (change: number) => {
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }
  
  const isIncrease = change > 0
  const changeColor = isIncrease ? 'text-error' : 'text-success'
  const changeIcon = isIncrease ? 'trending-up' : 'trending-down'
  
  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-primary-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-primary-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-32 bg-primary-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-primary-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-primary-600">今月の支出</h3>
            <Icon name="analytics" category="ui" size="sm" className="text-primary-400" />
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold text-primary-900">
              {formatCurrency(total)}
            </div>
            
            {change !== 0 && (
              <div className={cn("flex items-center gap-1 text-sm", changeColor)}>
                <Icon name={changeIcon} category="ui" size="xs" />
                <span className="font-medium">{formatChange(change)}</span>
                <span className="text-primary-600">前月比</span>
              </div>
            )}
          </div>
          
          <div className="pt-2 border-t border-primary-100">
            <div className="flex items-center justify-between text-xs text-primary-600">
              <span>{new Date().getMonth() + 1}月の支出合計</span>
              <span className="text-primary-400">
                {new Date().toLocaleDateString('ja-JP', { 
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric' 
                })}時点
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}