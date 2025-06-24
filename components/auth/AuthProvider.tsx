'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabase/browser-client'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseClient()

  useEffect(() => {
    let isMounted = true
    
    // 初回のセッション取得
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (!isMounted) return // コンポーネントがアンマウントされている場合は処理しない
        
        if (error) {
          console.error('AuthProvider: Session error:', error)
        }
        
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (err) {
        console.error('AuthProvider: Failed to get session:', err)
        if (isMounted) {
          setUser(null)
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // 緊急用タイムアウト（3秒）
    const emergencyTimeout = setTimeout(() => {
      if (isMounted) {
        setLoading(false)
      }
    }, 3000)

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
      clearTimeout(emergencyTimeout)
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}