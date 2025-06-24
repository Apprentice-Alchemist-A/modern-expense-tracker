'use client'

import { ExpenseCard } from './ExpenseCard'
import { ExpenseList } from './ExpenseList'
import { ExpenseTable } from './ExpenseTable'
import { SortState } from './ExpenseFilters'
import { ExpenseSort } from '@/lib/supabase/queries'

interface Expense {
  id: string
  title: string
  date: string // expense_date -> date に変更
  total: number // total_amount -> total に変更
  category: { // categories -> category に変更
    id: string
    name: string
    icon: string
    color: string
  }
  paymentMethod: { // payment_methods -> paymentMethod に変更
    id: string
    name: string
    icon: string
  }
  memo: string // notes -> memo に変更
  items: Array<{
    id: string
    name: string
    amount: number
    note: string
  }>
}

interface ExpenseViewsProps {
  expenses: Expense[]
  viewMode: 'card' | 'list' | 'table'
  sort?: ExpenseSort | undefined
  onSortChange?: (sort: ExpenseSort | undefined) => void
  onEdit?: (expenseId: string) => void
  onDelete?: (expenseId: string) => void
}

export function ExpenseViews({ expenses, viewMode, sort, onSortChange, onEdit, onDelete }: ExpenseViewsProps) {
  if (expenses.length === 0) {
    return null
  }

  switch (viewMode) {
    case 'card':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenses.map((expense) => (
            <ExpenseCard 
              key={expense.id} 
              expense={expense} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )

    case 'list':
      return (
        <div className="bg-white rounded-lg border border-primary-200">
          {expenses.map((expense) => (
            <ExpenseList 
              key={expense.id} 
              expense={expense} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )

    case 'table':
      return (
        <div className="bg-white rounded-lg border border-primary-200">
          <ExpenseTable 
            expenses={expenses} 
            sort={sort}
            onSortChange={onSortChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )

    default:
      return null
  }
}