'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { getCategories, getPaymentMethods } from '@/lib/supabase/queries'
import { signInWithGoogle, signOut } from '@/lib/supabase/auth'

export default function TestSupabasePage() {
  const { user, loading } = useAuth()
  const [categories, setCategories] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [error, setError] = useState<string>('')
  const [testResults, setTestResults] = useState({
    connection: false,
    auth: false,
    categories: false,
    paymentMethods: false
  })

  // Supabase接続テスト
  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('count')
      if (error) throw error
      setTestResults(prev => ({ ...prev, connection: true }))
      return true
    } catch (err: any) {
      setError(`接続エラー: ${err.message}`)
      return false
    }
  }

  // カテゴリ取得テスト
  const testCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
      setTestResults(prev => ({ ...prev, categories: true }))
    } catch (err: any) {
      setError(`カテゴリ取得エラー: ${err.message}`)
    }
  }

  // 支払方法取得テスト
  const testPaymentMethods = async () => {
    try {
      const data = await getPaymentMethods()
      setPaymentMethods(data)
      setTestResults(prev => ({ ...prev, paymentMethods: true }))
    } catch (err: any) {
      setError(`支払方法取得エラー: ${err.message}`)
    }
  }

  // 全テスト実行
  const runAllTests = async () => {
    setError('')
    const connected = await testConnection()
    if (connected) {
      await testCategories()
      await testPaymentMethods()
    }
  }

  useEffect(() => {
    runAllTests()
  }, [])

  return (
    <div className="min-h-screen bg-primary-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Supabase接続テスト</CardTitle>
            <CardDescription>
              Supabaseとの接続状況と各種機能の動作確認
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 接続状態 */}
            <div className="space-y-2">
              <h3 className="font-semibold">接続状態</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${testResults.connection ? 'bg-success' : 'bg-error'}`} />
                  <span>Supabase接続: {testResults.connection ? '成功' : '失敗'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${!loading ? 'bg-success' : 'bg-warning'}`} />
                  <span>認証状態: {loading ? '読み込み中' : '準備完了'}</span>
                </div>
              </div>
            </div>

            {/* エラー表示 */}
            {error && (
              <div className="p-4 bg-error/10 text-error rounded-lg">
                {error}
              </div>
            )}

            {/* 認証情報 */}
            <div className="space-y-2">
              <h3 className="font-semibold">認証情報</h3>
              {user ? (
                <div className="p-4 bg-primary-100 rounded-lg">
                  <p className="text-sm">ユーザーID: {user.id}</p>
                  <p className="text-sm">メール: {user.email}</p>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="mt-2"
                    onClick={signOut}
                  >
                    ログアウト
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-primary-100 rounded-lg">
                  <p className="text-sm mb-2">未ログイン</p>
                  <Button 
                    size="sm"
                    onClick={signInWithGoogle}
                  >
                    Googleでログイン
                  </Button>
                </div>
              )}
            </div>

            {/* カテゴリ一覧 */}
            <div className="space-y-2">
              <h3 className="font-semibold">カテゴリ一覧 ({categories.length}件)</h3>
              {testResults.categories ? (
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-2 bg-primary-100 rounded">
                      <span className="text-sm">{cat.icon} {cat.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-primary-600">データ取得失敗</p>
              )}
            </div>

            {/* 支払方法一覧 */}
            <div className="space-y-2">
              <h3 className="font-semibold">支払方法一覧 ({paymentMethods.length}件)</h3>
              {testResults.paymentMethods ? (
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map(pm => (
                    <div key={pm.id} className="p-2 bg-primary-100 rounded">
                      <span className="text-sm">{pm.icon} {pm.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-primary-600">データ取得失敗</p>
              )}
            </div>

            {/* 再テストボタン */}
            <Button onClick={runAllTests} className="w-full">
              テストを再実行
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}