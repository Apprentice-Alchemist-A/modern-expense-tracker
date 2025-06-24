'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { ChartWrapper, EmptyState } from './ChartWrapper'
import { PeriodSelector } from './PeriodSelector'
import { formatCurrency, formatMonth } from '@/lib/utils/formatters'
import { CHART_CONFIG, DEFAULTS } from '@/lib/constants/dashboard'
import { TrendData, DashboardComponentProps, PeriodOption } from '@/types/dashboard'
import { TooltipProps } from '@/types/charts'
import { DashboardService } from '@/lib/supabase/dashboard'

interface ExpenseTrendChartProps extends DashboardComponentProps {
  initialData?: TrendData[]
  initialPeriod?: PeriodOption
}

export function ExpenseTrendChart({ initialData = [], initialPeriod = DEFAULTS.period, isLoading: parentLoading, className }: ExpenseTrendChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>(initialPeriod)
  const [data, setData] = useState<TrendData[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  
  const dashboardService = DashboardService.getInstance()
  
  // 期間変更処理
  const handlePeriodChange = useCallback(async (months: PeriodOption) => {
    setSelectedPeriod(months)
    setLoading(true)
    setError('')
    
    try {
      const newData = await dashboardService.getTrendData(months)
      setData(newData)
    } catch (err) {
      console.error('Failed to fetch trend data:', err)
      setError('グラフデータの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [dashboardService])
  
  // 初期データの設定
  useEffect(() => {
    if (initialData.length > 0) {
      setData(initialData)
    }
  }, [initialData])

  // 統計データの計算
  const stats = useMemo(() => {
    if (!data || data.length === 0) {
      return { maxAmount: 0, avgAmount: 0 }
    }
    
    const maxAmount = Math.max(...data.map(d => d.amount))
    const avgAmount = data.reduce((sum, d) => sum + d.amount, 0) / data.length
    
    return { maxAmount, avgAmount }
  }, [data])
  
  // カスタムツールチップ
  const CustomTooltip = useCallback(({ active, payload, label }: TooltipProps<TrendData>) => {
    if (!active || !payload?.length || !label) return null
    
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
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    
    return null
  }, [])

  // 凡例コンポーネント
  const ChartLegend = () => (
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
  )
  
  const isLoading = parentLoading || loading
  
  // エラー状態の場合
  if (error) {
    return (
      <ChartWrapper
        title="支出推移"
        isLoading={false}
        className={className}
        action={
          <div className="flex items-center gap-4">
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
            />
            <ChartLegend />
          </div>
        }
      >
        <EmptyState 
          icon="analytics" 
          message={error}
        />
      </ChartWrapper>
    )
  }

  // 空状態の場合
  if (!data || data.length === 0) {
    return (
      <ChartWrapper
        title="支出推移"
        isLoading={isLoading}
        className={className}
        action={
          <div className="flex items-center gap-4">
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
            />
            <ChartLegend />
          </div>
        }
      >
        <EmptyState icon="analytics" message="データがありません" />
      </ChartWrapper>
    )
  }

  const { maxAmount, avgAmount } = stats

  return (
    <ChartWrapper
      title="支出推移"
      isLoading={isLoading}
      className={className}
      action={
        <div className="flex items-center gap-4">
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
          />
          <ChartLegend />
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={DEFAULTS.chartHeight}>
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={CHART_CONFIG.gradients.primary.id} x1="0" y1="0" x2="0" y2="1">
              {CHART_CONFIG.gradients.primary.stops.map((stop, index) => (
                <stop 
                  key={index}
                  offset={stop.offset} 
                  stopColor={stop.color} 
                  stopOpacity={stop.opacity}
                />
              ))}
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_CONFIG.colors.grid} />
          <XAxis 
            dataKey="month" 
            tickFormatter={formatMonth}
            tick={{ fontSize: 12, fill: CHART_CONFIG.colors.textLight }}
            stroke={CHART_CONFIG.colors.grid}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12, fill: CHART_CONFIG.colors.textLight }}
            stroke={CHART_CONFIG.colors.grid}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* エリアチャート */}
          <Area
            type="monotone"
            dataKey="amount"
            stroke={CHART_CONFIG.lines.trend.stroke}
            strokeWidth={CHART_CONFIG.lines.trend.strokeWidth}
            fillOpacity={1}
            fill={`url(#${CHART_CONFIG.gradients.primary.id})`}
            dot={CHART_CONFIG.dots.normal}
            activeDot={CHART_CONFIG.dots.active}
          />
          
          {/* 平均線 */}
          <Line 
            type="monotone" 
            dataKey={() => avgAmount}
            stroke={CHART_CONFIG.lines.average.stroke}
            strokeDasharray={CHART_CONFIG.lines.average.strokeDasharray}
            strokeWidth={CHART_CONFIG.lines.average.strokeWidth}
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
    </ChartWrapper>
  )
}