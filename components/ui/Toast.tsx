'use client'

import { useEffect } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'

interface ToastProps {
  id: string
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose: (id: string) => void
}

export function Toast({
  id,
  title,
  message,
  type = 'info',
  duration = 4000,
  onClose
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check'
      case 'error':
        return 'x'
      case 'warning':
        return 'warning'
      case 'info':
        return 'info'
      default:
        return 'info'
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-200 text-success-800'
      case 'error':
        return 'bg-error-50 border-error-200 text-error-800'
      case 'warning':
        return 'bg-warning-50 border-warning-200 text-warning-800'
      case 'info':
        return 'bg-info-50 border-info-200 text-info-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-success-500'
      case 'error':
        return 'text-error-500'
      case 'warning':
        return 'text-warning-500'
      case 'info':
        return 'text-info-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 border rounded-lg shadow-md",
      "animate-in slide-in-from-right-full duration-300",
      getStyles()
    )}>
      <Icon
        name={getIcon()}
        category="ui"
        size="sm"
        className={getIconColor()}
      />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-medium text-sm mb-1">
            {title}
          </h4>
        )}
        <p className="text-sm">
          {message}
        </p>
      </div>
      
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Icon name="x" category="ui" size="xs" />
      </button>
    </div>
  )
}