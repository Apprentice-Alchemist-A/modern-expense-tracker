'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Icon } from '@/components/ui/Icon'
import { Card } from '@/components/ui/Card'
import { Select, SelectOption } from '@/components/ui/Select'
import { cn } from '@/lib/utils/cn'
import { useMasterData } from '@/hooks/useMasterData'
import { 
  ExpenseGroup, 
  ExpenseItem, 
  defaultExpenseGroup, 
  defaultExpenseItem,
  validateExpenseGroup 
} from '@/lib/validations/expense'

interface ExpenseFormProps {
  onSubmit: (data: ExpenseGroup) => Promise<void>
  onCancel: () => void
  initialData?: Partial<ExpenseGroup>
  isEdit?: boolean
  loading?: boolean
}

export function ExpenseForm({ 
  onSubmit, 
  onCancel, 
  initialData, 
  isEdit = false, 
  loading = false 
}: ExpenseFormProps) {
  const { categories, paymentMethods, loading: masterDataLoading } = useMasterData()
  // 日本時間の現在日付を取得する関数
  const getJapanToday = (): string => {
    const now = new Date()
    const japanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)) // UTC+9
    return japanTime.toISOString().split('T')[0]
  }

  const [formData, setFormData] = useState<ExpenseGroup>({
    ...defaultExpenseGroup,
    // 新規作成時は日本時間の現在日付をデフォルトに設定
    date: initialData?.date || getJapanToday(),
    ...initialData
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 初期データが変更された時にフォームを更新
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }))
    } else if (!isEdit) {
      // 新規作成時は日本時間の現在日付を設定
      setFormData(prev => ({
        ...prev,
        date: getJapanToday()
      }))
    }
  }, [initialData, isEdit])

  const updateField = (field: keyof ExpenseGroup, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const updateItem = (index: number, field: keyof ExpenseItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
    // アイテムエラーをクリア
    const errorKey = `items.${index}.${field}`
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[errorKey]
        return newErrors
      })
    }
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...defaultExpenseItem }]
    }))
  }

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // バリデーション
    const result = validateExpenseGroup(formData)
    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.errors.forEach(error => {
        const path = error.path.join('.')
        newErrors[path] = error.message
      })
      setErrors(newErrors)
      return
    }

    try {
      await onSubmit(result.data)
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.amount || 0), 0)
  }

  // カテゴリオプションの準備
  const categoryOptions: SelectOption[] = categories.map(category => ({
    value: category.id,
    label: category.name,
    icon: category.icon || 'circle',
    iconCategory: 'categories'
  }))

  // 支払方法オプションの準備
  const paymentMethodOptions: SelectOption[] = paymentMethods.map(method => ({
    value: method.id,
    label: method.name,
    icon: method.icon || 'circle',
    iconCategory: 'payments'
  }))

  if (masterDataLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-primary-600">データを読み込み中...</div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary-900">
            {isEdit ? '支出を編集' : '新しい支出を追加'}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={loading}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={loading}
            >
              {loading ? '保存中...' : isEdit ? '更新' : '保存'}
            </Button>
          </div>
        </div>

        {/* 基本情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* タイトル */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary-700 mb-2">
              タイトル *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="例: ランチ代"
              error={errors.title}
              disabled={loading}
            />
          </div>

          {/* 日付 */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              日付 *
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              error={errors.date}
              disabled={loading}
            />
          </div>

          {/* カテゴリ */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              カテゴリ *
            </label>
            <Select
              options={categoryOptions}
              value={formData.category_id}
              onChange={(value) => updateField('category_id', value)}
              placeholder="カテゴリを選択してください"
              disabled={loading}
              error={!!errors.category_id}
            />
            {errors.category_id && (
              <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>
            )}
          </div>

          {/* 支払方法 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary-700 mb-2">
              支払方法 *
            </label>
            <Select
              options={paymentMethodOptions}
              value={formData.payment_method_id}
              onChange={(value) => updateField('payment_method_id', value)}
              placeholder="支払方法を選択してください"
              disabled={loading}
              error={!!errors.payment_method_id}
            />
            {errors.payment_method_id && (
              <p className="text-sm text-red-600 mt-1">{errors.payment_method_id}</p>
            )}
          </div>
        </div>

        {/* 項目リスト */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-primary-700">
              項目詳細 *
            </label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addItem}
              disabled={loading}
            >
              <Icon name="plus" category="ui" size="sm" className="mr-1" />
              項目追加
            </Button>
          </div>

          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-primary-200 rounded-lg">
                <div className="flex-1">
                  <Input
                    placeholder="項目名"
                    value={item.item_name}
                    onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                    error={errors[`items.${index}.item_name`]}
                    disabled={loading}
                    size="sm"
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    placeholder="金額"
                    value={item.amount || ''}
                    onChange={(e) => updateItem(index, 'amount', Number(e.target.value))}
                    error={errors[`items.${index}.amount`]}
                    disabled={loading}
                    size="sm"
                  />
                </div>
                <div className="w-40">
                  <Input
                    placeholder="メモ（任意）"
                    value={item.note || ''}
                    onChange={(e) => updateItem(index, 'note', e.target.value || null)}
                    disabled={loading}
                    size="sm"
                  />
                </div>
                {formData.items.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={loading}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Icon name="x" category="ui" size="sm" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          {errors.items && (
            <p className="text-sm text-red-600 mt-1">{errors.items}</p>
          )}
        </div>

        {/* メモ */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            メモ（任意）
          </label>
          <textarea
            value={formData.memo || ''}
            onChange={(e) => updateField('memo', e.target.value || null)}
            placeholder="追加のメモ..."
            className="w-full px-3 py-2 border border-primary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows={3}
            disabled={loading}
          />
        </div>

        {/* 合計金額 */}
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">合計金額</span>
            <span className="text-lg font-semibold text-primary-900">
              ¥{calculateTotal().toLocaleString()}
            </span>
          </div>
        </div>
      </form>
    </Card>
  )
}