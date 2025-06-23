'use client'

import { useState, useMemo, useCallback } from 'react'
import { FilterState, SortState, SortField, SortDirection } from '@/components/expenses/ExpenseFilters'

export interface Expense {
  id: string
  title: string
  date: string
  total: number
  category: {
    id: string
    name: string
    icon: string
    color: string
  }
  paymentMethod: {
    id: string
    name: string
    icon: string
  }
  memo: string
  items: Array<{
    id: string
    name: string
    amount: number
    note: string
  }>
}

// テーブル用のソートフィールド追加
export type TableSortField = 'date' | 'amount' | 'category' | 'payment'

export function useExpenseFilters(expenses: Expense[]) {
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: '',
    dateTo: '',
    categories: [],
    paymentMethods: [],
    amountMin: '',
    amountMax: '',
    searchText: ''
  })

  const [sort, setSort] = useState<SortState>({
    field: 'date',
    direction: 'desc'
  })

  // フィルター処理
  const filteredExpenses = useMemo(() => {
    let result = [...expenses]

    // 日付フィルター
    if (filters.dateFrom) {
      result = result.filter(expense => expense.date >= filters.dateFrom)
    }
    if (filters.dateTo) {
      result = result.filter(expense => expense.date <= filters.dateTo)
    }

    // カテゴリフィルター
    if (filters.categories.length > 0) {
      result = result.filter(expense => 
        filters.categories.includes(expense.category.name)
      )
    }

    // 支払方法フィルター
    if (filters.paymentMethods.length > 0) {
      result = result.filter(expense => 
        filters.paymentMethods.includes(expense.paymentMethod.name)
      )
    }

    // 金額フィルター
    if (filters.amountMin) {
      const minAmount = parseFloat(filters.amountMin)
      if (!isNaN(minAmount)) {
        result = result.filter(expense => expense.total >= minAmount)
      }
    }
    if (filters.amountMax) {
      const maxAmount = parseFloat(filters.amountMax)
      if (!isNaN(maxAmount)) {
        result = result.filter(expense => expense.total <= maxAmount)
      }
    }

    // テキスト検索フィルター
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase()
      result = result.filter(expense => {
        const searchableText = [
          expense.title,
          expense.memo || '',
          expense.category.name,
          expense.paymentMethod.name,
          ...expense.items.map(item => item.name)
        ].join(' ').toLowerCase()
        
        return searchableText.includes(searchLower)
      })
    }

    return result
  }, [expenses, filters])

  // ソート処理
  const sortedExpenses = useMemo(() => {
    const result = [...filteredExpenses]

    result.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sort.field) {
        case 'date':
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
          break
        case 'amount':
          aValue = a.total
          bValue = b.total
          break
        case 'title':
          aValue = a.title
          bValue = b.title
          break
        case 'category':
          aValue = a.category.name
          bValue = b.category.name
          break
        case 'payment':
          aValue = a.paymentMethod.name
          bValue = b.paymentMethod.name
          break
        default:
          return 0
      }

      if (aValue < bValue) {
        return sort.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sort.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return result
  }, [filteredExpenses, sort])

  // フィルター更新
  const updateFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  // ソート更新
  const updateSort = useCallback((newSort: SortState) => {
    setSort(newSort)
  }, [])

  // フィルターリセット
  const resetFilters = useCallback(() => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      categories: [],
      paymentMethods: [],
      amountMin: '',
      amountMax: '',
      searchText: ''
    })
  }, [])

  // アクティブフィルターの確認
  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.dateFrom || 
      filters.dateTo || 
      filters.categories.length > 0 || 
      filters.paymentMethods.length > 0 ||
      filters.amountMin || 
      filters.amountMax || 
      filters.searchText
    )
  }, [filters])

  // 統計情報の計算
  const statistics = useMemo(() => {
    const total = sortedExpenses.reduce((sum, expense) => sum + expense.total, 0)
    const average = sortedExpenses.length > 0 ? total / sortedExpenses.length : 0

    return {
      count: sortedExpenses.length,
      total,
      average,
      max: sortedExpenses.length > 0 ? Math.max(...sortedExpenses.map(e => e.total)) : 0,
      min: sortedExpenses.length > 0 ? Math.min(...sortedExpenses.map(e => e.total)) : 0
    }
  }, [sortedExpenses])

  return {
    // データ
    expenses: sortedExpenses,
    originalCount: expenses.length,
    filteredCount: sortedExpenses.length,
    statistics,
    
    // フィルター状態
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
    
    // ソート状態
    sort,
    updateSort
  }
}