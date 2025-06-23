'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  className?: string
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100]

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  className
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // ページ番号のリストを生成
  const getVisiblePages = () => {
    const visiblePages: (number | 'ellipsis')[] = []
    const maxVisible = 7 // 表示する最大ページ数

    if (totalPages <= maxVisible) {
      // 全ページを表示
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i)
      }
    } else {
      // 省略記号付きで表示
      if (currentPage <= 4) {
        // 前半部分
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i)
        }
        visiblePages.push('ellipsis')
        visiblePages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        // 後半部分
        visiblePages.push(1)
        visiblePages.push('ellipsis')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          visiblePages.push(i)
        }
      } else {
        // 中間部分
        visiblePages.push(1)
        visiblePages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          visiblePages.push(i)
        }
        visiblePages.push('ellipsis')
        visiblePages.push(totalPages)
      }
    }

    return visiblePages
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {/* 左側: アイテム情報と表示件数選択 */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-primary-600">
          {startItem}-{endItem} / {totalItems}件
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-primary-600">表示件数:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="text-sm border border-primary-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}件
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 右側: ページネーション */}
      <div className="flex items-center space-x-1">
        {/* 最初のページ */}
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="p-2"
        >
          <Icon name="chevron-left" category="ui" size="sm" />
          <Icon name="chevron-left" category="ui" size="sm" className="-ml-1" />
        </Button>

        {/* 前のページ */}
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2"
        >
          <Icon name="chevron-left" category="ui" size="sm" />
        </Button>

        {/* ページ番号 */}
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === 'ellipsis' ? (
              <span className="px-2 py-1 text-primary-400">...</span>
            ) : (
              <Button
                variant={currentPage === page ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="min-w-[32px]"
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        {/* 次のページ */}
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2"
        >
          <Icon name="chevron-right" category="ui" size="sm" />
        </Button>

        {/* 最後のページ */}
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="p-2"
        >
          <Icon name="chevron-right" category="ui" size="sm" />
          <Icon name="chevron-right" category="ui" size="sm" className="-ml-1" />
        </Button>
      </div>
    </div>
  )
}