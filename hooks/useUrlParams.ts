'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ExpenseFilters, ExpenseSort } from '@/lib/supabase/queries'

export interface UrlParamsState {
  filters: ExpenseFilters
  sort: ExpenseSort | null
  page: number
  itemsPerPage: number
}

export interface UseUrlParamsReturn {
  state: UrlParamsState
  updateFilters: (filters: ExpenseFilters) => void
  updateSort: (sort: ExpenseSort | null) => void
  updatePage: (page: number) => void
  updateItemsPerPage: (itemsPerPage: number) => void
  resetAll: () => void
}

// デフォルト値
const DEFAULT_STATE: UrlParamsState = {
  filters: {},
  sort: null,
  page: 1,
  itemsPerPage: 20
}

// URLパラメータのキー定義
const PARAM_KEYS = {
  // フィルター
  dateFrom: 'date_from',
  dateTo: 'date_to',
  categories: 'categories',
  paymentMethods: 'payment_methods',
  amountMin: 'amount_min',
  amountMax: 'amount_max',
  searchText: 'search',
  // ソート
  sortField: 'sort_field',
  sortDirection: 'sort_dir',
  // ページネーション
  page: 'page',
  itemsPerPage: 'per_page'
} as const

/**
 * URLパラメータとアプリケーション状態を同期するカスタムフック
 */
