'use client'

import { useState, useCallback } from 'react'

interface ToastData {
  id: string
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastOptions {
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((options: ToastOptions) => {
    const id = Date.now().toString()
    const toast: ToastData = {
      id,
      ...options
    }

    setToasts(prev => [...prev, toast])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const success = useCallback((message: string, title?: string) => {
    return addToast({ message, title, type: 'success' })
  }, [addToast])

  const error = useCallback((message: string, title?: string) => {
    return addToast({ message, title, type: 'error' })
  }, [addToast])

  const warning = useCallback((message: string, title?: string) => {
    return addToast({ message, title, type: 'warning' })
  }, [addToast])

  const info = useCallback((message: string, title?: string) => {
    return addToast({ message, title, type: 'info' })
  }, [addToast])

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}