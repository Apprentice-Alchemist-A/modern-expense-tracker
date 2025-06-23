'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils/cn'

export interface SelectOption {
  value: string
  label: string
  icon?: string
  iconCategory?: string
}

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: boolean
}

export function Select({
  options,
  value,
  onChange,
  placeholder = '選択してください',
  className,
  disabled = false,
  error = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 border rounded-md bg-white text-left transition-colors',
          'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          error ? 'border-red-300' : 'border-primary-300',
          disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:border-primary-400',
          isOpen && 'border-primary-500 ring-2 ring-primary-500'
        )}
      >
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {selectedOption ? (
            <>
              {selectedOption.icon && selectedOption.iconCategory && (
                <Icon 
                  name={selectedOption.icon} 
                  category={selectedOption.iconCategory as any} 
                  size="sm" 
                  className="flex-shrink-0"
                />
              )}
              <span className="truncate text-sm text-primary-900">
                {selectedOption.label}
              </span>
            </>
          ) : (
            <span className="text-sm text-primary-500">{placeholder}</span>
          )}
        </div>
        <Icon 
          name="chevron-down" 
          category="ui" 
          size="sm" 
          className={cn(
            'text-primary-400 transition-transform flex-shrink-0',
            isOpen && 'rotate-180'
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-primary-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {placeholder && (
            <button
              type="button"
              onClick={() => handleSelect('')}
              className={cn(
                'w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors',
                'hover:bg-primary-50',
                !value && 'bg-primary-100 text-primary-900'
              )}
            >
              <span className="text-primary-500">{placeholder}</span>
            </button>
          )}
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors',
                'hover:bg-primary-50',
                value === option.value && 'bg-primary-100 text-primary-900'
              )}
            >
              {option.icon && option.iconCategory && (
                <Icon 
                  name={option.icon} 
                  category={option.iconCategory as any} 
                  size="sm" 
                  className="flex-shrink-0"
                />
              )}
              <span className="flex-1 truncate">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}