'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Icon } from '@/components/ui/Icon'
import { DateRangePicker, DateRange } from '@/components/ui/DateRangePicker'
import { useMasterDataFilters } from '@/hooks/useMasterDataFilters'
import { cn } from '@/lib/utils/cn'
import { ExpenseFilters as ExpenseFiltersType, ExpenseSort } from '@/lib/supabase/queries'

// 旧フィルター型の定義（後方互換性のため残す）
export interface FilterState {
  dateFrom: string
  dateTo: string
  categories: string[]
  paymentMethods: string[]
  amountMin: string
  amountMax: string
  searchText: string
}

export type SortField = 'date' | 'amount' | 'category' | 'store' | 'payment' | 'title'
export type SortDirection = 'asc' | 'desc'

export interface SortState {
  field: SortField
  direction: SortDirection
}

interface ExpenseFiltersProps {
  filters: ExpenseFiltersType
  onFiltersChange: (filters: ExpenseFiltersType) => void
  sort: ExpenseSort | undefined
  onSortChange: (sort: ExpenseSort | undefined) => void
  onResetAll?: () => void
  totalCount: number
  filteredCount: number
  viewMode?: 'card' | 'list' | 'table'
  className?: string
}

// 静的データは削除し、動的データを使用

const SORT_OPTIONS = [
  { field: 'date' as SortField, label: '日付' },
  { field: 'amount' as SortField, label: '金額' },
  { field: 'title' as SortField, label: 'タイトル' },
  { field: 'category' as SortField, label: 'カテゴリ' },
  { field: 'payment' as SortField, label: '支払方法' },
  { field: 'store' as SortField, label: '店舗' },
]

export function ExpenseFilters({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  onResetAll,
  totalCount,
  filteredCount,
  viewMode = 'card',
  className
}: ExpenseFiltersProps) {
  const { categories, paymentMethods, loading: masterDataLoading, error: masterDataError } = useMasterDataFilters()
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof ExpenseFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value }
    onFiltersChange(newFilters)
  }

  const toggleCategory = (category: string) => {
    const currentCategories = filters.categories || []
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category]
    updateFilter('categories', newCategories)
  }

  const togglePaymentMethod = (method: string) => {
    const currentMethods = filters.paymentMethods || []
    const newMethods = currentMethods.includes(method)
      ? currentMethods.filter(m => m !== method)
      : [...currentMethods, method]
    updateFilter('paymentMethods', newMethods)
  }

  const clearAllFilters = () => {
    if (onResetAll) {
      // resetAll関数が提供されている場合は、それを使う（推奨）
      onResetAll()
    } else {
      // フォールバック: 個別にクリア
      onFiltersChange({})
      onSortChange(undefined)
    }
  }

  const hasActiveFilters = !!(
    filters.dateFrom || filters.dateTo || 
    (filters.categories && filters.categories.length > 0) || 
    (filters.paymentMethods && filters.paymentMethods.length > 0) ||
    filters.amountMin || filters.amountMax || filters.searchText || sort
  )

  const toggleSort = (field: SortField) => {
    // SortFieldをExpenseSortのfieldにマップ
    let newField: ExpenseSort['field']
    switch (field) {
      case 'store':
        newField = 'category'
        break
      case 'date':
      case 'amount':
      case 'title':
      case 'category':
      case 'payment':
        newField = field
        break
      default:
        newField = 'date'
    }
    
    if (sort && sort.field === newField) {
      onSortChange({
        field: newField,
        direction: sort.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSortChange({ field: newField, direction: 'desc' })
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* フィルターヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant={isExpanded ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name="search" category="ui" size="sm" className="mr-2" />
            フィルター
            <Icon 
              name="chevron-down" 
              category="ui" 
              size="sm" 
              className={cn("ml-2 transition-transform", isExpanded && "rotate-180")} 
            />
          </Button>

          {/* クイック検索 */}
          <div className="relative">
            <Icon name="search" category="ui" size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
            <Input
              placeholder="店舗名、メモで検索..."
              value={filters.searchText || ''}
              onChange={(e) => updateFilter('searchText', e.target.value)}
              className="pl-10 w-64"
              size="sm"
            />
          </div>

          {/* アクティブフィルター数 */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-primary-600">
                {filteredCount}/{totalCount}件表示
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-primary-500 hover:text-primary-700"
              >
                <Icon name="x" category="ui" size="sm" className="mr-1" />
                クリア
              </Button>
            </div>
          )}
        </div>

        {/* ソート（テーブル表示以外で表示） */}
        {viewMode !== 'table' && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-primary-600">並び替え:</span>
            {SORT_OPTIONS.map((option) => (
              <Button
                key={option.field}
                variant={sort && (sort.field === option.field || (option.field === 'store' && sort.field === 'category')) ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => toggleSort(option.field)}
                className="flex items-center"
              >
                {option.label}
                {sort && (sort.field === option.field || (option.field === 'store' && sort.field === 'category')) && (
                  <Icon 
                    name={sort.direction === 'asc' ? 'chevron-up' : 'chevron-down'} 
                    category="ui" 
                    size="sm" 
                    className="ml-1" 
                  />
                )}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* 詳細フィルター */}
      {isExpanded && (
        <div className="bg-primary-50 rounded-lg p-4 space-y-4">
          {/* 日付フィルター */}
          <div>
            <label className="form-label">
              日付範囲
            </label>
            <DateRangePicker
              value={{ from: filters.dateFrom || null, to: filters.dateTo || null }}
              onChange={(range: DateRange) => {
                // 一度に両方の値を更新
                onFiltersChange({
                  ...filters,
                  dateFrom: range.from || undefined,
                  dateTo: range.to || undefined
                })
              }}
              allowClear={true}
              placeholder="日付範囲を選択してください"
              className="w-80"
            />
          </div>

          {/* 金額フィルター */}
          <div>
            <label className="form-label">
              金額範囲
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="最小金額"
                value={filters.amountMin || ''}
                onChange={(e) => updateFilter('amountMin', e.target.value)}
                className="w-32"
                size="sm"
              />
              <span className="text-primary-500">〜</span>
              <Input
                type="number"
                placeholder="最大金額"
                value={filters.amountMax || ''}
                onChange={(e) => updateFilter('amountMax', e.target.value)}
                className="w-32"
                size="sm"
              />
              <span className="text-sm text-primary-500">円</span>
            </div>
          </div>

          {/* カテゴリフィルター */}
          <div>
            <label className="form-label">
              カテゴリ
            </label>
            {masterDataLoading ? (
              <div className="text-sm text-primary-500">読み込み中...</div>
            ) : masterDataError ? (
              <div className="text-sm text-error-500">データ取得エラー: {masterDataError}</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={(filters.categories || []).includes(category.value) ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => toggleCategory(category.value)}
                    className="flex items-center"
                  >
                    <Icon name={category.icon} category="categories" size="sm" className="mr-2" />
                    {category.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* 支払方法フィルター */}
          <div>
            <label className="form-label">
              支払方法
            </label>
            {masterDataLoading ? (
              <div className="text-sm text-primary-500">読み込み中...</div>
            ) : masterDataError ? (
              <div className="text-sm text-error-500">データ取得エラー: {masterDataError}</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.value}
                    variant={(filters.paymentMethods || []).includes(method.value) ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => togglePaymentMethod(method.value)}
                    className="flex items-center"
                  >
                    <Icon name={method.icon} category="payments" size="sm" className="mr-2" />
                    {method.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}