export function useUrlParams(): UseUrlParamsReturn {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URLパラメータから状態を読み込み（メモ化で循環参照を防ぐ）
  const parseStateFromUrl = useCallback((): UrlParamsState => {
    const filters: ExpenseFilters = {}
    
    // フィルター条件の復元
    const dateFrom = searchParams.get(PARAM_KEYS.dateFrom)
    if (dateFrom) filters.dateFrom = dateFrom
    
    const dateTo = searchParams.get(PARAM_KEYS.dateTo)
    if (dateTo) filters.dateTo = dateTo
    
    const categories = searchParams.get(PARAM_KEYS.categories)
    if (categories) filters.categories = categories.split(',').filter(Boolean)
    
    const paymentMethods = searchParams.get(PARAM_KEYS.paymentMethods)
    if (paymentMethods) filters.paymentMethods = paymentMethods.split(',').filter(Boolean)
    
    const amountMin = searchParams.get(PARAM_KEYS.amountMin)
    if (amountMin) filters.amountMin = amountMin
    
    const amountMax = searchParams.get(PARAM_KEYS.amountMax)
    if (amountMax) filters.amountMax = amountMax
    
    const searchText = searchParams.get(PARAM_KEYS.searchText)
    if (searchText) filters.searchText = searchText

    // ソート条件の復元
    let sort: ExpenseSort | null = null
    const sortField = searchParams.get(PARAM_KEYS.sortField)
    const sortDirection = searchParams.get(PARAM_KEYS.sortDirection)
    
    if (sortField && sortDirection && 
        ['date', 'amount', 'title', 'category', 'payment'].includes(sortField) &&
        ['asc', 'desc'].includes(sortDirection)) {
      sort = {
        field: sortField as ExpenseSort['field'],
        direction: sortDirection as ExpenseSort['direction']
      }
    }

    // ページネーション情報の復元
    const page = parseInt(searchParams.get(PARAM_KEYS.page) || '1', 10)
    const itemsPerPage = parseInt(searchParams.get(PARAM_KEYS.itemsPerPage) || '20', 10)

    return {
      filters,
      sort,
      page: Math.max(1, page),
      itemsPerPage: [10, 20, 50, 100].includes(itemsPerPage) ? itemsPerPage : 20
    }
  }, [searchParams.toString()]) // searchParamsの文字列化で安定化

  // 状態をURLパラメータに変換
  const buildUrlParams = useCallback((state: UrlParamsState): URLSearchParams => {
    const params = new URLSearchParams()

    // フィルター条件の設定
    if (state.filters.dateFrom) {
      params.set(PARAM_KEYS.dateFrom, state.filters.dateFrom)
    }
    if (state.filters.dateTo) {
      params.set(PARAM_KEYS.dateTo, state.filters.dateTo)
    }
    if (state.filters.categories && state.filters.categories.length > 0) {
      params.set(PARAM_KEYS.categories, state.filters.categories.join(','))
    }
    if (state.filters.paymentMethods && state.filters.paymentMethods.length > 0) {
      params.set(PARAM_KEYS.paymentMethods, state.filters.paymentMethods.join(','))
    }
    if (state.filters.amountMin) {
      params.set(PARAM_KEYS.amountMin, state.filters.amountMin)
    }
    if (state.filters.amountMax) {
      params.set(PARAM_KEYS.amountMax, state.filters.amountMax)
    }
    if (state.filters.searchText) {
      params.set(PARAM_KEYS.searchText, state.filters.searchText)
    }

    // ソート条件の設定
    if (state.sort) {
      params.set(PARAM_KEYS.sortField, state.sort.field)
      params.set(PARAM_KEYS.sortDirection, state.sort.direction)
    }

    // ページネーション情報の設定（デフォルト値以外のみ）
    if (state.page !== 1) {
      params.set(PARAM_KEYS.page, state.page.toString())
    }
    if (state.itemsPerPage !== 20) {
      params.set(PARAM_KEYS.itemsPerPage, state.itemsPerPage.toString())
    }

    return params
  }, [])

  // URLを更新（スロットリングで頻繁な更新を制御）
  const updateUrl = useCallback((newState: UrlParamsState) => {
    const params = buildUrlParams(newState)
    const paramString = params.toString()
    const newUrl = paramString ? `?${paramString}` : ''
    const currentUrl = searchParams.toString() ? `?${searchParams.toString()}` : ''
    
    // 現在のURLと異なる場合のみ更新
    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false })
    }
  }, [router, searchParams.toString(), buildUrlParams])

  // 現在の状態を取得（useMemoで安定化）
  const currentState = useMemo(() => parseStateFromUrl(), [parseStateFromUrl])

  // 状態更新関数（無限ループを防ぐため、直接URLを操作）
  const updateFilters = useCallback((filters: ExpenseFilters) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // 既存のフィルターパラメータを削除
    Object.values(PARAM_KEYS).forEach(key => {
      if (key !== PARAM_KEYS.page && key !== PARAM_KEYS.itemsPerPage) {
        params.delete(key)
      }
    })
    
    // 新しいフィルターを設定
    if (filters.dateFrom) params.set(PARAM_KEYS.dateFrom, filters.dateFrom)
    if (filters.dateTo) params.set(PARAM_KEYS.dateTo, filters.dateTo)
    if (filters.categories?.length) params.set(PARAM_KEYS.categories, filters.categories.join(','))
    if (filters.paymentMethods?.length) params.set(PARAM_KEYS.paymentMethods, filters.paymentMethods.join(','))
    if (filters.amountMin) params.set(PARAM_KEYS.amountMin, filters.amountMin)
    if (filters.amountMax) params.set(PARAM_KEYS.amountMax, filters.amountMax)
    if (filters.searchText) params.set(PARAM_KEYS.searchText, filters.searchText)
    
    // ページを1にリセット
    params.delete(PARAM_KEYS.page)
    
    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(newUrl, { scroll: false })
  }, [searchParams.toString(), router])

  const updateSort = useCallback((sort: ExpenseSort | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // ソートパラメータを削除
    params.delete(PARAM_KEYS.sortField)
    params.delete(PARAM_KEYS.sortDirection)
    
    // 新しいソートを設定
    if (sort) {
      params.set(PARAM_KEYS.sortField, sort.field)
      params.set(PARAM_KEYS.sortDirection, sort.direction)
    }
    
    // ページを1にリセット
    params.delete(PARAM_KEYS.page)
    
    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(newUrl, { scroll: false })
  }, [searchParams.toString(), router])

  const updatePage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (page !== 1) {
      params.set(PARAM_KEYS.page, page.toString())
    } else {
      params.delete(PARAM_KEYS.page)
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(newUrl, { scroll: false })
  }, [searchParams.toString(), router])

  const updateItemsPerPage = useCallback((itemsPerPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (itemsPerPage !== 20) {
      params.set(PARAM_KEYS.itemsPerPage, itemsPerPage.toString())
    } else {
      params.delete(PARAM_KEYS.itemsPerPage)
    }
    
    // ページを1にリセット
    params.delete(PARAM_KEYS.page)
    
    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(newUrl, { scroll: false })
  }, [searchParams.toString(), router])

  const resetAll = useCallback(() => {
    router.push('', { scroll: false })
  }, [router])

  return {
    state: currentState,
    updateFilters,
    updateSort,
    updatePage,
    updateItemsPerPage,
    resetAll
  }
}