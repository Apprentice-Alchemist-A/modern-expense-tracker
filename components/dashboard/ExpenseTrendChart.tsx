'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { cn } from '@/lib/utils/cn'

interface TrendData {
  month: string
  amount: number
}

interface ExpenseTrendChartProps {
  data: TrendData[]
  isLoading?: boolean
  className?: string
  onPeriodChange?: (months: number) => void
}

export function ExpenseTrendChart({ data, isLoading, className, onPeriodChange }: ExpenseTrendChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(6)
  
  // 期間変更処理
  const handlePeriodChange = (months: number) => {
    setSelectedPeriod(months)
    if (onPeriodChange) {
      onPeriodChange(months)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }
  
  const formatMonth = (monthStr: string | undefined | null) => {
    // 防御的チェック
    if (!monthStr || typeof monthStr !== 'string') {
      return '不明'
    }
    
    const parts = monthStr.split('-')
    if (parts.length !== 2) {
      return monthStr // 元の値を返す
    }
    
    const [year, month] = parts
    return `${parseInt(month)}月`
  }
  
  // カスタムツールチップ
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && label) {
      // 防御的チェック
      if (typeof label !== 'string' || !label.includes('-')) {
        return (
          <div className="bg-white p-3 shadow-lg rounded-lg border border-primary-200">
            <p className="font-medium text-primary-900">データエラー</p>
          </div>
        )
      }
      
      const parts = label.split('-')
      if (parts.length === 2) {
        const [year, month] = parts
        return (
          <div className="bg-white p-3 shadow-lg rounded-lg border border-primary-200">
            <p className="font-medium text-primary-900">{year}年{parseInt(month)}月</p>
            <p className="text-lg font-semibold text-primary-700">
              {new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY'
              }).format(payload[0].value)}
            </p>
          </div>
        )
      }
    }
    return null
  }
  
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>支出推移</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full h-full bg-primary-100 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>支出推移</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Icon name="analytics" category="ui" size="lg" className="mx-auto mb-4 text-primary-400" />
              <p className="text-primary-600">データがありません</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  // 最大値と平均値を計算
  const maxAmount = Math.max(...data.map(d => d.amount))
  const avgAmount = data.reduce((sum, d) => sum + d.amount, 0) / data.length
  
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>支出推移</CardTitle>
          <div className="flex items-center gap-4">
            {/* 期間選択ボタン */}
            <div className="flex items-center gap-1 bg-primary-50 rounded-lg p-1">
              {[3, 6, 12].map((months) => (
                <Button
                  key={months}
                  variant={selectedPeriod === months ? 'primary' : 'ghost'}
                  size="sm"
                  className="px-3 py-1 h-8 text-xs"
                  onClick={() => handlePeriodChange(months)}
                >
                  {months}ヶ月
                </Button>
              ))}
            </div>
            
            {/* 凡例 */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary-500" />
                <span className="text-primary-600">支出額</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary-300 border-dashed border-b-2 border-primary-300" />
                <span className="text-primary-600">平均</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tickFormatter={formatMonth}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              stroke="#e5e7eb"
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              stroke="#e5e7eb"
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* エリアチャート */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#4f46e5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2, fill: '#ffffff' }}
            />
            
            {/* 平均線 */}
            <Line 
              type="monotone" 
              dataKey={() => avgAmount}
              stroke="#9ca3af"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* 統計情報 */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-primary-500">平均支出</p>
            <p className="font-semibold text-primary-900">
              {formatCurrency(avgAmount)}
            </p>
          </div>
          <div>
            <p className="text-primary-500">最高支出</p>
            <p className="font-semibold text-primary-900">
              {formatCurrency(maxAmount)}
            </p>
          </div>
          <div>
            <p className="text-primary-500">対象期間</p>
            <p className="font-semibold text-primary-900">
              過去{selectedPeriod}ヶ月
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}