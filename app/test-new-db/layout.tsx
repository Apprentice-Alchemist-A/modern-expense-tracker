import { AuthProvider } from '@/components/auth/AuthProvider'

export default function TestNewDbLayout({
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