'use client'

import { useState, useCallback } from 'react'

interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

interface ConfirmDialogState {
  isOpen: boolean
  options: ConfirmOptions
  resolver: ((value: boolean) => void) | null
}

export function useConfirmDialog() {
  const [state, setState] = useState<ConfirmDialogState>({
    isOpen: false,
    options: { message: '' },
    resolver: null
  })

  const showConfirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        options,
        resolver: resolve
      })
    })
  }, [])

  const handleConfirm = useCallback(() => {
    if (state.resolver) {
      state.resolver(true)
    }
    setState(prev => ({ ...prev, isOpen: false, resolver: null }))
  }, [state.resolver])

  const handleCancel = useCallback(() => {
    if (state.resolver) {
      state.resolver(false)
    }
    setState(prev => ({ ...prev, isOpen: false, resolver: null }))
  }, [state.resolver])

  return {
    isOpen: state.isOpen,
    options: state.options,
    showConfirm,
    handleConfirm,
    handleCancel
  }
}