import { z } from 'zod'

// 支出項目のスキーマ
export const expenseItemSchema = z.object({
  item_name: z.string().min(1, '項目名を入力してください'),
  amount: z.number().min(0.01, '金額は0円より大きい値を入力してください'),
  note: z.string().optional()
})

// 支出グループのスキーマ
export const expenseGroupSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  category_id: z.string().min(1, 'カテゴリを選択してください'),
  payment_method_id: z.string().min(1, '支払方法を選択してください'),
  date: z.string().min(1, '日付を選択してください'),
  memo: z.string().optional(),
  items: z.array(expenseItemSchema).min(1, '少なくとも1つの項目を入力してください')
})

// フォーム用の型定義
export type ExpenseItem = z.infer<typeof expenseItemSchema>
export type ExpenseGroup = z.infer<typeof expenseGroupSchema>

// フォーム用の初期値
export const defaultExpenseItem: ExpenseItem = {
  item_name: '',
  amount: 0,
  note: ''
}

export const defaultExpenseGroup: ExpenseGroup = {
  title: '',
  category_id: '',
  payment_method_id: '',
  date: '', // 空にして、コンポーネント側で現在日付を設定
  memo: '',
  items: [defaultExpenseItem]
}

// バリデーション関数
export const validateExpenseGroup = (data: unknown) => {
  return expenseGroupSchema.safeParse(data)
}

export const validateExpenseItem = (data: unknown) => {
  return expenseItemSchema.safeParse(data)
}