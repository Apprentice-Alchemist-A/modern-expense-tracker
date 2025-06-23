'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Sidebar, SidebarItem } from './Sidebar'
import { Button } from '@/components/ui/Button'
import { UserMenu } from '@/components/auth/UserMenu'
import { useAuth } from '@/components/auth/AuthProvider'
import { signInWithGoogle } from '@/lib/supabase/auth'

interface AppLayoutProps {
  children: ReactNode
  sidebarItems?: SidebarItem[]
  className?: string
}

export function AppLayout({ 
  children, 
  sidebarItems = [],
  className 
}: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user, loading } = useAuth()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className={cn("flex h-screen bg-primary-50", className)}>
      {/* サイドバー */}
      <Sidebar 
        items={sidebarItems}
        collapsed={sidebarCollapsed}
      />

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* トップバー */}
        <header className="bg-white border-b border-primary-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            >
              メニュー
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu user={user} loading={loading} />
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'ログイン'}
              </Button>
            )}
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}