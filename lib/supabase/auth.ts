import { getSupabaseClient } from './browser-client'

export const signInWithGoogle = async () => {
  console.log('signInWithGoogle: Starting Google OAuth flow')
  const supabase = getSupabaseClient()
  const currentPath = window.location.pathname
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(currentPath)}`,
    },
  })
  
  if (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
  
  console.log('signInWithGoogle: OAuth initiated successfully')
  return data
}

export const signOut = async () => {
  console.log('signOut: Starting sign out process')
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
  
  console.log('signOut: Sign out completed successfully')
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