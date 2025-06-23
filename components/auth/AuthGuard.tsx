'use client'

import { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import { signInWithGoogle } from '@/lib/supabase/auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo 
}: AuthGuardProps) {
  const { user, loading } = useAuth()

  useEffect(() => {
    console.log('AuthGuard: state check:', { 
      user: !!user, 
      userId: user?.id,
      loading, 
      requireAuth
    })
    
    if (!loading && requireAuth && !user && redirectTo) {
      window.location.href = redirectTo
    }
  }, [user, loading, requireAuth, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-primary-400 rounded-full animate-pulse" />
              <div className="w-4 h-4 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-4 h-4 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-center text-primary-600 mt-4">認証情報を確認中...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>ログインが必要です</CardTitle>
            <CardDescription>
              このページにアクセスするには認証が必要です
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={signInWithGoogle}
              className="w-full"
            >
              Googleでログイン
            </Button>
            <p className="text-xs text-center text-primary-600">
              アカウントをお持ちでない場合は、Googleアカウントで新規登録されます
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}