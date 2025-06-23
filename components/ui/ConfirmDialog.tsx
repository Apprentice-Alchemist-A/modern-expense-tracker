'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = '確認',
  message,
  confirmText = '実行',
  cancelText = 'キャンセル',
  variant = 'danger',
  isLoading = false
}: ConfirmDialogProps) {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return 'warning'
      case 'warning':
        return 'warning'
      case 'info':
        return 'info'
      default:
        return 'warning'
    }
  }

  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return 'text-red-500'
      case 'warning':
        return 'text-yellow-500'
      case 'info':
        return 'text-blue-500'
      default:
        return 'text-red-500'
    }
  }

  const getButtonVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger' as const
      case 'warning':
        return 'primary' as const
      case 'info':
        return 'primary' as const
      default:
        return 'danger' as const
    }
  }

  const handleConfirm = () => {
    onConfirm()
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center">
        {/* アイコン */}
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full mb-4",
          variant === 'danger' && 'bg-red-100',
          variant === 'warning' && 'bg-yellow-100',
          variant === 'info' && 'bg-blue-100'
        )}>
          <Icon 
            name={getIcon()} 
            category="ui" 
            size="lg" 
            className={getIconColor()}
          />
        </div>
        
        {/* メッセージ */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          {message}
        </p>
        
        {/* ボタン */}
        <div className="flex gap-3 w-full">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={getButtonVariant()}
            className="flex-1"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                処理中...
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}