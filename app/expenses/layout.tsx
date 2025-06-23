import { AuthProvider } from '@/components/auth/AuthProvider'

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}