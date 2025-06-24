import { getSupabaseClient } from './browser-client'

export const signInWithGoogle = async () => {
  const supabase = getSupabaseClient()
  const currentPath = window.location.pathname
  
  // 本番環境では環境変数を優先、開発環境では現在のオリジンを使用
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${baseUrl}/auth/callback?redirectTo=${encodeURIComponent(currentPath)}`,
    },
  })
  
  if (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
  
  return data
}

export const signOut = async () => {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export const getCurrentUser = async () => {
  const supabase = getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getSession = async () => {
  const supabase = getSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}