'use client'

import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { signOut } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'

interface UserMenuProps {
  user: User | null
  loading?: boolean
}

export function UserMenu({ user, loading }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
      setIsSigningOut(false)
    }
  }

  if (loading) {
    return (
      <div className="w-8 h-8 bg-primary-200 rounded-full animate-pulse" />
    )
  }

  if (!user) {
    return null
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-primary-100 transition-colors"
      >
        <div className="w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
          {userInitial}
        </div>
        <svg 
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* オーバーレイ */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* ドロップダウンメニュー */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-primary-200 z-50">
            <div className="p-4 border-b border-primary-100">
              <p className="text-sm font-medium text-primary-900">
                {user.email}
              </p>
              <p className="text-xs text-primary-600 mt-1">
                ID: {user.id.substring(0, 8)}...
              </p>
            </div>
            
            <div className="p-2">
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-primary-100 text-primary-700",
                  isSigningOut && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSigningOut ? 'ログアウト中...' : 'ログアウト'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}