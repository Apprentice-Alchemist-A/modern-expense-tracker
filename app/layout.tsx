import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AppProviders } from '@/components/providers/AppProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '経費・食事管理アプリ',
  description: 'Notion風の洗練された経費管理アプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}