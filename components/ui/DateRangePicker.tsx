'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'

// 日付をYYYY-MM-DD形式でローカル時間で取得する関数
const formatDateLocal = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export interface DateRange {
  from: string
  to: string
}

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
  placeholder?: string
  className?: string
}

interface PresetOption {
  label: string
  value: () => DateRange
}

const PRESET_OPTIONS: PresetOption[] = [
  {
    label: '今日',
    value: () => {
      const today = formatDateLocal(new Date())
      return { from: today, to: today }
    }
  },
  {
    label: '昨日',
    value: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const date = formatDateLocal(yesterday)
      return { from: date, to: date }
    }
  },
  {
    label: '過去7日間',
    value: () => {
      const today = new Date()
      const weekAgo = new Date()
      weekAgo.setDate(today.getDate() - 7)
      return {
        from: formatDateLocal(weekAgo),
        to: formatDateLocal(today)
      }
    }
  },
  {
    label: '今週',
    value: () => {
      const today = new Date()
      const currentDay = today.getDay() // 0=日曜日, 1=月曜日...
      
      // 今週の日曜日を計算
      const firstDay = new Date(today)
      firstDay.setDate(today.getDate() - currentDay)
      
      // 今週の土曜日を計算
      const lastDay = new Date(today)
      lastDay.setDate(today.getDate() + (6 - currentDay))
      
      return {
        from: formatDateLocal(firstDay),
        to: formatDateLocal(lastDay)
      }
    }
  },
  {
    label: '先週',
    value: () => {
      const today = new Date()
      const currentDay = today.getDay() // 0=日曜日, 1=月曜日...
      
      // 先週の日曜日を計算（今週の日曜日から7日前）
      const firstDay = new Date(today)
      firstDay.setDate(today.getDate() - currentDay - 7)
      
      // 先週の土曜日を計算（今週の日曜日から1日前）
      const lastDay = new Date(today)
      lastDay.setDate(today.getDate() - currentDay - 1)
      
      return {
        from: formatDateLocal(firstDay),
        to: formatDateLocal(lastDay)
      }
    }
  },
  {
    label: '今月',
    value: () => {
      const today = new Date()
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      
      return {
        from: formatDateLocal(firstDay),
        to: formatDateLocal(lastDay)
      }
    }
  },
  {
    label: '先月',
    value: () => {
      const today = new Date()
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0)
      return {
        from: formatDateLocal(firstDay),
        to: formatDateLocal(lastDay)
      }
    }
  }
]

