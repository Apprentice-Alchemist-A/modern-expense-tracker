'use client'

import { useState } from 'react'

interface UseDeleteConfirmProps {
  onDelete: (id: string) => Promise<void> | void
  getItemName?: (id: string) => string
}

export function useDeleteConfirm({ onDelete, getItemName }: UseDeleteConfirmProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [targetId, setTargetId] = useState<string | null>(null)

  const requestDelete = (id: string) => {
    setTargetId(id)
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    if (!targetId) return
    
    setIsDeleting(true)
    try {
      await onDelete(targetId)
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
      setTargetId(null)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
    setTargetId(null)
  }

  const getConfirmMessage = () => {
    if (!targetId) return '項目を削除しますか？'
    
    const itemName = getItemName?.(targetId)
    return itemName 
      ? `「${itemName}」を削除しますか？この操作は取り消せません。`
      : 'この項目を削除しますか？この操作は取り消せません。'
  }

  return {
    showConfirm,
    isDeleting,
    requestDelete,
    handleConfirm,
    handleCancel,
    confirmMessage: getConfirmMessage()
  }
}