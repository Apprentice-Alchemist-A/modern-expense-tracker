import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/supabase'

export async function GET(request: NextRequest) {
  console.log('Auth callback: Processing OAuth callback')
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  if (error) {
    console.error('Auth callback error:', { error, errorDescription })
    return NextResponse.redirect(new URL('/?error=auth_failed', requestUrl.origin))
  }

  if (code) {
    console.log('Auth callback: Exchanging code for session')
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Auth callback: Exchange error:', exchangeError)
      return NextResponse.redirect(new URL('/?error=session_failed', requestUrl.origin))
    }

    console.log('Auth callback: Session established successfully', { 
      hasSession: !!data.session,
      hasUser: !!data.user,
      userId: data.user?.id 
    })
  }

  // 認証後はダッシュボードにリダイレクト
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/dashboard'
  console.log('Auth callback: Redirecting to:', redirectTo)
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
}