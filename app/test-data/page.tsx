'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseClient } from '@/lib/supabase/browser-client'

// テストデータ生成関数
function generateRandomExpense(index: number, categoryIds: string[], paymentMethodIds: string[]) {
  const randomDate = new Date()
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365))
  
  const randomAmount = Math.floor(Math.random() * 9000) + 1000 // 1000-10000円
  const itemCount = Math.floor(Math.random() * 3) + 1 // 1-4個の項目
  
  const items = []
  for (let i = 0; i < itemCount; i++) {
    items.push({
      name: `テスト項目${i + 1}`,
      amount: Math.floor(randomAmount / itemCount),
      quantity: 1,
      unit_price: Math.floor(randomAmount / itemCount),
      notes: `テスト項目メモ${i + 1}`,
      display_order: i
    })
  }
  
  return {
    group: {
      title: `テストデータ${index}`,
      description: 'ページネーション検証用のテストデータです',
      category_id: categoryIds[Math.floor(Math.random() * categoryIds.length)],
      payment_method_id: paymentMethodIds[Math.floor(Math.random() * paymentMethodIds.length)],
      expense_date: randomDate.toISOString().split('T')[0],
      notes: `テスト用メモ${index}`
    },
    items
  }
}

export default function TestDataPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [createdCount, setCreatedCount] = useState(0)

  const createTestData = async (count: number = 100) => {
    if (!user) {
      setMessage('ログインしてください')
      return
    }

    try {
      setLoading(true)
      setProgress(0)
      setMessage('テストデータ作成を開始します...')
      
      const supabase = getSupabaseClient()
      
      // カテゴリIDを取得
      setMessage('カテゴリ情報を取得中...')
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id')
        .limit(5)
      
      if (categoriesError) {
        throw new Error(`カテゴリ取得エラー: ${categoriesError.message}`)
      }
      
      // 支払方法IDを取得
      setMessage('支払方法情報を取得中...')
      const { data: paymentMethods, error: paymentMethodsError } = await supabase
        .from('payment_methods')
        .select('id')
        .limit(5)
      
      if (paymentMethodsError) {
        throw new Error(`支払方法取得エラー: ${paymentMethodsError.message}`)
      }
      
      const categoryIds = categories.map(c => c.id)
      const paymentMethodIds = paymentMethods.map(p => p.id)
      
      setMessage(`${count}件のテストデータを作成中...`)
      
      let successCount = 0
      let errorCount = 0
      
      // テストデータを作成
      for (let i = 1; i <= count; i++) {
        const testData = generateRandomExpense(i, categoryIds, paymentMethodIds)
        
        try {
          // RPC関数を使用してデータを作成
          const { data: groupId, error } = await supabase.rpc('create_expense_with_items', {
            p_expense_group: testData.group,
            p_expense_items: testData.items
          })
          
          if (error) {
            console.error(`テストデータ${i}の作成に失敗:`, error)
            errorCount++
          } else {
            successCount++
          }
        } catch (err) {
          console.error(`テストデータ${i}の作成中にエラー:`, err)
          errorCount++
        }
        
        // プログレス更新
        setProgress(Math.round((i / count) * 100))
        setCreatedCount(successCount)
        
        if (i % 10 === 0) {
          setMessage(`${successCount}件作成済み / ${count}件中 (エラー: ${errorCount}件)`)
        }
      }
      
      setMessage(`✅ 完了! ${successCount}件のテストデータを作成しました (エラー: ${errorCount}件)`)
      
    } catch (error) {
      console.error('テストデータ作成エラー:', error)
      setMessage(`❌ エラー: ${error instanceof Error ? error.message : 'テストデータの作成に失敗しました'}`)
    } finally {
      setLoading(false)
    }
  }

  const deleteTestData = async () => {
    if (!user) {
      setMessage('ログインしてください')
      return
    }

    if (!confirm('テストデータを削除しますか？この操作は取り消せません。')) {
      return
    }

    try {
      setLoading(true)
      setMessage('テストデータを削除中...')
      
      const supabase = getSupabaseClient()
      
      // テストデータのIDを取得
      const { data: testGroups, error: selectError } = await supabase
        .from('expense_groups')
        .select('id')
        .ilike('notes', 'テスト用メモ%')
      
      if (selectError) {
        throw new Error(`データ取得エラー: ${selectError.message}`)
      }
      
      if (!testGroups || testGroups.length === 0) {
        setMessage('削除対象のテストデータが見つかりません')
        return
      }
      
      // テストデータを削除
      const { error: deleteError } = await supabase
        .from('expense_groups')
        .delete()
        .ilike('notes', 'テスト用メモ%')
      
      if (deleteError) {
        throw new Error(`削除エラー: ${deleteError.message}`)
      }
      
      setMessage(`✅ ${testGroups.length}件のテストデータを削除しました`)
      setCreatedCount(0)
      
    } catch (error) {
      console.error('テストデータ削除エラー:', error)
      setMessage(`❌ エラー: ${error instanceof Error ? error.message : 'テストデータの削除に失敗しました'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard requireAuth={true}>
      <AppLayout>
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>テストデータ管理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-sm text-primary-600">
                ページネーション機能のテスト用に大量のダミーデータを作成・削除できます。
              </div>
              
              {/* 作成ボタン */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button
                    onClick={() => createTestData(50)}
                    disabled={loading}
                    variant="secondary"
                  >
                    <Icon name="plus" category="ui" size="sm" className="mr-2" />
                    テストデータ50件作成
                  </Button>
                  <Button
                    onClick={() => createTestData(100)}
                    disabled={loading}
                    variant="primary"
                  >
                    <Icon name="plus" category="ui" size="sm" className="mr-2" />
                    テストデータ100件作成
                  </Button>
                  <Button
                    onClick={() => createTestData(200)}
                    disabled={loading}
                    variant="primary"
                  >
                    <Icon name="plus" category="ui" size="sm" className="mr-2" />
                    テストデータ200件作成
                  </Button>
                </div>
                
                <Button
                  onClick={deleteTestData}
                  disabled={loading}
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon name="x" category="ui" size="sm" className="mr-2" />
                  テストデータ全削除
                </Button>
              </div>

              {/* プログレス表示 */}
              {loading && progress > 0 && (
                <div className="space-y-2">
                  <div className="w-full bg-primary-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-primary-600">
                    進行状況: {progress}% ({createdCount}件作成済み)
                  </div>
                </div>
              )}

              {/* メッセージ表示 */}
              {message && (
                <div className={`p-3 rounded-md ${
                  message.includes('❌') ? 'bg-red-50 text-red-700' :
                  message.includes('✅') ? 'bg-green-50 text-green-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {message}
                </div>
              )}

              {/* 注意事項 */}
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="text-sm text-yellow-800">
                  <strong>注意事項:</strong>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>テストデータは実際のデータベースに保存されます</li>
                    <li>作成後は支出一覧ページでページネーション機能をテストできます</li>
                    <li>テスト完了後は「テストデータ全削除」で削除してください</li>
                    <li>大量データ作成時は時間がかかる場合があります</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </AuthGuard>
  )
}