'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { getCategories, getPaymentMethods } from '@/lib/supabase/queries'
import { signInWithGoogle } from '@/lib/supabase/auth'

export default function TestNewDatabasePage() {
  const { user, loading } = useAuth()
  const [categories, setCategories] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [dbInfo, setDbInfo] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [testResults, setTestResults] = useState({
    connection: false,
    categories: false,
    paymentMethods: false
  })

  // データベース情報取得
  const getDbInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('count')
        .limit(1)
      
      if (error) throw error
      
      // 接続成功
      setTestResults(prev => ({ ...prev, connection: true }))
      
      // Project URLから情報を抽出
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const projectId = url?.split('//')[1]?.split('.')[0]
      
      setDbInfo({
        projectId,
        url,
        status: 'connected'
      })
      
    } catch (err: any) {
      setError(`接続エラー: ${err.message}`)
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
    await getDbInfo()
    await testCategories()
    await testPaymentMethods()
  }

  useEffect(() => {
    runAllTests()
  }, [])

  return (
    <div className="min-h-screen bg-primary-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>新データベース接続テスト</CardTitle>
            <CardDescription>
              新しいSupabaseプロジェクトとの接続状況確認
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 新データベース情報 */}
            {dbInfo && (
              <div className="p-4 bg-success/10 rounded-lg">
                <h3 className="font-semibold text-success mb-2">✓ 新データベース接続成功</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Project ID:</strong> {dbInfo.projectId}</p>
                  <p><strong>URL:</strong> {dbInfo.url}</p>
                  <p><strong>Status:</strong> {dbInfo.status}</p>
                </div>
              </div>
            )}

            {/* 接続状態 */}
            <div className="space-y-2">
              <h3 className="font-semibold">テスト結果</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${testResults.connection ? 'bg-success' : 'bg-error'}`} />
                  <span>データベース接続: {testResults.connection ? '成功' : '失敗'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${testResults.categories ? 'bg-success' : 'bg-error'}`} />
                  <span>カテゴリテーブル: {testResults.categories ? '正常' : 'エラー'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${testResults.paymentMethods ? 'bg-success' : 'bg-error'}`} />
                  <span>支払方法テーブル: {testResults.paymentMethods ? '正常' : 'エラー'}</span>
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
                <div className="grid grid-cols-3 gap-2">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-2 bg-white rounded border" style={{ borderColor: cat.color }}>
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span className="text-sm font-medium">{cat.name}</span>
                      </div>
                      <div className="text-xs text-primary-600 mt-1">
                        色: {cat.color} | 順序: {cat.display_order}
                      </div>
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
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map(pm => (
                    <div key={pm.id} className="p-2 bg-primary-100 rounded">
                      <div className="flex items-center gap-2">
                        <span>{pm.icon}</span>
                        <span className="text-sm font-medium">{pm.name}</span>
                      </div>
                      <div className="text-xs text-primary-600 mt-1">
                        順序: {pm.display_order}
                      </div>
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