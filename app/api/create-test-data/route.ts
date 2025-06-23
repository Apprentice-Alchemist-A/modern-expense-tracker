import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

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

export async function POST(request: NextRequest) {
  try {
    const { count = 50 } = await request.json()
    
    const supabase = createRouteHandlerClient({ cookies })
    
    // セッション確認
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }
    
    // カテゴリIDを取得
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id')
      .limit(5)
    
    if (categoriesError) {
      return NextResponse.json(
        { error: `カテゴリ取得エラー: ${categoriesError.message}` },
        { status: 500 }
      )
    }
    
    // 支払方法IDを取得
    const { data: paymentMethods, error: paymentMethodsError } = await supabase
      .from('payment_methods')
      .select('id')
      .limit(5)
    
    if (paymentMethodsError) {
      return NextResponse.json(
        { error: `支払方法取得エラー: ${paymentMethodsError.message}` },
        { status: 500 }
      )
    }
    
    const categoryIds = categories.map(c => c.id)
    const paymentMethodIds = paymentMethods.map(p => p.id)
    
    let successCount = 0
    let errorCount = 0
    const errors = []
    
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
          errorCount++
          errors.push(`データ${i}: ${error.message}`)
        } else {
          successCount++
        }
      } catch (err) {
        errorCount++
        errors.push(`データ${i}: ${err instanceof Error ? err.message : '不明なエラー'}`)
      }
    }
    
    return NextResponse.json({
      success: true,
      successCount,
      errorCount,
      errors: errors.slice(0, 5), // 最初の5つのエラーのみ返す
      message: `${successCount}件のテストデータを作成しました (エラー: ${errorCount}件)`
    })
    
  } catch (error) {
    console.error('Test data creation error:', error)
    return NextResponse.json(
      { error: 'テストデータの作成に失敗しました' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // セッション確認
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }
    
    // テストデータのIDを取得
    const { data: testGroups, error: selectError } = await supabase
      .from('expense_groups')
      .select('id')
      .ilike('notes', 'テスト用メモ%')
    
    if (selectError) {
      return NextResponse.json(
        { error: `データ取得エラー: ${selectError.message}` },
        { status: 500 }
      )
    }
    
    if (!testGroups || testGroups.length === 0) {
      return NextResponse.json({
        success: true,
        deletedCount: 0,
        message: '削除対象のテストデータが見つかりません'
      })
    }
    
    // テストデータを削除
    const { error: deleteError } = await supabase
      .from('expense_groups')
      .delete()
      .ilike('notes', 'テスト用メモ%')
    
    if (deleteError) {
      return NextResponse.json(
        { error: `削除エラー: ${deleteError.message}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      deletedCount: testGroups.length,
      message: `${testGroups.length}件のテストデータを削除しました`
    })
    
  } catch (error) {
    console.error('Test data deletion error:', error)
    return NextResponse.json(
      { error: 'テストデータの削除に失敗しました' },
      { status: 500 }
    )
  }
}