'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Icon } from '@/components/ui/Icon'
import { DateRangePicker, DateRange } from '@/components/ui/DateRangePicker'
import { cn } from '@/lib/utils/cn'

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
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  sort: SortState
  onSortChange: (sort: SortState) => void
  totalCount: number
  filteredCount: number
  viewMode?: 'card' | 'list' | 'table'
  className?: string
}

const CATEGORY_OPTIONS = [
  { value: '食事・飲み物', label: '食事・飲み物', icon: 'food' },
  { value: '交通費', label: '交通費', icon: 'transport' },
  { value: '教育・学習', label: '教育・学習', icon: 'education' },
  { value: '医療・健康', label: '医療・健康', icon: 'medical' },
  { value: '娯楽・趣味', label: '娯楽・趣味', icon: 'entertainment' },
  { value: '日用品', label: '日用品', icon: 'daily-goods' },
]

const PAYMENT_METHOD_OPTIONS = [
  { value: '現金', label: '現金', icon: 'cash' },
  { value: 'クレジットカード', label: 'クレジットカード', icon: 'credit-card' },
  { value: 'デビットカード', label: 'デビットカード', icon: 'debit-card' },
  { value: 'ICカード', label: 'ICカード', icon: 'IC' },
  { value: 'PayPay', label: 'PayPay', icon: 'paypay' },
  { value: '楽天Pay', label: '楽天Pay', icon: 'rakuten-pay' },
]

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
  totalCount,
  filteredCount,
  viewMode = 'card',
  className
}: ExpenseFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    onFiltersChange(newFilters)
  }

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    updateFilter('categories', newCategories)
  }

  const togglePaymentMethod = (method: string) => {
    const newMethods = filters.paymentMethods.includes(method)
      ? filters.paymentMethods.filter(m => m !== method)
      : [...filters.paymentMethods, method]
    updateFilter('paymentMethods', newMethods)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      dateFrom: '',
      dateTo: '',
      categories: [],
      paymentMethods: [],
      amountMin: '',
      amountMax: '',
      searchText: ''
    })
  }

  const hasActiveFilters = 
    filters.dateFrom || filters.dateTo || 
    filters.categories.length > 0 || filters.paymentMethods.length > 0 ||
    filters.amountMin || filters.amountMax || filters.searchText

  const toggleSort = (field: SortField) => {
    if (sort.field === field) {
      onSortChange({
        field,
        direction: sort.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSortChange({ field, direction: 'desc' })
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
              value={filters.searchText}
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
                variant={sort.field === option.field ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => toggleSort(option.field)}
                className="flex items-center"
              >
                {option.label}
                {sort.field === option.field && (
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
            <label className="block text-sm font-medium text-primary-700 mb-2">
              日付範囲
            </label>
            <DateRangePicker
              value={{ from: filters.dateFrom, to: filters.dateTo }}
              onChange={(range: DateRange) => {
                // 一度に両方の値を更新
                onFiltersChange({
                  ...filters,
                  dateFrom: range.from,
                  dateTo: range.to
                })
              }}
              placeholder="日付範囲を選択してください"
              className="w-80"
            />
          </div>

          {/* 金額フィルター */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              金額範囲
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="最小金額"
                value={filters.amountMin}
                onChange={(e) => updateFilter('amountMin', e.target.value)}
                className="w-32"
                size="sm"
              />
              <span className="text-primary-500">〜</span>
              <Input
                type="number"
                placeholder="最大金額"
                value={filters.amountMax}
                onChange={(e) => updateFilter('amountMax', e.target.value)}
                className="w-32"
                size="sm"
              />
              <span className="text-sm text-primary-500">円</span>
            </div>
          </div>

          {/* カテゴリフィルター */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              カテゴリ
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((category) => (
                <Button
                  key={category.value}
                  variant={filters.categories.includes(category.value) ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => toggleCategory(category.value)}
                  className="flex items-center"
                >
                  <Icon name={category.icon} category="categories" size="sm" className="mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 支払方法フィルター */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              支払方法
            </label>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHOD_OPTIONS.map((method) => (
                <Button
                  key={method.value}
                  variant={filters.paymentMethods.includes(method.value) ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => togglePaymentMethod(method.value)}
                  className="flex items-center"
                >
                  <Icon name={method.icon} category="payments" size="sm" className="mr-2" />
                  {method.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}