'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils/cn'

interface CategoryData {
  categoryId: string
  categoryName: string
  categoryIcon: string
  categoryColor: string
  amount: number
  percentage: number
}

interface CategoryPieChartProps {
  data: CategoryData[]
  isLoading?: boolean
  className?: string
}

export function CategoryPieChart({ data, isLoading, className }: CategoryPieChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }
  
  // Rechartsのカスタムツールチップ
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Icon 
              name={data.categoryIcon} 
              category="categories" 
              size="sm" 
              className="flex-shrink-0"
            />
            <p className="font-medium text-primary-900">{data.categoryName}</p>
          </div>
          <p className="text-sm text-primary-700">{formatCurrency(data.amount)}</p>
          <p className="text-xs text-primary-500">{data.percentage.toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }
  
  // カスタムレジェンド
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-primary-700 truncate">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>カテゴリ別支出</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="w-48 h-48 bg-primary-200 rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>カテゴリ別支出</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Icon name="analytics" category="ui" size="lg" className="mx-auto mb-4 text-primary-400" />
              <p className="text-primary-600">今月のデータはまだありません</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  // 上位5カテゴリ + その他
  const topCategories = data.slice(0, 5)
  const othersAmount = data.slice(5).reduce((sum, cat) => sum + cat.amount, 0)
  const othersPercentage = data.slice(5).reduce((sum, cat) => sum + cat.percentage, 0)
  
  const chartData = [...topCategories]
  if (othersAmount > 0) {
    chartData.push({
      categoryId: 'others',
      categoryName: 'その他',
      categoryIcon: 'help',
      categoryColor: '#9ca3af',
      amount: othersAmount,
      percentage: othersPercentage
    })
  }
  
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader>
        <CardTitle>カテゴリ別支出</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="amount"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.categoryColor} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* カテゴリ別詳細リスト */}
        <div className="mt-6 space-y-2">
          {topCategories.slice(0, 3).map((category) => (
            <div key={category.categoryId} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.categoryColor }}
                />
                <Icon 
                  name={category.categoryIcon} 
                  category="categories" 
                  size="sm" 
                />
                <span className="text-sm text-primary-700">{category.categoryName}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary-900">
                  {formatCurrency(category.amount)}
                </p>
                <p className="text-xs text-primary-500">{category.percentage.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}