'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useDeleteConfirm } from '@/hooks/useDeleteConfirm'
import { cn } from '@/lib/utils/cn'

interface ExpenseCardProps {
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

export function ExpenseCard({ expense, className, onEdit, onDelete }: ExpenseCardProps) {
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

  return (
    <Card className={cn("card-interactive", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-medium text-primary-900 mb-1 line-clamp-2">
              {expense.title}
            </h3>
            <p className="text-sm text-primary-600">
              {formatDate(expense.date)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary-900">
              {formatAmount(expense.total)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          {/* カテゴリ */}
          <div className="flex items-center gap-1">
            <Icon name={expense.category.icon} category="categories" size="sm" variant="default" />
            <span className="text-xs text-primary-600">{expense.category.name}</span>
          </div>

          {/* 支払方法 */}
          <div className="flex items-center gap-1">
            <Icon name={expense.paymentMethod.icon} category="payments" size="sm" variant="default" />
            <span className="text-xs text-primary-600">{expense.paymentMethod.name}</span>
          </div>

          {/* お店 */}
        </div>

        {/* メモ */}
        {expense.memo && (
          <p className="text-xs text-primary-500 mb-3 line-clamp-2">
            {expense.memo}
          </p>
        )}

        {/* アクションボタン */}
        <div className="flex gap-2">
          {onEdit && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(expense.id)
              }}
            >
              <Icon name="edit" category="ui" size="sm" className="mr-1" />
              編集
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 text-error-600 hover:text-error-700 hover:bg-error-50"
              onClick={(e) => {
                e.stopPropagation()
                requestDelete(expense.id)
              }}
              disabled={isDeleting}
            >
              <Icon name="trash" category="ui" size="sm" className="mr-1" />
              削除
            </Button>
          )}
        </div>
      </CardContent>
      
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
    </Card>
  )
}