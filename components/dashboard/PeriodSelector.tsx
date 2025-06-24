'use client'

import { Button } from '@/components/ui/Button'
import { PERIOD_OPTIONS } from '@/lib/constants/dashboard'
import { PeriodOption } from '@/types/dashboard'

interface PeriodSelectorProps {
  selectedPeriod: PeriodOption
  onPeriodChange: (period: PeriodOption) => void
  className?: string
}

export function PeriodSelector({ 
  selectedPeriod, 
  onPeriodChange, 
  className 
}: PeriodSelectorProps) {
  return (
    <div className={`flex items-center gap-1 bg-primary-50 rounded-lg p-1 ${className || ''}`}>
      {PERIOD_OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant={selectedPeriod === option.value ? 'primary' : 'ghost'}
          size="sm"
          className="px-3 py-1 h-8 text-xs"
          onClick={() => onPeriodChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}