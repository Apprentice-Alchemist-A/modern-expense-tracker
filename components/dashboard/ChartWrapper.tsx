'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'
import { DashboardComponentProps } from '@/types/dashboard'

interface ChartWrapperProps extends DashboardComponentProps {
  title: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  emptyIcon?: string
  emptyMessage?: string
  skeletonComponent?: ReactNode
}

export function ChartWrapper({
  title,
  subtitle,
  action,
  children,
  emptyIcon = 'analytics',
  emptyMessage = 'データがありません',
  isLoading,
  className,
  skeletonComponent
}: ChartWrapperProps) {
  
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {subtitle && <p className="text-sm text-primary-600">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          {skeletonComponent || (
            <div className="h-64 flex items-center justify-center">
              <div className="w-full h-full bg-primary-100 rounded animate-pulse" />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <p className="text-sm text-primary-600 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

/**
 * 空状態表示コンポーネント
 */
interface EmptyStateProps {
  icon?: string
  message?: string
  action?: ReactNode
}

export function EmptyState({ 
  icon = 'analytics', 
  message = 'データがありません',
  action 
}: EmptyStateProps) {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <Icon name={icon} category="ui" size="lg" className="mx-auto mb-4 text-primary-400" />
        <p className="text-primary-600 mb-4">{message}</p>
        {action}
      </div>
    </div>
  )
}