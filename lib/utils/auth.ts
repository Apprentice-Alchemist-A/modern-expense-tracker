import { getSupabaseClient } from '@/lib/supabase/browser-client'

/**
 * 現在のセッションを確実に取得する
 * セッションが無い場合はリフレッシュを試行する
 */
export async function ensureAuthenticated() {
  const supabase = getSupabaseClient()
  
  // 最初のセッション取得試行
  let { data: { session }, error: sessionError } = await supabase.auth.getSession()
  
  if (sessionError) {
    console.error('Session error:', sessionError)
    throw new Error('認証エラーが発生しました')
  }
  
  // セッションが無い場合はリフレッシュを試行
  if (!session?.user) {
    console.log('No session found, attempting refresh...')
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
    
    if (refreshError) {
      console.error('Refresh session error:', refreshError)
      throw new Error('認証の更新に失敗しました。再度ログインしてください。')
    }
    
    session = refreshData.session
    
    if (!session?.user) {
      throw new Error('認証が必要です。再度ログインしてください。')
    }
  }
  
  return {
    session,
    user: session.user,
    supabase
  }
}