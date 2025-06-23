import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  actions?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  icon,
  actions,
  breadcrumbs,
  className
}: PageHeaderProps) {
  return (
    <header className={cn(
      "bg-white border-b border-primary-200 px-6 py-4",
      className
    )}>
      {/* ブレッドクラム */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-primary-500 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {crumb.icon && (
                <span className="mr-1">{crumb.icon}</span>
              )}
              {crumb.href ? (
                <a 
                  href={crumb.href} 
                  className="hover:text-primary-700 transition-colors duration-150"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-primary-900 font-medium">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* メインヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-primary-900">
              {title}
            </h1>
            {subtitle && (
              <p className="text-primary-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}