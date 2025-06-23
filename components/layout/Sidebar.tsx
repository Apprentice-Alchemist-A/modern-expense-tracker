'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'

export interface SidebarItem {
  id: string
  label: string
  href: string
  icon: ReactNode
  badge?: string | number
  children?: SidebarItem[]
  isActive?: boolean
}

interface SidebarProps {
  items: SidebarItem[]
  collapsed?: boolean
  onItemClick?: (item: SidebarItem) => void
  className?: string
}

export function Sidebar({ 
  items, 
  collapsed = false, 
  onItemClick,
  className 
}: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside 
      className={cn(
        "bg-white border-r border-primary-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* ロゴエリア */}
      <div className={cn(
        "p-4 border-b border-primary-200",
        collapsed && "px-2"
      )}>
        {collapsed ? (
          <div className="w-8 h-8 bg-primary-900 rounded-md flex items-center justify-center">
            <Icon name="expense" category="navigation" size="sm" variant="white" />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-900 rounded-md flex items-center justify-center">
              <Icon name="expense" category="navigation" size="sm" variant="white" />
            </div>
            <span className="font-semibold text-primary-900">経費管理</span>
          </div>
        )}
      </div>

      {/* ナビゲーションメニュー */}
      <nav className="flex-1 p-2 space-y-1">
        {items.map((item) => {
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onItemClick?.(item)}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                "hover:bg-primary-100 hover:text-primary-900",
                active 
                  ? "bg-primary-900 text-white" 
                  : "text-primary-700",
                collapsed && "justify-center px-2"
              )}
            >
              <span className={cn(
                "flex-shrink-0",
                !collapsed && "mr-3"
              )}>
                {/* アクティブ状態でアイコンのvariantを白に変更 */}
                {React.isValidElement(item.icon) 
                  ? React.cloneElement(item.icon as React.ReactElement, {
                      variant: active ? 'white' : 'default'
                    })
                  : item.icon
                }
              </span>
              
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "ml-2 px-2 py-0.5 text-xs rounded-full",
                      active 
                        ? "bg-white text-primary-900" 
                        : "bg-primary-200 text-primary-700"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* ユーザーエリア（将来用） */}
      <div className={cn(
        "p-4 border-t border-primary-200",
        collapsed && "px-2"
      )}>
        <div className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm",
          "hover:bg-primary-100 transition-colors duration-150",
          collapsed && "justify-center px-2"
        )}>
          <div className="w-6 h-6 bg-primary-300 rounded-full flex items-center justify-center">
            <span className="text-xs">👤</span>
          </div>
          {!collapsed && (
            <span className="ml-3 text-primary-700">ユーザー</span>
          )}
        </div>
      </div>
    </aside>
  )
}