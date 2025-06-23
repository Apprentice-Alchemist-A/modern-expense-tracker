'use client'

import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { SortField, SortDirection, SortState } from './ExpenseFilters'

interface ExpenseTableProps {
  expenses: Array<{
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
  }>
  sort?: SortState
  onSortChange?: (sort: SortState) => void
  onEdit?: (expenseId: string) => void
  onDelete?: (expenseId: string) => void
  onView?: (expenseId: string) => void
}

export function ExpenseTable({ expenses, sort, onSortChange, onEdit, onDelete, onView }: ExpenseTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }

  const handleSort = (field: SortField) => {
    if (!onSortChange) return
    
    if (sort?.field === field) {
      // 同じフィールドの場合は方向を切り替え
      onSortChange({
        field,
        direction: sort.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {
      // 異なるフィールドの場合は降順で開始
      onSortChange({ field, direction: 'desc' })
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sort?.field !== field) {
      return <Icon name="chevron-up" category="ui" size="xs" className="opacity-30" />
    }
    return (
      <Icon 
        name={sort.direction === 'asc' ? 'chevron-up' : 'chevron-down'} 
        category="ui" 
        size="xs" 
        className="opacity-70" 
      />
    )
  }

  const SortableHeader = ({ field, children, align = 'left' }: { 
    field: SortField
    children: React.ReactNode
    align?: 'left' | 'right' | 'center'
  }) => (
    <th 
      className={cn(
        "py-3 px-4 font-medium text-primary-700 select-none",
        onSortChange && "cursor-pointer hover:bg-primary-50 transition-colors",
        sort?.field === field && "bg-primary-50",
        align === 'right' && "text-right",
        align === 'center' && "text-center",
        align === 'left' && "text-left"
      )}
      onClick={() => handleSort(field)}
    >
      <div className={cn(
        "flex items-center gap-1",
        align === 'right' && "justify-end",
        align === 'center' && "justify-center"
      )}>
        {children}
        {onSortChange && getSortIcon(field)}
      </div>
    </th>
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-primary-200">
            <SortableHeader field="date">日付</SortableHeader>
            <SortableHeader field="title">タイトル</SortableHeader>
            <SortableHeader field="category">カテゴリ</SortableHeader>
            <SortableHeader field="payment">支払方法</SortableHeader>
            <SortableHeader field="amount" align="right">金額</SortableHeader>
            {(onView || onEdit || onDelete) && (
              <th className="text-center py-3 px-4 font-medium text-primary-700">アクション</th>
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr 
              key={expense.id} 
              className="border-b border-primary-100 hover:bg-primary-50 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-primary-600">
                {formatDate(expense.date)}
              </td>
              <td className="py-3 px-4">
                <div className="font-medium text-primary-900 truncate max-w-48">
                  {expense.title}
                </div>
                {expense.memo && (
                  <div className="text-xs text-primary-500 truncate max-w-48 mt-1">
                    {expense.memo}
                  </div>
                )}
              </td>
              <td className="py-3 px-4">
                {expense.category ? (
                  <div className="flex items-center gap-2">
                    <Icon name={expense.category.icon} category="categories" size="xs" variant="default" />
                    <span className="text-sm text-primary-700">{expense.category.name}</span>
                  </div>
                ) : (
                  <span className="text-xs text-primary-400">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                {expense.paymentMethod ? (
                  <div className="flex items-center gap-2">
                    <Icon name={expense.paymentMethod.icon} category="payments" size="xs" variant="default" />
                    <span className="text-sm text-primary-700">{expense.paymentMethod.name}</span>
                  </div>
                ) : (
                  <span className="text-xs text-primary-400">-</span>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                <span className="font-semibold text-primary-900">
                  {formatAmount(expense.total)}
                </span>
              </td>
              {(onView || onEdit || onDelete) && (
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-1">
                    {onView && (
                      <Button 
                        variant="ghost" 
                        size="xs"
                        onClick={() => onView(expense.id)}
                        title="詳細を表示"
                      >
                        <Icon name="eye" category="ui" size="xs" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button 
                        variant="ghost" 
                        size="xs"
                        onClick={() => onEdit(expense.id)}
                        title="編集"
                      >
                        <Icon name="edit" category="ui" size="xs" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button 
                        variant="ghost" 
                        size="xs"
                        onClick={() => onDelete(expense.id)}
                        title="削除"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Icon name="trash" category="ui" size="xs" />
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}