export function DateRangePicker({ value, onChange, placeholder = "日付範囲を選択", className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCustom, setShowCustom] = useState(true) // デフォルトでカスタム範囲表示
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [tempRange, setTempRange] = useState<DateRange>(value)
  const [selectingStart, setSelectingStart] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // valueが変更されたときにtempRangeを更新
  useEffect(() => {
    setTempRange(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowCustom(false)
        setSelectingStart(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDateRange = (range: DateRange) => {
    if (!range.from && !range.to) return placeholder
    if (range.from === range.to && range.from) {
      return new Date(range.from).toLocaleDateString('ja-JP')
    }
    const fromDate = range.from ? new Date(range.from).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }) : ''
    const toDate = range.to ? new Date(range.to).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }) : ''
    return `${fromDate} 〜 ${toDate}`
  }

  const handlePresetSelect = (preset: PresetOption) => {
    const newRange = preset.value()
    onChange(newRange)
    setIsOpen(false)
    // setShowCustom(false) を削除して、次回もカスタム範囲がデフォルトになるように
  }

  const handleCustomSelect = () => {
    setShowCustom(true)
    setTempRange(value)
    setSelectingStart(true)
  }

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      days.push(currentDate)
    }

    return { days, year, month, firstDay, lastDay }
  }

  const handleDateClick = (date: Date) => {
    const dateString = formatDateLocal(date)
    
    if (selectingStart || !tempRange.from) {
      const newTempRange = { from: dateString, to: '' }
      setTempRange(newTempRange)
      setSelectingStart(false)
    } else {
      const newRange = {
        from: tempRange.from,
        to: dateString
      }
      
      // 開始日が終了日より後の場合は入れ替え
      if (new Date(newRange.from) > new Date(newRange.to)) {
        newRange.from = dateString
        newRange.to = tempRange.from
      }
      
      onChange(newRange)
      setIsOpen(false)
      // setShowCustom(false) を削除して、次回もカスタム範囲がデフォルトになるように
      setSelectingStart(true)
    }
  }

  const isDateInRange = (date: Date) => {
    if (!tempRange.from) return false
    const dateString = formatDateLocal(date)
    
    if (!tempRange.to) {
      return dateString === tempRange.from
    }
    
    return dateString >= tempRange.from && dateString <= tempRange.to
  }

  const isDateSelected = (date: Date) => {
    const dateString = formatDateLocal(date)
    return dateString === tempRange.from || dateString === tempRange.to
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const calendar1 = generateCalendar(currentMonth)
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  const calendar2 = generateCalendar(nextMonth)

  const weekDays = ['日', '月', '火', '水', '木', '金', '土']

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        className="flex items-center gap-2 px-3 py-2 border border-primary-300 rounded-md cursor-pointer hover:border-primary-400 transition-colors bg-white"
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) {
            setShowCustom(true) // 開いたときは必ずカスタム範囲表示
          }
        }}
      >
        <Icon name="calendar" category="ui" size="sm" className="text-primary-500" />
        <span className="text-sm text-primary-700 flex-1">
          {formatDateRange(value)}
        </span>
        <Icon 
          name="chevron-down" 
          category="ui" 
          size="sm" 
          className={cn("text-primary-500 transition-transform", isOpen && "rotate-180")} 
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-primary-200 rounded-lg shadow-xl z-50 min-w-96">
          {!showCustom ? (
            <div className="p-4">
              <div className="text-sm font-medium text-primary-900 mb-3">日付範囲を選択</div>
              <div className="space-y-1">
                {PRESET_OPTIONS.map((preset) => (
                  <button
                    key={preset.label}
                    className="w-full text-left px-3 py-2 text-sm text-primary-700 hover:bg-primary-100 rounded-md transition-colors font-medium"
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {preset.label}
                  </button>
                ))}
                <button
                  className="w-full text-left px-3 py-2 text-sm text-primary-700 hover:bg-primary-50 rounded-md transition-colors border-t border-primary-100 mt-2 pt-3"
                  onClick={handleCustomSelect}
                >
                  カスタム範囲...
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  className="text-sm text-primary-600 hover:text-primary-800"
                  onClick={() => setShowCustom(false)}
                >
                  📅 プリセット
                </button>
                <div className="text-sm font-medium text-primary-900">
                  {selectingStart ? '開始日を選択' : '終了日を選択'}
                </div>
                <div></div>
              </div>

              <div className="flex gap-4">
                {[calendar1, calendar2].map((calendar, calendarIndex) => (
                  <div key={calendarIndex} className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      {calendarIndex === 0 && (
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                          className="p-1 hover:bg-primary-100 rounded"
                        >
                          <Icon name="chevron-up" category="ui" size="sm" className="rotate-[-90deg]" />
                        </button>
                      )}
                      <div className="text-sm font-medium text-primary-900">
                        {calendar.year}年{calendar.month + 1}月
                      </div>
                      {calendarIndex === 1 && (
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                          className="p-1 hover:bg-primary-100 rounded"
                        >
                          <Icon name="chevron-up" category="ui" size="sm" className="rotate-90" />
                        </button>
                      )}
                      {calendarIndex === 0 && <div></div>}
                      {calendarIndex === 1 && <div></div>}
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {weekDays.map((day) => (
                        <div key={day} className="text-xs text-primary-500 text-center py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {calendar.days.map((date, index) => {
                        const isCurrentMonth = date.getMonth() === calendar.month
                        const isSelected = isDateSelected(date)
                        const isInRange = isDateInRange(date)
                        const isTodayDate = isToday(date)

                        return (
                          <button
                            key={index}
                            onClick={() => isCurrentMonth && handleDateClick(date)}
                            disabled={!isCurrentMonth}
                            className={cn(
                              "w-8 h-8 text-xs rounded-md transition-colors",
                              isCurrentMonth ? "text-primary-900" : "text-primary-300",
                              isCurrentMonth && "hover:bg-primary-100",
                              isSelected && "bg-primary-900 text-white hover:bg-primary-800",
                              isInRange && !isSelected && "bg-primary-100",
                              isTodayDate && !isSelected && "ring-1 ring-primary-400",
                              !isCurrentMonth && "cursor-not-allowed"
                            )}
                          >
                            {date.getDate()}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {tempRange.from && tempRange.to && (
                <div className="mt-4 pt-3 border-t border-primary-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-primary-600">
                      {formatDateRange(tempRange)}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        onChange(tempRange)
                        setIsOpen(false)
                        // setShowCustom(false) を削除して、次回もカスタム範囲がデフォルトになるように
                        setSelectingStart(true)
                      }}
                    >
                      適用
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}