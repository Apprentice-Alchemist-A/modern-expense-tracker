'use client'

import { useState, useCallback, useMemo } from 'react'

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface UsePaginationProps {
  initialPage?: number
  initialItemsPerPage?: number
  totalItems: number
}

export interface UsePaginationReturn extends PaginationState {
  setPage: (page: number) => void
  setItemsPerPage: (itemsPerPage: number) => void
  nextPage: () => void
  previousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  getItemRange: () => { start: number; end: number }
}

export function usePagination({
  initialPage = 1,
  initialItemsPerPage = 20,
  totalItems
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage)

  // 総ページ数を計算
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage)
  }, [totalItems, itemsPerPage])

  // ページ番号を設定（範囲チェック付き）
  const setPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
  }, [totalPages])

  // ページあたりアイテム数を設定（ページ番号もリセット）
  const setItemsPerPage = useCallback((newItemsPerPage: number) => {
    setItemsPerPageState(newItemsPerPage)
    // 現在のアイテム位置を保持してページ番号を調整
    const currentItemIndex = (currentPage - 1) * itemsPerPage
    const newPage = Math.floor(currentItemIndex / newItemsPerPage) + 1
    setCurrentPage(Math.max(1, newPage))
  }, [currentPage, itemsPerPage])

  // ナビゲーション関数
  const nextPage = useCallback(() => {
    setPage(currentPage + 1)
  }, [currentPage, setPage])

  const previousPage = useCallback(() => {
    setPage(currentPage - 1)
  }, [currentPage, setPage])

  const goToFirstPage = useCallback(() => {
    setPage(1)
  }, [setPage])

  const goToLastPage = useCallback(() => {
    setPage(totalPages)
  }, [setPage, totalPages])

  // ナビゲーション可能性チェック
  const canGoNext = useMemo(() => {
    return currentPage < totalPages
  }, [currentPage, totalPages])

  const canGoPrevious = useMemo(() => {
    return currentPage > 1
  }, [currentPage])

  // 現在のページのアイテム範囲を取得
  const getItemRange = useCallback(() => {
    const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, totalItems)
    return { start, end }
  }, [currentPage, itemsPerPage, totalItems])

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    setPage,
    setItemsPerPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    canGoNext,
    canGoPrevious,
    getItemRange
  }
}