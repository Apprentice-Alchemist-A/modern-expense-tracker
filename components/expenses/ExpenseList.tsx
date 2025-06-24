'use client'

import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useDeleteConfirm } from '@/hooks/useDeleteConfirm'
import { cn } from '@/lib/utils/cn'

interface ExpenseListProps {
  expense: {
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
  className?: string
  onEdit?: (expenseId: string) => void
  onDelete?: (expenseId: string) => void
}

export function ExpenseList({ expense, className, onEdit, onDelete }: ExpenseListProps) {
  const {
    showConfirm,
    isDeleting,
    requestDelete,
    handleConfirm,
    handleCancel,
    confirmMessage
  } = useDeleteConfirm({
    onDelete: onDelete || (() => {}),
    getItemName: () => expense.title
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
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

  return (
    <div className={cn(
      "flex items-center justify-between p-4 border-b border-primary-100 hover:bg-primary-50 transition-colors cursor-pointer",
      className
    )}>
      {/* 左側: タイトルとメタ情報 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-medium text-primary-900 truncate">
            {expense.title}
          </h3>
          <span className="text-xs text-primary-500 whitespace-nowrap">
            {formatDate(expense.date)}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-primary-600">
          {/* カテゴリ */}
          <div className="flex items-center gap-1">
            <Icon name={expense.category.icon} category="categories" size="xs" variant="default" />
            <span>{expense.category.name}</span>
          </div>
          
          {/* 支払方法 */}
          <div className="flex items-center gap-1">
            <Icon name={expense.paymentMethod.icon} category="payments" size="xs" variant="default" />
            <span>{expense.paymentMethod.name}</span>
          </div>
          
        </div>
      </div>

      {/* 右側: 金額とアクション */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="font-semibold text-primary-900">
            {formatAmount(expense.total)}
          </div>
        </div>
        
        <div className="flex gap-1">
          {onEdit && (
            <Button 
              variant="ghost" 
              size="xs"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(expense.id)
              }}
            >
              <Icon name="edit" category="ui" size="xs" />
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="ghost" 
              size="xs"
              className="text-error-600 hover:text-error-700 hover:bg-error-50"
              onClick={(e) => {
                e.stopPropagation()
                requestDelete(expense.id)
              }}
              disabled={isDeleting}
            >
              <Icon name="trash" category="ui" size="xs" />
            </Button>
          )}
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="支出を削除"
        message={confirmMessage}
        confirmText="削除"
        cancelText="キャンセル"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}