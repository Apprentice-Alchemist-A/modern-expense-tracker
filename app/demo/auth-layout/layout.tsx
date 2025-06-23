import { AuthProvider } from '@/components/auth/AuthProvider'

export default function AuthLayoutDemoLayout({
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