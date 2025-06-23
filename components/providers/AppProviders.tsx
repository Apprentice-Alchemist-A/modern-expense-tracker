'use client'

import { AuthProvider } from '@/components/auth/AuthProvider'

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}