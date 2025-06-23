// テストデータ作成スクリプト
// Node.js環境で実行

const { createClient } = require('@supabase/supabase-js')

// Supabase設定（環境変数から取得）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('環境変数が設定されていません')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '設定済み' : '未設定')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// テストデータ生成関数
function generateRandomExpense(index, categoryIds, paymentMethodIds, userId) {
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

// メイン実行関数
async function createTestData() {
  try {
    console.log('認証状態を確認中...')
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      console.error('認証が必要です。先にログインしてください。')
      return
    }
    
    console.log('ユーザー認証済み:', session.user.id)
    
    // カテゴリIDを取得
    console.log('カテゴリ情報を取得中...')
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id')
      .limit(5)
    
    if (categoriesError) {
      console.error('カテゴリ取得エラー:', categoriesError)
      return
    }
    
    // 支払方法IDを取得
    console.log('支払方法情報を取得中...')
    const { data: paymentMethods, error: paymentMethodsError } = await supabase
      .from('payment_methods')
      .select('id')
      .limit(5)
    
    if (paymentMethodsError) {
      console.error('支払方法取得エラー:', paymentMethodsError)
      return
    }
    
    const categoryIds = categories.map(c => c.id)
    const paymentMethodIds = paymentMethods.map(p => p.id)
    
    console.log(`テストデータを作成中... (カテゴリ: ${categoryIds.length}件, 支払方法: ${paymentMethodIds.length}件)`)
    
    // 100件のテストデータを作成
    for (let i = 1; i <= 100; i++) {
      const testData = generateRandomExpense(i, categoryIds, paymentMethodIds, session.user.id)
      
      try {
        // RPC関数を使用してデータを作成
        const { data: groupId, error } = await supabase.rpc('create_expense_with_items', {
          p_expense_group: testData.group,
          p_expense_items: testData.items
        })
        
        if (error) {
          console.error(`テストデータ${i}の作成に失敗:`, error)
        } else {
          if (i % 10 === 0) {
            console.log(`${i}件のテストデータを作成済み...`)
          }
        }
      } catch (err) {
        console.error(`テストデータ${i}の作成中にエラー:`, err)
      }
    }
    
    console.log('✅ テストデータの作成が完了しました!')
    
    // 作成されたデータの確認
    const { data: createdData, error: countError } = await supabase
      .from('expense_groups')
      .select('id', { count: 'exact', head: true })
      .ilike('notes', 'テスト用メモ%')
    
    if (!countError && createdData) {
      console.log(`📊 作成されたテストデータ: ${createdData.length}件`)
    }
    
  } catch (error) {
    console.error('テストデータ作成中にエラーが発生:', error)
  }
}

// スクリプト実行
console.log('🚀 テストデータ作成スクリプトを開始...')
createTestData().then(() => {
  console.log('スクリプト実行完了')
  process.exit(0)
}).catch(error => {
  console.error('スクリプト実行エラー:', error)
  process.exit(1)
})