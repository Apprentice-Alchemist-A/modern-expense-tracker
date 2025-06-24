/**
 * チャートライブラリ（Recharts）用の型定義
 */

// Rechartsのツールチップ用型定義
export interface TooltipProps<T = any> {
  active?: boolean
  payload?: Array<{
    value: number
    payload: T
    dataKey?: string
    color?: string
    name?: string
  }>
  label?: string
}

// Rechartsのレジェンド用型定義
export interface LegendProps {
  payload?: Array<{
    value: string
    type?: string
    id?: string
    color?: string
  }>
  iconType?: string
  layout?: 'horizontal' | 'vertical'
  align?: 'left' | 'center' | 'right'
  verticalAlign?: 'top' | 'middle' | 'bottom'
}