import { AuthProvider } from '@/components/auth/AuthProvider'

export default function TestLayout({
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